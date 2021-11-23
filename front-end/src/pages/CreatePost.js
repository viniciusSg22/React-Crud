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
          <h1 className="h3 mb-3 mt-3 fw-normal">Criar Post</h1>
          <div className="col-sm-5 mx-auto mb-3">
            <label>Título: </label>
            <ErrorMessage name="title" component="span" className="px-1"/>
            <Field
              name="title"
              placeholder="Título do Post"
              className="form-control"
            />
          </div>
          <div className="col-sm-5 mx-auto mb-3">
            <label>Post: </label>
            <ErrorMessage name="postText" component="span" className="px-1"/>
            <Field
              name="postText"
              placeholder="Conteúdo do Post"
              className="form-control"
            />
          </div>
          <div className="col-sm-5 mx-auto mb-3">
            <label>Usuário: </label>
            <ErrorMessage name="username" component="span" className="px-1"/>
            <Field
              name="username"
              placeholder="Nome de usuário"
              className="form-control"
            />
          </div>
          <button
            type="submit"
            className="w-25 btn btn-lg btn-primary col-sm-3"
          >
            Criar Post
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
