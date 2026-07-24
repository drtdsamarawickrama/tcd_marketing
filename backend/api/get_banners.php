<?php
// Get banners API - returns active banners ordered by sort_order for frontend hero slider
require_once '../config.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

try {
    // If ?all=1 is passed (admin panel), return all banners including inactive ones
    // Otherwise return only active banners ordered by sort_order for frontend display
    $showAll = isset($_GET['all']) && $_GET['all'] == '1';

    if ($showAll) {
        $stmt = $pdo->prepare("SELECT * FROM `banners` ORDER BY `sort_order` ASC");
    } else {
        $stmt = $pdo->prepare("SELECT * FROM `banners` WHERE `is_active` = 1 ORDER BY `sort_order` ASC");
    }
    $stmt->execute();
    $banners = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "data" => $banners
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to fetch banners: " . $e->getMessage()
    ]);
}
?>
