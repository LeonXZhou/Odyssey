SELECT gear_items.name AS gear_item, gear_categories.name AS catergory
FROM gear_items
JOIN gear_categories on gear_items.gear_category_id=gear_categories.id
where gear_categories.id = 1;