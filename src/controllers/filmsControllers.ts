import { RequestHandler } from "express";

const randomValue = () => Math.floor(Math.random() * 1e6 + 1e7);
const randomDate = () => new Date(Date.now() * Math.random());

let films = ["Lord of the Rings", "The Hobbit", "Harry Potter"].map(
  (title) => ({
    title,
    views: randomValue(),
    releaseDate: randomDate(),
  })
);

export const getAllFilms: RequestHandler = (req, res) => {
  res.send(films);
};

export const getFilmById: RequestHandler = (req, res) => {
  res.send(films[parseInt(req.params.index)]);
};

export const createFilm: RequestHandler = (req, res) => {
  const newFilm = {
    ...req.body,
    views: randomValue(),
    releaseDate: randomDate(),
  };
  /*  #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                title:"Dune"
            }
    } */
  films.push(newFilm);
  res.send(films);
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
