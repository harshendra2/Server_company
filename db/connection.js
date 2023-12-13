const mongoose = require("mongoose");

// const DB = process.env.DATABASE;

mongoose
  .connect("mongodb+srv://harsendraraj20:3PhNDGDHb3fxlLEd@cluster0.idcuttr.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("Database connected"))
  .catch((error) => {
    console.log("Error:", error);
  });
