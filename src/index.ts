import express from "express";
import morgan from "morgan";
import filmsRoute from "./routes/filmsRoutes";
import usersRoute from "./routes/usersRoutes";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/films", filmsRoute);
app.use("/users", usersRoute);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
