import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx'

class MessageList extends Component {
  render() {
    const messageItems = this.props.messages.map((message) => {
      return (<Message
                key={message.id}
                type={message.type}
                color={message.color}
                username={message.username}
                content={message.content}
              />);

    });
    return (
      <div id="message-list">
        {messageItems}
      </div>
    );
  }
}
export default MessageList;
