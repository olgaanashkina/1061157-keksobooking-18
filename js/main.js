'use strict';

var MAX_COUNT_OFFER = 8;
var PIN_HEIGHT = 70;
var PIN_HALF_WIDTH = 25;
var OFFER_TITLES = ['Выгодное предложение', 'Удобное расположение', 'Метро рядом'];
var PRICES = [1000, 3000, 5000, 9000, 12000, 15000, 18000, 20000];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var ADDITIONS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Оформление в стиле минимализм', 'Завтрак включен в стоимость проживания', 'Комната хранения багажа - бесплатно'];
var HOTEL_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var activateElement = function (selector) {
  var element = document.querySelector(selector);
  element.classList.remove('map--faded');
};

var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getElementWidth = function (selector) {
  var elementWidth = document.querySelector(selector).offsetWidth;
  return elementWidth;
};

var getX = function () {
  return getRandomInteger(1, getElementWidth('.map'));
};

var getY = function () {
  return getRandomInteger(130, 630);
};

var getAvatar = function (index) {
  var avatarImage = 'img/avatars/user0' + (index + 1) + '.png';
  return avatarImage;
};

var getTitle = function () {
  var titleRandom = OFFER_TITLES[getRandomInteger(0, OFFER_TITLES.length - 1)];
  return titleRandom;
};

var getPrice = function () {
  var priceRandom = PRICES[getRandomInteger(0, PRICES.length - 1)];
  return priceRandom;
};

var getType = function () {
  var typeRandom = TYPES[getRandomInteger(0, TYPES.length - 1)];
  return typeRandom;
};

var getTime = function () {
  var timeRandom = CHECK_TIMES[getRandomInteger(0, CHECK_TIMES.length - 1)];
  return timeRandom;
};

var getAdditionsList = function () {
  var additionsList = ADDITIONS.slice(getRandomInteger(0, ADDITIONS.length - 2));
  return additionsList;
};

var getDescription = function () {
  var description = DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)];
  return description;
};

var getHotelPhoto = function () {
  var hotelPhoto = HOTEL_PHOTOS.slice(getRandomInteger(0, HOTEL_PHOTOS.length - 2));
  return hotelPhoto;
};

var getProposal = function (index) {
  return {
    author: {
      avatar: getAvatar(index)
    },
    offer: {
      title: getTitle(),
      address: getX() + ', ' + getY(),
      price: getPrice(),
      type: getType(),
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 10),
      checkin: getTime(),
      checkout: getTime(),
      features: getAdditionsList(),
      description: getDescription(),
      photos: getHotelPhoto()
    },
    location: {
      x: getX(),
      y: getY()
    }
  };
};

var getProposals = function () {
  var proposals = [];

  for (var i = 0; i < MAX_COUNT_OFFER; i++) {
    proposals.push(getProposal(i));
  }
  return proposals;
};

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
  for (var i = 0; i < MAX_COUNT_OFFER; i++) {
    fragment.appendChild(createPin(proposals[i]));
  }
  return fragment;
};

activateElement('.map');
var proposals = getProposals();
document.querySelector('.map__pins')
  .appendChild(createPins(proposals));
