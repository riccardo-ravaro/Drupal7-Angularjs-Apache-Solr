<?php
/**
 * @file
 * urbinfo_users.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function urbinfo_users_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'access connections tab'.
  $permissions['access connections tab'] = array(
    'name' => 'access connections tab',
    'roles' => array(
      'anonymous user' => 'anonymous user',
      'authenticated user' => 'authenticated user',
    ),
    'module' => 'connector',
  );

  // Exported permission: 'sync local profile with connections'.
  $permissions['sync local profile with connections'] = array(
    'name' => 'sync local profile with connections',
    'roles' => array(
      'anonymous user' => 'anonymous user',
      'authenticated user' => 'authenticated user',
    ),
    'module' => 'connector',
  );

  return $permissions;
}
