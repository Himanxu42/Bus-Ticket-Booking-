const { urlencoded } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user");
const busRoutes = require("./routes/bus");
const cityRoutes = require("./routes/city");
const cookieParse = require("cookie-parser");
const PORT = process.env.PORT || 4269;
const DB_URL = process.env.DB_URL;
const morgan = require("morgan");
const cors = require("cors");
const { paymentStore } = require("./utils");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cookieParse());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DATABASE IS CONNECTED!");
  })
  .catch((error) => console.log("DATABASE ISSUE", error));

//start the server
app.listen(PORT, () => {
  console.log(`Server is listening on PORT >> ${PORT}`);
});

//all routes
app.use("/", userRoutes, busRoutes, cityRoutes);


