import express from "express";
import cors from "cors";
import connectToDB from "./config/dbConnection.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import { FRONTEND_URL } from "./config/server.config.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectToDB();

app.use(
  cors({
    origin: [FRONTEND_URL],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/", (req, res) => {
  res.send("Web server is up and running");
});

app.use(morgan("combined"));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);

app.all("*", (req, res) => {
  res.status(200).send("<div>OOPS! 404 page not found</div>");
});

app.use(errorMiddleware); 

export default app;
