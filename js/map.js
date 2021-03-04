/* global L:readonly */
import {setElementsDisabled, removeElementsDisabled} from './utils.js';
import {createDescriptionsCards} from './popup.js';

const CENTER_LATITUDE = 35.68000;
const CENTER_LONGITUDE = 139.76000;
const MAP_SCALE = 9;
const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileLayerCopyRight = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const mainIconImage = {
  url: '../img/main-pin.svg',
  size: [52, 52],
  anchor: [26, 52],
};
const iconImage = {
  url: '../img/pin.svg',
  size: [40, 40],
  anchor: [20, 40],
};
const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelects = mapFilters.querySelectorAll('select');
const mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');
const markersArr = [];

// функция делает недоступными интерактивные элементы страницы, добавляет класс неактивного состояния
const deactivatePage = () => {
  adForm.classList.add('ad-form--disabled');
  setElementsDisabled(adFormFieldsets);
  mapFilters.classList.add('map__filters--disabled');
  setElementsDisabled(mapFiltersSelects);
  setElementsDisabled(mapFiltersFieldsets);
};

// функция, обратная deactivatePage - интерактивные элементы становятся доступными, кроме поля выбора фильтров
const activatePage = () => {
  adForm.classList.remove('ad-form--disabled');
  removeElementsDisabled(adFormFieldsets);
  //mapFilters.classList.remove('map__filters--disabled');
  //removeElementsDisabled(mapFiltersSelects);
  //removeElementsDisabled(mapFiltersFieldsets);
};

// активирует поле фильтров объявлений
const activateFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  removeElementsDisabled(mapFiltersSelects);
  removeElementsDisabled(mapFiltersFieldsets);
}

// выполняется функция action при завершении инициализации 'load' карты map
const onLoadMapEvent = (map, action) => {
  return map.on('load', action);
};

// устанавливает координаты lat, lng центра карты map и ее масштаб scale
const setViewMap = (map, lat, lng, scale) => {
  map.setView({
    lat: lat,
    lng: lng,
  }, scale);
};

// создает и добавляет тайловую подложку на карту map
const addTileLayerMap = (map, url, attribution) => {
  L.tileLayer(
    url,
    {
      attribution: attribution,
    },
  ).addTo(map);
};

// принимает массив с объявлениями descriptions, добавляет по координатам метки iconImage на карту с прикрепленными всплывающими карточками коллекции popups
const addMapDescriptionsMarkersPopup = (descriptions, popups) => {
  descriptions.forEach((descriptionItem, index) => {
    const {location} = descriptionItem;
    const {url, size, anchor} = iconImage;
    const icon = L.icon({
      iconUrl: url,
      iconSize: size,
      iconAnchor: anchor,
    });
    const marker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon,
      },
    );
    markersArr.push(marker);
    marker.addTo(map).bindPopup(popups.childNodes[index],
      {
        keepInView: true,
      });
  });
};

deactivatePage();

const map = L.map('map-canvas');
onLoadMapEvent(map, activatePage);
setViewMap(map, CENTER_LATITUDE, CENTER_LONGITUDE, MAP_SCALE);
addTileLayerMap(map, tileLayerUrl, tileLayerCopyRight);

const mainPinIcon = L.icon({
  iconUrl: mainIconImage.url,
  iconSize: mainIconImage.size,
  iconAnchor: mainIconImage.anchor,
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

// сбрасываем адрес и маркер адреса к первоначальному значению, передвигаем маркер к начальны координатам
const resetAddress = () => {
  address.value = `${CENTER_LATITUDE.toFixed(5)}, ${CENTER_LONGITUDE.toFixed(5)}`;
  address.setAttribute('readonly', true);
  mainPinMarker.setLatLng({
    lat: CENTER_LATITUDE,
    lng: CENTER_LONGITUDE,
  });
};

mainPinMarker.on('move', (evt) => {
  const newAddressForm = evt.target.getLatLng();
  address.value = `${(newAddressForm.lat).toFixed(5)}, ${(newAddressForm.lng).toFixed(5)}`;
});

// добавляет на карту маркеры с прикрепленными popups, принимает параметр descriptions
const addMapMarkersWithPopups = (descriptions) => {
  addMapDescriptionsMarkersPopup(descriptions, createDescriptionsCards(descriptions));
};

const onSuccessAddDescriptions = (descriptions) => {
  addMapMarkersWithPopups(descriptions);
};

// удаляет все маркеры объявлений с карты, закрывает открытые popup и отвязывает все popup от marker
const removeMarkers = () => {
  markersArr.forEach(marker => {
    marker.closePopup();
    marker.unbindPopup();
    marker.removeFrom(map);
  });
  markersArr.splice(0, markersArr.length - 1);
}

export {resetAddress, onSuccessAddDescriptions, addMapMarkersWithPopups, removeMarkers, activateFilters};
