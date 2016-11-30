import React, {Component} from 'react';

class Nav extends Component {
  render() {
    const onlineCount = this.props.onlineCount;
    const status = `${onlineCount} user${onlineCount === 1 ? "" : "s"} connected`
    return (
      <nav>
        <h1>Chatty</h1>
        <div className="status"><h1>{status}</h1></div>
      </nav>
    );
  }
}
export default Nav;
