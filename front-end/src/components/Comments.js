import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Comments() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        if (response.data.error) {
          navigate("/login");
          return window.alert("Você não está logado");
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  return (
    <div>
      <div>
        <input
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
          value={newComment}
        />
        <button onClick={addComment}>Comentar</button>
      </div>
      <div>
        <h1>Comentários:</h1>
        {comments.map((comment, key) => {
          return (
            <div className="card col-sm-5">
              <div key={key} className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>{comment.commentBody}</p>
                  <label className="blockquote-footer">
                    {comment.username}
                  </label>
                </blockquote>
              </div>
              <div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Comments;
