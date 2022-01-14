-- DROP TABLE IF EXISTS emergency_contacts CASCADE;
-- CREATE TABLE emergency_contacts (
--   id SERIAL PRIMARY KEY NOT NULL,
--   trip_id INTEGER REFERENCES trips(id),
--   name VARCHAR(255),
--   phone_number VARCHAR(255),
--   email VARCHAR(255),
--   send_date DATE
-- );
INSERT INTO emergency_contacts (name,phone_number,email,send_date,trip_id) VALUES ('jeff','123456789','h@h.com',current_timestamp,1);
INSERT INTO emergency_contacts (name,phone_number,email,send_date,trip_id) VALUES ('lorenzo','987654321','ho@ho.com',current_timestamp,1);
INSERT INTO emergency_contacts (name,phone_number,email,send_date,trip_id) VALUES ('steeve','1234598765','he@he.com',current_timestamp,1);
