import React, {Component} from 'react';

function getClassForMessageType(messageType) {
  switch(messageType) {
    case "Message":
      return "message";
    case "Notification":
      return "message system";
    default:
      return ""
  }
}

class Message extends Component {
  render() {
    const username = this.props.username || "Anonymous";
    const content = this.props.content;
    const divStyle = {
      color: this.props.color
    }
    return (
        <div className={getClassForMessageType(this.props.type)} style={divStyle}>
        <span className="username">{username}</span>
        <span className="content">{content}</span>
      </div>
    );
  }
}
export default Message;
