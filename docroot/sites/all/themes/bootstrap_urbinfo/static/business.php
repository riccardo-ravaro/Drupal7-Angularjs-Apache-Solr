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
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no" />
  </head>
  <body>
    <div class="page">
      <?php include __DIR__ . '/components/header--anon.php'; ?>

      <div class="content">
        <?php include __DIR__ . '/components/business.php'; ?>
      </div><!-- /.page__content -->

      <?php include __DIR__ . '/components/footer.php'; ?>


    </div><!-- /.page__content -->

    <script>
      $('.business__actions .btn').tooltip({});
      $('.btn').button();

      var map = L.map('map', {
        scrollWheelZoom: false,
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
      $(window).scroll(function () {
        var top = $(this).scrollTop(),
          offset = top * .3 + 'px';
        $('.business__cover-image img').css({
          'transform': 'translateY(' + offset + ')',
          '-webkit-transform': 'translateY(' + offset + ')',
          '-moz-transform': 'translateY(' + offset + ')',
          '-ms-transform': 'translateY(' + offset + ')',
        });
      });
    </script>

  </body>
</html>
