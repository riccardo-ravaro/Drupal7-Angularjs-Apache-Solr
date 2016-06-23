(function ($) {
  // Parallax scroll effect for cover image.
  Drupal.behaviors.coverImageParallax = {
    attach: function () {
      $('.business__cover-image').once('cover-image-parallax', function () {
        var $window = $(window);
        $window.scroll(function () {
          var top = $window.scrollTop(),
            offset = top * 0.3 + 'px';
          $('.business__cover-image img').css({
            '-webkit-transform': 'translateY(' + offset + ')',
            '-moz-transform': 'translateY(' + offset + ')',
            '-ms-transform': 'translateY(' + offset + ')',
            'transform': 'translateY(' + offset + ')'
          });
        });
      });
    }
  };

  // Fix multiple navbar collapsing menus in Bootstrap.
  Drupal.behaviors.fixNavbarCollapse = {
    attach: function () {
      $('.navbar-toggle').once('fix-navbar-collapse').click(function () {
        // Close any open collapsibles that aren't the target.
        $('.navbar-collapse').not($(this).data('target')).removeClass('in');
      });
    }
  };

  Drupal.behaviors.loginModal = {
    attach: function () {
      $('#login-modal').once('login-modal').modal({show: false});
      $('a[href*="user/login"]').once('login-modal-open').click(function (e) {
        e.preventDefault();
        openLoginModel();
      });

      $('a.requires-auth').once('login-modal-open').click(function (e) {
        if (!Drupal.settings.urbinfo.user.uid) {
          e.preventDefault();
          openLoginModel($(this).attr('href'));
        }
      });
    }
  };

  Drupal.behaviors.backgroundVideo = {
    attach: function () {
      $('body.front').once('background-video', function () {
        if (!Modernizr.video) {
          return;
        }

        var $player = $('<video class="background-video"></video>'),
          player = $player.get(0),
          source = document.createElement('source'),
          path = '/sites/all/themes/bootstrap_urbinfo/videos/',
          videos = ['bg-1', 'bg-2', 'bg-3'],
          formats = ['mp4', 'webm'],
          supportedFormat,
          videoIndex = Math.round(Math.random() * (videos.length - 1));

        // Append video element.
        $('.main-container').prepend($player);

        // Detect supported format.
        for (var i = 0; i < formats.length; i++) {
          if (player.canPlayType('video/' + formats[i]).length > 0) {
            supportedFormat = formats[i];
            break;
          }
        }
        if (!supportedFormat) {
          return;
        }

        // Fit video to window size.
        fitVideo($player, 16 / 9);

        // Append source in supported format.
        source.type = 'video/' + supportedFormat;
        source.src = path + videos[videoIndex] + '.' + supportedFormat;
        player.appendChild(source);

        // We will need to detect if video autoplay is supported.
        var supportsAutoplay = false;

        // Hide player until video starts.
        // On iOS this will never happen as autoplay is not supported.
        $player.hide().on('play', function () {
          $player.show();
          supportsAutoplay = true;
        });

        // Start next video in sequence once ended.
        $player.on('ended', function () {
          videoIndex++;
          if (videoIndex === videos.length) {
            videoIndex = 0;
          }
          player.src = path + videos[videoIndex] + '.' + supportedFormat;
          player.play();
        });

        player.volume = 0;
        player.autoPlay = true;
        player.play();

        // Add class for fallback image if video has not started.
        setTimeout(function () {
          if (!supportsAutoplay) {
            $('body').addClass('no-autoplay');
          }
        }, 100);
      });
    }
  };

  // Fit video to window size.
  function fitVideo($player, videoRatio) {
    var $win = $(window),
      resizeTimeout = null;

    var resize = function () {
      var height = $win.height(),
        width = $win.width(),
        viewportRatio = width / height,
        scale = 1;

      if (videoRatio < viewportRatio) {
        // viewport more widescreen than video aspect ratio
        scale = viewportRatio / videoRatio;
      } else if (viewportRatio < videoRatio) {
        // viewport more square than video aspect ratio
        scale = videoRatio / viewportRatio;
      }

      setVideoTransform(scale);
    };

    var setVideoTransform = function (scale) {
      var transform = 'scale(' + scale  + ')';
      $player.css({
        '-webkit-transform': transform,
        'transform': transform
      });
    };

    $win.on('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 100);
    });

    resize();
  }

  function openLoginModel(destination) {
    var basePath = Drupal.settings.basePath,
      actionUrl;

    if (Drupal.settings.urbinfo.language.current.prefix) {
      basePath += Drupal.settings.urbinfo.language.current.prefix + '/';
    }

    actionUrl = basePath;

    if (destination) {
      actionUrl += '?destination=' + encodeURIComponent(destination.replace(basePath, ''));
    }

    $('#connector-button-form').attr('action', actionUrl);
    Drupal.destinationUrl = destination;

    $('#login-modal').modal('show');
  }

  /*
   * Behavior for the automatic file upload
   *
   * Adpated from autoupload module to work with Bootstrap theme.
   */
  Drupal.behaviors.autoUpload = {
    attach: function (context) {
      $('.form-item .form-submit[value=Upload]', context).hide();
      $('.form-item input.form-file', context).change(function () {
        var $parent = $(this).closest('.form-item');

        // SetTimeout to allow for validation.
        // Would prefer an event, but there isn't one.
        setTimeout(function () {
          if (!$('.error', $parent).length) {
            $('.form-submit[value=Upload]', $parent).mousedown();
          }
        }, 100);
      });
    }
  };

}(jQuery));
