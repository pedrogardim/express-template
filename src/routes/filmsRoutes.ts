import express from "express";

import {
  getAllFilms,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilm,
} from "../controllers/filmsControllers";

const router = express.Router();

router.get("/", getAllFilms);
router.get("/:index", getFilmById);
router.post("/", createFilm);
router.put("/:index", updateFilm);
router.delete("/:index", deleteFilm);

export default router;
