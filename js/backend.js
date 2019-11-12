'use strict';

(function () {
  var TIMEOUT = 10000;
  var URL = 'https://js.dump.academy/keksobooking';

  var requestError = function (onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var load = function (url, onLoad, onError) {
    var xhr = requestError(onError);
    xhr.addEventListener('load', function () {
      onLoad(window.filters.filtersMap(xhr.response));
    });
    xhr.open('GET', url);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = requestError(onError);
    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();
