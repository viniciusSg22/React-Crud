import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card/Card";

function ReadPost() {
  let { id } = useParams();

  const [postObject, setPostObject] = useState({})

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/readById/${id}`).then((response) => {
      setPostObject(response.data)
    });
  });

  return (
    <div>
      <Card title={postObject.title} text={postObject.postText} footer={postObject.username}/>
    </div>
  );
}

export default ReadPost;
