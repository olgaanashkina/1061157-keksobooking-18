'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var WIDTH_FOTO_HOUSING = 45;
  var HEIGHT_FOTO_HOUSING = 40;
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';

  var fileAvatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatarChooser = document.querySelector('.ad-form-header__preview img');
  var fileHousingChooser = document.querySelector('.ad-form__upload input[type=file]');
  var previewHousingChooser = document.querySelector('.ad-form__photo');

  var onInputFileChooser = function (fileChooser, elementImg, preview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (!elementImg) {
          elementImg = document.createElement('img');
          elementImg.src = reader.result;
          elementImg.style.width = WIDTH_FOTO_HOUSING + 'px';
          elementImg.style.height = HEIGHT_FOTO_HOUSING + 'px';
          previewHousingChooser.appendChild(elementImg);
        } else {
          preview.src = reader.result;
        }
      });

      reader.readAsDataURL(file);
    }
  };

  fileAvatarChooser.addEventListener('change', function () {
    onInputFileChooser(fileAvatarChooser, true, previewAvatarChooser);
  });

  fileHousingChooser.addEventListener('change', function () {
    onInputFileChooser(fileHousingChooser, false, previewHousingChooser);
  });

  var cleanFileChooser = function () {
    previewAvatarChooser.src = DEFAULT_AVATAR;
    var images = previewHousingChooser.querySelectorAll('img');
    images.forEach(function (img) {
      img.remove();
    });
  };

  window.uploadImages = {
    cleanFileChooser: cleanFileChooser,
  };
})();
