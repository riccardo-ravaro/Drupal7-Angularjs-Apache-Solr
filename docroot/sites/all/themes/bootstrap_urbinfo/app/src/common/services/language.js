(function () {
  angular
    .module('urbinfo.common')
    .factory('language', language);

  function language() {
    var languageService = Drupal.settings.urbinfo.language;

    languageService.selectFieldLanguage = selectFieldLanguage;
    languageService.getFieldLanguageCode = getFieldLanguageCode;
    languageService.getFieldLanguage = getFieldLanguage;
    languageService.languageNameByLanguageCode = languageNameByLanguageCode;
    languageService.languageNativeNameByLanguageCode = languageNativeNameByLanguageCode;
    languageService.availableLanguageCodes = availableLanguageCodes;

    return languageService;

    /**
     * Get language code for field.
     */
    function getFieldLanguageCode(field) {
      var defaultLang = 'en';

      if (field === undefined) {
        return null;
      }

      // Current language.
      if (field[languageService.current.language] !== undefined) {
        return languageService.current.language;

      // Default language.
      } else if (field[defaultLang] !== undefined) {
        return defaultLang;

      // No language.
      } else if (field.und !== undefined) {
        return 'und';

      // First available language.
      } else {
        for (var lang in field) {
          if (field.hasOwnProperty(lang)) {
            return lang;
          }
        }
      }
    }

    /**
     * Get language object for field.
     */
    function getFieldLanguage(field) {
      var lang = getFieldLanguageCode(field);
      if (lang && lang !== 'und') {
        return languageService.available[lang];
      }
      else {
        return {
          language: 'und',
          direction: 0
        };
      }
    }

    /**
     * Get field items in correct language.
     */
    function selectFieldLanguage(field) {
      var lang = getFieldLanguageCode(field);
      // Language available.
      if (lang) {
        return field[lang];
      }

      // Empty.
      return [];
    }

    function availableLanguageCodes() {
      var lang_codes = [];
      angular.forEach(languageService.available, function (lang) {
        lang_codes.push(lang.language);
      });
      return lang_codes;
    }

    function languageNameByLanguageCode(lang) {
      if (languageService.available[lang] !== undefined) {
        return languageService.available[lang].name;
      }
      return null;
    }

    function languageNativeNameByLanguageCode(lang) {
      if (languageService.available[lang] !== undefined) {
        return languageService.available[lang].native;
      }
      return null;
    }

  }
}());
