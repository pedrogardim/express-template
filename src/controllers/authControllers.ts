import { RequestHandler } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    const token = jwt.sign(
      { user_id: createdUser.id, email },
      process.env.TOKEN_KEY as string
    );

    res.json({ createdUser, token });
  } catch (err) {
    res.json(err);
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = (await User.findOneBy({ email })) as User;

    if (!user) {
      throw "Login Failed";
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    const token = jwt.sign(
      { user_id: user.id, email },
      process.env.TOKEN_KEY as string,
      { expiresIn: "1h" }
    );
    /*  #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    email: "me@pedro.com",
                    password: "1234"
                }
        } */

    res.json(isPasswordCorrect ? token : "Login Failed");
  } catch (err) {
    res.json(err);
  }
};
