<?php
// Gallery management page - admin panel for managing walkthrough videos and inspiration images
require_once 'includes/auth_check.php';
require_once 'config.php';

// Categories for sidebar navigation back to index.php
$categories = [
    'bedroom'          => ['name' => 'Bedroom Collections',    'icon' => '🛏️', 'gradient' => 'from-amber-200 to-amber-300'],
    'dining'           => ['name' => 'Dining Collections',     'icon' => '🍽️', 'gradient' => 'from-amber-100 to-amber-200'],
    'electrics'        => ['name' => 'Electrics & Appliances', 'icon' => '📺', 'gradient' => 'from-slate-800 to-slate-900'],
    'living-room'      => ['name' => 'Living Room',            'icon' => '🛋️', 'gradient' => 'from-orange-100 to-amber-200'],
    'office-furniture' => ['name' => 'Office Furniture',       'icon' => '🏢', 'gradient' => 'from-slate-100 to-zinc-200'],
    'plastic-products' => ['name' => 'Plastic Products',       'icon' => '📦', 'gradient' => 'from-indigo-50 to-blue-100'],
    'budget-items'     => ['name' => 'Budget Items',           'icon' => '🏷️', 'gradient' => 'from-lime-100 to-yellow-200']
];

// Presets for image item background gradients if direct image file is not uploaded
$gradient_presets = [
    'from-amber-200 to-amber-400'  => 'Soft Amber',
    'from-slate-200 to-indigo-300' => 'Cool Blue',
    'from-orange-200 to-amber-300' => 'Sunset Gold',
    'from-slate-300 to-slate-500'  => 'Dark Steel',
    'from-pink-100 to-sky-200'     => 'Pastel Dream',
    'from-red-100 to-amber-200'    => 'Warm Sand'
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TCD Marketing - Gallery Management</title>
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
        .toast { background-color: #0f172a; color: white; padding: 16px 24px; border-radius: 8px; font-size: 14px; font-weight: 500; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); display: flex; align-items: center; gap: 12px; transform: translateX(120%); transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55); border-left: 4px solid #dc2626; z-index: 9999; }
        .toast.success { border-left-color: #10b981; }
        .toast.show { transform: translateX(0); }
        .gradient-option.selected { border-color: #dc2626; box-shadow: 0 0 0 2px #fff inset; }
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

    <!-- Sidebar include -->
    <?php include 'includes/sidebar.php'; ?>

    <!-- Main Content Area -->
    <div class="flex-grow flex-1 ml-0 lg:ml-72 p-4 sm:p-8 lg:p-10 max-w-full flex flex-col gap-8 animate-fade-in">

        <!-- Page Header -->
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Inspiration Gallery Management</h1>
                <p class="text-sm text-slate-500 mt-1">Manage B2B flagship walkthrough videos and design inspiration posts.</p>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 items-start">

            <!-- Left Panel: Add Gallery Item Form -->
            <div class="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col gap-5 animate-scale-up">
                <h2 class="text-lg font-extrabold text-slate-800">Add Gallery Post</h2>

                <form id="gallery-form" class="flex flex-col gap-4">

                    <!-- Title -->
                    <div class="flex flex-col gap-1.5">
                        <label class="text-xs font-bold text-slate-600">Post Title *</label>
                        <input type="text" id="gallery_title" name="title" required class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-red-500 text-slate-900" placeholder="e.g. Kiribathgoda Flagship Store Walk Through">
                    </div>

                    <!-- Category Tab Filter -->
                    <div class="flex flex-col gap-1.5">
                        <label class="text-xs font-bold text-slate-600">Category Tag *</label>
                        <select id="gallery_category" name="category" required class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-red-500 text-slate-900">
                            <option value="showrooms">Showrooms</option>
                            <option value="living">Living Room</option>
                            <option value="bedroom">Bedroom</option>
                            <option value="dining">Dining</option>
                            <option value="office">Office</option>
                        </select>
                    </div>

                    <!-- Type Selector -->
                    <div class="flex flex-col gap-1.5">
                        <label class="text-xs font-bold text-slate-600">Post Type *</label>
                        <div class="grid grid-cols-2 gap-2">
                            <label class="flex items-center gap-2 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                                <input type="radio" name="type" value="video" checked onchange="toggleTypeFields()" class="text-red-650">
                                <span class="text-xs font-semibold text-slate-700">YouTube Video</span>
                            </label>
                            <label class="flex items-center gap-2 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                                <input type="radio" name="type" value="image" onchange="toggleTypeFields()" class="text-red-650">
                                <span class="text-xs font-semibold text-slate-700">Image Card</span>
                            </label>
                        </div>
                    </div>

                    <!-- Video Fields (YouTube URL) -->
                    <div id="video-fields-container" class="flex flex-col gap-4">
                        <div class="flex flex-col gap-1.5">
                            <label class="text-xs font-bold text-slate-600">YouTube Video URL *</label>
                            <input type="url" id="gallery_youtube_url" name="youtube_url" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-red-500 text-slate-900" placeholder="https://www.youtube.com/watch?v=...">
                        </div>
                    </div>

                    <!-- Image Fields (File Upload / Gradients) -->
                    <div id="image-fields-container" class="hidden flex-col gap-4">
                        <div class="flex flex-col gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <span class="text-xs font-bold text-slate-700">Post Image Source</span>
                            
                            <div class="flex flex-col gap-1.5">
                                <label class="text-[11px] font-bold text-slate-500">Option A: Upload Image File</label>
                                <input type="file" id="gallery_image_file" name="image_file" accept="image/*" class="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-950">
                            </div>

                            <div class="relative flex py-1 items-center">
                                <div class="grow border-t border-slate-300"></div>
                                <span class="shrink mx-4 text-[10px] text-slate-400 font-bold uppercase">Or</span>
                                <div class="grow border-t border-slate-300"></div>
                            </div>

                            <div class="flex flex-col gap-1.5">
                                <label class="text-[11px] font-bold text-slate-500">Option B: Image URL or Gradient Preset</label>
                                <input type="text" id="gallery_image_path" name="image_path" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-950" placeholder="e.g. from-amber-200 to-amber-400">
                                
                                <div class="grid grid-cols-3 gap-1.5 mt-2">
                                    <?php foreach ($gradient_presets as $classes => $label): ?>
                                        <div class="gradient-option h-7 rounded-md cursor-pointer border border-slate-300 bg-gradient-to-br <?= $classes ?>" 
                                             onclick="selectGradientPreset(this, '<?= $classes ?>')"
                                             title="<?= $label ?>"></div>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Description -->
                    <div class="flex flex-col gap-1.5">
                        <label class="text-xs font-bold text-slate-600">Description (Optional)</label>
                        <textarea id="gallery_description" name="description" rows="3" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-red-500 text-slate-900" placeholder="Provide a brief explanation or caption..."></textarea>
                    </div>

                    <!-- Submit -->
                    <div class="pt-2">
                        <button type="submit" id="gallery-submit-btn" class="w-full bg-red-600 text-white font-extrabold text-sm py-3 px-4 rounded-lg hover:bg-red-750 transition flex items-center justify-center gap-2">
                            <span>Add Gallery Post</span>
                        </button>
                    </div>
                </form>
            </div>

            <!-- Right Panel: Existing Gallery Cards -->
            <div class="flex flex-col gap-4 animate-slide-up">
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-bold text-slate-900">Current Gallery Items</h3>
                    <span id="gallery-count-label" class="text-xs font-semibold text-slate-500 bg-slate-200/60 px-3 py-1 rounded-full">0 Items</span>
                </div>
                <div id="gallery-list" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <!-- Javascript populates gallery list dynamically -->
                </div>
            </div>

        </div>
    </div>

    <!-- Alert Toast Box -->
    <div class="toast-container fixed top-6 right-6 z-50 flex flex-col gap-2.5" id="toast-box"></div>

    <script>
        // Toggle conditional fields depending on Post Type selected
        function toggleTypeFields() {
            const selectedType = document.querySelector('input[name="type"]:checked').value;
            const videoFields = document.getElementById('video-fields-container');
            const imageFields = document.getElementById('image-fields-container');

            if (selectedType === 'video') {
                videoFields.classList.remove('hidden');
                videoFields.classList.add('flex');
                imageFields.classList.remove('flex');
                imageFields.classList.add('hidden');
            } else {
                videoFields.classList.remove('flex');
                videoFields.classList.add('hidden');
                imageFields.classList.remove('hidden');
                imageFields.classList.add('flex');
            }
        }

        // Handle gradient preset clicks
        function selectGradientPreset(element, classes) {
            document.querySelectorAll('.gradient-option').forEach(opt => opt.classList.remove('gradient-option-selected', 'border-red-650', 'ring-2', 'ring-white', 'ring-inset'));
            element.classList.add('gradient-option-selected', 'border-red-650', 'ring-2', 'ring-white', 'ring-inset');
            document.getElementById('gallery_image_path').value = classes;
        }

        // Toast utility
        function showGalleryToast(message, type = 'success') {
            const box = document.getElementById('toast-box');
            const toast = document.createElement('div');
            toast.className = `toast ${type === 'success' ? 'success' : 'error'}`;
            toast.innerHTML = `
                <span>${type === 'success' ? '✅' : '⚠️'}</span>
                <span>${message}</span>
            `;
            box.appendChild(toast);
            setTimeout(() => toast.classList.add('show'), 10);
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        // Load all gallery items
        let galleryItemsList = [];
        function loadGalleryItems() {
            const listContainer = document.getElementById('gallery-list');
            listContainer.innerHTML = `
                <div class="col-span-full py-8 text-center text-slate-400 font-semibold flex flex-col items-center justify-center gap-2.5">
                    <span class="w-7 h-7 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></span>
                    Loading Gallery Items...
                </div>
            `;

            fetch('api/get_gallery.php')
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        galleryItemsList = res.data;
                        document.getElementById('gallery-count-label').innerText = `${galleryItemsList.length} Items`;
                        renderGalleryGrid();
                    } else {
                        showGalleryToast(res.message || 'Failed to load gallery items.', 'error');
                    }
                })
                .catch(() => {
                    showGalleryToast('Connection error.', 'error');
                });
        }

        // Helper to extract Youtube video ID
        function getYoutubeId(url) {
            if (!url) return '';
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            const match = url.match(regExp);
            return (match && match[2].length === 11) ? match[2] : '';
        }

        // Render the gallery items grid
        function renderGalleryGrid() {
            const listContainer = document.getElementById('gallery-list');
            if (galleryItemsList.length === 0) {
                listContainer.innerHTML = `
                    <div class="col-span-full bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-400 font-medium">
                        No gallery posts found. Add one on the left panel!
                    </div>
                `;
                return;
            }

            listContainer.innerHTML = galleryItemsList.map(item => {
                let previewHtml = '';

                if (item.type === 'video') {
                    const videoId = getYoutubeId(item.youtube_url);
                    if (videoId) {
                        previewHtml = `
                            <div class="aspect-video w-full bg-black relative">
                                <img src="https://img.youtube.com/vi/${videoId}/mqdefault.jpg" class="w-full h-full object-cover opacity-80" alt="Video Preview">
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <span class="w-12 h-12 bg-red-600/90 text-white rounded-full flex items-center justify-center font-bold shadow-lg text-lg transform hover:scale-110 transition duration-150">▶</span>
                                </div>
                            </div>
                        `;
                    } else {
                        previewHtml = `<div class="h-32 bg-slate-900 text-white flex items-center justify-center text-xs">Invalid Video URL</div>`;
                    }
                } else {
                    if (item.image_path.startsWith('from-')) {
                        previewHtml = `<div class="h-32 bg-gradient-to-br ${item.image_path} flex items-center justify-center text-white font-extrabold text-sm uppercase">Gradient Card</div>`;
                    } else {
                        previewHtml = `<img src="${item.image_path}" class="h-32 w-full object-cover" alt="Image Post" onerror="this.src='../logo.jpeg'">`;
                    }
                }

                return `
                    <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between h-full">
                        <div>
                            ${previewHtml}
                            <div class="p-4 space-y-2">
                                <div class="flex justify-between items-center">
                                    <span class="text-[9px] font-black text-red-600 uppercase tracking-widest">${item.category}</span>
                                    <span class="text-[9px] font-bold px-2 py-0.5 rounded-full ${item.type === 'video' ? 'bg-red-50 text-red-650 border border-red-200' : 'bg-slate-100 text-slate-700 border border-slate-200'} capitalize">${item.type}</span>
                                </div>
                                <h4 class="font-extrabold text-slate-800 text-sm leading-snug">${item.title}</h4>
                                ${item.description ? `<p class="text-[11px] text-slate-500 line-clamp-2">${item.description}</p>` : ''}
                            </div>
                        </div>
                        <div class="px-4 pb-4 pt-2 border-t border-slate-100 flex justify-end">
                            <button onclick="deleteGalleryItem(${item.id})" class="text-xs text-red-600 hover:text-red-800 hover:bg-red-50 font-bold px-3 py-1.5 rounded-lg border border-transparent hover:border-red-200 transition duration-150">
                                Delete Post
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Delete gallery item request
        function deleteGalleryItem(id) {
            if (!confirm('Are you sure you want to delete this gallery post?')) return;

            fetch(`api/delete_gallery_item.php?id=${id}`)
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        showGalleryToast(res.message);
                        loadGalleryItems();
                    } else {
                        showGalleryToast(res.message || 'Failed to delete post.', 'error');
                    }
                })
                .catch(() => {
                    showGalleryToast('Connection error.', 'error');
                });
        }

        // Submit form handler
        document.getElementById('gallery-form').addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = document.getElementById('gallery-submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="spinner"></span> <span>Saving...</span>`;

            const formData = new FormData(this);

            fetch('api/add_gallery_item.php', {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        showGalleryToast(res.message);
                        document.getElementById('gallery-form').reset();
                        document.querySelectorAll('.gradient-option').forEach(opt => opt.classList.remove('gradient-option-selected', 'border-red-650', 'ring-2', 'ring-white', 'ring-inset'));
                        toggleTypeFields();
                        loadGalleryItems();
                    } else {
                        showGalleryToast(res.message || 'Failed to save gallery item.', 'error');
                    }
                })
                .catch(() => {
                    showGalleryToast('Connection error.', 'error');
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<span>Add Gallery Post</span>`;
                });
        });

        // Initialize mobile menu triggers
        document.getElementById('toggle-sidebar-btn')?.addEventListener('click', () => {
            document.getElementById('sidebar-menu')?.classList.remove('-translate-x-full');
            document.getElementById('sidebar-overlay')?.classList.remove('hidden');
        });
        document.getElementById('close-sidebar-btn')?.addEventListener('click', () => {
            document.getElementById('sidebar-menu')?.classList.add('-translate-x-full');
            document.getElementById('sidebar-overlay')?.classList.add('hidden');
        });
        document.getElementById('sidebar-overlay')?.addEventListener('click', () => {
            document.getElementById('sidebar-menu')?.classList.add('-translate-x-full');
            document.getElementById('sidebar-overlay')?.classList.add('hidden');
        });

        // Initial Load
        loadGalleryItems();
    </script>
</body>
</html>
