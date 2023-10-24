import { Handler } from "express";
import jwt from "jsonwebtoken";

export const auth: Handler = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] as string;
    const tokenDecoded = jwt.verify(token, process.env.TOKEN_KEY as string);
    res.locals.user = tokenDecoded;
    next();
  } catch (error) {
    return res.status(401).json("Not authorized");
  }
};
