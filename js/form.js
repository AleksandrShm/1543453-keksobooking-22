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

setMinPrice('flat');

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
