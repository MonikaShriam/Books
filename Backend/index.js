const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Books_TB = require("./server"); // Assuming server.js exports the Books_TB model

require("dotenv").config(); // ✅ Load env variables

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Books", // ✅ Use dbName if not specified in URI
  })
  .then(() => console.log("MongoDB Connection Successful"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

app.get("/get", (req, res) => {
  Books_TB.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
});

app.post("/add", (req, res) => {
  const { Title, Author, Category, Published_Year } = req.body;
  Books_TB.create({ Title, Author, Category, Published_Year })
    .then((result) => {
      res
        .status(201)
        .json({ message: "Book added successfully", data: result });
    })
    .catch((err) => {
      console.error("Unable to create:", err);
      res.status(500).json({ error: "Failed to add book" });
    });
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { Title } = req.body;
  Books_TB.findByIdAndUpdate(id, { Title }, { new: true })
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json({ error: "Failed to update" }));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  Books_TB.findByIdAndDelete(id)
    .then((result) => {
      if (result) res.json(result);
      else res.status(404).json({ message: "Book not found" });
    })
    .catch((err) => res.status(500).json({ error: "Failed to delete book" }));
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
