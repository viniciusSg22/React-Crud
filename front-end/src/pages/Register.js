import React from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Register() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(3).max(20).required(),
  });

  const onSubmit = (data) => {
    console.log(data);
    axios.post("http:localhost:3001/auth", data).then((response) => {});
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <label>Usuário</label>
          <ErrorMessage name="username" component="span"/>
          <Field name="username" autoComplete="off"/>
          <label>Senha</label>
          {/* <ErrorMessage component="span" /> */}
          <Field name="password" autoComplete="off" type="password"/>
          <button type="submit">Cadastrar</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
