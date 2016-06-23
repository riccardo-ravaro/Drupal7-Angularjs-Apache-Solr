<?php
/**
 * @file
 * urbinfo_news.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_pages().
 */
function urbinfo_news_default_page_manager_pages() {
  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'news';
  $page->task = 'page';
  $page->admin_title = 'Press';
  $page->admin_description = '';
  $page->path = 'about/press';
  $page->access = array(
    'type' => 'none',
    'settings' => NULL,
  );
  $page->menu = array();
  $page->arguments = array();
  $page->conf = array(
    'admin_paths' => FALSE,
  );
  $page->default_handlers = array();
  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'page_news_panel_context';
  $handler->task = 'page';
  $handler->subtask = 'news';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Panel',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
  );
  $display = new panels_display();
  $display->layout = 'onecol';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'middle' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = 'Press';
  $display->uuid = 'b10dd90c-cec0-4b44-894e-8e532ae53c44';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-9dbfb3b2-74e7-44c7-a635-bb8dae8ce1d4';
    $pane->panel = 'middle';
    $pane->type = 'views_panes';
    $pane->subtype = 'urbinfo_press_articles-panel_pane_1';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '9dbfb3b2-74e7-44c7-a635-bb8dae8ce1d4';
    $display->content['new-9dbfb3b2-74e7-44c7-a635-bb8dae8ce1d4'] = $pane;
    $display->panels['middle'][0] = 'new-9dbfb3b2-74e7-44c7-a635-bb8dae8ce1d4';
    $pane = new stdClass();
    $pane->pid = 'new-1102ca05-6646-4067-93e6-b13b483043cc';
    $pane->panel = 'middle';
    $pane->type = 'views_panes';
    $pane->subtype = 'urbinfo_press_releases-panel_pane_1';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '1102ca05-6646-4067-93e6-b13b483043cc';
    $display->content['new-1102ca05-6646-4067-93e6-b13b483043cc'] = $pane;
    $display->panels['middle'][1] = 'new-1102ca05-6646-4067-93e6-b13b483043cc';
    $pane = new stdClass();
    $pane->pid = 'new-e8d17d7d-537a-4fa6-9755-55bce5c1d44f';
    $pane->panel = 'middle';
    $pane->type = 'custom';
    $pane->subtype = 'custom';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'admin_title' => 'Press Inquiries',
      'title' => 'Press Inquiries',
      'body' => '<p>We are proud to make headlines. If you are a member of the media and would like to contact us, please email&nbsp;us at <a href="mailto:press@urbinfo.com">press@urbinfo.com</a>.</p>',
      'format' => 'full_html',
      'substitute' => TRUE,
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = 'e8d17d7d-537a-4fa6-9755-55bce5c1d44f';
    $display->content['new-e8d17d7d-537a-4fa6-9755-55bce5c1d44f'] = $pane;
    $display->panels['middle'][2] = 'new-e8d17d7d-537a-4fa6-9755-55bce5c1d44f';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-9dbfb3b2-74e7-44c7-a635-bb8dae8ce1d4';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['news'] = $page;

  return $pages;

}
