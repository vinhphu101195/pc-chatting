import "firebase/firestore";
import "firebase/auth";
import app from "firebase/app";
import firebase from "firebase";

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

  deleteMessage(id) {
    var div = document.getElementById(id);
    // If an element for that message exists we delete it.
    if (div) {
      div.parentNode.removeChild(div);
    }
  }

  addSizeToGoogleProfilePic(url) {
    if (
      url.indexOf("googleusercontent.com") !== -1 &&
      url.indexOf("?") === -1
    ) {
      return url + "?sz=150";
    }
    return url;
  }

  // Displays a Message in the UI.

  loadMessages() {
    // Create the query to load the last 12 messages and listen for new ones.
    var query = firebase
      .firestore()
      .collection("message")
      .orderBy("timestamp", "desc")
      .limit(12);

    return query;
  }
}

export default Firebase;
