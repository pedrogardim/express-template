import express from "express";

import {
  getTaskById,
  getUserTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasksController";

const router = express.Router();

router.get("/", getUserTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
