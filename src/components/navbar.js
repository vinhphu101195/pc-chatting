import React, { Component } from "react";
import * as firebase from "firebase";
import profilePic from "./images/profile_placeholder.png";

export default class navbar extends Component {
  signIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  render() {
    return (
      <header class="mdl-layout__header mdl-color-text--white mdl-color--light-blue-700">
        <div class="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
          <div class="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
            <h3>
              <i class="material-icons">chat_bubble_outline</i> PC Chatting
            </h3>
          </div>
          <div id="user-container">
            <div hidden id="user-pic" />
            <div hidden id="user-name" />
            <button
              hidden
              id="sign-out"
              class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
            >
              Sign-out
            </button>
            <button
              hidden
              id="sign-in"
              class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
            >
              <i class="material-icons">account_circle</i>Sign-in with Google
            </button>
          </div>
        </div>
      </header>
    );
  }
}
