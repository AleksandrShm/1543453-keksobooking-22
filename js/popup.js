import {getLodgingDescriptions} from './data.js';

const lodgingDescriptions = getLodgingDescriptions();
const mapCanvas = document.querySelector('#map-canvas');
const templateCard = document.querySelector('#card').content;
const card = templateCard.querySelector('article');
const cards = document.createDocumentFragment();
const listFeatures = templateCard.querySelector('.popup__features');
const templatePhoto = templateCard.querySelector('.popup__photo');

const getCyrillicType = (lodgingType) => {
  switch (lodgingType) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
};

const createListFeatures = (featuresArray) => {
  const fragmentFeatures = document.createDocumentFragment();
  for (let i = 0; i < featuresArray.length; i++) {
    switch (featuresArray[i]) {
      case 'wifi':
        fragmentFeatures.appendChild(listFeatures.children[0].cloneNode(true));
        break;
      case 'dishwasher':
        fragmentFeatures.appendChild(listFeatures.children[1].cloneNode(true));
        break;
      case 'parking':
        fragmentFeatures.appendChild(listFeatures.children[2].cloneNode(true));
        break;
      case 'washer':
        fragmentFeatures.appendChild(listFeatures.children[3].cloneNode(true));
        break;
      case 'elevator':
        fragmentFeatures.appendChild(listFeatures.children[4].cloneNode(true));
        break;
      case 'conditioner':
        fragmentFeatures.appendChild(listFeatures.children[5].cloneNode(true));
        break;
    }
  }
  return fragmentFeatures;
}

const createListPhotos = (photoArray) => {
  const fragmentPhotos = document.createDocumentFragment();
  for (let i = 0; i < photoArray.length; i++) {
    fragmentPhotos.appendChild(templatePhoto.cloneNode(true));
    fragmentPhotos.childNodes[i].src = photoArray[i];
  }
  return fragmentPhotos;
}

for (let i = 0; i < lodgingDescriptions.length; i++) {
  const cardElement = card.cloneNode(true);
  cardElement.classList.add(`popup-${i+1}`);
  cardElement.querySelector('.popup__title').textContent = lodgingDescriptions[i].offer.title;
  cardElement.querySelector('.popup__text--address').textContent = lodgingDescriptions[i].offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${lodgingDescriptions[i].offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = getCyrillicType(lodgingDescriptions[i].offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${lodgingDescriptions[i].offer.rooms} комнаты для ${lodgingDescriptions[i].offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${lodgingDescriptions[i].offer.checkin}, выезд до ${lodgingDescriptions[i].offer.checkout}`;
  //удаляем шаблонные features из склонированного шаблона
  while (cardElement.querySelector('.popup__features').firstChild) {
    cardElement.querySelector('.popup__features').removeChild(cardElement.querySelector('.popup__features').firstChild);
  }
  //добавляем актуальные features из шаблона в разметку склонированного шаблона через функцию createListFeatures (в соответствии с переданным массивом)
  cardElement.querySelector('.popup__features').appendChild(createListFeatures(lodgingDescriptions[i].offer.features));
  cardElement.querySelector('.popup__description').textContent = lodgingDescriptions[i].offer.description;
  //удаляем шаблонные img из склонированного шаблона
  while (cardElement.querySelector('.popup__photos').firstChild) {
    cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photos').firstChild);
  }
  //добавляем актуальные img через функцию из массива
  cardElement.querySelector('.popup__photos').appendChild(createListPhotos(lodgingDescriptions[i].offer.photos));
  cardElement.querySelector('.popup__avatar').src = lodgingDescriptions[i].author.avatar;
  cards.appendChild(cardElement);
}

mapCanvas.appendChild(cards.childNodes[0]);
