<?php
// Delete banner API - removes a banner record and cleans up its uploaded image from disk
require_once '../config.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid banner ID."]);
    exit();
}

try {
    // Fetch the banner image URL before deleting so we can clean up the file
    $check = $pdo->prepare("SELECT `image` FROM `banners` WHERE `id` = :id");
    $check->execute(['id' => $id]);
    $banner = $check->fetch(PDO::FETCH_ASSOC);

    if (!$banner) {
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "Banner not found."]);
        exit();
    }

    // Delete the uploaded image file from disk if it was stored in our uploads/ folder
    if (!empty($banner['image']) && strpos($banner['image'], '/uploads/') !== false) {
        $filename = basename(parse_url($banner['image'], PHP_URL_PATH));
        $filePath = __DIR__ . '/../uploads/' . $filename;
        if (file_exists($filePath)) {
            unlink($filePath); // Remove physical file from disk
        }
    }

    // Now delete the database record
    $del = $pdo->prepare("DELETE FROM `banners` WHERE `id` = :id");
    $del->execute(['id' => $id]);

    echo json_encode([
        "success" => true,
        "message" => "Banner deleted successfully."
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to delete banner: " . $e->getMessage()
    ]);
}
?>
