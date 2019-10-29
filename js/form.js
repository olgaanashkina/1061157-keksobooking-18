'use strict';

(function () {
  var DEFAULT_ROOM_NUMBER = '1';
  var MAX_ROOM_NUMBER = '100';
  var BIG_PIN_HALF_SIZE = 33;
  var BIG_PIN_HEIGHT_ACTIVE = 70;
  var MAX_PRICE = '1000000';

  var form = document.querySelector('.ad-form');
  var roomNumber = form.querySelector('#room_number');
  var guestCount = form.querySelector('#capacity').children;
  var typeHouse = form.querySelector('#type');
  var title = form.querySelector('#title');
  var price = form.querySelector('#price');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');

  var priceType = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  var setMinPrice = function () {
    price.min = priceType[typeHouse.value];
    price.placeholder = priceType[typeHouse.value];
  };

  typeHouse.addEventListener('change', function () {
    setMinPrice();
  });

  var getX = function (selector) {
    var element = document.querySelector(selector);
    var x = Math.round(parseInt(element.style.left, 10)) + BIG_PIN_HALF_SIZE;
    return x;
  };

  var getY = function (selector, isActive) {
    var element = document.querySelector(selector);
    var y = Math.round(parseInt(element.style.top, 10)) +
    (isActive ? BIG_PIN_HEIGHT_ACTIVE : BIG_PIN_HALF_SIZE);
    return y;
  };

  var setAddress = function (selector, isActive) {
    var address = document.querySelector('#address');
    address.value = getX(selector) + ', ' + getY(selector, isActive);
  };

  var setStateElement = function (selector, disabled) {
    var fields = document.querySelectorAll(selector + ' fieldset', selector + ' select');
    for (var i = 0; i < fields.length; i++) {
      fields[i].disabled = disabled;
    }
  };

  var setCapacity = function (room) {
    if (typeof room === 'undefined') {
      room = DEFAULT_ROOM_NUMBER;
    }
    if (room === MAX_ROOM_NUMBER) {
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

  var onRoomNumberChange = function (room) {
    window.form.setCapacity(room);
  };

  roomNumber.addEventListener('change', function (evt) {
    onRoomNumberChange(evt.target.value);
  });

  var validationTitle = function () {
    if (title.validity.tooShort) {
      title.setCustomValidity('Заголовок должен содержать не менее 30 символов');
    } else if (title.validity.tooLong) {
      title.setCustomValidity('Загловок должен содержать не более 100 символов');
    } else if (title.validity.valueMissing) {
      title.setCustomValidity('Поле обязательно для заполнения');
    } else {
      title.setCustomValidity('');
    }
  };

  title.addEventListener('input', function () {
    validationTitle();
  });

  var validationPrice = function () {
    if (price.validity.rangeOverflow) {
      price.setCustomValidity('Цена за ночь не должа быть больше' + MAX_PRICE);
    } else if (price.validity.typeMismatch) {
      price.setCustomValidity('Укажите числовое значение');
    } else if (price.validity.valueMissing) {
      price.setCustomValidity('Поле обязательно для заполнения');
    } else {
      price.setCustomValidity('');
    }
  };

  price.addEventListener('change', function () {
    validationPrice();
    setMinPrice();
  });

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  window.form = {
    setAddress: setAddress,
    setStateElement: setStateElement,
    setCapacity: setCapacity,
  };
})();
