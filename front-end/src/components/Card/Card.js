import React from "react";

const Card = (props) => {
  return (
    <div class="card border-danger mb-3" style={{ maxWidth: "28rem" }}>
      <h5 class="card-header bg-transparent border-danger card-title">
        {props.title}
      </h5>
      <div class="card-body text-dark">
        <p class="card-text">{props.text}</p>
      </div>
      <div class="card-footer bg-transparent border-danger">
        {props.footer}
      </div>
    </div>
  );
};

export default Card;
