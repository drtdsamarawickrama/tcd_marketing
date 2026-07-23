<?php
// PHP template for rendering add-product form and real-time card preview using Tailwind CSS
?>
<div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col gap-6">
    <div class="flex items-center justify-between border-b border-slate-100 pb-3">
        <span class="text-lg font-bold text-slate-800">Add New Product</span>
        <span class="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full" id="form-category-indicator">Category: bedroom</span>
    </div>

    <!-- Live Card Preview container -->
    <div>
        <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Live Preview (Next.js Card Style)</div>
        <div class="bg-slate-50 border border-dashed border-slate-200 rounded-lg p-6 flex justify-center">
            <!-- Next.js Mockup Product Card -->
            <div class="bg-white border border-zinc-200 rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-200 flex flex-col justify-between w-full max-w-[280px] shadow-sm relative" id="preview-card">
                
                <!-- Product Image Area -->
                <div class="h-44 bg-gradient-to-br from-amber-200 to-amber-300 relative flex items-center justify-center overflow-hidden" id="preview-image-bg">
                    <span class="absolute top-3 left-3 bg-red-600 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded-sm tracking-wider" id="preview-badge">SALE</span>
                    <span class="text-5xl group-hover:scale-110 transition duration-200" id="preview-emoji">🛏️</span>
                </div>

                <!-- Product Info details -->
                <div class="p-4 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 class="text-sm font-bold text-slate-800 line-clamp-2 min-h-[40px] leading-tight" id="preview-title">
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

    <!-- Form Inputs -->
    <form id="add-product-form" class="flex flex-col gap-4">
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
                        <div class="gradient-option h-8 rounded-md cursor-pointer border-2 border-transparent hover:scale-105 transition-all duration-150 <?= $classes ?>" 
                             data-classes="<?= $classes ?>" 
                             title="<?= $label ?>"></div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>

        <button type="submit" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-lg transition duration-150 flex items-center justify-center gap-2 shadow-sm text-sm mt-2">
            <span>Add Product to Category</span>
        </button>
    </form>
</div>
