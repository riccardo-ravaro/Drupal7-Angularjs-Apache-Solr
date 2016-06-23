(function () {
  angular
    .module('urbinfo.common')
    .factory('socialUrls', socialUrls);

  function socialUrls() {
    return {
      makeUrl: makeUrl
    };

    function makeUrl(path, social_network) {

      if (path === undefined || path === null) {
        return null;
      }

      var url = null,
        path_parts = path.split('/'),
        username = path_parts[path_parts.length - 1];

      if (username.length > 0) {
        switch (social_network) {
        case 'facebook':
          url = 'http://facebook.com/' + username;
          break;
        case 'twitter':
          url = 'http://twitter.com/' + username;
          break;
        case 'linkedin':
          url = 'http://linkedin.com/in/' + username;
          break;
        case 'googleplus':
          url = 'http://plus.google.com/' + username;
          break;
        }
      }

      return url;
    }
  }
}());
