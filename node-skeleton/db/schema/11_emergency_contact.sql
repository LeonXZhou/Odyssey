DROP TABLE IF EXISTS emergency_contacts CASCADE;
CREATE TABLE emergency_contacts (
  id SERIAL PRIMARY KEY NOT NULL,
  trip_id INTEGER REFERENCES trips(id),
  name VARCHAR(255),
  phone_number VARCHAR(255),
  email VARCHAR(255),
  send_date DATE,
);
