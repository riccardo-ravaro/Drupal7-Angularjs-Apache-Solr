<?php
/**
 * @file
 * urbinfo_cache.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function urbinfo_cache_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}
