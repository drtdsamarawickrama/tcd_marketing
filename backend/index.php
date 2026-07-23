<?php
// Start session and load database connection
session_start();
require_once 'config.php';

// Fetch all items from the database to display count and initial view
try {
    $stmt = $pdo->query("SELECT * FROM `items` ORDER BY `id` DESC");
    $all_items = $stmt->fetchAll();
} catch (PDOException $e) {
    $all_items = [];
    $db_error = $e->getMessage();
}

// Categories list helper for loops
$categories = [
    'bedroom' => ['name' => 'Bedroom Collections', 'icon' => '🛏️', 'gradient' => 'from-amber-200 to-amber-300'],
    'dining' => ['name' => 'Dining Collections', 'icon' => '🍽️', 'gradient' => 'from-amber-100 to-amber-200'],
    'electrics' => ['name' => 'Electrics & Appliances', 'icon' => '📺', 'gradient' => 'from-slate-800 to-slate-900'],
    'living-room' => ['name' => 'Living Room', 'icon' => '🛋️', 'gradient' => 'from-orange-100 to-amber-200'],
    'office-furniture' => ['name' => 'Office Furniture', 'icon' => '🏢', 'gradient' => 'from-slate-100 to-zinc-200'],
    'plastic-products' => ['name' => 'Plastic Products', 'icon' => '📦', 'gradient' => 'from-indigo-50 to-blue-100'],
    'budget-items' => ['name' => 'Budget Items', 'icon' => '🏷️', 'gradient' => 'from-lime-100 to-yellow-200']
];

// Predefined gradient selections for user to choose easily
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
    <title>Damro TCD Marketing - Item Management Dashboard</title>
    <!-- Google Fonts for premium typography -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
    <style>
        /* CSS reset & base variables */
        :root {
            --primary: #dc2626;
            --primary-dark: #b91c1c;
            --bg-dark: #0f172a;
            --bg-card: #ffffff;
            --text-main: #1e293b;
            --text-muted: #64748b;
            --border-color: #e2e8f0;
            --sidebar-width: 280px;
            --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
            --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05);
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: #f8fafc;
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
        }

        /* Sidebar Navigation styling */
        .sidebar {
            width: var(--sidebar-width);
            background-color: var(--bg-dark);
            color: #f1f5f9;
            height: 100vh;
            position: fixed;
            left: 0;
            top: 0;
            display: flex;
            flex-direction: column;
            padding: 24px;
            z-index: 100;
        }

        .logo-area {
            display: flex;
            align-items: center;
            gap: 12px;
            padding-bottom: 24px;
            border-bottom: 1px solid #334155;
            margin-bottom: 24px;
        }

        .logo-area h2 {
            font-size: 20px;
            font-weight: 900;
            letter-spacing: -0.5px;
            color: #ffffff;
        }

        .logo-area h2 span {
            color: var(--primary);
        }

        .category-menu {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 8px;
            flex-grow: 1;
            overflow-y: auto;
        }

        .category-item {
            padding: 12px 16px;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: all 0.2s ease;
            font-weight: 500;
            font-size: 14px;
            color: #94a3b8;
        }

        .category-item:hover, .category-item.active {
            background-color: #1e293b;
            color: #ffffff;
        }

        .category-item.active {
            border-left: 4px solid var(--primary);
            padding-left: 12px;
        }

        .category-item .category-meta {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .category-item .count-badge {
            background-color: #334155;
            color: #cbd5e1;
            font-size: 11px;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 20px;
        }

        .category-item.active .count-badge {
            background-color: var(--primary);
            color: #ffffff;
        }

        .sidebar-footer {
            padding-top: 16px;
            border-top: 1px solid #334155;
            font-size: 12px;
            color: #64748b;
            text-align: center;
        }

        /* Main Workspace layout */
        .workspace {
            margin-left: var(--sidebar-width);
            flex-grow: 1;
            padding: 40px;
            max-width: 1400px;
            display: flex;
            flex-direction: column;
            gap: 30px;
        }

        /* Header bar inside main area */
        .workspace-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .workspace-header h1 {
            font-size: 28px;
            font-weight: 800;
            letter-spacing: -0.5px;
            color: #0f172a;
        }

        .workspace-header p {
            color: var(--text-muted);
            font-size: 14px;
            margin-top: 4px;
        }

        .btn {
            background-color: var(--primary);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-family: inherit;
            transition: all 0.2s;
            text-decoration: none;
        }

        .btn:hover {
            background-color: var(--primary-dark);
            transform: translateY(-1px);
        }

        .btn-outline {
            background-color: transparent;
            color: var(--text-main);
            border: 1px solid var(--border-color);
        }

        .btn-outline:hover {
            background-color: #f1f5f9;
            transform: none;
        }

        /* Layout Grid: Left Form, Right Products Grid */
        .dashboard-content {
            display: grid;
            grid-template-columns: 450px 1fr;
            gap: 30px;
            align-items: start;
        }

        /* Form styling */
        .panel {
            background-color: var(--bg-card);
            border-radius: 12px;
            padding: 24px;
            border: 1px solid var(--border-color);
            box-shadow: var(--shadow);
        }

        .panel-title {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 20px;
            color: #0f172a;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .form-group {
            margin-bottom: 16px;
        }

        .form-group label {
            display: block;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 6px;
            color: #475569;
        }

        .form-control {
            width: 100%;
            padding: 10px 12px;
            border-radius: 6px;
            border: 1px solid #cbd5e1;
            font-family: inherit;
            font-size: 14px;
            outline: none;
            transition: all 0.2s;
        }

        .form-control:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }

        .row-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }

        /* Gradient selection buttons */
        .gradient-selector {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            margin-top: 6px;
        }

        .gradient-option {
            height: 40px;
            border-radius: 6px;
            cursor: pointer;
            border: 2px solid transparent;
            transition: all 0.15s;
            position: relative;
        }

        .gradient-option:hover {
            transform: scale(1.05);
        }

        .gradient-option.selected {
            border-color: var(--primary);
            box-shadow: 0 0 0 2px #fff inset;
        }

        /* Live Preview Card styling */
        .live-preview-box {
            background-color: #f1f5f9;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 20px;
            border: 1px dashed #cbd5e1;
        }

        .preview-label {
            font-size: 11px;
            font-weight: 700;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 10px;
        }

        /* Replica of ProductCard */
        .product-card {
            background: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 320px;
            margin: 0 auto;
            box-shadow: var(--shadow);
        }

        .card-image-area {
            height: 160px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Gradient backgrounds styling */
        .from-amber-200 { background: linear-gradient(135deg, #fde68a, #fcd34d); }
        .from-amber-300 { background: linear-gradient(135deg, #fcd34d, #fdba74); }
        .from-amber-100 { background: linear-gradient(135deg, #fef3c7, #e2e8f0); }
        .from-sky-50 { background: linear-gradient(135deg, #f0f9ff, #e0f2fe); }
        .from-slate-800 { background: linear-gradient(135deg, #1e293b, #0f172a); color: white; }
        .from-blue-50 { background: linear-gradient(135deg, #eff6ff, #bfdbfe); }
        .from-lime-100 { background: linear-gradient(135deg, #ecfccb, #fef08a); }
        .from-slate-100 { background: linear-gradient(135deg, #f1f5f9, #d1d5db); }

        .card-badge {
            position: absolute;
            top: 10px;
            left: 10px;
            background-color: var(--primary);
            color: white;
            font-size: 9px;
            font-weight: 900;
            text-transform: uppercase;
            padding: 2px 6px;
            border-radius: 2px;
            letter-spacing: 0.5px;
        }

        .card-emoji {
            font-size: 48px;
            transition: transform 0.2s;
        }

        .product-card:hover .card-emoji {
            transform: scale(1.1);
        }

        .card-body {
            padding: 16px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-grow: 1;
        }

        .card-title {
            font-size: 14px;
            font-weight: 700;
            color: #1e293b;
            min-height: 40px;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .card-rating {
            color: #f59e0b;
            margin-top: 8px;
            font-size: 12px;
        }

        .card-footer {
            margin-top: 16px;
            padding-top: 12px;
            border-top: 1px solid #f1f5f9;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .price-area {
            display: flex;
            flex-direction: column;
        }

        .old-price {
            font-size: 11px;
            color: #94a3b8;
            text-decoration: line-through;
        }

        .current-price {
            font-size: 15px;
            font-weight: 900;
            color: var(--primary);
        }

        .add-cart-btn {
            background-color: #0f172a;
            color: white;
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 16px;
        }

        /* Products Grid Panel */
        .products-section {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .section-header h3 {
            font-size: 20px;
            color: #0f172a;
            font-weight: 700;
        }

        .grid-layout {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 20px;
        }

        .empty-state {
            grid-column: 1 / -1;
            background-color: white;
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 60px 20px;
            text-align: center;
            color: var(--text-muted);
        }

        .empty-state span {
            font-size: 48px;
            display: block;
            margin-bottom: 12px;
        }

        /* Delete actions */
        .delete-overlay {
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(2px);
            padding: 8px;
            display: flex;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.2s ease;
        }

        .product-card:hover .delete-overlay {
            opacity: 1;
        }

        .btn-danger {
            background-color: var(--primary);
            color: white;
            padding: 6px 12px;
            font-size: 12px;
            border-radius: 4px;
            border: none;
            cursor: pointer;
            font-weight: 600;
        }

        .btn-danger:hover {
            background-color: var(--primary-dark);
        }

        /* Toast Notifications */
        .toast-container {
            position: fixed;
            top: 24px;
            right: 24px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .toast {
            background-color: #0f172a;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: var(--shadow-lg);
            display: flex;
            align-items: center;
            gap: 12px;
            transform: translateX(120%);
            transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            border-left: 4px solid var(--primary);
        }

        .toast.success {
            border-left-color: #10b981;
        }

        .toast.show {
            transform: translateX(0);
        }

        /* Loading spinner */
        .spinner {
            border: 3px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top: 3px solid white;
            width: 16px;
            height: 16px;
            animation: spin 0.8s linear infinite;
            display: inline-block;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
            .dashboard-content {
                grid-template-columns: 1fr;
            }
            .sidebar {
                width: 70px;
                padding: 16px 10px;
            }
            .sidebar h2, .sidebar .sidebar-footer, .category-item span:not(.category-icon) {
                display: none;
            }
            .category-item {
                justify-content: center;
                padding: 12px;
            }
            .workspace {
                margin-left: 70px;
                padding: 24px;
            }
        }
    </style>
</head>
<body>

    <!-- Sidebar component to filter categories -->
    <div class="sidebar">
        <div class="logo-area">
            <h2>DAMRO<span>.TCD</span></h2>
        </div>
        
        <ul class="category-menu">
            <li class="category-item active" data-category="all">
                <div class="category-meta">
                    <span class="category-icon">🏢</span>
                    <span>All Products</span>
                </div>
                <span class="count-badge" id="badge-all"><?= count($all_items) ?></span>
            </li>
            <?php foreach ($categories as $key => $info): ?>
                <?php
                // Count items in this specific category
                $cat_count = 0;
                foreach ($all_items as $itm) {
                    if ($itm['category'] === $key) {
                        $cat_count++;
                    }
                }
                ?>
                <li class="category-item" data-category="<?= $key ?>">
                    <div class="category-meta">
                        <span class="category-icon"><?= $info['icon'] ?></span>
                        <span><?= $info['name'] ?></span>
                    </div>
                    <span class="count-badge" id="badge-<?= $key ?>"><?= $cat_count ?></span>
                </li>
            <?php endforeach; ?>
        </ul>

        <div class="sidebar-footer">
            <p>Damro TCD Dashboard v1.0</p>
        </div>
    </div>

    <!-- Main Working workspace -->
    <div class="workspace">
        <div class="workspace-header">
            <div>
                <h1>Item Management</h1>
                <p>Add products individually to any category separate and deploy them instantly.</p>
            </div>
            <div>
                <a href="api/setup_db.php" class="btn btn-outline">🔄 Re-initialize DB</a>
            </div>
        </div>

        <?php if (isset($db_error)): ?>
            <div style="background:#fee2e2; border:1px solid #fecaca; color:#991b1b; padding:16px; border-radius:8px;">
                <strong>Database Error:</strong> <?= htmlspecialchars($db_error) ?>. Please make sure to run the <a href="api/setup_db.php" style="color:#b91c1c; font-weight:700;">Database Setup script</a> first to create tables.
            </div>
        <?php endif; ?>

        <div class="dashboard-content">
            
            <!-- Left Panel: Input Form and Realtime Card Preview -->
            <div class="panel">
                <div class="panel-title">
                    <span>Add New Product</span>
                    <span style="font-size:11px; background:#f1f5f9; padding:4px 8px; border-radius:4px; font-weight:500;" id="form-category-indicator">Category: bedroom</span>
                </div>

                <!-- Live Card Preview -->
                <div class="preview-label">Live Preview (Next.js Card Style)</div>
                <div class="live-preview-box">
                    <div class="product-card" id="preview-card">
                        <div class="card-image-area from-amber-200 to-amber-300" id="preview-image-bg">
                            <span class="card-badge" id="preview-badge">SALE</span>
                            <span class="card-emoji" id="preview-emoji">🛏️</span>
                        </div>
                        <div class="card-body">
                            <div>
                                <h3 class="card-title" id="preview-title">Solid Wood King Bedroom Set Bed</h3>
                                <div class="card-rating">
                                    ★★★★★
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="price-area">
                                    <span class="old-price" id="preview-old-price">Rs. 98,000</span>
                                    <span class="current-price" id="preview-price">Rs. 89,000</span>
                                </div>
                                <button class="add-cart-btn">+</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Form Inputs -->
                <form id="add-product-form">
                    <div class="form-group">
                        <label for="category">Category Selection</label>
                        <select id="category" name="category" class="form-control" required>
                            <?php foreach ($categories as $key => $info): ?>
                                <option value="<?= $key ?>" data-icon="<?= $info['icon'] ?>" data-gradient="<?= $info['gradient'] ?>">
                                    <?= htmlspecialchars($info['name']) ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="name">Product Title</label>
                        <input type="text" id="name" name="name" class="form-control" placeholder="e.g. Premium Teak 4-Door Wardrobe" required>
                    </div>

                    <div class="row-2">
                        <div class="form-group">
                            <label for="price">Current Price</label>
                            <input type="text" id="price" name="price" class="form-control" placeholder="e.g. Rs. 135,000" required>
                        </div>
                        <div class="form-group">
                            <label for="old_price">Old Price (Optional)</label>
                            <input type="text" id="old_price" name="old_price" class="form-control" placeholder="e.g. Rs. 150,000">
                        </div>
                    </div>

                    <div class="row-2">
                        <div class="form-group">
                            <label for="rating">Rating (1 to 5 Stars)</label>
                            <select id="rating" name="rating" class="form-control" required>
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="2">2 Stars</option>
                                <option value="1">1 Star</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="badge">Promo Badge (Optional)</label>
                            <input type="text" id="badge" name="badge" class="form-control" placeholder="e.g. Sale, New, Hot">
                        </div>
                    </div>

                    <div class="row-2">
                        <div class="form-group">
                            <label for="icon">Category Icon (Emoji)</label>
                            <input type="text" id="icon" name="icon" class="form-control" value="🛏️" required>
                        </div>
                        <div class="form-group">
                            <label>Card Background</label>
                            <input type="hidden" id="image_bg" name="image_bg" value="from-amber-200 to-amber-300">
                            <div class="gradient-selector">
                                <?php foreach ($gradient_presets as $classes => $label): ?>
                                    <div class="gradient-option <?= $classes ?>" 
                                         data-classes="<?= $classes ?>" 
                                         title="<?= $label ?>"></div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn" style="width: 100%; justify-content: center; margin-top: 10px;">
                        <span>Add Product to Category</span>
                    </button>
                </form>
            </div>

            <!-- Right Panel: Displaying Existing Products Grid -->
            <div class="products-section">
                <div class="section-header">
                    <h3 id="current-category-title">All Products</h3>
                    <span id="items-found-label" style="font-size:12px; font-weight:600; color:var(--text-muted); background:#e2e8f0; padding:4px 10px; border-radius:20px;">
                        <?= count($all_items) ?> Items
                    </span>
                </div>

                <div class="grid-layout" id="products-grid">
                    <!-- Items populated dynamically via JS -->
                </div>
            </div>

        </div>
    </div>

    <!-- Toast message boxes -->
    <div class="toast-container" id="toast-box"></div>

    <script>
        // Store all items fetched initially in JavaScript memory
        let itemsList = <?= json_encode($all_items) ?>;
        let selectedCategory = 'all';

        // Predefined category icons lookup helper
        const categoryMeta = {
            'bedroom': { icon: '🛏️', gradient: 'from-amber-200 to-amber-300' },
            'dining': { icon: '🍽️', gradient: 'from-amber-100 to-amber-200' },
            'electrics': { icon: '📺', gradient: 'from-slate-800 to-slate-900 text-white' },
            'living-room': { icon: '🛋️', gradient: 'from-orange-100 to-amber-200' },
            'office-furniture': { icon: '🏢', gradient: 'from-slate-100 to-zinc-200' },
            'plastic-products': { icon: '📦', gradient: 'from-indigo-50 to-blue-100' },
            'budget-items': { icon: '🏷️', gradient: 'from-lime-100 to-yellow-200' }
        };

        // DOM elements cache
        const categorySelect = document.getElementById('category');
        const iconInput = document.getElementById('icon');
        const bgInput = document.getElementById('image_bg');
        const previewCard = document.getElementById('preview-card');
        const previewImageBg = document.getElementById('preview-image-bg');
        const previewEmoji = document.getElementById('preview-emoji');
        const previewBadge = document.getElementById('preview-badge');
        const previewTitle = document.getElementById('preview-title');
        const previewPrice = document.getElementById('preview-price');
        const previewOldPrice = document.getElementById('preview-old-price');
        const addForm = document.getElementById('add-product-form');
        const productsGrid = document.getElementById('products-grid');
        const currentCategoryTitle = document.getElementById('current-category-title');
        const itemsFoundLabel = document.getElementById('items-found-label');
        const toastBox = document.getElementById('toast-box');

        // Show custom toast notification
        function showToast(message, type = 'success') {
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.innerHTML = `<span>${type === 'success' ? '✔' : '❌'}</span> <span>${message}</span>`;
            toastBox.appendChild(toast);
            
            // Trigger animation
            setTimeout(() => toast.classList.add('show'), 10);
            
            // Remove after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        // Live preview synchronization logic
        function updateLivePreview() {
            // Update Title
            const title = document.getElementById('name').value;
            previewTitle.textContent = title ? title : 'Solid Wood King Bedroom Set Bed';
            
            // Update Price
            const price = document.getElementById('price').value;
            previewPrice.textContent = price ? price : 'Rs. 89,000';
            
            // Update Old Price
            const oldPrice = document.getElementById('old_price').value;
            if (oldPrice) {
                previewOldPrice.textContent = oldPrice;
                previewOldPrice.style.display = 'block';
            } else {
                previewOldPrice.style.display = 'none';
            }
            
            // Update Badge
            const badge = document.getElementById('badge').value;
            if (badge) {
                previewBadge.textContent = badge.toUpperCase();
                previewBadge.style.display = 'inline-block';
            } else {
                previewBadge.style.display = 'none';
            }
            
            // Update Emoji icon
            previewEmoji.textContent = iconInput.value ? iconInput.value : '🛏️';
            
            // Update gradient background
            const bgClass = bgInput.value;
            // Clean older dynamic tailwind bg classes before adding
            previewImageBg.className = 'card-image-area';
            bgClass.split(' ').forEach(cls => {
                if(cls.trim() !== '') previewImageBg.classList.add(cls.trim());
            });
        }

        // Setup input change event listeners for preview sync
        document.getElementById('name').addEventListener('input', updateLivePreview);
        document.getElementById('price').addEventListener('input', updateLivePreview);
        document.getElementById('old_price').addEventListener('input', updateLivePreview);
        document.getElementById('badge').addEventListener('input', updateLivePreview);
        iconInput.addEventListener('input', updateLivePreview);

        // Auto update emoji & bg gradients depending on chosen category
        categorySelect.addEventListener('change', function() {
            const selectedOpt = this.options[this.selectedIndex];
            const icon = selectedOpt.getAttribute('data-icon');
            const bg = selectedOpt.getAttribute('data-gradient');
            
            iconInput.value = icon;
            bgInput.value = bg;
            
            // Highlight selected preset gradient indicator
            document.querySelectorAll('.gradient-option').forEach(opt => {
                opt.classList.remove('selected');
                if (opt.getAttribute('data-classes') === bg) {
                    opt.classList.add('selected');
                }
            });

            document.getElementById('form-category-indicator').textContent = 'Category: ' + this.value;
            updateLivePreview();
        });

        // Setup preset gradient click actions
        document.querySelectorAll('.gradient-option').forEach(option => {
            // Set initial selection highlight
            if(option.getAttribute('data-classes') === bgInput.value) {
                option.classList.add('selected');
            }

            option.addEventListener('click', function() {
                document.querySelectorAll('.gradient-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                bgInput.value = this.getAttribute('data-classes');
                updateLivePreview();
            });
        });

        // Render card items into the grid UI
        function renderItems() {
            productsGrid.innerHTML = '';
            
            // Filter list depending on chosen category
            const filtered = selectedCategory === 'all' 
                ? itemsList 
                : itemsList.filter(item => item.category === selectedCategory);
            
            itemsFoundLabel.textContent = `${filtered.length} Items`;

            if (filtered.length === 0) {
                productsGrid.innerHTML = `
                    <div class="empty-state">
                        <span>📦</span>
                        <h3>No items in this category yet</h3>
                        <p>Use the form on the left to add a product separately here.</p>
                    </div>
                `;
                return;
            }

            filtered.forEach(item => {
                // Parse ratings to stars characters
                let ratingStars = '';
                for (let i = 0; i < 5; i++) {
                    ratingStars += i < parseInt(item.rating) ? '★' : '☆';
                }

                // Parse old price HTML
                const oldPriceHTML = item.old_price 
                    ? `<span class="old-price">${item.old_price}</span>` 
                    : '';

                // Parse badge HTML
                const badgeHTML = item.badge 
                    ? `<span class="card-badge">${item.badge.toUpperCase()}</span>` 
                    : '';

                const cardHTML = `
                    <div class="product-card" id="card-${item.id}">
                        <div class="card-image-area ${item.image_bg}">
                            ${badgeHTML}
                            <span class="card-emoji">${item.icon}</span>
                            <div class="delete-overlay">
                                <button class="btn-danger" onclick="deleteItem(${item.id})">Delete Item</button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div>
                                <h3 class="card-title">${item.name}</h3>
                                <div class="card-rating">${ratingStars}</div>
                            </div>
                            <div class="card-footer">
                                <div class="price-area">
                                    ${oldPriceHTML}
                                    <span class="current-price">${item.price}</span>
                                </div>
                                <button class="add-cart-btn">+</button>
                            </div>
                        </div>
                    </div>
                `;
                productsGrid.insertAdjacentHTML('beforeend', cardHTML);
            });
        }

        // Category sidebar menu filtering actions
        document.querySelectorAll('.category-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('.category-item').forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                
                selectedCategory = this.getAttribute('data-category');
                
                // Update header title based on active filter
                const nameSpan = this.querySelector('.category-meta span:not(.category-icon)');
                currentCategoryTitle.textContent = nameSpan ? nameSpan.textContent : 'All Products';
                
                // If filtering by specific category, pre-select it in form dropdown
                if(selectedCategory !== 'all') {
                    categorySelect.value = selectedCategory;
                    categorySelect.dispatchEvent(new Event('change'));
                }
                
                renderItems();
            });
        });

        // Update total badges on sidebar count indicators
        function updateSidebarCounters() {
            document.getElementById('badge-all').textContent = itemsList.length;
            
            // Loop and count each category's items list
            const categoriesKeys = Object.keys(categoryMeta);
            categoriesKeys.forEach(catKey => {
                const count = itemsList.filter(itm => itm.category === catKey).length;
                const badge = document.getElementById(`badge-${catKey}`);
                if(badge) badge.textContent = count;
            });
        }

        // Post request using fetch to add a new item
        addForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="spinner"></span> <span>Saving...</span>`;

            // Prepare key form variables payload
            const formData = {
                category: document.getElementById('category').value,
                name: document.getElementById('name').value,
                price: document.getElementById('price').value,
                old_price: document.getElementById('old_price').value,
                rating: document.getElementById('rating').value,
                badge: document.getElementById('badge').value,
                icon: document.getElementById('icon').value,
                image_bg: document.getElementById('image_bg').value
            };

            fetch('api/add_item.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(res => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;

                if (res.success) {
                    showToast('Product added successfully!');
                    
                    // Add newly inserted product to memory array
                    formData.id = res.id;
                    itemsList.unshift(formData); // Add to beginning
                    
                    // Clear form text inputs
                    document.getElementById('name').value = '';
                    document.getElementById('price').value = '';
                    document.getElementById('old_price').value = '';
                    document.getElementById('badge').value = '';
                    
                    // Refresh view
                    updateSidebarCounters();
                    renderItems();
                    updateLivePreview();
                } else {
                    showToast(res.message || 'Error occurred while adding product.', 'error');
                }
            })
            .catch(err => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                showToast('Failed to connect to backend server API.', 'error');
            });
        });

        // Request delete action endpoint using fetch
        window.deleteItem = function(id) {
            if(!confirm('Are you sure you want to delete this item?')) return;

            fetch(`api/delete_item.php?id=${id}`)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    showToast('Product deleted successfully.');
                    
                    // Filter deleted item out of memory list array
                    itemsList = itemsList.filter(item => parseInt(item.id) !== parseInt(id));
                    
                    // Refresh rendering
                    updateSidebarCounters();
                    renderItems();
                } else {
                    showToast(res.message || 'Could not delete product.', 'error');
                }
            })
            .catch(err => {
                showToast('Connection error during deletion request.', 'error');
            });
        };

        // Initialize display list on page load
        renderItems();
        updateLivePreview();
    </script>
</body>
</html>
