const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.listen(3001, () =>{
    console.log("Servidor rodando na porta 3001")
})