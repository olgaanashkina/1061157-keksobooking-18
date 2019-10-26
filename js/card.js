'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var popup = document.querySelector('.popup');
  var popupClose = document.querySelector('.popup__close');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var getType = function (type) {
    if (type === 'flat') {
      return 'Квартира';
    } else if (type === 'bungalo') {
      return 'Бунгало';
    } else if (type === 'house') {
      return 'Дом';
    }
    return 'Дворец';
  };

  var getRoomEnd = function () {
    if (rooms === 1) {
      return ' комната';
    }
    if (rooms >= 2 && rooms <= 4) {
      return ' комнаты';
    }
    return ' комнат';
  };

  var getGuestEnd = function () {
    if (rooms === 1) {
      return ' гостя';
    }
    return ' гостей';
  };

  var getFeatures = function (features) {
    var featuresTag = '';
    for (var i = 0; i < features.length; i++) {
      featuresTag += '<li class="popup__feature popup__feature--' + features[i] + '"></li>';
    }
    return featuresTag;
  };

  var getPhotos = function (photos) {
    var photosTag = '';
    for (var i = 0; i < photos.length; i++) {
      photosTag += '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }
    return photosTag;
  };

  var createCard = function (card) {
    var cardElement = similarCardTemplate.cloneNode(true);
    var cardTitle = cardElement.querySelector('.popup__title');
    cardTitle.textContent = card.offer.title;
    var cardAddress = cardElement.querySelector('popup__text--address');
    cardAddress.textContent = card.offer.address;
    var cardPrice = cardElement.querySelector('.popup__text--price');
    cardPrice.textContent = card.offer.price + '₽/ночь';
    var cardType = cardElement.querySelector('.popup__type');
    cardType.textContent = getType(card.offer.title);
    var cardCapacity = cardElement.querySelector('.popup__text--capacity');
    cardCapacity.textContent = card.offer.rooms + getRoomEnd(proposal.offer.rooms) + ' для ' + card.offer.guests + getGuestEnd(proposal.offer.guests);
    var cardTime = cardElement.querySelector('.popup__text--time');
    cardTime.textContent = 'Заезд после ' + card.offer.checkin + ', выезд после ' + card.offer.checkout;
    var cardFeatures = cardElement.querySelector('.popup__features');
    cardFeatures.innerHTML = getFeatures(card.offer.features);
    var cardDescription = cardElement.querySelector('.popup__description');
    cardDescription.textContent = card.offer.description;
    var cardPhotos = cardElement.querySelector('.popup__photos');
    cardPhotos.innerHTML = getPhotos(card.offer.photos);
    var cardAvatar = cardElement.querySelector('.popup__avatar');
    cardAvatar.src = card.author.avatar;

    return cardElement;
  };

  var deleteCard = function () {
    if (popup) {
      popup.remove();
    }
  };

  var renderCard = function (proposals, index) {
    var fragment = document.createDocumentFragment();
    var offerCard = createCard(proposals[index]);
    fragment.appendChild(offerCard);
    map.insertBefore(fragment, mapFiltersContainer);

    return offerCard;
  };

  var currentCard = function (proposals, index) {
    var pins = mapPins.querySelectorAll('.map__pin');
    var availablePins = [];
    for (var i = 1; i < pins.length; i++) {
      availablePins.push(pins[i]);
    }
    var index = availablePins.indexOf.call(pins, pins[i]);
    var card = renderCard(proposals, index);

    var onClosePopup = function (evt) {
      if (evt.type === 'click') {
        card.remove();
      }
    };

    popupClose.EventListener('click', onClosePopup);
  };

  window.card = {
    currentCard: currentCard
  };

})();
