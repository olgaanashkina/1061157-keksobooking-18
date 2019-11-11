'use strict';

(function () {
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;
  var filter = document.querySelector('.map__filters');
  var housingType = filter.querySelector('#housing-type');
  var housingPrice = filter.querySelector('#housing-price');
  var housingRooms = filter.querySelector('#housing-rooms');
  var housingGuests = filter.querySelector('#housing-guests');

  var getTypeHouse = function (item) {
    return housingType.value === 'any' ? true : item.offer.type === housingType.value;
  };

  var getPriceHouse = function (item) {
    return housingPrice.value === 'any' ? true :
      ((housingPrice.value === 'low') && (item.offer.price < MIN_PRICE)) ||
      ((housingPrice.value === 'middle') && (item.offer.price >= MIN_PRICE) && (item.offer.price < MAX_PRICE)) ||
      ((housingPrice.value === 'high') && (item.offer.price >= MAX_PRICE));
  };

  var getRooms = function (item) {
    return housingRooms.value === 'any' ? true : item.offer.rooms === parseInt(housingRooms.value, 10);
  };

  var getGuests = function (item) {
    return housingGuests.value === 'any' ? true : item.offer.guests === parseInt(housingGuests.value, 10);
  };

  var getFeatures = function (item) {
    var featuresElement = document.querySelectorAll('#housing-features .map__checkbox');
    for (var i = 0; i < featuresElement.length; i++) {
      if (featuresElement[i].checked && (item.offer.features.indexOf(featuresElement[i].value) < 0)) {
        return false;
      }
    }
    return true;
  };

  var filtersMap = function (proposals) {
    return proposals
      .filter(function (item) {
        return (
          getTypeHouse(item) &&
          getPriceHouse(item) &&
          getRooms(item) &&
          getGuests(item) &&
          getFeatures(item)
        );
      });
  };

  var onHouseFilter = window.debounce(function () {
    window.card.closePopup();
    window.pin.cleanPins();
    window.pin.createPins(filtersMap(window.proposals));
  });

  filter.addEventListener('change', onHouseFilter);

  window.filters = {
    filtersMap: filtersMap,
  };
})();
