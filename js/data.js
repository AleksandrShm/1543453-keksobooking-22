import {getRandomInt, getRandomFloat, getRandomArray} from './utils.js';

const MIN_AVATAR = 1;
const MAX_AVATAR = 8;
const MIN_PRICE = 1;
const MAX_PRICE = 100000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 7;
const MIN_GUESTS = 1;
const MAX_GUESTS = 12;
const MIN_LATITUDE = 35.65;
const MAX_LATITUDE = 35.70;
const MIN_LONGITUDE = 139.70;
const MAX_LONGITUDE = 139.80;
const COORD_PRECISION = 5;
const LODGING_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const TIME_LIMITS = [
  '12:00',
  '13:00',
  '14:00',
];
const ALL_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const ALL_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const LODGING_DESCRIPTION_COUNT = 10;

//Создает объект описания объявления
const createLodgingDescription = () => {
  const locationX = getRandomFloat(MIN_LATITUDE, MAX_LATITUDE, COORD_PRECISION);
  const locationY = getRandomFloat(MIN_LONGITUDE, MAX_LONGITUDE, COORD_PRECISION);
  return {
    author: {
      avatar: `img/avatars/user0${getRandomInt(MIN_AVATAR, MAX_AVATAR)}.png`,
    },
    offer: {
      title: 'Милая, уютная квартирка в центре Токио',
      address: `${locationX}, ${locationY}`,
      price: getRandomInt(MIN_PRICE, MAX_PRICE),
      type: LODGING_TYPES[getRandomInt(0, LODGING_TYPES.length - 1)],
      rooms: getRandomInt(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomInt(MIN_GUESTS, MAX_GUESTS),
      checkin: TIME_LIMITS[getRandomInt(0, TIME_LIMITS.length - 1)],
      checkout: TIME_LIMITS[getRandomInt(0, TIME_LIMITS.length - 1)],
      features: getRandomArray(ALL_FEATURES),
      description: 'Прекрасная инфраструктура вокруг: театры и музеи, супермаркеты и магазины, салоны красоты и фитнес-клубы, офисы банков, рестораны и кафе, скверы и парки.',
      photos: getRandomArray(ALL_PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
};

const getLodgingDescriptions = () => {
  return new Array(LODGING_DESCRIPTION_COUNT).fill(null).map(createLodgingDescription);
}

export {getLodgingDescriptions};
export {ALL_FEATURES};
