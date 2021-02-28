import {showAlert} from './utils.js';

const URL_GET_DATA = 'https://22.javascript.pages.academy/keksobooking/data';
const URL_SEND_DATA = 'https://22.javascript.pages.academy/keksobooking';

const onErrorGetDataShowAlert = () => {
  showAlert('Ошибка при загрузке данных. Попробуйте еще раз');
};

const getData = (onSuccess, onError) => {
  fetch(URL_GET_DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onError();
      }
    })
    .then((descriptions) => {
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
      onError();
    }
  })
    .catch(() => {
      onError();
    })
}

export {getData, sendData, onErrorGetDataShowAlert};
