const express = require("express");
const app = express();
app.use(express.json());

const db = require("./models");

//Rotas
const postRouter = require('./routes/Posts');
app.use("/posts", postRouter); //localhost:3001/posts irá exibir a mensagem "Hello World"

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
  });
});
