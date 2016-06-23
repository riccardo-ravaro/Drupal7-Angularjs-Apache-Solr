<?php
/**
 * @file
 * urbinfo_footer.features.fe_block_settings.inc
 */

/**
 * Implements hook_default_fe_block_settings().
 */
function urbinfo_footer_default_fe_block_settings() {
  $export = array();

  $export['version'] = '2.0';

  $export['locale-language'] = array(
    'cache' => -1,
    'custom' => 0,
    'delta' => 'language',
    'module' => 'locale',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'bootstrap_urbinfo' => array(
        'region' => 'footer_bottom',
        'status' => 1,
        'theme' => 'bootstrap_urbinfo',
        'weight' => -8,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
    ),
    'title' => '<none>',
    'visibility' => 0,
  );

  $export['menu-menu-about-menu'] = array(
    'cache' => -1,
    'custom' => 0,
    'delta' => 'menu-about-menu',
    'module' => 'menu',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'bootstrap_urbinfo' => array(
        'region' => 'footer_first',
        'status' => 1,
        'theme' => 'bootstrap_urbinfo',
        'weight' => 0,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['menu-menu-footer-more'] = array(
    'cache' => -1,
    'custom' => 0,
    'delta' => 'menu-footer-more',
    'module' => 'menu',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'bootstrap_urbinfo' => array(
        'region' => 'footer_second',
        'status' => 1,
        'theme' => 'bootstrap_urbinfo',
        'weight' => -17,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-urbinfo_footer_text-block'] = array(
    'cache' => -1,
    'custom' => 0,
    'delta' => 'urbinfo_footer_text-block',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'bootstrap_urbinfo' => array(
        'region' => 'footer_third',
        'status' => 1,
        'theme' => 'bootstrap_urbinfo',
        'weight' => 0,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  return $export;
}
