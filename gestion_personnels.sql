/*
SQLyog Ultimate v12.4.3 (64 bit)
MySQL - 10.4.10-MariaDB : Database - gestion_personnels
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`gestion_personnels` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `gestion_personnels`;

/*Table structure for table `cantine` */

DROP TABLE IF EXISTS `cantine`;

CREATE TABLE `cantine` (
  `cantine_id` int(11) NOT NULL AUTO_INCREMENT,
  `month` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `nb_people` int(11) NOT NULL,
  `total_budget_vary` varchar(50) NOT NULL,
  `total_budget_voamaina` varchar(50) NOT NULL,
  `total_depense` varchar(50) NOT NULL,
  PRIMARY KEY (`cantine_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `cantine` */

/*Table structure for table `common_tools` */

DROP TABLE IF EXISTS `common_tools`;

CREATE TABLE `common_tools` (
  `tool_id` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_date` date DEFAULT NULL,
  `identification_number` varchar(50) DEFAULT NULL,
  `article_name` varchar(50) DEFAULT NULL,
  `assignation_place` varchar(50) DEFAULT NULL,
  `statue` varchar(50) DEFAULT NULL,
  `historical` text DEFAULT NULL,
  `material_number` int(11) DEFAULT NULL,
  `tooling_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`tool_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `common_tools` */

/*Table structure for table `daily_employee` */

DROP TABLE IF EXISTS `daily_employee`;

CREATE TABLE `daily_employee` (
  `dailyemployee_id` int(11) NOT NULL AUTO_INCREMENT,
  `matricule` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `cin` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `contact` varchar(50) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `code_chantier` varchar(50) DEFAULT NULL,
  `group` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `hiring_date` datetime DEFAULT NULL,
  `type_contrat` varchar(255) NOT NULL,
  `evaluation` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL,
  `remarque` text DEFAULT NULL,
  PRIMARY KEY (`dailyemployee_id`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

/*Data for the table `daily_employee` */

insert  into `daily_employee`(`dailyemployee_id`,`matricule`,`firstname`,`lastname`,`cin`,`address`,`contact`,`post_id`,`code_chantier`,`group`,`category`,`hiring_date`,`type_contrat`,`evaluation`,`status`,`remarque`) values 
(34,'PL001','Randria','Nasolo','102 364 989 854','Lot 15kv Mahamasina','033 12 565 48',2,'P001','BTP','HC','2022-10-18 00:00:00','','','Actif','');

/*Table structure for table `daily_presence` */

DROP TABLE IF EXISTS `daily_presence`;

CREATE TABLE `daily_presence` (
  `dailypresence_id` int(11) NOT NULL AUTO_INCREMENT,
  `weekpresence_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `day_id` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `presence_salary` varchar(50) DEFAULT NULL,
  `dailyemployee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`dailypresence_id`)
) ENGINE=MyISAM AUTO_INCREMENT=162 DEFAULT CHARSET=utf8;

/*Data for the table `daily_presence` */

/*Table structure for table `days` */

DROP TABLE IF EXISTS `days`;

CREATE TABLE `days` (
  `day_id` int(11) NOT NULL AUTO_INCREMENT,
  `day_text` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`day_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `days` */

insert  into `days`(`day_id`,`day_text`) values 
(1,'Lundi'),
(2,'Mardi'),
(3,'Mercredi'),
(4,'Jeudi'),
(5,'Vendredi'),
(6,'Samedi'),
(7,'Dimanche');

/*Table structure for table `monthly_employee` */

DROP TABLE IF EXISTS `monthly_employee`;

CREATE TABLE `monthly_employee` (
  `monthlyemployee_id` int(11) NOT NULL AUTO_INCREMENT,
  `matricule` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `cin` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `contact` varchar(50) DEFAULT NULL,
  `group` varchar(50) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `code_chantier` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `hiring_date` date DEFAULT NULL,
  `type_contrat` varchar(255) NOT NULL,
  `evaluation` varchar(255) NOT NULL,
  `motif` text DEFAULT NULL,
  `ostie_num` varchar(50) DEFAULT NULL,
  `cnaps_num` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`monthlyemployee_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `monthly_employee` */

/*Table structure for table `monthly_presence` */

DROP TABLE IF EXISTS `monthly_presence`;

CREATE TABLE `monthly_presence` (
  `monthlypresence_id` int(11) NOT NULL AUTO_INCREMENT,
  `monthlyweekpresence_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `week_id` int(11) DEFAULT NULL,
  `day_id` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `advance` varchar(50) DEFAULT NULL,
  `presence_salary` varchar(50) DEFAULT NULL,
  `monthlyemployee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`monthlypresence_id`)
) ENGINE=MyISAM AUTO_INCREMENT=211 DEFAULT CHARSET=utf8;

/*Data for the table `monthly_presence` */

/*Table structure for table `monthlyweek_presence` */

DROP TABLE IF EXISTS `monthlyweek_presence`;

CREATE TABLE `monthlyweek_presence` (
  `monthlyweekpresence_id` int(11) NOT NULL AUTO_INCREMENT,
  `month` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `first_date` date DEFAULT NULL,
  `last_date` date DEFAULT NULL,
  `nb_present` int(11) DEFAULT NULL,
  `nb_absent` int(11) DEFAULT NULL,
  `total_advance` int(11) DEFAULT NULL,
  `total_salary` int(11) DEFAULT NULL,
  `monthlyemployee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`monthlyweekpresence_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

/*Data for the table `monthlyweek_presence` */

/*Table structure for table `personnal_tools` */

DROP TABLE IF EXISTS `personnal_tools`;

CREATE TABLE `personnal_tools` (
  `tool_id` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_date` date DEFAULT NULL,
  `identification_number` varchar(50) DEFAULT NULL,
  `vendor` varchar(50) NOT NULL,
  `invoice_number` varchar(50) NOT NULL,
  `article_name` varchar(50) DEFAULT NULL,
  `assignation_place` varchar(50) DEFAULT NULL,
  `statue` varchar(50) DEFAULT NULL,
  `historical` text DEFAULT NULL,
  `material_number` int(11) DEFAULT NULL,
  `responsable` varchar(50) DEFAULT NULL,
  `tooling_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`tool_id`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

/*Data for the table `personnal_tools` */

insert  into `personnal_tools`(`tool_id`,`purchase_date`,`identification_number`,`vendor`,`invoice_number`,`article_name`,`assignation_place`,`statue`,`historical`,`material_number`,`responsable`,`tooling_id`,`created_at`,`updated_at`) values 
(7,'2021-10-14','PERF-H3-GM-001','','','PERFORATEUR TOTAL GM','CH-006','Occasion','',1,NULL,NULL,'2022-10-14 08:52:07',NULL),
(8,'2021-10-14','PERF-H3-GM-002','','','PERFORATEUR TOTAL GM','CH-006','Occasion','',1,NULL,NULL,'2022-10-14 08:52:07',NULL),
(9,'2021-10-14','PERF-H3-MM-001','','','PERFORATEUR ATEC MM','CH-006','Occasion','',1,NULL,NULL,'2022-10-14 08:52:07',NULL),
(10,'2021-10-14','PERC-H3-PM-001','','','PERCEUSE TOTAL PM','CH-006','Occasion','',1,NULL,NULL,'2022-10-14 08:52:07',NULL),
(11,'2021-10-14','MEUL-H3-GM-001','','','MEULEUSE PERLES GM','CH-006','Occasion','',1,NULL,NULL,'2022-10-14 08:52:07',NULL),
(12,'2021-10-14','MEUL-H3-GM-002','','','MEULEUSE PERLES GM','CH-006','Occasion','',1,NULL,NULL,'2022-10-14 08:52:07',NULL),
(14,'2021-10-14','MEUL-H3-GM-003','','','MEULEUSE PERLES GM','CH-006','Nouveau','',1,NULL,NULL,'2022-10-14 08:52:07',NULL),
(15,'2021-10-14','MEUL-H3-GM-004','','','MEULEUSE PERLES GM','CH-006','Nouveau','',1,NULL,NULL,'2022-10-14 08:52:07',NULL),
(16,'2021-10-14','MEUL-H3-PM-001','','','MEULEUSE POWER PM','CH-006','Occasion','',1,NULL,NULL,'2022-10-14 08:52:07',NULL),
(17,'2021-10-14','P_E-H3-001','','','POMPE D\'EPREUVE','CH-006','Occasion','',1,NULL,NULL,'2022-10-14 12:33:47',NULL),
(18,'2021-10-14','ET-H3-001','','','ETEAU PARALLELE','CH-006','Occasion','',1,NULL,NULL,'2022-10-14 12:33:47',NULL),
(19,'2021-10-14','GIL_ARM-H3-001','','','GILET DE PROTECTION ARMEE (DELTA PLUS)','CH-006','Occasion','',4,NULL,NULL,'2022-10-14 12:33:47',NULL),
(20,'2021-10-14','M_PPR-H3-001','','','MACHINE PPR ','CH-006','Occasion','20mm-32mm',1,NULL,NULL,'2022-10-14 12:33:47',NULL),
(21,'2021-10-14','M_PPR-H3-002','','','MACHINE PPR','CH-006','Occasion','20mm-63mm',1,NULL,NULL,'2022-10-14 12:33:47',NULL),
(22,'2021-10-14','RALL-H3-001','','','RALLONGE 48m','CH-006','Occasion','',1,NULL,NULL,'2022-10-14 12:33:47',NULL),
(23,'2021-10-14','RALL-H3-002','','','RALLONGE ENROULEUR 40m','CH-006','Occasion','',1,NULL,NULL,'2022-10-14 12:33:47',NULL),
(24,'2021-10-14','RALL-H3-003','','','RALLONGE ENROULEUR 40m','CH-006','Occasion','',1,NULL,NULL,'2022-10-14 12:33:47',NULL),
(25,'2021-10-14','DEC-H3-001','','','DECAPEUR THERMIQUE','CH-006','Occasion','',1,NULL,NULL,'2022-10-14 12:33:47',NULL),
(29,'2021-10-14','MASS-H3-001','','','MASSETTE TOTAL ','CH-006','Occasion','1KG',1,NULL,NULL,'2022-10-14 12:33:47',NULL),
(28,'2021-10-14','MASS-H3-002','','','MASSETTE TOTAL ','CH-006','Occasion','1KG',1,NULL,NULL,'2022-10-14 12:33:47',NULL),
(30,'2021-10-14','MASS-H3-003','','','MASSETTE TOTAL','CH-006','Occasion','1KG',1,NULL,NULL,'2022-10-14 12:33:47',NULL),
(32,'2021-10-14','MASS-H3-004','','','MASSETTE TOTAL','CH-006','Occasion','1KG',1,NULL,NULL,'2022-10-14 12:33:47',NULL),
(33,'2021-10-14','MASS-H3-005','','','MASSETTE INGCO','CH-006','Occasion','1.5 KG',1,NULL,NULL,'2022-10-14 12:33:47',NULL),
(34,'2021-10-14','MASS-H3-006','','','MASSETTE INGCO','CH-006','Occasion','1.5KG',1,NULL,NULL,'2022-10-14 12:33:47',NULL),
(35,'2021-10-14','NIV-H3-001','','','NIVEAU INGCO','CH-006','Occasion','60CM',1,NULL,NULL,'2022-10-14 12:33:47',NULL),
(36,'2021-10-14','NIV-H3-002','','','NIVEAU INGCO','CH-006','Occasion','60CM',1,NULL,NULL,'2022-10-14 12:33:47',NULL),
(37,'2021-10-14','NIV-H3-003','','','NIVEAU INGCO','CH-006','Occasion','1M',1,NULL,NULL,'2022-10-14 12:33:47',NULL),
(38,'2021-10-14','NIV-H3-004','','','NIVEAU INGCO','CH-006','Occasion','1M',1,NULL,NULL,'2022-10-14 12:33:47',NULL),
(39,'2021-10-14','CLE_G-H3-001','','','CLE A GRIFFE','CH006','Occasion','18\"',1,NULL,NULL,'2022-10-14 12:33:47',NULL),
(40,'2021-10-14','CLE_G-H3-002','','','CLE A GRIFFE','CH-006','Occasion','18\"',1,NULL,NULL,'2022-10-14 12:33:47',NULL),
(41,'2021-10-14','CLE_G-H3-003','','','CLE A GRIFFE ','CH006','Occasion','14\"',1,NULL,NULL,'2022-10-14 12:33:47',NULL);

/*Table structure for table `post` */

DROP TABLE IF EXISTS `post`;

CREATE TABLE `post` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `post_name` varchar(100) NOT NULL,
  `salary` bigint(100) NOT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

/*Data for the table `post` */

insert  into `post`(`post_id`,`post_name`,`salary`) values 
(1,'Manoeuvre',7000),
(2,'Charpentier',15000),
(3,'Ferailleur',15000),
(4,'Maçon',15000),
(5,'Chef d\'équipe',16000),
(6,'Aide maçon',10000);

/*Table structure for table `role` */

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `role` */

insert  into `role`(`role_id`,`role_name`) values 
(1,'Directeur général'),
(2,'Responsable informatique'),
(3,'Commercial');

/*Table structure for table `tooling` */

DROP TABLE IF EXISTS `tooling`;

CREATE TABLE `tooling` (
  `tooling_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tooling_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `tooling` */

insert  into `tooling`(`tooling_id`,`type`) values 
(1,'Personnel'),
(2,'Commun ');

/*Table structure for table `tools_dailyemployee` */

DROP TABLE IF EXISTS `tools_dailyemployee`;

CREATE TABLE `tools_dailyemployee` (
  `tools_dailyemployee_id` int(11) NOT NULL AUTO_INCREMENT,
  `tool_id` int(11) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `loan_date` date DEFAULT NULL,
  `rendered` int(1) DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `dailyemployee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`tools_dailyemployee_id`)
) ENGINE=MyISAM AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

/*Data for the table `tools_dailyemployee` */

/*Table structure for table `tools_monthlyemployee` */

DROP TABLE IF EXISTS `tools_monthlyemployee`;

CREATE TABLE `tools_monthlyemployee` (
  `tools_monthlyemployee_id` int(11) NOT NULL AUTO_INCREMENT,
  `tool_id` int(11) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `loan_date` date DEFAULT NULL,
  `rendered` int(1) DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `monthlyemployee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`tools_monthlyemployee_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `tools_monthlyemployee` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`user_id`,`login`,`password`,`role_id`) values 
(1,'dgh3m@h3m.com','h3m@dg',1),
(2,'infoh3m@h3m.com','h3m@info',2),
(3,'comh3m@h3m.com','h3m@com',3);

/*Table structure for table `week_presence` */

DROP TABLE IF EXISTS `week_presence`;

CREATE TABLE `week_presence` (
  `weekpresence_id` int(11) NOT NULL AUTO_INCREMENT,
  `month` varchar(50) DEFAULT NULL,
  `first_date` date DEFAULT NULL,
  `last_date` date DEFAULT NULL,
  `nb_present` int(11) DEFAULT NULL,
  `nb_absent` int(11) DEFAULT NULL,
  `total_salary` int(11) DEFAULT NULL,
  `dailyemployee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`weekpresence_id`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

/*Data for the table `week_presence` */

/*Table structure for table `weeks` */

DROP TABLE IF EXISTS `weeks`;

CREATE TABLE `weeks` (
  `week_id` int(11) NOT NULL AUTO_INCREMENT,
  `week_text` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`week_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `weeks` */

insert  into `weeks`(`week_id`,`week_text`) values 
(1,'Semaine 1'),
(2,'Semaine 2'),
(3,'Semaine 3'),
(4,'Semaine 4'),
(5,'Semaine 5');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
