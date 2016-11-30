import React, {Component} from 'react';

class Notification extends Component {
  render() {
    const username = this.props.username || "Anonymous";
    const content = this.props.content;
    return (
      <div className="message system">
        <span className="username">{username}</span>
        <span className="content">{content}</span>
      </div>
    );
  }
}
export default Notification;
