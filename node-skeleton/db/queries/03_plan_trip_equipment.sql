SELECT gear_items.name AS gear_item, gear_categories.name AS catergory , trips.id , trips.name
FROM gear_items
JOIN gear_categories on gear_items.gear_category_id=gear_categories.id
JOIN trips ON gear_categories.trip_id = trips.id
;

-- { tripid: trip_id , tripsName: trip_name,gear_categories.name: [{gearName  : gear_item.name }

SELECT message_sent, name
FROM emergency_contacts
WHERE message_sent = 'false';


