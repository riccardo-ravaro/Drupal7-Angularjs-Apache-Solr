<?php

/**
 * @file
 * Business search results template.
 */
?>
<div class="<?php print $classes; ?>" ng-controller="SearchResults" ng-include="'search/views/results.html'">
  <section class="search-results__main">

    <?php if ($rows): ?>
      <div results-list class="search-results__list">
        <?php print $rows; ?>
      </div><!-- /.search-results__list -->
    <?php elseif ($empty): ?>
      <div class="search-results__header" ng-cloak>
        <div class="search-results__summary" ng-hide="search.loading">
          <?php print t('No results for !query near !location', array(
            '!query' => '<span class="search-results__summary-placeholder">{{search.params.query}}</span>',
            '!location' => '<span class="search-results__summary-placeholder">{{search.params.locationText}}</span>',
          ));
          ?>
        </div><!-- /.search-results__summary -->
      </div><!-- /.search-results__header -->
    <?php endif; ?>

    <?php if ($pager): ?>
      <?php print $pager; ?>
    <?php endif; ?>

  </section><!-- /.search-results__main -->
</div><!-- .search-results -->
