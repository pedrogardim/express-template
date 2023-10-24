import { RequestHandler } from "express";
import { Task } from "../models/task";

export const getUserTasks: RequestHandler = async (req, res) => {
  try {
    const tasks = await Task.findBy({ user_id: req.currentUser?.id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getTaskById: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const task = await Task.findOneBy({ id });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createTask: RequestHandler = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user_id = req.currentUser?.id;
    const createdTask = await Task.create({
      title,
      description,
      user_id,
    }).save();
    res.status(200).json(createdTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateTask: RequestHandler = async (req, res) => {
  try {
    res.status(200).json(req.currentUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteTask: RequestHandler = async (req, res) => {
  try {
    res.status(200).json(req.currentUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
