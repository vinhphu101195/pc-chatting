import React, { Component } from "react";
import Loader from "./loader";

export default class MessageImg extends Component {
  state = {
    id: this.props.id,
    img: this.props.message.img,
    name: this.props.message.name,
    imageUrl: this.props.message.imageUrl
  };

  render() {
    return (
      <div className="message-container" id={this.state.id}>
        <div className="spacing">
          <img className="pic" src={this.state.img} alt="user avatar" />
        </div>
        <img
          className="img-upload"
          src={this.state.imageUrl}
          alt="hinh ng ta dang"
        />
        <div className="name">{this.state.name} </div>
      </div>
    );
  }
}
