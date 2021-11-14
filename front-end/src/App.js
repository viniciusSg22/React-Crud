import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/createpost">Criar um Post</Link>
        <Link to="/">Página Inicial</Link>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/createpost" element={<CreatePost/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;