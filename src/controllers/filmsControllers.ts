import { RequestHandler } from "express";
import { Film } from "../models/Film";

const randomValue = () => Math.floor(Math.random() * 1e6 + 1e7);
const randomDate = () => new Date(Date.now() * Math.random());

export const getAllFilms: RequestHandler = async (req, res) => {
  try {
    const films = await Film.find({ take: 10 });
    res.json(films);
  } catch (err) {
    res.json(err);
  }
};

export const getFilmById: RequestHandler = async (req, res) => {
  try {
    const films = await Film.findOne({
      where: { id: parseInt(req.params.id) },
    });
    res.json(films);
  } catch (err) {
    res.json(err);
  }
};

export const createFilm: RequestHandler = async (req, res) => {
  try {
    const createdFilm = await Film.create(req.body).save();
    /*  #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                "title": "Dune",
                "producer": "Jon Mac",
                "director": "Jon Doe",
                "release_year": "2020-10-20T10:57:33.815Z"
            }
    } */
    res.json(createdFilm);
  } catch (err) {
    res.json(err);
  }
};

export const updateFilm: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let film = await Film.findOneBy({ id });
    if (!film?.recover) {
      res.json(`Film with id ${id} does't exist`);
      return;
    }
    film = { ...film, ...req.body };
    await Film.save(film as Film);
    res.json(film);
    /*  #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
               "title": "Dune",
               "producer": "Jon Mac",
               "director": "Jon Doe",
               "release_year": "2020-10-20T10:57:33.815Z"
            }
    } */
  } catch (err) {
    res.json(err);
  }
};

export const deleteFilm: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filmToRemove = await Film.delete({ id });
    res.json(filmToRemove);
  } catch (err) {
    res.json(err);
  }
};
