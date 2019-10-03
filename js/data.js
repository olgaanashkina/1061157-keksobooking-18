'use strict';

(function () {
  var MAX_COUNT_OFFER = 8;
  var OFFER_TITLES = ['Выгодное предложение', 'Удобное расположение', 'Метро рядом'];
  var PRICES = [1000, 3000, 5000, 9000, 12000, 15000, 18000, 20000];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var MIN_COUNT_ROOMS = 1;
  var MAX_COUNT_ROOMS = 5;
  var MIN_COUNT_GUESTS = 1;
  var MAX_COUNT_GUESTS = 10;
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
  var ADDITIONS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['Оформление в стиле минимализм', 'Завтрак включен в стоимость проживания', 'Комната хранения багажа - бесплатно'];
  var HOTEL_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var getElementWidth = function (selector) {
    var elementWidth = document.querySelector(selector).offsetWidth;
    return elementWidth;
  };

  var getX = function () {
    return window.util.getRandomInteger(1, getElementWidth('.map'));
  };

  var getY = function () {
    return window.util.getRandomInteger(130, 630);
  };

  var getAvatar = function (index) {
    var avatarImage = 'img/avatars/user0' + (index + 1) + '.png';
    return avatarImage;
  };

  var getRandomItem = function (arr) {
    var randomItem = arr[window.util.getRandomInteger(0, arr.length - 1)];
    return randomItem;
  };

  var getRandomItemSlice = function (arr) {
    var randomItemSlice = arr.slice(window.util.getRandomInteger(0, arr.length - 2));
    return randomItemSlice;
  };

  var getProposal = function (index) {
    return {
      author: {
        avatar: getAvatar(index)
      },
      offer: {
        title: getRandomItem(OFFER_TITLES),
        address: getX() + ', ' + getY(),
        price: getRandomItem(PRICES),
        type: getRandomItem(TYPES),
        rooms: window.util.getRandomInteger(MIN_COUNT_ROOMS, MAX_COUNT_ROOMS),
        guests: window.util.getRandomInteger(MIN_COUNT_GUESTS, MAX_COUNT_GUESTS),
        checkin: getRandomItem(CHECK_TIMES),
        checkout: getRandomItem(CHECK_TIMES),
        features: getRandomItemSlice(ADDITIONS),
        description: getRandomItem(DESCRIPTIONS),
        photos: getRandomItemSlice(HOTEL_PHOTOS)
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

  window.data = {
    MAX_COUNT_OFFER: MAX_COUNT_OFFER,
    getProposals: getProposals,
  };
})();
