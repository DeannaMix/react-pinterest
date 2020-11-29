import React from 'react';
import Loader from '../components/Loader';
import Auth from '../components/auth';
import getUid from '../helpers/data/authData';
import PinsCard from '../components/cards/PinsCard';
import pinData from '../helpers/data/pinData';

export default class Home extends React.Component {
  state = {
    pins: [],
    loading: true,
    user: '',
  }

  componentDidMount() {
    console.warn("I'm in home .js");
    this.getPins();
    const userID = getUid();
    this.setState({
      user: userID,
    });
  }

  getPins = () => {
    pinData.getPublicPins().then((response) => {
      this.setState({
        pins: response,
        loading: false,
      });
    });
  }

  render() {
    const { pins, user } = this.state;
    const loadComponent = () => {
      let component = '';
      if (user === null) {
        component = <Loader />;
      } else if (user) {
        component = pins.map((pin) => (
          <PinsCard key={pin.firebaseKey} pin={pin} isOnHome={true} />
        ));
      } else {
        component = <Auth />;
      }
      return component;
    };
    return (
      <div>
        <h1>Your Public Pins!</h1>
        <div className='d-flex flex-wrap justify-content-center'>
        {loadComponent()}
        </div>
      </div>
    );
  }
}
