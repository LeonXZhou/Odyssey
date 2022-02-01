SELECT gear_items.name AS gear_item, gear_categories.name AS catergory , trips.id , trips.name
FROM gear_items
JOIN gear_categories on gear_items.gear_category_id=gear_categories.id
JOIN trips ON gear_categories.trip_id = trips.id
;

-- { tripid: trip_id , tripsName: trip_name,gear_categories.name: [{gearName  : gear_item.name }

SELECT message_sent, name
FROM emergency_contacts
WHERE message_sent = 'false';



SELECT emergency_contacts.id , emergency_contacts.trip_id , emergency_contacts.name , emergency_contacts.email
FROM emergency_contacts
JOIN trips ON emergency_contacts.trip_id=trips.id;



SELECT users.first_name , users.last_name , trips.name ,trips.description ,trips.start_date,trips.end_date, emergency_contacts.name AS emergency_contact, emergency_contacts.phone_number AS emergency_contact_phone,emergency_contacts.email AS emergency_contact_email, emergency_contacts.send_date
FROM trip_owners
JOIN  users ON trip_owners.user_id =users.id
JOIN  trips ON trip_owners.trip_id =trips.id
JOIN emergency_contacts ON trip_owners.trip_id =emergency_contacts.trip_id ;


