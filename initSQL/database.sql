-- Adminer 4.7.6 MySQL dump
SET
  NAMES utf8;
SET
  time_zone = '+00:00';
SET
  foreign_key_checks = 0;
SET
  NAMES utf8mb4;
DROP DATABASE IF EXISTS `m152`;
CREATE DATABASE `m152`
  /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */
  /*!80016 DEFAULT ENCRYPTION='N' */;
USE `m152`;
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
    `id` int NOT NULL AUTO_INCREMENT,
    `firstname` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
    `lastname` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
    `email` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `Vote`;
CREATE TABLE `Vote` (
    `id` int NOT NULL AUTO_INCREMENT,
    `titre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
    `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    `upvote` int NOT NULL,
    `downvote` int NOT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
-- 2020-09-10 12:05:25