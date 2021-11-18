import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  let navigate = useNavigate();

  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("O título é obrigatório!"),
    postText: yup.string().required("O conteúdo do post é obrigatório!"),
    username: yup
      .string()
      .min(3, "Nome de usuário muito curto")
      .max(16, "Nome de usuário muito longo")
      .required("Nome de usuário é obrigarótio"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((response) => {
      navigate("/");
    });
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <label>Título: </label>
          <ErrorMessage name="title" component="span" />
          <Field name="title" placeholder="Título do Post" />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field name="postText" placeholder="Conteúdo do Post" />
          <label>Usuário: </label>
          <ErrorMessage name="username" component="span" />
          <Field name="username" placeholder="Nome de usuário" />
          <button type="submit">Criar Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
