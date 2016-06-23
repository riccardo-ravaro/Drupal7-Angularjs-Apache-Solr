<?php
/**
 * @file
 * urbinfo_business.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function urbinfo_business_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'create business content'.
  $permissions['create business content'] = array(
    'name' => 'create business content',
    'roles' => array(
      'anonymous user' => 'anonymous user',
      'authenticated user' => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: 'delete any business content'.
  $permissions['delete any business content'] = array(
    'name' => 'delete any business content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete own business content'.
  $permissions['delete own business content'] = array(
    'name' => 'delete own business content',
    'roles' => array(
      'anonymous user' => 'anonymous user',
      'authenticated user' => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: 'delete terms in business_type'.
  $permissions['delete terms in business_type'] = array(
    'name' => 'delete terms in business_type',
    'roles' => array(),
    'module' => 'taxonomy',
  );

  // Exported permission: 'delete terms in facilities'.
  $permissions['delete terms in facilities'] = array(
    'name' => 'delete terms in facilities',
    'roles' => array(),
    'module' => 'taxonomy',
  );

  // Exported permission: 'edit any business content'.
  $permissions['edit any business content'] = array(
    'name' => 'edit any business content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'edit own business content'.
  $permissions['edit own business content'] = array(
    'name' => 'edit own business content',
    'roles' => array(
      'anonymous user' => 'anonymous user',
      'authenticated user' => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: 'edit terms in business_type'.
  $permissions['edit terms in business_type'] = array(
    'name' => 'edit terms in business_type',
    'roles' => array(),
    'module' => 'taxonomy',
  );

  // Exported permission: 'edit terms in facilities'.
  $permissions['edit terms in facilities'] = array(
    'name' => 'edit terms in facilities',
    'roles' => array(),
    'module' => 'taxonomy',
  );

  return $permissions;
}
