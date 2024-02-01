const { User } = require("../model/user");

const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

require("dotenv").config();

class UserController {
  static async register(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (!name) return res.status(400).json({ message: "O nome é obrigatório" });

    if (!email)
      return res.status(400).json({ message: "O email é obrigatório" });

    if (!password)
      return res.status(400).json({ message: "A senha é obrigatória" });

    if (password != confirmPassword)
      return res.status(400).json({ message: "As senhas não conferem" });

    const userExist = await User.findOne({ email: email });

    if (userExist)
      return res.status(422).json({ message: "Insira outro e-mail" });

    const passwordCrypt = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET
    ).toString();

    const user = new User({
      name,
      email,
      password: passwordCrypt,
      //   createdAt: Date.now(),
      //   updatedAt: Date.now(),
      //   removedAt: null,
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

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email)
      return res.status(400).json({ message: "O email é obrigatório" });

    if (!password)
      return res.status(400).json({ message: "A senha é obrigatória" });

    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(401).json({ message: "Usuário não encontrado" });
      }

      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET
      ).toString(CryptoJS.enc.Utf8);

      if (password !== decryptedPassword) {
        return res.status(401).json({ message: "Senha incorreta" });
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Login efetuado com sucesso",
        token,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Ocorreu um erro no servidor", data: error.message });
    }
  }
}

module.exports = UserController;
