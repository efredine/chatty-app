import React, {Component} from 'react';
import Nav from './Nav.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const data = {
  chatBarInput: "",
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      username: "Bob",
      id: 0,
      content: "Has anyone seen my marbles?",
    },
    {
      username: "Anonymous",
      id: 1,
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};

var index = 2;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = data;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:5000/socketserver");
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
        content: prevState.chatBarInput,
        id: index++
      };
      // send it out on the socket.
      this.socket.send(JSON.stringify(newMessage));

      // optimistically add it to the queue
      return {
        messages: prevState.messages.concat(newMessage),
        chatBarInput: ""
      }
    });
  }
}
export default App;
