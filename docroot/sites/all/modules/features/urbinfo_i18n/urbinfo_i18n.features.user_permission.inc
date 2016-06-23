<?php
/**
 * @file
 * urbinfo_i18n.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function urbinfo_i18n_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'administer entity translation'.
  $permissions['administer entity translation'] = array(
    'name' => 'administer entity translation',
    'roles' => array(),
    'module' => 'entity_translation',
  );

  // Exported permission: 'toggle field translatability'.
  $permissions['toggle field translatability'] = array(
    'name' => 'toggle field translatability',
    'roles' => array(),
    'module' => 'entity_translation',
  );

  // Exported permission: 'translate any entity'.
  $permissions['translate any entity'] = array(
    'name' => 'translate any entity',
    'roles' => array(
      'Site admin' => 'Site admin',
    ),
    'module' => 'entity_translation',
  );

  // Exported permission: 'translate node entities'.
  $permissions['translate node entities'] = array(
    'name' => 'translate node entities',
    'roles' => array(
      'Site admin' => 'Site admin',
      'authenticated user' => 'authenticated user',
    ),
    'module' => 'entity_translation',
  );

  // Exported permission: 'translate taxonomy_term entities'.
  $permissions['translate taxonomy_term entities'] = array(
    'name' => 'translate taxonomy_term entities',
    'roles' => array(
      'Site admin' => 'Site admin',
      'authenticated user' => 'authenticated user',
    ),
    'module' => 'entity_translation',
  );

  return $permissions;
}
