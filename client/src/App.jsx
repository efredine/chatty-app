import React, {Component} from 'react';
import Nav from './Nav.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Scroll  from 'react-scroll';

var Link       = Scroll.Link;
var Element    = Scroll.Element;
var Events     = Scroll.Events;
var scroll     = Scroll.animateScroll;
var scrollSpy  = Scroll.scrollSpy;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineCount: 0,
      chatBarInput: "",
      userNameInput: "",
      currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleIncomingMessage = this.handleIncomingMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:5000/socketserver");
    this.socket.onmessage = this.handleIncomingMessage;
    Events.scrollEvent.register('begin', function(to, element) {
      // console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function(to, element) {
      // console.log("end", arguments);
    });

    scrollSpy.update();

  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  render() {
    return (
      <div className="wrapper">
        <Nav onlineCount={this.state.onlineCount}/>
        <main>
          <MessageList messages={this.state.messages}/>
          <ChatBar
            user={this.state.currentUser}
            userNameInput={this.state.userNameInput}
            value={this.state.chatBarInput}
            onSubmit={this.handleSubmit}
            onUserNameChange={this.handleUserNameChange}
          />
        </main>
      </div>
    );
  }

  handleIncomingMessage(event) {
    const newMessage = JSON.parse(event.data);
    switch(newMessage.type) {
      case "Message":
      case "Notification":
        this.setState((prevState, props) => {
          return {
            messages: prevState.messages.concat(newMessage)
          };
        });
        break;
      case "Status":
        this.setState((prevState, props) => {
          const notificationMessage = {
            type: "Notification",
            color: "black",
            id: newMessage.id,
            username: "System",
            content: `A user has ${newMessage.event}`
          }
          return {
            onlineCount: newMessage.onlineCount,
            messages: prevState.messages.concat(notificationMessage)
          };
        });
        break;
      default:
        console.log("Unrecognized message type: ", newMessage);
    }

    // potentially annoying
    scroll.scrollToBottom();
  }

  handleUserNameChange(value) {
    this.setState((prevState, props) => {
      const previousName = prevState.currentUser.name.length === 0 ? "Anonymous" : prevState.currentUser.name;
      const newMessage = {
        type: "Notification",
        username: value,
        content: `was previously ${previousName}.`
      };
      this.socket.send(JSON.stringify(newMessage));

      // scroll the div
      scroll.scrollToBottom();

      return {
        currentUser: {
          name: value
        }
      };
    });
  }

  handleSubmit(content) {

    const newMessage = {
      type: "Message",
      username: this.state.currentUser.name,
      content: content
    };

    // send it out on the socket.
    this.socket.send(JSON.stringify(newMessage));

    // scroll the div
    scroll.scrollToBottom();

  }
}
export default App;
