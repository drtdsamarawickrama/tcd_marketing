<?php
// Include database connection settings
require_once '../config.php';

// Set response type as JSON
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

try {
    $stmt = $pdo->query("SELECT * FROM `gallery` ORDER BY `id` ASC");
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "data" => $items
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>
