<?php

/**
 * @file
 * Main view template.
 *
 * Variables available:
 * - $classes_array: An array of classes determined in
 *   template_preprocess_views_view(). Default classes are:
 *     .view
 *     .view-[css_name]
 *     .view-id-[view_name]
 *     .view-display-id-[display_name]
 *     .view-dom-id-[dom_id]
 * - $classes: A string version of $classes_array for use in the class attribute
 * - $css_name: A css-safe version of the view name.
 * - $css_class: The user-specified classes names, if any
 * - $header: The view header
 * - $footer: The view footer
 * - $rows: The results of the view query, if any
 * - $empty: The empty text to display if the view is empty
 * - $pager: The pager next/prev links to display, if any
 * - $exposed: Exposed widget form/info to display
 * - $feed_icon: Feed icon to display, if any
 * - $more: A link to view more, if any
 *
 * @ingroup views_templates
 */
?>
<ul class="menu nav navbar-nav">
  <?php if ($rows): ?>
    <li class="dropdown">
      <a href="#" data-target="#" class="dropdown-toggle" data-toggle="dropdown" data-disabled="true">
        <span class="glyphicon glyphicon-briefcase"></span>&nbsp;
        <?php print t('Your businesses'); ?>
        <span class="caret"></span>
      </a>
      <ul class="dropdown-menu">
        <?php print $rows; ?>
        <?php if ($more): ?>
          <li><?php print $more; ?></li>
        <?php endif; ?>
        <li class="divider"></li>
        <li><?php print l('<span class="glyphicon glyphicon-plus"></span> ' . check_plain(t('List a new business')), 'node/add/business', array('html' => TRUE)); ?></li>
      </ul>
    </li>
  <?php else: ?>
    <li><?php
      $attributes = array();
      if (user_is_anonymous()) {
        $attributes['class'] = array('requires-auth');
      }
      print l('<span class="glyphicon glyphicon-briefcase"></span>&nbsp; ' . check_plain(t('List your business')), 'node/add/business', array(
        'html' => TRUE,
        'attributes' => $attributes,
      )); ?></li>
  <?php endif; ?>
</ul>
