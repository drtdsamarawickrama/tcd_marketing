<?php
// PHP template for rendering add-product form and real-time card preview using Tailwind CSS
?>
<div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col gap-6">
    <div class="flex items-center justify-between border-b border-slate-100 pb-3">
        <span class="text-lg font-bold text-slate-800" id="form-title-heading">Add New Product</span>
        <span class="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full" id="form-category-indicator">Category: bedroom</span>
    </div>

    <!-- Live Card Preview container -->
    <div>
        <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Live Preview (Next.js Card Style)</div>
        <div class="bg-slate-50 border border-dashed border-slate-200 rounded-lg p-6 flex justify-center">
            <!-- Next.js Mockup Product Card -->
            <div class="bg-white border border-zinc-200 rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-200 flex flex-col justify-between w-full max-w-70 shadow-sm relative" id="preview-card">
                
                <!-- Product Image Area -->
                <div class="h-44 bg-linear-to-br from-amber-200 to-amber-300 relative flex items-center justify-center overflow-hidden" id="preview-image-bg">
                    <span class="absolute top-3 left-3 bg-red-600 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded-sm tracking-wider" id="preview-badge">SALE</span>
                    <img id="preview-image" src="" alt="Preview Product" class="w-full h-full object-cover hidden" />
                    <span class="text-5xl group-hover:scale-110 transition duration-200" id="preview-emoji">🛏️</span>
                </div>

                <!-- Product Info details -->
                <div class="p-4 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 class="text-sm font-bold text-slate-800 line-clamp-2 min-h-10 leading-tight" id="preview-title">
                            Solid Wood King Bedroom Set Bed
                        </h3>
                        <div class="flex gap-0.5 text-amber-500 mt-2 text-xs" id="preview-stars">
                            ★★★★★
                        </div>
                    </div>

                    <!-- Price & Action row -->
                    <div class="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                        <div class="flex flex-col">
                            <span class="text-[10px] text-zinc-400 line-through leading-none block mb-0.5" id="preview-old-price">Rs. 98,000</span>
                            <span class="text-sm font-black text-red-600 leading-none" id="preview-price">Rs. 89,000</span>
                        </div>
                        <button class="bg-slate-900 text-white w-8 h-8 rounded-md hover:bg-red-600 transition duration-150 flex items-center justify-center font-bold text-sm">
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Form Inputs with multipart upload support -->
    <form id="add-product-form" class="flex flex-col gap-4" enctype="multipart/form-data">
        <div class="flex flex-col gap-1.5">
            <label for="category" class="text-xs font-bold text-slate-600">Category Selection</label>
            <select id="category" name="category" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" required>
                <?php foreach ($categories as $key => $info): ?>
                    <option value="<?= $key ?>" data-icon="<?= $info['icon'] ?>" data-gradient="<?= $info['gradient'] ?>">
                        <?= htmlspecialchars($info['name']) ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>

        <div class="flex flex-col gap-1.5">
            <label for="name" class="text-xs font-bold text-slate-600">Product Title</label>
            <input type="text" id="name" name="name" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" placeholder="e.g. Premium Teak 4-Door Wardrobe" required>
        </div>

        <!-- Product Image section supporting file uploads and url options -->
        <div class="flex flex-col gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <span class="text-xs font-bold text-slate-700">Product Image (Choose one option)</span>
            
            <div class="flex flex-col gap-1.5">
                <label for="image_file" class="text-[11px] font-bold text-slate-500">Option A: Upload Local Photo</label>
                <input type="file" id="image_file" name="image_file" accept="image/*" class="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition">
            </div>

            <div class="relative flex py-1 items-center">
                <div class="grow border-t border-slate-300"></div>
                <span class="shrink mx-4 text-[10px] text-slate-400 font-bold uppercase">Or</span>
                <div class="grow border-t border-slate-300"></div>
            </div>

            <div class="flex flex-col gap-1.5">
                <label for="image" class="text-[11px] font-bold text-slate-500">Option B: Product Image URL</label>
                <input type="url" id="image" name="image" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" placeholder="e.g. https://example.com/product-sofa.jpg">
            </div>
        </div>

        <!-- Gallery Images section (Multiple Uploads & URLs) -->
        <div class="flex flex-col gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <span class="text-xs font-bold text-slate-700">Gallery Images (Optional - Additional Photos)</span>
            
            <div class="flex flex-col gap-1.5">
                <label for="gallery_files" class="text-[11px] font-bold text-slate-500">Option A: Upload Multiple Gallery Photos</label>
                <input type="file" id="gallery_files" name="gallery_files[]" accept="image/*" multiple class="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition">
            </div>

            <div class="relative flex py-1 items-center">
                <div class="grow border-t border-slate-300"></div>
                <span class="shrink mx-4 text-[10px] text-slate-400 font-bold uppercase">Or</span>
                <div class="grow border-t border-slate-300"></div>
            </div>

            <div class="flex flex-col gap-1.5">
                <label for="gallery_urls" class="text-[11px] font-bold text-slate-500">Option B: Gallery Image URLs (One URL per line)</label>
                <textarea id="gallery_urls" name="gallery_urls" rows="2" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" placeholder="e.g. https://example.com/image2.jpg&#10;https://example.com/image3.jpg"></textarea>
            </div>
        </div>

        <!-- Item Code / SKU field -->
        <div class="flex flex-col gap-1.5">
            <label for="item_code" class="text-xs font-bold text-slate-600">Item Code / SKU (Optional)</label>
            <input type="text" id="item_code" name="item_code" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" placeholder="e.g. TCD-0001">
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
                <label for="price" class="text-xs font-bold text-slate-600">Current Price</label>
                <input type="text" id="price" name="price" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" placeholder="e.g. Rs. 135,000" required>
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="old_price" class="text-xs font-bold text-slate-600">Old Price (Optional)</label>
                <input type="text" id="old_price" name="old_price" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" placeholder="e.g. Rs. 150,000">
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
                <label for="rating" class="text-xs font-bold text-slate-600">Rating (1 to 5 Stars)</label>
                <select id="rating" name="rating" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" required>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                </select>
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="badge" class="text-xs font-bold text-slate-600">Promo Badge (Optional)</label>
                <input type="text" id="badge" name="badge" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" placeholder="e.g. Sale, New, Hot">
            </div>
        </div>

        <div class="flex flex-col gap-1.5">
            <label for="tag" class="text-xs font-bold text-slate-600">Featured Placement Tag (Optional)</label>
            <select id="tag" name="tag" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition">
                <option value="">None (Standard Product)</option>
                <option value="best">Best Seller (Home Page)</option>
                <option value="new">New Arrival (Home Page)</option>
                <option value="offer">Special Offer (Home Page)</option>
            </select>
        </div>

        <!-- Subcategory selection (Visible only when category is living-room or bedroom) -->
        <div class="flex flex-col gap-1.5" id="subcategory-field">
            <label for="subcategory" id="subcategory-label" class="text-xs font-bold text-slate-600">Product Subcategory (Optional)</label>
            <select id="subcategory" name="subcategory" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition">
                <option value="">None (Standard Product)</option>
            </select>
        </div>

        <div class="flex flex-col gap-1.5">
            <label for="description" class="text-xs font-bold text-slate-600">Product Description (Optional, newlines create bullet points)</label>
            <textarea id="description" name="description" rows="3" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" placeholder="e.g. Crafted from solid teak wood.&#10;Polished mahogany varnish finish."></textarea>
        </div>

        <div class="flex flex-col gap-1.5">
            <label for="dimensions" class="text-xs font-bold text-slate-600">Product Dimensions (Optional, newlines split entries)</label>
            <textarea id="dimensions" name="dimensions" rows="2" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" placeholder="e.g. Length - 186cm | Width - 81cm | Height - 86cm"></textarea>
        </div>

        <div class="flex flex-col gap-1.5">
            <label for="warranty" class="text-xs font-bold text-slate-600">Warranty Details (Optional, newlines split items)</label>
            <textarea id="warranty" name="warranty" rows="2" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" placeholder="e.g. 10 Years wood rot warranty.&#10;3 Years fabrics frame warranty."></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
                <label for="icon" class="text-xs font-bold text-slate-600">Category Icon (Emoji)</label>
                <input type="text" id="icon" name="icon" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" value="🛏️" required>
            </div>
            <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-600">Card Background</label>
                <input type="hidden" id="image_bg" name="image_bg" value="from-amber-200 to-amber-300">
                <div class="grid grid-cols-4 gap-1.5 mt-1">
                    <?php foreach ($gradient_presets as $classes => $label): ?>
                        <div class="gradient-option h-8 rounded-md cursor-pointer border-2 border-transparent hover:scale-105 transition-all duration-150 bg-gradient-to-br <?= $classes ?>" 
                             data-classes="<?= $classes ?>" 
                             title="<?= $label ?>"></div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>

        <button type="submit" id="form-submit-btn" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-lg transition duration-150 flex items-center justify-center gap-2 shadow-sm text-sm mt-2">
            <span id="form-submit-text">Add Product to Category</span>
        </button>
        <button type="button" id="cancel-edit-btn" class="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg transition duration-150 text-sm hidden">
            Cancel Edit
        </button>
    </form>
</div>
