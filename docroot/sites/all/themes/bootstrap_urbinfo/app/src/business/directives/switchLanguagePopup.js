(function () {
  angular
    .module('urbinfo.business')
    .directive('switchLanguagePopup', switchLanguagePopup);

  switchLanguagePopup.$inject = ['$window', '$document', 'language', 'field', 'switchLanguageStateService', 'ngDialog'];

  /**
   * Displays a switch language popup.
   *
   * The whole picture looks like this:
   * switchLanguageButton has a ng-click event, that fires a change in switchLanguageStateService.
   *
   * This directive works closely with switchLanguageStateService.
   * When switchLanguageStateService changes, it launches a switch language popup for a field that's stated
   * in a switchLanguageStateService.
   */
  function switchLanguagePopup($window, $document, language, field, switchLanguageStateService, ngDialog) {
    return {
      restrict: 'E',
      template: '',
      scope: {},
      link: function (scope) {

        // Scope variables.
        scope.sortOrder = 'empty_first';
        scope.sort = {
          order: 'content_first',
          options: {
            'With content first': 'content_first',
            'With empty first': 'empty_first'
          }
        };

        // Scope methods.
        scope.init = init;
        scope.showDialog = showDialog;
        scope.setLanguage = setLanguage;
        scope.getLanguageNameByCode = getLanguageNameByCode;
        scope.getLanguageLink = getLanguageLink;
        scope.sortLanguages = sortLanguages;

        // Scope methods definition.
        /**
         * Initialization
         *
         * This function runs every time service data changes. We get data from the service and process / attach it
         * to the scope
         */
        function init() {

          // Scope variables.
          scope.state = switchLanguageStateService.getData();
          scope.currentLanguage = language.current.language;

          // Prepare to jump deep down the rabbit hole ;)
          // If we supplied a regular field, we add it to an array of objects.
          if (scope.state.type === 'field') {
            var obj = {};
            obj[scope.state.name] = scope.state.field;
            scope.state.obj = [];
            scope.state.obj.push(obj);
          }

          // Process array of objects to get all fields possible and all languages possible of it.
          scope.filteredLanguages = [];
          if (angular.isArray(scope.state.obj)) {
            var lang_codes = {};
            angular.forEach(scope.state.obj, function (item) {
              if (angular.isObject(item)) {
                for (var field_name in item) {
                  if (item[field_name] !== undefined && angular.isObject(item[field_name])) {
                    for (var lang_code in item[field_name]) {
                      if (lang_code) {
                        if (language.availableLanguageCodes().indexOf(lang_code) !== undefined) {
                          lang_codes[lang_code] = lang_code;
                        }
                      }
                    }
                  }
                }
              }
            });

            angular.forEach(language.availableLanguageCodes(), function (lang_code) {
              scope.filteredLanguages.push({code: lang_code, name: language.available[lang_code].native, has_content: lang_codes[lang_code] !== undefined});
            });
          }

          sortLanguages();

          scope.showDialog();
        }

        function showDialog() {
          ngDialog.open({
            template: 'business/views/switch-language-popup.html',
            className: 'ngdialog-theme-urbinfo',
            scope: scope
          });
        }

        function setLanguage(lang_code) {
          scope.currentLanguage = lang_code;
        }

        function getLanguageNameByCode(lang_code) {
          return language.languageNativeNameByLanguageCode(lang_code);
        }

        function getLanguageLink(lang_code) {
          $window.location.href = language.languageLinks[lang_code];
        }

        function sortLanguages() {

          // Separate array in two: one with has_content and another with empty values.
          var has_content = [];
          var is_empty = [];
          angular.forEach(scope.filteredLanguages, function (lang) {
            if (lang.has_content) {
              has_content.push(lang);
            }
            else {
              is_empty.push(lang);
            }
          });

          // Sort each array by name.
          has_content.sort(orderByName);
          is_empty.sort(orderByName);

          // Concat arrays depending on a sort order.
          if (scope.sort.order === 'content_first') {
            scope.filteredLanguages = has_content.concat(is_empty);
          }
          else if (scope.sort.order === 'empty_first') {
            scope.filteredLanguages = is_empty.concat(has_content);
          }
        }

        // Local functions.
        function orderByName(a, b) {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        }

        // Execution.
        // Watch for changes in data stored in a service.
        scope.$watch(function () { return switchLanguageStateService.getData(); }, function (newVal) {
          if (angular.isObject(newVal) && newVal.type !== undefined) {
            scope.state = newVal;
            scope.init();
          }
        });

        // Act on popup hide.
        scope.$on('ngDialog.closed', function () {
          window.$('body').removeClass('no-scroll');
        });

      }
    };
  }

}());