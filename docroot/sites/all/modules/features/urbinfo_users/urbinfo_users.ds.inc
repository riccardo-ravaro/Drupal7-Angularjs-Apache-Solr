<?php
/**
 * @file
 * urbinfo_users.ds.inc
 */

/**
 * Implements hook_ds_layout_settings_info().
 */
function urbinfo_users_ds_layout_settings_info() {
  $export = array();

  $ds_layout = new stdClass();
  $ds_layout->api_version = 1;
  $ds_layout->id = 'user|user|form';
  $ds_layout->entity_type = 'user';
  $ds_layout->bundle = 'user';
  $ds_layout->view_mode = 'form';
  $ds_layout->layout = 'ds_1col';
  $ds_layout->settings = array(
    'regions' => array(
      'ds_content' => array(
        0 => 'field_full_name',
        1 => 'field_first_name',
        2 => 'field_last_name',
        3 => 'field_date_of_birth',
        4 => 'field_gender',
        5 => 'field_telephone',
        6 => 'account',
        7 => 'locale',
        8 => 'timezone',
        9 => 'ckeditor',
        10 => 'redirect',
        11 => 'og_user_node',
        12 => '_add_existing_field',
      ),
    ),
    'fields' => array(
      'field_full_name' => 'ds_content',
      'field_first_name' => 'ds_content',
      'field_last_name' => 'ds_content',
      'field_date_of_birth' => 'ds_content',
      'field_gender' => 'ds_content',
      'field_telephone' => 'ds_content',
      'account' => 'ds_content',
      'locale' => 'ds_content',
      'timezone' => 'ds_content',
      'ckeditor' => 'ds_content',
      'redirect' => 'ds_content',
      'og_user_node' => 'ds_content',
      '_add_existing_field' => 'ds_content',
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
  $export['user|user|form'] = $ds_layout;

  return $export;
}
