import {clearAllChild} from './utils.js';
import {ALL_FEATURES} from './data.js';

const templateCard = document.querySelector('#card').content;
const card = templateCard.querySelector('article');
const cards = document.createDocumentFragment();
const listFeatures = templateCard.querySelector('.popup__features');
const templatePhoto = templateCard.querySelector('.popup__photo');

const placesMap = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
}

const createListFeatures = (features) => {
  const fragmentFeatures = document.createDocumentFragment();
  features.forEach((featureItem) => {
    const indexFeaturesChild = ALL_FEATURES.indexOf(featureItem);
    fragmentFeatures.appendChild(listFeatures.children[indexFeaturesChild].cloneNode(true));
  });
  return fragmentFeatures;
}

const createListPhotos = (photos) => {
  const fragmentPhotos = document.createDocumentFragment();
  photos.forEach((photoItem) => {
    fragmentPhotos.appendChild(templatePhoto.cloneNode(true));
    fragmentPhotos.lastChild.src = photoItem;
  });
  return fragmentPhotos;
}

const createDescriptionsCards = (lodgingDescriptions) => {
  // удаляем созданные ранее карточки объявлений, если есть
  if (cards.firstChild) {
    clearAllChild(cards);
  }
  lodgingDescriptions.forEach((lodgingDescriptionItem, index) => {
    const cardElement = card.cloneNode(true);
    const {author, offer} = lodgingDescriptionItem;
    const {avatar} = author;
    const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = offer;
    const popupTitle = cardElement.querySelector('.popup__title');
    const popupTextAddress = cardElement.querySelector('.popup__text--address');
    const popupTextPrice = cardElement.querySelector('.popup__text--price');
    const popupType = cardElement.querySelector('.popup__type');
    const popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
    const popupTextTime = cardElement.querySelector('.popup__text--time');
    const popupFeatures = cardElement.querySelector('.popup__features');
    const popupDescription = cardElement.querySelector('.popup__description');
    const popupPhotos = cardElement.querySelector('.popup__photos');
    const popupAvatar = cardElement.querySelector('.popup__avatar');
    cardElement.classList.add(`popup-${index+1}`);
    popupTitle.textContent = title;
    popupTextAddress.textContent = address;
    popupTextPrice.textContent = `${price} ₽/ночь`;
    popupType.textContent = placesMap[type];
    popupTextCapacity.textContent = `${rooms} комнаты для ${guests} гостей`;
    popupTextTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
    //удаляем шаблонные features из склонированного шаблона функцией clearAllChild
    clearAllChild(popupFeatures);
    //добавляем актуальные features из шаблона в разметку склонированного шаблона через функцию createListFeatures (в соответствии с переданным массивом)
    popupFeatures.appendChild(createListFeatures(features));
    popupDescription.textContent = description;
    //удаляем шаблонные img из склонированного шаблона функцией clearAllChild
    clearAllChild(popupPhotos);
    //добавляем актуальные img через функцию из массива
    popupPhotos.appendChild(createListPhotos(photos));
    popupAvatar.src = avatar;
    cards.appendChild(cardElement);
  });
  return cards;
};

export {createDescriptionsCards};
