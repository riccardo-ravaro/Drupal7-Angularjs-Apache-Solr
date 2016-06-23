<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="../css/styles.css" />
    <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
    <script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
    <script src="../js/bootstrap/dropdown.js"></script>
    <script src="../js/bootstrap/transition.js"></script>
    <script src="../js/bootstrap/collapse.js"></script>
    <script src="../js/bootstrap/tooltip.js"></script>
    <script src="../js/bootstrap/button.js"></script>
    <script src="/sites/all/libraries/leaflet.awesome-markers/dist/leaflet.awesome-markers.min.js"></script>
    <link rel="stylesheet" href="/sites/all/libraries/leaflet.awesome-markers/dist/leaflet.awesome-markers.css" />
    <script src="/sites/all/libraries/bxslider-4/jquery.bxslider.min.js"></script>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no" />
  </head>
  <body>
    <div class="page page--search">
      <?php include __DIR__ . '/components/header--anon.php'; ?>

      <div class="search-results">
        <section class="search-results__main">
          <header class="search-results__header">
            <div class="search-results__summary">
              30 results for <span class="search-results__summary-placeholder">Restaurant</span> near <span class="search-results__summary-placeholder">Covent Garden</span>
            </div>
            <button class="btn btn-sm btn-primary search-results__filter-open-button">
              <span class="glyphicon glyphicon-filter"></span>
              Filter
            </button>
            <div class="btn-group visible-xs-block search-results__view-modes" data-toggle="buttons">
              <label class="btn btn-sm btn-default active">
                <input name="view-mode" value="list" type="radio" checked> <span class="glyphicon glyphicon-list"></span> List
              </label>
              <label class="btn btn-sm btn-default">
                <input name="view-mode" value="map" type="radio"> <span class="glyphicon glyphicon-map-marker"></span> Map
              </label>
            </div>
            <div class="search-filters">
              <form>
                <h3 class="search-filters__title">Show me:</h3>
                <div class="checkbox">
                  <label>
                    <input type="checkbox" value="">
                    Open now
                  </label>
                </div>
                <div class="checkbox">
                  <label>
                    <input type="checkbox" value="">
                    Takeaway available
                  </label>
                </div>
                <div class="checkbox">
                  <label>
                    <input type="checkbox" value="">
                    Accepts credit cards
                  </label>
                </div>
                <div class="checkbox">
                  <label>
                    <input type="checkbox" value="">
                    Child friendly
                  </label>
                </div>
                <button class="btn btn-primary search-filters__close-button">Done</button>
              </form>
            </div>
          </header>
          <div class="search-results__list">
            <?php for ($i = 0; $i < 30; $i++): ?>
              <article class="search-result">
                <a class="block-link" href="#">
                  <div class="search-result__image">
                    <ul class="bxslider">
                      <li><img src="http://lorempixel.com/400/300/food?<?php print $i; ?>a" alt="Example image" /></li>
                      <li><img src="http://lorempixel.com/400/300/food?<?php print $i; ?>b" alt="Example image" /></li>
                      <li><img src="http://lorempixel.com/400/300/food?<?php print $i; ?>c" alt="Example image" /></li>
                    </ul>
                  </div>
                  <div class="search-result__content">
                    <header>
                      <h2 class="search-result__title">Example restaurant</h2>
                    </header>
                    <div class="search-result__type">Italian restaurant</div>
                    <div class="search-result__address">10 Example st , Watford , Hertfordshire , WD17 2PZ</div>
                    <div class="search-result__description">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et tempus augue. Sed molestie luctus orci vel fermentum. Praesent et cursus leo. Phasellus consequat malesuada erat, et sollicitudin turpis efficitur sed. Duis facilisis condimentum lacus, eget posuere nisi feugiat in. Nunc volutpat nec eros tempor luctus. Suspendisse potenti. Morbi venenatis purus vitae libero rutrum, vitae sollicitudin ipsum placerat. Nulla facilisiplacerat</p>
                    </div>
                    <div class="search-result__distance">7km</div>
                    <div class="search-result__services">
                      <ul>
                        <li><span class="icon icon-clock" data-toggle="tooltip" data-placement="left" title="Reservations available"></span> <span class="sr-only">Reservations available</span></li>
                        <li><span class="icon icon-wallet" data-toggle="tooltip" data-placement="left" title="Credit card payment"></span> <span class="sr-only">Credit card payment</span></li>
                        <li><span class="icon icon-toolbox" data-toggle="tooltip" data-placement="left" title="Takeaway available"></span> <span class="sr-only">Takeaway available</span></li>
                      </ul>
                    </div>
                  </div>
                </a>
              </article>
            <?php endfor; ?>
          </section>
          <div id="map" class="search-results__map">
          </div>
        </div>
      </div>

    </div><!-- /.page -->

    <script>
      $('.business__actions .btn').tooltip({});
      $('.btn').button();

      var map = L.map('map', {
        center: L.latLng(51.5139717, -0.1247074)
      }).setView([51.5139717, -0.1247074], 16);
      L.tileLayer('http://{s}.tiles.mapbox.com/v3/riccardoravaro.j8mm92f1/{z}/{x}/{y}.png', {
        maxZoom: 25,
        detectRetina: true,
        reuseTiles: true
      }).addTo(map);
      var icon = L.AwesomeMarkers.icon({
        icon: 'cutlery',
        markerColor: 'blue'
      });
      var marker = L.marker([51.5139717, -0.1247074], {icon: icon}).addTo(map);
      var tooltip = '<div class="search-result search-result--map">';
      tooltip += '<a class="block-link" href="#">';
      tooltip += '<div class="search-result__image">';
      tooltip += '<img src="http://lorempixel.com/400/300/food?<?php print $i; ?>a" alt="Example image" />';
      tooltip += '</div>';
      tooltip += '<div class="search-result__content">';
      tooltip += '<h2 class="search-result__title">Example restaurant</h2>';
      tooltip += '<div class="search-result__type">Italian restaurant</div>';
      tooltip += '<div class="search-result__address">10 Example st , Watford , Hertfordshire , WD17 2PZ</div>';
      tooltip += '<div class="search-result__distance">7km</div>';
      tooltip += '<div class="search-result__services">';
      tooltip += '<ul>';
      tooltip += '<li><span class="icon icon-clock" data-toggle="tooltip" data-placement="left" title="Reservations available"></span> <span class="sr-only">Reservations available</span></li>';
      tooltip += '<li><span class="icon icon-wallet" data-toggle="tooltip" data-placement="left" title="Credit card payment"></span> <span class="sr-only">Credit card payment</span></li>';
      tooltip += '<li><span class="icon icon-toolbox" data-toggle="tooltip" data-placement="left" title="Takeaway available"></span> <span class="sr-only">Takeaway available</span></li>';
      tooltip += '</ul>';
      tooltip += '</div>';
      tooltip += '</a>';
      tooltip += '<div>';
      marker.bindPopup(tooltip);

      $('input[name="view-mode"]').change(function () {
        if (this.value == 'map') {
          $('.search-results').addClass('is-map');
          map.invalidateSize(false);
        } else {
          $('.search-results').removeClass('is-map');
        }
      });

      if ($(window).width() >= 768) {
        $('.bxslider').bxSlider({
          pager: false
        });
      }

      $('.search-results__filter-open-button, .search-filters__close-button').click(function (e) {
        $('.search-filters').toggleClass('is-open');
        e.preventDefault();
      });

      $('.search-result__services span').tooltip();

      $('.navbar-toggle').click(function () {
        $('.navbar-collapse').not($(this).data('target')).removeClass('in');
      });
    </script>

  </body>
</html>
