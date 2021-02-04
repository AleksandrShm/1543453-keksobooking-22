'use strict';

// Возвращает случайное целое число из переданного диапазона включительно
const getRandomInt = (min, max) => {
  // если min, max не число, взвращаем NaN
  if (!(typeof min === 'number') || !(typeof max === 'number')) {
    return NaN;
  }
  // если введены некорректные значения, возвращаем undefined
  if (min < 0 || max < 0 || (min === max) || min > max) {
    return undefined;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Возвращает случайное число с плавающей точкой из переданного диапазона включительно с указанным кол-вом знаков после запятой
const getRandomFloat = (min, max, level = 0) => {
  // если min, max, level не число, взвращаем NaN
  if (!(typeof min === 'number') || !(typeof max === 'number') || !(typeof level === 'number')) {
    return NaN;
  }
  // если введены некорректные значения или level не целое число, возвращаем undefined
  if (min < 0 || max < 0 || (min === max) || min > max || level < 0 || !(level % 1 === 0)) {
    return undefined;
  }
  min = Math.ceil(min * Math.pow(10, level));
  max = Math.floor(max * Math.pow(10, level));
  return +((Math.floor(Math.random() * (max - min + 1)) + min) * Math.pow(10, -level)).toFixed(level);
};

// Возвращает массив случайной длины, но не больше maxLength (по умолчанию - длина массива-источника), из значений принятого массива, значения не повторяются. Элементами нового массива являются СТРОКИ
const getRandomArray = (sourceArray, maxLength = sourceArray.length) => {
  const randomArrayLength = getRandomInt(1, maxLength);
  const tempArray = sourceArray.slice();
  const randomArray = [];
  for (let i = 0; i < randomArrayLength; i++) {
    randomArray.push((tempArray.splice(getRandomInt(0, tempArray.length - 1), 1)).join());
  }
  return randomArray;
};

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
      avatar: 'img/avatars/user0' + getRandomInt(MIN_AVATAR, MAX_AVATAR) + '.png',
    },
    offer: {
      title: 'Милая, уютная квартирка в центре Токио',
      address: String(locationX) + ', ' + String(locationY),
      price: getRandomInt(MIN_PRICE, MAX_PRICE),
      type: LODGING_TYPES[getRandomInt(0, LODGING_TYPES.length - 1)],
      rooms: getRandomInt(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomInt(MIN_GUESTS, MAX_GUESTS),
      checkin: TIME_LIMITS[getRandomInt(0, TIME_LIMITS.length - 1)],
      checkout: TIME_LIMITS[getRandomInt(0, TIME_LIMITS.length - 1)],
      features: getRandomArray(ALL_FEATURES, ALL_FEATURES.length),
      description: 'Прекрасная инфраструктура вокруг: театры и музеи, супермаркеты и магазины, салоны красоты и фитнес-клубы, офисы банков, рестораны и кафе, скверы и парки.',
      photos: getRandomArray(ALL_PHOTOS, ALL_PHOTOS.length),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
};
/* eslint-disable-next-line */
const lodgingDescriptions = new Array(LODGING_DESCRIPTION_COUNT).fill(null).map(() => createLodgingDescription());
