import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import MainChatting from "./components/MainChatting";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <Navbar />
          <MainChatting />
        </div>
      </div>
    );
  }
}

export default App;
