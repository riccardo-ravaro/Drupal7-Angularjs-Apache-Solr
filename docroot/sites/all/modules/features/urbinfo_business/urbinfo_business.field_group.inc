<?php
/**
 * @file
 * urbinfo_business.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function urbinfo_business_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_basic|node|business|default';
  $field_group->group_name = 'group_basic';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'business';
  $field_group->mode = 'default';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Basic information',
    'weight' => '0',
    'children' => array(
      0 => 'field_address',
      1 => 'field_telephone',
      2 => 'field_email',
      3 => 'field_location',
    ),
    'format_type' => 'html-element',
    'format_settings' => array(
      'formatter' => '',
      'instance_settings' => array(
        'element' => 'div',
        'show_label' => 0,
        'label_element' => 'div',
        'classes' => '',
        'attributes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_basic|node|business|default'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_basic|node|business|form';
  $field_group->group_name = 'group_basic';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'business';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_pages';
  $field_group->data = array(
    'label' => 'Basic information',
    'weight' => '0',
    'children' => array(
      0 => 'field_address',
      1 => 'field_telephone',
      2 => 'field_email',
      3 => 'field_location',
      4 => 'title',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'label' => 'Basic information',
      'instance_settings' => array(
        'required_fields' => 1,
        'classes' => 'group-basic field-group-fieldset',
        'description' => '',
      ),
      'formatter' => 'open',
    ),
  );
  $export['group_basic|node|business|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_info|node|business|default';
  $field_group->group_name = 'group_info';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'business';
  $field_group->mode = 'default';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Information',
    'weight' => '1',
    'children' => array(
      0 => 'body',
      1 => 'field_logo',
    ),
    'format_type' => 'html-element',
    'format_settings' => array(
      'formatter' => '',
      'instance_settings' => array(
        'element' => 'div',
        'show_label' => 0,
        'label_element' => 'div',
        'classes' => '',
        'attributes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_info|node|business|default'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_info|node|business|form';
  $field_group->group_name = 'group_info';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'business';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_pages';
  $field_group->data = array(
    'label' => 'Information',
    'weight' => '0',
    'children' => array(
      0 => 'body',
      1 => 'field_logo',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'label' => 'Information',
      'instance_settings' => array(
        'required_fields' => 1,
        'classes' => 'group-info field-group-fieldset',
        'description' => '',
      ),
      'formatter' => 'closed',
    ),
  );
  $export['group_info|node|business|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_pages|node|business|form';
  $field_group->group_name = 'group_pages';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'business';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Pages',
    'weight' => '2',
    'children' => array(
      0 => 'group_basic',
      1 => 'group_info',
    ),
    'format_type' => 'tabs',
    'format_settings' => array(
      'formatter' => '',
      'instance_settings' => array(
        'classes' => 'group-pages field-group-multipage-group',
        'page_header' => 3,
        'move_additional' => 1,
        'page_counter' => 1,
        'move_button' => 0,
      ),
    ),
  );
  $export['group_pages|node|business|form'] = $field_group;

  return $export;
}
