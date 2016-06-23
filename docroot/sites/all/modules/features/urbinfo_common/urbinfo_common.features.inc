<?php
/**
 * @file
 * urbinfo_common.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function urbinfo_common_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "ds" && $api == "ds") {
    return array("version" => "1");
  }
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_image_default_styles().
 */
function urbinfo_common_image_default_styles() {
  $styles = array();

  // Exported image style: header_image.
  $styles['header_image'] = array(
    'name' => 'header_image',
    'label' => 'Header image',
    'effects' => array(
      9 => array(
        'label' => 'Scale',
        'help' => 'Scaling will maintain the aspect-ratio of the original image. If only a single dimension is specified, the other dimension will be calculated.',
        'effect callback' => 'image_scale_effect',
        'dimensions callback' => 'image_scale_dimensions',
        'form callback' => 'image_scale_form',
        'summary theme' => 'image_scale_summary',
        'module' => 'image',
        'name' => 'image_scale',
        'data' => array(
          'width' => 2000,
          'height' => '',
          'upscale' => 0,
        ),
        'weight' => 1,
      ),
    ),
  );

  return $styles;
}

/**
 * Implements hook_node_info().
 */
function urbinfo_common_node_info() {
  $items = array(
    'page' => array(
      'name' => t('Page'),
      'base' => 'node_content',
      'description' => t('Generic page.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'ui_text' => array(
      'name' => t('UI text'),
      'base' => 'node_content',
      'description' => t('Special nodes used to provide text for user interface.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
