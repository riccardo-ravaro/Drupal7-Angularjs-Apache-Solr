<?php
/**
 * @file
 * urbinfo_users.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function urbinfo_users_user_default_roles() {
  $roles = array();

  // Exported role: Site admin.
  $roles['Site admin'] = array(
    'name' => 'Site admin',
    'weight' => 2,
  );

  return $roles;
}
