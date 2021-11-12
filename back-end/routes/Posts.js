const express = require("express");
const router = express.Router();
const { Posts } = require('../models')

router.get("/", async (req, res) => {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
    //res.send("Hello world");
});

router.post("/", async (req, res) => {
    const post = req.body;
    await Posts.create(post); //Esse linha está mandando os dados de Post que é tudo que está no body da requisição para o banco, a partir do sequelize
    res.json(post);
});

module.exports = router;
