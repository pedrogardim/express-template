import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateFilms1697789879993 } from "../migration/1697789879993-create-films";
import { AddProducerColumn1697796069608 } from "../migration/1697796069608-add-producer-column";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  database: "films_app",
  username: "root",
  password: "1234",
  entities: [],
  synchronize: false,
  logging: true,
  migrations: [CreateFilms1697789879993, AddProducerColumn1697796069608],
});
