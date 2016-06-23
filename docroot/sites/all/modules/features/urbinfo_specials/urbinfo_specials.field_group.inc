<?php
/**
 * @file
 * urbinfo_specials.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function urbinfo_specials_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_content|node|promotion|list';
  $field_group->group_name = 'group_content';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'promotion';
  $field_group->mode = 'list';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Content',
    'weight' => '1',
    'children' => array(
      0 => 'body',
      1 => 'title',
    ),
    'format_type' => 'html-element',
    'format_settings' => array(
      'label' => 'Content',
      'instance_settings' => array(
        'classes' => 'special__content',
        'element' => 'div',
        'show_label' => '0',
        'label_element' => 'div',
        'attributes' => '',
      ),
    ),
  );
  $export['group_content|node|promotion|list'] = $field_group;

  return $export;
}
