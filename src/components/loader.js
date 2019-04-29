import React from "react";

export default function loader(props) {
  return (
    <div className="message-container" id={props.id}>
      <div className="spacing">
        <img className="pic" src={props.message.img} alt="user avatar" />
      </div>
      <img
        className="img-upload"
        src="https://www.google.com/images/spin-32.gif?a"
        alt="photo"
      />
      <div className="name">{props.message.name} </div>
    </div>
  );
}
