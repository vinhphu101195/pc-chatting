import React from "react";

export default function Message(props) {
  console.log(props.message);

  return (
    <div className="message-container">
      <div className="spacing">
        <img className="pic" src={props.message.img} alt="user avatar" />
      </div>
      <div className="message">{props.message.text} </div>
      <div className="name">{props.message.name} </div>
    </div>
  );
}
