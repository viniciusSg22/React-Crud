import React from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function Header() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="bi bi-list"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarButtonsExample">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link to="/" className="nav-link active">
                  React-Crud
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/" className="nav-link">
                  Página Inicial
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/createpost" className="nav-link">
                  Criar um Post
                </Link>
              </li>
            </ul>

            <div class="d-flex align-items-center">
              <Link to="/login">
                <button type="button" class="btn btn-outline-primary me-2">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button type="button" class="btn btn-primary me-3">
                  Cadastre-se
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
