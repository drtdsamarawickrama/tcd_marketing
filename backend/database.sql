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
    `icon` VARCHAR(50) NOT NULL, -- Emoji representing category
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
