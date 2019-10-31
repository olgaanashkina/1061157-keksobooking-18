'use strict';

(function () {
  window.mainPin.setStartAddress('.map__pin--main', false);
  window.form.setStateElement('.ad-form', true);
  window.form.setStateElement('.map__filters', true);
  window.form.setCapacity();

  var onUserPinDown = function () {
    window.mainPin.setStartAddress('.map__pin--main', true);
    window.util.isActivateElement('.map', 'map--faded');
    window.util.isActivateElement('.ad-form', 'ad-form--disabled');
    window.form.setStateElement('.ad-form', false);
    window.form.setStateElement('.map__filters', false);
  };

  window.mainPin.pinMain.addEventListener('mousedown', function () {
    onUserPinDown();
    window.pin.getMapPins();
  },
  {once: true}
  );

  window.mainPin.pinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, onUserPinDown);
    window.pin.getMapPins();
  });
})();
