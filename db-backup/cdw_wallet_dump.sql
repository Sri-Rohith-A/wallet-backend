-- MySQL dump 10.13  Distrib 8.0.33, for macos13 (arm64)
--
-- Host: localhost    Database: cdw_wallet
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `business_units`
--

DROP TABLE IF EXISTS `business_units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `business_units` (
  `business_unit_id` int NOT NULL AUTO_INCREMENT,
  `business_unit_code` varchar(5) NOT NULL,
  `business_unit_name` varchar(20) NOT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`business_unit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business_units`
--

LOCK TABLES `business_units` WRITE;
/*!40000 ALTER TABLE `business_units` DISABLE KEYS */;
INSERT INTO `business_units` VALUES (1,'dv','digital velocity','2023-04-27 12:34:18'),(2,'ds','digital security','2023-04-27 12:34:18'),(3,'cs','cloud services','2023-04-27 12:34:18');
/*!40000 ALTER TABLE `business_units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cash`
--

DROP TABLE IF EXISTS `cash`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cash` (
  `employee_id` int NOT NULL,
  `cash_type_id` int NOT NULL,
  `cash_amount` double NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `carryover_cash` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`employee_id`,`cash_type_id`),
  KEY `cash_type_id` (`cash_type_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `cash_ibfk_1` FOREIGN KEY (`cash_type_id`) REFERENCES `cash_type` (`cash_type_id`),
  CONSTRAINT `cash_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `users` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cash`
--

LOCK TABLES `cash` WRITE;
/*!40000 ALTER TABLE `cash` DISABLE KEYS */;
INSERT INTO `cash` VALUES (1001,1,400,'2023-05-01 01:00:00','2023-05-31 23:59:59','2023-05-04 14:16:30',30),(2001,1,400,'2023-05-01 01:00:00','2023-05-31 23:59:59','2023-05-04 14:16:30',30),(2001,4,100,'2023-05-28 01:00:00','2023-05-31 23:59:59','2023-05-04 13:11:49',0),(2002,1,400,'2023-05-01 01:00:00','2023-05-31 23:59:59','2023-05-04 14:16:30',30),(2002,5,50,'2023-05-28 01:00:00','2023-05-31 23:59:59','2023-05-04 13:12:23',0),(2003,1,400,'2023-05-01 01:00:00','2023-05-31 23:59:59','2023-05-04 14:16:30',30),(2004,1,400,'2023-05-01 01:00:00','2023-05-31 23:59:59','2023-05-04 14:16:30',30),(2004,4,100,'2023-05-28 01:00:00','2023-05-31 23:59:59','2023-05-04 13:11:54',0),(2005,1,400,'2023-05-01 01:00:00','2023-05-31 23:59:59','2023-05-04 14:16:30',30),(2005,5,50,'2023-05-28 01:00:00','2023-05-31 23:59:59','2023-05-04 13:12:29',0),(2006,1,400,'2023-05-01 01:00:00','2023-05-31 23:59:59','2023-05-04 14:16:30',30),(2006,2,1000,'2023-01-01 01:00:00','2023-10-31 23:59:59','2023-05-04 13:11:21',0),(2007,1,400,'2023-05-01 01:00:00','2023-05-31 23:59:59','2023-05-04 14:16:30',30),(2007,4,100,'2023-05-28 01:00:00','2023-05-31 23:59:59','2023-05-04 13:11:57',0),(2008,1,400,'2023-05-01 01:00:00','2023-05-31 23:59:59','2023-05-04 14:16:30',30),(2008,2,1000,'2023-01-01 01:00:00','2023-10-31 23:59:59','2023-05-04 13:11:28',0);
/*!40000 ALTER TABLE `cash` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cash_type`
--

DROP TABLE IF EXISTS `cash_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cash_type` (
  `cash_type_id` int NOT NULL AUTO_INCREMENT,
  `cash_name` varchar(20) NOT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `event_id` int DEFAULT NULL,
  PRIMARY KEY (`cash_type_id`),
  UNIQUE KEY `cash_unique` (`cash_type_id`,`event_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `cash_type_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cash_type`
--

LOCK TABLES `cash_type` WRITE;
/*!40000 ALTER TABLE `cash_type` DISABLE KEYS */;
INSERT INTO `cash_type` VALUES (1,'cdw','2023-04-26 10:15:36',NULL),(2,'maternity','2023-04-26 10:15:58',NULL),(3,'carryover','2023-05-03 16:46:58',NULL),(4,'event','2023-05-03 16:47:03',1),(5,'event','2023-05-03 16:47:08',2);
/*!40000 ALTER TABLE `cash_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configs`
--

DROP TABLE IF EXISTS `configs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configs` (
  `config_id` int NOT NULL AUTO_INCREMENT,
  `location_id` int NOT NULL,
  `cash_type_id` int NOT NULL,
  `default_amount` int NOT NULL,
  `default_carryover_days` int NOT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` int NOT NULL,
  PRIMARY KEY (`config_id`),
  KEY `cash_type_id` (`cash_type_id`),
  KEY `location_id` (`location_id`),
  KEY `modified_by` (`modified_by`),
  CONSTRAINT `configs_ibfk_1` FOREIGN KEY (`cash_type_id`) REFERENCES `cash_type` (`cash_type_id`),
  CONSTRAINT `configs_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `locations` (`location_id`),
  CONSTRAINT `configs_ibfk_3` FOREIGN KEY (`modified_by`) REFERENCES `users` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configs`
--

LOCK TABLES `configs` WRITE;
/*!40000 ALTER TABLE `configs` DISABLE KEYS */;
INSERT INTO `configs` VALUES (1,1,1,413,7,'2023-04-26 10:16:28',1001),(2,2,1,413,7,'2023-04-26 10:16:48',1001),(3,3,1,413,7,'2023-04-26 10:17:07',1001),(4,1,2,1000,0,'2023-04-26 10:18:21',1001),(5,2,2,1000,0,'2023-04-26 10:18:34',1001),(6,3,2,1000,0,'2023-04-26 10:18:46',1001);
/*!40000 ALTER TABLE `configs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `dashboard`
--

DROP TABLE IF EXISTS `dashboard`;
/*!50001 DROP VIEW IF EXISTS `dashboard`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `dashboard` AS SELECT 
 1 AS `employee_id`,
 1 AS `vendor_id`,
 1 AS `transaction_date`,
 1 AS `item_type`,
 1 AS `items_cost`,
 1 AS `location_name`,
 1 AS `business_unit_name`,
 1 AS `cash_type_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `modified_by` int NOT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `modified_by` (`modified_by`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`modified_by`) REFERENCES `users` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Code & Gears 2023','upcoming','2023-04-27 01:00:00','2023-04-30 01:00:00',1001,'2023-05-03 12:44:43','2023-05-03 00:00:00'),(2,'Annual Party 2023','started','2023-05-27 01:00:00','2023-05-30 01:00:00',1001,'2023-05-03 12:44:43','2023-05-03 00:00:00');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `vendor_id` int NOT NULL,
  `item_name` varchar(30) NOT NULL,
  `item_price` double NOT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `item_type` tinyint(1) NOT NULL,
  PRIMARY KEY (`item_id`),
  KEY `vendor_id` (`vendor_id`),
  CONSTRAINT `items_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,1,'Biscuit',20,'2023-05-03 14:54:26',1),(2,2,'Biscuit',10,'2023-05-03 14:54:26',1),(3,3,'Biscuit',15,'2023-05-03 14:54:26',1),(4,1,'Lays',20,'2023-05-03 14:54:26',1),(5,2,'Lays',10,'2023-05-03 14:54:26',1),(6,3,'Lays',15,'2023-05-03 14:54:26',1),(7,1,'lemon juice',30,'2023-05-03 14:55:27',0);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `location_name` varchar(30) NOT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'Chennai','2023-04-25 19:50:19'),(2,'Hyderabad','2023-04-26 10:25:43'),(3,'Bengaluru','2023-04-26 10:26:18');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_details`
--

DROP TABLE IF EXISTS `transaction_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_details` (
  `transaction_id` int NOT NULL,
  `item_id` int NOT NULL,
  `quantity` int NOT NULL,
  KEY `transaction_id` (`transaction_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `transaction_details_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`),
  CONSTRAINT `transaction_details_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`),
  CONSTRAINT `transaction_details_chk_1` CHECK ((`quantity` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_details`
--

LOCK TABLES `transaction_details` WRITE;
/*!40000 ALTER TABLE `transaction_details` DISABLE KEYS */;
INSERT INTO `transaction_details` VALUES (1,1,1),(1,4,1),(2,7,1),(3,2,1),(3,5,1),(4,5,10),(5,3,6),(6,6,6),(7,7,3),(8,7,3);
/*!40000 ALTER TABLE `transaction_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `transaction_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sender_id` int NOT NULL,
  `receiver_id` int DEFAULT NULL,
  `vendor_id` int DEFAULT NULL,
  `location_id` int NOT NULL,
  `status` tinyint(1) NOT NULL,
  `amount` double NOT NULL,
  `cash_type_id` int NOT NULL,
  `transaction_type` varchar(15) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `sender_id` (`sender_id`),
  KEY `vendor_id` (`vendor_id`),
  KEY `receiver_id` (`receiver_id`),
  KEY `cash_type_id` (`cash_type_id`),
  KEY `location_id` (`location_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`employee_id`),
  CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_id`),
  CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`employee_id`),
  CONSTRAINT `transactions_ibfk_4` FOREIGN KEY (`cash_type_id`) REFERENCES `cash_type` (`cash_type_id`),
  CONSTRAINT `transactions_ibfk_5` FOREIGN KEY (`location_id`) REFERENCES `locations` (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,'2023-05-03 15:40:06',2002,NULL,1,1,1,40,1,'debit','Paid to vendor AB Vendor'),(2,'2023-05-03 15:40:21',2002,NULL,1,1,1,30,3,'debit','Paid to vendor AB Vendor'),(3,'2023-05-03 15:40:37',2003,NULL,2,2,1,20,4,'debit','Paid to vendor MN Vendor'),(4,'2023-04-15 00:00:00',2003,NULL,2,2,1,100,5,'debit','Paid to vendor MN Vendor'),(5,'2023-04-15 00:00:00',2005,NULL,3,3,1,90,1,'debit','Paid to vendor XY Vendor'),(6,'2023-04-15 00:00:00',2005,NULL,3,3,1,90,3,'debit','Paid to vendor XY Vendor'),(7,'2023-04-28 00:00:00',2006,NULL,1,1,1,90,2,'debit','Paid to vendor AB Vendor'),(8,'2023-04-28 00:00:00',2006,NULL,1,1,1,90,2,'debit','Paid to vendor AB Vendor'),(9,'2023-04-28 00:00:00',2003,NULL,2,2,0,20,4,'debit','Paid to vendor MN Vendor'),(10,'2023-05-03 15:42:51',1001,2002,NULL,1,1,400,1,'credit','CDW Cash Credited - May 2023'),(11,'2023-05-03 15:42:57',1001,2003,NULL,2,1,400,1,'credit','CDW Cash Credited - May 2023');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `employee_name` varchar(30) NOT NULL,
  `employee_email` varchar(30) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `contact_number` varchar(10) NOT NULL,
  `joined_date` datetime NOT NULL,
  `status` varchar(8) NOT NULL,
  `location_id` int NOT NULL,
  `business_unit_id` int NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `access_level` int NOT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`employee_id`),
  KEY `location_id` (`location_id`),
  KEY `business_id` (`business_unit_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `locations` (`location_id`),
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`business_unit_id`) REFERENCES `business_units` (`business_unit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2501 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1001,'sridhar','sridhar@cdw.com','male','9876543210','2023-01-01 00:00:00','active',1,1,'$2b$10$JvUJU/5XYcsEAyUDg.hjAeURAIqX0RKUczNPYZHQ/atrSXxBVfOFm',1,'2023-05-02 20:01:11'),(2001,'abdul','abdul@cdw.com','male','9078563412','2023-01-01 00:00:00','active',1,2,'$2b$10$JvUJU/5XYcsEAyUDg.hjAeURAIqX0RKUczNPYZHQ/atrSXxBVfOFm',0,'2023-05-03 15:45:47'),(2002,'sakthi','sakthi@cdw.com','male','9078562345','2023-05-01 00:00:00','active',1,3,'$2b$10$JvUJU/5XYcsEAyUDg.hjAeURAIqX0RKUczNPYZHQ/atrSXxBVfOFm',0,'2023-05-03 15:45:56'),(2003,'ram','ram@cdw.com','male','9078562345','2023-06-11 00:00:00','active',2,1,'$2b$10$JvUJU/5XYcsEAyUDg.hjAeURAIqX0RKUczNPYZHQ/atrSXxBVfOFm',0,'2023-05-02 20:01:51'),(2004,'srini','srini@cdw.com','male','9518442345','2023-01-06 00:00:00','active',2,2,'$2b$10$JvUJU/5XYcsEAyUDg.hjAeURAIqX0RKUczNPYZHQ/atrSXxBVfOFm',0,'2023-05-02 20:02:02'),(2005,'rubesh','rubesh@cdw.com','male','9518499945','2023-04-25 00:00:00','active',3,3,'$2b$10$JvUJU/5XYcsEAyUDg.hjAeURAIqX0RKUczNPYZHQ/atrSXxBVfOFm',0,'2023-05-03 15:45:56'),(2006,'shivani','shivani@cdw.com','female','9080706050','2023-01-01 00:00:00','active',1,1,'$2b$10$JvUJU/5XYcsEAyUDg.hjAeURAIqX0RKUczNPYZHQ/atrSXxBVfOFm',0,'2023-05-03 15:32:40'),(2007,'pavithra','pavithra@cdw.com','female','9876543456','2023-05-01 00:00:00','active',1,1,'$2b$10$JvUJU/5XYcsEAyUDg.hjAeURAIqX0RKUczNPYZHQ/atrSXxBVfOFm',0,'2023-05-04 13:09:06'),(2008,'anu','anu@cdw.com','female','9876543478','2023-05-01 00:00:00','active',1,1,'$2b$10$JvUJU/5XYcsEAyUDg.hjAeURAIqX0RKUczNPYZHQ/atrSXxBVfOFm',0,'2023-05-04 13:09:06'),(2500,'hari','hari@cdw.com','male','9080706050','2023-05-04 13:29:47','Active',1,1,'null',0,'2023-05-04 13:29:47');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendors` (
  `vendor_id` int NOT NULL AUTO_INCREMENT,
  `vendor_name` varchar(30) DEFAULT NULL,
  `location_id` int NOT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`vendor_id`),
  KEY `location_id` (`location_id`),
  CONSTRAINT `vendors_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `locations` (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` VALUES (1,'AB Vendor',1,'2023-04-27 15:27:41'),(2,'MN Vendor',2,'2023-04-27 15:27:53'),(3,'XY Vendor',3,'2023-04-27 15:27:59');
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `dashboard`
--

/*!50001 DROP VIEW IF EXISTS `dashboard`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `dashboard` AS select `u`.`employee_id` AS `employee_id`,`i`.`vendor_id` AS `vendor_id`,`t`.`transaction_date` AS `transaction_date`,`i`.`item_type` AS `item_type`,(`i`.`item_price` * `td`.`quantity`) AS `items_cost`,`l`.`location_name` AS `location_name`,`bu`.`business_unit_name` AS `business_unit_name`,`t`.`cash_type_id` AS `cash_type_id` from (((((`transactions` `t` join `locations` `l` on((`t`.`location_id` = `l`.`location_id`))) join `transaction_details` `td` on((`td`.`transaction_id` = `t`.`transaction_id`))) join `items` `i` on((`i`.`item_id` = `td`.`item_id`))) join `users` `u` on((`t`.`sender_id` = `u`.`employee_id`))) join `business_units` `bu` on((`bu`.`business_unit_id` = `u`.`business_unit_id`))) where (`t`.`status` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-04 14:28:39
