require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/connection");
const router = require("./Routes/userRoute");
const PORT = 4000;


app.use(express.json({ limit: "500mb" })); // Parse JSON bodies with increased limit
app.use(express.urlencoded({ extended: true, limit: "500mb" })); // Parse URL-encoded bodies with increased limit
app.use(cors());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server Start at port No: ${PORT}`);
});
