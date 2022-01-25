-- DROP TABLE IF EXISTS gear_items CASCADE;
-- CREATE TABLE gear_items (
--   id SERIAL PRIMARY KEY NOT NULL,
--   gear_category_id INTEGER REFERENCES gear_categories(id),
--   name VARCHAR(255)
-- );
INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('boots',1,1);
INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('climbing gear',1,4);
INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('gloves',1,2);
INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('tent',2,2);
INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('sleeping bag',2,2);
INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('stove',3,2);
INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('pot',3,2);
INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('pan',3,2);
INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('spatula',3,2);
INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('stove',3,2);
INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('pot',3,2);
INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('pan',3,2);
INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('spatula',3,2);



INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('grill',6,1);
INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('pan',6,1);

INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('sleeping bag',5,1);
INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('tent',5,1);

INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('beanie',4,2);
INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('long sleeve shirt',4,4);
INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('jacket',4,2);

INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('beanie',7,2);
INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('long sleeve shirt',7,4);
INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('jacket',7,2);

INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('sleeping bag',8,1);
INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('tent',8,1);

INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('grill',9,1);
INSERT INTO gear_items (name,gear_category_id,quantity) VALUES ('pan',9,1);
