<?php
// Banners management page - admin panel for managing homepage hero slider slides
require_once 'includes/auth_check.php';
require_once 'config.php';

// Categories for sidebar (reused from index.php)
$categories = [
    'bedroom'          => ['name' => 'Bedroom Collections',    'icon' => '🛏️', 'gradient' => 'from-amber-200 to-amber-300'],
    'dining'           => ['name' => 'Dining Collections',     'icon' => '🍽️', 'gradient' => 'from-amber-100 to-amber-200'],
    'electrics'        => ['name' => 'Electrics & Appliances', 'icon' => '📺', 'gradient' => 'from-slate-800 to-slate-900'],
    'living-room'      => ['name' => 'Living Room',            'icon' => '🛋️', 'gradient' => 'from-orange-100 to-amber-200'],
    'office-furniture' => ['name' => 'Office Furniture',       'icon' => '🏢', 'gradient' => 'from-slate-100 to-zinc-200'],
    'plastic-products' => ['name' => 'Plastic Products',       'icon' => '📦', 'gradient' => 'from-indigo-50 to-blue-100'],
    'budget-items'     => ['name' => 'Budget Items',           'icon' => '🏷️', 'gradient' => 'from-lime-100 to-yellow-200']
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TCD Marketing - Banner Slider Management</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    },
                    keyframes: {
                        fadeIn: {
                            '0%': { opacity: '0' },
                            '100%': { opacity: '1' }
                        },
                        slideUp: {
                            '0%': { transform: 'translateY(15px)', opacity: '0' },
                            '100%': { transform: 'translateY(0)', opacity: '1' }
                        },
                        scaleUp: {
                            '0%': { transform: 'scale(0.97)', opacity: '0' },
                            '100%': { transform: 'scale(1)', opacity: '1' }
                        }
                    },
                    animation: {
                        'fade-in': 'fadeIn 0.6s ease-out forwards',
                        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                        'scale-up': 'scaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                    }
                }
            }
        }
    </script>
    <style>
        /* Active sidebar item indicator */
        .category-item.active { border-left: 4px solid #dc2626; padding-left: 8px; background-color: #1e293b; color: #ffffff; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .spinner { border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; border-top: 2px solid white; width: 14px; height: 14px; animation: spin 0.8s linear infinite; display: inline-block; }
        .toast { background-color: #0f172a; color: white; padding: 16px 24px; border-radius: 8px; font-size: 14px; font-weight: 500; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); display: flex; align-items: center; gap: 12px; transform: translateX(120%); transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55); border-left: 4px solid #dc2626; }
        .toast.success { border-left-color: #10b981; }
        .toast.show { transform: translateX(0); }
    </style>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen flex flex-col lg:flex-row font-sans">

    <!-- Mobile Top Navigation -->
    <div class="flex lg:hidden items-center justify-between bg-slate-900 text-white p-4 sticky top-0 z-40 border-b border-slate-800">
        <h2 class="text-lg font-black tracking-tight">TCD<span class="text-red-600"> Marketing</span></h2>
        <button id="toggle-sidebar-btn" class="text-slate-400 hover:text-white p-2 bg-slate-800 rounded-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
    </div>

    <!-- Sidebar Overlay -->
    <div id="sidebar-overlay" class="fixed inset-0 bg-black/50 z-40 hidden lg:hidden"></div>

    <!-- Sidebar (reused) -->
    <?php include 'includes/sidebar.php'; ?>

    <!-- Main Content Area - fades in -->
    <div class="flex-grow flex-1 ml-0 lg:ml-72 p-4 sm:p-8 lg:p-10 max-w-full flex flex-col gap-8 animate-fade-in">

        <!-- Page Header -->
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Banner / Slider Management</h1>
                <p class="text-sm text-slate-500 mt-1">Manage homepage hero slider images, titles, and links.</p>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 items-start">

            <!-- Left Panel: Add / Edit Banner Form - scales up -->
            <div class="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col gap-5 animate-scale-up">
                <h2 class="text-lg font-extrabold text-slate-800" id="banner-form-title">Add New Banner Slide</h2>

                <form id="banner-form" class="flex flex-col gap-4">

                    <!-- Banner Image Upload -->
                    <div class="flex flex-col gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <span class="text-xs font-bold text-slate-700">Banner Image</span>
                        <div class="flex flex-col gap-1.5">
                            <label class="text-[11px] font-bold text-slate-500">Option A: Upload Image File</label>
                            <input type="file" id="banner_image_file" name="banner_image" accept="image/*" class="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs bg-white">
                        </div>
                        <div class="relative flex py-1 items-center">
                            <div class="grow border-t border-slate-300"></div>
                            <span class="shrink mx-4 text-[10px] text-slate-400 font-bold uppercase">Or</span>
                            <div class="grow border-t border-slate-300"></div>
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <label class="text-[11px] font-bold text-slate-500">Option B: Image URL</label>
                            <input type="url" id="banner_image_url" name="image" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs" placeholder="https://example.com/banner.jpg">
                        </div>
                        <!-- Live preview of selected image -->
                        <div id="banner-preview-container" class="hidden">
                            <img id="banner-preview-img" src="" alt="Preview" class="w-full h-32 object-cover rounded-lg border border-slate-200 mt-1">
                        </div>
                    </div>

                    <!-- Gradient Fallback (shown when no image) -->
                    <div class="flex flex-col gap-1.5">
                        <label class="text-xs font-bold text-slate-600">Background Gradient (fallback when no image)</label>
                        <select id="banner_bg_gradient" name="bg_gradient" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                            <option value="from-rose-600 to-red-700">Rose Red</option>
                            <option value="from-blue-600 to-indigo-800">Blue Indigo</option>
                            <option value="from-amber-700 to-amber-900">Amber Gold</option>
                            <option value="from-green-600 to-emerald-800">Emerald Green</option>
                            <option value="from-purple-600 to-violet-800">Purple Violet</option>
                            <option value="from-slate-700 to-slate-900">Slate Dark</option>
                            <option value="from-red-600 to-red-800">Deep Red</option>
                        </select>
                    </div>

                    <!-- Title & Subtitle -->
                    <div class="grid grid-cols-1 gap-3">
                        <div class="flex flex-col gap-1.5">
                            <label class="text-xs font-bold text-slate-600">Main Title</label>
                            <input type="text" id="banner_title" name="title" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="e.g. Luxury Sofa Collection">
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <label class="text-xs font-bold text-slate-600">Subtitle (Highlighted Text)</label>
                            <input type="text" id="banner_subtitle" name="subtitle" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="e.g. Up to 20% Off">
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <label class="text-xs font-bold text-slate-600">Description (Optional)</label>
                            <textarea id="banner_description" name="description" rows="2" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="Short description text..."></textarea>
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <label class="text-xs font-bold text-slate-600">Pill Tag Label (Optional)</label>
                            <input type="text" id="banner_tag" name="tag" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="e.g. LIVING ROOM FURNITURE">
                        </div>
                    </div>

                    <!-- Button & Link -->
                    <div class="grid grid-cols-2 gap-3">
                        <div class="flex flex-col gap-1.5">
                            <label class="text-xs font-bold text-slate-600">Button Label</label>
                            <input type="text" id="banner_button_text" name="button_text" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="Shop Now" value="Shop Now">
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <label class="text-xs font-bold text-slate-600">Link URL</label>
                            <input type="text" id="banner_link_url" name="link_url" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="/living-room">
                        </div>
                    </div>

                    <!-- Sort Order & Active Toggle -->
                    <div class="grid grid-cols-2 gap-3">
                        <div class="flex flex-col gap-1.5">
                            <label class="text-xs font-bold text-slate-600">Display Order</label>
                            <input type="number" id="banner_sort_order" name="sort_order" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" min="0" value="0">
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <label class="text-xs font-bold text-slate-600">Status</label>
                            <select id="banner_is_active" name="is_active" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                                <option value="1">Active (Visible)</option>
                                <option value="0">Inactive (Hidden)</option>
                            </select>
                        </div>
                    </div>

                    <!-- Submit Buttons -->
                    <div class="flex gap-3 pt-2">
                        <button type="submit" id="banner-submit-btn" class="flex-1 bg-red-600 text-white font-extrabold text-sm py-3 px-4 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2">
                            <span id="banner-submit-text">Add Banner Slide</span>
                        </button>
                        <button type="button" id="cancel-banner-edit-btn" onclick="cancelBannerEdit()" class="hidden bg-slate-200 text-slate-700 font-bold text-sm py-3 px-4 rounded-lg hover:bg-slate-300 transition">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            <!-- Right Panel: Existing Banners List -->
            <div class="flex flex-col gap-4 animate-slide-up">
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-bold text-slate-900">Current Slides</h3>
                    <span id="banners-count-label" class="text-xs font-semibold text-slate-500 bg-slate-200/60 px-3 py-1 rounded-full">0 Slides</span>
                </div>
                <div id="banners-list" class="flex flex-col gap-4">
                    <!-- JS populates banner cards here -->
                </div>
            </div>
        </div>
    </div>

    <!-- Toast Container -->
    <div class="toast-container fixed top-6 right-6 z-50 flex flex-col gap-2.5" id="toast-box"></div>

    <script>
        // Store banners list in memory
        let bannersList = [];
        let editingBannerId = null;

        // Fetch all banners from backend API
        function loadBanners() {
            fetch('api/get_banners.php')
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        // Load ALL banners (including inactive) for admin view - re-fetch without filter
                        fetchAllBannersForAdmin();
                    }
                })
                .catch(() => showBannerToast('Error connecting to banners API.', 'error'));
        }

        // Admin fetch - get all banners (active and inactive)
        function fetchAllBannersForAdmin() {
            fetch('api/get_banners.php?all=1')
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        bannersList = res.data;
                        renderBanners();
                    }
                })
                .catch(() => showBannerToast('Error loading banners.', 'error'));
        }

        // Render banner cards into right panel grid
        function renderBanners() {
            const container = document.getElementById('banners-list');
            document.getElementById('banners-count-label').textContent = bannersList.length + ' Slides';
            container.innerHTML = '';

            if (bannersList.length === 0) {
                container.innerHTML = `
                    <div class="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-400">
                        <span class="text-5xl block mb-3">🖼️</span>
                        <h3 class="font-bold text-slate-700">No banners yet</h3>
                        <p class="text-sm">Add a slide using the form on the left.</p>
                    </div>`;
                return;
            }

            bannersList.forEach(banner => {
                const statusBadge = banner.is_active == 1
                    ? `<span class="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">Active</span>`
                    : `<span class="text-[10px] bg-slate-200 text-slate-500 font-bold px-2 py-0.5 rounded-full">Hidden</span>`;

                const previewStyle = banner.image
                    ? `background-image: url('${banner.image}'); background-size: cover; background-position: center;`
                    : '';
                const gradientClass = banner.bg_gradient || 'from-red-600 to-red-800';

                container.insertAdjacentHTML('beforeend', `
                    <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col sm:flex-row" id="banner-card-${banner.id}">
                        <!-- Mini preview -->
                        <div class="w-full sm:w-44 h-32 sm:h-auto flex-shrink-0 bg-gradient-to-br ${gradientClass} relative" style="${previewStyle}">
                            ${banner.tag ? `<span class="absolute top-2 left-2 bg-white/20 text-white text-[9px] font-black px-2 py-0.5 rounded-full backdrop-blur-sm">${banner.tag}</span>` : ''}
                        </div>
                        <!-- Info -->
                        <div class="flex-1 p-4 flex flex-col justify-between gap-2">
                            <div class="flex items-start justify-between gap-2">
                                <div>
                                    <h4 class="font-extrabold text-slate-800 text-sm leading-tight">${banner.title || 'Untitled'}</h4>
                                    <p class="text-xs text-yellow-600 font-semibold">${banner.subtitle || ''}</p>
                                    <p class="text-xs text-slate-400 mt-1">Order: ${banner.sort_order} &nbsp;·&nbsp; ${statusBadge}</p>
                                </div>
                            </div>
                            <div class="flex gap-2 mt-2">
                                <button onclick="editBanner(${banner.id})" class="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-md hover:bg-blue-700 transition">Edit</button>
                                <button onclick="deleteBanner(${banner.id})" class="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-md hover:bg-red-700 transition">Delete</button>
                                <button onclick="toggleBannerActive(${banner.id}, ${banner.is_active})" class="bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-md hover:bg-slate-300 transition">
                                    ${banner.is_active == 1 ? '🙈 Hide' : '👁 Show'}
                                </button>
                            </div>
                        </div>
                    </div>`);
            });
        }

        // Load banner data into form for editing
        window.editBanner = function(id) {
            const banner = bannersList.find(b => parseInt(b.id) === parseInt(id));
            if (!banner) return;
            editingBannerId = id;

            document.getElementById('banner_title').value       = banner.title || '';
            document.getElementById('banner_subtitle').value    = banner.subtitle || '';
            document.getElementById('banner_description').value = banner.description || '';
            document.getElementById('banner_tag').value         = banner.tag || '';
            document.getElementById('banner_button_text').value = banner.button_text || 'Shop Now';
            document.getElementById('banner_link_url').value    = banner.link_url || '';
            document.getElementById('banner_image_url').value   = banner.image || '';
            document.getElementById('banner_bg_gradient').value = banner.bg_gradient || 'from-rose-600 to-red-700';
            document.getElementById('banner_sort_order').value  = banner.sort_order || 0;
            document.getElementById('banner_is_active').value   = banner.is_active || 1;
            document.getElementById('banner_image_file').value  = '';

            // Show image preview if URL exists
            if (banner.image) {
                document.getElementById('banner-preview-img').src = banner.image;
                document.getElementById('banner-preview-container').classList.remove('hidden');
            } else {
                document.getElementById('banner-preview-container').classList.add('hidden');
            }

            document.getElementById('banner-form-title').textContent  = 'Edit Banner Slide';
            document.getElementById('banner-submit-text').textContent = 'Update Banner';
            document.getElementById('cancel-banner-edit-btn').classList.remove('hidden');

            // Scroll to form
            document.getElementById('banner-form').scrollIntoView({ behavior: 'smooth' });
        };

        // Reset form to add mode
        window.cancelBannerEdit = function() {
            editingBannerId = null;
            document.getElementById('banner-form').reset();
            document.getElementById('banner_button_text').value = 'Shop Now';
            document.getElementById('banner-form-title').textContent  = 'Add New Banner Slide';
            document.getElementById('banner-submit-text').textContent = 'Add Banner Slide';
            document.getElementById('cancel-banner-edit-btn').classList.add('hidden');
            document.getElementById('banner-preview-container').classList.add('hidden');
        };

        // Delete a banner after confirmation
        window.deleteBanner = function(id) {
            if (!confirm('Delete this banner slide? This cannot be undone.')) return;
            fetch(`api/delete_banner.php?id=${id}`, { method: 'POST' })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        bannersList = bannersList.filter(b => parseInt(b.id) !== parseInt(id));
                        renderBanners();
                        showBannerToast('Banner deleted!');
                    } else {
                        showBannerToast(res.message || 'Delete failed.', 'error');
                    }
                });
        };

        // Toggle active/inactive status for a banner
        window.toggleBannerActive = function(id, currentActive) {
            const banner = bannersList.find(b => parseInt(b.id) === parseInt(id));
            if (!banner) return;

            const formData = new FormData();
            formData.append('id',          id);
            formData.append('title',       banner.title       || '');
            formData.append('subtitle',    banner.subtitle    || '');
            formData.append('description', banner.description || '');
            formData.append('tag',         banner.tag         || '');
            formData.append('button_text', banner.button_text || 'Shop Now');
            formData.append('link_url',    banner.link_url    || '');
            formData.append('image',       banner.image       || '');
            formData.append('bg_gradient', banner.bg_gradient || 'from-red-600 to-red-800');
            formData.append('sort_order',  banner.sort_order  || 0);
            formData.append('is_active',   currentActive == 1 ? 0 : 1); // Toggle

            fetch('api/update_banner.php', { method: 'POST', body: formData })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        const idx = bannersList.findIndex(b => parseInt(b.id) === parseInt(id));
                        if (idx !== -1) bannersList[idx].is_active = currentActive == 1 ? 0 : 1;
                        renderBanners();
                        showBannerToast(currentActive == 1 ? 'Banner hidden.' : 'Banner visible!');
                    }
                });
        };

        // Form submit - add or update banner
        document.getElementById('banner-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = document.getElementById('banner-submit-btn');
            const originalText = document.getElementById('banner-submit-text').textContent;
            btn.disabled = true;
            btn.innerHTML = `<span class="spinner"></span> <span>Saving...</span>`;

            const formData = new FormData();
            formData.append('title',       document.getElementById('banner_title').value);
            formData.append('subtitle',    document.getElementById('banner_subtitle').value);
            formData.append('description', document.getElementById('banner_description').value);
            formData.append('tag',         document.getElementById('banner_tag').value);
            formData.append('button_text', document.getElementById('banner_button_text').value);
            formData.append('link_url',    document.getElementById('banner_link_url').value);
            formData.append('image',       document.getElementById('banner_image_url').value);
            formData.append('bg_gradient', document.getElementById('banner_bg_gradient').value);
            formData.append('sort_order',  document.getElementById('banner_sort_order').value);
            formData.append('is_active',   document.getElementById('banner_is_active').value);

            // Attach file if selected
            const fileInput = document.getElementById('banner_image_file');
            if (fileInput.files && fileInput.files[0]) {
                formData.append('banner_image', fileInput.files[0]);
            }

            if (editingBannerId !== null) {
                formData.append('id', editingBannerId);
            }

            const api = editingBannerId !== null ? 'api/update_banner.php' : 'api/add_banner.php';

            fetch(api, { method: 'POST', body: formData })
                .then(res => res.json())
                .then(res => {
                    btn.disabled = false;
                    btn.innerHTML = `<span id="banner-submit-text">${originalText}</span>`;

                    if (res.success) {
                        showBannerToast(editingBannerId !== null ? 'Banner updated!' : 'Banner added!');
                        cancelBannerEdit();
                        fetchAllBannersForAdmin();
                    } else {
                        showBannerToast(res.message || 'Error saving banner.', 'error');
                    }
                })
                .catch(() => {
                    btn.disabled = false;
                    btn.innerHTML = `<span id="banner-submit-text">${originalText}</span>`;
                    showBannerToast('Connection error.', 'error');
                });
        });

        // Show preview when file is selected
        document.getElementById('banner_image_file').addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const url = URL.createObjectURL(this.files[0]);
                document.getElementById('banner-preview-img').src = url;
                document.getElementById('banner-preview-container').classList.remove('hidden');
            }
        });

        // Show preview when URL is typed
        document.getElementById('banner_image_url').addEventListener('input', function() {
            if (this.value.trim()) {
                document.getElementById('banner-preview-img').src = this.value.trim();
                document.getElementById('banner-preview-container').classList.remove('hidden');
            } else {
                document.getElementById('banner-preview-container').classList.add('hidden');
            }
        });

        // Toast notification helper
        function showBannerToast(message, type = 'success') {
            const toastBox = document.getElementById('toast-box');
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.innerHTML = `<span>${type === 'success' ? '✔' : '❌'}</span> <span>${message}</span>`;
            toastBox.appendChild(toast);
            setTimeout(() => toast.classList.add('show'), 10);
            setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
        }

        // Mobile sidebar toggle
        const toggleBtn = document.getElementById('toggle-sidebar-btn');
        const overlay   = document.getElementById('sidebar-overlay');
        const sidebar   = document.getElementById('sidebar-menu');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('-translate-x-full');
                overlay.classList.toggle('hidden');
            });
        }
        if (overlay) {
            overlay.addEventListener('click', () => {
                sidebar.classList.add('-translate-x-full');
                overlay.classList.add('hidden');
            });
        }
        const closeBtn = document.getElementById('close-sidebar-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                sidebar.classList.add('-translate-x-full');
                overlay.classList.add('hidden');
            });
        }

        // Load banners on page load
        fetchAllBannersForAdmin();
    </script>
</body>
</html>
