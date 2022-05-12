create table  product_catagories (
 product_catagories_id BIGINT UNSIGNED not null  auto_increment primary key,
 name VARCHAR(255) not null,
 image longtext,
 description TEXT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 deleted_at TIMESTAMP
 );

create table  product (
product_id BIGINT UNSIGNED not null  auto_increment primary key,
name VARCHAR(100) NOT NULL,
title VARCHAR(30) NOT NULL,
description VARCHAR(30) ,
price VARCHAR(30) ,
quantity VARCHAR(30) ,
color VARCHAR(30) ,
product_catagories_id BIGINT UNSIGNED not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
deleted_at TIMESTAMP,
foreign key (product_catagories_id) references product_catagories(product_catagories_id)
);
 
create table  product_detail (
product_detail_id BIGINT UNSIGNED not null  auto_increment primary key,
product_id BIGINT UNSIGNED NOT NULL,
product_style VARCHAR(30) NOT NULL,
material VARCHAR(30) ,
brand_name VARCHAR(30) ,
place_of_origin VARCHAR(30) ,
model_number VARCHAR(30) ,
supple_ability VARCHAR(30) ,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
deleted_at TIMESTAMP,
foreign key (product_id) references product(product_id)
);
