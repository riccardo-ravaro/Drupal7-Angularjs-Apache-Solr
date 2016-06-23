(function () {
  angular
    .module('urbinfo.common')
    .factory('field', field);

  field.$inject = ['language'];

  /**
   * Service that works with field's multilingual values.
   */
  function field(language) {
    return {
      getValue: getValue
    };

    /**
     * Get field's value in a current language.
     *
     * @param value - object with field value, example: $node.field_name
     * @param index - index of the value we want to get, 0 for example.
     * @param value_name - value name of a field array, 'value' for example.
     *
     * As an example, in PHP we have:
     *   $node->body[LANGUAGE_NONE][0]['value'];
     *
     * To get same value from $node js object we should do:
     *    field.getValue($node.body, 0, 'value')
     * as a result, this function will get a 'value' for 'body' field in a correct language.
     */
    function getValue(value, index, value_name) {

      if (index === undefined) {
        return language.selectFieldLanguage(value);
      }

      else if (language.selectFieldLanguage(value)[index] !== undefined) {
        return (value_name !== undefined) ? language.selectFieldLanguage(value)[index][value_name] : language.selectFieldLanguage(value)[index];
      }

      return null;
    }

  }

}());
