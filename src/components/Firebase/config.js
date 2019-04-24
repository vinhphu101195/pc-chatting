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

  deleteMessage(id) {
    var div = document.getElementById(id);
    // If an element for that message exists we delete it.
    if (div) {
      div.parentNode.removeChild(div);
    }
  }

  MESSAGE_TEMPLATE =
    '<div class="message-container">' +
    '<div class="spacing"><div class="pic"></div></div>' +
    '<div class="message"></div>' +
    '<div class="name"></div>' +
    "</div>";
  messageListElement = document.getElementById("messages");
  messageInputElement = document.getElementById("message");

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
  displayMessage(id, timestamp, name, text, picUrl, imageUrl) {
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
  }

  loadMessages() {
    // Create the query to load the last 12 messages and listen for new ones.
    var query = firebase
      .firestore()
      .collection("message")
      .orderBy("timestamp", "desc")
      .limit(12);
    var displayMess = [];

    // Start listening to the query.
    query.onSnapshot(function(snapshot) {
      console.log(snapshot.docChanges());
      displayMess = snapshot.docChanges();
      return displayMess;
      // snapshot.docChanges().forEach(function(change) {
      //   if (change.type === "removed") {
      //     this.deleteMessage(change.doc.id);
      //   } else {
      //     var message = change.doc.data();
      //     // console.log(message);
      //     // console.log(change.doc.id);
      //     displayMess = snapshot.docChanges();
      //     // this.displayMessage(
      //     //   change.doc.id,
      //     //   message.timestamp,
      //     //   message.name,
      //     //   message.text,
      //     //   message.profilePicUrl,
      //     //   message.imageUrl
      //     // );
      //   }
      // });
    });

    return query;
  }
}

export default Firebase;
