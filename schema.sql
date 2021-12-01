-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'products'
--
-- ---

-- psql rufus -h 127.0.0.1 -d api -f schema.sql

DROP TABLE IF EXISTS related;
DROP TABLE IF EXISTS features;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS skus;
DROP TABLE IF EXISTS styles;
DROP TABLE IF EXISTS products;

CREATE TABLE products (
  product_id INTEGER,
  name VARCHAR(50),
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price INTEGER,
  PRIMARY KEY (product_id)
);

COPY products
FROM '/Users/rufusroffie/hreactor/CatTrap/data_dump/product.csv'
DELIMITER ','
CSV HEADER;

-- ---
-- Table 'product_features'
--
-- ---

CREATE TABLE features (
  id INTEGER,
  productId INTEGER,
  feature VARCHAR(30),
  value VARCHAR(30),
  PRIMARY KEY (id)
);

COPY features
FROM '/Users/rufusroffie/hreactor/CatTrap/data_dump/features.csv'
DELIMITER ','
CSV HEADER;

-- ---
-- Table 'styles'
--
-- ---

CREATE TABLE styles (
  style_id INTEGER,
  productId INTEGER,
  name VARCHAR(30),
  sale_price VARCHAR(10) null,
  original_price INTEGER,
  default_style INTEGER,
  PRIMARY KEY (style_id)
);

COPY styles
FROM '/Users/rufusroffie/hreactor/CatTrap/data_dump/styles.csv'
DELIMITER ','
CSV HEADER;

-- ---
-- Table 'photos'
--
-- ---

CREATE TABLE photos (
  id INTEGER,
  styleId INTEGER,
  url VARCHAR,
  thumbnail_url VARCHAR,
  PRIMARY KEY (id)
);

COPY photos
FROM '/Users/rufusroffie/hreactor/CatTrap/data_dump/photos.csv'
DELIMITER ','
CSV HEADER;

-- ---
-- Table 'skus'
--
-- ---

CREATE TABLE skus (
  id INTEGER,
  styleId INTEGER,
  size VARCHAR(10),
  quantity INTEGER,
  PRIMARY KEY (id)
);

COPY skus
FROM '/Users/rufusroffie/hreactor/CatTrap/data_dump/skus.csv'
DELIMITER ','
CSV HEADER;

-- ---
-- Table 'related'
--
-- ---


CREATE TABLE related (
  id INTEGER,
  current_id INTEGER,
  related_id INTEGER,
  PRIMARY KEY (id)
);

COPY related
FROM '/Users/rufusroffie/hreactor/CatTrap/data_dump/related.csv'
DELIMITER ','
CSV HEADER;

-- ---
-- Foreign Keys
-- ---

ALTER TABLE features ADD FOREIGN KEY (productId) REFERENCES products (product_id);
ALTER TABLE styles ADD FOREIGN KEY (productId) REFERENCES products (product_id);
ALTER TABLE photos ADD FOREIGN KEY (styleId) REFERENCES styles (style_id);
ALTER TABLE skus ADD FOREIGN KEY (styleId) REFERENCES styles (style_id);
ALTER TABLE related ADD FOREIGN KEY (current_id) REFERENCES products (product_id);

CREATE UNIQUE INDEX product_id_index ON products(product_id ASC);

CREATE INDEX product_index1 ON features (productId);
CREATE INDEX product_index2 ON styles (productId);
CREATE INDEX styleIndex1 ON photos (styleId);
CREATE INDEX styleIndex2 ON skus (styleId);
CREATE INDEX product_index3 ON related (current_id);


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `product_features` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `styles` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `skus` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `related` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `products` (`id`,`name`,`slogan`,`description`,`category`,`default_price`) VALUES
-- ('','','','','','');
-- INSERT INTO `product_features` (`id`,`product_id`,`feature`,`value`) VALUES
-- ('','','','');
-- INSERT INTO `styles` (`id`,`productId`,`name`,`sale_price`,`original_price`,`default_style`) VALUES
-- ('','','','','','');
-- INSERT INTO `photos` (`id`,`id_styles`,`thumbnail_url`,`url`) VALUES
-- ('','','','');
-- INSERT INTO `skus` (`id`,`styleId`,`size`,`quantity`) VALUES
-- ('','','','');
-- INSERT INTO `related` (`id`,`current_id`,`related_id`) VALUES
-- ('','','');