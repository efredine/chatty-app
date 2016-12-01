import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userNameInput: "",
      messageInput: ""
    };

    this.handleUserNameChange = this.handleChange.bind(this, "userNameInput");
    this.handleMessageChange = this.handleChange.bind(this, "messageInput");
    this.handleMessageKeyPress = this.handleMessageKeyPress.bind(this);
    this.handleUserNameKeyPress = this.handleUserNameKeyPress.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(field, event) {
    const update = {};
    update[field] = event.target.value;
    this.setState(update);
  }

  handleMessageKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.setState((prevState, props) => {
        if(prevState.messageInput.length > 0) {
          props.onSubmit(prevState.messageInput);
        }
        return {messageInput: ""}
      });
    }
  }

  handleUserNameKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.props.onUserNameChange(this.state.userNameInput);
    }
  }

  // on blur, submit a new name if it's different from the old name.
  handleBlur(event) {
    const proposedNewName = this.state.userNameInput;
    if(proposedNewName !== this.props.user.name) {
      this.props.onUserNameChange(proposedNewName);
    }
  }

  render() {
    return (
      <footer>
        <div className="userNameContainer">
          <input
            id="username"
            type="text"
            placeholder="Your Name (Optional)"
            value={this.state.userNameInput}
            onChange={this.handleUserNameChange}
            onKeyPress={this.handleUserNameKeyPress}
            onBlur={this.handleBlur}
          />
        </div><div className="messageContainer">
          <input
            id="new-message"
            type="text"
            placeholder="Type a message and hit ENTER"
            value={this.state.messageInput}
            onChange={this.handleMessageChange}
            onKeyPress={this.handleMessageKeyPress}
          />
        </div>
      </footer>
    );
  }
}
export default ChatBar;
