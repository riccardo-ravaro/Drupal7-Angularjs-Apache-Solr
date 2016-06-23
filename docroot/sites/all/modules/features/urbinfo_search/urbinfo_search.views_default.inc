<?php
/**
 * @file
 * urbinfo_search.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function urbinfo_search_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'urbinfo_business_search';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'search_api_index_businesses';
  $view->human_name = 'Urbinfo business search';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Find businesses';
  $handler->display->display_options['css_class'] = 'search-results';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'none';
  $handler->display->display_options['cache']['type'] = 'search_api_views_cache';
  $handler->display->display_options['cache']['results_lifespan'] = '3600';
  $handler->display->display_options['cache']['results_lifespan_custom'] = '0';
  $handler->display->display_options['cache']['output_lifespan'] = '-1';
  $handler->display->display_options['cache']['output_lifespan_custom'] = '0';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'mini';
  $handler->display->display_options['pager']['options']['items_per_page'] = '30';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['style_plugin'] = 'views_json';
  $handler->display->display_options['style_options']['root_object'] = 'results';
  $handler->display->display_options['style_options']['top_child_object'] = '';
  $handler->display->display_options['style_options']['plaintext_output'] = 0;
  $handler->display->display_options['style_options']['remove_newlines'] = 0;
  $handler->display->display_options['style_options']['jsonp_prefix'] = '';
  $handler->display->display_options['style_options']['using_views_api_mode'] = 0;
  $handler->display->display_options['style_options']['object_arrays'] = 0;
  $handler->display->display_options['style_options']['numeric_strings'] = 1;
  $handler->display->display_options['style_options']['bigint_string'] = 0;
  $handler->display->display_options['style_options']['pretty_print'] = 0;
  $handler->display->display_options['style_options']['unescaped_slashes'] = 0;
  $handler->display->display_options['style_options']['unescaped_unicode'] = 0;
  $handler->display->display_options['style_options']['char_encoding'] = array();
  /* Field: Indexed Multilingual Content: Node ID */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['nid']['separator'] = '';
  $handler->display->display_options['fields']['nid']['link_to_entity'] = 0;
  /* Field: Indexed Multilingual Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_entity'] = 0;
  /* Field: Indexed Multilingual Content: URL */
  $handler->display->display_options['fields']['url']['id'] = 'url';
  $handler->display->display_options['fields']['url']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['fields']['url']['field'] = 'url';
  $handler->display->display_options['fields']['url']['label'] = '';
  $handler->display->display_options['fields']['url']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['url']['display_as_link'] = FALSE;
  $handler->display->display_options['fields']['url']['link_to_entity'] = 0;
  /* Field: Indexed Multilingual Content: Main category */
  $handler->display->display_options['fields']['field_business_type']['id'] = 'field_business_type';
  $handler->display->display_options['fields']['field_business_type']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['fields']['field_business_type']['field'] = 'field_business_type';
  $handler->display->display_options['fields']['field_business_type']['label'] = '';
  $handler->display->display_options['fields']['field_business_type']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_business_type']['link_to_entity'] = 0;
  $handler->display->display_options['fields']['field_business_type']['display'] = 'id';
  $handler->display->display_options['fields']['field_business_type']['view_mode'] = 'full';
  $handler->display->display_options['fields']['field_business_type']['bypass_access'] = 0;
  /* Field: Indexed Multilingual Content: Facilities */
  $handler->display->display_options['fields']['field_facilities']['id'] = 'field_facilities';
  $handler->display->display_options['fields']['field_facilities']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['fields']['field_facilities']['field'] = 'field_facilities';
  $handler->display->display_options['fields']['field_facilities']['label'] = '';
  $handler->display->display_options['fields']['field_facilities']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_facilities']['link_to_entity'] = 0;
  $handler->display->display_options['fields']['field_facilities']['display'] = 'id';
  $handler->display->display_options['fields']['field_facilities']['view_mode'] = 'full';
  $handler->display->display_options['fields']['field_facilities']['bypass_access'] = 0;
  /* Field: Indexed Multilingual Content: Logo */
  $handler->display->display_options['fields']['field_logo']['id'] = 'field_logo';
  $handler->display->display_options['fields']['field_logo']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['fields']['field_logo']['field'] = 'field_logo';
  $handler->display->display_options['fields']['field_logo']['label'] = '';
  $handler->display->display_options['fields']['field_logo']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_logo']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_logo']['type'] = 'image_url';
  $handler->display->display_options['fields']['field_logo']['settings'] = array(
    'url_type' => '0',
    'image_style' => '',
    'image_link' => '',
  );
  /* Field: Indexed Multilingual Content: The main body text */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['alter']['strip_tags'] = TRUE;
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['type'] = 'text_summary_or_trimmed';
  $handler->display->display_options['fields']['body']['settings'] = array(
    'trim_length' => '200',
  );
  /* Field: Indexed Multilingual Content: Email */
  $handler->display->display_options['fields']['field_email']['id'] = 'field_email';
  $handler->display->display_options['fields']['field_email']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['fields']['field_email']['field'] = 'field_email';
  $handler->display->display_options['fields']['field_email']['label'] = '';
  $handler->display->display_options['fields']['field_email']['element_label_colon'] = FALSE;
  /* Field: Indexed Multilingual Content: Telephone */
  $handler->display->display_options['fields']['field_telephone']['id'] = 'field_telephone';
  $handler->display->display_options['fields']['field_telephone']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['fields']['field_telephone']['field'] = 'field_telephone';
  $handler->display->display_options['fields']['field_telephone']['label'] = '';
  $handler->display->display_options['fields']['field_telephone']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_telephone']['settings'] = array(
    'skip_safe' => 0,
    'skip_empty_values' => 0,
  );
  /* Field: Indexed Multilingual Content: Address » Premise (i.e. Apartment / Suite number) */
  $handler->display->display_options['fields']['field_address_premise']['id'] = 'field_address_premise';
  $handler->display->display_options['fields']['field_address_premise']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['fields']['field_address_premise']['field'] = 'field_address_premise';
  $handler->display->display_options['fields']['field_address_premise']['label'] = '';
  $handler->display->display_options['fields']['field_address_premise']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_address_premise']['link_to_entity'] = 0;
  /* Field: Indexed Multilingual Content: Address » Thoroughfare (i.e. Street address) */
  $handler->display->display_options['fields']['field_address_thoroughfare']['id'] = 'field_address_thoroughfare';
  $handler->display->display_options['fields']['field_address_thoroughfare']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['fields']['field_address_thoroughfare']['field'] = 'field_address_thoroughfare';
  $handler->display->display_options['fields']['field_address_thoroughfare']['label'] = '';
  $handler->display->display_options['fields']['field_address_thoroughfare']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_address_thoroughfare']['link_to_entity'] = 0;
  /* Field: Indexed Multilingual Content: Address » Locality (i.e. City) */
  $handler->display->display_options['fields']['field_address_locality']['id'] = 'field_address_locality';
  $handler->display->display_options['fields']['field_address_locality']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['fields']['field_address_locality']['field'] = 'field_address_locality';
  $handler->display->display_options['fields']['field_address_locality']['label'] = '';
  $handler->display->display_options['fields']['field_address_locality']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_address_locality']['link_to_entity'] = 0;
  /* Field: Indexed Multilingual Content: Address » Dependent locality */
  $handler->display->display_options['fields']['field_address_dependent_locality']['id'] = 'field_address_dependent_locality';
  $handler->display->display_options['fields']['field_address_dependent_locality']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['fields']['field_address_dependent_locality']['field'] = 'field_address_dependent_locality';
  $handler->display->display_options['fields']['field_address_dependent_locality']['label'] = '';
  $handler->display->display_options['fields']['field_address_dependent_locality']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_address_dependent_locality']['link_to_entity'] = 0;
  /* Field: Indexed Multilingual Content: Address » Administrative area (i.e. State / Province) */
  $handler->display->display_options['fields']['field_address_administrative_area']['id'] = 'field_address_administrative_area';
  $handler->display->display_options['fields']['field_address_administrative_area']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['fields']['field_address_administrative_area']['field'] = 'field_address_administrative_area';
  $handler->display->display_options['fields']['field_address_administrative_area']['label'] = '';
  $handler->display->display_options['fields']['field_address_administrative_area']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_address_administrative_area']['link_to_entity'] = 0;
  /* Field: Indexed Multilingual Content: Address » Sub administrative area */
  $handler->display->display_options['fields']['field_address_sub_administrative_area']['id'] = 'field_address_sub_administrative_area';
  $handler->display->display_options['fields']['field_address_sub_administrative_area']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['fields']['field_address_sub_administrative_area']['field'] = 'field_address_sub_administrative_area';
  $handler->display->display_options['fields']['field_address_sub_administrative_area']['label'] = '';
  $handler->display->display_options['fields']['field_address_sub_administrative_area']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_address_sub_administrative_area']['link_to_entity'] = 0;
  /* Field: Indexed Multilingual Content: Address » Postal code */
  $handler->display->display_options['fields']['field_address_postal_code']['id'] = 'field_address_postal_code';
  $handler->display->display_options['fields']['field_address_postal_code']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['fields']['field_address_postal_code']['field'] = 'field_address_postal_code';
  $handler->display->display_options['fields']['field_address_postal_code']['label'] = '';
  $handler->display->display_options['fields']['field_address_postal_code']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_address_postal_code']['link_to_entity'] = 0;
  /* Field: Indexed Multilingual Content: Address » Country */
  $handler->display->display_options['fields']['field_address_country']['id'] = 'field_address_country';
  $handler->display->display_options['fields']['field_address_country']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['fields']['field_address_country']['field'] = 'field_address_country';
  $handler->display->display_options['fields']['field_address_country']['label'] = '';
  $handler->display->display_options['fields']['field_address_country']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_address_country']['link_to_entity'] = 0;
  $handler->display->display_options['fields']['field_address_country']['format_name'] = 1;
  /* Field: Location: Latitude (indexed) */
  $handler->display->display_options['fields']['field_location_lat']['id'] = 'field_location_lat';
  $handler->display->display_options['fields']['field_location_lat']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['fields']['field_location_lat']['field'] = 'field_location_lat';
  $handler->display->display_options['fields']['field_location_lat']['label'] = '';
  $handler->display->display_options['fields']['field_location_lat']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_location_lat']['precision'] = '0';
  $handler->display->display_options['fields']['field_location_lat']['separator'] = '';
  $handler->display->display_options['fields']['field_location_lat']['link_to_entity'] = 0;
  /* Field: Location: Longitude (indexed) */
  $handler->display->display_options['fields']['field_location_lon']['id'] = 'field_location_lon';
  $handler->display->display_options['fields']['field_location_lon']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['fields']['field_location_lon']['field'] = 'field_location_lon';
  $handler->display->display_options['fields']['field_location_lon']['label'] = '';
  $handler->display->display_options['fields']['field_location_lon']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_location_lon']['precision'] = '0';
  $handler->display->display_options['fields']['field_location_lon']['separator'] = '';
  $handler->display->display_options['fields']['field_location_lon']['link_to_entity'] = 0;
  /* Field: Location: LatLong Pair (indexed) */
  $handler->display->display_options['fields']['field_location_latlon']['id'] = 'field_location_latlon';
  $handler->display->display_options['fields']['field_location_latlon']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['fields']['field_location_latlon']['field'] = 'field_location_latlon';
  $handler->display->display_options['fields']['field_location_latlon']['label'] = 'distance';
  $handler->display->display_options['fields']['field_location_latlon']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_location_latlon']['link_to_entity'] = 0;
  $handler->display->display_options['fields']['field_location_latlon']['show_distance_to_point'] = TRUE;
  $handler->display->display_options['fields']['field_location_latlon']['conversion_factor'] = '1';
  $handler->display->display_options['fields']['field_location_latlon']['precision'] = '1';
  $handler->display->display_options['fields']['field_location_latlon']['separator'] = '';
  /* Field: Indexed Multilingual Content: Gallery */
  $handler->display->display_options['fields']['field_gallery']['id'] = 'field_gallery';
  $handler->display->display_options['fields']['field_gallery']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['fields']['field_gallery']['field'] = 'field_gallery';
  $handler->display->display_options['fields']['field_gallery']['label'] = '';
  $handler->display->display_options['fields']['field_gallery']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_gallery']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_gallery']['type'] = 'file_url_plain';
  $handler->display->display_options['fields']['field_gallery']['settings'] = array(
    'file_view_mode' => 'preview',
  );
  $handler->display->display_options['fields']['field_gallery']['delta_offset'] = '0';
  /* Sort criterion: Location: LatLong Pair (indexed) */
  $handler->display->display_options['sorts']['field_location_latlon']['id'] = 'field_location_latlon';
  $handler->display->display_options['sorts']['field_location_latlon']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['sorts']['field_location_latlon']['field'] = 'field_location_latlon';
  /* Filter criterion: Search: Fulltext search */
  $handler->display->display_options['filters']['search_api_views_fulltext']['id'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['filters']['search_api_views_fulltext']['field'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['group'] = 1;
  $handler->display->display_options['filters']['search_api_views_fulltext']['exposed'] = TRUE;
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['operator_id'] = 'search_api_views_fulltext_op';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['label'] = 'Search';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['operator'] = 'search_api_views_fulltext_op';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['identifier'] = 'query';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
  );
  $handler->display->display_options['filters']['search_api_views_fulltext']['fields'] = array(
    'body:value' => 'body:value',
    'field_business_type:name_field' => 'field_business_type:name_field',
    'field_facilities:name_field' => 'field_facilities:name_field',
    'title_field' => 'title_field',
  );
  /* Filter criterion: Location: LatLong Pair (indexed) */
  $handler->display->display_options['filters']['field_location_latlon']['id'] = 'field_location_latlon';
  $handler->display->display_options['filters']['field_location_latlon']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['filters']['field_location_latlon']['field'] = 'field_location_latlon';
  $handler->display->display_options['filters']['field_location_latlon']['operator'] = '';
  $handler->display->display_options['filters']['field_location_latlon']['group'] = 1;
  $handler->display->display_options['filters']['field_location_latlon']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_location_latlon']['expose']['operator_id'] = 'dist';
  $handler->display->display_options['filters']['field_location_latlon']['expose']['label'] = 'Location';
  $handler->display->display_options['filters']['field_location_latlon']['expose']['use_operator'] = TRUE;
  $handler->display->display_options['filters']['field_location_latlon']['expose']['operator'] = 'field_location_latlon_op';
  $handler->display->display_options['filters']['field_location_latlon']['expose']['identifier'] = 'location';
  $handler->display->display_options['filters']['field_location_latlon']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
  );
  $handler->display->display_options['filters']['field_location_latlon']['plugin'] = 'geocoder';
  $handler->display->display_options['filters']['field_location_latlon']['plugin-geocoder'] = array(
    'geocoder_handler' => 'google',
    'geocoder_handler_options' => array(
      'geometry_type' => 'bounds',
      'all_results' => 0,
      'reject_results' => array(
        'APPROXIMATE' => 0,
        'GEOMETRIC_CENTER' => 0,
        'RANGE_INTERPOLATED' => 0,
        'ROOFTOP' => 0,
      ),
    ),
  );
  $handler->display->display_options['filters']['field_location_latlon']['radius_type'] = 'textfield';
  /* Filter criterion: Location: LatLong Pair (indexed) */
  $handler->display->display_options['filters']['field_location_latlon_1']['id'] = 'field_location_latlon_1';
  $handler->display->display_options['filters']['field_location_latlon_1']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['filters']['field_location_latlon_1']['field'] = 'field_location_latlon';
  $handler->display->display_options['filters']['field_location_latlon_1']['operator'] = '';
  $handler->display->display_options['filters']['field_location_latlon_1']['group'] = 1;
  $handler->display->display_options['filters']['field_location_latlon_1']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_location_latlon_1']['expose']['operator_id'] = 'dist';
  $handler->display->display_options['filters']['field_location_latlon_1']['expose']['label'] = 'LatLong Raw';
  $handler->display->display_options['filters']['field_location_latlon_1']['expose']['use_operator'] = TRUE;
  $handler->display->display_options['filters']['field_location_latlon_1']['expose']['operator'] = 'field_location_latlon_1_op';
  $handler->display->display_options['filters']['field_location_latlon_1']['expose']['identifier'] = 'center';
  $handler->display->display_options['filters']['field_location_latlon_1']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
  );
  $handler->display->display_options['filters']['field_location_latlon_1']['plugin'] = 'raw';
  $handler->display->display_options['filters']['field_location_latlon_1']['plugin-geocoder'] = array(
    'geocoder_handler' => 'latlon',
  );
  $handler->display->display_options['filters']['field_location_latlon_1']['radius_type'] = 'textfield';
  /* Filter criterion: Location: Latitude (indexed) */
  $handler->display->display_options['filters']['field_location_lat']['id'] = 'field_location_lat';
  $handler->display->display_options['filters']['field_location_lat']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['filters']['field_location_lat']['field'] = 'field_location_lat';
  $handler->display->display_options['filters']['field_location_lat']['operator'] = '>';
  $handler->display->display_options['filters']['field_location_lat']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_location_lat']['expose']['operator_id'] = 'field_location_lat_op';
  $handler->display->display_options['filters']['field_location_lat']['expose']['label'] = 'Min Latitude';
  $handler->display->display_options['filters']['field_location_lat']['expose']['operator'] = 'field_location_lat_op';
  $handler->display->display_options['filters']['field_location_lat']['expose']['identifier'] = 'lat_min';
  $handler->display->display_options['filters']['field_location_lat']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
  );
  /* Filter criterion: Location: Longitude (indexed) */
  $handler->display->display_options['filters']['field_location_lon']['id'] = 'field_location_lon';
  $handler->display->display_options['filters']['field_location_lon']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['filters']['field_location_lon']['field'] = 'field_location_lon';
  $handler->display->display_options['filters']['field_location_lon']['operator'] = '>';
  $handler->display->display_options['filters']['field_location_lon']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_location_lon']['expose']['operator_id'] = 'field_location_lon_op';
  $handler->display->display_options['filters']['field_location_lon']['expose']['label'] = 'Min Longitude';
  $handler->display->display_options['filters']['field_location_lon']['expose']['operator'] = 'field_location_lon_op';
  $handler->display->display_options['filters']['field_location_lon']['expose']['identifier'] = 'lng_min';
  $handler->display->display_options['filters']['field_location_lon']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
  );
  /* Filter criterion: Location: Latitude (indexed) */
  $handler->display->display_options['filters']['field_location_lat_1']['id'] = 'field_location_lat_1';
  $handler->display->display_options['filters']['field_location_lat_1']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['filters']['field_location_lat_1']['field'] = 'field_location_lat';
  $handler->display->display_options['filters']['field_location_lat_1']['operator'] = '<';
  $handler->display->display_options['filters']['field_location_lat_1']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_location_lat_1']['expose']['operator_id'] = 'field_location_lat_1_op';
  $handler->display->display_options['filters']['field_location_lat_1']['expose']['label'] = 'Max Latitude';
  $handler->display->display_options['filters']['field_location_lat_1']['expose']['operator'] = 'field_location_lat_1_op';
  $handler->display->display_options['filters']['field_location_lat_1']['expose']['identifier'] = 'lat_max';
  $handler->display->display_options['filters']['field_location_lat_1']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
  );
  /* Filter criterion: Location: Longitude (indexed) */
  $handler->display->display_options['filters']['field_location_lon_1']['id'] = 'field_location_lon_1';
  $handler->display->display_options['filters']['field_location_lon_1']['table'] = 'search_api_index_businesses';
  $handler->display->display_options['filters']['field_location_lon_1']['field'] = 'field_location_lon';
  $handler->display->display_options['filters']['field_location_lon_1']['operator'] = '<';
  $handler->display->display_options['filters']['field_location_lon_1']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_location_lon_1']['expose']['operator_id'] = 'field_location_lon_1_op';
  $handler->display->display_options['filters']['field_location_lon_1']['expose']['label'] = 'Max Longitude';
  $handler->display->display_options['filters']['field_location_lon_1']['expose']['operator'] = 'field_location_lon_1_op';
  $handler->display->display_options['filters']['field_location_lon_1']['expose']['identifier'] = 'lng_max';
  $handler->display->display_options['filters']['field_location_lon_1']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'entity';
  $handler->display->display_options['row_options']['view_mode'] = 'teaser';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['exposed_block'] = TRUE;
  $handler->display->display_options['path'] = 'search';

  /* Display: API */
  $handler = $view->new_display('page', 'API', 'api');
  $handler->display->display_options['path'] = 'api/v1/search';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'json');
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'views_json';
  $handler->display->display_options['style_options']['root_object'] = 'results';
  $handler->display->display_options['style_options']['top_child_object'] = '';
  $handler->display->display_options['style_options']['plaintext_output'] = 0;
  $handler->display->display_options['style_options']['remove_newlines'] = 0;
  $handler->display->display_options['style_options']['jsonp_prefix'] = '';
  $handler->display->display_options['style_options']['using_views_api_mode'] = 1;
  $handler->display->display_options['style_options']['object_arrays'] = 0;
  $handler->display->display_options['style_options']['numeric_strings'] = 1;
  $handler->display->display_options['style_options']['bigint_string'] = 0;
  $handler->display->display_options['style_options']['pretty_print'] = 0;
  $handler->display->display_options['style_options']['unescaped_slashes'] = 0;
  $handler->display->display_options['style_options']['unescaped_unicode'] = 0;
  $handler->display->display_options['style_options']['char_encoding'] = array();
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['path'] = 'api/v1/search.json';
  $translatables['urbinfo_business_search'] = array(
    t('Master'),
    t('Find businesses'),
    t('more'),
    t('Apply'),
    t('Reset'),
    t('Sort by'),
    t('Asc'),
    t('Desc'),
    t('Items per page'),
    t('- All -'),
    t('Offset'),
    t('« first'),
    t('‹ previous'),
    t('next ›'),
    t('last »'),
    t('.'),
    t('distance'),
    t('Search'),
    t('Location'),
    t('LatLong Raw'),
    t('Min Latitude'),
    t('Min Longitude'),
    t('Max Latitude'),
    t('Max Longitude'),
    t('Page'),
    t('API'),
  );
  $export['urbinfo_business_search'] = $view;

  return $export;
}
