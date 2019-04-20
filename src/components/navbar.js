import React, { Component } from "react";
import * as firebase from "firebase";
import profilePic from "./images/profile_placeholder.png";

export default class navbar extends Component {
  config = {
    apiKey: "AIzaSyDR2YNy-GGUHiex_wKjKVvdfR6lEOxScvQ",
    authDomain: "chatting-45431.firebaseapp.com",
    databaseURL: "https://chatting-45431.firebaseio.com",
    projectId: "chatting-45431",
    storageBucket: "chatting-45431.appspot.com",
    messagingSenderId: "753331631541"
  };
  signIn = () => {
    firebase.initializeApp(this.config);

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  signOut = () => {
    firebase.initializeApp(this.config);

    firebase.auth().signOut();
  };

  render() {
    console.log(this.config);

    return (
      <header className="mdl-layout__header mdl-color-text--white mdl-color--light-blue-700">
        <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
          <div className="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
            <h3>
              <i className="material-icons">chat_bubble_outline</i> PC Chatting
            </h3>
          </div>
          <div id="user-container">
            <div hidden id="user-pic" />
            <div hidden id="user-name" />
            <button
              hidden
              id="sign-out"
              className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
              onClick={() => this.signOut()}
            >
              Sign-out
            </button>
            <button
              id="sign-in"
              className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
              onClick={() => this.signIn()}
            >
              <i className="material-icons">account_circle</i>Sign-in with
              Google
            </button>
          </div>
        </div>
      </header>
    );
  }
}
