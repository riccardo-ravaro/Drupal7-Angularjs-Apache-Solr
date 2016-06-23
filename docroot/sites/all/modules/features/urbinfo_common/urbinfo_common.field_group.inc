<?php
/**
 * @file
 * urbinfo_common.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function urbinfo_common_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_header|node|page|full';
  $field_group->group_name = 'group_header';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'page';
  $field_group->mode = 'full';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Header',
    'weight' => '0',
    'children' => array(
      0 => 'field_header_image',
      1 => 'title',
    ),
    'format_type' => 'html5',
    'format_settings' => array(
      'label' => 'Header',
      'instance_settings' => array(
        'id' => '',
        'classes' => 'node__header',
        'wrapper' => 'header',
      ),
    ),
  );
  $export['group_header|node|page|full'] = $field_group;

  return $export;
}
