import "firebase/firestore";
import "firebase/auth";
import app from "firebase/app";
import firebase from "firebase";
import profilePic from "../images/profile_placeholder.png";

const config = {
  apiKey: "AIzaSyDR2YNy-GGUHiex_wKjKVvdfR6lEOxScvQ",
  authDomain: "chatting-45431.firebaseapp.com",
  databaseURL: "https://chatting-45431.firebaseio.com",
  projectId: "chatting-45431",
  storageBucket: "chatting-45431.appspot.com",
  messagingSenderId: "753331631541"
};

// firebase.initializeApp(config);
// firebase.firestore().settings({ timestampsInSnapshots: true });

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  doSignInWithGmail = provider => {
    this.auth.signInWithPopup(provider);
  };

  doSignOut = () => this.auth.signOut();

  saveMessage(dataobject) {
    return firebase
      .firestore()
      .collection("message")
      .add({
        name: dataobject.name,
        text: dataobject.text,
        img: dataobject.img,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        console.log("success");
      })
      .catch(function(error) {
        console.error("Error writing new message to Firebase Database", error);
      });
  }
}

export default Firebase;
