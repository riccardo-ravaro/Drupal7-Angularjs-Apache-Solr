<?php

/**
 * @file
 * template.php
 */

/**
 * Implements hook_menu_alter().
 */
function bootstrap_urbinfo_menu_alter(&$items) {
  $items['user/register']['title'] = 'Register';
}

/**
 * Implements hook_preprocess_page().
 *
 * @see page.tpl.php
 */
function bootstrap_urbinfo_preprocess_page(&$variables) {
  // Add information about the number of sidebars.
  if (!empty($variables['page']['sidebar_first']) && !empty($variables['page']['sidebar_second'])) {
    $variables['content_column_class'] = ' class="col-sm-6 col-md-8"';
  }
  elseif (!empty($variables['page']['sidebar_first']) || !empty($variables['page']['sidebar_second'])) {
    $variables['content_column_class'] = ' class="col-sm-9 col-md-10"';
  }
  else {
    $variables['content_column_class'] = ' class="col-sm-12"';
  }

  $node = menu_get_object();
  if (isset($node->field_header_image)) {
    $item = $node->field_header_image[LANGUAGE_NONE][0];
    $variables['header_image'] = theme('image', array(
      'path' => $item['url'],
      'width' => $item['width'],
      'height' => $item['height'],
      'alt' => $item['alt'],
    ));

    $variables['header_title'] = $node->title;
  }
}

/**
 * Implements hook_preprocess_html().
 */
function bootstrap_urbinfo_preprocess_html(&$variables) {
  global $language, $user;

  // Load Google fonts.
  drupal_add_css('http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,400,600,700,200italic,300italic', 'external');

  // Add main stylesheet for text direction.
  if ($language->dir == 'rtl') {
    drupal_add_css(drupal_get_path('theme', 'bootstrap_urbinfo') . '/css/styles-rtl.css', array(
      'group' => CSS_THEME,
      'weight' => 99,
      'preprocess' => 1,
    ));
  }
  else {
    drupal_add_css(drupal_get_path('theme', 'bootstrap_urbinfo') . '/css/styles.css', array(
      'group' => CSS_THEME,
      'weight' => 99,
      'preprocess' => 1,
    ));
  }

  // CKEditor JS.
  drupal_add_js(libraries_get_path('ckeditor') . '/ckeditor.js', array(
    'group' => JS_LIBRARY,
    'preprocess' => 1,
    'every_page' => TRUE,
  ));

  // Library dependencies for Angular app.
  $lang = $language->language;

  // Correct code for simplified Chinese.
  if ($lang == 'zh-hans') {
    $lang = 'zh-CN';
  }

  $mapbox_languages = array('en', 'fr', 'es');
  $use_mapbox = in_array($lang, $mapbox_languages);

  // Load Google maps libraries for languages not supported by MapBox.
  if (!$use_mapbox) {
    drupal_add_js('https://maps.googleapis.com/maps/api/js?key=' . theme_get_setting('bootstrap_urbinfo_google_api_key') . '&language=' . $lang, 'external');
    drupal_add_js(drupal_get_path('theme', 'bootstrap_urbinfo') . '/bower_components/leaflet-plugins/layer/tile/Google.js', array(
     'group' => JS_THEME,
    ));
  }

  // Get terms.
  $facilities_vocab = taxonomy_vocabulary_machine_name_load('facilities');
  foreach (taxonomy_get_tree($facilities_vocab->vid, 0, NULL, TRUE) as $term) {
    $icon = NULL;
    if (!empty($term->field_icon[LANGUAGE_NONE])) {
      $icon = $term->field_icon[LANGUAGE_NONE][0]['value'];
    }
    $facilities[$term->tid] = array(
      'tid' => $term->tid,
      'name' => $term->name,
      'icon' => $icon,
      'featured' => isset($term->field_featured[LANGUAGE_NONE][0]) ? (bool) $term->field_featured[LANGUAGE_NONE][0]['value'] : FALSE,
    );
  }
  $business_types_vocab = taxonomy_vocabulary_machine_name_load('business_type');
  foreach (taxonomy_get_tree($business_types_vocab->vid, 0, NULL, TRUE) as $term) {
    $icon = NULL;
    if (!empty($term->field_icon[LANGUAGE_NONE])) {
      $icon = $term->field_icon[LANGUAGE_NONE][0]['value'];
    }
    $business_types[$term->tid] = array(
      'tid' => $term->tid,
      'name' => $term->name,
      'icon' => $icon,
    );
  }

  $config = array(
    'map' => array(
      'defaultZoom'       => (int) theme_get_setting('bootstrap_urbinfo_map_default_zoom'),
      'minZoom'           => (int) theme_get_setting('bootstrap_urbinfo_map_min_zoom'),
      'maxZoom'           => (int) theme_get_setting('bootstrap_urbinfo_map_max_zoom'),
      'tileLayer'         => theme_get_setting('bootstrap_urbinfo_map_tile_layer'),
      'markerColor'       => theme_get_setting('bootstrap_urbinfo_map_marker_color'),
      'markerColorActive' => theme_get_setting('bootstrap_urbinfo_map_marker_color_active'),
      'useMapbox'         => $use_mapbox,
    ),
    'location' => array(
      'pointDistance'     => theme_get_setting('bootstrap_urbinfo_location_point_distance'),
    ),
    'api' => array(
      'googleApiKey'      => theme_get_setting('bootstrap_urbinfo_google_api_key'),
    ),
  );

  $langauges = language_list('enabled');

  $day_names = array(
    t('Monday'),
    t('Tuesday'),
    t('Wednesday'),
    t('Thursday'),
    t('Friday'),
    t('Saturday'),
    t('Sunday'),
  );

  $path = drupal_is_front_page() ? '<front>' : $_GET['q'];
  $switch_links = language_negotiation_get_switch_links('language', $path);

  $language_links = array();

  foreach ($switch_links->links as $lang_code => $switch_link) {
    $switch_link['absolute'] = TRUE;
    $language_links[$lang_code] = url($switch_link['href'], $switch_link);
  }

  drupal_add_js(array(
    'urbinfo' => array(
      'facilities' => $facilities,
      'businessTypes' => $business_types,
      'dayNames' => $day_names,
      'config' => $config,
      'user' => array(
        'uid' => $user->uid,
        'name' => isset($user->name) ? $user->name : NULL,
        'mail' => isset($user->mail) ? $user->mail : NULL,
      ),
      'language' => array(
        'current' => $language,
        'available' => $langauges[1],
        'languageLinks' => $language_links
      ),
    ),
  ), 'setting');
}

/**
 * Implements hook_preprocess_node().
 */
function bootstrap_urbinfo_preprocess_node(&$variables) {
  global $language;
  $node = $variables['node'];

  $view_mode = $variables['view_mode'];
  $theme_path = drupal_get_path('theme', 'bootstrap_urbinfo');

  if ($node->type == 'business' && $view_mode == 'full') {

    // Countries list.
    $countries = _addressfield_country_options_list();
    $variables['countries'] = $countries;

    // Specials.
    $specials = array();
    $query = new EntityFieldQuery();
    $query->entityCondition('entity_type', 'node')
      ->entityCondition('bundle', 'promotion')
      ->fieldCondition('og_group_ref', 'target_id', $node->nid);

    $result = $query->execute();
    if (isset($result['node'])) {
      $specials = array_values(node_load_multiple(array_keys($result['node'])));
    }

    // Team members.
    $team_members = array();
    if (!empty($node->field_team[LANGUAGE_NONE])) {
      foreach ($node->field_team[LANGUAGE_NONE] as $item) {
        $item_ids[] = $item['value'];
      }
      $team_members = array_values(entity_load('field_collection_item', $item_ids));
    }

    // Render today's opening hours.
    $today = date('N');
    $opening_periods = array();
    foreach ($variables['field_opening_hours'] as $item) {
      if ($item['day'] == $today) {
        $opening_periods[] = theme('office_hours_time_range', array(
          'times' => array('start' => $item['starthours'], 'end' => $item['endhours']),
          'format' => 'G:i a',
          'separator' => '–',
        ));
      }
    }
    $variables['open_today'] = implode(', ', $opening_periods);

    // Page URL for share buttons.
    $variables['url'] = url('node/' . $node->nid, array('absolute' => TRUE));

    // Check if user has an edit node access.
    $variables['can_edit'] = node_access('update', $node);

    drupal_add_js(array(
      'urbinfo' => array(
        'node' => $node,
        'canEdit' => $variables['can_edit'],
        'countries' => $countries,
        'specials' => $specials,
        'teamMembers' => $team_members,
      ),
    ), 'setting');
  }
}

/**
 * Implements hook_preprocess_views_view().
 */
function bootstrap_urbinfo_preprocess_views_view(&$vars) {
  $view = $vars['view'];
  $theme_path = drupal_get_path('theme', 'bootstrap_urbinfo');

  if ($view->name == 'urbinfo_business_search' && $view->current_display == 'page') {
    // Get data from API display. This is shitty way to have to do it, but I'm
    // not alone - https://www.drupal.org/node/1835508
    $output = views_embed_view('urbinfo_business_search', 'json');
    $json = drupal_json_decode($output);

    $location_options = $view->query->getOption('search_api_location');
    if (!empty($location_options)) {
      $center = $location_options[0]['lat'] . ',' . $location_options[0]['lon'];
    }
    else {
      // Todo: shouldn't allow empty location.
      $center = '';
    }

    if (isset($_GET['locationText'])) {
      $location_text = $_GET['locationText'];
    }
    elseif (isset($_GET['location'])) {
      $location_text = $_GET['location'];
    }
    else {
      $location_text = '';
    }

    drupal_add_js(array(
      'urbinfo' => array(
        'search' => array(
          'results' => $json['results'],
          'pager' => $json['pager'],
          'params' => array(
            'locationText' => $location_text,
            'query' => isset($_GET['query']) ? $_GET['query'] : NULL,
            'dist' => isset($_GET['dist']) ? $_GET['dist'] : NULL,
            'f[]' => isset($_GET['f']) ? $_GET['f'] : array(),
            'lat_min' => isset($_GET['lat_min']) ? $_GET['lat_min'] : NULL,
            'lat_max' => isset($_GET['lat_max']) ? $_GET['lat_max'] : NULL,
            'lng_min' => isset($_GET['lng_min']) ? $_GET['lng_min'] : NULL,
            'lng_max' => isset($_GET['lng_max']) ? $_GET['lng_max'] : NULL,
            'center' => $center,
          ),
        ),
      ),
    ), 'setting');
  }
}

/**
 * Implements hook_form_FORM_ID_alter().
 */
function bootstrap_urbinfo_form_business_node_form_alter(&$form, &$form_state) {
  $node = $form_state['node'];
  if (empty($node->nid)) {
    drupal_set_title('List a new business');
  }
}

/**
 * Implements hook_form_FORM_ID_alter().
 */
function bootstrap_urbinfo_form_urbinfo_users_login_connector_button_form_alter(&$form, &$form_state) {
  bootstrap_urbinfo_form_urbinfo_users_connector_button_form_alter($form, $form_state);
}

/**
 * Implements hook_form_FORM_ID_alter().
 */
function bootstrap_urbinfo_form_urbinfo_users_register_connector_button_form_alter(&$form, &$form_state) {
  bootstrap_urbinfo_form_urbinfo_users_connector_button_form_alter($form, $form_state);
}

/**
 * Implements hook_form_FORM_ID_alter().
 */
function bootstrap_urbinfo_form_urbinfo_users_connector_button_form_alter(&$form, &$form_state) {
  $form['oauthconnector_twitter']['#value'] = '<span class="icon icon-twitter"></span>' . $form['oauthconnector_twitter']['#value'];
  $form['oauthconnector_facebook']['#value'] = '<span class="icon icon-facebook"></span>' . $form['oauthconnector_facebook']['#value'];
  $form['oauthconnector_google']['#value'] = '<span class="icon icon-googleplus"></span>' . $form['oauthconnector_google']['#value'];
}

/**
 * Implements hook_form_alter().
 */
function bootstrap_urbinfo_form_views_exposed_form_alter(&$form, &$form_state, $form_id) {
  if ($form['#id'] == 'views-exposed-form-urbinfo-business-search-page') {

    $is_home = ($_GET['q'] == 'home');

    $form['#attributes'] = array(
      'class' => array(
        'form-inline',
        'search-form',
      ),
      'novalidate' => 'novalidate',
      'name' => 'searchForm',
      'role' => 'search',
      'ng-controller' => 'SearchForm',
    );

    if ($is_home) {
      $form['#attributes']['class'][] = 'search-form--home';
    }
    else {
      $form['#attributes']['class'][] = 'search-form--header';
      $form['#attributes']['class'][] = 'navbar-form';
    }

    $form['query']['#title'] = t('I’m looking for…');
    $form['query']['#title_display'] = 'invisible';
    $form['query']['#attributes']['placeholder'] = $form['query']['#title'];
    $form['query']['#attributes']['ng-model'] = 'searchQuery.query';
    $form['query']['#attributes']['required'] = 'required';
    $form['query']['#element_attributes']['tooltip'] = "{{(searchForm.query.\$invalid && submitted) ? '" . t('Please enter the type of business you’re looking for') . "' : ''}}";
    $form['query']['#element_attributes']['tooltip-placement'] = 'bottom';
    $form['query']['#element_attributes']['ng-class'] = "{'has-error': searchForm.query.\$invalid && submitted}";
    $form['query']['#attributes']['autocomplete'] = 'off';
    $form['query']['#attributes']['typeahead'] = 'name for name in businessTypeNames | filter:$viewValue';
    $form['query']['#attributes']['typeahead-min-length'] = '0';
    $form['query']['#attributes']['autofocus'] = 'autofocus';
    // $form['query']['#attributes']['typeahead-append-to-body'] = 'true';
    if ($is_home) {
      $form['query']['#attributes']['class'][] = 'input-lg';
    }

    $form['dist']['#type'] = 'hidden';
    $form['dist']['#default_value'] = theme_get_setting('bootstrap_urbinfo_location_point_distance');
    $form['dist']['#attributes']['ng-model'] = 'searchQuery.dist';
    $form['center']['#type'] = 'hidden';
    $form['center']['#attributes']['ng-model'] = 'searchQuery.center';
    $form['lat_min']['#type'] = 'hidden';
    $form['lat_min']['#attributes']['ng-model'] = 'searchQuery.lat_min';
    $form['lat_max']['#type'] = 'hidden';
    $form['lat_max']['#attributes']['ng-model'] = 'searchQuery.lat_max';
    $form['lng_min']['#type'] = 'hidden';
    $form['lng_min']['#attributes']['ng-model'] = 'searchQuery.lat_max';
    $form['lng_max']['#type'] = 'hidden';
    $form['lng_max']['#attributes']['ng-model'] = 'searchQuery.lng_max';

    $form['location']['#title'] = t('Near…');
    $form['location']['#title_display'] = 'invisible';
    $form['location']['#attributes']['placeholder'] = $form['location']['#title'];
    $form['location']['#attributes']['ng-model'] = 'searchQuery.locationText';
    $form['location']['#attributes']['ng-focus'] = 'editLocation()';
    $form['location']['#attributes']['ng-change'] = 'clearGeoLocation()';
    $form['location']['#attributes']['location-field'] = 'location-field';
    $form['location']['#attributes']['location-field-geo'] = 'searchQuery';
    $form['location']['#attributes']['required'] = 'required';
    // $form['location']['#attributes']['typeahead-append-to-body'] = 'true';
    $form['location']['#element_attributes']['ng-class'] = "{'has-error': searchForm.location.\$invalid && submitted}";
    $form['location']['#element_attributes']['tooltip'] = "{{(searchForm.location.\$invalid && submitted) ? '" . t('Please select a location to search') . "' : ''}}";
    $form['location']['#element_attributes']['tooltip-placement'] = 'bottom';
    if ($is_home) {
      $form['location']['#attributes']['class'][] = 'input-lg';
    }

    $form['submit']['#attributes']['class'][] = 'search-form__submit';
    if ($is_home) {
      $form['submit']['#attributes']['class'][] = 'btn-plain';
      $form['submit']['#attributes']['class'][] = 'input-lg';
    }
    else {
      $form['submit']['#attributes']['class'][] = 'btn-header';
    }
    $form['submit']['#value'] = '<span class="glyphicon glyphicon-search"></span>
      <span class="visible-xs-inline">' . t('Search') . '</span>';

    $form['submit']['#attributes']['ng-disabled'] = 'search.loading';

    // Remove default exposed filter form theme.
    unset($form['#theme']);
  }
}

/**
 * Overrides theme_form_element().
 *
 * Adds #element_attributes option to add attributes to form item wrapper.
 */
function bootstrap_urbinfo_form_element(&$variables) {
  $element = &$variables['element'];
  $is_checkbox = FALSE;
  $is_radio = FALSE;

  if (!empty($element['#element_attributes'])) {
    $attributes = $element['#element_attributes'];
  }

  // This function is invoked as theme wrapper, but the rendered form element
  // may not necessarily have been processed by form_builder().
  $element += array(
    '#title_display' => 'before',
  );

  // Add element #id for #type 'item'.
  if (isset($element['#markup']) && !empty($element['#id'])) {
    $attributes['id'] = $element['#id'];
  }

  // Check for errors and set correct error class.
  if (isset($element['#parents']) && form_get_error($element)) {
    $attributes['class'][] = 'error';
  }

  if (!empty($element['#type'])) {
    $attributes['class'][] = 'form-type-' . strtr($element['#type'], '_', '-');
  }
  if (!empty($element['#name'])) {
    $attributes['class'][] = 'form-item-' . strtr($element['#name'], array(
        ' ' => '-',
        '_' => '-',
        '[' => '-',
        ']' => '',
      ));
  }
  // Add a class for disabled elements to facilitate cross-browser styling.
  if (!empty($element['#attributes']['disabled'])) {
    $attributes['class'][] = 'form-disabled';
  }
  if (!empty($element['#autocomplete_path']) && drupal_valid_path($element['#autocomplete_path'])) {
    $attributes['class'][] = 'form-autocomplete';
  }
  $attributes['class'][] = 'form-item';

  // See http://getbootstrap.com/css/#forms-controls.
  if (isset($element['#type'])) {
    if ($element['#type'] == "radio") {
      $attributes['class'][] = 'radio';
      $is_radio = TRUE;
    }
    elseif ($element['#type'] == "checkbox") {
      $attributes['class'][] = 'checkbox';
      $is_checkbox = TRUE;
    }
    else {
      $attributes['class'][] = 'form-group';
    }
  }

  $description = FALSE;
  $tooltip = FALSE;
  // Convert some descriptions to tooltips.
  // @see bootstrap_tooltip_descriptions setting in _bootstrap_settings_form()
  if (!empty($element['#description'])) {
    $description = $element['#description'];
    if (theme_get_setting('bootstrap_tooltip_enabled') && theme_get_setting('bootstrap_tooltip_descriptions') && $description === strip_tags($description) && strlen($description) <= 200) {
      $tooltip = TRUE;
      $attributes['data-toggle'] = 'tooltip';
      $attributes['title'] = $description;
    }
  }

  $output = '<div' . drupal_attributes($attributes) . '>' . "\n";

  // If #title is not set, we don't display any label or required marker.
  if (!isset($element['#title'])) {
    $element['#title_display'] = 'none';
  }

  $prefix = '';
  $suffix = '';
  if (isset($element['#field_prefix']) || isset($element['#field_suffix'])) {
    // Determine if "#input_group" was specified.
    if (!empty($element['#input_group'])) {
      $prefix .= '<div class="input-group">';
      $prefix .= isset($element['#field_prefix']) ? '<span class="input-group-addon">' . $element['#field_prefix'] . '</span>' : '';
      $suffix .= isset($element['#field_suffix']) ? '<span class="input-group-addon">' . $element['#field_suffix'] . '</span>' : '';
      $suffix .= '</div>';
    }
    else {
      $prefix .= isset($element['#field_prefix']) ? $element['#field_prefix'] : '';
      $suffix .= isset($element['#field_suffix']) ? $element['#field_suffix'] : '';
    }
  }

  switch ($element['#title_display']) {
    case 'before':
    case 'invisible':
      $output .= ' ' . theme('form_element_label', $variables);
      $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
      break;

    case 'after':
      if ($is_radio || $is_checkbox) {
        $output .= ' ' . $prefix . $element['#children'] . $suffix;
      }
      else {
        $variables['#children'] = ' ' . $prefix . $element['#children'] . $suffix;
      }
      $output .= ' ' . theme('form_element_label', $variables) . "\n";
      break;

    case 'none':
    case 'attribute':
      // Output no label and no required marker, only the children.
      $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
      break;
  }

  if ($description && !$tooltip) {
    $output .= '<p class="help-block">' . $element['#description'] . "</p>\n";
  }

  $output .= "</div>\n";

  return $output;
}

/**
 * Overrides theme_menu_link().
 *
 * Adds data-disabled attribute to fix conflict with angular bootstrap-ui.
 *
 * @see https://github.com/angular-ui/bootstrap/issues/2294
 */
function bootstrap_urbinfo_menu_link(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';

  if ($element['#below']) {
    // Prevent dropdown functions from being added to management menu so it
    // does not affect the navbar module.
    if (($element['#original_link']['menu_name'] == 'management') && (module_exists('navbar'))) {
      $sub_menu = drupal_render($element['#below']);
    }
    elseif ((!empty($element['#original_link']['depth'])) && ($element['#original_link']['depth'] == 1)) {
      // Add our own wrapper.
      unset($element['#below']['#theme_wrappers']);
      $sub_menu = '<ul class="dropdown-menu">' . drupal_render($element['#below']) . '</ul>';
      // Generate as standard dropdown.
      $element['#title'] .= ' <span class="caret"></span>';
      $element['#attributes']['class'][] = 'dropdown';
      $element['#localized_options']['html'] = TRUE;

      // Set dropdown trigger element to # to prevent inadvertant page loading
      // when a submenu link is clicked.
      $element['#localized_options']['attributes']['data-target'] = '#';
      $element['#localized_options']['attributes']['class'][] = 'dropdown-toggle';
      $element['#localized_options']['attributes']['data-toggle'] = 'dropdown';
      $element['#localized_options']['attributes']['data-disabled'] = 'true';
    }
  }
  // On primary navigation menu, class 'active' is not set on active menu item.
  // @see https://drupal.org/node/1896674
  if (($element['#href'] == $_GET['q'] || ($element['#href'] == '<front>' && drupal_is_front_page())) && (empty($element['#localized_options']['language']))) {
    $element['#attributes']['class'][] = 'active';
  }
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

/**
 * Overrides theme_fieldset().
 */
function bootstrap_urbinfo_fieldset($variables) {
  return theme_fieldset($variables);
}

/**
 * Overrides theme_links().
 *
 * Make language list into dropdown (actually 'dropup').
 */
function bootstrap_urbinfo_links__locale_block($variables) {
  global $language;
  $links = $variables['links'];
  $attributes = $variables['attributes'];
  $heading = $variables['heading'];

  $output = '<div class="btn-group dropup">';
  $output .= '<a href="#" data-toggle="dropdown">';
  $output .= $language->name . ' <span class="caret"></span></a>';
  $output .= '<ul class="dropdown-menu" role="menu">';

  foreach ($links as $key => $link) {
    $output .= '<li>' . l($link['title'], $link['href'], $link) . "</li>\n";
  }

  $output .= '</ul></div>';

  return $output;
}
