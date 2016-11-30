import React, {Component} from 'react';
import Nav from './Nav.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatBarInput: "",
      currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleIncomingMessage = this.handleIncomingMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:5000/socketserver");
    this.socket.onmessage = this.handleIncomingMessage;
  }

  render() {
    return (
      <div className="wrapper">
        <Nav/>
        <MessageList messages={this.state.messages}/>
        <ChatBar
          user={this.state.currentUser}
          value={this.state.chatBarInput}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onUserNameChange={this.handleUserNameChange}
        />
      </div>
    );
  }

  handleIncomingMessage(event) {
    const newMessage = JSON.parse(event.data);
    this.setState((prevState, props) => {
      return {
        messages: prevState.messages.concat(newMessage)
      };
    });
  }

  handleChange(value) {
    this.setState({chatBarInput: value});
  }

  handleUserNameChange(value) {
    this.setState({currentUser: {name: value}});
  }

  handleSubmit() {

    this.setState((prevState, props) => {
      const newMessage = {
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
