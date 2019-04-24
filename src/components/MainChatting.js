import React, { Component } from "react";
import firebase from "firebase";
import { withFirebase } from "../components/Firebase";

class MainChatting extends Component {
  state = {
    authUser: this.props.infor.authUser,
    img: this.props.infor.img,
    name: this.props.infor.name,
    text: ""
  };

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
  // componentDidMount() {
  //   this.props.firebase.loadMessages();
  // }
  render() {
    console.log(this.props.firebase.loadMessages());

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
              <div id="messages">
                <span id="message-filler" />
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
