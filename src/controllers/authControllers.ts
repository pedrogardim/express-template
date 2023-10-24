import { RequestHandler } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register: RequestHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { TOKEN_KEY } = process.env;

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
      TOKEN_KEY as string
    );

    res.json({ createdUser, token });
  } catch (err) {
    res.json(err);
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { TOKEN_KEY, REFRESH_TOKEN_KEY } = process.env;

    const user = (await User.findOneBy({ email })) as User;

    if (!user) {
      throw "Login Failed";
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    const token = jwt.sign({ user_id: user.id, email }, TOKEN_KEY as string, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
      { user_id: user.id, email },
      REFRESH_TOKEN_KEY as string,
      { expiresIn: "7d" }
    );

    /*  #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    email: "me@pedro.com",
                    password: "1234"
                }
        } */

    res.json(isPasswordCorrect ? { token, refreshToken } : "Login Failed");
  } catch (err) {
    res.json(err);
  }
};

export const refreshToken: RequestHandler = async (req, res) => {
  try {
    const { TOKEN_KEY, REFRESH_TOKEN_KEY } = process.env;
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.sendStatus(403);
    }

    jwt.verify(
      refreshToken,
      REFRESH_TOKEN_KEY as string,
      (err: any, user: any) => {
        console.log(user);
        if (err) return res.sendStatus(403);
        const { email, user_id } = user;

        const accessToken = jwt.sign({ email, user_id }, TOKEN_KEY as string, {
          expiresIn: "15m",
        });

        console.log(accessToken);

        res.json({ accessToken });
        return;
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};
