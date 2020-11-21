import React from 'react';
import firebase from 'firebase/app';

import fbConnection from '../helpers/data/connection';

import auth from '../components/auth';
import './App.scss';

fbConnection();

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>INSIDE APP COMPONENT</h2>
        <button className="btn btn-info">I am a button</button>
      </div>
    );
  }
}

export default App;
