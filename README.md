# TCD Marketing Web Portal

A premium e-commerce and catalog presentation system designed for **TCD Marketing** (Furniture, Electrics, and Home Solutions). The system consists of a robust Next.js frontend catalog and a secure custom PHP administration panel to manage inventory and banner slides.

---

## 📂 Project Structure

```text
damro_TCD_marketing/
├── backend/                  # PHP REST APIs & Administration Panel
│   ├── api/                  # CRUD operations (items, banners, users)
│   ├── assets/               # JS/CSS styles for the admin dashboard
│   ├── includes/             # Reusable PHP templates (sidebar, form)
│   ├── uploads/              # Local uploaded product & banner images
│   ├── config.php            # PDO Database Connection
│   ├── database.sql          # Database Structure Schema SQL file
│   ├── setup_db.php          # Database setup and mock data initialization script
│   └── index.php             # Main Admin Dashboard Portal (Products Management)
│
├── frontend/                 # Next.js React Web Application
│   ├── app/                  # Route views (Home, Category filters, Products detail, Login, Signup, Cart)
│   ├── components/           # Shared React Components & Hooks (Header, Footer, useCart, useAuth, etc.)
│   ├── public/               # Static image assets
│   ├── tailwind.config.ts    # Tailwind styling system properties
│   └── package.json          # Node dependencies
│
└── README.md                 # Project Documentation File
```

---

## 🚀 Key Features

### 💻 Frontend (Next.js client-side)
* **Interactive Hero Slider:** Dynamically loads active banner slides from the database with ambient glow animations. If the database holds no banners, the slider gracefully falls back to static high-resolution designs.
* **Premium User Auth:** Persistent token-based registration & login system with interactive password strength meters and match confirmation warnings.
* **Dynamic Cart System:** Persistent, user-specific shopping carts stored securely in `localStorage` separating guest items from registered user items.
* **Interactive Catalogue Filters:** Detailed navigation routes across Bedroom, Dining, Office, and Living Room categories.
* **Secured Price Inquiries:** "Enquire Price Now" CTA features require a user to log in before placing quote requests.

### 🛠️ Backend Admin Portal (Vanilla PHP & Tailwind CSS)
* **Dynamic CRUD Operations:** Add, update, hide, or delete products with local image upload processing.
* **Automatic Image Garbage Collector:** Deleting a product or banner automatically triggers server-side `unlink()` to wipe associated files from disk to prevent storage leakages.
* **Custom SKU Integration:** Item Code (SKU) numbers bound explicitly to database structures.
* **Homepage Banner Slider Manager:** Set custom gradients, images, titles, tags, redirect URLs, active state toggles, and sorting order rankings.
* **Dynamic Parameter Redirects:** Access the admin banner workspace and seamlessly jump back to pre-filtered items categories.

---

## 🛠️ Installation & Setup

### 1. Database Setup
1. Open your MySQL server control panel (XAMPP / WampServer).
2. Create a new empty database named `damro_tcd_marketing`.
3. Configure your credentials inside `backend/config.php` (defaults are set to `localhost`, database name `damro_tcd_marketing`, user `root`, no password).
4. Run the setup initializer script to create tables and populate mock data by navigating to:
   ```text
   http://localhost/damro_TCD_marketing/backend/api/setup_db.php?mock=1
   ```

### 2. Running Backend (Apache Server)
* Ensure the project root folder `damro_TCD_marketing` resides inside your local Apache server webroot (e.g., `C:/xampp/htdocs/`).
* Access the administration panel dashboard:
  ```text
  http://localhost/damro_TCD_marketing/backend/index.php
  ```

### 3. Running Frontend (Next.js Application)
1. Open a terminal pointing inside the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install npm package dependencies:
   ```bash
   npm install
   ```
3. Boot the local development compiler:
   ```bash
   npm run dev
   ```
4. Access the web portal in your browser at `http://localhost:3000`.

---

## ⚙️ Backend API Reference

* `GET /backend/api/get_items.php` - Fetch all products list (filters optionally via Category queries).
* `GET /backend/api/get_banners.php` - Fetch active banner slides. Pass query parameter `?all=1` to query inactive slides for Admin dashboards.
* `POST /backend/api/login.php` - Process credential verification. Returns JWT-base token session key.
* `POST /backend/api/register.php` - Register a new frontend user profile.
