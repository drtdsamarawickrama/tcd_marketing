<?php
// Start session and load database configuration
require_once '../config.php';

// Set response type as HTML for readability in web browser
header("Content-Type: text/html; charset=UTF-8");

try {
    echo "<h3>Setting up Damro TCD Marketing Database...</h3>";

    // Drop table if exists to clear placeholder data and update schema
    $pdo->exec("DROP TABLE IF EXISTS `items`");
    echo "✔ Existing table `items` dropped to clear placeholders.<br>";

    // Create table items with the new image, tag, and subcategory columns along with descriptions
    $sql_table = "CREATE TABLE `items` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `category` VARCHAR(50) NOT NULL,
        `name` VARCHAR(255) NOT NULL,
        `price` VARCHAR(50) NOT NULL,
        `old_price` VARCHAR(50) DEFAULT NULL,
        `rating` INT DEFAULT 5,
        `image_bg` VARCHAR(255) NOT NULL,
        `badge` VARCHAR(50) DEFAULT NULL,
        `image` VARCHAR(255) DEFAULT NULL,
        `tag` VARCHAR(20) DEFAULT NULL,
        `subcategory` VARCHAR(50) DEFAULT NULL,
        `icon` VARCHAR(50) NOT NULL,
        `item_code` VARCHAR(50) DEFAULT NULL,
        `description` TEXT DEFAULT NULL,
        `dimensions` TEXT DEFAULT NULL,
        `warranty` TEXT DEFAULT NULL,
        `additional_images` TEXT DEFAULT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    $pdo->exec($sql_table);
    echo "✔ Table `items` created with new schema.<br>";

    // Populate mock items only if explicitly requested via ?mock=1
    if (isset($_GET['mock']) && $_GET['mock'] == '1') {
        echo "Populating with initial mock items...<br>";
        
        // Mock data to insert (category, name, price, old_price, rating, image_bg, badge, image, tag, subcategory, icon, description, dimensions, warranty)
        $mock_items = [
            // Bedroom
            ['bedroom', 'Solid Wood King Bedroom Set Bed', 'Rs. 89,000', 'Rs. 98,000', 5, 'from-amber-200 to-amber-300', 'Sale', null, 'offer', null, '🛏️', 'Crafted from solid teak wood to offer high durability and elegant design to suit any bedroom space.', 'Bed Frame: King Size (72" x 78" mattresses area)', '10 Years structural warranty against wood defects.'],
            ['bedroom', 'Premium Teak 4-Door Wardrobe', 'Rs. 135,000', null, 5, 'from-amber-300 to-orange-300', null, null, 'best', null, '🛏️', 'Spacious 4-door almirah with built-in drawers, hanging space, and vanity locker.', 'Width: 180cm | Depth: 60cm | Height: 210cm', '5 Years Comprehensive manufacturer warranty.'],
            ['bedroom', 'Elegant Dressing Table with Vanity Mirror', 'Rs. 32,500', null, 4, 'from-amber-100 to-stone-200', null, null, null, null, '🛏️', 'Charming modern vanity table with multi-tier storage shelves and full-length vertical mirror.', 'Width: 80cm | Depth: 40cm | Height: 180cm', '12 Months structural warranty.'],
            
            // Dining
            ['dining', 'Classic 6-Seater Mahogany Dining Set', 'Rs. 175,000', null, 5, 'from-amber-100 to-amber-200', 'Best Seller', null, 'best', 'wooden-sets', '🍽️', 'Beautifully carved solid mahogany dining set designed for family gatherings. High durability with a polished glossy finish.', 'Dining Table: 180cm x 90cm x 75cm\nChairs: 45cm x 45cm x 100cm', '5 Years Wood Rot & Insect Warranty.'],
            ['dining', 'Modern 4-Seater Glass Dining Table', 'Rs. 95,000', 'Rs. 110,000', 4, 'from-slate-100 to-stone-200', 'Sale', null, 'offer', 'metal-sets', '🍽️', 'Contemporary tempered glass top dining table set with chrome-plated metal frame chairs.', 'Table: 120cm x 80cm x 75cm', '2 Years structural warranty on frame structure.'],
            
            // Electrics
            ['electrics', 'Innovex 32" Smart Android LED TV', 'Rs. 58,500', null, 4, 'from-slate-800 to-slate-900 text-white', 'Best Buy', null, 'new', 'av-tvs', '📺', 'Smart Android operating system with pre-installed streaming services, built-in WiFi, and crystal clear HD LED display.', 'Screen size: 32 inches | HDMI: 2 ports | USB: 1 port', '3 Years Innovex Comprehensive panel and parts warranty.'],
            ['electrics', 'Innovex Double Door Refrigerator 220L', 'Rs. 135,000', null, 5, 'from-sky-100 to-sky-200', 'Free Delivery', null, 'best', 'home-fridges', '🧊', 'Energy saving inverter compressor technology double door direct cool refrigerator with vegetable crisper drawer.', 'Capacity: 220 Liters | Color: Steel silver finish', '10 Years compressor warranty and 2 years general warranty.'],
            
            // Budget Items
            ['budget-items', 'Solid Wood Queen Bed Frame (Budget Deal)', 'Rs. 45,000', 'Rs. 52,000', 4, 'from-amber-100 to-yellow-200', 'Super Deal', null, 'offer', null, '🏷️', 'Value for money robust bed frame crafted with treated tropical hardwood frames.', 'Bed Size: Queen Size (60" x 78")', '5 Years Wood structural warranty.'],
            ['budget-items', 'Eco Foam Comfort Mattress 6x3', 'Rs. 12,500', null, 4, 'from-sky-50 to-neutral-200', null, null, null, null, '🏷️', 'Eco comfort high-density foam mattress providing ideal orthopedic spinal alignment support.', 'Size: 6 feet x 3 feet (Single bed size) | Thickness: 4 inches', '2 Years manufacturer warranty.'],
            
            // Living Room
            ['living-room', 'Antoni 3-Seater Premium Sofa', 'Rs. 145,000', 'Rs. 165,000', 5, 'from-amber-100 to-orange-200', 'Best Seller', null, 'best', 'sofa-sets', '🛋️', 'A pleasant sofa that brings simplicity to your living room. Beauty of the two tone touch and the ability to fit into any limited spaced area provides great value with peace of mind.', "3 Seater: Length - 186cm | Width - 81cm | Height - 86cm\n2 Seater: Length - 144cm | Width - 81cm | Height - 86cm", "10 Year for Wooden Structure.\n03 Years for Fabric Upholstery and Cushions.\nWarranty Covers Only Manufacturing Defects."],
            ['living-room', 'Luxury Recliner Armchair', 'Rs. 48,000', null, 4, 'from-amber-50 to-orange-100', null, null, 'new', 'recliner-sofa', '🛋️', 'Soft padded push-back manual recliner seat with cup holders and storage pockets.', 'Width: 95cm | Depth: 90cm | Height: 105cm', '3 Years warranty for structural frame and mechanism.'],
            ['living-room', 'Modern TV Console Cabinet', 'Rs. 38,500', 'Rs. 42,000', 5, 'from-stone-200 to-stone-300', 'Sale', null, 'offer', 'tv-stands', '🛋️', 'Modern wall-mounted or floor standing console with cable management ports and drawer storage.', 'Length: 150cm | Width: 40cm | Height: 45cm', '12 Months comprehensive warranty.'],
            ['living-room', 'Solid Wood Nest of Coffee Tables', 'Rs. 24,000', null, 4, 'from-amber-200 to-yellow-100', null, null, null, 'coffee-tables', '🛋️', 'Pack of 3 solid wood nesting tables that stack together nicely for spacesaving convenience.', 'Large Table: 50cm x 50cm x 55cm', '3 Years wood rot warranty.'],
            ['living-room', 'Classic Chesterfield Fabric Sofa Set', 'Rs. 185,000', null, 5, 'from-rose-100 to-rose-200', null, null, 'best', 'sofa-sets', '🛋️', 'Tufted roll arm classic chesterfield configuration upholstered in premium stain-resistant velvet fabric.', '3 Seater + 2 Seater set dimensions', '5 Years structure warranty.'],
            ['living-room', 'Premium Glass Top Center Table', 'Rs. 29,500', null, 4, 'from-slate-200 to-zinc-300', null, null, null, 'coffee-tables', '🛋️', 'Elegant double-shelf center table with thick tempered clear glass top and solid wood legs.', 'Length: 110cm | Width: 60cm | Height: 45cm', '12 Months warranty.'],
            
            // Office Furniture
            ['office-furniture', 'Executive Mahogany Office Desk', 'Rs. 72,000', null, 5, 'from-slate-100 to-zinc-200', 'Best Seller', null, 'best', 'executive-tables', '🏢', 'Polished mahogany wood desk featuring multi-drawer filing units and keyboard slider tray.', 'Length: 160cm | Width: 80cm | Height: 75cm', '5 Years warranty for wood rot.'],
            ['office-furniture', 'Ergonomic Mesh Office Chair', 'Rs. 28,500', 'Rs. 32,000', 4, 'from-slate-100 to-slate-200', '10% OFF', null, 'offer', 'chairs-models', '🏢', 'High-back mesh support computer chair featuring gas lift adjustment and tilt lock tension controls.', 'Height: 110cm - 120cm adjustable', '2 Years mechanical parts warranty.'],
            ['office-furniture', 'Steel 4-Drawer File Cabinet', 'Rs. 34,000', null, 4, 'from-slate-200 to-zinc-300', null, null, null, 'cupboards-racks', '🏢', 'Heavy-gauge steel filing cabinet with master lock control keys and anti-tilt runners.', 'Height: 130cm | Width: 45cm | Depth: 62cm', '10 Years warranty against rust.'],
            
            // Plastic Products
            ['plastic-products', 'Premium Plastic Armchair (Blue)', 'Rs. 4,500', null, 4, 'from-blue-50 to-blue-200', null, null, null, 'plastic-chairs', '📦', 'Weather-proof heavy-duty plastic arm chair with slip-resistant rubber shoe bases.', 'Standard adult size chair', '12 Months manufacturer defect warranty.'],
            ['plastic-products', 'Heavy Duty Plastic Round Table', 'Rs. 8,250', 'Rs. 9,500', 5, 'from-orange-50 to-orange-100', 'Sale', null, 'offer', 'plastic-tables', '📦', 'Durable outdoor round table designed to withstand high sunlight and rain conditions.', 'Diameter: 90cm | Height: 75cm', '12 Months warranty.'],
            ['plastic-products', '5-Tier Multipurpose Plastic Drawer', 'Rs. 14,500', null, 5, 'from-zinc-100 to-slate-200', 'Best Seller', null, 'best', 'plastic-cupboards', '📦', 'Space-saving modular 5-drawer storage chest decorated with colorful drawers.', 'Width: 45cm | Depth: 40cm | Height: 115cm', '2 Years structural warranty.']
        ];

        $insert_stmt = $pdo->prepare("INSERT INTO `items` (category, name, price, old_price, rating, image_bg, badge, image, tag, subcategory, icon, description, dimensions, warranty, additional_images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        foreach ($mock_items as $item) {
            // Pad the array to ensure 15 elements matching columns
            while (count($item) < 15) {
                $item[] = null;
            }
            $insert_stmt->execute($item);
        }
        echo "✔ Populated database with initial mock data.<br>";
    } else {
        echo "✔ Table initialized empty (placeholder products removed). To load placeholders, run with `?mock=1`.<br>";
    }

    // Create banners table for homepage hero slider management
    $pdo->exec("DROP TABLE IF EXISTS `banners`");
    $sql_banners = "CREATE TABLE `banners` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `title` VARCHAR(255) DEFAULT NULL,
        `subtitle` VARCHAR(255) DEFAULT NULL,
        `description` TEXT DEFAULT NULL,
        `tag` VARCHAR(100) DEFAULT NULL,
        `button_text` VARCHAR(100) DEFAULT 'Shop Now',
        `link_url` VARCHAR(255) DEFAULT NULL,
        `image` VARCHAR(255) DEFAULT NULL,
        `bg_gradient` VARCHAR(255) DEFAULT 'from-red-600 to-red-800',
        `sort_order` INT DEFAULT 0,
        `is_active` TINYINT(1) DEFAULT 1,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    $pdo->exec($sql_banners);
    echo "✔ Banners table created.<br>";

    // Insert default 3 mock hero slides
    $banner_stmt = $pdo->prepare("INSERT INTO `banners` (title, subtitle, description, tag, button_text, link_url, bg_gradient, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $default_banners = [
        ['Luxury Sofa Collection', 'Up to 20% Off', 'Transform your living room with premium comfort and elegant designs made to last.', 'LIVING ROOM FURNITURE', 'Shop Sofa Sets', '/living-room', 'from-rose-600 to-red-700', 1, 1],
        ['Innovex Home Appliances', 'Smart Living, Best Price', 'Upgrade your home with energy-efficient washing machines, refrigerators, and TVs.', 'INNOVEX EXCLUSIVES', 'Explore Electronics', '/electrics', 'from-blue-600 to-indigo-800', 2, 1],
        ['Solid Wood Bedroom Sets', 'Elegant & Durable', 'Create your dream sanctuary with solid wood beds, large wardrobes, and dressing tables.', 'BEDROOM FURNITURE', 'View Bedroom Range', '/bedroom', 'from-amber-700 to-amber-900', 3, 1],
    ];
    foreach ($default_banners as $banner) {
        $banner_stmt->execute($banner);
    }
    echo "✔ Default banner slides inserted.<br>";

    // Create users table for frontend login/signup system
    $pdo->exec("CREATE TABLE IF NOT EXISTS `users` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `username` VARCHAR(100) NOT NULL UNIQUE,
        `email` VARCHAR(255) NOT NULL UNIQUE,
        `password` VARCHAR(255) NOT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");
    echo "✔ Users table ready (login/signup).<br>";

    echo "<h3>Setup completed successfully!</h3>";
    echo "<a href='../index.php' style='padding: 10px 15px; background: #dc2626; color: white; text-decoration: none; border-radius: 5px; font-family: sans-serif; font-weight: bold;'>Go to Admin Dashboard</a>";

} catch (PDOException $e) {
    echo "<h3>❌ Error during setup:</h3>" . $e->getMessage();
}
?>
