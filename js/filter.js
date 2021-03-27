import {getData, onErrorGetDataShowAlert} from './api.js';
import {addMapMarkersWithPopups} from './map.js';
import {debounce} from './utils.js';

const PRICE_MIDDLE_MIN = 10000;
const PRICE_MIDDLE_MAX = 50000;
const DEBOUNCE_MS = 500;
const formFilters = document.querySelector('.map__filters');
const typeSelect = formFilters.querySelector('#housing-type');
const priceSelect = formFilters.querySelector('#housing-price');
const roomsSelect = formFilters.querySelector('#housing-rooms');
const guestsSelect = formFilters.querySelector('#housing-guests');
const featureCheckboxes = [...formFilters.querySelectorAll('.map__checkbox')];

const filterCheckbox = (checkbox, filteredData) => {
  if (checkbox.checked === true) {
    return filteredData.filter(item => item.offer.features.includes(checkbox.value));
  } else {
    return filteredData;
  }
}

const filter = (filteredData) => {
  if (typeSelect.value !== 'any') {
    filteredData = filteredData.filter(item => item.offer.type === typeSelect.value);
  }
  switch (priceSelect.value) {
    case 'middle':
      filteredData = filteredData.filter(item => item.offer.price >= PRICE_MIDDLE_MIN && item.offer.price <= PRICE_MIDDLE_MAX);
      break;
    case 'low':
      filteredData = filteredData.filter(item => item.offer.price < PRICE_MIDDLE_MIN);
      break;
    case 'high':
      filteredData = filteredData.filter(item => item.offer.price > PRICE_MIDDLE_MAX);
  }
  if (roomsSelect.value !== 'any') {
    filteredData = filteredData.filter(item => item.offer.rooms === +roomsSelect.value);
  }
  if (guestsSelect.value !== 'any') {
    filteredData = filteredData.filter(item => item.offer.guests === +guestsSelect.value);
  }

  featureCheckboxes.forEach(checkbox => {
    filteredData = filterCheckbox(checkbox, filteredData)
  });

  addMapMarkersWithPopups(filteredData);
};

const onChangeFormFilter = (evt) => {
  evt.preventDefault();
  getData(filter, onErrorGetDataShowAlert);
}

formFilters.addEventListener('change', debounce(onChangeFormFilter, DEBOUNCE_MS));
