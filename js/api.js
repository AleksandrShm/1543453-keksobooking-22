import {showAlert} from './utils.js';
import {createDescriptionsCards} from './popup.js';
import {addMapDescriptionsMarkersPopup} from './map.js';

const getData = () => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert('Ошибка при загрузке данных. Попробуйте еще раз');
      }
    })
    .then((descriptions) => {
      addMapDescriptionsMarkersPopup(descriptions, createDescriptionsCards(descriptions));
    })
    .catch(() => {
      showAlert('Ошибка при загрузке данных. Попробуйте еще раз');
    });
};

const sendData = (formData, onSuccess, onError) => {

  fetch(
    'https://22.javascript.pages.academy/keksobooking',
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

export {getData, sendData};
