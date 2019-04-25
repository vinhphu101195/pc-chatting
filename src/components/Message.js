import React from "react";

export default function Message(props) {
  console.log(props.message);

  return (
    <div className="message-container">
      <div className="spacing">
        <div className="pic" />
      </div>
      <div className="message">' hello ' </div>
      <div className="name">Phu Chau </div>
    </div>
  );
}
