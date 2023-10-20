import { RequestHandler } from "express";

let users = ["Pedro", "Juan", "Ana", "Maria"].map((name, index) => ({
  id: index,
  name: name,
  email: `${name.toLowerCase()}@gmail.com`,
  createdAt: new Date(),
}));

export const getAllUsers: RequestHandler = (req, res) => {
  res.send(users);
};

export const getUserById: RequestHandler = (req, res) => {
  res.send(users.find((user) => user.id === parseInt(req.params.id)));
};

export const createUser: RequestHandler = (req, res) => {
  const newUser = {
    ...req.body,
    id: users.length,
    createdAt: new Date(),
  };
  users.push(newUser);
  res.send(users);

  /*  #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                name: "Pedro",
                email: "me@pedro.com"
            }
    } */
};

export const updateUser: RequestHandler = (req, res) => {
  const reqId = parseInt(req.params.id);
  const userIndex = users.findIndex((e) => e.id === reqId);
  users[userIndex] = { ...users[userIndex], ...req.body };
  res.send(users[userIndex]);

  /*  #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                name: "Pedro",
                email: "me@pedro.com"
            }
    } */
};

export const deleteUser: RequestHandler = (req, res) => {
  const reqId = parseInt(req.params.id);
  users = users.filter(({ id }) => id !== reqId);
  res.send(users);
};
