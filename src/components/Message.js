import React from "react";

export default function Message(props) {
  return (
    <div className="message-container" id={props.id}>
      <div className="spacing">
        <img className="pic" src={props.message.img} alt="user avatar" />
      </div>
      <div className="message">{props.message.text} </div>
      <div className="name">{props.message.name} </div>
    </div>
  );
}
