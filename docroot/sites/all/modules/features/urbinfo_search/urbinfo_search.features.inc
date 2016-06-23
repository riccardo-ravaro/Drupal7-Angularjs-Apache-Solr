<?php
/**
 * @file
 * urbinfo_search.features.inc
 */

/**
 * Implements hook_views_api().
 */
function urbinfo_search_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_default_search_api_index().
 */
function urbinfo_search_default_search_api_index() {
  $items = array();
  $items['businesses'] = entity_import('search_api_index', '{
    "name" : "Businesses",
    "machine_name" : "businesses",
    "description" : "Index of business profile nodes",
    "server" : "solr",
    "item_type" : "search_api_et_node",
    "options" : {
      "index_directly" : 1,
      "cron_limit" : "50",
      "search_api_et" : { "include" : "incomplete", "fallback language" : "en" },
      "fields" : {
        "body:value" : { "type" : "text" },
        "changed" : { "type" : "date" },
        "created" : { "type" : "date" },
        "field_business_type" : { "type" : "integer", "entity_type" : "taxonomy_term" },
        "field_business_type:name_field" : { "type" : "text" },
        "field_facilities" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "taxonomy_term" },
        "field_facilities:name_field" : { "type" : "list\\u003Ctext\\u003E" },
        "field_location:lat" : { "type" : "decimal" },
        "field_location:latlon" : { "type" : "string", "real_type" : "location" },
        "field_location:lon" : { "type" : "decimal" },
        "field_opening_hours:day" : { "type" : "list\\u003Cinteger\\u003E" },
        "field_opening_hours:endhours" : { "type" : "list\\u003Cinteger\\u003E" },
        "field_opening_hours:starthours" : { "type" : "list\\u003Cinteger\\u003E" },
        "nid" : { "type" : "integer" },
        "search_api_language" : { "type" : "string" },
        "status" : { "type" : "integer" },
        "title_field" : { "type" : "text" }
      },
      "data_alter_callbacks" : {
        "search_api_alter_bundle_filter" : {
          "status" : 1,
          "weight" : "-10",
          "settings" : { "default" : "0", "bundles" : { "business" : "business" } }
        },
        "search_api_alter_node_access" : { "status" : 0, "weight" : "0", "settings" : [] },
        "search_api_alter_node_status" : { "status" : 0, "weight" : "0", "settings" : [] },
        "search_api_alter_language_control" : {
          "status" : 0,
          "weight" : "0",
          "settings" : { "lang_field" : "", "languages" : [] }
        },
        "search_api_alter_add_viewed_entity" : { "status" : 0, "weight" : "0", "settings" : { "mode" : "full" } },
        "search_api_alter_add_url" : { "status" : 0, "weight" : "0", "settings" : [] },
        "search_api_alter_add_aggregation" : { "status" : 0, "weight" : "0", "settings" : [] },
        "search_api_alter_add_hierarchy" : { "status" : 0, "weight" : "0", "settings" : { "fields" : [] } }
      },
      "processors" : {
        "search_api_et_remove_language" : { "status" : 0, "weight" : "0", "settings" : [] },
        "search_api_case_ignore" : {
          "status" : 0,
          "weight" : "0",
          "settings" : { "fields" : { "title_field" : true } }
        },
        "search_api_html_filter" : {
          "status" : 0,
          "weight" : "10",
          "settings" : {
            "fields" : { "title_field" : true },
            "title" : 0,
            "alt" : 1,
            "tags" : "h1 = 5\\r\\nh2 = 3\\r\\nh3 = 2\\r\\nstrong = 2\\r\\nb = 2\\r\\nem = 1.5\\r\\nu = 1.5"
          }
        },
        "search_api_tokenizer" : {
          "status" : 0,
          "weight" : "20",
          "settings" : {
            "fields" : { "title_field" : true },
            "spaces" : "[^[:alnum:]]",
            "ignorable" : "[\\u0027]"
          }
        },
        "search_api_stopwords" : {
          "status" : 0,
          "weight" : "30",
          "settings" : {
            "fields" : { "title_field" : true },
            "file" : "",
            "stopwords" : "but\\r\\ndid\\r\\nthe this that those\\r\\netc"
          }
        },
        "search_api_highlighting" : {
          "status" : 0,
          "weight" : "35",
          "settings" : {
            "prefix" : "\\u003Cstrong\\u003E",
            "suffix" : "\\u003C\\/strong\\u003E",
            "excerpt" : 1,
            "excerpt_length" : "256",
            "exclude_fields" : [],
            "highlight" : "always"
          }
        }
      }
    },
    "enabled" : "1",
    "read_only" : "0"
  }');
  return $items;
}
