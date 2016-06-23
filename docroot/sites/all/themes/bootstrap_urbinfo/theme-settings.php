<?php

/**
 * @file
 * theme-settings.php
 */

/**
 * Implements hook_form_alter().
 */
function bootstrap_urbinfo_form_system_theme_settings_alter(&$form, &$form_state) {
  $form['bootstrap_urbinfo'] = array(
    '#type' => 'vertical_tabs',
    '#prefix' => '<h2><small>' . t('Urbinfo Settings') . '</small></h2>',
    '#weight' => -20,
  );

  // Map.
  $form['map'] = array(
    '#type' => 'fieldset',
    '#title' => t('Business search'),
    '#group' => 'bootstrap_urbinfo',
  );
  $form['map']['bootstrap_urbinfo_map_default_zoom'] = array(
    '#type' => 'textfield',
    '#title' => t('Default zoom level'),
    '#description' => t('Used when map is not set to fit a specific area or result set.'),
    '#required' => TRUE,
    '#default_value' => theme_get_setting('bootstrap_urbinfo_map_default_zoom'),
  );
  $form['map']['bootstrap_urbinfo_map_max_zoom'] = array(
    '#type' => 'textfield',
    '#title' => t('Maximum zoom level'),
    '#required' => TRUE,
    '#default_value' => theme_get_setting('bootstrap_urbinfo_map_max_zoom'),
  );
  $form['map']['bootstrap_urbinfo_map_min_zoom'] = array(
    '#type' => 'textfield',
    '#title' => t('Minimum zoom level'),
    '#required' => TRUE,
    '#default_value' => theme_get_setting('bootstrap_urbinfo_map_min_zoom'),
  );
  $form['map']['bootstrap_urbinfo_map_tile_layer'] = array(
    '#type' => 'textfield',
    '#title' => t('Tile layer URL'),
    '#description' => t('URL pattern used to fetch map tiles e.g. http://{s}.tiles.mapbox.com/v3/MapID/{z}/{x}/{y}.png'),
    '#required' => TRUE,
    '#default_value' => theme_get_setting('bootstrap_urbinfo_map_tile_layer'),
  );
  $color_options =array(
    'red' => 'Red',
    'darkred' => 'Dark red',
    'lightred' => 'Light red',
    'orange' => 'Orange',
    'beige' => 'Beige',
    'green' => 'Green',
    'darkgreen' => 'Dark green',
    'lightgreen' => 'Light green',
    'blue' => 'Blue',
    'darkblue' => 'Dark blue',
    'lightblue' => 'Light blue',
    'purple' => 'Purple',
    'darkpurple' => 'Dark purple',
    'pink' => 'Pink',
    'cadetblue' => 'Cadet blue',
    'white' => 'White',
    'gray' => 'Gray',
    'lightgray' => 'Light gray',
    'black' => 'Black',
  );
  $form['map']['bootstrap_urbinfo_map_marker_color'] = array(
    '#type' => 'select',
    '#title' => t('Default marker color'),
    '#options' => $color_options,
    '#required' => TRUE,
    '#default_value' => theme_get_setting('bootstrap_urbinfo_map_marker_color'),
  );
  $form['map']['bootstrap_urbinfo_map_marker_color_active'] = array(
    '#type' => 'select',
    '#title' => t('Active marker color'),
    '#description' => t('Color used to highlight markers when hovering on list items.'),
    '#options' => $color_options,
    '#required' => TRUE,
    '#default_value' => theme_get_setting('bootstrap_urbinfo_map_marker_color_active'),
  );

  // Location.
  $form['location'] = array(
    '#type' => 'fieldset',
    '#title' => t('Location'),
    '#group' => 'bootstrap_urbinfo',
  );

  $form['location']['bootstrap_urbinfo_location_point_distance'] = array(
    '#type' => 'textfield',
    '#title' => t('Point distance'),
    '#description' => t('Default radius in KM to search around a point based location (e.g. an address). Region based searches (e.g. a place name) that have a fixed area are not affected by this setting.'),
    '#required' => TRUE,
    '#default_value' => theme_get_setting('bootstrap_urbinfo_location_point_distance'),
  );

  // APIs.
  $form['api'] = array(
    '#type' => 'fieldset',
    '#title' => t('APIs'),
    '#group' => 'bootstrap_urbinfo',
  );
  $form['api']['bootstrap_urbinfo_google_api_key'] = array(
    '#type' => 'textfield',
    '#title' => t('Google API key'),
    '#required' => TRUE,
    '#default_value' => theme_get_setting('bootstrap_urbinfo_google_api_key'),
  );
}
