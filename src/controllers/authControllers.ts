import { RequestHandler } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";

export const register: RequestHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      username,
      email,
      password: encryptedPassword,
    }).save();

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

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOneBy({ email });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    /*  #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    email: "me@pedro.com",
                    password: "1234"
                }
        } */

    res.json(isPasswordCorrect ? "Login Successful" : "Login Failed");
  } catch (err) {
    res.json(err);
  }
};
