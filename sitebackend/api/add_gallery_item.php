<?php
// Secure endpoint check
require_once '../includes/api_auth_check.php';
// Include database connection settings
require_once '../config.php';

header("Content-Type: application/json; charset=UTF-8");

$data = $_POST;

$title       = isset($data['title']) && trim($data['title']) !== '' ? trim($data['title']) : '';
$category    = isset($data['category']) && trim($data['category']) !== '' ? trim($data['category']) : '';
$type        = isset($data['type']) && trim($data['type']) !== '' ? trim($data['type']) : 'video';
$youtube_url = isset($data['youtube_url']) && trim($data['youtube_url']) !== '' ? trim($data['youtube_url']) : null;
$description = isset($data['description']) && trim($data['description']) !== '' ? trim($data['description']) : null;
$image_path  = isset($data['image_path']) && trim($data['image_path']) !== '' ? trim($data['image_path']) : null;

// Validate required fields
if (empty($title) || empty($category)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Title and Category are required."]);
    exit();
}

// Handle image upload if type is image and file is supplied
if ($type === 'image') {
    if (isset($_FILES['image_file']) && $_FILES['image_file']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['image_file']['tmp_name'];
        $fileName    = $_FILES['image_file']['name'];
        $fileExt     = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

        // Generate unique filename to avoid conflicts
        $newFileName = 'gallery_' . md5(time() . $fileName) . '.' . $fileExt;

        $uploadsDir = __DIR__ . '/../uploads/';
        if (!file_exists($uploadsDir)) {
            mkdir($uploadsDir, 0777, true);
        }

        $destPath = $uploadsDir . $newFileName;
        if (move_uploaded_file($fileTmpPath, $destPath)) {
            $protocol    = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
            $host        = $_SERVER['HTTP_HOST'];
            $backendPath = str_replace('/api/add_gallery_item.php', '/', $_SERVER['SCRIPT_NAME']);
            $image_path  = $protocol . '://' . $host . $backendPath . 'uploads/' . $newFileName;
        }
    }
    
    // Check if we have an image path (either uploaded or direct URL/gradient string)
    if (empty($image_path)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "An image file, gradient, or image URL is required for Image type."]);
        exit();
    }
} else {
    // If type is video, verify youtube_url is present
    if (empty($youtube_url)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "YouTube URL is required for Video walkthrough type."]);
        exit();
    }
}

try {
    $sql = "INSERT INTO `gallery` (title, category, type, image_path, youtube_url, description) 
            VALUES (:title, :category, :type, :image_path, :youtube_url, :description)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'title'       => $title,
        'category'    => $category,
        'type'        => $type,
        'image_path'  => $image_path,
        'youtube_url' => $youtube_url,
        'description' => $description
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Gallery item added successfully."
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>
