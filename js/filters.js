'use strict';

(function () {
  var MAX_COUNT_OFFER = 5;

  var housingType = document.querySelector('#housing-type');

  var getTypeHouse = function (item) {
    if (housingType.value === 'any') {
      return true;
    } return item.offer.type === housingType.value;
  };

  var filterTypeHouse = function (proposals) {
    return proposals
      .filter(function (item) {
        return getTypeHouse(item);
      })
      .slice(0, MAX_COUNT_OFFER);
  };

  var onHouseFilter = function () {
    window.pin.cleanPins();
    window.pin.createPins(filterTypeHouse(window.proposals));
  };

  housingType.addEventListener('change', onHouseFilter);

  window.filters = {
    filterTypeHouse: filterTypeHouse
  };
})();
