const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;

const routes = require("./routes/userRoute");

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());

app.use(express.json());

app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", routes);


app.listen(port, () => {
  console.log(`server running at ${port}`);
});
