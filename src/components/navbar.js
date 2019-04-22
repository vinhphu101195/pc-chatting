import React, { Component } from "react";
import { withFirebase } from "../components/Firebase";
import profilePic from "./images/profile_placeholder.png";
import { FirebaseContext } from "./Firebase";
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
    console.log(this.props);
  };

  SignOut = () => {
    console.log("sign out buuton");
    firebase.auth().signOut();

    // this.props.firebase.doSignOut();
  };

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({
            authUser,
            img: firebase.auth().currentUser.photoURL,
            name: firebase.auth().currentUser.displayName
          })
        : this.setState({ authUser: null, name: "" });
    });
    // if (this.state.authUser != null) {
    //   this.setState(function(state, props) {
    //     return {
    //       img: firebase.auth().currentUser.photoURL || profilePic,
    //       name: firebase.auth().currentUser.displayName
    //     };
    //   });
    // }
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    console.log(this.state);

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
                      <i className="material-icons">account_circle</i>Sign-in
                      with Google
                    </button>
                  )}
                  {/* <button
                    id="sign-in"
                    className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
                    onClick={event => this.SignIn()}
                  >
                    <i className="material-icons">account_circle</i>Sign-in with
                    Google
                  </button> */}
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

export default withFirebase(navbar);
