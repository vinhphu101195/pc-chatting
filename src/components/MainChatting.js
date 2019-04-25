import React, { Component } from "react";
import firebase from "firebase";
import { withFirebase } from "../components/Firebase";
import Message from "./Message";

class MainChatting extends Component {
  state = {
    authUser: this.props.infor.authUser,
    img: this.props.infor.img,
    name: this.props.infor.name,
    text: ""
  };

  messageListElement = this.refs.messages;
  messageInputElement = this.refs.message;
  MESSAGE_TEMPLATE = `
    '<div class="message-container">' 
    '<div class="spacing"><div class="pic"></div></div>' 
    '<div class="message" ref="message"></div>' 
    '<div class="name"></div>' 
    "</div>"`;

  submitMessage = dataMessage => {
    this.props.firebase.saveMessage(dataMessage);
    this.mainInput.value = "";
  };

  handleChange = e => {
    this.setState({
      authUser: this.props.infor.authUser,
      img: this.props.infor.img,
      name: this.props.infor.name,
      [e.target.id]: e.target.value
    });
  };

  render() {
    const displayMessage = (id, timestamp, name, text, picUrl, imageUrl) => {
      var div = document.getElementById(id);
      // If an element for that message does not exists yet we create it.
      if (!div) {
        var container = document.createElement("div");
        container.innerHTML = this.MESSAGE_TEMPLATE;
        div = container.firstChild;
        div.setAttribute("id", id);
        div.setAttribute("timestamp", timestamp);
        for (var i = 0; i < this.messageListElement.children.length; i++) {
          var child = this.messageListElement.children[i];
          var time = child.getAttribute("timestamp");
          if (time && time > timestamp) {
            break;
          }
        }
        this.messageListElement.insertBefore(div, child);
      }
      if (picUrl) {
        div.querySelector(".pic").style.backgroundImage =
          "url(" + this.addSizeToGoogleProfilePic(picUrl) + ")";
      }
      div.querySelector(".name").textContent = name;
      var messageElement = div.querySelector(".message");
      if (text) {
        // If the message is text.
        messageElement.textContent = text;
        // Replace all line breaks by <br>.
        messageElement.innerHTML = messageElement.innerHTML.replace(
          /\n/g,
          "<br>"
        );
      } else if (imageUrl) {
        // If the message is an image.
        var image = document.createElement("img");
        image.addEventListener("load", function() {
          this.messageListElement.scrollTop = this.messageListElement.scrollHeight;
        });
        image.src = imageUrl + "&" + new Date().getTime();
        messageElement.innerHTML = "";
        messageElement.appendChild(image);
      }
      // Show the card fading-in and scroll to view the new message.
      setTimeout(function() {
        div.classList.add("visible");
      }, 1);
      this.messageListElement.scrollTop = this.messageListElement.scrollHeight;
      this.messageInputElement.focus();
    };
    var Phu = [];
    const showMessage = () => {
      this.props.firebase.loadMessages().onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
          var message = change.doc.data();
          Phu.push(message);
        });
      });
    };

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
                {showMessage()}

                <Message message={Phu} />
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
                  onClick={() => this.submitMessage(this.state)}
                >
                  Send
                </button>
              </form>
              <form id="image-form" action="#">
                <input
                  id="mediaCapture"
                  type="file"
                  accept="image/*"
                  capture="camera"
                />
                <button
                  id="submitImage"
                  title="Add an image"
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
