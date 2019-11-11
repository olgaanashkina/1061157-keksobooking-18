'use strict';

(function () {
  var PIN_HEIGHT = 70;
  var PIN_HALF_WIDTH = 25;
  var MAX_COUNT_OFFER = 5;
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

  var getIndex = function (element) {
    var button = element.closest('button');
    if (!button || button.classList.contains('map__pin--main')) {
      return null;
    }
    var parent = element.closest('.map__pins');
    var children = Array.prototype.slice.call(parent.children);

    return children.indexOf(button) - 2;
  };

  var onSuccess = function (proposals) {
    window.proposals = proposals;
    var sliceProposals = window.proposals.slice(0, MAX_COUNT_OFFER);
    createPins(sliceProposals);

    var openPopupClick = function (evt) {
      if (evt.type === 'click' && evt.target.closest('button')) {
        window.card.closePopup();
        var index = getIndex(evt.target);
        if (index !== null) {
          var filterProposals = window.filters.filtersMap(proposals);
          window.card.renderCard(filterProposals, index);
        }
      }
    };

    var pinsContainer = document.querySelector('.map__pins');
    pinsContainer.addEventListener('click', function (evt) {
      openPopupClick(evt);
    });

    return proposals;
  };

  var cleanPins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var onError = function (message) {
    window.message.renderMessageError(message);
  };

  var getMapPins = function () {
    window.proposals = (window.backend.load(URL, onSuccess, onError));
  };

  window.pin = {
    createPins: createPins,
    cleanPins: cleanPins,
    getMapPins: getMapPins,
  };
})();
