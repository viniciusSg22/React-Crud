import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Comments() {
  let { id } = useParams();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

  const addComment = () => {
    axios
      .post("http://localhost:3001/comments", {
        commentBody: newComment,
        PostId: id,
      })
      .then((response) => {
        const commentToAdd = { commentBody: newComment };
        setComments([...comments, commentToAdd]);
        setNewComment("");
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
        {comments.map((comment, key) => {
          return <div key={key}>{comment.commentBody}</div>;
        })}
      </div>
    </div>
  );
}

export default Comments;
