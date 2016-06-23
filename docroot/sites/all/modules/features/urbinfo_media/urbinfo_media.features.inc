<?php
/**
 * @file
 * urbinfo_media.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function urbinfo_media_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "file_entity" && $api == "file_default_displays") {
    return array("version" => "1");
  }
  if ($module == "file_entity" && $api == "file_type") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_image_default_styles().
 */
function urbinfo_media_image_default_styles() {
  $styles = array();

  // Exported image style: specials_background.
  $styles['specials_background'] = array(
    'name' => 'specials_background',
    'label' => 'Specials background',
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
          'width' => 1180,
          'height' => '',
          'upscale' => 1,
        ),
        'weight' => 1,
      ),
    ),
  );

  return $styles;
}
