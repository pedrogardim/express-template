import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import morgan from "morgan";
import { expressjwt as jwt } from "express-jwt";
import swaggerUi from "swagger-ui-express";

import filmsRoute from "./routes/filmsRoutes";
import usersRoute from "./routes/usersRoutes";
import authRoute from "./routes/authRoutes";

import swaggerDocs from "./config/swagger.json";

import { AppDataSource } from "./config/db";
import { auth } from "./middlewares/auth";

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, { explorer: true })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/films", auth, filmsRoute);
app.use("/users", auth, usersRoute);
app.use("/auth", authRoute);

(async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`App listening on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
