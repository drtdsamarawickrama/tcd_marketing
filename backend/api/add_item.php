<?php
// Include database connection settings
require_once '../config.php';

// Set response type as JSON
header("Content-Type: application/json; charset=UTF-8");

// Check if this is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method Not Allowed. Use POST."
    ]);
    exit();
}

// Get input data (supports both JSON payload and regular form data POST)
$data = json_decode(file_get_contents("php://input"), true);

// Fallback to standard POST fields if JSON parser is empty
if (empty($data)) {
    $data = $_POST;
}

// Extract and validate fields
$category = isset($data['category']) ? trim($data['category']) : '';
$name = isset($data['name']) ? trim($data['name']) : '';
$price = isset($data['price']) ? trim($data['price']) : '';
$old_price = isset($data['old_price']) && trim($data['old_price']) !== '' ? trim($data['old_price']) : null;
$rating = isset($data['rating']) ? intval($data['rating']) : 5;
$image_bg = isset($data['image_bg']) ? trim($data['image_bg']) : 'from-amber-100 to-amber-200';
$badge = isset($data['badge']) && trim($data['badge']) !== '' ? trim($data['badge']) : null;
$icon = isset($data['icon']) ? trim($data['icon']) : '🏷️';

// Simple validation
if (empty($category) || empty($name) || empty($price)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Required fields missing (category, name, price are required)."
    ]);
    exit();
}

try {
    // SQL query to insert new item
    $sql = "INSERT INTO `items` (`category`, `name`, `price`, `old_price`, `rating`, `image_bg`, `badge`, `icon`) 
            VALUES (:category, :name, :price, :old_price, :rating, :image_bg, :badge, :icon)";
            
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'category' => $category,
        'name' => $name,
        'price' => $price,
        'old_price' => $old_price,
        'rating' => $rating,
        'image_bg' => $image_bg,
        'badge' => $badge,
        'icon' => $icon
    ]);
    
    // Return success response with newly created item ID
    echo json_encode([
        "success" => true,
        "message" => "Item added successfully.",
        "id" => $pdo->lastInsertId()
    ]);
} catch (PDOException $e) {
    // Return error response if insertion fails
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to add item: " . $e->getMessage()
    ]);
}
?>
