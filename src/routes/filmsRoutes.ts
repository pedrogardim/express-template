import express from "express";

import {
  getAllFilms,
  getFilm,
  createFilm,
  updateFilm,
  deleteFilm,
} from "../controllers/filmControllers";

const router = express.Router();

router.get("", getAllFilms);
router.get("/:index", getFilm);
router.post("", createFilm);
router.put("/:index", updateFilm);
router.delete("/:index", deleteFilm);

export default router;
