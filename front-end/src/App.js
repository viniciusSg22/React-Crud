import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Card from "./components/Card/Card";

function App() {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className="App">
      {listOfPosts.map((value, key) => {
        return (
          <div>
            <Card title={value.title} text={value.postText} footer={value.username}/>
          </div>
        )
      })}
    </div>
  );
}

export default App;