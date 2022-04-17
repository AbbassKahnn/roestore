create table e_commerce_store.product_images (
product_image_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
product_id BIGINT UNSIGNED not null,
image_title VARCHAR(100) NOT NULL,
image VARCHAR(30) NOT NULL,
discription VARCHAR(30) ,
cerated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
deleted_at TIMESTAMP,
foreign key (product_id) references product(product_id)

);

create table e_commerce_store.product (
product_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
title VARCHAR(30) NOT NULL,
discription VARCHAR(30) ,
price VARCHAR(30) ,
quantity VARCHAR(30) ,
color VARCHAR(30) ,
cerated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
deleted_at TIMESTAMP,
);

create table e_commerce_store.product_detail (
product_detail_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
product_id VARCHAR(100) NOT NULL,
product_style VARCHAR(30) NOT NULL,
material VARCHAR(30) ,
brand_name VARCHAR(30) ,
place_of_origin VARCHAR(30) ,
model_number VARCHAR(30) ,
supple_ability VARCHAR(30) ,
cerated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
deleted_at TIMESTAMP,
foreign key (product_id) references product(product_id)

);
