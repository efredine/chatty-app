import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
  }

  handleUserChange(event) {
    this.props.onUserNameChange(event.target.value);
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

  render() {
    return (
      <footer>
        <input
          id="username"
          type="text"
          placeholder="Your Name (Optional)"
          value={this.props.user.name}
          onChange={this.handleUserChange}
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
