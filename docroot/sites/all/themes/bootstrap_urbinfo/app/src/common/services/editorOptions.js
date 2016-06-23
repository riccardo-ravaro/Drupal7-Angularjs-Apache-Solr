(function () {
  angular
    .module('urbinfo.common')
    .factory('editorOptions', editorOptions);

  editorOptions.$inject = ['language'];

  function editorOptions(language) {
    return {
      language: language.current.language,
      toolbar: [
        ['Bold', 'Italic', 'NumberedList', 'BulletedList', 'Link', 'Unlink']
      ],
      removePlugins : 'elementspath',
      height: 200
    };
  }
}());
