<?php

/**
 * @file
 * Default theme implementation to display a node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: An array of node items. Use render($content) to print them all,
 *   or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $user_picture: The node author's picture from user-picture.tpl.php.
 * - $date: Formatted creation date. Preprocess functions can reformat it by
 *   calling format_date() with the desired parameters on the $created variable.
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct URL of the current node.
 * - $display_submitted: Whether submission information should be displayed.
 * - $submitted: Submission information created from $name and $date during
 *   template_preprocess_node().
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - node: The current template type; for example, "theming hook".
 *   - node-[type]: The current node type. For example, if the node is a
 *     "Blog entry" it would result in "node-blog". Note that the machine
 *     name will often be in a short form of the human readable label.
 *   - node-teaser: Nodes in teaser form.
 *   - node-preview: Nodes in preview mode.
 *   The following are controlled through the node publishing options.
 *   - node-promoted: Nodes promoted to the front page.
 *   - node-sticky: Nodes ordered above other non-sticky nodes in teaser
 *     listings.
 *   - node-unpublished: Unpublished nodes visible only to administrators.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type; for example, story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $view_mode: View mode; for example, "full", "teaser".
 * - $teaser: Flag for the teaser state (shortcut for $view_mode == 'teaser').
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * Field variables: for each field instance attached to the node a corresponding
 * variable is defined; for example, $node->body becomes $body. When needing to
 * access a field's raw values, developers/themers are strongly encouraged to
 * use these variables. Otherwise they will have to explicitly specify the
 * desired field language; for example, $node->body['en'], thus overriding any
 * language negotiation rule that was previously applied.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see template_process()
 *
 * @ingroup themeable
 */
?>
<?php if ($view_mode == 'full'): ?>
  <div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>"<?php print $attributes; ?> ng-include="'business/views/business.html'" ng-controller="BusinessProfile">
    <div class="row">
      <!-- Cover image -->
      <div class="business__cover-image editable-image">
        <?php print render($content['field_cover_image']); ?>
      </div><!-- /.business__cover-image -->
    </div><!-- /.row -->

    <div class="row">
      <div class="business__top clearfix">

        <div class="col-sm-7 col-md-6">
          <div class="business__section business__section--details">
            <div class="row">
              <div class="col-sm-5 col-md-4">
                <!-- Logo -->
                <div class="business__logo">
                  <?php print render($content['field_logo']); ?>
                </div><!-- /.business__logo -->
              </div><!-- /.col -->

              <div class="col-sm-7 col-md-8">
                <div class="business__details-text">
                  <!-- Title -->
                  <h1 class="business__name"><?php print $title_field[0]['safe_value']; ?></h1>
                  <!-- Business Type -->
                  <div class="business__category">
                    <?php print render($content['field_business_type']); ?>
                  </div>
                  <!-- Address -->
                  <div class="business__address">
                    <span class="business__thoroughfare">
                      <span dir="auto">
                        <?php print check_plain($field_address[0]['thoroughfare']); ?>
                      </span>,
                    </span>
                    <?php if (!empty($field_address[0]['premise'])): ?>
                      <span class="business__premise">
                        <span dir="auto">
                          <?php print check_plain($field_address[0]['premise']); ?>
                        </span>,
                      </span>
                    <?php endif; ?>
                    <?php if (!empty($field_address[0]['locality'])): ?>
                      <span class="business__locality">
                        <span dir="auto">
                          <?php print check_plain($field_address[0]['locality']); ?>
                        </span>,
                      </span>
                    <?php endif; ?>
                    <span class="business__country">
                      <span>
                        <?php print check_plain($countries[$field_address[0]['country']]); ?>
                      </span>,
                    </span>
                    <span class="business__postal_code">
                      <span dir="auto">
                        <?php print check_plain($field_address[0]['postal_code']); ?>
                      </span>
                    </span>
                  </div>
                  <!-- Opening hours -->
                  <div class="business__open">
                    <?php if ($open_today): ?>
                      <b><?php print t('Open today:'); ?></b> <?php print $open_today; ?>
                    <?php else: ?>
                      <?php print t('Closed today'); ?>
                    <?php endif; ?>
                  </div><!-- /.business__open -->

                </div><!-- /.business__details-text -->

              </div><!-- /.col -->
            </div><!-- /.row -->

          </div><!-- /.business__section--details -->

          <div class="business__section business__section--info">
            <ul class="business__info-list">
              <!-- Phone -->
              <?php if (!empty($field_email)): ?>
                <li class="business__info-item">
                  <span class="business__info-icon"><span class="icon icon-phone"></span></span>
                  <span class="business__info-text">
                    <?php print render($content['field_telephone']); ?>
                  </span>
                </li>
              <?php endif; ?>
              <!-- Email -->
              <?php if (!empty($field_email)): ?>
                <li class="business__info-item">
                  <span class="business__info-icon"><span class="icon icon-envelope"></span></span>
                  <span class="business__info-text">
                    <?php $email = check_plain($field_email[0]['email']); ?>
                    <a href="mailto:<?php print check_plain($field_email[0]['email']); ?>">
                      <?php print $email; ?>
                    </a>
                  </span>
                </li>
                <!-- Send message -->
                <li class="business__info-item">
                  <span class="business__info-icon"><span class="icon icon-chat"></span></span>
                  <span class="business__info-text"><?php print l(t('Send a message'), 'email/node/' . $node->nid . '/field_email'); ?></span>
                </li>
              <?php endif; ?>
              <!-- Menu download -->
              <?php if (!empty($field_menu[0])): ?>
                <li class="business__info-item">
                  <span class="business__info-icon"><span class="icon icon-download"></span></span>
                  <span class="business__info-text">
                    <a href="<?php print $field_menu[0]['url']; ?>">
                      <?php print t('Download menu'); ?>
                    </a>
                  </span>
                </li>
              <?php endif; ?>
              <!-- Average price -->
              <?php if (!empty($field_average_price)): ?>
                <li class="business__info-item">
                  <span class="business__info-icon">£</span>
                  <span class="business__info-text">
                    <?php print t('Average price: !amount', array(
                      '!amount' => (empty($field_average_price) ? '' : '£' . number_format($field_average_price[0]['value'], 2)),
                    )); ?>
                  </span>
                </li>
              <?php endif; ?>
              <!-- Facilities -->
              <!-- todo -->

            </ul><!-- /.business__info-list -->
          </div><!-- /.business__section--info -->

          <div class="business__section business__section--description">
            <!-- Description (body) -->
            <div class="business__description">
              <?php print render($content['body']); ?>
            </div><!-- /.business__description -->
          </div><!-- /.business__section--description -->
        </div><!-- /.col -->

        <div class="col-sm-5 col-md-6">
          <div class="business__section business__section--map">
            <div class="business__map"></div>
          </div>
        </div><!-- /.col -->

      </div><!-- /.business__top -->
    </div><!-- /.row -->

    <div class="row">
      <div class="business__main clearfix">
        <div class="col-sm-3">
          <section class="business__section business__section--specials">
            <h2 class="business__section-title"><?php print t('Specials'); ?></h2>
            <div class="specials-list">
              <?php print render($content['business_promotions_entity_view_1']); ?>
            </div>
          </section><!-- /.business__section--specials -->
        </div><!-- /.col -->

        <div class="col-sm-8">
          <section class="business__section business__section--gallery">
            <h2 class="business__section-title"><?php print t('Gallery'); ?></h2>
            <div class="gallery">
              <?php if (!empty($content['field_gallery'])): ?>
                <ul class="gallery__thumbs">
                  <?php foreach (element_children($content['field_gallery']) as $key): ?>
                    <li class="gallery__thumb">
                      <?php print render($content['field_gallery'][$key]); ?>
                    </li>
                  <?php endforeach; ?>
                </ul>
              <?php endif; ?>
            </div>
          </section><!-- /.business__section--gallery -->
        </div><!-- /.col -->
      </div><!-- /.business__main -->
    </div><!-- /.row -->

    <div class="row">
      <div class="business__bottom clearfix">
        <div class="col-sm-12">
          <section class="business__section business__section--team">
            <h2 class="business__section-title"><?php print t('Our team'); ?></h2>
            <div class="business__team" team>
              <?php foreach (element_children($content['field_team']) as $key): ?>
                <div class="col-md-2 col-sm-4 col-xs-6">
                  <div class="team-member">
                    <?php print render($content['field_team'][$key]); ?>
                  </div>
                </div>
              <?php endforeach; ?>
            </div><!-- /.business__team -->
          </section><!-- /.business__section--team -->
        </div><!-- /.col -->
      </div><!-- /.business__bottom -->
    </div><!-- /.row -->

  </div><!-- /.business -->

<?php else: ?>
  <div id="node-<?php print $node->nid; ?>" class="business <?php print $classes; ?>"<?php print $attributes; ?>>

    <?php print render($title_prefix); ?>
    <?php if (!$page): ?>
      <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
    <?php endif; ?>
    <?php print render($title_suffix); ?>

    <div class="content"<?php print $content_attributes; ?>>
      <?php
        // We hide the comments and links now so that we can render them later.
        hide($content['comments']);
        hide($content['links']);
        print render($content);
      ?>
    </div>

  </div><!-- /.node -->

<?php endif; ?>
