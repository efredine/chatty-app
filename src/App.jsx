import React, {Component} from 'react';
import Nav from './Nav.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const data = {
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = data;
  }

  render() {
    return (
      <div className="wrapper">
        <Nav/>
        <MessageList messages={this.state.messages}/>
        <ChatBar user={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
