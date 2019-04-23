import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import MainChatting from "./components/MainChatting";
import profilePic from "./components/images/profile_placeholder.png";

class App extends Component {
  state = {
    authUser: null,
    img: profilePic,
    name: ""
  };
  giveParentData = data => {
    this.setState({
      authUser: data.authUser,
      img: data.img,
      name: data.name
    });
  };
  render() {
    return (
      <div className="App">
        <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <Navbar giveParentData={data => this.giveParentData(data)} />
          <MainChatting infor={this.state} />
        </div>
      </div>
    );
  }
}

export default App;
