<?php
// Include database connection settings
require_once '../config.php';

// Set response type as JSON
header("Content-Type: application/json; charset=UTF-8");

// Check if a specific ID or category was requested
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$category = isset($_GET['category']) ? trim($_GET['category']) : '';

try {
    if ($id > 0) {
        // Query to fetch a single item by ID
        $stmt = $pdo->prepare("SELECT * FROM `items` WHERE `id` = :id");
        $stmt->execute(['id' => $id]);
        $item = $stmt->fetch();
        
        if ($item) {
            echo json_encode([
                "success" => true,
                "data" => $item
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                "success" => false,
                "message" => "Product not found."
            ]);
        }
        exit();
    }

    if ($category !== '') {
        // Query to fetch items of a specific category
        $stmt = $pdo->prepare("SELECT * FROM `items` WHERE `category` = :category ORDER BY `id` DESC");
        $stmt->execute(['category' => $category]);
    } else {
        // Query to fetch all items if no category is specified
        $stmt = $pdo->query("SELECT * FROM `items` ORDER BY `id` DESC");
    }
    
    // Fetch all records as an associative array
    $items = $stmt->fetchAll();
    
    // Send success response with items data
    echo json_encode([
        "success" => true,
        "count" => count($items),
        "data" => $items
    ]);
} catch (PDOException $e) {
    // Return error if query fails
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to retrieve items: " . $e->getMessage()
    ]);
}
?>
