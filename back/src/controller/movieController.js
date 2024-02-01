const { Movie } = require("../model/movie");

class MovieController {
  static async register(req, res) {
    const { name, description, genre, rating, launchDate } = req.body;

    if (!name) return res.status(400).json({ message: "O nome é obrigatório" });

    if (!description)
      return res.status(400).json({ message: "O filme deve ter uma descrição" });

    if (!genre)
      return res.status(400).json({ message: "O filme deve possuir um gênero" });

    if (!launchDate)
      return res.status(400).json({ message: "O filme deve ter uma data de lançamento" });

    const movieExist = await Movie.findOne({ name: name, launchDate: launchDate});

    if (movieExist)
      return res.status(422).json({ message: "O filme já existe" });

    const movie = new Movie({
      name,
      description,
      genre,
      rating,
      launchDate
      //   createdAt: Date.now(),
      //   updatedAt: Date.now(),
      //   removedAt: null,
    });

    try {
      await Movie.create(movie);
      res.status(201).send({ message: "Filme cadastrado com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Something failed", data: error.message });
    }
  }

}

module.exports = MovieController;
