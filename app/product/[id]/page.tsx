"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BACKEND_URL } from "@/components/apiConfig";
import { Product } from "@/components/useProducts";
import { useAuth } from "@/components/useAuth";
import { useCart } from "@/components/useCart";
import { useWishlist } from "@/components/useWishlist";
import Link from "next/link";

// Categories label mapping dictionary
const categoryLabels: Record<string, string> = {
  "bedroom": "Bedroom Collections",
  "dining": "Dining Collections",
  "electrics": "Electrics & Appliances",
  "living-room": "Living Room",
  "office-furniture": "Office Furniture",
  "plastic-products": "Plastic Products",
  "budget-items": "Budget Items"
};

// Subcategories label mapping dictionary
const subcategoryLabels: Record<string, string> = {
  // Living Room
  "sofa-sets": "Sofa Sets",
  "corner-sofa": "Corner + Chaise Sofa",
  "recliner-sofa": "Recliner Sofa",
  "single-seaters": "Single Seaters",
  "ottoman": "Ottoman",
  "sofa-beds": "Sofa Beds",
  "wooden-sofa": "Wooden Sofa",
  "coffee-tables": "Coffee Tables",
  "tv-stands": "TV Stands & Wall Units",
  "cabinets": "Display Cabinets & Sideboards",
  "shelves": "Wall Shelves",
  "rugs": "Rugs",
  // Bedroom
  "beds": "Beds",
  "wardrobes": "Wardrobes",
  "dressing-tables": "Dressing Tables",
  "bedside-tables": "Bedside Tables",
  "mattresses": "Mattresses",
  // Dining
  "wooden-sets": "Wooden Dining Sets",
  "metal-sets": "Metal Dining Sets",
  "glass-sets": "Glass Dining Sets",
  "stools-benches": "Stools & Benches",
  // Office
  "executive-tables": "Tables & Cupboards",
  "chairs-models": "Seating",
  "cupboards-racks": "Secure Storage",
  // Plastic
  "plastic-chairs": "Plastic Chairs",
  "plastic-tables": "Plastic Tables",
  "plastic-cupboards": "Plastic Cupboards",
  // Electrics
  "kitchen-apps": "Kitchen Appliances",
  "home-fridges": "Refrigerators",
  "home-washers": "Washing Machines",
  "home-coolers": "Air Conditioners & Fans",
  "av-tvs": "Televisions",
  "av-audio": "Home Theatre & Speakers"
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id ? String(params.id) : "";

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false); // Brief feedback state after adding
  const { user, isLoggedIn } = useAuth();
  const { addToCart, isInCart } = useCart(user?.id ?? null);
  const { toggleWishlist, isInWishlist } = useWishlist(user?.id ?? null);
  const isWishlisted = product ? isInWishlist(product.id) : false;

  // Fetch product detail on mount
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    fetch(`${BACKEND_URL}/api/get_items.php?id=${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch product details.");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setProduct(data.data);
          if (data.data.image) {
            setMainImage(data.data.image);
          }
        } else {
          setError(data.message || "Product details not found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading product detail:", err);
        setError(err.message || "Connection failed.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
        <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <div className="grow flex items-center justify-center py-20 text-slate-500">
          <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mr-3"></span>
          Loading product specifications...
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
        <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <div className="grow max-w-xl mx-auto py-20 px-4 text-center">
          <span className="text-5xl block mb-4">🔍</span>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Product Not Found</h2>
          <p className="text-sm text-slate-500 mb-6">{error || "The product requested could not be retrieved."}</p>
          <button 
            onClick={() => router.back()} 
            className="bg-slate-900 text-white font-extrabold text-xs px-6 py-3 rounded-md hover:bg-red-600 transition"
          >
            Go Back
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const catLabel = categoryLabels[product.category] || product.category;
  const subLabel = product.subcategory ? subcategoryLabels[product.subcategory] || product.subcategory : null;

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      {/* Dynamic Header */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <main className="grow max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs font-semibold text-slate-400 mb-8 flex flex-wrap items-center gap-1.5 border-b border-zinc-200 pb-4">
          <Link href="/" className="hover:text-red-600 transition">Home</Link>
          <span>&gt;</span>
          <Link href={`/${product.category}`} className="hover:text-red-600 transition">{catLabel}</Link>
          {subLabel && (
            <>
              <span>&gt;</span>
              <Link href={`/${product.category}?sub=${product.subcategory}`} className="hover:text-red-600 transition">
                {subLabel}
              </Link>
            </>
          )}
          <span>&gt;</span>
          <span className="text-slate-600 font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
          
          {/* Left Column: Image / Gallery Display */}
          <div className="flex flex-col gap-4">
            <div className={`h-96 md:h-112.5 bg-linear-to-br ${product.image_bg} rounded-xl border border-zinc-200 shadow-sm relative flex items-center justify-center overflow-hidden`}>
              {product.badge && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs uppercase font-black px-3 py-1 rounded-sm tracking-wider">
                  {product.badge}
                </span>
              )}
              {mainImage ? (
                <img 
                  src={mainImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[120px]">{product.icon}</span>
              )}
            </div>

            {/* Dynamic Thumbnail Gallery - shows main image + any additional gallery images */}
            {(() => {
              // Parse additional_images JSON string from database into a URL array
              let galleryImages: string[] = [];
              if ((product as any).additional_images) {
                try {
                  galleryImages = JSON.parse((product as any).additional_images);
                } catch {
                  galleryImages = [];
                }
              }

              // Combine: main image first, then gallery images
              const allImages: { url: string | null; label: string }[] = [
                { url: product.image || null, label: "Main View" },
                ...galleryImages.map((url, i) => ({ url, label: `View ${i + 2}` })),
              ];

              // Only show thumbnail strip if there's more than just main image
              if (allImages.filter(img => img.url).length <= 1 && !product.image) return null;

              return (
                <div className="grid grid-cols-4 gap-3">
                  {allImages.map((img, idx) =>
                    img.url ? (
                      // Clickable thumbnail - switches main image on click
                      <div
                        key={idx}
                        onClick={() => setMainImage(img.url)}
                        className={`h-20 rounded-lg border cursor-pointer overflow-hidden flex items-center justify-center transition-all ${
                          mainImage === img.url
                            ? "border-red-600 ring-2 ring-red-500/20"
                            : "border-zinc-200 bg-white hover:border-zinc-400"
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={img.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      // Fallback icon thumbnail if no image
                      <div
                        key={idx}
                        onClick={() => setMainImage(null)}
                        className={`h-20 rounded-lg border cursor-pointer overflow-hidden flex items-center justify-center transition-all ${
                          mainImage === null
                            ? "border-red-600 ring-2 ring-red-500/20"
                            : "border-zinc-200 bg-white hover:border-zinc-400"
                        }`}
                      >
                        <span className="text-2xl">{product.icon}</span>
                      </div>
                    )
                  )}
                </div>
              );
            })()}

            <div className="mt-4 flex justify-center">
              <button className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold py-2.5 px-5 rounded-lg shadow-sm transition inline-flex items-center gap-2">
                📥 Download Brochure
              </button>
            </div>
          </div>

          {/* Right Column: Text & Specs Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>
              <span className="text-xs font-bold text-slate-400 block mt-2 uppercase tracking-wide">
                SKU: TCD-{product.id.toString().padStart(4, "0")}
              </span>
            </div>

            {/* Price display row */}
            <div className="border-y border-zinc-200 py-4 flex items-baseline gap-3">
              <span className="text-3xl font-black text-red-600">{product.price}</span>
              {product.old_price && (
                <span className="text-base text-zinc-400 line-through font-semibold">{product.old_price}</span>
              )}
            </div>

            {/* Product description specifications list */}
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-3">Description:</h3>
              {product.description ? (
                <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed pl-1">
                  {product.description.split("\n").map((line, i) => (
                    line.trim() !== "" && <li key={i}>{line.trim()}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500 italic">No description spec text has been configured for this item yet.</p>
              )}
            </div>

            {/* Product Dimensions specification */}
            {product.dimensions && (
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-3">Dimensions :</h3>
                <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside leading-relaxed pl-1">
                  {product.dimensions.split("\n").map((line, i) => (
                    line.trim() !== "" && <li key={i}>{line.trim()}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Product Warranty specification */}
            {product.warranty && (
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-3">Warranty :</h3>
                <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside leading-relaxed pl-1">
                  {product.warranty.split("\n").map((line, i) => (
                    line.trim() !== "" && <li key={i}>{line.trim()}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Action Buttons */}
            <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-col gap-3">

              {/* Add to Cart Button & Wishlist Heart Row */}
              <div className="flex gap-3">
                {product && (
                  isLoggedIn ? (
                    <button
                      onClick={() => {
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image || null,
                          icon: product.icon,
                          category: product.category,
                        });
                        setAddedToCart(true);
                        // Reset the button feedback text after 2 seconds
                        setTimeout(() => setAddedToCart(false), 2000);
                      }}
                      className={`grow font-extrabold text-sm py-4 px-8 rounded-lg transition shadow-md flex items-center justify-center gap-2 ${
                        isInCart(product.id)
                          ? "bg-green-600 hover:bg-green-700 text-white shadow-green-500/10"
                          : "bg-slate-900 hover:bg-slate-800 text-white"
                      }`}
                    >
                      {addedToCart ? (
                        <><span>✓</span> Added to Cart!</>
                      ) : isInCart(product.id) ? (
                        <><span>🛒</span> In Cart - Add Another</>
                      ) : (
                        <><span>🛒</span> Add to Cart</>
                      )}
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="grow bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-sm py-4 px-8 rounded-lg transition text-center shadow-md flex items-center justify-center gap-2"
                    >
                      🔒 Login to Add to Cart
                    </Link>
                  )
                )}

                {/* Heart Toggle Button */}
                {product && (
                  <button
                    onClick={() => {
                      toggleWishlist({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image || null,
                        icon: product.icon,
                        category: product.category,
                      });
                    }}
                    className={`px-5 py-4 border rounded-lg transition shadow-xs flex items-center justify-center ${
                      isWishlisted
                        ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                        : "border-slate-300 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                    }`}
                    title="Toggle Wishlist"
                  >
                    <svg
                      className={`w-6 h-6 transition ${isWishlisted ? "fill-red-600 stroke-red-600 text-red-600" : "text-slate-500 hover:text-red-600"}`}
                      fill={isWishlisted ? "currentColor" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Enquire Price Row */}
              <div className="flex flex-col sm:flex-row gap-3">
                {isLoggedIn ? (
                  // Logged in: show enquire button normally
                  <button className="flex-1 bg-red-600 text-white font-extrabold text-sm py-4 px-8 rounded-lg hover:bg-red-700 transition shadow-md shadow-red-500/10 hover:shadow-red-500/20">
                    Enquire Price Now
                  </button>
                ) : (
                  // Not logged in: prompt to login before enquiring
                  <Link
                    href="/login"
                    className="flex-1 bg-red-600 text-white font-extrabold text-sm py-4 px-8 rounded-lg hover:bg-red-700 transition text-center shadow-md"
                  >
                    🔒 Login to Enquire Price
                  </Link>
                )}
                <button
                  onClick={() => router.back()}
                  className="bg-white border border-slate-300 text-slate-700 font-extrabold text-sm py-4 px-8 rounded-lg hover:bg-slate-50 transition"
                >
                  Back to Catalog
                </button>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Dynamic Footer */}
      <Footer />
    </div>
  );
}
