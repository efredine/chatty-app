import React, {Component} from 'react';

class Message extends Component {
  render() {
    const username = this.props.username || "Anonymous";
    const content = this.props.content;
    return (
      <div className="message">
        <span className="username">{username}</span>
        <span className="content">{content}</span>
      </div>
    );
  }
}
export default Message;
