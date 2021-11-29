import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

function Header() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  const navigate = useNavigate();

  function removeToken() {
    if (window.confirm("Você tem certeza que deseja sair?")) {
      localStorage.clear();
      setAuthState({ username: "", id: 0, status: false });
      navigate("/")
    } else {
      alert("Você ainda está logado!");
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  return (
    <div>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarButtonsExample"
              aria-controls="navbarButtonsExample"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="bi bi-list"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarButtonsExample">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link active">
                    React-Crud
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Página Inicial
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/createpost" className="nav-link">
                    Criar um Post
                  </Link>
                </li>
              </ul>

              <div className="d-flex align-items-center">
                {!authState.status && (
                  <div>
                    <Link to="/login">
                      <button
                        type="button"
                        className="btn btn-outline-primary me-2"
                      >
                        Login
                      </button>
                    </Link>
                    <Link to="/register">
                      <button type="button" className="btn btn-primary me-3">
                        Cadastre-se
                      </button>
                    </Link>
                  </div>
                )}
                {authState.status && (
                  <button
                    type="button"
                    className="btn btn-outline-primary me-2"
                    onClick={removeToken}
                  >
                    Logout
                  </button>
                )}
                <h1>{authState.username}</h1>
              </div>
            </div>
          </div>
        </nav>
      </AuthContext.Provider>
    </div>
  );
}

export default Header;
