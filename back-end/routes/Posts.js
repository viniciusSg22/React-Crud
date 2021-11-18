const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll(); //Método findAll() traz uma lista de todos os dados que estão presentes no seu banco de dados, é basicamente um "SELECT * FROM <tabela>"
  res.json(listOfPosts);
  //res.send("Hello world");
});

router.get("/readById/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post); //Esse linha está mandando os dados de Post que é tudo que está no body da requisição para o banco, a partir do sequelize
  res.json(post);
});

module.exports = router;
