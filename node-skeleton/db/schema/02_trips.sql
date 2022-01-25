DROP TABLE IF EXISTS trips CASCADE;


CREATE TABLE trips (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  shared BOOLEAN DEFAULT false,
  creator INTEGER REFERENCES users(id)
);
