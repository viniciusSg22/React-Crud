import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Comments from "../components/Comments";

function ReadPost() {
  let { id } = useParams();

  const [postObject, setPostObject] = useState({});
  const navigate = useNavigate();

  const obj = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/readById/${id}`).then((response) => {
      setPostObject(response.data);
    });
  }, [id]);

  const deletePost = (id) => {
    if (window.confirm("Você quer realmente deletar esse post???")) {
      axios
        .delete(`http://localhost:3001/posts/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            alert("post deletado");
            navigate("/");
          }
        });
    } else {
      alert("O post não foi deletado!");
    }
  };

  const editPost = (option) => {
    if (option === "title") {
      let newTitle = prompt("Digite o novo título");
      if (newTitle === "") {
        alert("Novo título não pode ser nulo!");
      } else if (newTitle) {
        axios.put(
          "http://localhost:3001/posts/title",
          {
            newTitle: newTitle,
            id: id,
          },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        );
        setPostObject({ ...postObject, title: newTitle });
      }
    } else {
      let newPostText = prompt("Digite o novo texto do post");
      if (newPostText === "") {
        alert("O texto do post não pode ser nulo!");
      } else if (newPostText) {
        axios.put(
          "http://localhost:3001/posts/postText",
          {
            newText: newPostText,
            id: id,
          },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        );
        setPostObject({ ...postObject, postText: newPostText });
      }
    }
  };

  return (
    <div>
      <Card
        title={postObject.title}
        text={postObject.postText}
        footer={postObject.username}
      />

      {obj?.username === postObject.username && (
        <div>
          <button
            onClick={() => deletePost(postObject.id)}
            className="btn btn-danger"
          >
            Delete Post
          </button>
          <button onClick={() => editPost("title")} className="btn btn-primary">
            Editar Título
          </button>
          <button onClick={() => editPost("body")} className="btn btn-primary">
            Editar Texto
          </button>
        </div>
      )}
      <Comments />
    </div>
  );
}

export default ReadPost;
