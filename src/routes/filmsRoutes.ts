import express from "express";

const router = express.Router();

let films = ["Lord of the Rings", "The Hobbit", "Harry Potter"].map(
  (filmTitle) => ({
    title: filmTitle,
    views: Math.floor(Math.random() * 1000000) + 10000000,
    releaseDate: new Date(
      Date.now() - (Math.random() * 100000000000 + 500000000000)
    ),
  })
);

router.get("", (req, res) => {
  res.send(films);
});

router.get("/:index", (req, res) => {
  res.send(films[parseInt(req.params.index)]);
});

router.post("", (req, res) => {
  films.push(req.body);
  res.send(films);
});

router.put("/:index", (req, res) => {
  const index = parseInt(req.params.index);
  films[index] = { ...films[index], ...req.body };
  res.send(films[index]);
});

router.delete("/:index", (req, res) => {
  const index = parseInt(req.params.index);
  films = films.filter((_, i) => i !== index);
  res.send(films);
});

export default router;
