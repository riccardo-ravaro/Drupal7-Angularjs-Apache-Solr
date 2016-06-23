<?php
/**
 * @file
 * urbinfo_common.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function urbinfo_common_taxonomy_default_vocabularies() {
  return array(
    'ui_text_placement' => array(
      'name' => 'UI text placement',
      'machine_name' => 'ui_text_placement',
      'description' => 'Location for UI text nodes',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
  );
}
