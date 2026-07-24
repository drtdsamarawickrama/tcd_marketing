<?php
// Include database connection settings
require_once '../config.php';

// Set response type as JSON
header("Content-Type: application/json; charset=UTF-8");

// Accept request parameters from POST or GET
$id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid or missing item ID."
    ]);
    exit();
}

try {
    // Fetch image URLs before deleting (to clean up uploaded files from disk)
    $check_stmt = $pdo->prepare("SELECT `id`, `image`, `additional_images` FROM `items` WHERE `id` = :id");
    $check_stmt->execute(['id' => $id]);
    $existingItem = $check_stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$existingItem) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "Item not found."
        ]);
        exit();
    }

    // Helper: delete a file from uploads/ folder if it was uploaded to our server (not an external URL)
    function deleteUploadedFile($imageUrl) {
        if (empty($imageUrl)) return;
        // Only delete files that point to our own uploads/ directory
        if (strpos($imageUrl, '/uploads/') !== false) {
            // Extract just the filename from the full URL
            $filename = basename(parse_url($imageUrl, PHP_URL_PATH));
            $filePath = __DIR__ . '/../uploads/' . $filename;
            if (file_exists($filePath)) {
                unlink($filePath); // Remove physical file from disk
            }
        }
    }

    // Delete main product image from uploads/ if it was locally uploaded
    deleteUploadedFile($existingItem['image']);

    // Delete all gallery images from uploads/ folder
    if (!empty($existingItem['additional_images'])) {
        $galleryImages = json_decode($existingItem['additional_images'], true);
        if (is_array($galleryImages)) {
            foreach ($galleryImages as $galleryUrl) {
                deleteUploadedFile($galleryUrl);
            }
        }
    }

    // Now delete the database record after files are cleaned up
    $delete_stmt = $pdo->prepare("DELETE FROM `items` WHERE `id` = :id");
    $delete_stmt->execute(['id' => $id]);
    
    // Return success response
    echo json_encode([
        "success" => true,
        "message" => "Item deleted successfully."
    ]);
} catch (PDOException $e) {
    // Return database error details
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to delete item: " . $e->getMessage()
    ]);
}
?>
