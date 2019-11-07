'use strict';

(function () {
  var DEFAULT_X = 570;
  var DEFAULT_Y = 375;
  var BIG_PIN_HALF_SIZE = 33;
  var BIG_PIN_HEIGHT_ACTIVE = 70;
  var X_MAP_MIN = 0 - BIG_PIN_HALF_SIZE;
  var X_MAP_MAX = document.querySelector('.map__overlay').offsetWidth - BIG_PIN_HALF_SIZE;
  var Y_MAP_MIN = 130;
  var Y_MAP_MAX = 630;
  var pinMain = document.querySelector('.map__pin--main');

  var startX = function (selector) {
    var element = document.querySelector(selector);
    var x = Math.round(parseInt(element.style.left, 10)) + BIG_PIN_HALF_SIZE;
    return x;
  };

  var startY = function (selector, isActive) {
    var element = document.querySelector(selector);
    var y = Math.round(parseInt(element.style.top, 10)) +
    (isActive ? BIG_PIN_HEIGHT_ACTIVE : BIG_PIN_HALF_SIZE);
    return y;
  };

  var setStartAddress = function (selector, isActive) {
    var address = document.querySelector('#address');
    address.value = startX(selector) + ', ' + startY(selector, isActive);
  };

  var setAddress = function (x, y) {
    var address = document.querySelector('#address');
    address.value = x + ', ' + y;
    return address;
  };

  var setDefaultAddress = function () {
    pinMain.style.left = DEFAULT_X + 'px';
    pinMain.style.top = DEFAULT_Y + 'px';
    setAddress(DEFAULT_X + BIG_PIN_HALF_SIZE, DEFAULT_Y + BIG_PIN_HALF_SIZE);
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var offsetCoords = {
        x: pinMain.offsetLeft - shift.x,
        y: pinMain.offsetTop - shift.y
      };

      if (offsetCoords.x < X_MAP_MIN) {
        offsetCoords.x = X_MAP_MIN;
      } else if (offsetCoords.x > X_MAP_MAX) {
        offsetCoords.x = X_MAP_MAX;
      } else if (offsetCoords.y < Y_MAP_MIN) {
        offsetCoords.y = Y_MAP_MIN;
      } else if (offsetCoords.y > Y_MAP_MAX) {
        offsetCoords.y = Y_MAP_MAX;
      }

      pinMain.style.left = offsetCoords.x + 'px';
      pinMain.style.top = offsetCoords.y + 'px';
      setAddress(offsetCoords.x, offsetCoords.y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  pinMain.addEventListener('mousedown', onMouseDown);

  window.mainPin = {
    pinMain: pinMain,
    setStartAddress: setStartAddress,
    setAddress: setAddress,
    setDefaultAddress: setDefaultAddress,
  };
})();
