<?php
/**
 * @file
 * urbinfo_footer.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function urbinfo_footer_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'urbinfo_footer_text';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Urbinfo footer text';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'time';
  $handler->display->display_options['cache']['results_lifespan'] = '3600';
  $handler->display->display_options['cache']['results_lifespan_custom'] = '0';
  $handler->display->display_options['cache']['output_lifespan'] = '3600';
  $handler->display->display_options['cache']['output_lifespan_custom'] = '0';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '1';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['links'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: UI Text placement (field_ui_text_placement) */
  $handler->display->display_options['filters']['field_ui_text_placement_tid']['id'] = 'field_ui_text_placement_tid';
  $handler->display->display_options['filters']['field_ui_text_placement_tid']['table'] = 'field_data_field_ui_text_placement';
  $handler->display->display_options['filters']['field_ui_text_placement_tid']['field'] = 'field_ui_text_placement_tid';
  $handler->display->display_options['filters']['field_ui_text_placement_tid']['value'] = array(
    24 => '24',
  );
  $handler->display->display_options['filters']['field_ui_text_placement_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_ui_text_placement_tid']['vocabulary'] = 'ui_text_placement';

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $translatables['urbinfo_footer_text'] = array(
    t('Master'),
    t('more'),
    t('Apply'),
    t('Reset'),
    t('Sort by'),
    t('Asc'),
    t('Desc'),
    t('Block'),
  );
  $export['urbinfo_footer_text'] = $view;

  return $export;
}
