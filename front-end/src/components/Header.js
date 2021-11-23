import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
// import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

//Deletar AuthContext - Apagar linhas comentadas

function Header() {
  const [authState, setAuthState] = useState(false);

  function removeToken() {
    localStorage.removeItem("accessToken");
    window.location.reload(true);
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);

  return (
    <div>
      {/* <AuthContext.Provider value={{ authState, setAuthState }}> */}
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
                {!authState && (
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
                {authState && (
                  <button
                    type="button"
                    className="btn btn-outline-primary me-2"
                    onClick={removeToken}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      {/* </AuthContext.Provider> */}
    </div>
  );
}

export default Header;
