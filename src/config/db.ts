import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateFilms1697789879993 } from "../migration/1697789879993-create-films";
import { CreateUsers1697807671336 } from "../migration/1697807671336-create-users";
import { Film } from "../models/Film";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  database: "films_app",
  username: "root",
  password: "1234",
  entities: [Film],
  synchronize: false,
  logging: true,
  migrations: [CreateFilms1697789879993, CreateUsers1697807671336],
});
