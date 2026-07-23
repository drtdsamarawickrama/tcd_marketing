<?php
// PHP template for rendering sidebar navigation using Tailwind CSS
?>
<div class="w-72 fixed top-0 left-0 h-screen bg-slate-900 text-slate-300 flex flex-col p-6 border-r border-slate-800 z-50 transition-all duration-300">
    <div class="flex items-center gap-3 pb-6 border-b border-slate-800 mb-6">
        <h2 class="text-xl font-black tracking-tight text-white">TCD<span class="text-red-600"> Marketing</span></h2>
    </div>
    
    <ul class="flex flex-col gap-2 flex-grow overflow-y-auto pr-1">
        <li class="category-item active group flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-slate-800 hover:text-white transition duration-200 font-semibold text-sm text-slate-400" data-category="all">
            <div class="flex items-center gap-3">
                <span class="text-lg">🏢</span>
                <span>All Products</span>
            </div>
            <span class="count-badge bg-slate-800 text-slate-400 group-hover:bg-slate-700 text-[11px] font-bold px-2 py-0.5 rounded-full" id="badge-all">0</span>
        </li>
        <?php foreach ($categories as $key => $info): ?>
            <li class="category-item group flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-slate-800 hover:text-white transition duration-200 font-semibold text-sm text-slate-400" data-category="<?= $key ?>">
                <div class="flex items-center gap-3">
                    <span class="text-lg"><?= $info['icon'] ?></span>
                    <span><?= htmlspecialchars($info['name']) ?></span>
                </div>
                <span class="count-badge bg-slate-800 text-slate-400 group-hover:bg-slate-700 text-[11px] font-bold px-2 py-0.5 rounded-full" id="badge-<?= $key ?>">0</span>
            </li>
        <?php endforeach; ?>
    </ul>

    <div class="pt-4 border-t border-slate-800 text-xs text-slate-600 text-center">
        <p>TCD Marketing Dashboard v1.0</p>
    </div>
</div>
