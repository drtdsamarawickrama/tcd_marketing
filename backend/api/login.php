<?php
// Login API - verifies email + password, returns user info (simple session-less token)
require_once '../config.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed."]);
    exit();
}

// Read JSON body
$body = json_decode(file_get_contents('php://input'), true);

$email    = isset($body['email'])    ? strtolower(trim($body['email'])) : '';
$password = isset($body['password']) ? $body['password'] : '';

// Validation
if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Email and password are required."]);
    exit();
}

try {
    // Find user by email address
    $stmt = $pdo->prepare("SELECT `id`, `username`, `email`, `password` FROM `users` WHERE `email` = :email");
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // If user not found OR password doesn't match the stored hash - return generic error
    // (Generic message prevents email enumeration attacks)
    if (!$user || !password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Invalid email or password. Please try again."]);
        exit();
    }

    // Build a simple signed auth token: base64 of id|username|email + timestamp
    // This is stored in localStorage on the frontend
    $tokenPayload = base64_encode(json_encode([
        "id"       => $user['id'],
        "username" => $user['username'],
        "email"    => $user['email'],
        "issued"   => time()
    ]));

    // Return success with user info and token
    echo json_encode([
        "success"  => true,
        "message"  => "Login successful! Welcome back, " . $user['username'] . ".",
        "token"    => $tokenPayload,
        "user"     => [
            "id"       => $user['id'],
            "username" => $user['username'],
            "email"    => $user['email']
        ]
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Login failed: " . $e->getMessage()]);
}
?>
