import React, {Component} from 'react';
import Nav from './Nav.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleUserNameInput = this.handleUserNameInput.bind(this);
    this.handleIncomingMessage = this.handleIncomingMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:5000/socketserver");
    this.socket.onmessage = this.handleIncomingMessage;
  }

  render() {
    return (
      <div className="wrapper">
        <Nav onlineCount={this.state.onlineCount}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar
          user={this.state.currentUser}
          userNameInput={this.state.userNameInput}
          value={this.state.chatBarInput}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onUserNameInput={this.handleUserNameInput}
          onUserNameChange={this.handleUserNameChange}
        />
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
            content: `One user ${newMessage.event}`
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
  }

  handleChange(value) {
    this.setState({chatBarInput: value});
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
      return {
        currentUser: {
          name: value
        }
      };
    });
  }

  handleUserNameInput(value) {
    this.setState({userNameInput: value});
  }

  handleSubmit() {

    this.setState((prevState, props) => {
      const newMessage = {
        type: "Message",
        username: prevState.currentUser.name,
        content: prevState.chatBarInput
      };
      // send it out on the socket.
      this.socket.send(JSON.stringify(newMessage));

      // clear out the chatBarInput
      return {
        chatBarInput: ""
      }
    });
  }
}
export default App;
