import {showAlert} from './utils.js';

const URL_GET_DATA = 'https://22.javascript.pages.academy/keksobooking/data';
const URL_SEND_DATA = 'https://22.javascript.pages.academy/keksobooking';
let loadingDataArr = [];

const onErrorGetDataShowAlert = () => {
  showAlert('Ошибка загрузки данных. Попробуйте еще раз');
};

const getData = (onSuccess, onError) => {
  fetch(URL_GET_DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        // бросаем исключение, если статус response не ok, управление переходит в .catch (туда передается брошенный Error, его можно обработать)
        throw new Error(`Error. HTTP response status code ${response.status}`);
      }
    })
    .then((descriptions) => {
      loadingDataArr = descriptions.slice();
      onSuccess(descriptions);
    })
    .catch(() => {
      onError();
    });
};

const sendData = (formData, onSuccess, onError) => {

  fetch(
    URL_SEND_DATA,
    {
      method: 'POST',
      body: formData,
    },

  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      throw new Error(`Error. HTTP response status code ${response.status}`);
    }
  })
    .catch(() => {
      onError();
    })
}

export {getData, sendData, onErrorGetDataShowAlert, loadingDataArr};
