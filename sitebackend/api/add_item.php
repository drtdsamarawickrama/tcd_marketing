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
$image = isset($data['image']) && trim($data['image']) !== '' ? trim($data['image']) : null;
$tag = isset($data['tag']) && trim($data['tag']) !== '' ? trim($data['tag']) : null;
$subcategory = isset($data['subcategory']) && trim($data['subcategory']) !== '' ? trim($data['subcategory']) : null;
$description = isset($data['description']) && trim($data['description']) !== '' ? trim($data['description']) : null;
$dimensions = isset($data['dimensions']) && trim($data['dimensions']) !== '' ? trim($data['dimensions']) : null;
$warranty = isset($data['warranty']) && trim($data['warranty']) !== '' ? trim($data['warranty']) : null;
$item_code = isset($data['item_code']) && trim($data['item_code']) !== '' ? trim($data['item_code']) : null; // Optional product SKU code

// Check for file uploads
if (isset($_FILES['image_file']) && $_FILES['image_file']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['image_file']['tmp_name'];
    $fileName = $_FILES['image_file']['name'];
    $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    
    // Generate secure unique file name
    $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
    
    $uploadsDir = __DIR__ . '/../uploads/';
    if (!file_exists($uploadsDir)) {
        mkdir($uploadsDir, 0777, true);
    }
    
    $destPath = $uploadsDir . $newFileName;
    if (move_uploaded_file($fileTmpPath, $destPath)) {
        // Build server-relative path dynamically to support both localhost and production
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
        $host = $_SERVER['HTTP_HOST'];
        $scriptName = $_SERVER['SCRIPT_NAME'];
        
        $backendPath = str_replace('/api/add_item.php', '/', $scriptName);
        
        $image = $protocol . '://' . $host . $backendPath . 'uploads/' . $newFileName;
    }
}

$additional_images_arr = [];

// 1. Parse text area gallery URLs
if (isset($data['gallery_urls']) && trim($data['gallery_urls']) !== '') {
    $urls = explode("\n", $data['gallery_urls']);
    foreach ($urls as $u) {
        $u_trimmed = trim($u);
        if ($u_trimmed !== '') {
            $additional_images_arr[] = $u_trimmed;
        }
    }
}

// 2. Parse multiple uploaded files
if (isset($_FILES['gallery_files'])) {
    $files = $_FILES['gallery_files'];
    if (is_array($files['name'])) {
        $file_count = count($files['name']);
        
        $uploadsDir = __DIR__ . '/../uploads/';
        if (!file_exists($uploadsDir)) {
            mkdir($uploadsDir, 0777, true);
        }
        
        for ($i = 0; $i < $file_count; $i++) {
            if ($files['error'][$i] === UPLOAD_ERR_OK) {
                $fileTmpPath = $files['tmp_name'][$i];
                $fileName = $files['name'][$i];
                $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
                $newFileName = md5(time() . $fileName . $i) . '.' . $fileExtension;
                $destPath = $uploadsDir . $newFileName;
                
                if (move_uploaded_file($fileTmpPath, $destPath)) {
                    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
                    $host = $_SERVER['HTTP_HOST'];
                    $scriptName = $_SERVER['SCRIPT_NAME'];
                    $backendPath = str_replace('/api/add_item.php', '/', $scriptName);
                    
                    $additional_images_arr[] = $protocol . '://' . $host . $backendPath . 'uploads/' . $newFileName;
                }
            }
        }
    }
}

$additional_images = !empty($additional_images_arr) ? json_encode($additional_images_arr) : null;

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
    $sql = "INSERT INTO `items` (`category`, `name`, `price`, `old_price`, `rating`, `image_bg`, `badge`, `image`, `tag`, `subcategory`, `icon`, `description`, `dimensions`, `warranty`, `additional_images`, `item_code`) 
            VALUES (:category, :name, :price, :old_price, :rating, :image_bg, :badge, :image, :tag, :subcategory, :icon, :description, :dimensions, :warranty, :additional_images, :item_code)";
            
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'category' => $category,
        'name' => $name,
        'price' => $price,
        'old_price' => $old_price,
        'rating' => $rating,
        'image_bg' => $image_bg,
        'badge' => $badge,
        'image' => $image,
        'tag' => $tag,
        'subcategory' => $subcategory,
        'icon' => $icon,
        'description' => $description,
        'dimensions' => $dimensions,
        'warranty' => $warranty,
        'additional_images' => $additional_images,
        'item_code' => $item_code
    ]);
    
    // Return success response with newly created item ID
    echo json_encode([
        "success" => true,
        "message" => "Item added successfully.",
        "id" => $pdo->lastInsertId(),
        "image" => $image
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
