'use strict';

(function () {
  var PIN_HEIGHT = 70;
  var PIN_HALF_WIDTH = 25;
  var URL = 'https://js.dump.academy/keksobooking/data';
  var mapPins = document.querySelector('.map__pins');

  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var createPin = function (proposal) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style = 'left: ' + (proposal.location.x - PIN_HALF_WIDTH) + 'px; top: ' + (proposal.location.y - PIN_HEIGHT) + 'px;';
    var pinImage = pinElement.querySelector('img');
    pinImage.src = proposal.author.avatar;
    pinImage.alt = proposal.offer.title;

    return pinElement;
  };

  var createPins = function (proposals) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < proposals.length; i++) {
      fragment.appendChild(createPin(proposals[i]));
    }
    mapPins.appendChild(fragment);
  };

  var onSuccess = function (proposals) {
    window.proposals = proposals;
    createPins(proposals);

    var openPopup = function (evt) {
      if (evt.type === 'click') {
        window.card.currentCard();
      }
    };

    mapPins.addEventListener('click', openPopup);

    return proposals;
  };

  var cleanPins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var onError = function (message) {
    var main = document.querySelector('main');
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorBlock = errorTemplate.cloneNode(true);
    errorBlock.querySelector('.error__message').textContent = message;
    main.appendChild(errorBlock);
    var errorButton = errorBlock.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      main.removeChild(errorBlock);
    });
  };

  var getMapPins = function () {
    window.proposals = window.backend.load(URL, onSuccess, onError);
  };

  window.pin = {
    createPins: createPins,
    cleanPins: cleanPins,
    getMapPins: getMapPins
  };
})();
