<?php
/**
 * @file
 * urbinfo_home.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_pages().
 */
function urbinfo_home_default_page_manager_pages() {
  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'home';
  $page->task = 'page';
  $page->admin_title = 'Urbinfo – find local businesses';
  $page->admin_description = 'Home page';
  $page->path = 'home';
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
  $handler->name = 'page_home_panel_context';
  $handler->task = 'page';
  $handler->subtask = 'home';
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
  $display->layout = 'flexible';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'center' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = 'Urbinfo';
  $display->uuid = 'c8080398-baf3-426c-985a-11f96e87f931';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-431abc19-c56b-4c69-9da7-8e1a0a12d46a';
    $pane->panel = 'center';
    $pane->type = 'block';
    $pane->subtype = 'views-fba5238eaa5b9456a35156b4c4f90b51';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'inherit_path' => 0,
      'override_title' => 1,
      'override_title_text' => 'What are you looking for?',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '431abc19-c56b-4c69-9da7-8e1a0a12d46a';
    $display->content['new-431abc19-c56b-4c69-9da7-8e1a0a12d46a'] = $pane;
    $display->panels['center'][0] = 'new-431abc19-c56b-4c69-9da7-8e1a0a12d46a';
    $pane = new stdClass();
    $pane->pid = 'new-a52768bd-a0e1-4c24-a6f5-3064cbfa4f0d';
    $pane->panel = 'center';
    $pane->type = 'custom';
    $pane->subtype = 'custom';
    $pane->shown = FALSE;
    $pane->access = array();
    $pane->configuration = array(
      'admin_title' => '',
      'title' => '',
      'body' => '',
      'format' => 'full_html',
      'substitute' => TRUE,
      'name' => 'add_business_btn',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = 'a52768bd-a0e1-4c24-a6f5-3064cbfa4f0d';
    $display->content['new-a52768bd-a0e1-4c24-a6f5-3064cbfa4f0d'] = $pane;
    $display->panels['center'][1] = 'new-a52768bd-a0e1-4c24-a6f5-3064cbfa4f0d';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-431abc19-c56b-4c69-9da7-8e1a0a12d46a';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['home'] = $page;

  return $pages;

}
