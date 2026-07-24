<?php
// Update banner API - updates an existing banner slide by ID with optional new image upload
require_once '../config.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$data = $_POST;

$id          = isset($data['id']) ? intval($data['id']) : 0;
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

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid banner ID."]);
    exit();
}

// Handle new banner image file upload (optional - keep existing image if not re-uploaded)
if (isset($_FILES['banner_image']) && $_FILES['banner_image']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['banner_image']['tmp_name'];
    $fileName    = $_FILES['banner_image']['name'];
    $fileExt     = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    $newFileName = 'banner_' . md5(time() . $fileName) . '.' . $fileExt;

    $uploadsDir = __DIR__ . '/../uploads/';
    if (!file_exists($uploadsDir)) {
        mkdir($uploadsDir, 0777, true);
    }

    $destPath = $uploadsDir . $newFileName;
    if (move_uploaded_file($fileTmpPath, $destPath)) {
        $protocol    = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
        $host        = $_SERVER['HTTP_HOST'];
        $backendPath = str_replace('/api/update_banner.php', '/', $_SERVER['SCRIPT_NAME']);
        $image       = $protocol . '://' . $host . $backendPath . 'uploads/' . $newFileName;
    }
}

try {
    $sql = "UPDATE `banners` SET
                `title`       = :title,
                `subtitle`    = :subtitle,
                `description` = :description,
                `tag`         = :tag,
                `button_text` = :button_text,
                `link_url`    = :link_url,
                `image`       = :image,
                `bg_gradient` = :bg_gradient,
                `sort_order`  = :sort_order,
                `is_active`   = :is_active
            WHERE `id` = :id";
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
        'id'          => $id,
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Banner updated successfully.",
        "image"   => $image
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to update banner: " . $e->getMessage()
    ]);
}
?>
