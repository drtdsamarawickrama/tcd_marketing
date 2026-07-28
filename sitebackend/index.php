<?php
// Start session and load database configuration
require_once 'includes/auth_check.php';
require_once 'config.php';

// Categories list configuration helper
$categories = [
    'bedroom' => ['name' => 'Bedroom Collections', 'icon' => '🛏️', 'gradient' => 'from-amber-200 to-amber-300'],
    'dining' => ['name' => 'Dining Collections', 'icon' => '🍽️', 'gradient' => 'from-amber-100 to-amber-200'],
    'electrics' => ['name' => 'Electrics & Appliances', 'icon' => '📺', 'gradient' => 'from-slate-800 to-slate-900'],
    'living-room' => ['name' => 'Living Room', 'icon' => '🛋️', 'gradient' => 'from-orange-100 to-amber-200'],
    'office-furniture' => ['name' => 'Office Furniture', 'icon' => '🏢', 'gradient' => 'from-slate-100 to-zinc-200'],
    'plastic-products' => ['name' => 'Plastic Products', 'icon' => '📦', 'gradient' => 'from-indigo-50 to-blue-100'],
    'budget-items' => ['name' => 'Budget Items', 'icon' => '🏷️', 'gradient' => 'from-lime-100 to-yellow-200']
];

// Predefined gradient choices for forms
$gradient_presets = [
    'from-amber-200 to-amber-300' => 'Amber Gold',
    'from-amber-300 to-orange-300' => 'Teak Sunset',
    'from-amber-100 to-stone-200' => 'Stone Dressing',
    'from-sky-50 to-sky-100' => 'Sky Breeze',
    'from-slate-800 to-slate-900 text-white' => 'Slate Dark',
    'from-blue-50 to-blue-200' => 'Blue Clean',
    'from-lime-100 to-yellow-200' => 'Lime Save',
    'from-slate-100 to-zinc-200' => 'Silver Metal'
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TCD Marketing - Item Management Dashboard</title>
    <!-- Google Fonts for typography -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
    <!-- Tailwind CSS via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <style>
        /* Custom sidebar menu overrides for active left boundary indicator */
        .category-item.active {
            border-left: 4px solid #dc2626;
            padding-left: 8px;
            background-color: #1e293b;
            color: #ffffff;
        }
        .category-item.active .count-badge {
            background-color: #dc2626;
            color: #ffffff;
        }
        .gradient-option.selected {
            border-color: #dc2626;
            box-shadow: 0 0 0 2px #fff inset;
        }
        /* Custom spinner utility keyframes */
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .spinner {
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top: 2px solid white;
            width: 14px;
            height: 14px;
            animation: spin 0.8s linear infinite;
        }
        /* Custom styles for toast boxes alert message indicators */
        .toast {
            background-color: #0f172a;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            display: flex;
            align-items: center;
            gap: 12px;
            transform: translateX(120%);
            transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            border-left: 4px solid #dc2626;
        }
        .toast.success {
            border-left-color: #10b981;
        }
        .toast.show {
            transform: translateX(0);
        }
    </style>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen flex flex-col lg:flex-row">

    <!-- Mobile Top Navigation (Visible on mobile/tablet only) -->
    <div class="flex lg:hidden items-center justify-between bg-slate-900 text-white p-4 sticky top-0 z-40 border-b border-slate-800">
        <h2 class="text-lg font-black tracking-tight">TCD<span class="text-red-600"> Marketing</span></h2>
        <button id="toggle-sidebar-btn" class="text-slate-400 hover:text-white p-2 bg-slate-800 rounded-lg focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>
    </div>

    <!-- Dark Overlay Backdrop for Mobile Sidebar -->
    <div id="sidebar-overlay" class="fixed inset-0 bg-black/50 z-40 hidden lg:hidden transition-opacity duration-300"></div>

    <!-- Dynamic sidebar template include -->
    <?php include 'includes/sidebar.php'; ?>

    <!-- Main Workspace dashboard area -->
    <div class="flex-grow flex-1 ml-0 lg:ml-72 p-4 sm:p-8 lg:p-10 max-w-full flex flex-col gap-8 animate-fade-in">
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Item Management</h1>
                <p class="text-sm text-slate-500 mt-1">Add products individually to any category separate and deploy them instantly.</p>
            </div>
            <div>
                <a href="api/setup_db.php" onclick="openConfirmModal(event)" class="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold py-2 px-4 rounded-lg text-sm shadow-sm transition duration-150 inline-flex items-center gap-2">
                    🔄 Re-initialize DB
                </a>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-8 items-start">
            
            <!-- Left panel: Add form template include -->
            <div class="w-full animate-scale-up">
                <?php include 'includes/form.php'; ?>
            </div>

            <!-- Right Panel: Displaying Existing Products Grid -->
            <div class="flex flex-col gap-6 animate-slide-up">
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-bold text-slate-900" id="current-category-title">All Products</h3>
                    <span id="items-found-label" class="text-xs font-semibold text-slate-500 bg-slate-200/60 px-3 py-1 rounded-full">
                        0 Items
                    </span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" id="products-grid">
                    <!-- Javascript populates items list dynamically here -->
                </div>
            </div>

        </div>
    </div>

    <!-- Container for dynamic alert toasts -->
    <div class="toast-container fixed top-6 right-6 z-1000 flex flex-col gap-2.5" id="toast-box"></div>

    <!-- Custom Animated Confirmation Modal -->
    <?php include 'includes/confirm_modal.php'; ?>

    <!-- Pure Javascript logics for Dashboard -->
    <script src="assets/js/dashboard.js"></script>
</body>
</html>
