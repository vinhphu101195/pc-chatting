import React, { Component } from "react";
import firebase from "firebase";
import { withFirebase } from "../components/Firebase";
import Message from "./Message";
import axios from "axios";

class MainChatting extends Component {
  state = {
    authUser: this.props.infor.authUser,
    img: this.props.infor.img,
    name: this.props.infor.name,
    text: "",
    Phu: [],
    id: []
  };

  messageListElement = this.refs.messages;
  messageInputElement = this.refs.message;
  MESSAGE_TEMPLATE = `
    '<div class="message-container">' 
    '<div class="spacing"><div class="pic"></div></div>' 
    '<div class="message" ref="message"></div>' 
    '<div class="name"></div>' 
    "</div>"`;

  submitMessage = (event, dataMessage) => {
    event.preventDefault();
    this.props.firebase.saveMessage(dataMessage);
    this.mainInput.value = "";
  };

  submitFile = event => {
    event.preventDefault();
  };

  handleChange = e => {
    this.setState({
      authUser: this.props.infor.authUser,
      img: this.props.infor.img,
      name: this.props.infor.name,
      [e.target.id]: e.target.value
    });
  };

  componentDidMount() {
    this.props.firebase.loadMessages().onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        var message = change.doc.data();
        var joined = this.state.Phu.concat(message);
        var joined2 = this.state.id.concat(change.doc.id);
        console.log(joined2);
        if (this.state.id.includes(change.doc.id) === false) {
          this.setState({
            id: joined2,
            Phu: joined
          });
        }
      });
    });
  }

  showMessage(messages, id) {
    var result = null;
    if (messages.length > 0) {
      result = messages.map((message, index) => {
        if (this.state.id.includes(id) === false) {
          return (
            <Message
              id={id[index]}
              key={index}
              message={message}
              index={index}
              onDelete={this.onDelete}
            />
          );
        } else {
          return "";
        }
      });
    }
    return result;
  }

  render() {
    return (
      <main className="mdl-layout__content mdl-color--grey-100">
        <div
          id="messages-card-container"
          className="mdl-cell mdl-cell--12-col mdl-grid"
        >
          <div
            id="messages-card"
            className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--6-col-tablet mdl-cell--6-col-desktop"
          >
            <div className="mdl-card__supporting-text mdl-color-text--grey-600">
              <div id="messages" ref="messages">
                {/* <span id="message-filler" /> */}
                {this.showMessage(this.state.Phu, this.state.id)}

                {/* <Message message={this.state.Phu} /> */}
              </div>
              <form id="message-form" action="#">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input
                    ref={ref => (this.mainInput = ref)}
                    className="mdl-textfield__input"
                    type="text"
                    id="text"
                    onChange={this.handleChange}
                  />
                  <label className="mdl-textfield__label">Message...</label>
                </div>
                <button
                  id="submit"
                  type="submit"
                  className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                  onClick={event => this.submitMessage(event, this.state)}
                >
                  Send
                </button>
              </form>
              <form id="image-form" action="#">
                <input
                  id="mediaCapture"
                  type="file"
                  name="pic"
                  accept="image/*"
                  capture="camera"
                />
                <button
                  id="submitImage"
                  title="Add an image"
                  onClick={event => this.submitFile(event)}
                  className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--amber-400 mdl-color-text--white"
                >
                  <i className="material-icons">image</i>
                </button>
              </form>
            </div>
          </div>

          <div
            id="must-signin-snackbar"
            className="mdl-js-snackbar mdl-snackbar"
          >
            <div className="mdl-snackbar__text" />
            <button className="mdl-snackbar__action" type="button" />
          </div>
        </div>
      </main>
    );
  }
}

export default withFirebase(MainChatting);
