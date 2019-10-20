import React, { Component } from "react";
import { withFirebase } from "../components/Firebase";
import profilePic from "./images/profile_placeholder.png";
import firebase from "firebase";

class navbar extends Component {
  state = {
    authUser: null,
    img: profilePic,
    name: ""
  };

  SignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    this.props.firebase.doSignInWithGmail(provider);
  };

  SignOut = () => {
    this.props.firebase.doSignOut();
  };

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.setState({
          authUser,
          img: firebase.auth().currentUser.photoURL,
          name: firebase.auth().currentUser.displayName
        });
        this.props.giveParentData(this.state);
      } else {
        this.setState({ authUser: null, name: "" });
      }
    });
  }

  render() {
    return (
      <header className="mdl-layout__header mdl-color-text--white mdl-color--light-grey-700">
        <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
          <div className="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
            <h3>
              <i className="material-icons">chat_bubble_outline</i> PC Chatting
            </h3>
          </div>
          <div id="user-container">
            <div id="user-pic">
              {this.state.authUser != null ? (
                <img className="auth-img" src={this.state.img} />
              ) : (
                  ""
                )}
            </div>
            <div id="user-name">
              {this.state.authUser != null ? this.state.name : ""}
            </div>
            {this.state.authUser != null ? (
              <button
                id="sign-out"
                className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
                onClick={() => this.SignOut()}
              >
                Sign-out
              </button>
            ) : (
                <button
                  id="sign-in"
                  className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
                  onClick={event => this.SignIn(event)}
                >
                  <i className="material-icons">account_circle</i>Sign-in with
                  Google
              </button>
              )}
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
  }
}

export default withFirebase(navbar);
