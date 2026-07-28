<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Redirect to login page if admin is not authenticated
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: login.php");
    exit();
}
?>
