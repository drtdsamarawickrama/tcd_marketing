<?php
// Include database connection settings
require_once '../config.php';

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
    // Check if the item exists first
    $check_stmt = $pdo->prepare("SELECT `id` FROM `items` WHERE `id` = :id");
    $check_stmt->execute(['id' => $id]);
    
    if (!$check_stmt->fetch()) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "Item not found."
        ]);
        exit();
    }
    
    // Prepare and execute deletion query
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
