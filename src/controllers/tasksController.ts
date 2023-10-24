import { RequestHandler } from "express";

export const getUserTasks: RequestHandler = (req, res) => {
  try {
    res.status(200).json(req.currentUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getTaskById: RequestHandler = (req, res) => {
  try {
    res.status(200).json(req.currentUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createTask: RequestHandler = (req, res) => {
  try {
    res.status(200).json(req.currentUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateTask: RequestHandler = (req, res) => {
  try {
    res.status(200).json(req.currentUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteTask: RequestHandler = (req, res) => {
  try {
    res.status(200).json(req.currentUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
