<?php
// Include database connection settings
require_once '../config.php';

// Set response type as JSON
header("Content-Type: application/json; charset=UTF-8");

// Helper: delete a file from uploads/ folder if it was uploaded to our server
function deleteUploadedFile($imageUrl) {
    if (empty($imageUrl)) return;
    if (strpos($imageUrl, '/uploads/') !== false) {
        $filename = basename(parse_url($imageUrl, PHP_URL_PATH));
        $filePath = __DIR__ . '/../uploads/' . $filename;
        if (file_exists($filePath)) {
            unlink($filePath); // Remove physical file from disk
        }
    }
}

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
$id = isset($data['id']) ? intval($data['id']) : 0;
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
        
        $backendPath = str_replace('/api/update_item.php', '/', $scriptName);
        
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
                    $backendPath = str_replace('/api/update_item.php', '/', $scriptName);
                    
                    $additional_images_arr[] = $protocol . '://' . $host . $backendPath . 'uploads/' . $newFileName;
                }
            }
        }
    }
}

// Retrieve existing gallery images if no new files/URLs are specified to avoid wiping them out
if (empty($additional_images_arr)) {
    $additional_images = isset($data['additional_images']) && trim($data['additional_images']) !== '' ? trim($data['additional_images']) : null;
} else {
    $additional_images = json_encode($additional_images_arr);
}

// Simple validation
if ($id <= 0 || empty($category) || empty($name) || empty($price)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Required fields missing (id, category, name, price are required)."
    ]);
    exit();
}

try {
    // Fetch existing item details to clean up overwritten images
    $check_stmt = $pdo->prepare("SELECT `image`, `additional_images` FROM `items` WHERE `id` = :id");
    $check_stmt->execute(['id' => $id]);
    $existingItem = $check_stmt->fetch(PDO::FETCH_ASSOC);

    if ($existingItem) {
        // Delete old main image if overwritten by a new image/url
        if ($image !== null && $image !== $existingItem['image']) {
            deleteUploadedFile($existingItem['image']);
        }

        // Delete any gallery image file that is no longer included in the updated gallery
        if (!empty($additional_images_arr) && !empty($existingItem['additional_images'])) {
            $oldGallery = json_decode($existingItem['additional_images'], true);
            if (is_array($oldGallery)) {
                foreach ($oldGallery as $oldUrl) {
                    if (!in_array($oldUrl, $additional_images_arr)) {
                        deleteUploadedFile($oldUrl);
                    }
                }
            }
        }
    }

    // SQL query to update item
    $sql = "UPDATE `items` SET 
                `category` = :category, 
                `name` = :name, 
                `price` = :price, 
                `old_price` = :old_price, 
                `rating` = :rating, 
                `image_bg` = :image_bg, 
                `badge` = :badge, 
                `image` = :image, 
                `tag` = :tag, 
                `subcategory` = :subcategory, 
                `icon` = :icon,
                `description` = :description,
                `dimensions` = :dimensions,
                `warranty` = :warranty,
                `additional_images` = :additional_images,
                `item_code` = :item_code
            WHERE `id` = :id";
            
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
        'item_code' => $item_code,
        'id' => $id
    ]);
    
    // Return success response
    echo json_encode([
        "success" => true,
        "message" => "Item updated successfully.",
        "image" => $image,
        "additional_images" => $additional_images
    ]);
} catch (PDOException $e) {
    // Return error response if update fails
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to update item: " . $e->getMessage()
    ]);
}
?>
