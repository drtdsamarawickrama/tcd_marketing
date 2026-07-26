<?php
// Register API - creates a new user account with hashed password
require_once '../config.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed."]);
    exit();
}

// Read JSON body from request
$body = json_decode(file_get_contents('php://input'), true);

$username = isset($body['username']) ? trim($body['username']) : '';
$email    = isset($body['email'])    ? strtolower(trim($body['email'])) : '';
$password = isset($body['password']) ? $body['password'] : '';

// --- Validation ---
if (empty($username) || empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Username, email and password are required."]);
    exit();
}

// Username: 3-30 chars, alphanumeric + underscores only
if (!preg_match('/^[a-zA-Z0-9_]{3,30}$/', $username)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Username must be 3-30 characters (letters, numbers, underscores only)."]);
    exit();
}

// Email format check
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid email address format."]);
    exit();
}

// Password minimum 6 characters
if (strlen($password) < 6) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Password must be at least 6 characters long."]);
    exit();
}

try {
    // Check if email already registered
    $emailCheck = $pdo->prepare("SELECT id FROM `users` WHERE `email` = :email");
    $emailCheck->execute(['email' => $email]);
    if ($emailCheck->fetch()) {
        http_response_code(409);
        echo json_encode(["success" => false, "message" => "This email is already registered. Try logging in."]);
        exit();
    }

    // Check if username already taken
    $usernameCheck = $pdo->prepare("SELECT id FROM `users` WHERE `username` = :username");
    $usernameCheck->execute(['username' => $username]);
    if ($usernameCheck->fetch()) {
        http_response_code(409);
        echo json_encode(["success" => false, "message" => "This username is already taken. Try another one."]);
        exit();
    }

    // Hash password using bcrypt (secure, never store plain text)
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Insert new user into database
    $insert = $pdo->prepare("INSERT INTO `users` (username, email, password) VALUES (:username, :email, :password)");
    $insert->execute([
        'username' => $username,
        'email'    => $email,
        'password' => $hashedPassword,
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Account created successfully! You can now log in.",
        "id"      => $pdo->lastInsertId()
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Registration failed: " . $e->getMessage()]);
}
?>
