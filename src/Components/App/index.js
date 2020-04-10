import React, { Component } from 'react';
import './styles.css';
import Login from '../Login';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  };

  componenetDidMount() {

  };

  componenetWillUnmount() {

  };

  render() {

    return (
      <div className='app' >
        <Login />
      </div>
    )
  }

}

export default App;
