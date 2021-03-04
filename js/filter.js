import {loadingDataArr} from './api.js';
import {addMapMarkersWithPopups, removeMarkers} from './map.js';

const formFilters = document.querySelector('.map__filters');
const typeSelect = formFilters.querySelector('#housing-type');
const priceSelect = formFilters.querySelector('#housing-price');
const roomsSelect = formFilters.querySelector('#housing-rooms');
const guestsSelect = formFilters.querySelector('#housing-guests');
const wifiCheckbox = formFilters.querySelector('#filter-wifi');
const dishwasherCheckbox = formFilters.querySelector('#filter-dishwasher');
const parkingCheckbox = formFilters.querySelector('#filter-parking');
const washerCheckbox = formFilters.querySelector('#filter-washer');
const elevatorCheckbox = formFilters.querySelector('#filter-elevator');
const conditionerCheckbox = formFilters.querySelector('#filter-conditioner');

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
  if (priceSelect.value !== 'any') {
    if (priceSelect.value === 'middle') {
      filteredDataArr = filteredDataArr.filter(item => item.offer.price >= PRICE_MIDDLE_MIN && item.offer.price <= PRICE_MIDDLE_MAX);
    }
    if (priceSelect.value === 'low') {
      filteredDataArr = filteredDataArr.filter(item => item.offer.price < PRICE_MIDDLE_MIN);
    }
    if (priceSelect.value === 'high') {
      filteredDataArr = filteredDataArr.filter(item => item.offer.price > PRICE_MIDDLE_MAX);
    }
  }
  if (roomsSelect.value !== 'any') {
    filteredDataArr = filteredDataArr.filter(item => item.offer.rooms === +roomsSelect.value);
  }
  if (guestsSelect.value !== 'any') {
    filteredDataArr = filteredDataArr.filter(item => item.offer.guests === +guestsSelect.value);
  }
  filteredDataArr = filterCheckbox(wifiCheckbox, filteredDataArr);
  filteredDataArr = filterCheckbox(dishwasherCheckbox, filteredDataArr);
  filteredDataArr = filterCheckbox(parkingCheckbox, filteredDataArr);
  filteredDataArr = filterCheckbox(washerCheckbox, filteredDataArr);
  filteredDataArr = filterCheckbox(elevatorCheckbox, filteredDataArr);
  filteredDataArr = filterCheckbox(conditionerCheckbox, filteredDataArr);
  addMapMarkersWithPopups(filteredDataArr);
};

const formSelects = [...formFilters.querySelectorAll('select')];
const formCheckboxes = [...formFilters.querySelectorAll('input')];

formSelects.forEach((element) => {
  element.addEventListener('change', (evt) => {
    evt.preventDefault();
    removeMarkers();
    filter();
  });
});

formCheckboxes.forEach((element)  => {
  element.addEventListener('change', (evt) => {
    evt.preventDefault();
    removeMarkers();
    filter();
  });
});
