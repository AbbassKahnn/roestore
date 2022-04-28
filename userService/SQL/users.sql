create database e_commerce_users;

CREATE TABLE  users (
user_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
user_name VARCHAR(100) NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) ,
email VARCHAR(50) not null,
address VARCHAR(255),
password VARCHAR(255) not null,
cerated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
deleted_at TIMESTAMP
);