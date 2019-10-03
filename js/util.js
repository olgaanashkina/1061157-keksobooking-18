'use strict';

window.util = (function () {
  var ENTER_KEYCODE = 13;

  return {
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },

    isActivateElement: function (selector, nameClass) {
      var element = document.querySelector(selector);
      element.classList.remove(nameClass);
    },

    getRandomInteger: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }
  };
})();
