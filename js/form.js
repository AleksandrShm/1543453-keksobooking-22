import {setElementSelected, removeElementsSelected} from './utils.js';

const minPlacePrices = {
  flat: '1000',
  bungalow: '0',
  house: '5000',
  palace: '10000',
};
const form = document.querySelector('.ad-form');
const placesTypeSelect = form.querySelector('#type');
const priceInput = form.querySelector('#price');
priceInput.placeholder = minPlacePrices.flat;
priceInput.setAttribute('min', minPlacePrices.flat);

// устанавливает атрибут min и placeholder в зависитмости от value (типа жилья)
placesTypeSelect.addEventListener('change', (evt) => {
  priceInput.setAttribute('min', minPlacePrices[evt.target.value])
  priceInput.placeholder = minPlacePrices[evt.target.value];
});

const timeInSelect = form.querySelector('#timein');
const timeOutSelect = form.querySelector('#timeout');

// ищет в #timeout select option с соответствующим value, устанавливает ему selected="true"
timeInSelect.addEventListener('change', (evt) => {
  removeElementsSelected(form.querySelectorAll('#timeout option'));
  const timeOutSelectedOption = form.querySelector(`#timeout option[value="${evt.target.value}"]`);
  setElementSelected(timeOutSelectedOption);
});

// то же, в #timein
timeOutSelect.addEventListener('change', (evt) => {
  removeElementsSelected(form.querySelectorAll('#timein option'));
  const timeInSelectedOption = form.querySelector(`#timein option[value="${evt.target.value}"]`);
  setElementSelected(timeInSelectedOption);
});
