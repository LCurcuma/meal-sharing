-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: lesson3
-- ------------------------------------------------------
-- Server version	9.3.0

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
-- Table structure for table `meal`
--

DROP TABLE IF EXISTS `meal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `location` varchar(255) DEFAULT NULL,
  `when` datetime DEFAULT NULL,
  `max_reservations` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meal`
--

LOCK TABLES `meal` WRITE;
/*!40000 ALTER TABLE `meal` DISABLE KEYS */;
INSERT INTO `meal` VALUES (1,'Little Chicks Steamed Bun','“Baozi” and “mantou” are steamed buns, a popular brunch bite-size food in Chinese society, they are made of 5 simple ingredients and cooked in a bamboo steamer. Author: Xue Ren雪人','Denmark','2025-07-06 00:00:00',0,83.00,'2025-07-12 00:00:00','https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-07_14-11-36.jpg'),(2,'Eevee Cake','A cake inspired by Fluffy Eevee Pancakes from the game, Pokemon Cafe Mix! Author: Sugar High Score','Denmark','2025-07-05 00:00:00',105,66.00,'2025-07-12 00:00:00','https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-07_14-30-56.jpg'),(3,'Pokemon Macaron','Firstly, Whipsugar (ホイップシュガー) creates macarons topped with 3D icing versions of the OG three Eeveelutions. There’s no recipe for the macarons, just a guide for the decorations, including crystals too. Even if this is above your skill level (mine too) then I highly recommend watching as it’s amazing to see them finished. Author: ホイップシュガーのアイシングクッキーチャンネル','Denmark','2025-07-06 00:00:00',0,197.00,'2025-07-12 00:00:00','https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-07_14-38-13.jpg'),(4,'Easy Black Sesame Molten Lava Buns','“Baozi” and “mantou” are steamed buns, a popular brunch bite-size food in Chinese society, they are made of 5 simple ingredients and cooked in a bamboo steamer. Xue Ren here to show you how to transform traditional round white steamed buns into surprisingly cute characters. Author: Xue Ren雪人','Denmark','2025-07-06 00:00:00',0,157.00,'2025-07-12 00:00:00','https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-07_14-50-19.jpg'),(5,'Little Sheep Steamed Buns','“Baozi” and “mantou” are steamed buns, a popular brunch bite-size food in Chinese society, they are made of 5 simple ingredients and cooked in a bamboo steamer. Xue Ren here to show you how to transform traditional round white steamed buns into surprisingly cute characters. Author: Xue Ren雪人','Denmark','2025-07-05 00:00:00',85,96.00,'2025-07-12 00:00:00','https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-07_15-36-02.jpg'),(6,' Unicorn Doughnut Steamed Bun','“Baozi” and “mantou” are steamed buns, a popular brunch bite-size food in Chinese society, they are made of 5 simple ingredients and cooked in a bamboo steamer. Xue Ren here to show you how to transform traditional round white steamed buns into surprisingly cute characters. Author: Xue Ren雪人','Denmark','2025-07-06 00:00:00',0,151.00,'2025-07-12 00:00:00','https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-07_15-39-19.jpg'),(7,'Little Tiger Steamed Buns','“Baozi” and “mantou” are steamed buns, a popular brunch bite-size food in Chinese society, they are made of 5 simple ingredients and cooked in a bamboo steamer. Xue Ren here to show you how to transform traditional round white steamed buns into surprisingly cute characters. Author: Xue Ren雪人','Denmark','2025-07-05 00:00:00',73,159.00,'2025-07-12 00:00:00','https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-07_15-44-42.jpg'),(8,'Sumikko Gurashi Meringue Cookies','This cute cookies are so sweet, so it seems! They\'re good desert abd snacks. Author: BEMBUM KITCHEN','Denmark','2025-07-08 00:00:00',148,28.00,'2025-07-12 00:00:00','https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-07_15-48-32.jpg'),(9,'Italian Meringue','The Italian meringue recipe and piping techniques in this video tutorial will give absolute beginners a place to start when learning how to make their own animal and character meringues. Author: Colby Jack Rabbit','Denmark','2025-07-06 00:00:00',0,109.00,'2025-07-12 00:00:00','https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-07_15-53-20.jpg'),(10,'Cherry Bear','Really good and cute Cherry Bear Meringue Cookie. Author: 머랭쓰 Meringue’s','Denmark','2025-07-07 00:00:00',0,7.00,'2025-07-12 00:00:00','https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-07_15-57-18.jpg'),(11,'Bunny & Chick 3D Meringue Cookies','Cute 3D meringue cookies! Author: Sugar Bean 슈가빈','Denmark','2025-07-09 00:00:00',25,123.00,'2025-07-12 00:00:00','https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-09_13-19-06.jpg'),(12,'Pooh meringuecookie','Cute meringue cookies with characters from Winnie the Pooh. Author: 베이몬 Baking Monster','Denmark','2025-07-09 00:00:00',0,198.00,'2025-07-12 00:00:00','https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-09_13-34-38.jpg'),(13,'Winnie the Pooh Santa Meringue cookies','Cute Christmas Winnie that has sweet taste! Author: 누빗 nubittime','Denmark','2025-07-08 00:00:00',0,161.00,'2025-07-12 00:00:00','https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-09_13-44-30.jpg');
/*!40000 ALTER TABLE `meal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number_of_guests` int NOT NULL,
  `meal_id` int NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `contact_phonenumber` varchar(255) DEFAULT NULL,
  `contact_name` varchar(255) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `meal_id` int NOT NULL,
  `stars` int NOT NULL,
  `created_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-12 14:24:47
