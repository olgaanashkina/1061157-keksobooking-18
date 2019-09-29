'use strict';

var ENTER_KEYCODE = 13;
var BIG_PIN_HALF_SIZE = 33;
var BIG_PIN_HEIGHT_ACTIVE = 70;
var DEFAULT_ROOM_NUMBER = '1';
// var MAX_COUNT_OFFER = 8;
// var PIN_HEIGHT = 70;
// var PIN_HALF_WIDTH = 25;
// var OFFER_TITLES = ['Выгодное предложение', 'Удобное расположение', 'Метро рядом'];
// var PRICES = [1000, 3000, 5000, 9000, 12000, 15000, 18000, 20000];
// var TYPES = ['palace', 'flat', 'house', 'bungalo'];
// var MIN_COUNT_ROOMS = 1;
// var MAX_COUNT_ROOMS = 5;
// var MIN_COUNT_GUESTS = 1;
// var MAX_COUNT_GUESTS = 10;
// var CHECK_TIMES = ['12:00', '13:00', '14:00'];
// var ADDITIONS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// var DESCRIPTIONS = ['Оформление в стиле минимализм', 'Завтрак включен в стоимость проживания', 'Комната хранения багажа - бесплатно'];
// var HOTEL_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var activateElement = function (selector, nameClass) {
  var element = document.querySelector(selector);
  element.classList.remove(nameClass);
};

// var getRandomInteger = function (min, max) {
//   var rand = min + Math.random() * (max + 1 - min);
//   return Math.floor(rand);
// };
//
// var getElementWidth = function (selector) {
//   var elementWidth = document.querySelector(selector).offsetWidth;
//   return elementWidth;
// };
//
// var getX = function () {
//   return getRandomInteger(1, getElementWidth('.map'));
// };
//
// var getY = function () {
//   return getRandomInteger(130, 630);
// };
//
// var getAvatar = function (index) {
//   var avatarImage = 'img/avatars/user0' + (index + 1) + '.png';
//   return avatarImage;
// };
//
// var getRandomItem = function (arr) {
//   var randomItem = arr[getRandomInteger(0, arr.length - 1)];
//   return randomItem;
// };
//
// var getRandomItemSlice = function (arr) {
//   var randomItemSlice = arr.slice(getRandomInteger(0, arr.length - 2));
//   return randomItemSlice;
// };
//
// var getProposal = function (index) {
//   return {
//     author: {
//       avatar: getAvatar(index)
//     },
//     offer: {
//       title: getRandomItem(OFFER_TITLES),
//       address: getX() + ', ' + getY(),
//       price: getRandomItem(PRICES),
//       type: getRandomItem(TYPES),
//       rooms: getRandomInteger(MIN_COUNT_ROOMS, MAX_COUNT_ROOMS),
//       guests: getRandomInteger(MIN_COUNT_GUESTS, MAX_COUNT_GUESTS),
//       checkin: getRandomItem(CHECK_TIMES),
//       checkout: getRandomItem(CHECK_TIMES),
//       features: getRandomItemSlice(ADDITIONS),
//       description: getRandomItem(DESCRIPTIONS),
//       photos: getRandomItemSlice(HOTEL_PHOTOS)
//     },
//     location: {
//       x: getX(),
//       y: getY()
//     }
//   };
// };
//
// var getProposals = function () {
//   var proposals = [];
//
//   for (var i = 0; i < MAX_COUNT_OFFER; i++) {
//     proposals.push(getProposal(i));
//   }
//   return proposals;
// };
//
// var similarPinTemplate = document.querySelector('#pin')
//     .content
//     .querySelector('.map__pin');
//
// var createPin = function (proposal) {
//   var pinElement = similarPinTemplate.cloneNode(true);
//   pinElement.style = 'left: ' + (proposal.location.x - PIN_HALF_WIDTH) + 'px; top: ' + (proposal.location.y - PIN_HEIGHT) + 'px;';
//   var pinImage = pinElement.querySelector('img');
//   pinImage.src = proposal.author.avatar;
//   pinImage.alt = proposal.offer.title;
//
//   return pinElement;
// };
//
// var createPins = function (proposals) {
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < MAX_COUNT_OFFER; i++) {
//     fragment.appendChild(createPin(proposals[i]));
//   }
//   return fragment;
// };
//
// activateElement('.map', 'map--faded');
// var proposals = getProposals();
// document.querySelector('.map__pins');
//   .appendChild(createPins(proposals));

var locationX = function (selector) {
  var element = document.querySelector(selector);
  var x = Math.round(parseInt(element.style.left, 10)) + BIG_PIN_HALF_SIZE;
  return x;
};

var locationY = function (selector, isActive) {
  var element = document.querySelector(selector);
  var y = Math.round(parseInt(element.style.top, 10)) +
  (isActive ? BIG_PIN_HEIGHT_ACTIVE : BIG_PIN_HALF_SIZE);
  return y;
};

var setAddress = function (selector, isActive) {
  var address = document.querySelector('#address');
  address.value = '{' + locationX(selector) + ', ' + locationY(selector, isActive) + '}';
};

var setStateElement = function (selector, boolean) {
  var fields = document.querySelectorAll(selector + ' fieldset', selector + ' select');
  for (var i = 0; i < fields.length; i++) {
    fields[i].disabled = boolean;
  }
};

var roomNumber = document.querySelector('#room_number');
var guestCount = document.querySelector('#capacity').children;

var setCapacity = function (room) {
  if (typeof room === 'undefined') {
    room = DEFAULT_ROOM_NUMBER;
  }
  if (room === '100') {
    room = '0';
  }
  for (var i = 0; i < guestCount.length; i++) {
    if (guestCount[i].value <= room) {
      guestCount[i].disabled = false;
    } else {
      guestCount[i].disabled = true;
    }
    if (room !== '0' && guestCount[i].value === '0') {
      guestCount[i].disabled = true;
    }
    if (room === '0' && guestCount[i].value === '0') {
      guestCount[i].selected = true;
    } else if (guestCount[i].value === '1') {
      guestCount[i].selected = true;
    }
  }
};

setAddress('.map__pin--main', false);
setStateElement('.ad-form', true);
setStateElement('.map__filters', true);
setCapacity();

var pinMapActive = document.querySelector('.map__pin--main');

var onUserPinDown = function () {
  setAddress('.map__pin--main', true);
  activateElement('.map', 'map--faded');
  activateElement('.ad-form', 'ad-form--disabled');
  setStateElement('.ad-form', false);
  setStateElement('.map__filters', false);
};

pinMapActive.addEventListener('mousedown', function () {
  onUserPinDown();
});

pinMapActive.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onUserPinDown();
  }
});

var onRoomNumberChange = function (room) {
  setCapacity(room);
};

roomNumber.addEventListener('change', function (evt) {
  onRoomNumberChange(evt.target.value);
});
