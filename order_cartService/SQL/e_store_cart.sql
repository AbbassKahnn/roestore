create database e_commerce_orders
 
create table  shopping_cart (
 shopping_cart_id BIGINT UNSIGNED not null  auto_increment primary key,
 product_id BIGINT unsigned not null,
 user_id BIGINT unsigned not null,
   quantity INT NOT NULL,
cerated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
deleted_at TIMESTAMP
 );
 
create table  shopping_orders (
 shopping_orders_id BIGINT UNSIGNED not null  auto_increment primary key,
 shopping_cart_id BIGINT unsigned not null,
 user_id BIGINT unsigned not null,
  shopping_status BIGINT unsigned not null,
  quantity INT NOT NULL,
  foreign key (shopping_cart_id) references shopping_cart(shopping_cart_id),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
deleted_at TIMESTAMP
 );
