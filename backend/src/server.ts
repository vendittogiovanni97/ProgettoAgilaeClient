import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import addRouter from "./routes";

dotenv.config();

const port = process.env.PORT;

if (process.env.SESSION_SECRET === undefined) {
  throw new Error("Define SESSION_SECRET");
}

const app = express();

app.use((request, response, next) => {
  console.log(request.method, request.url);
  next();
});

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.use(express.json());

addRouter(app);

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
