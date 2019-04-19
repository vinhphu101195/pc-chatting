import React, { Component } from "react";

export default class MainChatting extends Component {
  render() {
    return (
      <main class="mdl-layout__content mdl-color--grey-100">
        <div
          id="messages-card-container"
          class="mdl-cell mdl-cell--12-col mdl-grid"
        >
          <div
            id="messages-card"
            class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--6-col-tablet mdl-cell--6-col-desktop"
          >
            <div class="mdl-card__supporting-text mdl-color-text--grey-600">
              <div id="messages">
                <span id="message-filler" />
              </div>
              <form id="message-form" action="#">
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input
                    class="mdl-textfield__input"
                    type="text"
                    id="message"
                  />
                  <label class="mdl-textfield__label" for="message">
                    Message...
                  </label>
                </div>
                <button
                  id="submit"
                  disabled
                  type="submit"
                  class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                >
                  Send
                </button>
              </form>
              <form id="image-form" action="#">
                <input
                  id="mediaCapture"
                  type="file"
                  accept="image/*"
                  capture="camera"
                />
                <button
                  id="submitImage"
                  title="Add an image"
                  class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--amber-400 mdl-color-text--white"
                >
                  <i class="material-icons">image</i>
                </button>
              </form>
            </div>
          </div>

          <div id="must-signin-snackbar" class="mdl-js-snackbar mdl-snackbar">
            <div class="mdl-snackbar__text" />
            <button class="mdl-snackbar__action" type="button" />
          </div>
        </div>
      </main>
    );
  }
}
