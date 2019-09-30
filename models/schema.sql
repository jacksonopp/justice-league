DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

---- database name for app
drop database if exists redlight_db;
create database redlight_db;

CREATE TABLE `private_table` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`email` VARCHAR(100) NOT NULL,
	`password` VARCHAR(100),
	`actual_location` VARCHAR(255) NOT NULL,
	`contact` VARCHAR(255),
	PRIMARY KEY (`id`)
);
