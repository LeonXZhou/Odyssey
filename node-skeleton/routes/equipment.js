const express = require("express");
const router = express.Router();
const format = require("pg-format");

function updateCategoryName(db, categoryId, name) {
  const query = `UPDATE gear_categories
  SET name = $1
  WHERE id = $2;`;
  const values = [name, categoryId];
  return db.query(query, values);
}

function formatUpdateItems(items) {
  const itemsName = [];
  const itemsId = [];
  const itemsQuantity = [];
  for (itemKey in items) {
    const item = items[itemKey];
    itemsId.push(itemKey);
    itemsName.push(item.name);
    itemsQuantity.push(item.quantity);
  }
  return { itemsName, itemsId, itemsQuantity };
}

function insertNewItem(db, itemName, itemQuantity, gearCategoryID) {
  const query = `INSERT INTO gear_items (name,quantity,gear_category_id)
              VALUES ($1 ,$2 ,$3);
`;
  const values = [itemName, itemQuantity, gearCategoryID];
  return db.query(query, values);
}

function updateItems(db, itemName, itemId, itemQuantity) {
  console.log("ITEM NAME ITEM NAME", itemName);
  console.log("ITEM ID ITEM ID", itemId);
  console.log("ITEM QUANTITY ITEM QUANTITY", itemQuantity);
  const query = `
  UPDATE gear_items
  SET name = $1,
      quantity = $3
  WHERE id = $2;`;
  const values = [itemName, itemId, itemQuantity];
  return db.query(query, values);
}

function deleteItems(db, item_id) {
  const query = `
  DELETE FROM gear_items
  WHERE id =$1;
 `;
  const values = [item_id];
  return db.query(query, values);
}

module.exports = (db) => {
  router.get("/:trip_id", (req, res) => {
    // if req.session.user_id owns a trip_id
    const query = `SELECT gear_items.name AS gear_item, gear_items.quantity,gear_categories.name AS catergory, trips.id as id , trips.name, gear_categories.id as category_id, gear_items.id as item_id
    FROM gear_items
    FULL OUTER JOIN gear_categories on gear_items.gear_category_id=gear_categories.id
    JOIN trips ON gear_categories.trip_id = trips.id
    WHERE trips.id = $1;`;
    const values = [req.params.trip_id];
    db.query(query, values)
      .then((req) => {
        res.json(req.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:trip_id", (req, res) => {
    console.log("this is the post request", req.body[1].items);
    res.send("success");
  });

  router.post("/delete/:trip_id/:category_id", (req, res) => {
    console.log("this is the delete request");
    const query = `DELETE FROM gear_categories
                  WHERE(trip_id = $1 AND id = $2);`;
    const values = [req.params.trip_id, req.params.category_id];
    console.log(values);
    db.query(query, values)
      .then(() => {
        res.send("success");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/delete/:item_id", (req, res) => {
    console.log("this is the delete request");
    const query = `DELETE FROM gear_items
                  WHERE id=$1;`;
    const values = [req.params.item_id];
    console.log(values);
    db.query(query, values)
      .then(() => {
        res.send("success");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:trip_id/category", (req, res) => {
    const query = `INSERT INTO gear_categories (trip_id , name)
                    VALUES($1,$2)`;
    const values = [req.params.trip_id, req.body.name];
    console.log(values);
    db.query(query, values)
      .then(() => {
        res.send("success");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:trip_id/:category_id", (req, res) => {
    const allQueryPromises = [];
    console.log(req.body);

    const itemsToUpdate = req.body.updateItems;

    allQueryPromises.push(
      updateCategoryName(db, req.params.category_id, req.body.category).then(
        () => {}
      )
    );

    for (const updateItemKey in itemsToUpdate) {
      if (Number(itemsToUpdate[updateItemKey].quantity) !== 0) {
        allQueryPromises.push(
          updateItems(
            db,
            itemsToUpdate[updateItemKey].name,
            updateItemKey,
            itemsToUpdate[updateItemKey].quantity
          )
        );
      } else {
        allQueryPromises.push(deleteItems(db, updateItemKey));
      }
    }

    const newItems = req.body.newItems;

    for (const newItemKey in newItems) {
      if (Number(newItems[newItemKey].quantity) !== 0) {
        allQueryPromises.push(
          insertNewItem(
            db,
            newItems[newItemKey].name,
            newItems[newItemKey].quantity,
            req.params.category_id
          )
        );
      }
    }

    Promise.all(allQueryPromises).then(() => {
      console.log("all inserts worked");
      res.send("success");
    });
  });
  return router;
};
