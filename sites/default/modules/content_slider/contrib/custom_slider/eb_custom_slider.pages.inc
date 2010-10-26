<?php

/**
 * @file
 * Page callback file for the Slider module.
 */

/**
 * Menu callback; displays a Drupal page containing recent blog entries of a given user.
 */
function eb_custom_slider_page_user($account) {
  global $user;

  drupal_set_title($title = t("@name's slider", array('@name' => $account->name)));

  $items = array();

  if (($account->uid == $user->uid) && user_access('create blog entries')) {
    $items[] = l(t('Post new Slider entry.'), "node/add/slider");
  }
  else if ($account->uid == $user->uid) {
    $items[] = t('You are not allowed to post a new slider entry.');
  }

  $output = theme('item_list', $items);

  $result = pager_query(db_rewrite_sql("SELECT n.nid, n.sticky, n.created FROM {node} n WHERE n.type = 'eb_custom_slider' AND n.uid = %d AND n.status = 1 ORDER BY n.sticky DESC, n.created DESC"), variable_get('default_nodes_main', 10), 0, NULL, $account->uid);
  $has_posts = FALSE;
  
  while ($node = db_fetch_object($result)) {
    $output .= node_view(node_load($node->nid), 1);
    $has_posts = TRUE;
  }
  
  if ($has_posts) {
    $output .= theme('pager', NULL, variable_get('default_nodes_main', 10));
  }
  else {
    if ($account->uid == $user->uid) {
      drupal_set_message(t('You have not created any slider entries.'));
    }
    else {
      drupal_set_message(t('!author has not created any slider entries.', array('!author' => theme('username', $account))));
    }
  }
  drupal_add_feed(url('slider/'. $account->uid .'/feed'), t('RSS - !title', array('!title' => $title)));

  return $output;
}

/**
 * Menu callback; displays a Drupal page containing recent blog entries of all users.
 */
function eb_custom_slider_page_last() {
  global $user;

  $output = '';
  $items = array();

  if (user_access('edit own slider')) {
    $items[] = l(t('Create new slider entry.'), "node/add/slider");
  }

  $output = theme('item_list', $items);

  $result = pager_query(db_rewrite_sql("SELECT n.nid, n.created FROM {node} n WHERE n.type = 'eb_custom_slider' AND n.status = 1 ORDER BY n.sticky DESC, n.created DESC"), variable_get('default_nodes_main', 10));
  $has_posts = FALSE;

  while ($node = db_fetch_object($result)) {
    $output .= node_view(node_load($node->nid), 1);
    $has_posts = TRUE;
  }
  
  if ($has_posts) {
    $output .= theme('pager', NULL, variable_get('default_nodes_main', 10));
  }
  else {
    drupal_set_message(t('No slider entries have been created.'));
  }
  drupal_add_feed(url('slider/feed'), t('RSS -Slder'));

  return $output;
}

/**
 * Menu callback; displays an RSS feed containing recent blog entries of a given user.
 */
function eb_custom_slider_feed_user($account) {
  $result = db_query_range(db_rewrite_sql("SELECT n.nid, n.created FROM {node} n  WHERE n.type = 'eb_custom_slider' AND n.uid = %d AND n.status = 1 ORDER BY n.created DESC"), $account->uid, 0, variable_get('feed_default_items', 10));
  $channel['title'] = $account->name ."'s slider";
  $channel['link'] = url('blog/'. $account->uid, array('absolute' => TRUE));

  $items = array();
  while ($row = db_fetch_object($result)) {
    $items[] = $row->nid;
  }
  node_feed($items, $channel);
}

/**
 * Menu callback; displays an RSS feed containing recent blog entries of all users.
 */
function eb_custom_slider_feed_last() {
  $result = db_query_range(db_rewrite_sql("SELECT n.nid, n.created FROM {node} n WHERE n.type = 'eb_custom_slider' AND n.status = 1 ORDER BY n.created DESC"), 0, variable_get('feed_default_items', 10));
  $channel['title'] = variable_get('site_name', 'Drupal') .' slider';
  $channel['link'] = url('slider', array('absolute' => TRUE));

  $items = array();
  while ($row = db_fetch_object($result)) {
    $items[] = $row->nid;
  }

  node_feed($items, $channel);
}
