<?php
/**
 * @file
 * urbinfo_specials.features.og_features_permission.inc
 */

/**
 * Implements hook_og_features_default_permissions().
 */
function urbinfo_specials_og_features_default_permissions() {
  $permissions = array();

  // Exported og permission: 'node:business:add user'
  $permissions['node:business:add user'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:business:administer group'
  $permissions['node:business:administer group'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:business:approve and deny subscription'
  $permissions['node:business:approve and deny subscription'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:business:create promotion content'
  $permissions['node:business:create promotion content'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:business:delete any promotion content'
  $permissions['node:business:delete any promotion content'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:business:delete own promotion content'
  $permissions['node:business:delete own promotion content'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:business:manage members'
  $permissions['node:business:manage members'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:business:manage permissions'
  $permissions['node:business:manage permissions'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:business:manage roles'
  $permissions['node:business:manage roles'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:business:subscribe'
  $permissions['node:business:subscribe'] = array(
    'roles' => array(
      'non-member' => 'non-member',
    ),
  );

  // Exported og permission: 'node:business:subscribe without approval'
  $permissions['node:business:subscribe without approval'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:business:unsubscribe'
  $permissions['node:business:unsubscribe'] = array(
    'roles' => array(
      'member' => 'member',
    ),
  );

  // Exported og permission: 'node:business:update any promotion content'
  $permissions['node:business:update any promotion content'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:business:update group'
  $permissions['node:business:update group'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:business:update own promotion content'
  $permissions['node:business:update own promotion content'] = array(
    'roles' => array(),
  );

  return $permissions;
}
