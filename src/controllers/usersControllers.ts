import { RequestHandler } from "express";
import { User } from "../models/User";

export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await User.find({ take: 10 });
    res.json(users);
  } catch (err) {
    res.json(err);
  }
};

export const getUserById: RequestHandler = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: parseInt(req.params.id) },
    });
    res.json(user);
  } catch (err) {
    res.json(err);
  }
};

export const createUser: RequestHandler = async (req, res) => {
  try {
    const createdUser = await User.create(req.body).save();
    /*  #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                username: "Pedro",
                email: "me@pedro.com",
                password: "1234"
            }
    } */
    res.json(createdUser);
  } catch (err) {
    res.json(err);
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let user = await User.findOneBy({ id });
    if (!user?.recover) {
      res.json(`User with id ${id} does't exist`);
      return;
    }
    user = { ...user, ...req.body };
    await User.save(user as User);
    res.json(user);
    /*  #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                username: "Pedro",
                email: "me@pedro.com",
                password: "1234"
            }
    } */
  } catch (err) {
    res.json(err);
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userToRemove = await User.delete({ id });
    res.json(userToRemove);
  } catch (err) {
    res.json(err);
  }
};
