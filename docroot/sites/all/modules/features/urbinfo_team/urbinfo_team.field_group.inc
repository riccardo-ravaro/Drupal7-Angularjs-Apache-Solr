<?php
/**
 * @file
 * urbinfo_team.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function urbinfo_team_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_content|node|employee|teaser';
  $field_group->group_name = 'group_content';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'employee';
  $field_group->mode = 'teaser';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Content',
    'weight' => '1',
    'children' => array(
      0 => 'field_job_title',
      1 => 'body',
      2 => 'title',
    ),
    'format_type' => 'html-element',
    'format_settings' => array(
      'label' => 'Content',
      'instance_settings' => array(
        'classes' => 'employee__content',
        'element' => 'div',
        'show_label' => '0',
        'label_element' => 'div',
        'attributes' => '',
      ),
    ),
  );
  $export['group_content|node|employee|teaser'] = $field_group;

  return $export;
}
