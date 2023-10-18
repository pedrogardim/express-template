import express from "express";
import morgan from "morgan";
import filmsRoute from "./routes/filmsRoutes";

const port = 3000;
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/films", filmsRoute);

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
