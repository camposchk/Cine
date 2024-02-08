const { Movie } = require("../model/movie");
const UserController = require("./userController");
const moment = require('moment');


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

      const upper = name.toUpperCase();


    const movie = new Movie({
      name: upper,
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

  static async getAll(req, res){
    const movies = await Movie.find();
    return res.status(200).send(movies);  
  }

  static async getById(req,res){
    try {
        const movie = await Movie.findById(req.params.id);
        if(!movie) 
            return res.status(404).send({message: 'Movie nao encontrado'});
        
        return res.status(200).send(movie);
    } catch (error) {
        throw error;
    }
}

  static async rating(req, res) {
    const { idMovie, idUser } = req.params;
    const { stars } = req.body;

    const user = await UserController.getById(idUser);

    if (!user)
        return res.status(400).send({ message: "id do usuário não existe" });


    try {
        const movies = await Movie.findById(idMovie);
        if (!movies) {
            return res.status(404).send({ message: "Filme não encontrado" });
        }
        const userRating = { idUser, stars };

        if(movies.rating.some(rating => rating.idUser === idUser)) {
        
          const index = movies.rating.findIndex(rating => rating.idUser === idUser);
          if (index !== -1) {
              movies.rating[index].stars = stars;
              await movies.save();
              return res.status(400).send({ message: "Avaliação atualizada!" });
          }
        } else {

            if (stars >= 1 && stars <= 5) {
                movies.rating.push(userRating);
                await movies.save();
                return res.status(200).send();
            } else {
                return res.status(400).send({ message: "O valor do review deve estar entre 1 e 5" });
            }
        }


    } catch (error) {
       
        return res.status(500).send({ error: "Falha ao avaliar", data: error.message })
    }
};


}

module.exports = MovieController;
