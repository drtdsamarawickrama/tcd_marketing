<?php
// PHP API to fetch, add, update, or clear items in database cart
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
    // Fetch user's cart items from DB by joining cart_items with items table
    try {
        $stmt = $pdo->prepare("
            SELECT c.item_id AS id, c.quantity, i.name, i.price, i.image, i.icon, i.category
            FROM cart_items c
            JOIN items i ON c.item_id = i.id
            WHERE c.user_id = :user_id
        ");
        $stmt->execute(['user_id' => $user_id]);
        $items = $stmt->fetchAll();
        echo json_encode(["success" => true, "data" => $items]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Failed to fetch cart: " . $e->getMessage()]);
    }
} elseif ($method === 'POST') {
    // Save, add, or update item details in the cart
    $body = json_decode(file_get_contents('php://input'), true);
    $action = isset($body['action']) ? $body['action'] : 'sync'; // 'sync', 'add', 'update'
    
    try {
        if ($action === 'sync') {
            $items = isset($body['items']) ? $body['items'] : [];
            $pdo->beginTransaction();
            
            // Delete old cart entries
            $del = $pdo->prepare("DELETE FROM cart_items WHERE user_id = :user_id");
            $del->execute(['user_id' => $user_id]);
            
            // Insert new items
            if (!empty($items)) {
                $ins = $pdo->prepare("
                    INSERT INTO cart_items (user_id, item_id, quantity)
                    VALUES (:user_id, :item_id, :quantity)
                    ON DUPLICATE KEY UPDATE quantity = VALUES(quantity)
                ");
                foreach ($items as $item) {
                    $ins->execute([
                        'user_id' => $user_id,
                        'item_id' => intval($item['id']),
                        'quantity' => intval($item['quantity'])
                    ]);
                }
            }
            $pdo->commit();
            echo json_encode(["success" => true, "message" => "Cart synced successfully."]);
        } elseif ($action === 'add') {
            // Add single item or increase its quantity if already exists
            $item_id = isset($body['item_id']) ? intval($body['item_id']) : 0;
            $quantity = isset($body['quantity']) ? intval($body['quantity']) : 1;
            
            $ins = $pdo->prepare("
                INSERT INTO cart_items (user_id, item_id, quantity)
                VALUES (:user_id, :item_id, :quantity)
                ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
            ");
            $ins->execute([
                'user_id' => $user_id,
                'item_id' => $item_id,
                'quantity' => $quantity
            ]);
            echo json_encode(["success" => true, "message" => "Item added to cart in DB."]);
        } elseif ($action === 'update') {
            // Update quantity of an existing item in cart
            $item_id = isset($body['item_id']) ? intval($body['item_id']) : 0;
            $quantity = isset($body['quantity']) ? intval($body['quantity']) : 1;
            
            $upd = $pdo->prepare("
                INSERT INTO cart_items (user_id, item_id, quantity)
                VALUES (:user_id, :item_id, :quantity)
                ON DUPLICATE KEY UPDATE quantity = VALUES(quantity)
            ");
            $upd->execute([
                'user_id' => $user_id,
                'item_id' => $item_id,
                'quantity' => $quantity
            ]);
            echo json_encode(["success" => true, "message" => "Cart updated in DB."]);
        }
    } catch (PDOException $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Failed to save cart: " . $e->getMessage()]);
    }
} elseif ($method === 'DELETE') {
    // Remove product or clear cart
    $item_id = isset($_GET['item_id']) ? intval($_GET['item_id']) : 0;
    
    try {
        if ($item_id > 0) {
            // Delete specific item
            $stmt = $pdo->prepare("DELETE FROM cart_items WHERE user_id = :user_id AND item_id = :item_id");
            $stmt->execute(['user_id' => $user_id, 'item_id' => $item_id]);
            echo json_encode(["success" => true, "message" => "Item removed from database cart."]);
        } else {
            // Clear entire cart
            $stmt = $pdo->prepare("DELETE FROM cart_items WHERE user_id = :user_id");
            $stmt->execute(['user_id' => $user_id]);
            echo json_encode(["success" => true, "message" => "Database cart cleared."]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Failed to delete: " . $e->getMessage()]);
    }
}
?>