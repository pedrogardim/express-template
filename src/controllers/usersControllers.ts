import { RequestHandler } from "express";
import { User } from "../models/User";

export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const films = await User.find({ take: 10 });
    res.json(films);
  } catch (err) {
    res.json(err);
  }
};

export const getUserById: RequestHandler = async (req, res) => {
  try {
    const films = await User.findOne({
      where: { id: parseInt(req.params.id) },
    });
    res.json(films);
  } catch (err) {
    res.json(err);
  }
};

export const createUser: RequestHandler = async (req, res) => {
  try {
    const createdFilm = await User.create(req.body).save();
    /*  #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                username: "Pedro",
                email: "me@pedro.com"
            }
    } */
    res.json(createdFilm);
  } catch (err) {
    res.json(err);
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let film = await User.findOneBy({ id });
    if (!film?.recover) {
      res.json(`Film with id ${id} does't exist`);
      return;
    }
    film = { ...film, ...req.body };
    await User.save(film as User);
    res.json(film);
    /*  #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                username: "Pedro",
                email: "me@pedro.com"
            }
    } */
  } catch (err) {
    res.json(err);
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filmToRemove = await User.delete({ id });
    res.json(filmToRemove);
  } catch (err) {
    res.json(err);
  }
};
