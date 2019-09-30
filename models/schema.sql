DROP DATABASE IF EXISTS redlight_db;
CREATE DATABASE redlight_db;

DROP DATABASE IF EXISTS greenlight_db;
CREATE DATABASE greenlight_db;

CREATE TABLE public_table
 (
	id int NOT NULL AUTO_INCREMENT,
	fake_name varchar(255) NOT NULL,
	general_location varchar(255) NOT NULL,
	age int,
	about varchar(255) NOT NULL,
	PRIMARY KEY (id)
);
