import React, { useState } from "react";
// import { ErrorMessage, Field, Formik, Form } from "formik";
// import * as Yup from "yup"; //Import tudo que contém em Yup da "biblioteca yup"
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const valoresIniciais = {
  //   username: "",
  //   password: "",
  // };

  // const validacoes = Yup.object().shape({
  //   username: Yup.string().min(3).max(15).required(),
  //   password: Yup.string().min(3).max(20).required(),
  // });

  // const stopRefresh = (e) => {
  //   e.preventDefault();
  // }

  const login = (e) => {
    e.preventDefault(); //APAGAR APÓS TÉRMINO DOS TESTES
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div>
      <h1>Página de Login</h1>
      <form onSubmit={login}>
        <label>Usuário:</label>
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Senha:</label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>
      {/* <Formik
        initialValues={valoresIniciais}
        validationSchema={validacoes}
        onSubmit={login}
      >
        <Form>
          <label>Usuário</label>
          <ErrorMessage name="username" component="span" />
          <Field
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            autoComplete="off"
          />
          <label>Senha</label>
          <ErrorMessage name="password" component="span" />
          <Field
            name="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            autoComplete="off"
          />
          <button type="submit">Login</button>
        </Form>
      </Formik> */}
    </div>
  );
}

export default Login;
