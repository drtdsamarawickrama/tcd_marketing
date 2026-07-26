-- Database creation script for Damro TCD Marketing items

CREATE DATABASE IF NOT EXISTS `tcd_marketing` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `tcd_marketing`;

-- Table structure for storing items
CREATE TABLE IF NOT EXISTS `items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `category` VARCHAR(50) NOT NULL, -- e.g. 'bedroom', 'dining', etc.
    `name` VARCHAR(255) NOT NULL,
    `price` VARCHAR(50) NOT NULL, -- e.g. 'Rs. 89,000'
    `old_price` VARCHAR(50) DEFAULT NULL, -- e.g. 'Rs. 98,000'
    `rating` INT DEFAULT 5, -- rating from 1 to 5
    `image_bg` VARCHAR(255) NOT NULL, -- CSS background gradient classes
    `badge` VARCHAR(50) DEFAULT NULL, -- e.g. 'Sale', 'New'
    `image` VARCHAR(255) DEFAULT NULL, -- Optional image URL for product
    `tag` VARCHAR(20) DEFAULT NULL, -- Featured Tag: 'best', 'new', 'offer', or NULL
    `subcategory` VARCHAR(50) DEFAULT NULL, -- Optional subcategory for filtering (e.g. 'sofa-sets')
    `icon` VARCHAR(50) NOT NULL, -- Emoji representing category
    `item_code` VARCHAR(50) DEFAULT NULL, -- Optional product SKU code e.g. 'TCD-0001'
    `description` TEXT DEFAULT NULL,
    `dimensions` TEXT DEFAULT NULL,
    `warranty` TEXT DEFAULT NULL,
    `additional_images` TEXT DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table for homepage hero/slider banners management
CREATE TABLE IF NOT EXISTS `banners` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) DEFAULT NULL,           -- Main heading text e.g. "Luxury Sofa Collection"
    `subtitle` VARCHAR(255) DEFAULT NULL,        -- Yellow tagline text e.g. "Up to 20% Off"
    `description` TEXT DEFAULT NULL,            -- Body description paragraph
    `tag` VARCHAR(100) DEFAULT NULL,             -- Small pill badge label e.g. "LIVING ROOM FURNITURE"
    `button_text` VARCHAR(100) DEFAULT 'Shop Now', -- CTA button label
    `link_url` VARCHAR(255) DEFAULT NULL,        -- Button click link e.g. "/living-room"
    `image` VARCHAR(255) DEFAULT NULL,           -- Background image URL (uploaded or external)
    `bg_gradient` VARCHAR(255) DEFAULT 'from-red-600 to-red-800', -- CSS gradient fallback
    `sort_order` INT DEFAULT 0,                  -- Lower number = shown first
    `is_active` TINYINT(1) DEFAULT 1,            -- 1 = visible, 0 = hidden
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table for registered frontend users (login/signup system)
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(100) NOT NULL UNIQUE,              -- Unique display name
    `email` VARCHAR(255) NOT NULL UNIQUE,                 -- Login email address
    `password` VARCHAR(255) NOT NULL,                     -- bcrypt hashed password (never plain text)
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
