import React, { useState } from "react";
// import { ErrorMessage, Field, Formik, Form } from "formik";
// import * as Yup from "yup"; //Import tudo que contém em Yup da "biblioteca yup"
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const { setAuthState } = useContext(AuthContext);

  const navigate = useNavigate();

  // const valoresIniciais = {
  //   username: "",
  //   password: "",
  // };

  // const validacoes = Yup.object().shape({
  //   username: Yup.string().min(3).max(15).required(),
  //   password: Yup.string().min(3).max(20).required(),
  // });

  const login = (e) => {
    e.preventDefault(); //APAGAR APÓS TÉRMINO DOS TESTES
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data);
        navigate("/");
        window.location.reload(true);
      }
    });
  };

  return (
    <div className="text-center">
      <div className="form-signin">
        <form onSubmit={login}>
          <h1 className="h3 mb-3 mt-3 fw-normal">Página de Login</h1>
          <div className="form-floating col-sm-5 mx-auto mb-3">
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="form-control"
            />
            <label>Usuário:</label>
          </div>
          <div className="form-floating col-sm-5 mx-auto mb-3">
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="form-control"
            />
            <label>Senha:</label>
          </div>
          <button type="submit" className="w-25 btn btn-lg btn-primary col-sm-3">Login</button>
          
          {/* <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          /> */}
          
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
    </div>
  );
}

export default Login;
