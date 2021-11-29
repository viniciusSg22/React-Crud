const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });

  // const user = await Users.findOne({ where: { username: username } });

  // bcrypt.compare(username, user.username).then((match) => {
  //   if (!match) {
  //     res.json({ error: "Nome de usuário inserido já existe" });
  //     return
  //   }
  //   bcrypt.hash(password, 10).then((hash) => {
  //     Users.create({
  //       username: username,
  //       password: hash,
  //     });
  //     res.json("Dados inseridos com sucesso");
  //   });
  // }); //ERRO = USERNAME NULL
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    res.json({ error: "Usuário não existe!" });
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      res.json({ error: "Usuário ou senha errados" });
      return;
    }

    const accessToken = sign(
      { username: user.username, id: user.id },
      "mySecret"
    );
    res.json({ token: accessToken, username: username, id: user.id });
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
