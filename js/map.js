/* global L:readonly */
import {lodgingDescriptions} from './popup.js';
import {cards} from './popup.js';

const CENTER_LATITUDE = 35.68000;
const CENTER_LONGITUDE = 139.76000;
const MAP_SCALE = 13;
const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelects = mapFilters.querySelectorAll('select');
const mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');

const setElementsDisabled = (elements) => {
  elements.forEach((element) => {
    element.setAttribute('disabled', true);
  });
};

const removeElementsDisabled = (elements) => {
  elements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

adForm.classList.add('ad-form--disabled');
setElementsDisabled(adFormFieldsets);
mapFilters.classList.add('map__filters--disabled');
setElementsDisabled(mapFiltersSelects);
setElementsDisabled(mapFiltersFieldsets);

const map = L.map('map-canvas').on('load', () => {
  adForm.classList.remove('ad-form--disabled');
  removeElementsDisabled(adFormFieldsets);
  mapFilters.classList.remove('map__filters--disabled');
  removeElementsDisabled(mapFiltersSelects);
  removeElementsDisabled(mapFiltersFieldsets);
}).setView({
  lat: CENTER_LATITUDE,
  lng: CENTER_LONGITUDE,
}, MAP_SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: CENTER_LATITUDE,
    lng: CENTER_LONGITUDE,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const address = document.querySelector('#address');
address.value = `${CENTER_LATITUDE.toFixed(5)}, ${CENTER_LONGITUDE.toFixed(5)}`;
address.setAttribute('readonly', true);

mainPinMarker.on('move', (evt) => {
  const newAddressForm = evt.target.getLatLng();
  address.value = `${(newAddressForm.lat).toFixed(5)}, ${(newAddressForm.lng).toFixed(5)}`;
});

lodgingDescriptions.forEach((lodgingDescriptionItem, index) => {
  const {location} = lodgingDescriptionItem;
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const marker = L.marker(
    {
      lat: location.x,
      lng: location.y,
    },
    {
      icon,
    },
  );
  marker.addTo(map).bindPopup(cards.childNodes[index],
    {
      keepInView: true,
    });
});
