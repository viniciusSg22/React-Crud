const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

//Rotas
const postRouter = require('./routes/Posts');
app.use("/posts", postRouter); 
const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter); 
const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter); 

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
    console.log("Servidor rodando na porta 3001");
  });
});
