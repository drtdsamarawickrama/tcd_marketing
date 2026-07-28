<?php
// Start session and load DB configuration
session_start();
require_once 'config.php';

// Redirect to dashboard if already logged in
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header("Location: index.php");
    exit();
}

$error = '';

// Handle credentials check on POST submit
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    if (!empty($username) && !empty($password)) {
        try {
            $stmt = $pdo->prepare("SELECT * FROM `admins` WHERE `username` = :username LIMIT 1");
            $stmt->execute(['username' => $username]);
            $admin = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($admin && password_verify($password, $admin['password'])) {
                // Success! Set session variables
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_username'] = $admin['username'];
                $_SESSION['admin_id'] = $admin['id'];
                
                header("Location: index.php");
                exit();
            } else {
                $error = "Invalid username or password.";
            }
        } catch (PDOException $e) {
            $error = "Database error: " . $e->getMessage();
        }
    } else {
        $error = "Please fill in all fields.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TCD Marketing - Admin Login</title>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet">
    <!-- Tailwind CSS via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    },
                    keyframes: {
                        fadeIn: {
                            '0%': { opacity: '0' },
                            '100%': { opacity: '1' }
                        },
                        scaleUp: {
                            '0%': { transform: 'scale(0.95)', opacity: '0' },
                            '100%': { transform: 'scale(1)', opacity: '1' }
                        }
                    },
                    animation: {
                        'fade-in': 'fadeIn 1s ease-out forwards',
                        'scale-up': 'scaleUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-slate-900 min-h-screen flex items-center justify-center px-4 overflow-hidden">
    <!-- Decorative background blobs -->
    <div class="fixed top-0 left-0 w-80 h-80 bg-red-650/10 rounded-full blur-3xl pointer-events-none animate-fade-in"></div>
    <div class="fixed bottom-0 right-0 w-80 h-80 bg-red-800/10 rounded-full blur-3xl pointer-events-none animate-fade-in" style="animation-delay: 200ms;"></div>

    <div class="max-w-md w-full relative z-10 animate-scale-up">
        <!-- Logo Header -->
        <div class="text-center mb-8">
            <div class="inline-block bg-white p-3 rounded-2xl shadow-lg shadow-slate-950/20 border border-slate-800">
                <img src="../public/logo.jpeg" alt="TCD Marketing" class="h-12 w-auto object-contain rounded-md">
            </div>
            <h1 class="text-2xl font-black text-white mt-4 tracking-tight">Admin Dashboard</h1>
            <p class="text-slate-400 text-xs mt-1.5 uppercase font-bold tracking-wider">TCD Marketing Sri Lanka</p>
        </div>

        <!-- Login Card -->
        <div class="bg-slate-950/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-950/50">
            <h2 class="text-lg font-black text-white mb-6">Staff Sign In</h2>

            <?php if (!empty($error)): ?>
                <div class="bg-red-950/30 border border-red-800/50 text-red-400 text-xs px-4 py-3 rounded-xl mb-6 font-medium flex items-center gap-2">
                    <span>⚠️</span>
                    <span><?= htmlspecialchars($error) ?></span>
                </div>
            <?php endif; ?>

            <form action="login.php" method="POST" class="space-y-5">
                <div class="flex flex-col gap-1.5">
                    <label for="username" class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Username</label>
                    <input type="text" id="username" name="username" required autocomplete="username" placeholder="e.g. admin"
                           class="w-full bg-slate-900 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all duration-300">
                </div>

                <div class="flex flex-col gap-1.5">
                    <label for="password" class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                    <input type="password" id="password" name="password" required autocomplete="current-password" placeholder="••••••••"
                           class="w-full bg-slate-900 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all duration-300">
                </div>

                <button type="submit" class="w-full bg-red-600 hover:bg-red-750 text-white font-extrabold text-xs py-3.5 rounded-xl transition duration-150 shadow-lg shadow-red-650/10 hover:shadow-red-650/20 uppercase tracking-widest mt-2">
                    Access Dashboard
                </button>
            </form>
        </div>

        <p class="text-center text-[10px] text-slate-650 mt-8 font-medium">
            TCD Marketing Dashboard v1.1 • Protected Administration Console
        </p>
    </div>
</body>
</html>
