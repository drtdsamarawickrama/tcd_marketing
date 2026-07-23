<?php
// Set response type as HTML for readability in web browser
header("Content-Type: text/html; charset=UTF-8");

// Database host settings
$db_host = "localhost";
$db_user = "root";
$db_pass = "";

try {
    // Connect to MySQL server first (without database name)
    $pdo = new PDO("mysql:host=$db_host;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "<h3>Setting up Damro TCD Marketing Database...</h3>";

    // Create database if it does not exist
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `tcd_marketing` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "✔ Database `tcd_marketing` checked/created.<br>";

    // Connect to the specific database
    $pdo->exec("USE `tcd_marketing`");

    // Create table items if it does not exist
    $sql_table = "CREATE TABLE IF NOT EXISTS `items` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `category` VARCHAR(50) NOT NULL,
        `name` VARCHAR(255) NOT NULL,
        `price` VARCHAR(50) NOT NULL,
        `old_price` VARCHAR(50) DEFAULT NULL,
        `rating` INT DEFAULT 5,
        `image_bg` VARCHAR(255) NOT NULL,
        `badge` VARCHAR(50) DEFAULT NULL,
        `icon` VARCHAR(50) NOT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    $pdo->exec($sql_table);
    echo "✔ Table `items` checked/created.<br>";

    // Count existing rows
    $stmt = $pdo->query("SELECT COUNT(*) FROM `items`");
    $count = $stmt->fetchColumn();

    if ($count == 0) {
        echo "Database is empty. Populating with initial mock items...<br>";
        
        // Mock data to insert
        $mock_items = [
            // Bedroom
            ['bedroom', 'Solid Wood King Bedroom Set Bed', 'Rs. 89,000', 'Rs. 98,000', 5, 'from-amber-200 to-amber-300', 'Sale', '🛏️'],
            ['bedroom', 'Premium Teak 4-Door Wardrobe', 'Rs. 135,000', null, 5, 'from-amber-300 to-orange-300', null, '🛏️'],
            ['bedroom', 'Elegant Dressing Table with Vanity Mirror', 'Rs. 32,500', null, 4, 'from-amber-100 to-stone-200', null, '🛏️'],
            // Dining
            ['dining', 'Classic 6-Seater Mahogany Dining Set', 'Rs. 175,000', null, 5, 'from-amber-100 to-amber-200', 'Best Seller', '🍽️'],
            ['dining', 'Modern 4-Seater Glass Dining Table', 'Rs. 95,000', 'Rs. 110,000', 4, 'from-slate-100 to-stone-200', 'Sale', '🍽️'],
            // Electrics
            ['electrics', 'Innovex 32" Smart Android LED TV', 'Rs. 58,500', null, 4, 'from-slate-800 to-slate-900 text-white', 'Best Buy', '📺'],
            ['electrics', 'Innovex Double Door Refrigerator 220L', 'Rs. 135,000', null, 5, 'from-sky-100 to-sky-200', 'Free Delivery', '🧊'],
            // Budget Items
            ['budget-items', 'Solid Wood Queen Bed Frame (Budget Deal)', 'Rs. 45,000', 'Rs. 52,000', 4, 'from-amber-100 to-yellow-200', 'Super Deal', '🏷️'],
            ['budget-items', 'Eco Foam Comfort Mattress 6x3', 'Rs. 12,500', null, 4, 'from-sky-50 to-neutral-200', null, '🏷️']
        ];

        $insert_stmt = $pdo->prepare("INSERT INTO `items` (category, name, price, old_price, rating, image_bg, badge, icon) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        
        foreach ($mock_items as $item) {
            $insert_stmt->execute($item);
        }
        echo "✔ Populated database with initial mock data.<br>";
    } else {
        echo "Database already contains $count items. Skipping data insertion.<br>";
    }

    echo "<h3>Setup completed successfully!</h3>";
    echo "<a href='../index.php' style='padding: 10px 15px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; font-family: sans-serif;'>Go to Admin Dashboard</a>";

} catch (PDOException $e) {
    echo "<h3>❌ Error during setup:</h3>" . $e->getMessage();
}
?>
