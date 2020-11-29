import React from 'react';
import pinData from '../helpers/data/pinData';
import boardData from '../helpers/data/boardData';
import PinsCard from '../components/cards/PinsCard';
import BoardForm from '../components/Forms/BoardForm';
import AppModal from '../components/AppModal';
import PinForm from '../components/Forms/PinForm';

export default class SingleBoard extends React.Component {
  state = {
    board: {},
    pins: [],
  };

  componentDidMount() {
    console.warn("I'm in singleboard");
    // 1. get board id from url params
    const boardFirebaseKey = this.props.match.params.id;
    // 2. API call to get board info
    this.getBoardInfo(boardFirebaseKey);
    // 3. API Call to get pins associated with boardId
    this.getPins(boardFirebaseKey).then((response) => {
      this.setState({
        pins: response,
      });
    });
  }

  getBoardInfo = (boardFirebaseKey) => {
    boardData.getSingleBoard(boardFirebaseKey).then((response) => {
      this.setState({
        board: response,
      });
    });
  }

  getPins = (boardFirebaseKey) => (
    pinData.getBoardPins(boardFirebaseKey).then((response) => {
      const pinsArray = [];
      response.forEach((item) => {
        pinsArray.push(pinData.getPin(item.pinId));
      });
      return Promise.all([...pinsArray]);
    })
  );

  removePin = (e) => {
    const removedPin = this.state.pins.filter(
      (pin) => pin.firebaseKey !== e.target.id,
    );
    this.setState({
      pins: removedPin,
    });
    pinData.deletePin(e.target.id).then(() => {
      this.getPins();
    });
  }

  render() {
    const { pins, board } = this.state;
    const renderPins = () => (
      pins.map((pin) => (<PinsCard key={pin.firebaseKey} pin={pin} removePin={this.removePin} isOnHome={true}/>)));
    return (
      <div>
        <AppModal title={'Update Board'} buttonLabel={'Update Board'} buttonColor={'success'}>
        { Object.keys(board).length && <BoardForm board={board} onUpdate={this.getBoardInfo} />}
        </AppModal>
        <AppModal title={'Add Pin'} buttonLabel={'Add Pin'}>
          {<PinForm board={board} onUpdate={this.findMatchingPins}/>}
          </AppModal>
        <h1>{board.name}</h1>
        <div className='d-flex flex-wrap justify-content-center'>
          {renderPins()}
        </div>
      </div>
    );
  }
}
