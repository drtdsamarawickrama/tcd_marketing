<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Block unauthenticated access to admin endpoints and return JSON response
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(401);
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode([
        "success" => false,
        "message" => "Unauthorized access. Action blocked."
    ]);
    exit();
}
?>
