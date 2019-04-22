import React, { Component } from "react";
import { withFirebase } from "../components/Firebase";
import profilePic from "./images/profile_placeholder.png";
import { FirebaseContext } from "./Firebase";
import firebase from "firebase";

export default class navbar extends Component {
  SignIn = event => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider);
    console.log(provider);

    event.preventDefault();
  };

  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => {
          return (
            <header className="mdl-layout__header mdl-color-text--white mdl-color--light-blue-700">
              <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
                <div className="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
                  <h3>
                    <i className="material-icons">chat_bubble_outline</i> PC
                    Chatting
                  </h3>
                </div>
                <div id="user-container">
                  <div hidden id="user-pic" />
                  <div hidden id="user-name" />
                  <button
                    id="sign-in"
                    className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
                    onClick={event => this.SignIn(event)}
                  >
                    <i className="material-icons">account_circle</i>Sign-in with
                    Google
                  </button>
                  <button
                    hidden
                    id="sign-out"
                    className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
                    onClick={() => this.signOut()}
                  >
                    Sign-out
                  </button>
                </div>
              </div>
            </header>
          );
        }}
      </FirebaseContext.Consumer>
    );
  }
}
