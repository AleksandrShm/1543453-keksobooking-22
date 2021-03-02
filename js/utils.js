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
    const tempArrayItem = tempArray.splice(getRandomInt(0, tempArray.length - 1), 1);
    randomArray.push(tempArrayItem[0]);
  }
  return randomArray;
};

//удаляет все Child-элементы переданного Parent-элемента (например шаблонные)
const clearAllChild = (parentElement) => {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.lastChild);
  }
};

//устанавливает атрибут "disabled = true" всем элементам коллекции
const setElementsDisabled = (elements) => {
  elements.forEach((element) => {
    element.setAttribute('disabled', true);
  });
};

//удаляет атрибут disabled у всех элементов переданной коллекции
const removeElementsDisabled = (elements) => {
  elements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

// показывает переданное сообщение message, убирает через  ALERT_SHOWN_TIME
const ALERT_SHOWN_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  const ALERT_CONTAINER_STYLES_CSS = 'z-index: 100; position: absolute; left: 0; top: 0; right: 0; padding: 10px 3px; font-size: 30px; text-align: center; background-color: red;';
  alertContainer.style.cssText = ALERT_CONTAINER_STYLES_CSS;

  alertContainer.textContent = message;

  document.body.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOWN_TIME);
}

export {getRandomInt, getRandomFloat, getRandomArray, clearAllChild, setElementsDisabled, removeElementsDisabled, showAlert};
