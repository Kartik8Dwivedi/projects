import express from "express";
import cors from "cors";
import connectToDB from "./config/dbConnection.js";
import morgan from "morgan";
import errorMiddleware from "./middlewares/error.middleware.js";
import ApiRoutes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDB();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(morgan("combined"));

app.use("/api", ApiRoutes);

app.all("*", (req, res) => {
  res.status(404).send("<div>OOPS! 404 page not found</div>");
});

app.use(errorMiddleware);

export default app;
