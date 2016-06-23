<?php
/**
 * @file
 * urbinfo_cache.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function urbinfo_cache_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fastly_api_key';
  $strongarm->value = '37635edd72f4a2b5cb04fb4a80b5fc70';
  $export['fastly_api_key'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fastly_log_enabled';
  $strongarm->value = 0;
  $export['fastly_log_enabled'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fastly_non_cached';
  $strongarm->value = '';
  $export['fastly_non_cached'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fastly_service_id';
  $strongarm->value = '3h83ZWxAQXGvdYLQBkTG2A';
  $export['fastly_service_id'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'fastly_ttl';
  $strongarm->value = '3600';
  $export['fastly_ttl'] = $strongarm;

  return $export;
}
