-- Get trips
-- Returns all [ {} ]
-- Array of “adventure object”
-- All the trip table info for that specific trip
-- All the route info for that specific trip
-- All the stops for that route of that trip

     
 
--  gonna need all the trips table for a specific trip_owners
-- all the routes from that specific trick
-- all stops for that trip
-- trip_owners.trip_id,



-- selects  trip_id |    name    |      description       | start_date |  end_date  linking trip_owners on trips.id
SELECT  trips.name , trips.description , trips.start_date , trips.end_date
FROM trip_owners 
JOIN trips ON trip_owners.trip_id=trips.id;

-- more joins 

SELECT trips.name , trips.description , trips.start_date , trips.end_date 
FROM trip_owners 
JOIN trips ON trip_owners.trip_id=trips.id
JOIN users ON trip_owners.user_id=users.id
WHERE users.id = 1;



-- gets all user info based on  a users id
SELECT users.id AS user_id ,users.first_name , users.last_name  , users.email, trips.id AS trip_id,trips.name AS trips_name, trips.description , stops.id AS stops_id,stops.day AS stop_days, stops.name AS stop_names,stops.type AS stop_types, stops.latitude AS stops_LAT , stops.longitude AS stops_LONG, routes.id AS routes_id,routes.latitude AS routes_LAT,routes.longitude AS routes_LONG,trips.start_date AS trip_start, trips.end_date AS trip_end 
FROM trip_owners 
JOIN trips ON trip_owners.trip_id=trips.id
JOIN routes ON trip_owners.trip_id=routes.trip_id
JOIN stops ON trip_owners.trip_id=stops.route_id
JOIN users ON trip_owners.user_id=users.id
WHERE users.id = 2 
ORDER BY stops.type DESC;

-- single user details
SELECT first_name ,last_name , email FROM users WHERE id =1;
-- single user trip info where id = 1
SELECT trips.name , trips.description , trips.start_date , trips.end_date 
FROM trip_owners 
JOIN trips ON trip_owners.trip_id=trips.id
JOIN users ON trip_owners.user_id=users.id
WHERE users.id = 1;
-- select all stops from a single user
SELECT stops.name AS stop_names , stops.day AS stop_days , stops.longitude AS stops_LONG , stops.latitude AS stops_LAT ,stops.type AS stop_types
    FROM stops
    JOIN routes ON stops.route_id=routes.id
    JOIN trips ON routes.trip_id=trips.id
    WHERE trips.id = 1;
-- select all routes for a single user
SELECT routes.latitude AS routes_LAT,  routes.longitude AS routes_LONG
FROM routes
JOIN trips ON routes.trip_id=trips.id
WHERE trips.id = 1;