'use strict';

(function () {
  var PIN_HEIGHT = 70;
  var PIN_HALF_WIDTH = 25;

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
    for (var i = 0; i < window.data.MAX_COUNT_OFFER; i++) {
      fragment.appendChild(createPin(proposals[i]));
    }
    return fragment;
  };

  var showMapPins = function () {
    var proposals = window.data.getProposals();
    document.querySelector('.map__pins')
      .appendChild(createPins(proposals));
  };

  window.pin = {
    showMapPins: showMapPins,
  };
})();
