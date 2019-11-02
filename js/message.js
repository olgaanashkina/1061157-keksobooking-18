'use strict';

(function () {

  var renderMessageError = function (message) {
    var main = document.querySelector('main');
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorBlock = errorTemplate.cloneNode(true);
    errorBlock.querySelector('.error__message').textContent = message;
    main.appendChild(errorBlock);
    var removeErrorBlock = function () {
      errorBlock.remove();
    };
    var errorButton = errorBlock.querySelector('.error__button');
    errorButton.addEventListener('click', removeErrorBlock);
    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, removeErrorBlock);
    });
  };

  var renderMessageSuccess = function () {
    var main = document.querySelector('main');
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successBlock = successTemplate.cloneNode(true);
    // successBlock.querySelector('.success__message').textContent = message;
    main.appendChild(successBlock);
    var removeSuccessBlock = function () {
      successBlock.remove();
    };
    document.addEventListener('click', removeSuccessBlock);
    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, removeSuccessBlock);
    });
  };


  window.message = {
    renderMessageError: renderMessageError,
    renderMessageSuccess: renderMessageSuccess
  };
})();
