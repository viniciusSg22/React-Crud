import React from "react";

const Card = (props) => {
  return (
    <div className="card border-danger mb-3" style={{ maxWidth: "28rem" }}>
      <h5 className="card-header bg-transparent border-danger card-title">
        {props.title}
      </h5>
      <div className="card-body text-dark">
        <p className="card-text">{props.text}</p>
      </div>
      <div className="card-footer bg-transparent border-danger">
        {props.footer}
      </div>
    </div>
  );
};

export default Card;
