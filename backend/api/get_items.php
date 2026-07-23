<?php
// Include database connection settings
require_once '../config.php';

// Set response type as JSON
header("Content-Type: application/json; charset=UTF-8");

// Check if a specific category was requested
$category = isset($_GET['category']) ? trim($_GET['category']) : '';

try {
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
