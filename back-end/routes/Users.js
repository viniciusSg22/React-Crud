const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  bcrypt.compare(username, user.username).then((match) => {
    if (!match) {
      res.json({ error: "Nome de usuário inserido já existe" });
    } else {
      bcrypt.hash(password, 10).then((hash) => {
        Users.create({
          //Users = nome da tabela Create = método sequelize
          username: username, //1°username = nome da coluna, 2° username = const criada na linha 7
          password: hash, //password = nome da coluna, hash = senha que o usuário colocou no form, porém, vários caracteres aleatórios serão inseridos no banco
        });
        res.json("Dados inseridos com sucesso");
      });
    }
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    res.json({ error: "Usuário não existe!" });
  } //Usuário inserido não existe

  bcrypt.compare(password, user.password).then((match) => {
    //Compara a senha que o usuário colocou com a senha que esta no banco de dados
    if (!match) {
      res.json({ error: "Usuário ou senha errados" });
      return;
    } //Se a senha digitada estiver incorreta retorna um erro

    const accessToken = sign(
      { username: user.username, id: user.id },
      "mySecret"
    );
    res.json(accessToken); //Caso passe em todas as validações print essa mensagem
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
