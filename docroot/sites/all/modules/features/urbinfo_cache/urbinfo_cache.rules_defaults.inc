<?php
/**
 * @file
 * urbinfo_cache.rules_defaults.inc
 */

/**
 * Implements hook_default_rules_configuration().
 */
function urbinfo_cache_default_rules_configuration() {
  $items = array();
  $items['rules_expire_news_content'] = entity_import('rules_config', '{ "rules_expire_news_content" : {
      "LABEL" : "Expire news content",
      "PLUGIN" : "reaction rule",
      "OWNER" : "rules",
      "TAGS" : [ "expire" ],
      "REQUIRES" : [ "rules", "expire" ],
      "ON" : { "node_insert" : [], "node_delete" : [], "node_update" : [] },
      "IF" : [
        { "node_is_of_type" : {
            "node" : [ "node" ],
            "type" : { "value" : { "press_article" : "press_article", "press_release" : "press_release" } }
          }
        }
      ],
      "DO" : [ { "expire_rules_action_flush_url" : { "urls" : "about\\/press " } } ]
    }
  }');
  $items['rules_expire_node'] = entity_import('rules_config', '{ "rules_expire_node" : {
      "LABEL" : "Expire node",
      "PLUGIN" : "reaction rule",
      "OWNER" : "rules",
      "TAGS" : [ "expire" ],
      "REQUIRES" : [ "rules", "expire" ],
      "ON" : { "node_update--business" : { "bundle" : "business" } },
      "DO" : [ { "expire_rules_action_flush_url" : { "urls" : "[node:url] " } } ]
    }
  }');
  $items['rules_expire_special'] = entity_import('rules_config', '{ "rules_expire_special" : {
      "LABEL" : "Expire special",
      "PLUGIN" : "reaction rule",
      "OWNER" : "rules",
      "TAGS" : [ "expire" ],
      "REQUIRES" : [ "rules", "expire" ],
      "ON" : { "node_delete" : [], "node_insert" : [], "node_update" : [] },
      "IF" : [
        { "node_is_of_type" : {
            "node" : [ "node" ],
            "type" : { "value" : { "promotion" : "promotion" } }
          }
        }
      ],
      "DO" : [
        { "expire_rules_action_flush_url" : { "urls" : "[node:og_group_ref:url] " } }
      ]
    }
  }');
  $items['rules_expire_team_content'] = entity_import('rules_config', '{ "rules_expire_team_content" : {
      "LABEL" : "Expire team content",
      "PLUGIN" : "reaction rule",
      "OWNER" : "rules",
      "TAGS" : [ "expire" ],
      "REQUIRES" : [ "rules", "expire" ],
      "ON" : { "node_insert" : [], "node_delete" : [], "node_update" : [] },
      "IF" : [
        { "node_is_of_type" : {
            "node" : [ "node" ],
            "type" : { "value" : { "employee" : "employee" } }
          }
        }
      ],
      "DO" : [ { "expire_rules_action_flush_url" : { "urls" : "about\\/our-team " } } ]
    }
  }');
  return $items;
}
