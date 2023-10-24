import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateFilms1697789879993 } from "../migration/1697789879993-create-films";
import { CreateUsers1697807671336 } from "../migration/1697807671336-create-users";
import { CreateGenres1698047081764 } from "../migration/1698047081764-create-genres";
import { CreateFilmGenre1698048067802 } from "../migration/1698048067802-create-film-genre";
import { AddUserFields1698050465772 } from "../migration/1698050465772-add-user-fields";
import { Film } from "../models/Film";
import { User } from "../models/User";
import { Genre } from "../models/Genre";
import { CreateTasks1698146312196 } from "../migration/1698146312196-create-tasks";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  database: "films_app",
  username: "root",
  password: "1234",
  entities: [Film, User, Genre],
  synchronize: false,
  logging: true,
  migrations: [
    CreateFilms1697789879993,
    CreateUsers1697807671336,
    CreateGenres1698047081764,
    CreateFilmGenre1698048067802,
    AddUserFields1698050465772,
    CreateTasks1698146312196
  ],
});
