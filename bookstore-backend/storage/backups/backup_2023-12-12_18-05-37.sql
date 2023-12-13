-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: bookstore
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `age_restrictions`
--

DROP TABLE IF EXISTS `age_restrictions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `age_restrictions` (
  `age_restriction_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`age_restriction_id`),
  UNIQUE KEY `age_restrictions_name_unique` (`name`),
  FULLTEXT KEY `age_restrictions_name_fulltext` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `age_restrictions`
--

LOCK TABLES `age_restrictions` WRITE;
/*!40000 ALTER TABLE `age_restrictions` DISABLE KEYS */;
INSERT INTO `age_restrictions` VALUES (2,'adolescents'),(3,'all ages'),(1,'for adults');
/*!40000 ALTER TABLE `age_restrictions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_authors`
--

DROP TABLE IF EXISTS `book_authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_authors` (
  `book_author_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `book_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`book_author_id`),
  UNIQUE KEY `book_authors_book_id_user_id_unique` (`book_id`,`user_id`),
  KEY `book_authors_book_id_index` (`book_id`),
  KEY `book_authors_user_id_index` (`user_id`),
  CONSTRAINT `book_book_id` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE,
  CONSTRAINT `book_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_authors`
--

LOCK TABLES `book_authors` WRITE;
/*!40000 ALTER TABLE `book_authors` DISABLE KEYS */;
INSERT INTO `book_authors` VALUES (1,13,21,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(2,20,20,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(3,10,18,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(4,20,16,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(5,25,24,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(6,15,20,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(7,2,16,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(8,12,21,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(9,10,20,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(10,6,11,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(11,22,18,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(12,24,19,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(13,18,18,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(14,2,11,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(15,24,11,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(16,9,19,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(17,5,2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(18,13,19,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(19,7,24,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(20,16,21,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(22,23,16,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(23,15,2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(24,5,19,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(25,14,11,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(26,1,4,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(27,17,11,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(28,16,24,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(29,5,4,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(30,15,5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(31,15,19,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(32,26,16,'2023-12-09 15:31:39','2023-12-09 15:31:39'),(33,26,2,'2023-12-09 15:31:39','2023-12-09 15:31:39'),(34,27,2,'2023-12-11 14:54:10','2023-12-11 14:54:10'),(36,28,2,'2023-12-11 14:56:04','2023-12-11 14:56:04'),(38,29,2,'2023-12-11 14:57:06','2023-12-11 14:57:06'),(40,30,2,'2023-12-11 14:57:30','2023-12-11 14:57:30'),(41,30,16,'2023-12-11 14:57:30','2023-12-11 14:57:30'),(42,27,20,'2023-12-11 15:26:05','2023-12-11 15:26:05'),(43,31,2,'2023-12-11 15:29:27','2023-12-11 15:29:27'),(44,32,5,'2023-12-12 13:38:35','2023-12-12 13:38:35'),(45,32,4,'2023-12-12 13:38:35','2023-12-12 13:38:35'),(46,32,20,'2023-12-12 13:38:35','2023-12-12 13:38:35'),(47,32,16,'2023-12-12 13:38:35','2023-12-12 13:38:35'),(48,32,11,'2023-12-12 13:38:35','2023-12-12 13:38:35');
/*!40000 ALTER TABLE `book_authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `book_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `age_restriction_id` bigint unsigned NOT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `page_count` int NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publication_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`book_id`),
  KEY `books_age_restriction_id_index` (`age_restriction_id`),
  KEY `books_page_count_index` (`page_count`),
  KEY `books_publication_date_index` (`publication_date`),
  FULLTEXT KEY `books_title_description_fulltext` (`title`,`description`),
  CONSTRAINT `book_age_restriction_id` FOREIGN KEY (`age_restriction_id`) REFERENCES `age_restrictions` (`age_restriction_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,3,'Voluptates quia et quasi voluptatem sint.','Sed explicabo nobis ut quasi et. Aliquid aut nam deleniti sint minima earum autem. Eos in recusandae pariatur ab. Qui autem ullam quibusdam nesciunt.',842,'image_65746b400f87d.jpg','2019-09-23','2023-12-09 10:28:10','2023-12-09 10:28:10'),(2,3,'Quam pariatur ipsa ut.','Id accusantium omnis iste alias ut. Repellendus inventore quidem maxime et doloribus accusamus saepe. In quisquam est rem hic quia. Eos dolores unde voluptatibus sit sit sint.',861,'image_65746b41296df.jpg','1972-12-18','2023-12-09 10:28:10','2023-12-09 10:28:10'),(3,1,'Ut repellendus itaque ipsam voluptas.','Dolorem reprehenderit porro suscipit. Perferendis voluptatem quia quia qui quaerat tenetur. Aut quam consequatur eos odio sit.',453,'image_65746b440cc15.jpg','1976-03-18','2023-12-09 10:28:10','2023-12-09 10:28:10'),(4,2,'Suscipit quis et consequatur.','Dolores aut maiores tenetur et voluptatem. Eius quae ducimus temporibus eaque reprehenderit nihil. Quis libero id et iure qui excepturi asperiores.',984,'image_65746b45c3529.jpg','1985-05-13','2023-12-09 10:28:10','2023-12-09 10:28:10'),(5,1,'Officiis non voluptatem commodi doloribus voluptatem quisquam dolorem.','Commodi explicabo et non adipisci. Nemo vel veritatis quidem minus sint consequatur.',321,'image_65746b46df599.jpg','1994-02-02','2023-12-09 10:28:10','2023-12-09 10:28:10'),(6,1,'Sed ut.','Dolorum voluptatem voluptas ratione. Qui sunt voluptatem soluta temporibus qui. Aliquam ullam fugiat voluptatibus accusamus. Laborum aut aut vel sunt rerum voluptas.',964,'image_65746b496b916.jpg','2009-12-14','2023-12-09 10:28:10','2023-12-09 10:28:10'),(7,1,'Praesentium accusamus pariatur aut dolorem.','Et voluptates quam aut fugit assumenda. At laborum consequuntur aut rerum. Porro voluptas hic minima vero inventore. Velit ipsam quis neque facere qui.',904,'image_65746b4a7df09.jpg','1988-10-17','2023-12-09 10:28:10','2023-12-09 10:28:10'),(8,1,'Inventore hic iusto aperiam at dignissimos saepe.','Harum quo occaecati qui. Quas in officiis blanditiis et recusandae tempore tempore at. Deleniti dignissimos eum et deserunt corporis molestiae fugit. Voluptate numquam et ducimus ipsum.',782,'image_65746b4dab0f6.jpg','1985-09-02','2023-12-09 10:28:10','2023-12-09 10:28:10'),(9,3,'Nihil similique placeat asperiores.','Eligendi recusandae corporis nam sapiente eos corporis et. Omnis quia magni saepe porro. Voluptatibus sint ratione exercitationem aut. Aut quia id dolor harum iure est qui.',994,'image_65746b4fba62e.jpg','1981-10-03','2023-12-09 10:28:10','2023-12-09 10:28:10'),(10,2,'Doloribus nihil saepe voluptates est corrupti.','Et qui doloribus explicabo incidunt inventore impedit. Aut doloribus fugit officia doloremque illum et quis optio. Eum explicabo ut unde. Eligendi incidunt porro excepturi tempora dolores deleniti.',729,'image_65746b51ec6be.jpg','1974-12-31','2023-12-09 10:28:10','2023-12-09 10:28:10'),(11,2,'Iure rem ipsa.','Tenetur deserunt voluptatem eaque minus natus. Alias quae perspiciatis sit officiis. Est similique et ut sunt nostrum.',89,'image_65746b52c716e.jpg','2017-02-19','2023-12-09 10:28:10','2023-12-09 10:28:10'),(12,2,'Animi aperiam assumenda culpa qui voluptatem quae et et ab.','Corrupti nihil quam eos quod recusandae labore. Doloremque quia et velit non officiis impedit labore. Laudantium deleniti porro modi rerum. Sunt voluptatem voluptatem incidunt porro.',236,'image_65746b5471bcc.jpg','2019-11-28','2023-12-09 10:28:10','2023-12-09 10:28:10'),(13,3,'Quia rem quasi illo sunt.','Natus est odio at impedit. Inventore qui et fugit quasi.',1028,'image_65746b55be3f6.jpg','1970-11-13','2023-12-09 10:28:10','2023-12-09 10:28:10'),(14,1,'Sit facilis totam.','Reiciendis aut voluptate molestiae saepe dignissimos nihil. Aliquid ducimus dolores repellat doloremque quis enim. Quia sint commodi ab et odit. Assumenda repudiandae tempora ut minus ut unde.',191,'image_65746b574fd89.jpg','1983-04-09','2023-12-09 10:28:10','2023-12-09 10:28:10'),(15,1,'Soluta sapiente eum assumenda ut qui.','Commodi provident tempora doloribus quia et. Commodi consequatur voluptate aut sequi molestias esse ipsam. Id totam commodi ut et et. Eveniet architecto perspiciatis optio dolores asperiores recusandae.',398,'image_65746b5997653.jpg','1975-04-06','2023-12-09 10:28:10','2023-12-09 10:28:10'),(16,1,'Facere placeat ut.','Dolores ut accusantium hic in. Nulla et nihil occaecati nobis adipisci ut rerum. Quia eius ullam at ut cumque omnis.',303,'image_65746b5a95336.jpg','2004-09-10','2023-12-09 10:28:10','2023-12-09 10:28:10'),(17,3,'Eligendi quo commodi nostrum.','Beatae et unde eveniet. Laboriosam autem voluptatem sed omnis iusto. Praesentium consequatur totam dolores eos aut eos. Et nobis eos perferendis odit id sed et.',990,'image_65746b5c80965.jpg','1981-01-10','2023-12-09 10:28:10','2023-12-09 10:28:10'),(18,2,'Repellendus.','Quia quisquam quam rerum aspernatur deleniti sed velit. Eos non distinctio rerum aut asperiores sint eos voluptate. Aperiam et nostrum suscipit doloribus impedit. Quidem nisi autem adipisci ut consequatur qui earum.',225,'image_65746b5e8370e.jpg','1999-01-05','2023-12-09 10:28:10','2023-12-09 10:28:10'),(19,3,'Ea voluptatum saepe et.','Eaque asperiores sint nihil quasi. Soluta nesciunt voluptatem in et error cupiditate et. Aperiam quia nostrum omnis pariatur. Unde nam et excepturi earum.',206,'image_65746b609f6ef.jpg','1984-01-10','2023-12-09 10:28:10','2023-12-09 10:28:10'),(20,2,'Et doloribus.','Rerum qui asperiores corporis sed consequatur. Dolorem quis aut eligendi explicabo. Tempore nostrum occaecati quasi dolorum nobis.',34,'image_65746b62ae210.jpg','1977-12-05','2023-12-09 10:28:10','2023-12-09 10:28:10'),(21,3,'Distinctio rerum.','Quod tempora doloremque fuga itaque ad. Nulla iste ab ratione cum facilis aut est.',990,'image_65746b6578103.jpg','1998-10-08','2023-12-09 10:28:10','2023-12-09 10:28:10'),(22,3,'Explicabo explicabo ipsam consequatur consectetur sed.','Rerum voluptatum et perferendis sequi dolorem. Vitae veniam nemo ad similique ullam qui laboriosam aperiam. Quos eaque ratione dolores quidem inventore ab dolorem exercitationem. Assumenda corporis ut suscipit consequatur alias quasi.',286,'image_65746b6701f62.jpg','1989-01-22','2023-12-09 10:28:10','2023-12-09 10:28:10'),(23,1,'Odit natus corporis dignissimos quam voluptas officia.','Vel eum expedita autem ut molestias temporibus amet. Id unde vitae dicta reprehenderit qui deleniti fugit non. Facere error dolorem fugiat dolor inventore temporibus. Unde iure aut voluptate.',636,'image_65746b681c636.jpg','2022-04-24','2023-12-09 10:28:10','2023-12-09 10:28:10'),(24,2,'Voluptas sit eum accusamus temporibus et rerum et.','Minima tempore consequatur recusandae eius vel occaecati at. Eligendi exercitationem consequatur rem quaerat. Ut eos quia et vero molestiae. Dolorum pariatur modi aliquam et velit. Qui cum eum quos recusandae atque similique est.',999,'image_65746b693a0d8.jpg','2014-11-13','2023-12-09 10:28:10','2023-12-09 10:28:10'),(25,3,'Quia velit est sint ea illum voluptatem.','Neque ut qui aut iure quas quasi quia. Quae numquam adipisci facere dicta fuga. Quia soluta repellat illum minus ducimus in et.',783,'image_65746b6a54332.jpg','2011-12-10','2023-12-09 10:28:10','2023-12-09 10:28:10'),(26,2,'Book','dwdwdddwdwd',3,'image_65775408ee8f8.jpg','2023-11-18','2023-12-09 15:31:39','2023-12-11 15:25:12'),(27,3,'Book','dwdwdddwdwd',1410,'image_6577547141173.jpg','2023-12-10','2023-12-11 14:54:10','2023-12-11 15:26:57'),(28,2,'Book','dwdwdddwdwd',3,'image_657754a84a59b.jfif','2023-12-07','2023-12-11 14:56:04','2023-12-11 15:27:52'),(29,2,'Book','dwdwdddwdwd',3,'image_657754b7c3960.png','2023-12-07','2023-12-11 14:57:06','2023-12-11 15:28:07'),(30,2,'dwdwdd1','dwdwdddwdwd',3,'image_65774d8a511f3.','2023-12-08','2023-12-11 14:57:30','2023-12-11 14:57:30'),(31,1,'111','1111111111',20000,'image_65775507a4ade.png','2023-12-11','2023-12-11 15:29:27','2023-12-11 15:29:27'),(32,3,'cwsfwdwd','wdwdwddwdwd',12529,'image_65788c8b298cf.jpg','2013-12-31','2023-12-12 13:38:35','2023-12-12 13:38:35');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checks`
--

DROP TABLE IF EXISTS `checks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checks` (
  `check_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `book_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `price` double unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `date` date NOT NULL DEFAULT '2023-12-09',
  PRIMARY KEY (`check_id`),
  KEY `checks_book_id_index` (`book_id`),
  KEY `checks_user_id_index` (`user_id`),
  CONSTRAINT `check_book_id` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE,
  CONSTRAINT `check_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checks`
--

LOCK TABLES `checks` WRITE;
/*!40000 ALTER TABLE `checks` DISABLE KEYS */;
INSERT INTO `checks` VALUES (1,19,21,475.99,'2023-12-09 10:28:56','2023-12-09 10:28:56','2013-01-30'),(2,17,8,512.4,'2023-12-09 10:28:56','2023-12-09 10:28:56','2015-10-29'),(3,1,8,867.67,'2023-12-09 10:28:56','2023-12-09 10:28:56','2011-07-12'),(4,8,2,99.29,'2023-12-09 10:28:56','2023-12-09 10:28:56','2003-12-14'),(5,2,7,378.77,'2023-12-09 10:28:56','2023-12-09 10:28:56','2013-07-22'),(6,11,1,114.88,'2023-12-09 10:28:56','2023-12-09 10:28:56','2007-08-24'),(7,23,24,598.37,'2023-12-09 10:28:56','2023-12-09 10:28:56','2007-10-31'),(8,10,15,430.66,'2023-12-09 10:28:56','2023-12-09 10:28:56','2009-08-26'),(9,22,16,185.44,'2023-12-09 10:28:56','2023-12-09 10:28:56','2015-11-22'),(10,7,1,48.51,'2023-12-09 10:28:56','2023-12-09 10:28:56','2011-11-27'),(11,13,1,866.09,'2023-12-09 10:28:56','2023-12-09 10:28:56','2007-11-18'),(12,1,3,461.05,'2023-12-09 10:28:56','2023-12-09 10:28:56','2013-03-08'),(13,25,6,94.07,'2023-12-09 10:28:56','2023-12-09 10:28:56','2023-02-10'),(14,16,15,527.51,'2023-12-09 10:28:56','2023-12-09 10:28:56','2014-06-25'),(15,16,2,311.19,'2023-12-09 10:28:56','2023-12-09 10:28:56','2005-12-05'),(16,1,8,429.22,'2023-12-09 10:28:56','2023-12-09 10:28:56','2021-12-12'),(17,23,4,231.75,'2023-12-09 10:28:56','2023-12-09 10:28:56','2008-03-16'),(18,18,10,309.16,'2023-12-09 10:28:56','2023-12-09 10:28:56','2015-05-24'),(19,13,16,578.9,'2023-12-09 10:28:56','2023-12-09 10:28:56','2006-08-08'),(20,8,2,413.4,'2023-12-09 10:28:56','2023-12-09 10:28:56','2017-01-24'),(21,11,15,575.64,'2023-12-09 10:28:56','2023-12-09 10:28:56','2005-07-26'),(22,18,25,799.23,'2023-12-09 10:28:56','2023-12-09 10:28:56','2005-04-16'),(23,15,19,259.4,'2023-12-09 10:28:56','2023-12-09 10:28:56','2018-08-04'),(24,7,12,980.01,'2023-12-09 10:28:56','2023-12-09 10:28:56','2017-06-26'),(25,6,24,312.23,'2023-12-09 10:28:56','2023-12-09 10:28:56','2016-01-24'),(26,17,17,198.88,'2023-12-09 10:28:56','2023-12-09 10:28:56','2004-02-06'),(27,9,23,323.6,'2023-12-09 10:28:56','2023-12-09 10:28:56','2018-01-26'),(28,24,16,439.3,'2023-12-09 10:28:56','2023-12-09 10:28:56','2021-04-15'),(29,12,13,807.82,'2023-12-09 10:28:56','2023-12-09 10:28:56','2019-05-11'),(30,18,19,243.39,'2023-12-09 10:28:56','2023-12-09 10:28:56','2015-08-14'),(31,15,19,630.45,'2023-12-09 10:28:56','2023-12-09 10:28:56','2017-08-19'),(32,24,12,957.2,'2023-12-09 10:28:56','2023-12-09 10:28:56','2018-04-29'),(33,21,15,457.48,'2023-12-09 10:28:56','2023-12-09 10:28:56','2008-08-10'),(34,5,25,950.32,'2023-12-09 10:28:56','2023-12-09 10:28:56','2010-10-02'),(35,3,9,118.8,'2023-12-09 10:28:56','2023-12-09 10:28:56','2011-08-07'),(36,13,9,104.83,'2023-12-09 10:28:56','2023-12-09 10:28:56','2022-03-29'),(37,18,22,894.43,'2023-12-09 10:28:56','2023-12-09 10:28:56','2022-11-26'),(38,15,23,852.1,'2023-12-09 10:28:56','2023-12-09 10:28:56','2014-08-29'),(39,21,3,692.33,'2023-12-09 10:28:56','2023-12-09 10:28:56','2009-07-31'),(40,18,4,597.92,'2023-12-09 10:28:56','2023-12-09 10:28:56','2007-09-04'),(41,16,17,276.79,'2023-12-09 10:28:56','2023-12-09 10:28:56','2021-12-02'),(42,10,21,982.53,'2023-12-09 10:28:56','2023-12-09 10:28:56','2008-12-22'),(43,17,18,36.05,'2023-12-09 10:28:56','2023-12-09 10:28:56','2007-01-02'),(44,5,9,681.78,'2023-12-09 10:28:56','2023-12-09 10:28:56','2012-10-01'),(45,18,4,137.08,'2023-12-09 10:28:56','2023-12-09 10:28:56','2020-05-03'),(46,15,13,601.3,'2023-12-09 10:28:56','2023-12-09 10:28:56','2022-08-16'),(47,19,11,62.28,'2023-12-09 10:28:56','2023-12-09 10:28:56','2023-10-28'),(48,9,7,989.11,'2023-12-09 10:28:56','2023-12-09 10:28:56','2004-08-13'),(49,10,14,759.04,'2023-12-09 10:28:56','2023-12-09 10:28:56','2019-12-17'),(50,17,24,783.7,'2023-12-09 10:28:56','2023-12-09 10:28:56','2018-07-27'),(51,12,24,443.45,'2023-12-09 10:28:56','2023-12-09 10:28:56','2009-08-12'),(52,14,18,889.29,'2023-12-09 10:28:56','2023-12-09 10:28:56','2016-05-09'),(53,19,2,630.07,'2023-12-09 10:28:56','2023-12-09 10:28:56','2005-10-19'),(54,7,11,594.09,'2023-12-09 10:28:56','2023-12-09 10:28:56','2007-07-22'),(55,20,3,115.74,'2023-12-09 10:28:56','2023-12-09 10:28:56','2021-12-13'),(56,16,3,113.52,'2023-12-09 10:28:56','2023-12-09 10:28:56','2015-01-04'),(57,14,7,704.54,'2023-12-09 10:28:56','2023-12-09 10:28:56','2020-10-20'),(58,4,19,302.99,'2023-12-09 10:28:56','2023-12-09 10:28:56','2020-12-15'),(59,22,15,712.82,'2023-12-09 10:28:56','2023-12-09 10:28:56','2021-04-24'),(60,18,2,701.52,'2023-12-09 10:28:56','2023-12-09 10:28:56','2022-09-14'),(61,20,2,162.7,'2023-12-09 10:28:56','2023-12-09 10:28:56','2021-05-24'),(62,14,21,139.73,'2023-12-09 10:28:56','2023-12-09 10:28:56','2021-08-07'),(63,14,8,954.97,'2023-12-09 10:28:56','2023-12-09 10:28:56','2006-12-21'),(64,11,19,328.87,'2023-12-09 10:28:56','2023-12-09 10:28:56','2007-03-11'),(65,25,18,531.15,'2023-12-09 10:28:56','2023-12-09 10:28:56','2019-12-23'),(66,10,12,414.67,'2023-12-09 10:28:56','2023-12-09 10:28:56','2009-04-06'),(67,25,25,22.25,'2023-12-09 10:28:56','2023-12-09 10:28:56','2009-11-19'),(68,1,4,98.34,'2023-12-09 10:28:56','2023-12-09 10:28:56','2006-01-16'),(69,15,3,674.8,'2023-12-09 10:28:56','2023-12-09 10:28:56','2019-01-27'),(70,9,8,984.16,'2023-12-09 10:28:56','2023-12-09 10:28:56','2017-04-26'),(71,6,1,794.18,'2023-12-09 10:28:56','2023-12-09 10:28:56','2008-06-22'),(72,19,3,869.97,'2023-12-09 10:28:56','2023-12-09 10:28:56','2021-01-08'),(73,4,4,845.53,'2023-12-09 10:28:56','2023-12-09 10:28:56','2006-09-16'),(74,19,11,400.96,'2023-12-09 10:28:56','2023-12-09 10:28:56','2020-01-25'),(75,10,2,222.51,'2023-12-09 10:28:56','2023-12-09 10:28:56','2011-10-15'),(76,6,13,607.07,'2023-12-09 10:28:56','2023-12-09 10:28:56','2008-02-22'),(77,24,20,646.23,'2023-12-09 10:28:56','2023-12-09 10:28:56','2015-05-18'),(78,16,22,353.74,'2023-12-09 10:28:56','2023-12-09 10:28:56','2006-07-14'),(79,5,5,165.98,'2023-12-09 10:28:56','2023-12-09 10:28:56','2005-11-16'),(80,14,24,339.21,'2023-12-09 10:28:56','2023-12-09 10:28:56','2015-10-18'),(81,19,6,757.27,'2023-12-09 10:28:56','2023-12-09 10:28:56','2015-10-04'),(82,17,19,972.57,'2023-12-09 10:28:56','2023-12-09 10:28:56','2021-12-14'),(83,25,10,720.08,'2023-12-09 10:28:56','2023-12-09 10:28:56','2005-08-05'),(84,3,22,819.02,'2023-12-09 10:28:56','2023-12-09 10:28:56','2011-10-09'),(85,2,18,151.17,'2023-12-09 10:28:56','2023-12-09 10:28:56','2006-08-19'),(86,18,13,284.13,'2023-12-09 10:28:56','2023-12-09 10:28:56','2021-08-12'),(87,22,1,166.35,'2023-12-09 10:28:56','2023-12-09 10:28:56','2013-05-30'),(88,15,1,741.14,'2023-12-09 10:28:56','2023-12-09 10:28:56','2012-06-24'),(89,23,16,834.08,'2023-12-09 10:28:56','2023-12-09 10:28:56','2010-06-28'),(90,23,8,496.3,'2023-12-09 10:28:56','2023-12-09 10:28:56','2008-09-07'),(91,11,10,737.21,'2023-12-09 10:28:56','2023-12-09 10:28:56','2017-05-25'),(92,4,14,750.04,'2023-12-09 10:28:56','2023-12-09 10:28:56','2019-04-30'),(93,3,16,423.85,'2023-12-09 10:28:56','2023-12-09 10:28:56','2021-04-04'),(94,7,5,449.65,'2023-12-09 10:28:56','2023-12-09 10:28:56','2004-09-07'),(95,1,7,147.42,'2023-12-09 10:28:56','2023-12-09 10:28:56','2009-09-17'),(96,21,8,975.13,'2023-12-09 10:28:56','2023-12-09 10:28:56','2009-01-21'),(97,9,18,992.69,'2023-12-09 10:28:56','2023-12-09 10:28:56','2012-10-30'),(98,21,18,816.05,'2023-12-09 10:28:56','2023-12-09 10:28:56','2005-12-17'),(99,19,2,436.41,'2023-12-09 10:28:56','2023-12-09 10:28:56','2005-03-18'),(100,9,7,8.85,'2023-12-09 10:28:56','2023-12-09 10:28:56','2023-07-03'),(101,11,14,926.98,'2023-12-09 10:28:56','2023-12-09 10:28:56','2005-06-10'),(102,15,24,976.31,'2023-12-09 10:28:56','2023-12-09 10:28:56','2018-01-25'),(103,6,20,659.98,'2023-12-09 10:28:56','2023-12-09 10:28:56','2009-04-21'),(104,25,10,832.37,'2023-12-09 10:28:56','2023-12-09 10:28:56','2007-09-06'),(105,14,19,100.82,'2023-12-09 10:28:56','2023-12-09 10:28:56','2012-02-16'),(106,2,1,938.47,'2023-12-09 10:29:32','2023-12-09 10:29:32','2023-12-09'),(107,25,1,472.53,'2023-12-09 10:30:01','2023-12-09 10:30:01','2023-12-09'),(108,3,1,292.49,'2023-12-09 10:31:58','2023-12-09 10:31:58','2023-12-09'),(109,26,2,0,'2023-12-09 15:31:39','2023-12-09 15:31:39','2023-12-09'),(110,25,2,472.53,'2023-12-09 15:42:54','2023-12-09 15:42:54','2023-12-09'),(111,5,2,723.42,'2023-12-09 15:43:56','2023-12-09 15:43:56','2023-12-09'),(112,9,2,32.36,'2023-12-09 15:44:45','2023-12-09 15:44:45','2023-12-09'),(113,15,2,89.23,'2023-12-10 11:26:18','2023-12-10 11:26:18','2023-12-09'),(114,27,2,0,'2023-12-11 14:54:10','2023-12-11 14:54:10','2023-12-09'),(115,28,2,0,'2023-12-11 14:56:04','2023-12-11 14:56:04','2023-12-09'),(116,29,2,0,'2023-12-11 14:57:06','2023-12-11 14:57:06','2023-12-09'),(117,30,2,0,'2023-12-11 14:57:30','2023-12-11 14:57:30','2023-12-09'),(118,31,2,0,'2023-12-11 15:29:27','2023-12-11 15:29:27','2023-12-09'),(119,32,11,0,'2023-12-12 13:38:35','2023-12-12 13:38:35','2023-12-09');
/*!40000 ALTER TABLE `checks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discounts`
--

DROP TABLE IF EXISTS `discounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discounts` (
  `discount_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `offer_id` bigint unsigned NOT NULL,
  `price` double unsigned NOT NULL,
  `expiration_date` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`discount_id`),
  UNIQUE KEY `discounts_offer_id_unique` (`offer_id`),
  KEY `discounts_offer_id_index` (`offer_id`),
  CONSTRAINT `discount_offer_id` FOREIGN KEY (`offer_id`) REFERENCES `offers` (`offer_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discounts`
--

LOCK TABLES `discounts` WRITE;
/*!40000 ALTER TABLE `discounts` DISABLE KEYS */;
INSERT INTO `discounts` VALUES (1,34,456.6,'2014-01-18 22:27:58','2023-12-09 10:28:56','2023-12-09 10:28:56'),(2,11,3.24,'2020-12-10 05:20:08','2023-12-09 10:28:56','2023-12-09 10:28:56'),(3,16,42.15,'2014-08-10 18:40:43','2023-12-09 10:28:56','2023-12-09 10:28:56'),(4,21,51.01,'2021-07-25 12:19:26','2023-12-09 10:28:56','2023-12-09 10:28:56'),(6,18,98.48,'2023-01-07 04:14:28','2023-12-09 10:28:56','2023-12-09 10:28:56'),(7,3,206.96,'2018-06-06 19:22:20','2023-12-09 10:28:56','2023-12-09 10:28:56'),(8,9,181.16,'2017-02-06 10:48:55','2023-12-09 10:28:56','2023-12-09 10:28:56'),(9,14,304.4,'2020-03-10 02:15:09','2023-12-09 10:28:56','2023-12-09 10:28:56'),(11,24,1.53,'2017-09-13 13:31:41','2023-12-09 10:28:56','2023-12-09 10:28:56'),(13,13,241.99,'2023-05-25 13:22:08','2023-12-09 10:28:56','2023-12-09 10:28:56'),(14,4,64.09,'2020-02-09 14:42:49','2023-12-09 10:28:56','2023-12-09 10:28:56'),(16,1,476.09,'2020-07-16 12:16:56','2023-12-09 10:28:56','2023-12-09 10:28:56'),(19,6,223.78,'2023-11-22 21:09:08','2023-12-09 10:28:56','2023-12-09 10:28:56'),(21,8,33.65,'2021-04-24 02:42:38','2023-12-09 10:28:56','2023-12-09 10:28:56'),(26,36,31,'2023-12-20 17:34:36','2023-12-10 14:36:49','2023-12-10 14:40:37'),(42,5,0,'2023-12-21 12:09:20','2023-12-11 09:10:15','2023-12-11 09:10:15');
/*!40000 ALTER TABLE `discounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre_books`
--

DROP TABLE IF EXISTS `genre_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre_books` (
  `genre_book_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `genre_id` bigint unsigned NOT NULL,
  `book_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`genre_book_id`),
  UNIQUE KEY `genre_books_genre_id_book_id_unique` (`genre_id`,`book_id`),
  KEY `genre_books_genre_id_index` (`genre_id`),
  KEY `genre_books_book_id_index` (`book_id`),
  CONSTRAINT `genre_book_book_id` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE,
  CONSTRAINT `genre_book_genre_id` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`genre_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre_books`
--

LOCK TABLES `genre_books` WRITE;
/*!40000 ALTER TABLE `genre_books` DISABLE KEYS */;
INSERT INTO `genre_books` VALUES (27,1,2),(24,1,3),(5,1,4),(82,1,6),(53,1,8),(41,1,13),(62,1,16),(48,1,19),(30,1,24),(54,2,1),(44,2,8),(79,2,12),(32,2,15),(77,2,16),(33,2,19),(34,2,21),(66,2,22),(3,3,1),(68,3,7),(72,3,13),(38,3,14),(22,3,15),(1,3,21),(14,3,22),(20,4,2),(10,4,3),(59,4,13),(21,4,14),(78,4,17),(56,4,19),(65,5,5),(7,5,9),(63,5,17),(73,5,20),(83,5,21),(11,5,22),(6,5,23),(29,5,25),(67,6,10),(47,6,15),(26,6,16),(74,6,18),(2,6,21),(8,7,2),(50,7,3),(60,7,4),(64,7,6),(36,7,7),(13,7,11),(43,7,23),(28,8,1),(42,8,4),(35,8,8),(49,8,11),(9,8,12),(70,8,13),(40,8,16),(23,8,18),(17,8,22),(75,9,5),(39,9,7),(16,9,8),(31,9,9),(19,9,11),(52,9,13),(58,9,15),(81,9,19),(15,9,21),(57,9,25);
/*!40000 ALTER TABLE `genre_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `genre_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`genre_id`),
  UNIQUE KEY `genres_name_unique` (`name`),
  FULLTEXT KEY `genres_name_fulltext` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (4,'Adventure'),(6,'Comedy'),(3,'Drama'),(1,'Fantasy'),(7,'Historical'),(5,'Horror'),(2,'Mystery'),(9,'Romance'),(8,'Thriller');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2019_12_14_000001_create_personal_access_tokens_table',1),(2,'2023_09_01_131116_create_user_types_table',1),(3,'2023_09_02_130908_create_age_restrictions_table',1),(4,'2023_09_03_130750_create_genres_table',1),(5,'2023_09_04_131056_create_users_table',1),(6,'2023_09_05_183607_create_books_table',1),(7,'2023_09_06_130813_create_genre_book_table',1),(8,'2023_09_07_130837_create_offers_table',1),(9,'2023_09_08_131033_create_discounts_table',1),(10,'2023_09_09_130926_create_checks_table',1),(11,'2023_09_10_130940_create_book_author_table',1),(12,'2023_09_19_131004_create_reviews_table',1),(13,'2023_09_19_131012_create_wishes_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offers`
--

DROP TABLE IF EXISTS `offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offers` (
  `offer_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `book_id` bigint unsigned NOT NULL,
  `price` double unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`offer_id`),
  UNIQUE KEY `offers_book_id_unique` (`book_id`),
  KEY `offers_book_id_index` (`book_id`),
  CONSTRAINT `offer_book_id` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offers`
--

LOCK TABLES `offers` WRITE;
/*!40000 ALTER TABLE `offers` DISABLE KEYS */;
INSERT INTO `offers` VALUES (1,17,911.57,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(2,18,997.33,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(3,25,472.53,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(4,6,760.87,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(5,5,1,'2023-12-09 10:28:56','2023-12-11 09:10:08'),(6,8,997.86,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(8,1,175.42,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(9,21,578.57,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(10,22,55.69,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(11,3,292.49,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(13,24,407.66,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(14,7,830.27,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(16,13,346.15,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(18,14,298.54,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(21,4,158.58,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(22,2,938.47,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(23,9,32.36,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(24,20,596.88,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(26,15,89.23,'2023-12-09 10:28:56','2023-12-10 10:27:41'),(34,10,698.77,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(36,26,113.32,'2023-12-10 11:07:36','2023-12-10 11:25:12'),(37,32,0,'2023-12-12 13:38:44','2023-12-12 13:39:30');
/*!40000 ALTER TABLE `offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `book_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` tinyint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  UNIQUE KEY `reviews_book_id_user_id_unique` (`book_id`,`user_id`),
  KEY `reviews_book_id_index` (`book_id`),
  KEY `reviews_user_id_index` (`user_id`),
  CONSTRAINT `review_book_id` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE,
  CONSTRAINT `review_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,2,19,'Voluptatem dolore voluptatem neque voluptates beatae. Ipsa debitis praesentium labore ea. Necessitatibus id non omnis nam eum fuga est. Recusandae possimus quaerat eveniet velit.',2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(2,2,16,'At iure veritatis recusandae rerum rerum temporibus. Tenetur quis enim quia enim voluptatem beatae. Beatae odit expedita distinctio molestiae in animi alias.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(3,24,17,'Nam aut saepe nisi et expedita perspiciatis. Adipisci corrupti unde sed rerum ducimus ducimus voluptate. Dicta et vel quia saepe.',2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(4,4,4,'Qui laboriosam et ratione placeat voluptatem. Quasi et ut quo nostrum odio esse ut. Vel aut ad repellendus.',1,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(5,13,25,'Rerum autem est voluptas quia deserunt consequatur. Dignissimos omnis non totam id commodi. Quisquam suscipit expedita quibusdam quasi accusantium.',1,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(6,3,20,'Earum exercitationem quia repellat suscipit qui nihil. Delectus itaque laudantium voluptas tenetur. Temporibus dolor quidem mollitia omnis. Vero numquam rerum quo est et et inventore. Corporis ut est corrupti ut.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(7,11,2,'Porro inventore et ea ut in impedit dolores. Praesentium molestiae quidem nostrum quisquam ut ea debitis. Eos ipsum quis doloremque provident fugiat architecto est.',2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(8,23,1,'Enim voluptas eaque in sed quod temporibus accusamus sed. Sapiente autem esse sit quam incidunt numquam. Beatae nam qui et qui rerum.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(9,13,2,'Minus et rerum qui hic quas minima animi eos. Asperiores dolorem quod enim odit iusto qui possimus. Culpa nesciunt sed similique voluptatum recusandae inventore sed quae.',1,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(10,22,25,'Error dolore voluptate minima quaerat. Eius quam est vero aperiam corporis sapiente neque. Excepturi expedita expedita error reprehenderit non esse nemo. Eos et sint iure voluptate.',2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(11,1,11,'Veritatis corrupti et aut et. Eos quis rerum et aperiam. Ut sit hic voluptates doloribus nam ut quis. Eos tenetur eligendi distinctio praesentium nulla eos iste sit.',1,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(12,15,17,'Aut distinctio culpa qui impedit architecto veritatis mollitia. Mollitia minus odit minima impedit minima aut pariatur sed. Velit dolores consequatur amet optio cumque doloremque dolores. Quo beatae soluta alias error. Neque saepe quasi magnam laboriosam deleniti.',2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(13,18,10,'Ipsum delectus nisi tempora fugit aliquam fuga veritatis consequatur. Maiores totam totam cumque exercitationem. Unde non error accusantium praesentium ullam.',4,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(14,10,1,'Quod voluptatem illum quos error. Dignissimos quae tempora cumque voluptate quis adipisci rerum. Delectus et atque itaque in eius tempora recusandae repellat. Exercitationem iure maxime dolores aut.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(16,6,24,'Dolore a autem et quia eveniet dignissimos et. Quis labore expedita maxime consequatur asperiores quas. Reiciendis eaque dolor nihil labore est. Est voluptatem dolorum perspiciatis ullam et. Et ipsum nostrum deserunt velit magni in.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(17,23,17,'Et sapiente eos architecto ratione id tempore assumenda. Laudantium nesciunt doloremque nostrum in quasi possimus. Maiores id quaerat omnis rerum ducimus explicabo. Aut ipsa repudiandae consequatur praesentium vero ut. Dolores reprehenderit explicabo labore.',2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(18,23,10,'Odit ab culpa eum et sit expedita. Dolorem exercitationem est sint.',2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(19,15,6,'Debitis in facilis non asperiores autem error. Sequi molestias velit et sed quis. Sapiente atque et molestiae corrupti ut magnam ea consectetur.',1,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(20,13,12,'Iusto et deleniti tempore tempora aspernatur in sed. Quo aut possimus dignissimos blanditiis eos. Voluptate beatae voluptatem molestiae eos.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(21,13,24,'Eum itaque reiciendis minus est occaecati aut beatae. Accusantium ut itaque inventore nobis. Tempore earum minima quaerat odit.',4,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(22,16,6,'Et voluptatem temporibus dicta laboriosam ut. Tempora aut soluta eum et laborum sed et. Eveniet perspiciatis aperiam eaque perspiciatis.',2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(23,7,17,'Voluptatum praesentium accusantium veniam saepe molestiae est. Velit ipsa omnis non molestiae. Autem molestias vero ut quibusdam enim voluptate corporis.',2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(24,5,16,'Aut officia tempore voluptates et reprehenderit ut id. Voluptatibus dignissimos quia natus sit quidem. Et qui ut cumque fugit asperiores.',4,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(25,21,22,'Beatae aliquid architecto dolor totam quos. In aut eos aut repellendus dignissimos fuga quas. Repellat et voluptas magnam esse et numquam. Qui consequatur quia in quia a voluptatum rerum.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(26,6,2,'Vero harum quae ad voluptate qui enim doloribus. Ut eveniet veritatis repellat consectetur et id. Quis asperiores eveniet sunt consequuntur et et consequatur. Dolores temporibus sapiente labore et.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(27,2,15,'Ad iure aut quibusdam cumque optio et. Odio assumenda harum atque ut itaque ut. Ipsum voluptatem quis voluptatem eos vel asperiores placeat.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(28,1,5,'Itaque quia voluptatibus et in voluptatem aut dignissimos. Ut nostrum voluptatem nobis voluptatum repellendus cum. Explicabo nam asperiores praesentium dicta dolor. Aut quia ducimus dolor quia ea quasi eum est.',4,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(29,18,19,'Dicta dicta iste et asperiores ipsum dolorum omnis. Necessitatibus et repellendus et sed dolor vel. Autem fugit nemo enim exercitationem ut eveniet eligendi maxime.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(30,10,24,'Non neque nobis saepe et. Et voluptatum est cupiditate sint in. Et earum voluptatem quia molestias culpa consectetur odio.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(31,3,25,'Veritatis consequatur accusantium maiores voluptates necessitatibus itaque quas. Enim consequatur quaerat vitae voluptatem maxime assumenda. Fuga itaque omnis mollitia vel voluptatem.',2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(32,5,21,'Ullam sed et non consequatur voluptas sed. Ut mollitia vero sint accusantium iusto. Atque ut nesciunt consequatur facere.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(33,19,20,'Voluptas ipsa voluptas ut voluptas dolorem. Eum ducimus praesentium tenetur. Ducimus odit ut incidunt et nihil. Quisquam et nihil voluptatem soluta eius ipsam.',4,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(34,16,24,'Voluptate cupiditate labore expedita eos earum velit. Dolores id quisquam cum odit maiores laboriosam et qui. Deserunt pariatur qui rerum.',2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(35,21,21,'Pariatur aut dolor nihil sint et. Officia aut cumque omnis adipisci enim ad. Eum adipisci provident consequatur sit molestiae. Voluptatem modi facilis a eum.',1,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(36,7,12,'Ratione sint maiores quo est voluptatem iure quis. Occaecati cumque iure eaque provident aut. Dolor nihil non sit exercitationem.',2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(37,17,9,'Delectus voluptatem qui aut sunt. Cupiditate quas ullam in et numquam.',4,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(38,8,19,'Ut soluta ut facere sapiente officia iste assumenda. Voluptate autem et reprehenderit id. Illo eos aliquid harum in qui. Sapiente eos voluptatem et error omnis ut.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(39,25,2,'Nobis adipisci ad dolorem ea possimus. Consequuntur ut enim ullam autem. Ratione nisi a harum quia ratione. Perferendis id voluptatem voluptatum voluptatem omnis explicabo.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(40,20,5,'Harum velit temporibus est delectus pariatur sequi. Aliquam minima repudiandae exercitationem omnis corrupti et accusamus. Magnam nam esse est architecto fuga.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(41,6,4,'Ducimus nulla voluptatem velit rem sed. Neque beatae sint ea voluptas architecto eum et sed. Modi optio qui qui sit ut possimus et.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(42,4,9,'Rem consequatur voluptatum id mollitia qui facere sint. Laudantium quaerat nesciunt voluptatem odit animi soluta veritatis.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(43,6,17,'Recusandae similique voluptatem optio ad sed vel quod. Tempora velit eligendi autem incidunt expedita nam sed. Aut quis sequi reprehenderit enim omnis et. Sit modi vitae mollitia voluptatem porro. Unde accusamus dolor perspiciatis.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(44,9,5,'Sequi excepturi vel aspernatur quidem et commodi nesciunt. Qui nulla amet voluptatem deserunt fugit numquam. Laboriosam a molestiae molestias.',1,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(45,15,9,'Accusamus expedita quam unde. Eveniet cumque velit possimus aspernatur nemo. Perspiciatis praesentium iusto aut labore praesentium ab.',4,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(46,1,3,'Ipsum rerum accusantium debitis. Aspernatur sed eos odit corrupti et maxime. Inventore reiciendis natus animi et officiis sint. Facere officiis laudantium iste molestiae delectus aperiam.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(47,14,20,'Non ea delectus porro est perspiciatis corrupti sed consequatur. Repellendus eos corrupti et quidem molestiae sed. Non voluptas enim perspiciatis quisquam cumque pariatur repellat. Et et odio illo. Quaerat praesentium id dignissimos eveniet soluta animi.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(48,21,20,'Sed eos molestiae earum repudiandae et molestiae. Consequuntur delectus vitae qui eligendi animi. Et nostrum veritatis eos voluptatum rerum est necessitatibus distinctio.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(49,6,19,'Quasi id dolore est quia accusantium. Quia non laborum similique debitis molestiae atque dolorum excepturi. Voluptatem quia quia nesciunt est aut debitis hic sed.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(50,6,1,'Beatae veritatis dolor provident cupiditate tenetur minus accusamus sit. Sint non sit ut magni occaecati incidunt nihil dolorem. Labore excepturi facere iure temporibus et saepe et.',4,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(51,18,25,'Eligendi quae quisquam quia eum ut iusto. Dolores qui voluptatem impedit distinctio temporibus. Minima tenetur fugit rerum adipisci autem impedit odio veritatis. Fuga ipsam consequatur ea rerum nam autem ea.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(52,25,17,'Ut dicta voluptate est. Et voluptatem fugit aspernatur impedit excepturi quidem asperiores. Culpa et quia nihil dicta.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(53,10,20,'Perspiciatis veritatis minus soluta voluptas. Sint aspernatur dolor molestiae vel tempora excepturi voluptas dolores. Quos dolorum nisi soluta velit ex odio. Et quis animi nisi odio consequatur qui qui consequatur.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(54,4,20,'Quae aut nobis hic blanditiis voluptates dolores rem nam. Blanditiis molestias beatae provident corrupti blanditiis. Nemo quis quisquam expedita omnis. Itaque rem ut nisi quam sed molestiae.',4,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(55,20,1,'Veniam doloremque ut ut dolor sequi. Delectus perspiciatis consequatur accusantium quis aut quia. Soluta inventore nisi cupiditate magnam et praesentium perspiciatis. Ipsum impedit sit dignissimos saepe rerum nisi sequi.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(56,18,4,'Molestias velit assumenda ut rerum iure non magni possimus. Magni asperiores aliquid autem natus omnis sit natus. Officia asperiores incidunt aut.',1,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(57,3,2,'Beatae mollitia nam quidem unde qui. Dolorem quia esse sit exercitationem corporis aut. Praesentium molestiae voluptates dolor neque dolor.',2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(58,13,14,'Eaque exercitationem sint perspiciatis dolor vero. Ab eos dicta consequuntur ratione quam quae voluptatibus. Velit voluptatem quia eius tenetur veritatis error. Commodi quibusdam illo asperiores in.',1,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(59,22,17,'Cumque omnis excepturi sunt minima illo possimus deleniti. Dignissimos impedit nobis tempora delectus iusto. Modi est quia et iusto nemo.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(60,2,8,'Consequatur placeat eveniet aut soluta. Eveniet earum at neque eveniet culpa. Officiis eos quibusdam amet amet. Et repudiandae reiciendis accusantium adipisci quis rerum et consequuntur.',2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(61,10,21,'Aut soluta eos beatae voluptatibus ipsum. Sint error unde rerum consequatur id. Aut eveniet in ullam minima explicabo nam.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(62,24,14,'Eum fugiat qui explicabo blanditiis. Ex provident eum delectus qui ut.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(63,12,19,'Ut ducimus delectus sequi et saepe nihil. Nobis et numquam aut libero dolorem accusamus.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(64,25,8,'Aut unde maxime reiciendis debitis est voluptatem. Ut pariatur id sint aspernatur ea est. Officiis nobis omnis quaerat cum.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(65,13,21,'Animi et sit est molestiae et. Ut dignissimos nam provident sunt et blanditiis. Libero iste sed quia quisquam temporibus perspiciatis.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(66,1,12,'Ipsam cupiditate temporibus accusamus hic. Et cupiditate rem earum ut culpa omnis voluptatem. Omnis in quia quis cumque excepturi placeat et. Eaque aspernatur non ipsum.',1,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(67,15,23,'Beatae ipsam est quasi consequuntur excepturi consequuntur. Illum illum voluptas consequuntur et vel. Ab repudiandae esse dolorum ut dolores et. Sunt molestias quibusdam libero est est omnis.',1,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(68,18,8,'Voluptas vitae ipsa quisquam reprehenderit corrupti et aut. Necessitatibus perspiciatis quae aliquid aut enim earum sunt. Dolore voluptatem expedita est vel similique rerum id. Voluptatem dolor aperiam ipsa tempore tempora.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(69,6,5,'Consectetur id quae corporis mollitia. Aut dolorem aut modi aspernatur et. Nobis voluptas ut provident deserunt blanditiis et et. Ipsam qui aut voluptate exercitationem voluptates.',2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(70,21,13,'Ea similique a vel qui voluptatem qui. Ex aut et animi dolorem rerum ut voluptatum iste. Impedit sed non aut consequatur aliquid. Totam perspiciatis cum ut quaerat nesciunt.',1,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(71,16,10,'Vel earum suscipit consequatur alias sed id. Et id pariatur necessitatibus doloribus consectetur ut ut. Ad impedit quia amet fuga.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(73,13,16,'Placeat sit sit nihil est aut modi. Repellat aut delectus soluta pariatur.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(74,11,15,'Quia illo fuga eveniet cupiditate debitis sunt. Debitis sit autem neque in doloribus perferendis autem. Consequuntur quo optio iste sed.',4,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(75,5,4,'Perspiciatis est ab possimus accusamus eos fugit. Consectetur deserunt facilis impedit neque. Rem amet et sapiente deserunt quos molestias earum aut.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(76,22,14,'Voluptas quasi veritatis omnis adipisci in repudiandae. Quo sequi maxime ratione sunt. Incidunt in provident earum impedit assumenda inventore.',4,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(77,20,15,'Omnis natus numquam ut placeat est. Deserunt mollitia deleniti nihil cum quis et. Eum vitae hic aperiam laborum.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(78,12,1,'Perferendis et impedit voluptas dolore qui. Perspiciatis dicta vel molestias vero et est. Itaque illo sed sed nihil quam.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(79,9,19,'Odio est necessitatibus possimus quia et et voluptatibus voluptatem. Maxime neque consequuntur libero laboriosam vel nemo sit. Voluptatem natus et eum id. Unde est exercitationem ducimus est quas enim.',1,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(80,21,17,'Et sit fugit eaque quia. Tenetur perspiciatis esse natus placeat dolores aut magni. Velit odio est facere unde. Reiciendis natus qui voluptas quaerat quis magnam. Nobis eos molestias et dolor.',2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(81,13,19,'Voluptatem dolorem voluptas eum aliquid. Repudiandae incidunt deleniti suscipit molestiae ut eveniet autem et. Distinctio ut est enim ut.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(82,20,6,'Nisi quos aliquid est nostrum laboriosam in. Deserunt rem sunt eligendi ex aut. Dolorem aut nobis aut enim. Quibusdam repudiandae minima veritatis delectus sunt in eligendi ut.',4,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(83,22,8,'Rerum nihil fugiat quia est molestiae dolor ut. Omnis aut et autem. Consequatur sint corrupti hic dolor a.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(84,6,18,'Delectus quis voluptatibus temporibus quod animi fuga dolorem. Culpa qui eaque nisi. Veritatis iste hic voluptate ut est saepe voluptas.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(85,22,5,'Saepe eligendi accusantium aut dolorem maxime. Exercitationem placeat et odit. Itaque dolorum ut laborum nulla minus rerum qui voluptas.',4,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(86,17,19,'Ut et at dolor aut culpa tempora ut. Architecto sed et alias quidem. Hic asperiores quae aut mollitia molestias iure corporis amet.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(87,2,23,'Asperiores dolorum quos quam vitae. Numquam voluptatem sit sit aut et totam soluta. Consectetur error molestias dolores dignissimos ea.',4,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(88,18,18,'Nostrum repudiandae nihil rem aliquam error. Minima itaque qui sed provident harum et.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(89,8,11,'Qui ut dignissimos nihil dolor quia. Ea corrupti deleniti reprehenderit minima quia rerum quas. Voluptatem nihil incidunt nobis aut minus. Omnis porro soluta itaque voluptates.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(90,12,5,'Velit qui ab omnis laboriosam consequatur eius. Aliquid in quis error sit quidem. Autem sit facilis hic autem maxime.',4,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(91,21,6,'Sint ipsam sapiente id ut voluptatem adipisci esse. Accusamus doloribus unde autem dolores placeat omnis expedita. Fugiat quod earum tempora suscipit cumque qui.',2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(92,19,7,'Dignissimos cupiditate sapiente quo quos quia possimus. Voluptatem eaque quae explicabo eum amet eveniet aut. Reiciendis libero fugiat aliquid adipisci adipisci illum facere iusto.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(93,21,3,'Voluptas et ipsa pariatur quia. Enim blanditiis eum est. Ea qui sit nihil quis officiis repudiandae corporis nihil.',2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(94,17,22,'Quisquam veniam at neque assumenda. A et necessitatibus qui tempora occaecati iusto. Ut neque quis tenetur voluptatem. Ex et qui delectus animi.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(95,18,7,'Quod architecto quaerat hic quos doloribus voluptas. Dolore voluptatum reprehenderit quae fuga iure. Similique beatae sit voluptatem eligendi repellendus. Omnis et amet perspiciatis necessitatibus assumenda consequatur.',1,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(96,25,4,'Aut temporibus animi inventore laboriosam labore. Saepe hic ut facere libero. Ratione ipsa aut qui odio similique quaerat ratione.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(97,16,11,'Expedita ea officiis odio. Repellat animi possimus ut expedita qui voluptatem nam vel. Ipsum excepturi quaerat omnis iusto. Dolorem reiciendis voluptatibus modi assumenda ut.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(98,18,1,'Officiis doloremque temporibus sunt distinctio ut. Distinctio illum minus odit ea. Est id quo minus doloribus laudantium.',4,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(99,21,9,'Voluptatem corrupti id dolor corrupti. Magnam quisquam vitae dolor fugiat. Qui ipsam quam blanditiis omnis ex dolorum.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(100,21,10,'Nihil ea nisi sed. Eius nesciunt consequuntur veritatis aut. Quaerat dolorum dolores inventore cupiditate autem dolor soluta possimus. Incidunt quia amet sunt id velit.',3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(101,9,20,'Numquam accusantium quod saepe qui. Harum laborum nihil sint nisi. Harum et rem quibusdam quia non.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(102,7,13,'Provident nobis voluptatum velit dignissimos accusamus odit odit. Aut recusandae neque modi. Rerum ut atque quidem occaecati odio quisquam. Consequatur vel nisi quisquam labore. Consequatur modi sapiente nobis aliquam.',2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(103,21,19,'Non doloremque accusamus vero iusto. Esse voluptatem voluptatibus tenetur autem cumque reprehenderit aspernatur.',5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(104,23,16,'Iusto provident nemo et. Id neque est voluptatem pariatur. Dignissimos commodi voluptatem qui illum.',1,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(105,10,25,'Ipsum sed quasi nisi totam nemo ipsa. Quo eum amet mollitia magnam commodi rerum. Et et molestias sed labore quia ullam. Exercitationem dolore enim asperiores quia debitis et. Eaque aut ex rerum et cum minima vel.',4,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(131,19,11,'dwdwd',3,'2023-12-12 11:31:00','2023-12-12 11:31:00');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_types`
--

DROP TABLE IF EXISTS `user_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_types` (
  `user_type_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_type_id`),
  UNIQUE KEY `user_types_name_unique` (`name`),
  FULLTEXT KEY `user_types_name_fulltext` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_types`
--

LOCK TABLES `user_types` WRITE;
/*!40000 ALTER TABLE `user_types` DISABLE KEYS */;
INSERT INTO `user_types` VALUES (1,'reader'),(2,'writer');
/*!40000 ALTER TABLE `user_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_type_id` bigint unsigned NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthday` datetime NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `user_user_type_id` (`user_type_id`),
  KEY `users_first_name_last_name_index` (`first_name`,`last_name`),
  FULLTEXT KEY `users_email_fulltext` (`email`),
  CONSTRAINT `user_user_type_id` FOREIGN KEY (`user_type_id`) REFERENCES `user_types` (`user_type_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'Dandre','Klein','2000-10-29 00:00:00','$2y$10$chEJZMjGePMYYn1b6Lfvfe1IAbvrdQGdfUlBR/iv8k/E2O0OBLmoa','huels.lenna@example.net','image_65746b6c80b3f.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(2,2,'Misael','Bosco','1998-02-24 00:00:00','$2y$10$aGlNrNNM72452f53pPdWaeaFLUoMhH1TOwUfmOgCVuJH88jDbDbaO','gaylord.conner@example.com','image_65746b6d70f15.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(3,1,'Esperanza','Larson','2001-10-21 00:00:00','$2y$10$CEMjEuD1UvhNT3YEzuCRMOzW0a.gu8/VR2PXVRDosJygb2ryUJdiy','christelle.schroeder@example.com','image_65746b6f2ccaf.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(4,2,'Dejah','Bahringer','1998-02-06 00:00:00','$2y$10$iIk8vS5Hu54ctfwBxqNDj.sQhJ22Ozb9DzUAf8lMQN30lOEeyqq8C','vicenta.prohaska@example.net','image_65746b7114f84.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(5,2,'Coy','Frami','2008-07-06 00:00:00','$2y$10$FJQkauWEVY/um0z6HOdM9.MRI9s1vpadk6B4kJAGyopAp2FTdAemi','louie18@example.org','image_65746b7214dcd.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(6,1,'Barrett','Padberg','2005-05-15 00:00:00','$2y$10$jiz9tZVId/2Jomef5EkNyuDYG07lYwuKA7bDc7q6je4S5JLpkrI2K','enrico.dickinson@example.net','image_65746b7464361.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(7,1,'Larissa','Klein','2006-08-01 00:00:00','$2y$10$yBsySJYXRJDPJHVGwhllUe1XOLSQlwcIRRJpIwzoMTSc/eV4yuXpC','breitenberg.carroll@example.net','image_65746b76e605d.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(8,1,'Christina','Nikolaus','1998-06-06 00:00:00','$2y$10$8.vzO241GRXxFRLFs60MAuCD86QWujDqmDFQRBaBvUy36ZSKcTPR2','iwalsh@example.net','image_65746b77deecb.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(9,1,'Chet','Wiza','2006-06-22 00:00:00','$2y$10$bqVyxSjilUsoiR/3NDrANuII0XWTPRrPKsLMeQLGgHbEl.P8jqMS.','colton.jacobson@example.net','image_65746b7bb47fa.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(10,1,'Chaya','Emard','2008-08-22 00:00:00','$2y$10$DgEbDUJ51TyTX1Elar8ka.wSrSWeggDrX8I52Xf3nnBjr.6C4NFvq','yruecker@example.org','image_65746b7cbd7c4.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(11,2,'Baron','Lakin','2004-01-30 00:00:00','$2y$10$LNzv2arQyt7CrYcAmE1eJ.X4Vaj/NnoVdbjIoUSRuyp2O8e6VqdvS','elliot32@example.net','image_65746b7dc5c88.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(12,1,'Joesph','Hoeger','2000-09-03 00:00:00','$2y$10$QiLsX9qNtdBy.JFJ31a3DuZF6kgssIEN5Lw0onr0XAIkMHOrgyko6','marie.lindgren@example.org','image_65746b7eae278.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(13,1,'Jalen','Denesik','2004-04-01 00:00:00','$2y$10$Yb2WF.hVS.FEGVUzvzMr9u5Ja2fpJEV8DLp6Qv8sR5FoQQkU.DDVC','lauriane66@example.org','image_65746b7fb1e8e.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(14,1,'Cassidy','Langosh','2001-03-15 00:00:00','$2y$10$18uds0P4HGWTXY.ZZq/Wy.AnRsq/2db38acRdvDP9WO0jPZV1.wB.','alegros@example.org','image_65746b825fad1.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(15,1,'Rudy','Hane','2003-11-16 00:00:00','$2y$10$vijS9WTiBlBLHr2Qo3ISveOCVoIHxqR2TOkAVRmPDf.RcJDXQm3Mi','hpaucek@example.net','image_65746b84e8828.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(16,2,'Elton','Reilly','2005-07-12 00:00:00','$2y$10$/GNBHn0.frxrMjsytMlWPOcMWCh.OrPYMSK2wZdYpeOr6FMuF.o7e','pkris@example.com','image_65746b86e5038.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(17,1,'Meda','Kling','2000-11-14 00:00:00','$2y$10$OtrDeleBM7vAjUpM2zueruhxzfPobWNlYIGIylW4EJhtDMxxo.GMq','feeney.katelynn@example.com','image_65746b8964a6e.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(18,2,'Sonia','Volkman','2001-09-07 00:00:00','$2y$10$nrZN0YSs5xzfKVDF6Qp4Ku.eO66Nf1IKGuy5aiwGWe9zaS.bgxTIS','pauline.feeney@example.org','image_65746b8b6ddf1.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(19,2,'Cicero','Harber','1996-04-25 00:00:00','$2y$10$ie00NJMN1INzf0gxqbmr9eh9No1fv9P56V0l7i7SMgGLsEhJEJxFO','joy69@example.org','image_65746b8da79f2.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(20,2,'Hester','Schulist','1998-04-06 00:00:00','$2y$10$Y9nKwykQxWQM0asHD76efOQr2BFG1RfnjxYJWX5VCPkAsmAAxSJKS','annalise.morissette@example.com','image_65746b8ec2977.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(21,2,'Rigoberto','Gusikowski','1997-12-21 00:00:00','$2y$10$ssqg5qcdfvGV6kGhLBxD8egpihHLiaiJZgyLJY/XpqgOm992NOWOS','gharris@example.org','image_65746b90d392f.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(22,2,'Jacynthe','Collier','2001-11-05 00:00:00','$2y$10$q64ZZA3BftdUxR8Y8FbyUOZPuc0eMWP3ohH9h1fU96r/DBFMMtHaW','gmohr@example.com','image_65746b91cbc96.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(23,1,'Eldon','Kunde','2000-12-27 00:00:00','$2y$10$tOQmDgFAjSlpjw3KZkh9uefIwCwx5v0q8k0.1CtriulVl46uz79fa','hirthe.vincent@example.net','image_65746b9457e35.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(24,2,'Valerie','Harvey','2001-10-24 00:00:00','$2y$10$ceSgsTyYPVd9pCID9RVk9uCAQtL69sq59NLw4yIO4hj/jnOvmtvay','noemy.roob@example.com','image_65746b96542a1.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55'),(25,1,'Jaunita','Kirlin','2003-07-07 00:00:00','$2y$10$R2FPiM1Bbnghqv3UvaJzjePWmI8mTyhQhAngQGkOExBwy8xOBAkei','tamara.borer@example.com','image_65746b97e140f.jpg','2023-12-09 10:28:55','2023-12-09 10:28:55');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishes`
--

DROP TABLE IF EXISTS `wishes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishes` (
  `wish_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `book_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`wish_id`),
  UNIQUE KEY `wishes_book_id_user_id_unique` (`book_id`,`user_id`),
  KEY `wishes_book_id_index` (`book_id`),
  KEY `wishes_user_id_index` (`user_id`),
  CONSTRAINT `wish_book_id` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE,
  CONSTRAINT `wish_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishes`
--

LOCK TABLES `wishes` WRITE;
/*!40000 ALTER TABLE `wishes` DISABLE KEYS */;
INSERT INTO `wishes` VALUES (1,8,17,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(2,25,21,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(3,19,6,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(4,24,16,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(5,16,21,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(6,3,20,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(7,4,18,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(8,5,15,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(9,5,1,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(10,6,22,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(11,14,25,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(12,21,21,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(13,4,8,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(14,14,8,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(15,13,18,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(16,18,9,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(17,22,13,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(18,10,4,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(19,1,21,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(20,8,13,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(21,7,24,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(22,21,17,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(23,6,16,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(24,15,9,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(25,6,14,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(26,23,23,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(27,22,25,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(28,11,22,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(29,25,3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(30,15,15,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(31,11,9,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(33,11,14,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(34,25,5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(35,2,16,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(36,19,25,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(37,10,17,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(38,21,18,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(39,13,23,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(40,15,7,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(41,8,8,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(42,2,13,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(43,13,10,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(44,15,20,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(45,18,20,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(46,5,18,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(47,23,21,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(48,16,6,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(49,10,21,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(50,14,15,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(51,12,22,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(52,17,12,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(53,20,1,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(54,17,20,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(55,16,9,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(56,4,19,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(57,1,17,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(58,14,20,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(59,25,18,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(60,2,12,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(61,9,1,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(62,20,19,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(64,18,13,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(66,14,11,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(67,13,8,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(68,16,8,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(69,1,8,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(70,3,24,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(71,2,7,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(72,21,7,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(73,17,5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(74,9,13,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(75,6,25,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(77,9,7,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(79,8,4,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(81,5,9,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(82,1,22,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(83,20,17,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(84,21,2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(85,22,15,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(86,1,13,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(87,7,12,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(88,13,3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(89,5,17,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(90,10,12,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(91,17,15,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(92,11,12,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(93,12,3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(94,4,11,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(95,25,6,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(96,24,7,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(97,10,19,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(98,10,3,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(99,4,25,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(100,7,21,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(102,16,20,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(104,13,16,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(105,12,13,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(106,1,16,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(107,25,13,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(108,9,2,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(109,2,5,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(110,6,9,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(111,3,10,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(112,14,17,'2023-12-09 10:28:56','2023-12-09 10:28:56'),(113,21,24,'2023-12-09 10:28:56','2023-12-09 10:28:56');
/*!40000 ALTER TABLE `wishes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-12 20:05:39
