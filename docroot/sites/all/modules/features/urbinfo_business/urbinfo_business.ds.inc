<?php
/**
 * @file
 * urbinfo_business.ds.inc
 */

/**
 * Implements hook_ds_field_settings_info().
 */
function urbinfo_business_ds_field_settings_info() {
  $export = array();

  $ds_fieldsetting = new stdClass();
  $ds_fieldsetting->api_version = 1;
  $ds_fieldsetting->id = 'field_collection_item|field_team|default';
  $ds_fieldsetting->entity_type = 'field_collection_item';
  $ds_fieldsetting->bundle = 'field_team';
  $ds_fieldsetting->view_mode = 'default';
  $ds_fieldsetting->settings = array(
    'field_full_name' => array(
      'formatter_settings' => array(
        'ft' => array(
          'func' => 'theme_ds_field_expert',
          'ow' => TRUE,
          'ow-el' => 'h3',
          'ow-cl' => 'team-member__name',
          'ow-def-cl' => FALSE,
          'ow-at' => '',
          'ow-def-at' => FALSE,
        ),
      ),
    ),
    'field_job_title' => array(
      'formatter_settings' => array(
        'ft' => array(
          'func' => 'theme_ds_field_expert',
          'ow' => TRUE,
          'ow-el' => 'div',
          'ow-cl' => 'team-member__role',
          'ow-def-cl' => FALSE,
          'ow-at' => '',
          'ow-def-at' => FALSE,
        ),
      ),
    ),
    'field_image' => array(
      'formatter_settings' => array(
        'ft' => array(
          'func' => 'theme_ds_field_expert',
          'ow' => TRUE,
          'ow-el' => 'div',
          'ow-cl' => 'team-member__image',
          'ow-def-cl' => FALSE,
          'ow-at' => '',
          'ow-def-at' => FALSE,
        ),
      ),
    ),
  );
  $export['field_collection_item|field_team|default'] = $ds_fieldsetting;

  return $export;
}

/**
 * Implements hook_ds_layout_settings_info().
 */
function urbinfo_business_ds_layout_settings_info() {
  $export = array();

  $ds_layout = new stdClass();
  $ds_layout->api_version = 1;
  $ds_layout->id = 'field_collection_item|field_team|default';
  $ds_layout->entity_type = 'field_collection_item';
  $ds_layout->bundle = 'field_team';
  $ds_layout->view_mode = 'default';
  $ds_layout->layout = 'ds_1col';
  $ds_layout->settings = array(
    'regions' => array(
      'ds_content' => array(
        0 => 'field_image',
        1 => 'field_full_name',
        2 => 'field_job_title',
      ),
    ),
    'fields' => array(
      'field_image' => 'ds_content',
      'field_full_name' => 'ds_content',
      'field_job_title' => 'ds_content',
    ),
    'classes' => array(),
    'wrappers' => array(
      'ds_content' => 'div',
    ),
    'layout_wrapper' => 'div',
    'layout_attributes' => '',
    'layout_attributes_merge' => 1,
    'layout_link_attribute' => '',
    'layout_link_custom' => '',
  );
  $export['field_collection_item|field_team|default'] = $ds_layout;

  $ds_layout = new stdClass();
  $ds_layout->api_version = 1;
  $ds_layout->id = 'node|business|form';
  $ds_layout->entity_type = 'node';
  $ds_layout->bundle = 'business';
  $ds_layout->view_mode = 'form';
  $ds_layout->layout = 'ds_1col';
  $ds_layout->settings = array(
    'regions' => array(
      'ds_content' => array(
        0 => 'title_field',
        1 => 'field_logo',
        2 => 'field_business_type',
        3 => 'body',
        4 => 'field_address',
        5 => 'field_telephone',
        6 => 'field_email',
        7 => 'field_opening_hours',
        8 => 'field_facilities',
        9 => 'redirect',
        10 => 'path',
        11 => 'field_location',
        12 => 'field_average_price',
        13 => 'field_menu',
        14 => 'field_team',
      ),
      'hidden' => array(
        15 => 'rabbit_hole',
        16 => 'group_group',
        17 => 'language',
        18 => 'field_gallery',
        19 => 'field_cover_image',
        20 => 'xmlsitemap',
        21 => 'metatags',
        22 => '_add_existing_field',
      ),
    ),
    'fields' => array(
      'title_field' => 'ds_content',
      'field_logo' => 'ds_content',
      'field_business_type' => 'ds_content',
      'body' => 'ds_content',
      'field_address' => 'ds_content',
      'field_telephone' => 'ds_content',
      'field_email' => 'ds_content',
      'field_opening_hours' => 'ds_content',
      'field_facilities' => 'ds_content',
      'redirect' => 'ds_content',
      'path' => 'ds_content',
      'field_location' => 'ds_content',
      'field_average_price' => 'ds_content',
      'field_menu' => 'ds_content',
      'field_team' => 'ds_content',
      'rabbit_hole' => 'hidden',
      'group_group' => 'hidden',
      'language' => 'hidden',
      'field_gallery' => 'hidden',
      'field_cover_image' => 'hidden',
      'xmlsitemap' => 'hidden',
      'metatags' => 'hidden',
      '_add_existing_field' => 'hidden',
    ),
    'classes' => array(
      'layout_class' => array(
        '' => '',
      ),
    ),
    'wrappers' => array(
      'ds_content' => 'div',
    ),
    'layout_wrapper' => 'div',
    'layout_attributes' => '',
    'layout_attributes_merge' => 1,
    'layout_link_attribute' => '',
    'layout_link_custom' => '',
  );
  $export['node|business|form'] = $ds_layout;

  return $export;
}
