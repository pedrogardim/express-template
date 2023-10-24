import { Handler } from "express";

export const admin: Handler = (req, res, next) => {
  try {
    if (req.currentUser?.role !== "admin") {
      res.status(401).json("Not authorized");
      return;
    }
    next();
  } catch (error) {
    return res.status(401).json("Not authorized");
  }
};
