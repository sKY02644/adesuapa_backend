-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 15, 2023 at 07:31 PM
-- Server version: 8.0.27
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `adesuapa`
--

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `status` enum('active','blocked','pending') DEFAULT NULL,
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`name`, `code`, `status`, `id`, `created_at`, `updated_at`) VALUES
('Ghana', '+233', 'active', '3b1a4b9c-7d34-11ed-8e25-00d86185050c', '2022-12-16 11:23:22', '2022-12-16 11:23:22'),
('Nigeria', '+234', 'blocked', '3b1a6ff7-7d34-11ed-8e25-00d86185050c', '2022-12-16 11:23:22', '2022-12-16 11:23:22'),
('Togo', '+228', 'blocked', '3b1a8e92-7d34-11ed-8e25-00d86185050c', '2022-12-16 11:24:22', '2022-12-16 11:24:22');

-- --------------------------------------------------------

--
-- Table structure for table `institutions`
--

CREATE TABLE `institutions` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `category` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `user_type` json DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `sub_category` varchar(10) DEFAULT NULL,
  `users_id_format` varchar(255) DEFAULT NULL,
  `settings` json DEFAULT NULL,
  `status` enum('active','blocked') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `institutions`
--

INSERT INTO `institutions` (`id`, `name`, `category`, `user_type`, `created_at`, `updated_at`, `sub_category`, `users_id_format`, `settings`, `status`) VALUES
('5aff2b15-7c56-11ed-8e25-00d86185050c', 'Basic School/JHS', 'jhs_shs', '{\"admin\": \"A\", \"parent\": \"P\", \"student\": \"S\", \"teacher\": \"T\"}', '2022-12-15 08:55:02', '2022-12-15 08:55:02', 'A', '[[initials]]-[[year]][[total]][[type]]', NULL, 'active'),
('5aff4717-7c56-11ed-8e25-00d86185050c', 'Senior High School', 'jhs_shs', '{\"admin\": \"A\", \"parent\": \"P\", \"student\": \"S\", \"teacher\": \"T\"}', '2022-12-15 08:55:02', '2022-12-15 08:55:02', 'B', '[[initials]]-[[year]][[total]][[type]]', NULL, 'active'),
('5aff61c7-7c56-11ed-8e25-00d86185050c', 'NVTI/Training Centers', 'university_collage', '{\"admin\": \"A\", \"student\": \"S\", \"teacher\": \"T\", \"lecturer\": \"L\"}', '2022-12-15 08:55:56', '2022-12-15 08:55:56', 'C', '[[year]][[total]][[type]]', NULL, 'blocked'),
('5aff7b24-7c56-11ed-8e25-00d86185050c', 'Universities', 'university_collage', '{\"admin\": \"A\", \"student\": \"S\", \"teacher\": \"T\", \"lecturer\": \"L\"}', '2022-12-15 08:56:11', '2022-12-15 08:56:11', 'D', '[[year]][[total]][[type]]', NULL, 'blocked');

-- --------------------------------------------------------

--
-- Table structure for table `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` enum('active','blocked') DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `sequelize_meta`
--

CREATE TABLE `sequelize_meta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelize_meta`
--

INSERT INTO `sequelize_meta` (`name`) VALUES
('20221211132935-create-users.js'),
('20221211132955-create-countries.js'),
('20221211133005-create-payment_methods.js'),
('20221211141046-create-subscriptions.js'),
('20221211160358-create-institutions.js'),
('20221214145316-create-settings.js'),
('20221214145326-add-foreign-keys.js'),
('20230102142223-temp_user_details.js'),
('20230102172611-remove_column_from_settings.js'),
('20230103162930-add_column_to_institution.js'),
('20230103170441-add_column_to_institut.js'),
('20230106132123-add-column-to-institution.js'),
('20230107110522-add-column-to-institution.js'),
('20230107141253-add-column-to-institution.js');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` json NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `created_at`, `updated_at`) VALUES
('3305e820-8ac2-11ed-826b-00d86185050c', 'paystack', '{\"initialize\": {\"url\": \"https://api.paystack.co/transaction/initialize\", \"method\": \"post\", \"content_type\": \"application/json\"}}', '2023-01-02 17:19:02', '2023-01-02 17:19:02'),
('8a6c99c2-8cdb-11ed-826b-00d86185050c', 'run_main_migrations', '{\"value\": true}', '2023-01-05 09:29:30', '2023-01-05 09:29:30'),
('97dff3c9-8b83-11ed-826b-00d86185050c', 'user_type', '{\"admin\": \"A\", \"parent\": \"P\", \"student\": \"S\", \"teacher\": \"T\"}', '2022-12-14 21:28:54', '2022-12-14 21:28:54'),
('a2badbe2-913e-11ed-826b-00d86185050c', 'email_configs', '[{\"env\": \"production\", \"type\": \"smtp\", \"configs\": {\"host\": \"server215.web-hosting.com\", \"port\": 465, \"user\": \"vbitiejy\", \"service\": \"smtp\", \"password\": \"bNJMme9Lt3qb7jA\"}, \"is_active\": true}, {\"env\": \"production\", \"type\": \"gmail\", \"configs\": {\"host\": \"***\", \"port\": \"***\", \"user\": \"***\", \"service\": \"***\", \"password\": \"***\"}, \"is_active\": false}, {\"env\": \"development\", \"type\": \"smtp\", \"configs\": {\"host\": \"smtp.mailtrap.io\", \"port\": 2525, \"user\": \"701c872e95681a\", \"service\": \"smtp\", \"password\": \"0c19f4a2173ef9\"}, \"is_active\": true}]', '2023-01-10 23:19:50', '2023-01-10 23:19:50'),
('aed478e0-8ae2-11ed-826b-00d86185050c', 'currency', '{\"rate\": {\"value\": 15, \"is_active\": true}, \"types\": [{\"label\": \"GHS\", \"value\": 100, \"status\": \"active\"}, {\"label\": \"NGN\", \"value\": 100, \"status\": \"inactive\"}, {\"label\": \"ZAR\", \"value\": 100, \"status\": \"inactive\"}, {\"label\": \"USD\", \"value\": 100, \"status\": \"inactive\"}]}', '2023-01-02 20:36:29', '2023-01-02 20:36:29'),
('b875b204-8b9a-11ed-826b-00d86185050c', 'databases', '[{\"type\": \"jhs_shs\", \"configs\": {\"test\": {\"host\": \"localhost\", \"port\": 3306, \"dialect\": \"mysql\", \"database\": \"adesuapa_jhs_shs\", \"password\": \"01161391D@Maymens\", \"username\": \"root\"}, \"production\": {\"host\": \"localhost\", \"port\": 3306, \"dialect\": \"mysql\", \"database\": \"adesuapa_jhs_shs\", \"password\": \"01161391D@Maymens\", \"username\": \"root\"}, \"development\": {\"host\": \"localhost\", \"port\": 3306, \"dialect\": \"mysql\", \"database\": \"adesuapa_jhs_shs\", \"password\": \"01161391D@Maymens\", \"username\": \"root\"}}, \"db_name\": \"adesuapa_jhs_shs\", \"run_migrations\": true}, {\"type\": \"university_collage\", \"configs\": {\"test\": {\"host\": \"localhost\", \"port\": 3306, \"dialect\": \"mysql\", \"database\": \"adesuapa_jhs_shs\", \"password\": \"01161391D@Maymens\", \"username\": \"root\"}, \"production\": {\"host\": \"localhost\", \"port\": 3306, \"dialect\": \"mysql\", \"database\": \"adesuapa_jhs_shs\", \"password\": \"01161391D@Maymens\", \"username\": \"root\"}, \"development\": {\"host\": \"localhost\", \"port\": 3306, \"dialect\": \"mysql\", \"database\": \"adesuapa_jhs_shs\", \"password\": \"01161391D@Maymens\", \"username\": \"root\"}}, \"db_name\": \"adesuapa_university_collage\", \"run_migrations\": false}]', '2022-12-14 21:28:54', '2022-12-14 21:28:54'),
('c648d8a2-8ae2-11ed-826b-00d86185050c', 'channels', '[\"card\", \"bank\", \"ussd\", \"qr\", \"mobile_money\", \"bank_transfer\", \"eft\"]', '2022-12-14 21:28:54', '2022-12-14 21:28:54');

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `duration` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `institutions_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`id`, `duration`, `price`, `institutions_id`, `created_at`, `updated_at`) VALUES
('7aad0fed-8c61-11ed-826b-00d86185050c', '1 Month', 30, '5aff2b15-7c56-11ed-8e25-00d86185050c', '2023-01-04 18:49:53', '2023-01-04 18:49:53'),
('7aaf863e-8c61-11ed-826b-00d86185050c', '2 Months', 90, '5aff2b15-7c56-11ed-8e25-00d86185050c', '2023-01-04 18:49:53', '2023-01-04 18:49:53'),
('7ab1c3f5-8c61-11ed-826b-00d86185050c', '3 Months', 150, '5aff2b15-7c56-11ed-8e25-00d86185050c', '2023-01-04 18:49:53', '2023-01-04 18:49:53'),
('7ab1f07a-8c61-11ed-826b-00d86185050c', '1 Year', 500, '5aff2b15-7c56-11ed-8e25-00d86185050c', '2023-01-04 18:49:53', '2023-01-04 18:49:53'),
('7ab21a87-8c61-11ed-826b-00d86185050c', '2 Years', 1000, '5aff2b15-7c56-11ed-8e25-00d86185050c', '2023-01-04 18:49:53', '2023-01-04 18:49:53'),
('ccbc65f9-8e9a-11ed-826b-00d86185050c', '1 Month', 40, '5aff4717-7c56-11ed-8e25-00d86185050c', '2023-01-07 14:50:02', '2023-01-07 14:50:02'),
('ccbefc65-8e9a-11ed-826b-00d86185050c', '3 Months', 120, '5aff4717-7c56-11ed-8e25-00d86185050c', '2023-01-07 14:50:02', '2023-01-07 14:50:02'),
('ccbf25c1-8e9a-11ed-826b-00d86185050c', '1 Year', 240, '5aff4717-7c56-11ed-8e25-00d86185050c', '2023-01-07 14:50:02', '2023-01-07 14:50:02'),
('ccbf4d99-8e9a-11ed-826b-00d86185050c', '2 Years', 480, '5aff4717-7c56-11ed-8e25-00d86185050c', '2023-01-07 14:50:02', '2023-01-07 14:50:02');

-- --------------------------------------------------------

--
-- Table structure for table `temp_users_details`
--

CREATE TABLE `temp_users_details` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `institution_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `selected_institution` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `selected_subscription` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `selected_country` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `login_date_time` datetime DEFAULT NULL,
  `contact` varchar(20) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `role_permission` text,
  `status` tinyint(1) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `country_code` varchar(255) DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `institutions`
--
ALTER TABLE `institutions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `sequelize_meta`
--
ALTER TABLE `sequelize_meta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `institutions_id` (`institutions_id`);

--
-- Indexes for table `temp_users_details`
--
ALTER TABLE `temp_users_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `user_name` (`user_name`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`institutions_id`) REFERENCES `institutions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
