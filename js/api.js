const urlGetData = 'https://22.javascript.pages.academy/keksobooking/data';
const urlSendData = 'https://22.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => {
  fetch(urlGetData)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onError();
      }
    })
    .then((descriptions) => {
      onSuccess(descriptions);
    })
    .catch(() => {
      onError();
    });
};

const sendData = (formData, onSuccess, onError) => {

  fetch(
    urlSendData,
    {
      method: 'POST',
      body: formData,
    },

  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onError();
    }
  })
    .catch(() => {
      onError();
    })
}

export {getData, sendData};
