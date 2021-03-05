import {loadingDataArr} from './api.js';
import {addMapMarkersWithPopups, removeMarkers} from './map.js';

const formFilters = document.querySelector('.map__filters');
const typeSelect = formFilters.querySelector('#housing-type');
const priceSelect = formFilters.querySelector('#housing-price');
const roomsSelect = formFilters.querySelector('#housing-rooms');
const guestsSelect = formFilters.querySelector('#housing-guests');
const featureCheckboxes = [...formFilters.querySelectorAll('.map__checkbox')];

const PRICE_MIDDLE_MIN = 10000;
const PRICE_MIDDLE_MAX = 50000;

const filterCheckbox = (checkbox, filteredDataArr) => {
  if (checkbox.checked === true) {
    return filteredDataArr.filter(item => item.offer.features.includes(checkbox.value));
  } else {
    return filteredDataArr;
  }
}

const filter = () => {
  let filteredDataArr = loadingDataArr.slice();
  if (typeSelect.value !== 'any') {
    filteredDataArr = filteredDataArr.filter(item => item.offer.type === typeSelect.value);
  }
  switch (priceSelect.value) {
    case 'middle':
      filteredDataArr = filteredDataArr.filter(item => item.offer.price >= PRICE_MIDDLE_MIN && item.offer.price <= PRICE_MIDDLE_MAX);
      break;
    case 'low':
      filteredDataArr = filteredDataArr.filter(item => item.offer.price < PRICE_MIDDLE_MIN);
      break;
    case 'high':
      filteredDataArr = filteredDataArr.filter(item => item.offer.price > PRICE_MIDDLE_MAX);
  }
  if (roomsSelect.value !== 'any') {
    filteredDataArr = filteredDataArr.filter(item => item.offer.rooms === +roomsSelect.value);
  }
  if (guestsSelect.value !== 'any') {
    filteredDataArr = filteredDataArr.filter(item => item.offer.guests === +guestsSelect.value);
  }
  
  featureCheckboxes.forEach(checkbox => {
    filteredDataArr = filterCheckbox(checkbox, filteredDataArr)
  });
  addMapMarkersWithPopups(filteredDataArr);
};

formFilters.addEventListener('change', (evt) => {
  evt.preventDefault();
  removeMarkers();
  filter();
});
