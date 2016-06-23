<?php
/**
 * @file
 * urbinfo_footer.features.menu_custom.inc
 */

/**
 * Implements hook_menu_default_menu_custom().
 */
function urbinfo_footer_menu_default_menu_custom() {
  $menus = array();

  // Exported menu: menu-about-menu.
  $menus['menu-about-menu'] = array(
    'menu_name' => 'menu-about-menu',
    'title' => 'We are Urbinfo',
    'description' => 'Menu displayed in footer',
    'language' => 'und',
    'i18n_mode' => 5,
  );
  // Exported menu: menu-footer-more.
  $menus['menu-footer-more'] = array(
    'menu_name' => 'menu-footer-more',
    'title' => 'More',
    'description' => 'Secondary menu displayed in footer',
    'language' => 'und',
    'i18n_mode' => 5,
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('Menu displayed in footer');
  t('More');
  t('Secondary menu displayed in footer');
  t('We are Urbinfo');


  return $menus;
}
