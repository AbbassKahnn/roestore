create database e_store_cart
 
create table e_store_cart.shopping_cart (
 shopping_cart_id BIGINT UNSIGNED not null  auto_increment primary key,
 product_id BIGINT unsigned not null,
 user_id BIGINT unsigned not null,
cerated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
deleted_at TIMESTAMP
 );
 
create table e_store_cart.shopping_orders (
 shopping_orders_id BIGINT UNSIGNED not null  auto_increment primary key,
 shopping_cart_id BIGINT unsigned not null,
 user_id BIGINT unsigned not null,
  shopping_status BIGINT unsigned not null,
  foreign key (shopping_cart_id) references shopping_cart(shopping_cart_id),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
deleted_at TIMESTAMP
 );
