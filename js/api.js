import {showAlert} from './utils.js';
import {activateFilters} from './map.js';

const URL_GET_DATA = 'https://22.javascript.pages.academy/keksobooking/data';
const URL_SEND_DATA = 'https://22.javascript.pages.academy/keksobooking';
const DESCRIPTIONS_LIMIT = 10;
const loadingDataArr = [];

const onErrorGetDataShowAlert = () => {
  showAlert('Ошибка загрузки данных. Попробуйте еще раз');
};

const getData = (onSuccess, onError) => {
  fetch(URL_GET_DATA)
    .then((response) => {
      if (response.ok) {
        activateFilters();
        return response.json();
      } else {
        // бросаем исключение, если статус response не ok, управление переходит в .catch (туда передается брошенный Error, его можно обработать)
        throw new Error(`Error. HTTP response status code ${response.status}`);
      }
    })
    .then((descriptions) => {
      if (descriptions.length > DESCRIPTIONS_LIMIT) {
        descriptions = descriptions.slice(0, DESCRIPTIONS_LIMIT);
      }
      descriptions.forEach(item => {
        loadingDataArr.push(item);
      })
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
