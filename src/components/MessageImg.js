import React from "react";

export default function MessageImg(props) {
  return (
    <div className="message-container" id={props.id}>
      <div className="spacing">
        <img className="pic" src={props.message.img} alt="user avatar" />
      </div>
      <img
        className="img-upload"
        src={props.message.imageUrl}
        alt="hinh ng ta dang"
      />
      <div className="name">{props.message.name} </div>
    </div>
  );
}
