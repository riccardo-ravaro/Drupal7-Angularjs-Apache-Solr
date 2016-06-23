<?php
/**
 * @file
 * Default theme implementation to display a single Drupal page.
 *
 * The doctype, html, head and body tags are not in this template. Instead they
 * can be found in the html.tpl.php template in this directory.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['header']: Items for the header region.
 * - $page['footer']: Items for the footer region.
 *
 * @see bootstrap_preprocess_page()
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see bootstrap_process_page()
 * @see template_process()
 * @see html.tpl.php
 *
 * @ingroup themeable
 */
global $user;
?>
<div class="page" ng-app="urbinfo">
  <header id="navbar" role="banner" class="<?php print $navbar_classes; ?>">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#header-navigation">
          <span class="sr-only"><?php print t('Toggle navigation'); ?></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>

        <?php if (!empty($page['navigation'])): ?>
          <button type="button" class="navbar-toggle navbar-toggle-left" data-toggle="collapse" data-target="#header-search">
            <span class="sr-only"><?php print t('Toggle search'); ?></span>
            <span class="glyphicon glyphicon-search"></span>
          </button>
        <?php endif; ?>

        <?php if ($logo): ?>
        <a class="navbar-brand" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>">
          <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" width="150" height="22" />
        </a>
        <?php endif; ?>

        <?php if (!empty($site_name)): ?>
        <a class="name navbar-brand" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>"><?php print $site_name; ?></a>
        <?php endif; ?>
      </div>

      <?php if (!empty($page['navigation'])): ?>
        <div class="navbar-collapse collapse navbar-left" id="header-search">
          <?php print render($page['navigation']); ?>
        </div>
      <?php endif; ?>

      <?php if (!empty($primary_nav) || !empty($secondary_nav)): ?>
        <div class="navbar-collapse collapse" id="header-navigation">
          <nav role="navigation" class="navbar-right">
            <!-- Primary nav (main menu) -->
            <?php if (!empty($primary_nav)): ?>
              <?php print render($primary_nav); ?>
            <?php endif; ?>
            <!-- User businesses -->
            <?php print views_embed_view('urbinfo_user_businesses', 'menu'); ?>
            <!-- Seconary nav (user menu) -->
            <?php if (!empty($secondary_nav)): ?>
              <?php print render($secondary_nav); ?>
            <?php endif; ?>
          </nav>
        </div>
      <?php endif; ?>
    </div>
  </header>

  <!-- Modal -->
  <div class="login-modal modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="login-modal-label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content" ng-controller="loginSignupForm">
        <!--<div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only"><?php /*print t('Close'); */?></span></button>
          <h4 class="modal-title" id="login-modal-label"><?php /*print t('Login / register'); */?></h4>
        </div>-->
        <div class="modal-body">

          <div ng-show="mode == 'signup'">
            <?php
              $block = module_invoke('urbinfo_users', 'block_view', 'urbinfo_users_connector_register');
              print render($block['content']);
            ?>
          </div>

          <div ng-show="mode == 'login'">
            <?php
              $block = module_invoke('urbinfo_users', 'block_view', 'urbinfo_users_connector_login');
              print render($block['content']);
            ?>
          </div>

          <div ng-show="mode == 'login'" ng-include="'login/views/login-form.html'"></div>
          <div ng-show="mode == 'signup'" ng-include="'login/views/signup-form.html'"></div>
        </div>
        <div class="modal-footer">
          <div class="login__register" ng-show="mode == 'login'"><?php print t('Don’t have an account? <a ng-click="switchMode(\'signup\')" href="!url" prevent-default>Register</a>', array('!url' => url('user/register'))); ?></div>
          <div class="login__register" ng-show="mode == 'signup'"><?php print t('Do you have an account already? <a ng-click="switchMode(\'login\')" href="!url" prevent-default>Login</a>', array('!url' => url('user/login'))); ?></div>
        </div>
      </div>
    </div>
  </div>

  <div class="main-container container-fluid">

    <?php if (!empty($page['highlighted'])): ?>
      <div class="highlighted jumbotron"><?php print render($page['highlighted']); ?></div>
    <?php endif; ?>
    <?php if (!empty($breadcrumb)): print $breadcrumb; endif;?>
    <a id="main-content"></a>


    <?php print render($title_prefix); ?>

    <?php if (!empty($header_image)): ?>
      <div class="page-header-image">
        <?php print $header_image; ?>
        <h1 class="page-header-image__title"><?php print $header_title; ?></h1>
      </div>
    <?php else: ?>
      <?php if (!empty($title)): ?>
        <h1 class="page-header"><?php print $title; ?></h1>
      <?php endif; ?>
    <?php endif; ?>

    <?php print render($title_suffix); ?>

    <div class="row">

      <?php if (!empty($page['sidebar_first'])): ?>
        <aside class="col-sm-3 col-md-2" role="complementary">
          <?php print render($page['sidebar_first']); ?>
        </aside>  <!-- /#sidebar-first -->
      <?php endif; ?>

      <section<?php print $content_column_class; ?>>
        <?php print $messages; ?>
        <?php if (!empty($tabs)): ?>
          <?php print render($tabs); ?>
        <?php endif; ?>
        <?php if (!empty($page['help'])): ?>
          <?php print render($page['help']); ?>
        <?php endif; ?>
        <?php if (!empty($action_links)): ?>
          <ul class="action-links"><?php print render($action_links); ?></ul>
        <?php endif; ?>
        <?php print render($page['content']); ?>
      </section>

      <?php if (!empty($page['sidebar_second'])): ?>
        <aside class="col-sm-3 col-md-2" role="complementary">
          <?php print render($page['sidebar_second']); ?>
        </aside>  <!-- /#sidebar-second -->
      <?php endif; ?>

    </div>
  </div>
  <footer class="footer">
    <div class="footer__top hidden-print">
      <div class="container-fluid">
        <div class="row">
          <div class="footer__col col-md-3 col-sm-4">
            <?php print render($page['footer_first']); ?>
          </div>
          <div class="footer__col col-md-3 col-sm-4">
            <?php print render($page['footer_second']); ?>
          </div>
          <div class="footer__col col-md-4 col-md-offset-2  col-sm-4">
            <?php print render($page['footer_third']); ?>
          </div>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container-fluid">
        <div class="footer__copyright">
          <?php print t('© !year Urbinfo, Inc. All Rights Reserved.', array('!year' => date('Y'))); ?>
        </div>

        <div class="footer__language hidden-print">
          <?php print render($page['footer_bottom']); ?>
        </div>

        <div class="footer__social hidden-print">
          <ul>
            <li>
              <a href="https://www.facebook.com/urbinfo" target="_blank">
                <span class="icon icon-facebook"></span><span class="sr-only"><?php print t('Facebook'); ?></span>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/urbinfo" target="_blank">
                <span class="icon icon-twitter"></span><span class="sr-only"><?php print t('Twitter'); ?></span>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/urbinfo" target="_blank">
                <span class="icon icon-linkedin"></span><span class="sr-only"><?php print t('LinkedIn'); ?></span>
              </a>
            </li>
            <li>
              <a href="http://vimeo.com/urbinfo" target="_blank">
                <span class="icon icon-vimeo"></span><span class="sr-only"><?php print t('Vimeo'); ?></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</div>
