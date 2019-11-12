'use strict';

(function () {
  var DEFAULT_ROOM_NUMBER = '1';
  var MAX_ROOM_NUMBER = '100';
  var MAX_PRICE = '1000000';

  var form = document.querySelector('.ad-form');
  var formReset = form.querySelector('.ad-form__reset');
  var roomNumber = form.querySelector('#room_number');
  var guestCount = form.querySelector('#capacity').children;
  var typeHouse = form.querySelector('#type');
  var title = form.querySelector('#title');
  var price = form.querySelector('#price');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');

  var setStateElement = function (selector, disabled) {
    var fields = document.querySelectorAll(selector + ' fieldset', selector + ' select');
    for (var i = 0; i < fields.length; i++) {
      fields[i].disabled = disabled;
    }
  };

  var priceType = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000',
  };

  var setMinPrice = function () {
    price.min = priceType[typeHouse.value];
    price.placeholder = priceType[typeHouse.value];
  };

  typeHouse.addEventListener('change', function () {
    setMinPrice();
  });

  var setCapacity = function (room) {
    if (typeof room === 'undefined') {
      room = DEFAULT_ROOM_NUMBER;
    }
    if (room === MAX_ROOM_NUMBER) {
      room = '0';
    }
    for (var i = 0; i < guestCount.length; i++) {
      guestCount[i].disabled = (guestCount[i].value <= room) ? false : true;
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

  var resetForm = function () {
    form.reset();
    setMinPrice();
    window.map.deactivatePage();
    window.uploadImages.cleanFileChooser();
    window.mainPin.pinMain.addEventListener('click', window.map.onPinClickDown);
  };

  formReset.addEventListener('click', function () {
    window.mainPin.setDefaultAddress();
    resetForm();
  });

  var onSuccess = function () {
    window.message.renderMessageSuccess();
  };

  var onError = function (message) {
    window.message.renderMessageError(message);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSuccess, onError);
    resetForm();
  });

  window.form = {
    setStateElement: setStateElement,
    setCapacity: setCapacity,
  };
})();
