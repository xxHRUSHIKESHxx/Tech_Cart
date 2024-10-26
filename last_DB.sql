CREATE DATABASE  IF NOT EXISTS `capstone_ecommerce` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `capstone_ecommerce`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: capstone_ecommerce
-- ------------------------------------------------------
-- Server version	8.4.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `api_cart`
--

DROP TABLE IF EXISTS `api_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `api_cart_user_id_79972181_fk_api_user_id` FOREIGN KEY (`user_id`) REFERENCES `api_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_cart`
--

LOCK TABLES `api_cart` WRITE;
/*!40000 ALTER TABLE `api_cart` DISABLE KEYS */;
INSERT INTO `api_cart` VALUES (1,'2024-10-04 06:23:40.543545','2024-10-04 06:23:40.543545',7),(2,'2024-10-09 05:13:40.027776','2024-10-09 05:13:40.027776',8),(3,'2024-10-09 06:36:46.998859','2024-10-09 06:36:46.998859',9),(4,'2024-10-21 08:31:44.582684','2024-10-21 08:31:44.582684',10),(5,'2024-10-25 05:18:06.634736','2024-10-25 05:18:06.634736',11);
/*!40000 ALTER TABLE `api_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_cartitem`
--

DROP TABLE IF EXISTS `api_cartitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_cartitem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `price_at_addition` decimal(10,2) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `cart_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_cartitem_cart_id_26c2013b_fk_api_cart_id` (`cart_id`),
  KEY `api_cartitem_product_id_4699c5ae_fk_api_product_id` (`product_id`),
  CONSTRAINT `api_cartitem_cart_id_26c2013b_fk_api_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `api_cart` (`id`),
  CONSTRAINT `api_cartitem_product_id_4699c5ae_fk_api_product_id` FOREIGN KEY (`product_id`) REFERENCES `api_product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_cartitem`
--

LOCK TABLES `api_cartitem` WRITE;
/*!40000 ALTER TABLE `api_cartitem` DISABLE KEYS */;
INSERT INTO `api_cartitem` VALUES (40,1,157000.00,'2024-10-21 09:35:22.859195',1,2),(43,1,129999.00,'2024-10-21 09:39:13.317722',1,5),(45,1,74999.00,'2024-10-21 13:38:20.573889',1,9),(47,1,115000.00,'2024-10-21 13:57:41.839276',1,4),(52,1,92999.00,'2024-10-21 14:43:14.004331',1,8),(53,1,89999.00,'2024-10-24 10:25:19.983051',1,3),(54,1,89999.00,'2024-10-25 05:59:50.852269',5,3);
/*!40000 ALTER TABLE `api_cartitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_category`
--

DROP TABLE IF EXISTS `api_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `parent_category_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `api_category_parent_category_id_9631abbd_fk_api_category_id` (`parent_category_id`),
  CONSTRAINT `api_category_parent_category_id_9631abbd_fk_api_category_id` FOREIGN KEY (`parent_category_id`) REFERENCES `api_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_category`
--

LOCK TABLES `api_category` WRITE;
/*!40000 ALTER TABLE `api_category` DISABLE KEYS */;
INSERT INTO `api_category` VALUES (1,'laptop','2024-09-26 09:35:16.319783','2024-09-26 09:35:16.319783',NULL),(4,'phones','2024-10-06 11:14:52.163720','2024-10-06 11:14:52.163720',NULL),(5,'earphones','2024-10-06 14:28:02.534415','2024-10-06 14:28:02.534415',NULL),(6,'Gaming console','2024-10-07 09:48:43.286636','2024-10-07 09:48:43.286636',NULL),(7,'Headphones','2024-10-07 10:03:58.669626','2024-10-07 10:03:58.669626',NULL),(8,'Electronic Watches','2024-10-07 10:51:47.970876','2024-10-07 10:51:47.970876',NULL),(9,'night glasses','2024-10-14 18:22:57.895275','2024-10-14 18:22:57.895275',NULL);
/*!40000 ALTER TABLE `api_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_order`
--

DROP TABLE IF EXISTS `api_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','shipped','delivered','cancelled') NOT NULL,
  `shipping_address` text NOT NULL,
  `billing_address` text NOT NULL,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `payment_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `payment_id` (`payment_id`),
  CONSTRAINT `api_order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `api_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `api_order_ibfk_2` FOREIGN KEY (`payment_id`) REFERENCES `api_payment` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_order`
--

LOCK TABLES `api_order` WRITE;
/*!40000 ALTER TABLE `api_order` DISABLE KEYS */;
INSERT INTO `api_order` VALUES (1,7,229997.00,'shipped','123 Main St','456 Side St','2024-10-08 12:57:47',4),(2,8,229997.00,'cancelled','123 Main St','456 Side St','2024-10-15 10:55:32',5),(3,2,229997.00,'pending','123 Main St','456 Side St','2024-10-17 10:49:41',9),(4,7,92999.00,'pending','jnjnj','jnjnj','2024-10-18 04:05:43',15),(5,7,92999.00,'pending','njnjn','njnjn','2024-10-18 04:05:56',15),(6,7,92999.00,'pending','njnjn','njnjn','2024-10-18 04:09:51',15),(7,7,89999.00,'delivered','fdasfdsfas','fdasfdsfas','2024-10-18 05:45:25',19),(8,7,157000.00,'pending','fasdfasfsad','fasdfasfsad','2024-10-18 05:46:04',20),(9,7,89999.00,'pending','bhjhhb','bhjhhb','2024-10-18 05:49:58',21),(10,7,115000.00,'shipped','fasfdafsdf','fasfdafsdf','2024-10-18 12:19:27',22),(11,7,89999.00,'pending','near my home','123 Default St, Sample City','2024-10-21 05:29:23',24),(12,7,115000.00,'pending','near my home','123 Default St, Sample City','2024-10-21 05:39:35',26),(13,7,229997.00,'pending','123 Main St','456 Side St','2024-10-21 06:51:40',30),(14,7,361999.00,'pending','fdasdfasdf','123 Default St, Sample City','2024-10-21 07:13:56',33),(15,7,129999.00,'pending','fasdfsadfas','123 Default St, Sample City','2024-10-21 08:34:15',34),(16,7,157000.00,'pending','dffasda','123 Default St, Sample City','2024-10-21 09:39:04',35),(17,7,229997.00,'pending','123 Main St','456 Side St','2024-10-21 10:13:10',36),(18,7,229997.00,'pending','123 Main St','456 Side St','2024-10-21 10:19:41',37),(19,7,229997.00,'pending','123 Main St','456 Side St','2024-10-21 10:20:35',37),(20,7,89999.00,'pending','nknk','123 Default St, Sample City','2024-10-21 10:34:58',38),(21,7,115000.00,'pending','near home','123 Default St, Sample City','2024-10-21 10:43:22',39),(22,7,569997.00,'pending','anywhere','123 Default St, Sample City','2024-10-21 14:48:37',40),(23,7,89999.00,'pending','dfafas','123 Default St, Sample City','2024-10-21 14:49:07',41),(24,7,569997.00,'pending','near my home','123 Default St, Sample City','2024-10-21 16:15:55',42),(25,7,569997.00,'cancelled','sdfasfasfs','123 Default St, Sample City','2024-10-22 10:23:33',43),(26,7,129999.00,'pending','nkjjnknkj','123 Default St, Sample City','2024-10-24 14:20:48',44),(27,11,89999.00,'pending','dfasdfasdf','123 Default St, Sample City','2024-10-25 05:40:24',45);
/*!40000 ALTER TABLE `api_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_orderitem`
--

DROP TABLE IF EXISTS `api_orderitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_orderitem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `price_at_purchase` decimal(10,2) NOT NULL,
  `order_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_orderitem_order_id_f9c0afc0_fk_api_order_id` (`order_id`),
  KEY `api_orderitem_product_id_afd9cdd0_fk_api_product_id` (`product_id`),
  CONSTRAINT `api_orderitem_product_id_afd9cdd0_fk_api_product_id` FOREIGN KEY (`product_id`) REFERENCES `api_product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_orderitem`
--

LOCK TABLES `api_orderitem` WRITE;
/*!40000 ALTER TABLE `api_orderitem` DISABLE KEYS */;
INSERT INTO `api_orderitem` VALUES (1,2,100000.00,1,4),(2,1,500000.00,1,5),(3,2,500000.00,3,5),(4,1,100000.00,3,6),(5,2,500000.00,4,5),(6,1,100000.00,4,6),(7,2,500000.00,5,5),(8,1,100000.00,5,6),(9,2,500000.00,6,5),(10,1,100000.00,6,6),(11,1,500000.00,7,5),(12,1,100000.00,7,6),(13,1,500000.00,8,5),(14,1,100000.00,8,6),(15,1,500000.00,10,5),(16,2,100000.00,10,6),(17,1,129999.00,1,5),(18,2,49999.00,1,6),(19,1,129999.00,2,5),(20,2,49999.00,2,6),(21,1,129999.00,3,5),(22,2,49999.00,3,6),(23,1,92999.00,4,8),(24,1,92999.00,5,8),(25,1,92999.00,6,8),(26,1,89999.00,7,3),(27,1,157000.00,8,2),(28,1,89999.00,9,3),(29,1,115000.00,10,4),(30,1,89999.00,11,3),(31,1,115000.00,12,4),(32,1,129999.00,13,5),(33,2,49999.00,13,6),(34,1,157000.00,14,2),(35,1,89999.00,14,3),(36,1,115000.00,14,4),(37,1,129999.00,15,5),(38,1,157000.00,16,2),(39,1,129999.00,17,5),(40,2,49999.00,17,6),(41,1,129999.00,18,5),(42,2,49999.00,18,6),(43,1,129999.00,19,5),(44,2,49999.00,19,6),(45,1,89999.00,20,3),(46,1,115000.00,21,4),(47,1,157000.00,22,2),(48,1,129999.00,22,5),(49,1,74999.00,22,9),(50,1,115000.00,22,4),(51,1,92999.00,22,8),(52,1,89999.00,23,3),(53,1,157000.00,24,2),(54,1,129999.00,24,5),(55,1,74999.00,24,9),(56,1,115000.00,24,4),(57,1,92999.00,24,8),(58,1,157000.00,25,2),(59,1,129999.00,25,5),(60,1,74999.00,25,9),(61,1,115000.00,25,4),(62,1,92999.00,25,8),(63,1,129999.00,26,5),(64,1,89999.00,27,3);
/*!40000 ALTER TABLE `api_orderitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_payment`
--

DROP TABLE IF EXISTS `api_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_payment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `payment_method` varchar(20) NOT NULL,
  `payment_status` varchar(10) NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `payment_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `amount` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `api_payment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `api_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_payment`
--

LOCK TABLES `api_payment` WRITE;
/*!40000 ALTER TABLE `api_payment` DISABLE KEYS */;
INSERT INTO `api_payment` VALUES (1,7,'credit_card','completed','','2024-10-07 10:24:06',600000.00),(2,7,'credit_card','completed','','2024-10-07 10:39:33',600000.00),(3,7,'credit_card','completed','','2024-10-07 10:40:17',400000.00),(4,7,'credit_card','completed','','2024-10-08 12:31:36',400000.00),(5,8,'credit_card','completed','','2024-10-15 10:49:30',400000.00),(6,NULL,'credit_card','completed','','2024-10-17 09:25:08',400000.00),(7,2,'credit_card','completed','','2024-10-17 10:39:57',400000.00),(8,NULL,'credit_card','completed','','2024-10-17 10:48:36',229997.00),(9,2,'credit_card','completed','','2024-10-17 10:49:29',229997.00),(10,2,'credit_card','completed','','2024-10-17 15:44:59',229997.00),(11,2,'credit_card','completed','','2024-10-17 15:50:49',157000.00),(12,2,'credit_card','completed','','2024-10-17 15:53:44',157000.00),(13,7,'credit_card','completed','','2024-10-17 15:55:44',157000.00),(14,7,'credit_card','completed','','2024-10-17 15:56:28',157000.00),(15,7,'credit_card','completed','','2024-10-18 03:58:15',92999.00),(16,7,'credit_card','completed','','2024-10-18 05:41:04',89999.00),(17,7,'credit_card','completed','','2024-10-18 05:42:06',89999.00),(18,7,'credit_card','completed','','2024-10-18 05:43:37',89999.00),(19,7,'credit_card','completed','','2024-10-18 05:45:24',89999.00),(20,7,'credit_card','completed','','2024-10-18 05:46:03',157000.00),(21,7,'credit_card','completed','','2024-10-18 05:49:57',89999.00),(22,7,'credit_card','completed','','2024-10-18 12:19:26',115000.00),(23,2,'credit_card','completed','','2024-10-21 04:34:26',229997.00),(24,7,'credit_card','completed','','2024-10-21 05:29:22',89999.00),(25,NULL,'credit_card','completed','','2024-10-21 05:31:09',115000.00),(26,7,'credit_card','completed','','2024-10-21 05:39:34',115000.00),(27,7,'credit_card','completed','','2024-10-21 06:12:07',246999.00),(28,7,'credit_card','completed','','2024-10-21 06:16:44',246999.00),(29,7,'credit_card','completed','','2024-10-21 06:18:50',246999.00),(30,7,'credit_card','completed','','2024-10-21 06:49:48',229997.00),(31,7,'credit_card','completed','','2024-10-21 06:52:24',361999.00),(32,7,'credit_card','completed','','2024-10-21 06:55:06',361999.00),(33,7,'credit_card','completed','','2024-10-21 07:13:55',361999.00),(34,7,'credit_card','completed','','2024-10-21 08:34:14',129999.00),(35,7,'UPI','completed','','2024-10-21 09:39:03',157000.00),(36,7,'credit_card','completed','','2024-10-21 10:12:49',229997.00),(37,7,'credit_card','completed','','2024-10-21 10:19:19',229997.00),(38,7,'credit_card','completed','','2024-10-21 10:34:57',89999.00),(39,7,'credit_card','completed','txn_1729507392409','2024-10-21 10:43:21',115000.00),(40,7,'credit_card','completed','txn_1729522104905','2024-10-21 14:48:35',569997.00),(41,7,'credit_card','completed','txn_1729522140476','2024-10-21 14:49:06',89999.00),(42,7,'credit_card','completed','txn_1729527343232','2024-10-21 16:15:54',569997.00),(43,7,'credit_card','completed','txn_1729592601688','2024-10-22 10:23:32',569997.00),(44,7,'credit_card','completed','txn_1729779634408','2024-10-24 14:20:47',129999.00),(45,11,'credit_card','completed','txn_1729834816537','2024-10-25 05:40:23',89999.00);
/*!40000 ALTER TABLE `api_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_product`
--

DROP TABLE IF EXISTS `api_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `category_id` bigint NOT NULL,
  `brand` varchar(255) NOT NULL,
  `featured` tinyint(1) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `api_product_category_id_a2b9d1e7_fk_api_category_id` (`category_id`),
  CONSTRAINT `api_product_category_id_a2b9d1e7_fk_api_category_id` FOREIGN KEY (`category_id`) REFERENCES `api_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_product`
--

LOCK TABLES `api_product` WRITE;
/*!40000 ALTER TABLE `api_product` DISABLE KEYS */;
INSERT INTO `api_product` VALUES (1,'dell-insprion','dell-inspirion-des',10000.00,10,'2024-09-26 09:41:30.252667','2024-09-26 09:41:30.252667',1,'dell',1,'products/Screenshot_26-9-2024_93833_www.bing.com.jpeg'),(2,'HP Dragonfly G4','The HP Dragonfly G4 is a premium business laptop designed for professionals who demand top-tier performance, portability, and security. Powered by the latest Intel Core i7 processors, it boasts a sleek magnesium chassis, a 13.5-inch display with 3:2 aspect ratio, and long-lasting battery life.',157000.00,15,'2024-10-06 10:40:10.439105','2024-10-06 10:40:10.439105',1,'HP',1,'products/Lp1.jpg'),(3,'Dell Vostro 16','The Dell Vostro 16 is a versatile and powerful laptop designed for business professionals and students alike. Featuring a 16-inch FHD+ display, it offers ample screen real estate for multitasking and productivity.',89999.00,20,'2024-10-06 10:42:48.903115','2024-10-06 10:42:48.903115',1,'Dell',1,'products/Lp2.jpg'),(4,'Lenovo LOQ 14 Gen','The Lenovo LOQ 14 Gen is a powerful gaming and productivity laptop designed for those who demand performance on the go. Featuring a 14-inch FHD display with a high refresh rate, it delivers smooth visuals for gaming and multimedia.',115000.00,15,'2024-10-06 10:45:10.327834','2024-10-21 11:00:10.464068',1,'Lenovo',0,'products/Lp3.jpg'),(5,'Samsung Galaxy Book3 (Core i7)','The Samsung Galaxy Book3, powered by the Intel Core i7 processor, is a premium laptop designed for both work and entertainment. It features a stunning 15.6-inch FHD AMOLED display, offering vibrant colors and crisp details, perfect for content creation and media consumption.',129999.00,18,'2024-10-06 10:47:48.931710','2024-10-21 11:00:10.403945',1,'Samsung',0,'products/Lp4.jpg'),(6,'Honor MagicBook X16','The Honor MagicBook X16 is a sleek and affordable laptop designed for everyday productivity and entertainment. Featuring a 16.1-inch FHD IPS display, it provides an immersive viewing experience with vibrant colors and excellent clarity. Powered by an Intel Core i5 processor, it handles daily tasks like web browsing, video streaming, and document editing with ease.',49999.00,18,'2024-10-06 10:50:03.628963','2024-10-21 11:00:10.421477',1,'Honor',0,'products/Lp5.jpg'),(7,'HP Pavilion 15','The HP Pavilion 15 is a stylish and powerful laptop designed for everyday users who need performance and portability. Featuring a 15.6-inch FHD display with narrow bezels, it provides a crisp and clear viewing experience. Powered by the latest Intel Core i5 or i7 processors, the Pavilion 15 is perfect for multitasking, video editing, or casual gaming.',675999.00,15,'2024-10-06 10:51:44.563758','2024-10-09 05:27:19.678488',1,'HP',1,'products/Lp6.jpg'),(8,'Lenovo ThinkBook 16','The Lenovo ThinkBook 16 is a powerful and versatile business laptop, designed for professionals who need a blend of performance and productivity. With a large 16-inch WQXGA (2560 x 1600) display, it offers superb clarity and detail, making it perfect for multitasking, design, and presentations. Powered by up to 13th Gen Intel Core i7 processors, this laptop delivers smooth performance for demanding applications and multitasking.',92999.00,15,'2024-10-06 10:53:20.966393','2024-10-06 10:53:20.966393',1,'Lenovo',1,'products/Lp7.jpg'),(9,'Acer Aspire Lite (AMD Ryzen 7)','The Acer Aspire Lite, powered by AMD Ryzen 7, is a sleek and powerful laptop that offers great value for both productivity and entertainment. It features a 15.6-inch FHD display, providing clear and vibrant visuals for work, media consumption, and casual gaming. The AMD Ryzen 7 processor ensures high performance, making it suitable for multitasking, photo editing, and more demanding applications.',74999.00,20,'2024-10-06 10:55:39.896849','2024-10-06 10:55:39.896849',1,'Acer',0,'products/Lp8.jpg'),(10,'Lenovo IdeaPad Slim 3','The Lenovo IdeaPad Slim 3 is a lightweight and stylish laptop designed for everyday use, making it an excellent choice for students and professionals alike. Featuring a 15.6-inch FHD display, it offers vibrant visuals and ample screen space for productivity and entertainment. Powered by AMD Ryzen 5 or Intel Core i5 processors, it delivers solid performance for multitasking, web browsing, and streaming.',52999.00,23,'2024-10-06 10:57:14.938135','2024-10-06 10:57:14.938135',1,'Lenovo',0,'products/Lp9.jpg'),(11,'Dell Latitude 7450','The Dell Latitude 7450 is a high-performance business laptop designed for professionals who require reliability and portability. Featuring a 14-inch FHD display with anti-glare technology, it provides clear visuals in any lighting condition. Powered by Intel\'s 5th Gen Core i7 processor, it delivers robust performance for multitasking and demanding applications',115000.00,15,'2024-10-06 10:59:07.489587','2024-10-06 10:59:07.489587',1,'Dell',1,'products/Lp10.jpg'),(12,'Dell Inspiron 15','The Dell Inspiron 15 is a versatile and reliable laptop designed for both work and entertainment. It features a 15.6-inch FHD display, delivering vibrant colors and sharp details, making it perfect for streaming videos and working on projects. Powered by the latest Intel Core i5 or AMD Ryzen 5 processors, this laptop ensures smooth performance for multitasking and everyday tasks.',64999.00,18,'2024-10-06 11:00:50.105481','2024-10-06 11:00:50.105481',1,'Dell',0,'products/Lp11.jpg'),(13,'Asus VivoBook S15','The Asus VivoBook S15 combines style and performance in a sleek, lightweight design, making it perfect for students and professionals alike. It features a stunning 15.6-inch FHD display with slim bezels, delivering vibrant visuals and an immersive viewing experience.',74999.00,18,'2024-10-06 11:04:15.162794','2024-10-06 11:04:15.162794',1,'Asus',0,'products/Lp12.png'),(14,'iPhone 13','The iPhone 13 is a powerful smartphone that combines cutting-edge technology with a sleek design. Featuring a 6.1-inch Super Retina XDR display, it delivers stunning visuals with vibrant colors and sharp contrast. Powered by the A15 Bionic chip, the iPhone 13 offers lightning-fast performance and efficiency, ensuring smooth multitasking and gaming.',69900.00,25,'2024-10-06 13:47:32.869584','2024-10-06 13:47:32.869584',4,'iphone',0,'products/ph1.png'),(15,'Samsung Galaxy S24','The Samsung Galaxy S24 is the latest flagship smartphone designed to deliver an unparalleled mobile experience. Featuring a stunning 6.1-inch Dynamic AMOLED 2X display with a 120Hz refresh rate, it offers vibrant colors and ultra-smooth scrolling, making everything from gaming to streaming a delight.',79999.00,30,'2024-10-06 13:52:35.206255','2024-10-06 13:52:35.206255',4,'Samsung',1,'products/ph2.png'),(16,'Realme 13 Pro','The Realme 13 Pro is a feature-packed smartphone designed for users who value performance and style. It boasts a vibrant 6.7-inch FHD+ Super AMOLED display with a 120Hz refresh rate, providing smooth visuals and an immersive viewing experience. Powered by a MediaTek Dimensity 920 processor, the Realme 13 Pro delivers impressive performance for gaming and multitasking.',24999.00,30,'2024-10-06 13:55:26.223151','2024-10-06 13:55:26.223151',4,'Realme',0,'products/ph3.png'),(17,'Redmi Note 10 Pro','The Redmi Note 10 Pro is a feature-rich smartphone that offers exceptional value for users seeking performance and style. It features a stunning 6.67-inch FHD+ Super AMOLED display with a 120Hz refresh rate, providing vibrant colors and smooth scrolling for an immersive viewing experience.',17999.00,35,'2024-10-06 13:56:55.046975','2024-10-06 13:56:55.046975',4,'Redmi',0,'products/ph4.png'),(18,'Oppo F21 Pro','The Oppo F21 Pro is a stylish and feature-packed smartphone designed for users who love photography and multitasking. It boasts a 6.43-inch FHD+ Super AMOLED display that delivers vibrant colors and sharp details, perfect for streaming videos and gaming.',22999.00,25,'2024-10-06 13:59:07.328715','2024-10-06 13:59:07.328715',4,'Oppo',0,'products/ph5.png'),(19,'OnePlus 12R','The OnePlus 12R is a high-performance smartphone designed for users who demand speed and efficiency. Featuring a 6.7-inch Fluid AMOLED display with a 120Hz refresh rate, it offers stunning visuals and smooth scrolling for gaming and media consumption. Powered by the latest Qualcomm Snapdragon 8 Gen 2 processor, the OnePlus 12R ensures lightning-fast performance and seamless multitasking.',49999.00,25,'2024-10-06 14:01:03.510999','2024-10-06 14:01:03.510999',4,'Oneplus',1,'products/ph6.png'),(20,'Oppo Reno 11F','The Oppo Reno 11F is a stylish and feature-rich smartphone designed for users who value photography and performance. It features a stunning 6.7-inch FHD+ AMOLED display, delivering vibrant colors and crisp visuals for an immersive viewing experience. Powered by the MediaTek Dimensity 920 processor, the Reno 11F provides smooth performance for gaming, multitasking, and everyday tasks.',27999.00,30,'2024-10-06 14:03:05.979241','2024-10-06 14:03:05.979241',4,'Oppo',1,'products/ph7.png'),(21,'Vivo V40','The Vivo V40 is a sleek and stylish smartphone that combines innovative technology with an eye-catching design. Featuring a 6.44-inch FHD+ AMOLED display, it offers vibrant colors and sharp clarity, making it perfect for streaming videos and gaming. Powered by the MediaTek Dimensity 8020 processor, the V40 ensures fast and efficient performance for multitasking and gaming.',32999.00,32,'2024-10-06 14:05:05.386755','2024-10-06 14:05:05.386755',4,'Vivo',0,'products/ph8.png'),(22,'Redmi Note 12 Pro','The Redmi Note 12 Pro is a powerful and stylish smartphone that offers impressive features at an affordable price. It boasts a large 6.67-inch FHD+ Super AMOLED display with a 120Hz refresh rate, providing vibrant visuals and smooth scrolling for an immersive experience.',21999.00,34,'2024-10-06 14:08:08.575017','2024-10-06 14:08:08.575017',4,'Redmi',0,'products/ph10.png'),(23,'Oppo Reno 6','The Oppo Reno 6 is a stylish smartphone that blends cutting-edge technology with a sleek design, perfect for photography enthusiasts and everyday users. It features a 6.43-inch FHD+ AMOLED display with a 90Hz refresh rate, delivering vibrant colors and smooth scrolling for an enhanced viewing experience.',28999.00,30,'2024-10-06 14:10:03.741102','2024-10-06 14:10:03.741102',4,'Oppo',1,'products/ph11.png'),(24,'OnePlus 11','The OnePlus 11 is a flagship smartphone that delivers top-tier performance and an exceptional user experience. Featuring a stunning 6.7-inch QHD+ AMOLED display with a 120Hz refresh rate, it provides vibrant colors and smooth visuals for gaming and streaming.',61999.00,20,'2024-10-06 14:11:50.188478','2024-10-06 14:11:50.188478',4,'Oneplus',1,'products/ph12.png'),(25,'Realme 12 Pro','The Realme 12 Pro is a feature-rich smartphone designed for users who prioritize performance and camera quality. It features a 6.7-inch FHD+ Super AMOLED display with a 120Hz refresh rate, providing vibrant visuals and a smooth user experience, perfect for gaming and streaming.',23999.00,25,'2024-10-06 14:17:05.443463','2024-10-06 14:17:05.443463',4,'Realme',0,'products/ph9.jpeg'),(26,'Alps Audio WRD-D17','The Alps Audio WRD-D17 are high-quality wired in-ear earphones that deliver clear sound and deep bass. Designed for comfort, these earphones feature a tangle-free cable and soft silicone ear tips for long-lasting use. Perfect for everyday music and calls.',499.00,40,'2024-10-07 09:20:58.913040','2024-10-07 09:20:58.913040',5,'Alps',0,'products/ep1.jpg'),(27,'Ambrane Wired In-Earphones','The Ambrane Wired In-Earphones provide a balanced audio experience with clear highs and deep bass. These earphones come with a built-in microphone for hands-free calls and a lightweight design for comfortable all-day wear. Ideal for music lovers and professionals on the go.',399.00,45,'2024-10-07 09:22:02.260037','2024-10-07 09:22:02.261046',5,'Ambrane',0,'products/ep2.jpg'),(28,'Zebronics Zeb-Bro','The Zebronics Zeb-Bro is a budget-friendly pair of wired earphones that offer a good balance of sound quality and comfort. Featuring a 10mm driver, it provides deep bass and clear vocals, along with a lightweight design for easy portability.',199.00,35,'2024-10-07 09:23:08.968166','2024-10-07 09:23:08.968166',5,'Zebronics',0,'products/ep3.jpg'),(29,'Boat BassHeads 100','The Boat BassHeads 100 are stylish in-ear wired earphones that deliver deep bass and crisp sound. Designed with an ergonomic fit and noise-isolation capabilities, they are perfect for immersive music and hands-free calling with their built-in microphone.',399.00,35,'2024-10-07 09:24:21.820072','2024-10-07 09:24:21.820072',5,'Boat',1,'products/ep4.jpg'),(30,'Boat BassHeads 105','The Boat BassHeads 105 offers an upgraded audio experience with dynamic 10mm drivers, delivering rich bass and clear vocals. These earphones are designed for comfort and come with an in-line microphone for hands-free calls, ideal for music lovers on the go.',499.00,35,'2024-10-07 09:25:04.837805','2024-10-07 09:25:04.837805',5,'Boat',1,'products/ep5.jpg'),(31,'Realme Buds 2 Wired','The Realme Buds 2 Wired Earphones feature powerful 11.2mm drivers, providing rich bass and crystal-clear sound. The built-in microphone and tangle-free cable make these earphones perfect for calls and music, while the ergonomic design ensures long-lasting comfort.',599.00,25,'2024-10-07 09:26:35.212932','2024-10-07 09:26:35.212932',5,'Boat',1,'products/ep6.jpg'),(32,'Urbonik Original Wired Earphones','The Urbonik Original Wired Earphones deliver good audio quality with deep bass and clear mids. Designed for durability, these earphones come with a tangle-free cable and comfortable earbuds, making them perfect for casual music listeners.',299.00,30,'2024-10-07 09:27:48.596450','2024-10-07 09:27:48.596450',5,'Urbonik',0,'products/ep7.jpg'),(33,'JBL C200SI','The JBL C200SI earphones offer superior sound quality with powerful bass and crystal-clear highs. These lightweight, in-ear wired earphones come with a comfortable fit and a one-button universal remote for hands-free calls, perfect for music lovers and professionals alike.',749.00,30,'2024-10-07 09:29:04.167326','2024-10-07 09:29:04.167326',5,'JBL',1,'products/ep8.jpg'),(34,'Portronics Conch Theta A','The Portronics Conch Theta A is designed for deep bass and clear treble, making it ideal for an immersive audio experience. The lightweight design, comfortable fit, and in-line microphone for calls ensure a convenient and enjoyable experience for users on the go.',599.00,32,'2024-10-07 09:30:03.103140','2024-10-07 09:30:03.103140',5,'Portronics',1,'products/ep9.jpg'),(35,'Samsung Original EHS64','The Samsung Original EHS64 in-ear earphones are designed for optimal sound quality and comfortable use. With a balanced audio output and built-in microphone, these earphones are perfect for music and hands-free calls, featuring a durable and tangle-free cable.',449.00,32,'2024-10-07 09:32:08.482386','2024-10-07 09:32:08.482386',5,'Samsung',1,'products/ep10.jpg'),(36,'Honeywell Moxie V50','The Honeywell Moxie V50 offers premium sound with deep bass and clear vocals. Its ergonomic design, lightweight build, and in-line microphone make it an ideal choice for users who want high-quality audio and convenient calling features.',599.00,30,'2024-10-07 09:33:04.387763','2024-10-07 09:33:04.387763',5,'Honeywell',1,'products/ep11.jpg'),(37,'Zebronics Zeb-Buds 30','The Zebronics Zeb-Buds 30 are wired in-ear earphones designed for everyday use. They provide decent sound quality with bass-heavy audio, a comfortable fit, and a built-in microphone for hands-free calls, making them great for casual listening and calling.',299.00,30,'2024-10-07 09:33:55.960494','2024-10-07 09:33:55.960494',5,'Zebronics',0,'products/ep12.jpg'),(38,'Alps Audio 4K HDMI Wireless GameStick','The Alps Audio 4K HDMI Wireless GameStick is a plug-and-play console offering a huge library of classic games in 4K resolution. It includes wireless controllers, providing an easy and immersive gaming experience for retro and modern games alike.',3499.00,30,'2024-10-07 09:51:57.178981','2024-10-07 09:51:57.178981',6,'Alps',0,'products/gc1.png'),(39,'Black Foru Wireless Retro Game Console','The Black Foru Wireless Retro Game Console is a portable retro gaming system. It includes two wireless controllers and comes pre-installed with over 1000 retro games, offering multiplayer fun with modern TV compatibility via HDMI.',2999.00,25,'2024-10-07 09:53:01.722157','2024-10-07 09:53:01.722157',6,'Black Foru',0,'products/gc2.jpg'),(40,'HMNY Retro Video Game Console','The HMNY Retro Video Game Console delivers an authentic retro gaming experience with hundreds of preloaded classic games. It features HDMI output and comes with two controllers, making it a great choice for family gaming sessions.',1999.00,25,'2024-10-07 09:53:53.571716','2024-10-07 09:53:53.571716',6,'HMNY',0,'products/gc3.png'),(41,'Ant Esports Dock 5 with Cooling Fan','The Ant Esports Dock 5 is a cooling dock for gaming consoles designed to prevent overheating during intense gaming sessions. It includes a built-in cooling fan and offers a convenient docking solution for various consoles.',1499.00,25,'2024-10-07 09:55:07.348170','2024-10-07 09:55:07.348170',6,'Ant Esports',0,'products/gc4.jpg'),(42,'X7 Handheld Game Player','The X7 Handheld Game Player is a versatile handheld console featuring a 7-inch display and hundreds of preloaded classic games. It also supports multimedia playback, making it perfect for gaming, watching videos, and listening to music on the go.',2999.00,30,'2024-10-07 09:56:13.478766','2024-10-07 09:56:13.478766',6,'X7',1,'products/gc5.png'),(43,'Sameo iPlay 32-Bit Handheld Game Console','The Sameo iPlay 32-Bit Handheld Console is a compact and fun device preloaded with retro games. Featuring a 3-inch display and ergonomic controls, it’s an ideal pocket-sized console for casual gaming.',1899.00,30,'2024-10-07 09:57:01.326328','2024-10-07 09:57:01.326328',6,'Sameo',1,'products/gc6.png'),(44,'R36S Handheld Game Console','The R36S Handheld Game Console features a 5.1-inch display and comes with a wide selection of classic games pre-installed. Designed for gamers on the move, it supports multiple emulators and provides a portable gaming experience.',3499.00,25,'2024-10-07 09:58:14.110248','2024-10-07 09:58:14.110248',6,'R36S',1,'products/gc7.jpg'),(45,'X7 Handheld Game Console MP5','This version of the X7 Handheld Game Console also supports MP5 multimedia functionality, allowing for video playback, music, and more. With a 7-inch display and pre-installed retro games, it combines entertainment and gaming into one device.',3199.00,25,'2024-10-07 09:59:45.862339','2024-10-07 09:59:45.862339',6,'X7',1,'products/gc8.jpg'),(46,'Abxylute Handheld Game Console','The Abxylute Handheld Game Console is a premium device designed for retro and indie game enthusiasts. Featuring a sleek design, 4.5-inch display, and long battery life, this console supports a wide range of emulators for gaming on the go.',6499.00,20,'2024-10-07 10:00:33.833766','2024-10-07 10:00:33.833766',6,'Abxylute',1,'products/gc9.jpg'),(47,'ASUS ROG Ally','The ASUS ROG Ally is a high-performance handheld gaming console powered by the AMD Ryzen processor. With its 7-inch Full HD display and top-tier graphics, the ROG Ally delivers AAA gaming experiences on the go, making it a dream device for serious gamers.',74999.00,20,'2024-10-07 10:01:25.056352','2024-10-07 10:01:25.056352',6,'Asus',1,'products/gc10.png'),(48,'GSH G11 Pro GameBox','The GSH G11 Pro GameBox is a powerful gaming console preloaded with over 3000 classic games. It features 4K output and wireless controllers, making it ideal for both solo and multiplayer gaming in high definition.',4999.00,25,'2024-10-07 10:02:42.653051','2024-10-07 10:02:42.653051',6,'GSH',0,'products/gc11.png'),(49,'G10 Retro Video Game Console','The G10 Retro Video Game Console offers a vast library of 8-bit and 16-bit classic games. With HDMI output and wireless controllers, it combines the best of retro gaming with modern convenience, ideal for nostalgic gamers.',3999.00,25,'2024-10-07 10:03:33.733570','2024-10-07 10:03:33.733570',6,'GSH',0,'products/gc12.png'),(50,'Boat Rockerz 425','The Boat Rockerz 425 is a wireless Bluetooth headset that offers a deep bass experience, designed for music lovers and casual gamers alike. With its 40mm dynamic drivers and up to 35 hours of playtime, the Rockerz 425 delivers both comfort and sound quality. It also supports fast charging, offering up to 10 hours of playtime in just 10 minutes of charge.',1499.00,30,'2024-10-07 10:19:18.054850','2024-10-07 10:19:18.054850',7,'Boat',0,'products/hp1.jpg'),(51,'Trigger Trinity Gaming Headphones','The Trigger Trinity gaming headset provides an immersive gaming experience with its surround sound and noise-canceling microphone. Built for long gaming sessions, it features memory foam ear cushions, RGB lighting, and in-line controls for easy access to volume and microphone settings.',2499.00,30,'2024-10-07 10:20:11.362704','2024-10-07 10:20:11.362704',7,'Trigger Trinity',0,'products/hp2.jpg'),(52,'Noise Tune Wireless  Headphones','The Noise Tune Wireless Earphones deliver clear sound and deep bass with Bluetooth 5.0 technology. With a lightweight design, magnetic earbuds, and up to 10 hours of battery life, they are ideal for both fitness enthusiasts and casual listeners.',2999.00,32,'2024-10-07 10:21:55.633759','2024-10-07 10:21:55.633759',7,'Noise',0,'products/hp3.jpg'),(53,'SpinBot Wireless Gaming Headset','The SpinBot Wireless Gaming Headset features 7.1 virtual surround sound, providing an immersive gaming experience. With noise-canceling technology, a comfortable over-ear design, and RGB lighting, it’s perfect for both competitive gaming and casual use.',2999.00,25,'2024-10-07 10:22:52.311900','2024-10-07 10:22:52.311900',7,'SpinBot',1,'products/hp4.jpg'),(54,'Sony PS5 Pulse 3D Wireless Headset','The Sony Pulse 3D Wireless Headset is designed specifically for the PlayStation 5, offering 3D audio technology for an immersive gaming experience. It features dual noise-canceling microphones, USB-C charging, and easy access to audio controls, making it a must-have accessory for PS5 gamers.',8999.00,20,'2024-10-07 10:24:08.980553','2024-10-07 10:24:08.980553',7,'Sony',1,'products/hp5.jpg'),(55,'Sony WH-CH720N Wireless Headphones','The Sony WH-CH720N is a lightweight, noise-canceling wireless headphone that delivers clear audio and deep bass. With up to 35 hours of battery life, adjustable headband, and Bluetooth 5.2 connectivity, it’s perfect for all-day listening and hands-free calls.',9990.00,20,'2024-10-07 10:24:59.491024','2024-10-07 10:24:59.491024',7,'Sony',1,'products/hp6.jpg'),(56,'JBL Wireless Headphones','The JBL Wireless Headphones provide superior sound quality with powerful bass, clear mids, and crisp highs. With comfortable ear cushions, a foldable design, and up to 20 hours of playtime, these headphones are perfect for everyday use, music, and entertainment.',3499.00,25,'2024-10-07 10:26:06.431075','2024-10-07 10:26:06.431075',7,'JBL',0,'products/hp7.jpg'),(57,'Boat Rockerz 550','The Boat Rockerz 550 wireless headphones are designed for an immersive audio experience with 50mm dynamic drivers that deliver powerful bass. With Bluetooth 5.0, up to 20 hours of playback time, and a comfortable over-ear design, the Rockerz 550 is ideal for long listening sessions.',1999.00,20,'2024-10-07 10:27:37.203398','2024-10-07 10:27:37.203398',7,'Boat',0,'products/hp8.jpg'),(58,'Sony WH-CH520 Wireless Headphones','The Sony WH-CH520 is a sleek and lightweight wireless headphone with up to 50 hours of battery life. It features powerful sound, Bluetooth 5.2, and easy-to-use controls, making it perfect for long listening sessions and seamless wireless connectivity.',4490.00,22,'2024-10-07 10:29:48.239195','2024-10-07 10:29:48.239195',7,'Sony',1,'products/hp9.jpg'),(59,'Boat Rockerz 450','The Boat Rockerz 450 is a lightweight and comfortable wireless Bluetooth headphone, featuring 40mm dynamic drivers that provide excellent bass and sound clarity. With up to 15 hours of battery life, it’s perfect for everyday use and on-the-go listening.',1999.00,22,'2024-10-07 10:30:59.443724','2024-10-07 10:30:59.443724',7,'Boat',0,'products/hp10.jpg'),(60,'Noise Two Wireless Earphones','Description: The Noise Two Wireless Earphones offer a high-quality audio experience with rich bass and clear treble. Equipped with Bluetooth 5.2, fast charging, and up to 35 hours of playback time, these earphones are perfect for workouts and casual listening.',1999.00,25,'2024-10-07 10:31:46.849623','2024-10-07 10:31:46.849623',7,'Noise',0,'products/hp11.jpg'),(61,'Zebronics Thunder Bluetooth 5.3 Headphones','The Zebronics Thunder Bluetooth 5.3 headphones deliver crystal-clear sound with deep bass and a stylish design. They feature a lightweight build, soft ear cushions, and up to 30 hours of playback time, making them perfect for long-term listening and travel.',1999.00,25,'2024-10-07 10:32:35.275904','2024-10-07 10:32:35.275904',7,'Zebronics',0,'products/hp12.jpg'),(62,'Realme Smart Watch 2','The Realme Smart Watch 2 offers a 1.4-inch color touchscreen display with real-time heart rate monitoring, SpO2 tracking, and 90 sport modes. With up to 12 days of battery life and water resistance, it\'s ideal for fitness enthusiasts and casual users alike. The smartwatch also provides smart notifications, sleep tracking, and customizable watch faces.',3499.00,25,'2024-10-07 10:53:05.967466','2024-10-07 10:53:05.967466',8,'Realme',1,'products/w1.jpg'),(63,'Redmi Watch 5 Active BT','The Redmi Watch 5 Active BT comes with a 1.55-inch HD display and features advanced health tracking, including heart rate, SpO2, sleep, and stress monitoring. With up to 14 days of battery life and over 100 workout modes, it is perfect for active users. The smartwatch supports Bluetooth connectivity for calls and notifications.',3999.00,25,'2024-10-07 10:53:59.550120','2024-10-07 10:53:59.550120',8,'Redmi',1,'products/w2.jpg'),(64,'Noise Halo Plus Elite Edition','The Noise Halo Plus Elite Edition features a premium design with a 1.4-inch AMOLED display and Always-On functionality. It comes equipped with comprehensive health monitoring, including SpO2, heart rate, and sleep tracking, along with multiple sports modes. With Bluetooth calling and a sleek metal finish, this smartwatch is designed for both style and functionality.',5499.00,25,'2024-10-07 10:55:15.213285','2024-10-07 10:55:15.213285',8,'Noise',1,'products/w3.jpg'),(65,'Skemi Men\'s Top Brand Watch','The Skemi Men\'s Top Brand watch is a durable, analog-digital hybrid watch that offers both functionality and style. Designed for outdoor use, it features a rugged build, stopwatch, alarm, and water resistance up to 50 meters, making it perfect for adventure seekers.',2999.00,25,'2024-10-07 10:56:27.033070','2024-10-07 10:56:27.033070',8,'Skemi',0,'products/w4.jpg'),(66,'Skemi Men\'s Single Display Watch','The Skemi Men\'s Single Display watch features a classic design with a digital display. Known for its durability and minimalistic style, this watch includes basic features like a stopwatch, alarm, and backlight. It’s an ideal choice for those who prefer a straightforward and affordable timepiece.',1499.00,25,'2024-10-07 10:57:07.092018','2024-10-07 10:57:07.092018',8,'Skemi',0,'products/w5.jpg'),(67,'Noise Halo Plus 1.46\" Super AMOLED Elite Edition','The Noise Halo Plus 1.46 Super AMOLED Elite Edition boasts a larger 1.46-inch Super AMOLED display with Always-On functionality. Designed for premium users, it includes advanced health features such as heart rate and SpO2 monitoring, sleep tracking, and multiple workout modes. With Bluetooth calling and a sleek metal body, it\'s perfect for daily use and fitness tracking.',5999.00,25,'2024-10-07 10:58:12.102818','2024-10-07 10:58:12.102818',8,'Noise',1,'products/w6.jpg'),(68,'Noise Twist Go Smartwatch','The Noise Twist Go is a budget-friendly smartwatch offering a 1.3-inch display, SpO2 monitoring, heart rate tracking, and multiple sports modes. With up to 10 days of battery life, smart notifications, and IP68 water resistance, it delivers a feature-packed experience at an affordable price.',2299.00,25,'2024-10-07 10:58:53.593453','2024-10-07 10:58:53.594449',8,'Noise',0,'products/w7.jpg'),(69,'Noise Plus Go Buzz','The Noise Plus Go Buzz offers a sleek design with a 1.4-inch display, Bluetooth calling, and comprehensive fitness tracking. It includes heart rate and SpO2 monitoring, sleep tracking, and multiple workout modes, making it perfect for those who want style and functionality in one package.',2499.00,20,'2024-10-07 10:59:47.063634','2024-10-07 10:59:47.064639',8,'Noise',0,'products/w8.jpg'),(70,'Acnos Men\'s Smartwatch','The Acnos Men\'s Smartwatch combines style and functionality with a classic round design, featuring heart rate monitoring, sleep tracking, and fitness tracking. It offers essential smart features such as notifications, reminders, and weather updates, making it a great everyday watch.',1999.00,22,'2024-10-07 11:00:34.949528','2024-10-07 11:00:34.949528',8,'Acnos',0,'products/w9.jpg'),(71,'Fire Bolt Ninja 51.05mm','The Fire Bolt Ninja 51.05mm is a robust smartwatch with a large 51.05mm display, SpO2 monitoring, and heart rate tracking. With multiple sport modes, smart notifications, and a rugged design, it\'s designed for fitness enthusiasts and adventure seekers.',3299.00,30,'2024-10-07 11:01:30.681987','2024-10-07 11:01:30.681987',8,'Fire Bolt',0,'products/w10.jpg'),(72,'Cultsport Ace X 1.96\" AMOLED','The Cultsport Ace X features a stunning 1.96-inch AMOLED display for vibrant visuals and Always-On display. It includes advanced health tracking features, such as heart rate, SpO2, and sleep monitoring, as well as Bluetooth calling and multiple sports modes. The sleek and modern design makes it a versatile option for daily wear.',4499.00,30,'2024-10-07 11:02:31.471487','2024-10-07 11:02:31.471487',8,'Cultsport',1,'products/w11.jpg'),(73,'Hammer Conquer 2.02\" AMOLED','The Hammer Conquer 2.02\" AMOLED offers a large 2.02-inch display with vibrant AMOLED technology. It features Bluetooth calling, heart rate monitoring, SpO2 tracking, and multiple workout modes. Designed with a premium metal frame and long battery life, it\'s perfect for users seeking both performance and style.',5499.00,30,'2024-10-07 11:03:19.965619','2024-10-07 11:03:19.965619',8,'Hammer',1,'products/w12.jpg'),(74,'samsung s23','this is a product from samsung company',100000.00,1000,'2024-10-14 10:06:43.418603','2024-10-14 10:06:43.418603',4,'samsung',1,'products/redmi_10i.png'),(75,'Redmi 10i','redmii 10 i dummy phone',20000.00,10,'2024-10-14 10:57:58.123639','2024-10-21 06:40:46.949258',4,'redmii',1,'products/OIP_mcpYDSA.jpg'),(85,'Redmi 10i lite x','dfafsdas',20000.00,20,'2024-10-24 06:47:33.055525','2024-10-24 06:47:33.055525',5,'redmii',0,'products/OIP_zRUnBx5.jpg');
/*!40000 ALTER TABLE `api_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_user`
--

DROP TABLE IF EXISTS `api_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(254) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `profile_image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_user`
--

LOCK TABLES `api_user` WRITE;
/*!40000 ALTER TABLE `api_user` DISABLE KEYS */;
INSERT INTO `api_user` VALUES (1,'testuser','test@example.com','pbkdf2_sha256$870000$rsVi4ESxQqjNbq6vHRlBas$whDPjF/x+siXvmI4m6K55qUggJq1h65XpaYtXh3Usy8=',0,'2024-09-24 12:13:29.983952','2024-09-24 12:13:30.032044',NULL),(2,'Hrushikesh','Hrushi@example.com','pbkdf2_sha256$870000$j8H89htbuq0AKzpsJXrjOH$68to+eES0YhvujYunseqMW1XpqAnjNFr9OvkKsRZhOo=',1,'2024-09-25 08:56:45.163542','2024-09-26 05:02:12.469706','profile_images/OIP_Z1HjCMf.jpg'),(3,'anupam','anupam@example.com','pbkdf2_sha256$870000$viwBdSkWtA8aw8udCp0455$8HQgrUXp+DIYxy016JB0zUv2E7iRUYGnKe9lcMm8768=',0,'2024-09-25 12:09:56.076213','2024-09-25 12:09:56.076213',''),(4,'new_user','newHrushi@gmail.com','pbkdf2_sha256$870000$m9GbvIkOs9NXD5JA0ZEgEY$yodPzVFrwRIi9SHskuNLQZo+yjJCrzcYVeGEoh4yY/w=',0,'2024-09-26 13:56:29.131566','2024-09-26 13:56:29.131566',''),(5,'holla','holla@holla.com','pbkdf2_sha256$870000$JQTX1tvjx7GK6epbJ4T2fp$PfX+VNjDr67uVoOkQzb2K1JkNN7+lQnZSli1bOoAN40=',1,'2024-09-29 10:00:56.107607','2024-09-29 10:00:56.107607',''),(6,'sharad','sharad@sharad.com','pbkdf2_sha256$870000$jMTgiwgpQ8bs1PA7mZufRN$oXAm0MsK9PTad69gUnmBNGDs3Or4xWK3FKowh/ZNWBs=',0,'2024-10-03 04:29:10.348231','2024-10-03 04:29:10.348231',''),(7,'cart_user','cart@example.com','pbkdf2_sha256$870000$2uQ5xo3FcDaA6Yx4K9Y0zf$bUzL6SUFdSRw3huzpovtzs3X9DF7SsPsujTV60ADUuE=',0,'2024-10-04 06:23:40.529521','2024-10-24 12:51:00.895160','profile_images/OIP_7VRhaah.jpg'),(8,'new_user','new@example.com','pbkdf2_sha256$870000$GRJ2LnH1jRdUSjrCPWNIET$bVsW64ZKRimLJo83QKQYQpj3od20P6tclxLwWRuHIBk=',1,'2024-10-09 05:13:40.011758','2024-10-17 09:03:17.981369','profile_images/OIP_wKuGfuU.jpg'),(9,'hrushikesh','hrushi@gmail.com','pbkdf2_sha256$870000$NxGaOaRT6qb9E4h4CWxWdc$3SCL/DniMU2plidXrr3bhuSsRrx39r1myd8BSdabQxg=',0,'2024-10-09 06:36:46.967310','2024-10-09 06:36:46.967310',''),(10,'second_cart','secondcart@example.com','pbkdf2_sha256$870000$pizuXf7SANr6fl9hH7jFBp$V2gkFYhOZYk0YrbhqqJ30U21J2Lbu+D2e0wwDxxGf8o=',0,'2024-10-21 08:31:44.568160','2024-10-21 08:31:44.568160',''),(11,'last_user','last@example.com','pbkdf2_sha256$870000$OtRDiWacc9zlB6ZfdHF2d1$dgQakOJLGJWIFkeDW6Nv//i9NIV0kkSPP6FRBPnufdQ=',0,'2024-10-25 05:18:06.622217','2024-10-25 05:18:06.622217','');
/*!40000 ALTER TABLE `api_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add user',7,'add_user'),(26,'Can change user',7,'change_user'),(27,'Can delete user',7,'delete_user'),(28,'Can view user',7,'view_user'),(29,'Can add product',8,'add_product'),(30,'Can change product',8,'change_product'),(31,'Can delete product',8,'delete_product'),(32,'Can view product',8,'view_product'),(33,'Can add category',9,'add_category'),(34,'Can change category',9,'change_category'),(35,'Can delete category',9,'delete_category'),(36,'Can view category',9,'view_category'),(37,'Can add order',10,'add_order'),(38,'Can change order',10,'change_order'),(39,'Can delete order',10,'delete_order'),(40,'Can view order',10,'view_order'),(41,'Can add order item',11,'add_orderitem'),(42,'Can change order item',11,'change_orderitem'),(43,'Can delete order item',11,'delete_orderitem'),(44,'Can view order item',11,'view_orderitem'),(45,'Can add cart',12,'add_cart'),(46,'Can change cart',12,'change_cart'),(47,'Can delete cart',12,'delete_cart'),(48,'Can view cart',12,'view_cart'),(49,'Can add cart item',13,'add_cartitem'),(50,'Can change cart item',13,'change_cartitem'),(51,'Can delete cart item',13,'delete_cartitem'),(52,'Can view cart item',13,'view_cartitem'),(53,'Can add payment',14,'add_payment'),(54,'Can change payment',14,'change_payment'),(55,'Can delete payment',14,'delete_payment'),(56,'Can view payment',14,'view_payment'),(57,'Can add blacklisted token',15,'add_blacklistedtoken'),(58,'Can change blacklisted token',15,'change_blacklistedtoken'),(59,'Can delete blacklisted token',15,'delete_blacklistedtoken'),(60,'Can view blacklisted token',15,'view_blacklistedtoken'),(61,'Can add outstanding token',16,'add_outstandingtoken'),(62,'Can change outstanding token',16,'change_outstandingtoken'),(63,'Can delete outstanding token',16,'delete_outstandingtoken'),(64,'Can view outstanding token',16,'view_outstandingtoken');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(12,'api','cart'),(13,'api','cartitem'),(9,'api','category'),(10,'api','order'),(11,'api','orderitem'),(14,'api','payment'),(8,'api','product'),(7,'api','user'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session'),(15,'token_blacklist','blacklistedtoken'),(16,'token_blacklist','outstandingtoken');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-09-19 11:00:03.129892'),(2,'auth','0001_initial','2024-09-19 11:00:05.126712'),(3,'admin','0001_initial','2024-09-19 11:00:05.859802'),(4,'admin','0002_logentry_remove_auto_add','2024-09-19 11:00:05.872800'),(5,'admin','0003_logentry_add_action_flag_choices','2024-09-19 11:00:05.887791'),(6,'contenttypes','0002_remove_content_type_name','2024-09-19 11:00:06.098662'),(7,'auth','0002_alter_permission_name_max_length','2024-09-19 11:00:06.265406'),(8,'auth','0003_alter_user_email_max_length','2024-09-19 11:00:06.476179'),(9,'auth','0004_alter_user_username_opts','2024-09-19 11:00:06.491200'),(10,'auth','0005_alter_user_last_login_null','2024-09-19 11:00:06.659492'),(11,'auth','0006_require_contenttypes_0002','2024-09-19 11:00:06.667491'),(12,'auth','0007_alter_validators_add_error_messages','2024-09-19 11:00:06.679512'),(13,'auth','0008_alter_user_username_max_length','2024-09-19 11:00:07.086582'),(14,'auth','0009_alter_user_last_name_max_length','2024-09-19 11:00:07.256895'),(15,'auth','0010_alter_group_name_max_length','2024-09-19 11:00:07.289441'),(16,'auth','0011_update_proxy_permissions','2024-09-19 11:00:07.307447'),(17,'auth','0012_alter_user_first_name_max_length','2024-09-19 11:00:07.611923'),(18,'sessions','0001_initial','2024-09-19 11:00:07.711591'),(19,'api','0001_initial','2024-09-19 11:05:47.230652'),(20,'api','0002_product_brand_product_featured','2024-09-25 06:24:05.046631'),(21,'api','0003_product_image_alter_product_brand_and_more','2024-09-25 11:22:01.710796'),(22,'api','0004_user_profile_image','2024-09-25 12:09:46.962604'),(23,'token_blacklist','0001_initial','2024-09-26 04:51:13.955501'),(24,'token_blacklist','0002_outstandingtoken_jti_hex','2024-09-26 04:51:14.087800'),(25,'token_blacklist','0003_auto_20171017_2007','2024-09-26 04:51:14.122358'),(26,'token_blacklist','0004_auto_20171017_2013','2024-09-26 04:51:14.573124'),(27,'token_blacklist','0005_remove_outstandingtoken_jti','2024-09-26 04:51:14.891319'),(28,'token_blacklist','0006_auto_20171017_2113','2024-09-26 04:51:14.988039'),(29,'token_blacklist','0007_auto_20171017_2214','2024-09-26 04:51:16.117181'),(30,'token_blacklist','0008_migrate_to_bigautofield','2024-09-26 04:51:17.531762'),(31,'token_blacklist','0010_fix_migrate_to_bigautofield','2024-09-26 04:51:17.562326'),(32,'token_blacklist','0011_linearizes_history','2024-09-26 04:51:17.593878'),(33,'token_blacklist','0012_alter_outstandingtoken_user','2024-09-26 04:51:17.625489'),(34,'api','0005_remove_order_payment_status_order_payment_and_more','2024-10-07 06:58:46.213588'),(35,'api','0006_remove_payment_order_payment_amount_and_more','2024-10-07 09:02:10.313310'),(36,'api','0002_remove_payment_order','2024-10-07 10:23:35.753088'),(37,'api','0003_alter_orderitem_order','2024-10-08 12:37:31.893257');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_blacklist_blacklistedtoken`
--

DROP TABLE IF EXISTS `token_blacklist_blacklistedtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_blacklist_blacklistedtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `blacklisted_at` datetime(6) NOT NULL,
  `token_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_id` (`token_id`),
  CONSTRAINT `token_blacklist_blacklistedtoken_token_id_3cc7fe56_fk` FOREIGN KEY (`token_id`) REFERENCES `token_blacklist_outstandingtoken` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_blacklist_blacklistedtoken`
--

LOCK TABLES `token_blacklist_blacklistedtoken` WRITE;
/*!40000 ALTER TABLE `token_blacklist_blacklistedtoken` DISABLE KEYS */;
INSERT INTO `token_blacklist_blacklistedtoken` VALUES (1,'2024-09-26 05:01:45.385176',1),(2,'2024-10-16 19:19:28.420947',2),(3,'2024-10-17 09:10:38.535297',3);
/*!40000 ALTER TABLE `token_blacklist_blacklistedtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_blacklist_outstandingtoken`
--

DROP TABLE IF EXISTS `token_blacklist_outstandingtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_blacklist_outstandingtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` longtext NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) NOT NULL,
  `user_id` int DEFAULT NULL,
  `jti` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq` (`jti`),
  KEY `token_blacklist_outs_user_id_83bc629a_fk_auth_user` (`user_id`),
  CONSTRAINT `token_blacklist_outs_user_id_83bc629a_fk_auth_user` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_blacklist_outstandingtoken`
--

LOCK TABLES `token_blacklist_outstandingtoken` WRITE;
/*!40000 ALTER TABLE `token_blacklist_outstandingtoken` DISABLE KEYS */;
INSERT INTO `token_blacklist_outstandingtoken` VALUES (1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNzQxMzMwNSwiaWF0IjoxNzI3MzI2OTA1LCJqdGkiOiI1NWE5YjRmYjc5MGU0YjM3YjM4YmI5NjZlNjNkYWE4MyJ9.8NkaK2KbLN784dia_l7HZwCy_Mi3cuoiG3ZikVM2sco',NULL,'2024-09-27 05:01:45.000000',NULL,'55a9b4fb790e4b37b38bb966e63daa83'),(2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyOTE5Mjc2OCwiaWF0IjoxNzI5MTA2MzY4LCJqdGkiOiJhMzFmMmJkNzA4YWU0ZWE3YTRhZDg0MTZkYWUwZGI3YyJ9.m-oC6B5W3fXoxWgq7WJ9FaX9pvY4K4bh-yjMuD6iI4o',NULL,'2024-10-17 19:19:28.000000',NULL,'a31f2bd708ae4ea7a4ad8416dae0db7c'),(3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyOTI0MjYzOCwiaWF0IjoxNzI5MTU2MjM4LCJqdGkiOiI5YjlkMjhlYjE0ZTI0ODJhYWQxNGU3ZDliYzJjMDNkZSJ9.1Nb-qqH0x_8U7ik3UsUtCR0DyG1RVraP7xXuW6JiCfU',NULL,'2024-10-18 09:10:38.000000',NULL,'9b9d28eb14e2482aad14e7d9bc2c03de');
/*!40000 ALTER TABLE `token_blacklist_outstandingtoken` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-26  9:51:23
