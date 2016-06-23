<?php
/**
 * @file
 * urbinfo_business.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function urbinfo_business_taxonomy_default_vocabularies() {
  return array(
    'business_type' => array(
      'name' => 'Business type',
      'machine_name' => 'business_type',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
    'facilities' => array(
      'name' => 'Facilities',
      'machine_name' => 'facilities',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
  );
}
