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

var x = getRandomInteger(1, getElementWidth('.map') - PIN_HALF_WIDTH);
var y = getRandomInteger(130, 630) - PIN_HEIGHT;

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
  var additionsList = ADDITIONS.splice(0, getRandomInteger(0, ADDITIONS.length - 1));
  return additionsList;
};

var getDescription = function () {
  var description = DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)];
  return description;
};

var getHotelPhoto = function () {
  var hotelPhoto = HOTEL_PHOTOS.splice(0, getRandomInteger(0, HOTEL_PHOTOS.length - 1));
  return hotelPhoto;
};

var getProposal = function () {
  return {
    author: {
      avatar: getAvatar(1)
    },
    offer: {
      title: getTitle(),
      address: x + ', ' + y,
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
      x: x,
      y: y
    }
  };
};

var userMap = document.querySelector('.map');

var getProposals = function () {
  var proposals = [];

  for (var i = 0; i < MAX_COUNT_OFFER; i++) {
    proposals.push(getProposal());
  }

  return proposals;
};

var createProposal = function () {
  var proposalItem = document.createElement('template');

  proposalItem.className = 'test';
  proposalItem.innerHTML = '<img class="test__avatar" scr=""  width="70" height="70" alt="Аватар пользователя"><h3 class="test__title"></h3><p class="test__address"></p><p class="test__price"></p><p class="test__type"></p><p class="test__number"></p><p class="test__time"></p><p class="test__addition"></p><p class="test__description"></p><p class="test__photo"></p><p class="test__x"></p><p class="test__y"></p>';

  userMap.appendChild(proposalItem);

  return proposalItem;
};

var templateItem = document.querySelector('.test');

var fillProposal = function (proposal) {
  var proposalItemContent = templateItem.cloneNode(true);

  proposalItemContent.querySelector('.test__avatar').src = proposal.author.avatar;
  proposalItemContent.querySelector('.test__title').textContent = proposal.offer.title;
  proposalItemContent.querySelector('.test__address').textContent = proposal.offer.address;
  proposalItemContent.querySelector('.test__price').textContent = proposal.offer.price;
  proposalItemContent.querySelector('.test__type').textContent = proposal.offer.type;
  proposalItemContent.querySelector('.test__number').textContent = proposal.offer.rooms + ' комнаты для ' + proposal.offer.guests + ' гостей';
  proposalItemContent.querySelector('.test__time').textContent = 'Заезд после ' + proposal.offer.checkin + ', выезд до ' + proposal.offer.checkout;
  proposalItemContent.querySelector('.test__description').textContent = proposal.description;
  proposalItemContent.querySelector('.test__photo').src = proposal.offer.photos;
  proposalItemContent.querySelector('.test__x').textContent = proposal.location.x;
  proposalItemContent.querySelector('.test__y').textContent = proposal.location.y;

  return proposalItemContent;
};

var createProposals = function (container, proposals) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < MAX_COUNT_OFFER; i++) {
    fragment.appendChild(fillProposal(proposals[i]));
  }
  container.appendChild(fragment);
};

var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('img');

var createPin = function (proposal) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.querySelector('img').src = proposal.author.avatar;
  pinElement.querySelector('img').alt = proposal.offer.title;
  pinElement.querySelector('img').style = 'left: ' + proposal.location.x + 'px; top: ' + proposal.location.x + 'px;';

  return pinElement;
};

var createPins = function (container, proposals) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < MAX_COUNT_OFFER; i++) {
    fragment.appendChild(createPin(proposals[i]));
  }
  container.appendChild(fragment);
};

activateElement('.map');
createProposal();
var proposals = getProposals();
createProposals(similarPinTemplate, proposals);
createPins(similarPinTemplate, proposals);
