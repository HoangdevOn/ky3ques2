const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

const url = "mongodb://localhost:27017";

const dbName = "db.js";

app.get("/inventory", (req, res) => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.error("Failed to connect to the database:", err);
      res.status(500).send("Failed to connect to the database");
      return;
    }

    console.log("Connected successfully to the database");

    const db = client.db(dbName);

    const inventoryCollection = db.collection("inventory");

    inventoryCollection.find({}).toArray((err, result) => {
      if (err) {
        console.error("Failed to fetch products:", err);
        res.status(500).send("Failed to fetch products from the database");
        return;
      }

      res.json(result);

      client.close();
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
