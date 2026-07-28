@ -0,0 +1,88 @@
<?php
// PHP API to fetch or toggle items in database wishlist
require_once '../config.php';
header("Content-Type: application/json; charset=UTF-8");

$method = $_SERVER['REQUEST_METHOD'];
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

if ($user_id <= 0) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid or missing user_id."]);
    exit();
}

if ($method === 'GET') {
    // Fetch wishlist items from DB
    try {
        $stmt = $pdo->prepare("
            SELECT w.item_id AS id, i.name, i.price, i.image, i.icon, i.category
            FROM wishlist_items w
            JOIN items i ON w.item_id = i.id
            WHERE w.user_id = :user_id
        ");
        $stmt->execute(['user_id' => $user_id]);
        $items = $stmt->fetchAll();
        echo json_encode(["success" => true, "data" => $items]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Failed to fetch wishlist: " . $e->getMessage()]);
    }
} elseif ($method === 'POST') {
    // Toggle item in database wishlist
    $body = json_decode(file_get_contents('php://input'), true);
    $action = isset($body['action']) ? $body['action'] : 'sync'; // 'sync' or 'toggle'
    
    try {
        if ($action === 'sync') {
            $items = isset($body['items']) ? $body['items'] : [];
            $pdo->beginTransaction();
            
            $del = $pdo->prepare("DELETE FROM wishlist_items WHERE user_id = :user_id");
            $del->execute(['user_id' => $user_id]);
            
            if (!empty($items)) {
                $ins = $pdo->prepare("INSERT IGNORE INTO wishlist_items (user_id, item_id) VALUES (:user_id, :item_id)");
                foreach ($items as $item) {
                    $ins->execute([
                        'user_id' => $user_id,
                        'item_id' => intval($item['id'])
                    ]);
                }
            }
            $pdo->commit();
            echo json_encode(["success" => true, "message" => "Wishlist synced in DB."]);
        } elseif ($action === 'toggle') {
            $item_id = isset($body['item_id']) ? intval($body['item_id']) : 0;
            
            if ($item_id <= 0) {
                http_response_code(400);
                echo json_encode(["success" => false, "message" => "Invalid item_id."]);
                exit();
            }
            
            // Check if item exists in user's wishlist
            $check = $pdo->prepare("SELECT 1 FROM wishlist_items WHERE user_id = :user_id AND item_id = :item_id");
            $check->execute(['user_id' => $user_id, 'item_id' => $item_id]);
            
            if ($check->fetch()) {
                // If exists: remove it
                $del = $pdo->prepare("DELETE FROM wishlist_items WHERE user_id = :user_id AND item_id = :item_id");
                $del->execute(['user_id' => $user_id, 'item_id' => $item_id]);
                echo json_encode(["success" => true, "action" => "removed", "message" => "Removed from wishlist in DB."]);
            } else {
                // If doesn't exist: add it
                $ins = $pdo->prepare("INSERT INTO wishlist_items (user_id, item_id) VALUES (:user_id, :item_id)");
                $ins->execute(['user_id' => $user_id, 'item_id' => $item_id]);
                echo json_encode(["success" => true, "action" => "added", "message" => "Added to wishlist in DB."]);
            }
        }
    } catch (PDOException $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Failed to save: " . $e->getMessage()]);
    }
}
?>