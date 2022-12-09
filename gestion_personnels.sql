-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 01 déc. 2022 à 12:42
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestion_personnels`
--

-- --------------------------------------------------------

--
-- Structure de la table `cantine`
--

DROP TABLE IF EXISTS `cantine`;
CREATE TABLE IF NOT EXISTS `cantine` (
  `id_cantine` int(11) NOT NULL AUTO_INCREMENT,
  `month` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `nb_people` int(11) DEFAULT NULL,
  `total_kapoka_vary` float DEFAULT NULL,
  `total_budget_vary` int(11) DEFAULT NULL,
  `total_kapoka_voamaina` float DEFAULT NULL,
  `total_budget_voamaina` int(11) DEFAULT NULL,
  `total_depense` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_cantine`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `common_tools`
--

DROP TABLE IF EXISTS `common_tools`;
CREATE TABLE IF NOT EXISTS `common_tools` (
  `tool_id` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_date` date DEFAULT NULL,
  `vendor` varchar(255) NOT NULL,
  `num_fact` varchar(255) NOT NULL,
  `identification_number` varchar(50) DEFAULT NULL,
  `article_name` varchar(50) DEFAULT NULL,
  `statue` varchar(50) DEFAULT NULL,
  `historical` text,
  `material_number` int(11) DEFAULT NULL,
  `tooling_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`tool_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `conge`
--

DROP TABLE IF EXISTS `conge`;
CREATE TABLE IF NOT EXISTS `conge` (
  `conge_id` int(11) NOT NULL AUTO_INCREMENT,
  `monthlyemployee_id` int(11) NOT NULL,
  `conge_motif` varchar(255) NOT NULL,
  `start_conge` date DEFAULT NULL,
  `end_conge` date DEFAULT NULL,
  `number_days` float DEFAULT NULL,
  `conge_before_request` float DEFAULT NULL,
  `new_solde_conge` float DEFAULT NULL,
  `visa_rh` varchar(50) DEFAULT NULL,
  `approval_direction` varchar(50) DEFAULT NULL,
  `lastDay` date DEFAULT NULL,
  PRIMARY KEY (`conge_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `contrat`
--

DROP TABLE IF EXISTS `contrat`;
CREATE TABLE IF NOT EXISTS `contrat` (
  `contrat_id` int(11) NOT NULL AUTO_INCREMENT,
  `id` int(11) NOT NULL,
  `type_contrat` varchar(255) NOT NULL,
  `evaluation` varchar(255) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `start_motif` varchar(255) NOT NULL,
  `sanction` varchar(255) NOT NULL,
  PRIMARY KEY (`contrat_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `contrat_monthly`
--

DROP TABLE IF EXISTS `contrat_monthly`;
CREATE TABLE IF NOT EXISTS `contrat_monthly` (
  `contrat_id` int(11) NOT NULL AUTO_INCREMENT,
  `id` int(11) NOT NULL,
  `type_contrat` varchar(255) NOT NULL,
  `evaluation` varchar(255) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `start_motif` varchar(255) NOT NULL,
  `sanction` varchar(255) NOT NULL,
  PRIMARY KEY (`contrat_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `daily_employee`
--

DROP TABLE IF EXISTS `daily_employee`;
CREATE TABLE IF NOT EXISTS `daily_employee` (
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
  `hiring_date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `remarque` text,
  `par` varchar(50) NOT NULL,
  PRIMARY KEY (`dailyemployee_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `daily_presence`
--

DROP TABLE IF EXISTS `daily_presence`;
CREATE TABLE IF NOT EXISTS `daily_presence` (
  `dailypresence_id` int(11) NOT NULL AUTO_INCREMENT,
  `weekpresence_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `presence_salary` varchar(50) DEFAULT NULL,
  `par` varchar(50) DEFAULT NULL,
  `dailyemployee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`dailypresence_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `days`
--

DROP TABLE IF EXISTS `days`;
CREATE TABLE IF NOT EXISTS `days` (
  `day_id` int(11) NOT NULL AUTO_INCREMENT,
  `day_text` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`day_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `days`
--

INSERT INTO `days` (`day_id`, `day_text`) VALUES
(1, 'Lundi'),
(2, 'Mardi'),
(3, 'Mercredi'),
(4, 'Jeudi'),
(5, 'Vendredi'),
(6, 'Samedi'),
(7, 'Dimanche');

-- --------------------------------------------------------

--
-- Structure de la table `history_tool`
--

DROP TABLE IF EXISTS `history_tool`;
CREATE TABLE IF NOT EXISTS `history_tool` (
  `history_tool_id` int(11) NOT NULL AUTO_INCREMENT,
  `id` int(11) NOT NULL,
  `date_transfert` date NOT NULL,
  `lieu_transfert` varchar(255) NOT NULL,
  `etat` varchar(255) NOT NULL,
  `observation` varchar(255) NOT NULL,
  PRIMARY KEY (`history_tool_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `monthlyweek_presence`
--

DROP TABLE IF EXISTS `monthlyweek_presence`;
CREATE TABLE IF NOT EXISTS `monthlyweek_presence` (
  `monthlyweekpresence_id` int(11) NOT NULL AUTO_INCREMENT,
  `month` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `nb_present` int(11) DEFAULT NULL,
  `nb_absent` int(11) DEFAULT NULL,
  `total_advance` int(11) DEFAULT NULL,
  `total_salary` int(11) DEFAULT NULL,
  `validation` varchar(50) DEFAULT NULL,
  `monthlyemployee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`monthlyweekpresence_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `monthly_employee`
--

DROP TABLE IF EXISTS `monthly_employee`;
CREATE TABLE IF NOT EXISTS `monthly_employee` (
  `monthlyemployee_id` int(11) NOT NULL AUTO_INCREMENT,
  `matricule` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `cin` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `contact` varchar(50) DEFAULT NULL,
  `group` varchar(50) DEFAULT NULL,
  `post_occupe` varchar(255) DEFAULT NULL,
  `salary` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `code_chantier` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `hiring_date` datetime DEFAULT NULL,
  `motif` text,
  `ostie_num` varchar(50) DEFAULT NULL,
  `cnaps_num` varchar(50) DEFAULT NULL,
  `par` varchar(50) NOT NULL,
  PRIMARY KEY (`monthlyemployee_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `monthly_employee`
--

INSERT INTO `monthly_employee` (`monthlyemployee_id`, `matricule`, `firstname`, `lastname`, `cin`, `address`, `contact`, `group`, `post_occupe`, `salary`, `status`, `code_chantier`, `category`, `hiring_date`, `motif`, `ostie_num`, `cnaps_num`, `par`) VALUES
(1, '001-H/AD', 'ANDRY NOTAHIANA', 'MIARIVOLA', NULL, '', '', 'BTP', 'COMMERCIAL', 700000, 'Actif', '', 'HHHG', NULL, NULL, '', '', 'Directeur général le 24-11-2022'),
(2, '003-H/AD', 'ANDRIATSIFALAMBOARIVELO', 'TOJO FANIRY', NULL, '', '', 'Parapharmaceutique', 'INFORMATICIEN', 800000, 'Actif', '', '', '2022-10-01 00:00:00', NULL, '', '', 'Directeur général le 24-11-2022'),
(3, '004-H/AD', 'RAMILISON', 'HAJASOA', NULL, '', '', 'Parapharmaceutique', 'COMPTABLE', 800000, 'Actif', '', '', '2022-10-01 00:00:00', NULL, '', '', 'Directeur général le 24-11-2022'),
(4, '005-H/AD', 'RAMILISON', 'Andrianiaina', NULL, '', '', 'Parapharmaceutique', 'CONTROLEUR', 700000, 'Actif', '', '', '2022-10-01 00:00:00', NULL, '', '', 'Directeur général le 24-11-2022');

-- --------------------------------------------------------

--
-- Structure de la table `monthly_presence`
--

DROP TABLE IF EXISTS `monthly_presence`;
CREATE TABLE IF NOT EXISTS `monthly_presence` (
  `monthlypresence_id` int(11) NOT NULL AUTO_INCREMENT,
  `monthlyemployee_id` int(11) DEFAULT NULL,
  `absence_reason` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  `number_days_absence` float DEFAULT NULL,
  `visa_rh` varchar(50) DEFAULT NULL,
  `approval_direction` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`monthlypresence_id`)
) ENGINE=MyISAM AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `monthly_presence`
--

INSERT INTO `monthly_presence` (`monthlypresence_id`, `monthlyemployee_id`, `absence_reason`, `start_date`, `return_date`, `number_days_absence`, `visa_rh`, `approval_direction`) VALUES
(0, NULL, NULL, NULL, NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `monthly_salary`
--

DROP TABLE IF EXISTS `monthly_salary`;
CREATE TABLE IF NOT EXISTS `monthly_salary` (
  `monthlysalary_id` int(11) NOT NULL AUTO_INCREMENT,
  `month` varchar(50) NOT NULL,
  `monthlypresence_id` int(11) NOT NULL,
  `monthlyemployee_id` int(11) NOT NULL,
  `number_work` float NOT NULL,
  `montant_supplementaire` int(11) NOT NULL,
  `absence` float NOT NULL,
  `prime` int(11) NOT NULL,
  `conge` int(11) NOT NULL,
  `indeminite_transport` int(11) NOT NULL,
  `autres_indeminités` int(11) NOT NULL,
  `salary_brut` float NOT NULL,
  `ostie_part_employee` float NOT NULL,
  `cnaps_part_employee` float NOT NULL,
  `montant_heure_imposable` float NOT NULL,
  `irsa` float NOT NULL,
  `montant_non_imposable` int(11) NOT NULL,
  `avance_quinzaine` int(11) NOT NULL,
  `avance_speciale` int(11) NOT NULL,
  `enfant_charge` int(11) NOT NULL,
  `autres_deductions` int(11) NOT NULL,
  `salary_net` float NOT NULL,
  `ostie_part_patronale` float NOT NULL,
  `cnaps_part_patronale` float NOT NULL,
  `fmpf` float NOT NULL,
  PRIMARY KEY (`monthlysalary_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `permission`
--

DROP TABLE IF EXISTS `permission`;
CREATE TABLE IF NOT EXISTS `permission` (
  `permission_id` int(11) NOT NULL AUTO_INCREMENT,
  `monthlyemployee_id` int(11) NOT NULL,
  `date_permission` date NOT NULL,
  `permission_reason` varchar(255) NOT NULL,
  `start_hour_time` varchar(10) NOT NULL,
  `start_minute_time` varchar(10) NOT NULL,
  `return_hour_time` varchar(10) NOT NULL,
  `return_minute_time` varchar(10) NOT NULL,
  `number_time_permission` varchar(10) DEFAULT NULL,
  `permission_hour_before_request` varchar(10) DEFAULT NULL,
  `permission_minute_before_request` varchar(10) NOT NULL,
  `new_solde_permission` varchar(10) DEFAULT NULL,
  `visa_rh` varchar(50) DEFAULT NULL,
  `approval_direction` varchar(50) DEFAULT NULL,
  `par` varchar(50) NOT NULL,
  PRIMARY KEY (`permission_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `personnal_tools`
--

DROP TABLE IF EXISTS `personnal_tools`;
CREATE TABLE IF NOT EXISTS `personnal_tools` (
  `tool_id` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_date` date DEFAULT NULL,
  `identification_number` varchar(50) DEFAULT NULL,
  `vendor` varchar(255) DEFAULT NULL,
  `invoice_number` varchar(255) DEFAULT NULL,
  `article_name` varchar(50) DEFAULT NULL,
  `statue` varchar(50) DEFAULT NULL,
  `material_number` int(11) DEFAULT NULL,
  `responsable` varchar(50) DEFAULT NULL,
  `tooling_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`tool_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `post_name` varchar(100) NOT NULL,
  `salary` bigint(100) NOT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `post`
--

INSERT INTO `post` (`post_id`, `post_name`, `salary`) VALUES
(1, 'Manoeuvre', 7000),
(2, 'Charpentier', 15000),
(3, 'Ferailleur', 15000),
(4, 'Maçon', 15000),
(5, 'Chef d\'équipe', 16000),
(6, 'Aide maçon', 10000);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`role_id`, `role_name`) VALUES
(1, 'Directeur général'),
(2, 'Dep_Info'),
(3, 'Manampisoa'),
(5, 'Voaratiana');

-- --------------------------------------------------------

--
-- Structure de la table `salary_prestataire`
--

DROP TABLE IF EXISTS `salary_prestataire`;
CREATE TABLE IF NOT EXISTS `salary_prestataire` (
  `salary_provider_id` int(11) NOT NULL AUTO_INCREMENT,
  `id` int(11) NOT NULL,
  `date_paiement` date NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `salary` int(11) NOT NULL,
  PRIMARY KEY (`salary_provider_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `service_provider`
--

DROP TABLE IF EXISTS `service_provider`;
CREATE TABLE IF NOT EXISTS `service_provider` (
  `provider_id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `cin` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact` varchar(15) DEFAULT NULL,
  `start_contract` date DEFAULT NULL,
  `end_contract` date DEFAULT NULL,
  `number_days` int(11) DEFAULT NULL,
  `post_occupe` varchar(255) DEFAULT NULL,
  `salary` int(11) DEFAULT NULL,
  PRIMARY KEY (`provider_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `situation_familiale`
--

DROP TABLE IF EXISTS `situation_familiale`;
CREATE TABLE IF NOT EXISTS `situation_familiale` (
  `family_id` int(11) NOT NULL AUTO_INCREMENT,
  `name_conjoint` varchar(255) NOT NULL,
  `number_child` int(11) NOT NULL,
  `monthlyemployee_id` int(11) NOT NULL,
  PRIMARY KEY (`family_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `tooling`
--

DROP TABLE IF EXISTS `tooling`;
CREATE TABLE IF NOT EXISTS `tooling` (
  `tooling_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tooling_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `tooling`
--

INSERT INTO `tooling` (`tooling_id`, `type`) VALUES
(1, 'Personnel'),
(2, 'Commun ');

-- --------------------------------------------------------

--
-- Structure de la table `tools_dailyemployee`
--

DROP TABLE IF EXISTS `tools_dailyemployee`;
CREATE TABLE IF NOT EXISTS `tools_dailyemployee` (
  `tools_dailyemployee_id` int(11) NOT NULL AUTO_INCREMENT,
  `tool_id` int(11) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `loan_date` date DEFAULT NULL,
  `rendered` int(1) DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `observation` text,
  `dailyemployee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`tools_dailyemployee_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `tools_monthlyemployee`
--

DROP TABLE IF EXISTS `tools_monthlyemployee`;
CREATE TABLE IF NOT EXISTS `tools_monthlyemployee` (
  `tools_monthlyemployee_id` int(11) NOT NULL AUTO_INCREMENT,
  `tool_id` int(11) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `loan_date` date DEFAULT NULL,
  `rendered` int(1) DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `observation` text,
  `monthlyemployee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`tools_monthlyemployee_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `trash`
--

DROP TABLE IF EXISTS `trash`;
CREATE TABLE IF NOT EXISTS `trash` (
  `trash_id` int(11) NOT NULL AUTO_INCREMENT,
  `tool_id` int(11) NOT NULL,
  `purchase_date` date DEFAULT NULL,
  `identification_number` varchar(50) DEFAULT NULL,
  `vendor` varchar(255) DEFAULT NULL,
  `invoice_number` varchar(255) DEFAULT NULL,
  `article_name` varchar(50) DEFAULT NULL,
  `statue` varchar(50) DEFAULT NULL,
  `historical` text,
  `material_number` int(11) DEFAULT NULL,
  `responsable` varchar(50) DEFAULT NULL,
  `tooling_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`trash_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`user_id`, `login`, `password`, `role_id`) VALUES
(1, 'dgh3m@h3m.com', 'h3m@dg', 1),
(2, 'infoh3m@h3m.com', 'h3m@info', 2),
(3, 'manampisoah3m@h3m.com', 'h3m@manampisoa', 3),
(5, 'voaratianah3m@h3m.com', 'h3m@voaratiana', 5);

-- --------------------------------------------------------

--
-- Structure de la table `weeks`
--

DROP TABLE IF EXISTS `weeks`;
CREATE TABLE IF NOT EXISTS `weeks` (
  `week_id` int(11) NOT NULL AUTO_INCREMENT,
  `week_text` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`week_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `weeks`
--

INSERT INTO `weeks` (`week_id`, `week_text`) VALUES
(1, 'Semaine 1'),
(2, 'Semaine 2'),
(3, 'Semaine 3'),
(4, 'Semaine 4'),
(5, 'Semaine 5');

-- --------------------------------------------------------

--
-- Structure de la table `week_presence`
--

DROP TABLE IF EXISTS `week_presence`;
CREATE TABLE IF NOT EXISTS `week_presence` (
  `weekpresence_id` int(11) NOT NULL AUTO_INCREMENT,
  `month` varchar(50) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `nb_present` int(11) DEFAULT NULL,
  `nb_absent` int(11) DEFAULT NULL,
  `nb_half_day` int(11) DEFAULT NULL,
  `total_salary` int(11) DEFAULT NULL,
  `dailyemployee_id` int(11) DEFAULT NULL,
  `validation` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`weekpresence_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
