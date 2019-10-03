'use strict';

(function () {
  var DEFAULT_ROOM_NUMBER = '1';
  var MAX_ROOM_NUMBER = '100';
  var BIG_PIN_HALF_SIZE = 33;
  var BIG_PIN_HEIGHT_ACTIVE = 70;

  var roomNumber = document.querySelector('#room_number');
  var guestCount = document.querySelector('#capacity').children;

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

  window.form = {
    setAddress: setAddress,
    setStateElement: setStateElement,
    setCapacity: setCapacity,
  };
})();
