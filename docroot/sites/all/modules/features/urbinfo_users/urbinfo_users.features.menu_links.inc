<?php
/**
 * @file
 * urbinfo_users.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function urbinfo_users_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: user-menu_current-userfieldfullname:http://vagrant.urbinfo.com/user/1/edit
  $menu_links['user-menu_current-userfieldfullname:http://vagrant.urbinfo.com/user/1/edit'] = array(
    'menu_name' => 'user-menu',
    'link_path' => 'http://vagrant.urbinfo.com/user/1/edit',
    'router_path' => '',
    'link_title' => '[current-user:field_full_name]',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'alter' => TRUE,
      'menu_token_link_path' => '[current-user:edit-url]',
      'menu_token_data' => array(
        'user' => array(
          'type' => 'user',
          'plugin' => 'user_context',
          'options' => array(),
        ),
      ),
      'menu_token_options' => array(
        'clear' => 0,
      ),
      'identifier' => 'user-menu_current-userfieldfullname:http://vagrant.urbinfo.com/user/1/edit',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 1,
    'has_children' => 1,
    'expanded' => 1,
    'weight' => -50,
    'customized' => 1,
    'language' => 'und',
    'menu_links_customized' => 1,
  );
  // Exported menu link: user-menu_edit-your-details:http://vagrant.urbinfo.com/user/1/edit
  $menu_links['user-menu_edit-your-details:http://vagrant.urbinfo.com/user/1/edit'] = array(
    'menu_name' => 'user-menu',
    'link_path' => 'http://vagrant.urbinfo.com/user/1/edit',
    'router_path' => '',
    'link_title' => 'Edit your details',
    'options' => array(
      'menu_token_link_path' => '[current-user:edit-url]',
      'menu_token_data' => array(
        'user' => array(
          'type' => 'user',
          'plugin' => 'user_context',
          'options' => array(),
        ),
      ),
      'menu_token_options' => array(
        'clear' => 0,
      ),
      'attributes' => array(
        'title' => '',
      ),
      'alter' => TRUE,
      'identifier' => 'user-menu_edit-your-details:http://vagrant.urbinfo.com/user/1/edit',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 1,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -50,
    'customized' => 1,
    'language' => 'und',
    'menu_links_customized' => 1,
    'parent_identifier' => 'user-menu_riccardo-ravaro:http://vagrant.urbinfo.com/user/1/edit',
  );
  // Exported menu link: user-menu_log-in--register:user/login
  $menu_links['user-menu_log-in--register:user/login'] = array(
    'menu_name' => 'user-menu',
    'link_path' => 'user/login',
    'router_path' => 'user/login',
    'link_title' => 'Log in / Register',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'user-menu_log-in--register:user/login',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -49,
    'customized' => 1,
    'language' => 'und',
    'menu_links_customized' => 1,
  );
  // Exported menu link: user-menu_log-out:user/logout
  $menu_links['user-menu_log-out:user/logout'] = array(
    'menu_name' => 'user-menu',
    'link_path' => 'user/logout',
    'router_path' => 'user/logout',
    'link_title' => 'Log out',
    'options' => array(
      'identifier' => 'user-menu_log-out:user/logout',
    ),
    'module' => 'system',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -49,
    'customized' => 1,
    'language' => 'und',
    'menu_links_customized' => 1,
    'parent_identifier' => 'user-menu_riccardo-ravaro:http://vagrant.urbinfo.com/user/1/edit',
  );
  // Exported menu link: user-menu_user-account:user
  $menu_links['user-menu_user-account:user'] = array(
    'menu_name' => 'user-menu',
    'link_path' => 'user',
    'router_path' => 'user',
    'link_title' => 'User account',
    'options' => array(
      'alter' => TRUE,
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'user-menu_user-account:user',
    ),
    'module' => 'system',
    'hidden' => 1,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 1,
    'weight' => -48,
    'customized' => 1,
    'language' => 'und',
    'menu_links_customized' => 1,
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('Edit your details');
  t('Log in / Register');
  t('Log out');
  t('User account');
  t('[current-user:field_full_name]');


  return $menu_links;
}
