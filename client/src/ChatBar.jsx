import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleUserKeyPress = this.handleUserKeyPress.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleUserChange(event) {
    this.props.onUserNameInput(event.target.value);
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  handleKeyPress(event) {
    if (event.which === 13) {
      event.preventDefault();
      if(this.props.value.length > 0) {
        this.props.onSubmit();
      }
    }
  }

  handleUserKeyPress(event) {
    if (event.which === 13) {
      event.preventDefault();
      this.props.onUserNameChange(this.props.userNameInput);
    }
  }

  // on blur, revert the user's name
  handleBlur(event) {
    console.log('blur', this.props.user);
    this.props.onUserNameInput(this.props.user.name);
  }

  render() {
    return (
      <footer>
        <input
          id="username"
          type="text"
          placeholder="Your Name (Optional)"
          value={this.props.userNameInput}
          onChange={this.handleUserChange}
          onKeyPress={this.handleUserKeyPress}
          onBlur={this.handleBlur}
        />
        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          value={this.props.value}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
      </footer>
    );
  }
}
export default ChatBar;
