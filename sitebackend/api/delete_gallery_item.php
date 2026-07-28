<?php
// Secure endpoint check
require_once '../includes/api_auth_check.php';
// Include database connection settings
require_once '../config.php';

header("Content-Type: application/json; charset=UTF-8");

$id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid gallery item ID."]);
    exit();
}

try {
    // Fetch the gallery item to check for uploaded image
    $check = $pdo->prepare("SELECT `image_path` FROM `gallery` WHERE `id` = :id");
    $check->execute(['id' => $id]);
    $item = $check->fetch(PDO::FETCH_ASSOC);

    if (!$item) {
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "Gallery item not found."]);
        exit();
    }

    // Delete the uploaded image file from disk if it was stored in our uploads/ folder
    if (!empty($item['image_path']) && strpos($item['image_path'], '/uploads/') !== false) {
        $filename = basename(parse_url($item['image_path'], PHP_URL_PATH));
        $filePath = __DIR__ . '/../uploads/' . $filename;
        if (file_exists($filePath)) {
            unlink($filePath); // Remove physical file from disk
        }
    }

    // Now delete the database record
    $del = $pdo->prepare("DELETE FROM `gallery` WHERE `id` = :id");
    $del->execute(['id' => $id]);

    echo json_encode([
        "success" => true,
        "message" => "Gallery item deleted successfully."
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to delete gallery item: " . $e->getMessage()
    ]);
}
?>
