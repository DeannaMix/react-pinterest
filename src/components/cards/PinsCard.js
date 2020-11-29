import React, { Component } from 'react';
import PinForm from '../Forms/PinForm';
import AppModal from '../AppModal';
import pinData from '../../helpers/data/pinData';

export default class PinsCard extends Component {
  render() {
    const { pin, onUpdate } = this.props;
    return (
      <div className='card m-3 w-300'>
      <a href={pin.url}>
        <img className='card-img-top board-img' src={pin.imageUrl} alt='Card cap'></img>
      </a>
        <div className='card-body'>
          <h5 className='card-title'>{pin.name}</h5>
          <p className='card-text'>{pin.description}</p>
          {(this.props.isOnHome !== true) ? (
            <div className='d-flex justify-content-center'>
          <button className='btn btn-danger mr-1' id={pin.firebaseKey} onClick={() => pinData.deletePin(pin.firebaseKey)}>Delete Pin</button>
          <AppModal title={'Update Pin'} buttonLabel={'Update Pin'}>
            { Object.keys(pin).length && <PinForm pin={pin} onUpdate={onUpdate} board={this.props.board}/>}
            </AppModal>
          </div>
          ) : (
            <div></div>
          )
          }
        </div>
      </div>
    );
  }
}
