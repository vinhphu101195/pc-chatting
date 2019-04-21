import React, { Component } from "react";
import * as firebase from "firebase";
import profilePic from "./images/profile_placeholder.png";
import { FirebaseContext } from "./Firebase";

export default class navbar extends Component {
  state = {
    trachAuth: false,
    name: "",
    pic: ""
  };
  signIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
    this.setState({ trachAuth: true });
  };

  signOut = () => {
    firebase.auth().signOut();
    this.setState({ trachAuth: false });
  };

  initFirebaseAuth = () => {
    firebase.auth().onAuthStateChanged(this.authStateObserver);
  };

  authStateObserver = user => {
    if (user) {
      this.setState({
        trachAuth: true,
        name: this.getUserName(),
        pic: this.getProfilePicUrl()
      });
    }
  };

  getUserName = () => {
    return firebase.auth().currentUser.displayName;
  };

  getProfilePicUrl = () => {
    return firebase.auth().currentUser.photoURL || profilePic;
  };

  isUserSignedIn = () => {
    return !!firebase.auth().currentUser;
  };

  render() {
    console.log();

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
                  {this.state.trachAuth === false ? (
                    <button
                      id="sign-in"
                      className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
                      onClick={() => this.signIn()}
                    >
                      <i className="material-icons">account_circle</i>Sign-in
                      with Google
                    </button>
                  ) : (
                    <button
                      id="sign-out"
                      className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
                      onClick={() => this.signOut()}
                    >
                      Sign-out
                    </button>
                  )}
                </div>
              </div>
            </header>
          );
        }}
      </FirebaseContext.Consumer>
    );
  }
}
