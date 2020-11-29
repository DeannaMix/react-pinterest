import axios from 'axios';

const baseUrl = 'https://react-pinterest-106f8.firebaseio.com/';

const addPinToBoard = (pinToBoardObject) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/pins-boards.json`, pinToBoardObject).then((response) => {
    axios.patch(`${baseUrl}/pins-boards/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
  }).catch((error) => reject(error));
});

const deletePinFromBoard = (pinFirebaseKey) => (
  axios.get(`${baseUrl}/pins-boards.json?orderBy="pinId"&equalTo="${pinFirebaseKey}"`).then((response) => {
    axios.delete(`${baseUrl}/pins-boards/${Object.keys(response.data)[0]}.json`);
  })
);

const deleteBoard = (boardFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${boardFirebaseKey}"`).then((response) => {
    Object.keys(response.data).forEach((pinBoardKey) => {
      axios.delete(`${baseUrl}/pins-boards/${pinBoardKey}.json`);
    });
  }).then(resolve).catch((error) => reject(error));
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addPinToBoard,
  deletePinFromBoard,
  deleteBoard,
};
