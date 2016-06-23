core = 7.x
api = 2

defaults[projects][subdir] = "contrib"

projects[drupal][version] = "7.32"
projects[drupal][patch][] = "https://www.drupal.org/files/issues/user-reg-page-title-1973262-11b.patch"
projects[drupal][patch][] = "https://www.drupal.org/files/issues/image.module-drupal-7.27.patch"

projects[entity][type] = "module"
projects[entity][version] = "1.5"
projects[entity][patch][] = "https://www.drupal.org/files/issues/entity-apply_langcode-2335885-1.patch"

projects[search_api_et][type] = "module"
projects[search_api_et][download][type] = "git"
projects[search_api_et][download][url] = "http://git.drupal.org/project/search_api_et.git"
projects[search_api_et][revision] = "cc1924f"
;projects[search_api_et][patch][] = "https://www.drupal.org/files/issues/search_api_et-avoid_entity_load-2335405-1.patch"

projects[search_api_et_solr][type] = "module"
projects[search_api_et_solr][download][type] = "git"
projects[search_api_et_solr][download][url] = "http://git.drupal.org/project/search_api_et_solr.git"
projects[search_api_et_solr][revision] = "f096388"
projects[search_api_et_solr][patch][] = "https://www.drupal.org/files/issues/search_api_et_solr-translate_nested_fields-2335435-1_0.patch"
projects[search_api_et_solr][patch][] = "https://www.drupal.org/files/issues/search_api_et_solr-group_to_prevent_duplicates-2336757-7.patch"

projects[views][version] = "3.8"
projects[views][patch][] = "https://www.drupal.org/files/issues/views-handle_negative_floats-2332743-5.patch"

;projects[connector][type] = "module"
;projects[connector][download][type] = "git"
;projects[connector][download][url] = "http://git.drupal.org/project/connector.git"
;projects[connector][revision] = "e4bbe32"
;projects[connector][patch][] = "https://www.drupal.org/files/issues/fix_map-1503258-13.patch"
;projects[connector][patch][] = "https://www.drupal.org/files/undefined-function-user_profile_form_validate.patch"
