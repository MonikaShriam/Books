const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Books_TB = require("./server"); // Assuming server.js exports the Books_TB model

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/Books")
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

app.get("/get", (req, res) => {
  Books_TB.find()
    .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((err) => console.log(err));
});

app.post("/add", (req, res) => {
  const { Title, Author, Category, Published_Year } = req.body;
  Books_TB.create({ Title, Author, Category, Published_Year })
    .then((result) => {
      console.log("Created Successfully");
      res
        .status(201)
        .json({ message: "book added successfully", data: result });
    })
    .catch((err) => {
      console.error("Unable to create:", err);
      res.status(500).json({ error: "Failed to add book" });
    });
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  Books_TB.findByIdAndUpdate(id, { Title: req.body.Amount }, { new: true })
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => console.log(err));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  Books_TB.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        console.log("Deleted:", result);
        res.json(result);
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).json({ error: "Failed to delete book" });
    });
});

app.listen(3003, () => console.log("Server is Running"));
