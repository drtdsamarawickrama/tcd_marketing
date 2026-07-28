<?php
// PHP template for rendering sidebar navigation using Tailwind CSS
?>
<style>
    /* Hide scrollbar for Chrome, Safari, and Opera */
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }
    /* Hide scrollbar for IE, Edge, and Firefox */
    .no-scrollbar {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
</style>

<div id="sidebar-menu" class="w-72 fixed top-0 left-0 h-screen bg-slate-900 text-slate-300 flex flex-col p-6 border-r border-slate-800 z-50 transition-all duration-300 -translate-x-full lg:translate-x-0">
    <div class="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
        <h2 class="text-xl font-black tracking-tight text-white">TCD<span class="text-red-600"> Marketing</span></h2>
        <!-- Close button for mobile menu -->
        <button id="close-sidebar-btn" class="lg:hidden text-slate-400 hover:text-white p-1 focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
    </div>
    
    <ul class="flex flex-col gap-2 grow overflow-y-auto pr-1 no-scrollbar">
        <li class="category-item <?php echo (basename($_SERVER['PHP_SELF']) == 'index.php') ? 'active' : ''; ?> group flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-slate-800 hover:text-white transition duration-200 font-semibold text-sm text-slate-400" data-category="all">
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

        <!-- Separator for separate management sections -->
        <li class="mt-2 pt-2 border-t border-slate-800 flex flex-col gap-2">
            <!-- Banners management link - navigates to banner page section -->
            <a href="banners.php" class="category-item-banners flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-slate-800 hover:text-white transition duration-200 font-semibold text-sm text-slate-400 <?php echo (basename($_SERVER['PHP_SELF']) == 'banners.php') ? 'active bg-slate-800 text-white border-l-4 border-red-600 pl-2' : ''; ?>">
                <div class="flex items-center gap-3">
                    <span class="text-lg">🖼️</span>
                    <span>Manage Banners</span>
                </div>
                <span class="text-[10px] bg-blue-900/50 text-blue-400 font-bold px-2 py-0.5 rounded-full">Slider</span>
            </a>
            <!-- Gallery management link - navigates to gallery page section -->
            <a href="gallery.php" class="category-item-gallery flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-slate-800 hover:text-white transition duration-200 font-semibold text-sm text-slate-400 <?php echo (basename($_SERVER['PHP_SELF']) == 'gallery.php') ? 'active bg-slate-800 text-white border-l-4 border-red-600 pl-2' : ''; ?>">
                <div class="flex items-center gap-3">
                    <span class="text-lg">📸</span>
                    <span>Manage Gallery</span>
                </div>
                <span class="text-[10px] bg-emerald-900/50 text-emerald-400 font-bold px-2 py-0.5 rounded-full">B2B</span>
            </a>
        </li>
    </ul>

    <!-- Script to handle category redirects from banners.php or gallery.php back to index.php -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const isBannersPage = window.location.pathname.endsWith('banners.php') || window.location.pathname.endsWith('gallery.php');
            if (isBannersPage) {
                document.querySelectorAll('.category-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const category = item.getAttribute('data-category');
                        window.location.href = `index.php?cat=${category}`;
                    });
                });
            }
        });
    </script>

    <div class="pt-4 border-t border-slate-800 flex flex-col gap-3">
        <a href="logout.php" class="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-red-950/20 hover:bg-red-900/40 border border-red-900/30 text-red-450 hover:text-red-300 transition duration-150 font-bold text-xs uppercase tracking-wider">
            <span>🚪</span>
            <span>Logout</span>
        </a>
        <div class="text-[10px] text-slate-600 text-center mt-1">
            <p>TCD Marketing Dashboard v1.1</p>
        </div>
    </div>
</div>
