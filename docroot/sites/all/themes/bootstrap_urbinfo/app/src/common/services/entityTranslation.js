(function () {
  angular
    .module('urbinfo.common')
    .factory('entityTranslation', entityTranslation);

  entityTranslation.$inject = ['language'];

  /**
   * Service that works with entityTranslation's multilingual values.
   */
  function entityTranslation(language) {
    return {
      setTranslation: setTranslation
    };

    /**
     * Attach current language translation to an entity.
     */
    function setTranslation(entity) {

      if (entity.language === undefined || entity.language === 'und') {
        entity.language = language.current.language;
      }

      if (entity.translations === undefined) {
        entity.translations = {data: {}};
        entity.translations.original = language.current.language;
      }

      if (entity.translations.original === undefined || entity.translations.original === null) {
        entity.translations.original = entity.language || language.current.language;
      }

      if (entity.translations.data[language.current.language] === undefined) {
        entity.translations.data[language.current.language] = {
          translate: 0,
          status: 1,
          language: language.current.language,
          source: entity.translations.original
        };
      }

      return entity;
    }

  }

}());
