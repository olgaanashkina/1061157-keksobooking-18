'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
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

  var getRoomEnd = function (rooms) {
    if (rooms === 1) {
      return ' комната';
    }
    if (rooms >= 2 && rooms <= 4) {
      return ' комнаты';
    }
    return ' комнат';
  };

  var getGuestEnd = function (rooms) {
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
    var cardAddress = cardElement.querySelector('.popup__text--address');
    cardAddress.textContent = card.offer.address;
    var cardPrice = cardElement.querySelector('.popup__text--price');
    cardPrice.textContent = card.offer.price + '₽/ночь';
    var cardType = cardElement.querySelector('.popup__type');
    cardType.textContent = getType(card.offer.type);
    var cardCapacity = cardElement.querySelector('.popup__text--capacity');
    cardCapacity.textContent = card.offer.rooms + getRoomEnd(card.offer.rooms) + ' для ' + card.offer.guests + getGuestEnd(card.offer.guests);
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

  var onCloseButtonClick = function () {
    closePopup();
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var closePopup = function () {
    var popup = document.querySelector('.popup');
    if (popup) {
      var buttonClosePopup = popup.querySelector('.popup__close');
      buttonClosePopup.addEventListener('click', onCloseButtonClick);
      document.addEventListener('keydown', onPopupEscPress);
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

  window.card = {
    closePopup: closePopup,
    renderCard: renderCard
  };

})();
