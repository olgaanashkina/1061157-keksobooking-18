'use strict';

(function () {
  var pinMapActive = document.querySelector('.map__pin--main');

  window.form.setAddress('.map__pin--main', false);
  window.form.setStateElement('.ad-form', true);
  window.form.setStateElement('.map__filters', true);
  window.form.setCapacity();

  var onUserPinDown = function () {
    window.form.setAddress('.map__pin--main', true);
    window.util.isActivateElement('.map', 'map--faded');
    window.util.isActivateElement('.ad-form', 'ad-form--disabled');
    window.form.setStateElement('.ad-form', false);
    window.form.setStateElement('.map__filters', false);
  };

  pinMapActive.addEventListener('mousedown', function () {
    onUserPinDown();
    window.pin.getMapPins();
  });

  pinMapActive.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, onUserPinDown);
  });
})();
