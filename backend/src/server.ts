import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import addRouter from "./routes";
import fileUpload = require("express-fileupload");
import path = require("path");

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(fileUpload());
app.use("/public", express.static(path.join(__dirname, "../document")));

app.use((request, response, next) => {
  console.log(request.method, request.url);
  next();
});

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
console.log("CORS origin:", process.env.ORIGIN);

addRouter(app);

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
