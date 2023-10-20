import { RequestHandler } from "express";
import { Film } from "../models/Film";

const randomValue = () => Math.floor(Math.random() * 1e6 + 1e7);
const randomDate = () => new Date(Date.now() * Math.random());

let films = ["Lord of the Rings", "The Hobbit", "Harry Potter"].map(
  (title) => ({
    title,
    views: randomValue(),
    releaseDate: randomDate(),
  })
);

export const getAllFilms: RequestHandler = async (req, res) => {
  try {
    const films = await Film.find({ take: 10 });
    res.send(films);
  } catch (err) {
    res.send(err);
  }
};

export const getFilmById: RequestHandler = async (req, res) => {
  try {
    const films = await Film.findOne({
      where: { id: parseInt(req.params.id) },
    });
    res.send(films);
  } catch (err) {
    res.send(err);
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
    res.send(createdFilm);
  } catch (err) {
    res.send(err);
  }
};

export const updateFilm: RequestHandler = (req, res) => {
  const index = parseInt(req.params.index);
  films[index] = { ...films[index], ...req.body };
  res.send(films[index]);
  /*  #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                title:"Dune"
                releaseDate:"2023-10-19T14:23:54.429Z"
            }
    } */
};

export const deleteFilm: RequestHandler = (req, res) => {
  const index = parseInt(req.params.index);
  films = films.filter((_, i) => i !== index);
  res.send(films);
};
