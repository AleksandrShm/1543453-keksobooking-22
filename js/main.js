import {setUserFormSubmit, onSuccessClear, showError} from './form.js';
import {getData} from './api.js';
import {showAlert} from './utils.js';
import {addMapMarkersWithPopups} from './map.js';

getData((descriptions) => addMapMarkersWithPopups(descriptions), () => showAlert('Ошибка при загрузке данных. Попробуйте еще раз'));

setUserFormSubmit(onSuccessClear, showError);
