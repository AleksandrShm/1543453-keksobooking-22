import {setUserFormSubmit, onSuccessClear, showError} from './form.js';
import {getData, onErrorGetDataShowAlert} from './api.js';
import {onSuccessAddDescriptions} from './map.js';
import './filter.js';

getData(onSuccessAddDescriptions, onErrorGetDataShowAlert);

setUserFormSubmit(onSuccessClear, showError);
