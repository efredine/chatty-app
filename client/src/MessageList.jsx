import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx'

class MessageList extends Component {
  render() {
    const messageItems = this.props.messages.map((message) => {
      if(message.type === "Message") {
        return (<Message key={message.id} username={message.username} content={message.content} />);
      } else {
        return (<Notification key={message.id} username={message.username} content={message.content} />);
      }
    });
    return (
      <div id="message-list">
        {messageItems}
      </div>
    );
  }
}
export default MessageList;
