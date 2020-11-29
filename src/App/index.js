import React from 'react';
import firebase from 'firebase/app';
import { BrowserRouter as Router } from 'react-router-dom';
import fbConnection from '../helpers/data/connection';
import Routes from '../helpers/Routes';
import MyNavbar from '../components/myNavbar';
// import Auth from '../components/auth';
// import BoardContainer from '../components/BoardContainer';

fbConnection();

class App extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { user } = this.state;
    return (
    <div className='App'>
      <Router>
        <MyNavbar user={user} />
        <Routes user={user} />
      </Router>
    </div>
    );
  }
}

export default App;
