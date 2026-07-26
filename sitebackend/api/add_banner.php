<?php
// Add banner API - inserts a new banner slide with optional image upload
require_once '../config.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

// Read POST fields (supports multipart FormData for file uploads)
$data = $_POST;

$title       = isset($data['title']) && trim($data['title']) !== '' ? trim($data['title']) : null;
$subtitle    = isset($data['subtitle']) && trim($data['subtitle']) !== '' ? trim($data['subtitle']) : null;
$description = isset($data['description']) && trim($data['description']) !== '' ? trim($data['description']) : null;
$tag         = isset($data['tag']) && trim($data['tag']) !== '' ? trim($data['tag']) : null;
$button_text = isset($data['button_text']) && trim($data['button_text']) !== '' ? trim($data['button_text']) : 'Shop Now';
$link_url    = isset($data['link_url']) && trim($data['link_url']) !== '' ? trim($data['link_url']) : null;
$bg_gradient = isset($data['bg_gradient']) && trim($data['bg_gradient']) !== '' ? trim($data['bg_gradient']) : 'from-red-600 to-red-800';
$sort_order  = isset($data['sort_order']) ? intval($data['sort_order']) : 0;
$is_active   = isset($data['is_active']) ? intval($data['is_active']) : 1;
$image       = isset($data['image']) && trim($data['image']) !== '' ? trim($data['image']) : null;

// Handle banner image file upload if provided
if (isset($_FILES['banner_image']) && $_FILES['banner_image']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['banner_image']['tmp_name'];
    $fileName    = $_FILES['banner_image']['name'];
    $fileExt     = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    // Generate unique filename to avoid conflicts
    $newFileName = 'banner_' . md5(time() . $fileName) . '.' . $fileExt;

    $uploadsDir = __DIR__ . '/../uploads/';
    if (!file_exists($uploadsDir)) {
        mkdir($uploadsDir, 0777, true);
    }

    $destPath = $uploadsDir . $newFileName;
    if (move_uploaded_file($fileTmpPath, $destPath)) {
        // Build full URL for the uploaded banner image
        $protocol    = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
        $host        = $_SERVER['HTTP_HOST'];
        $backendPath = str_replace('/api/add_banner.php', '/', $_SERVER['SCRIPT_NAME']);
        $image       = $protocol . '://' . $host . $backendPath . 'uploads/' . $newFileName;
    }
}

try {
    $sql = "INSERT INTO `banners` (title, subtitle, description, tag, button_text, link_url, image, bg_gradient, sort_order, is_active)
            VALUES (:title, :subtitle, :description, :tag, :button_text, :link_url, :image, :bg_gradient, :sort_order, :is_active)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'title'       => $title,
        'subtitle'    => $subtitle,
        'description' => $description,
        'tag'         => $tag,
        'button_text' => $button_text,
        'link_url'    => $link_url,
        'image'       => $image,
        'bg_gradient' => $bg_gradient,
        'sort_order'  => $sort_order,
        'is_active'   => $is_active,
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Banner added successfully.",
        "id"      => $pdo->lastInsertId(),
        "image"   => $image
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to add banner: " . $e->getMessage()
    ]);
}
?>
