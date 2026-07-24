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

    // Create table items with the new image, tag, and subcategory columns
    $sql_table = "CREATE TABLE `items` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `category` VARCHAR(50) NOT NULL,
        `name` VARCHAR(255) NOT NULL,
        `price` VARCHAR(50) NOT NULL,
        `old_price` VARCHAR(50) DEFAULT NULL,
        `rating` INT DEFAULT 5,
        `image_bg` VARCHAR(255) NOT NULL,
        `badge` VARCHAR(50) DEFAULT NULL,
        `image` VARCHAR(255) DEFAULT NULL, -- Optional image URL column
        `tag` VARCHAR(20) DEFAULT NULL, -- Featured Tag: 'best', 'new', 'offer', or NULL
        `subcategory` VARCHAR(50) DEFAULT NULL, -- Optional subcategory (e.g. 'sofa-sets')
        `icon` VARCHAR(50) NOT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    $pdo->exec($sql_table);
    echo "✔ Table `items` created with new schema.<br>";

    // Populate mock items only if explicitly requested via ?mock=1
    if (isset($_GET['mock']) && $_GET['mock'] == '1') {
        echo "Populating with initial mock items...<br>";
        
        // Mock data to insert
        $mock_items = [
            // Bedroom
            ['bedroom', 'Solid Wood King Bedroom Set Bed', 'Rs. 89,000', 'Rs. 98,000', 5, 'from-amber-200 to-amber-300', 'Sale', null, 'offer', null, '🛏️'],
            ['bedroom', 'Premium Teak 4-Door Wardrobe', 'Rs. 135,000', null, 5, 'from-amber-300 to-orange-300', null, null, 'best', null, '🛏️'],
            ['bedroom', 'Elegant Dressing Table with Vanity Mirror', 'Rs. 32,500', null, 4, 'from-amber-100 to-stone-200', null, null, null, null, '🛏️'],
            // Dining
            ['dining', 'Classic 6-Seater Mahogany Dining Set', 'Rs. 175,000', null, 5, 'from-amber-100 to-amber-200', 'Best Seller', null, 'best', 'wooden-sets', '🍽️'],
            ['dining', 'Modern 4-Seater Glass Dining Table', 'Rs. 95,000', 'Rs. 110,000', 4, 'from-slate-100 to-stone-200', 'Sale', null, 'offer', 'metal-sets', '🍽️'],
            // Electrics
            ['electrics', 'Innovex 32" Smart Android LED TV', 'Rs. 58,500', null, 4, 'from-slate-800 to-slate-900 text-white', 'Best Buy', null, 'new', 'av-tvs', '📺'],
            ['electrics', 'Innovex Double Door Refrigerator 220L', 'Rs. 135,000', null, 5, 'from-sky-100 to-sky-200', 'Free Delivery', null, 'best', 'home-fridges', '🧊'],
            // Budget Items
            ['budget-items', 'Solid Wood Queen Bed Frame (Budget Deal)', 'Rs. 45,000', 'Rs. 52,000', 4, 'from-amber-100 to-yellow-200', 'Super Deal', null, 'offer', null, '🏷️'],
            ['budget-items', 'Eco Foam Comfort Mattress 6x3', 'Rs. 12,500', null, 4, 'from-sky-50 to-neutral-200', null, null, null, null, '🏷️'],
            // Living Room
            ['living-room', 'Antoni 3-Seater Premium Sofa', 'Rs. 145,000', 'Rs. 165,000', 5, 'from-amber-100 to-orange-200', 'Best Seller', null, 'best', 'sofa-sets', '🛋️'],
            ['living-room', 'Luxury Recliner Armchair', 'Rs. 48,000', null, 4, 'from-amber-50 to-orange-100', null, null, 'new', 'recliner-sofa', '🛋️'],
            ['living-room', 'Modern TV Console Cabinet', 'Rs. 38,500', 'Rs. 42,000', 5, 'from-stone-200 to-stone-300', 'Sale', null, 'offer', 'tv-stands', '🛋️'],
            ['living-room', 'Solid Wood Nest of Coffee Tables', 'Rs. 24,000', null, 4, 'from-amber-200 to-yellow-100', null, null, null, 'coffee-tables', '🛋️'],
            ['living-room', 'Classic Chesterfield Fabric Sofa Set', 'Rs. 185,000', null, 5, 'from-rose-100 to-rose-200', null, null, 'best', 'sofa-sets', '🛋️'],
            ['living-room', 'Premium Glass Top Center Table', 'Rs. 29,500', null, 4, 'from-slate-200 to-zinc-300', null, null, null, 'coffee-tables', '🛋️'],
            // Office Furniture
            ['office-furniture', 'Executive Mahogany Office Desk', 'Rs. 72,000', null, 5, 'from-slate-100 to-zinc-200', 'Best Seller', null, 'best', 'executive-tables', '🏢'],
            ['office-furniture', 'Ergonomic Mesh Office Chair', 'Rs. 28,500', 'Rs. 32,000', 4, 'from-slate-100 to-slate-200', '10% OFF', null, 'offer', 'chairs-models', '🏢'],
            ['office-furniture', 'Steel 4-Drawer File Cabinet', 'Rs. 34,000', null, 4, 'from-slate-200 to-zinc-300', null, null, null, 'cupboards-racks', '🏢'],
            // Plastic Products
            ['plastic-products', 'Premium Plastic Armchair (Blue)', 'Rs. 4,500', null, 4, 'from-blue-50 to-blue-200', null, null, null, 'plastic-chairs', '📦'],
            ['plastic-products', 'Heavy Duty Plastic Round Table', 'Rs. 8,250', 'Rs. 9,500', 5, 'from-orange-50 to-orange-100', 'Sale', null, 'offer', 'plastic-tables', '📦'],
            ['plastic-products', '5-Tier Multipurpose Plastic Drawer', 'Rs. 14,500', null, 5, 'from-zinc-100 to-slate-200', 'Best Seller', null, 'best', 'plastic-cupboards', '📦']
        ];

        $insert_stmt = $pdo->prepare("INSERT INTO `items` (category, name, price, old_price, rating, image_bg, badge, image, tag, subcategory, icon) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        foreach ($mock_items as $item) {
            $insert_stmt->execute($item);
        }
        echo "✔ Populated database with initial mock data.<br>";
    } else {
        echo "✔ Table initialized empty (placeholder products removed). To load placeholders, run with `?mock=1`.<br>";
    }

    echo "<h3>Setup completed successfully!</h3>";
    echo "<a href='../index.php' style='padding: 10px 15px; background: #dc2626; color: white; text-decoration: none; border-radius: 5px; font-family: sans-serif; font-weight: bold;'>Go to Admin Dashboard</a>";

} catch (PDOException $e) {
    echo "<h3>❌ Error during setup:</h3>" . $e->getMessage();
}
?>
