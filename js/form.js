import {resetAddress} from './map.js';
import {sendData} from './api.js';

const minPlacePrices = {
  flat: '1000',
  bungalow: '0',
  house: '5000',
  palace: '10000',
};
const form = document.querySelector('.ad-form');
const placesTypeSelect = form.querySelector('#type');

// устанавливает полю #price атрибут min и placeholder в зависитмости от value (типа жилья)
const setMinPrice = (value) => {
  const priceInput = form.querySelector('#price');
  priceInput.placeholder = minPlacePrices[value];
  priceInput.setAttribute('min', minPlacePrices[value]);
}

// сбрасывает к первоначальным значениям поля формы и адрес с маркером на карте
const resetForm = () => {
  form.reset();
  setMinPrice('flat');
  resetAddress();
};

resetForm();

placesTypeSelect.addEventListener('change', (evt) => {
  setMinPrice(evt.target.value);
});

const timeInSelect = form.querySelector('#timein');
const timeOutSelect = form.querySelector('#timeout');

// синхронизирует #timeout value с новым #timein value
timeInSelect.addEventListener('change', (evt) => {
  timeOutSelect.value = evt.target.value;
});

// синхронизирует #timein value с новым #timeout value
timeOutSelect.addEventListener('change', (evt) => {
  timeInSelect.value = evt.target.value;
});

// показывает сообщение success об удачной отправке данных, затем скрывает через переданное время в мс
const showAndHideSuccessPopup = (timeToHide) => {
  const successPopupTemplate = document.querySelector('#success').content;
  const successPopup = successPopupTemplate.querySelector('div').cloneNode(true);
  document.body.appendChild(successPopup);

  setTimeout(() => {
    document.body.removeChild(successPopup);
  }, timeToHide);
};

// сбрасывает форму, вызывает функцию показа сообщения success
const onSuccessClear = () => {
  const TIME_SHOW = 2000;
  showAndHideSuccessPopup(TIME_SHOW);
  resetForm();
};

// выводит сообщение error о неудачной отправке данных
const showError = () => {
  const errorPopupTemplate = document.querySelector('#error').content;
  const errorPopup = errorPopupTemplate.querySelector('div').cloneNode(true);
  const closePopupButton = errorPopup.querySelector('.error__button');
  document.body.appendChild(errorPopup);
  closePopupButton.addEventListener('click', () => {
    document.body.removeChild(errorPopup);
  });
};

// отправляет данные формы, в случае успеха выполняет onSuccess(), неуспеха onError()
const setUserFormSubmit = (onSuccess, onError) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(formData, onSuccess, onError);
  });
}

// кнопка сброса формы
const clearButtonForm = form.querySelector('.ad-form__reset');
clearButtonForm.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const errorCapacityMessage = 'Неверное количество гостей';

// проверяет соответствие количества комнат с количеством гостей
const checkCapacity = (roomNumberValue, capacityValue) => {
  switch (roomNumberValue) {
    case '1':
      if (capacityValue === '1') {
        capacity.setCustomValidity('');
      } else {
        capacity.setCustomValidity(errorCapacityMessage);
      }
      break;

    case '2':
      if (capacityValue === '1' || capacityValue === '2') {
        capacity.setCustomValidity('');
      } else {
        capacity.setCustomValidity(errorCapacityMessage);
      }
      break;

    case '3':
      if (capacityValue === '1' || capacityValue === '2' || capacityValue === '3') {
        capacity.setCustomValidity('');
      } else {
        capacity.setCustomValidity(errorCapacityMessage);
      }
      break;

    case '100':
      if (capacityValue === '0') {
        capacity.setCustomValidity('');
      } else {
        capacity.setCustomValidity(errorCapacityMessage);
      }
  }
};

roomNumber.addEventListener('change', (evt) => {
  evt.preventDefault();
  checkCapacity(roomNumber.value, capacity.value);
});

capacity.addEventListener('change', (evt) => {
  evt.preventDefault();
  checkCapacity(roomNumber.value, capacity.value);
});

export {setUserFormSubmit, onSuccessClear, showError};
