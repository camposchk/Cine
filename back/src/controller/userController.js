const User = require("../model/user");

const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

require("dotenv").config();

class UserController {
  static async register(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (!name) 
        return res.status(400).json({ message: "O nome é obrigatório" });

    if (!email)
      return res.status(400).json({ message: "O e-mail é obrigatório" });

    if (!password)
      return res.status(400).json({ message: "A senha é obrigatória" });

    if (password != confirmPassword)
      return res.status(400).json({ message: "As senhas não conferem" });

    const userExist = await User.findOne({ email: email });

    if (userExist)
      return res.status(422).json({ message: "insira outro e-mail" });

    const passwordCrypt = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET
    ).toString();

    const author = new Author({
      name,
      email,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      removedAt: null,
    });

    const user = new User({
      name,
      email,
      password: passwordCrypt,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      removedAt: null,
    });

    try {
      await User.create(user);
      res.status(201).send({ message: "Usuário cadastrado com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Something failed", data: error.message });
    }
  }
}

module.exports = UserController;
