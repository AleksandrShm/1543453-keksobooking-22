import {setUserFormSubmit, onSuccessClear, showError} from './form.js';
import {getData} from './api.js';

getData();

setUserFormSubmit(onSuccessClear, showError);
