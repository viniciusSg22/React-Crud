import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card/Card";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className="App">
      {listOfPosts.map((value, keyName) => {
        return (
          <div
            onClick={() => {
              navigate(`/readpost/${value.id}`);
            }}
            key={keyName}
          >
            <Card
              title={value.title}
              text={value.postText}
              footer={value.username}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Home;
