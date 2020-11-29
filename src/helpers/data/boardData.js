/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const baseUrl = 'https://react-pinterest-106f8.firebaseio.com/';

const getAllUserBoards = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/boards.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
      resolve(Object.values(response.data));
    })
    .catch((error) => reject(error));
});

const getSingleBoard = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/boards/${firebaseKey}.json`).then((response) => {
      resolve(response.data);
    });
});

function createBoard(boardObj) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/boards.json`, boardObj)
      .then((response) => {
        axios.patch(`${baseUrl}/boards/${response.data.name}.json`, { firebaseKey: response.data.name })
          .then((patchResponse) => {
            resolve(patchResponse);
          }).catch((error) => reject(error));
      });
  });
}

const updateBoard = (boardObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseUrl}/boards/${boardObj.firebaseKey}.json`, boardObj)
    .then((response) => {
      resolve(response);
    }).catch((error) => reject(error));
});

const createPinBoard = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/pins-boards.json`, obj).then((response) => {
      axios.patch(`${baseUrl}/pins-boards/${response.data.name}.json`, { firebaseKey: response.data.name })
        .then((patchResponse) => {
          resolve(patchResponse);
        }).catch((error) => reject(error));
    });
});

const deleteBoard = (boardFirebaseKey) => axios.delete(`${baseUrl}/boards/${boardFirebaseKey}.json`)
  .then(() => {
    axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${boardFirebaseKey}"`)
      .then((response) => {
        const responseArray = Object.values(response);
        responseArray.forEach((respArr) => {
          const pinBoardIdsArray = Object.keys(respArr);
          pinBoardIdsArray.forEach((id) => {
            deletePinBoard(id);
          });
        });
      });
  });

const deletePinBoard = (id) => axios.delete(`${baseUrl}/pins-boards/${id}.json`);

export default {
  getAllUserBoards,
  getSingleBoard,
  createBoard,
  updateBoard,
  createPinBoard,
  deleteBoard,
  deletePinBoard,
};
