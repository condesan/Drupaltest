<?php
function eb_custom_slider_cck_export() {

$content['type']  = array (
  'name' => 'Featured Slider Entry',
  'type' => 'eb_custom_slider',
  'description' => 'Slider is a single content entry for the slider.',
  'title_label' => 'Title',
  'body_label' => 'Body',
  'min_word_count' => 0,
  'help' => '',
  'node_options' => 
  array (
    'status' => true,
    'promote' => true,
    'sticky' => false,
    'revision' => false,
  ),
  'language_content_type' => 0,
  'old_type' => 'eb_custom_slider',
  'orig_type' => 'eb_custom_slider',
  'module' => 'eb_custom_slider',
  'custom' => false,
  'modified' => false,
  'locked' => true,
  'reset' => 'Reset to defaults',
  'event_nodeapi' => 'never',
  'image_attach' => 0,
  'image_attach_size_teaser' => 'thumbnail',
  'image_attach_weight_teaser' => 0,
  'image_attach_size_body' => 'thumbnail',
  'image_attach_weight_body' => 0,
);
$content['fields']  = array (
  0 => 
  array (
    'label' => 'Video',
    'field_name' => 'field_video',
    'type' => 'emvideo',
    'widget_type' => 'emvideo_textfields',
    'change' => 'Change basic information',
    'weight' => '1',
    'providers' => 
    array (
      'archive' => true,
      'bliptv' => true,
      'dailymotion' => true,
      'google' => true,
      'guba' => true,
      'imeem' => true,
      'jumpcut' => true,
      'lastfm' => true,
      'livevideo' => true,
      'metacafe' => true,
      'myspace' => true,
      'revver' => true,
      'sevenload' => true,
      'spike' => true,
      'tudou' => true,
      'ustream' => true,
      'ustreamlive' => true,
      'veoh' => true,
      'vimeo' => true,
      'yahoomusic' => true,
      'youtube' => true,
      'zzz_custom_url' => true,
    ),
    'emimport' => 1,
    'emthumb_store_local_thumbnail' => true,
    'emthumb' => 0,
    'emthumb_label' => 'Video custom thumbnail',
    'emthumb_description' => 'If you upload a custom thumbnail, then this will be displayed when the Video thumbnail is called for, overriding any automatic thumbnails by custom providers.',
    'emthumb_max_resolution' => 0,
    'emimport_image_path' => '',
    'emthumb_custom_alt' => 0,
    'emthumb_custom_title' => 0,
    'video_width' => '425',
    'video_height' => '350',
    'video_autoplay' => '',
    'preview_width' => '425',
    'preview_height' => '350',
    'preview_autoplay' => '',
    'thumbnail_width' => '35',
    'thumbnail_height' => '35',
    'thumbnail_default_path' => '',
    'thumbnail_link_title' => 'See video',
    'description' => '',
    'default_value' => 
    array (
      0 => 
      array (
        'embed' => '',
        'value' => '',
        'emthumb' => 
        array (
          'emthumb' => 
          array (
            'emthumb' => '',
          ),
        ),
      ),
    ),
    'default_value_php' => '',
    'default_value_widget' => NULL,
    'field_video_upload' => '',
    'upload' => 'Upload',
    'group' => false,
    'required' => 0,
    'multiple' => '0',
    'op' => 'Save field settings',
    'module' => 'emvideo',
    'widget_module' => 'emvideo',
    'columns' => 
    array (
      'embed' => 
      array (
        'type' => 'text',
        'size' => 'big',
        'not null' => false,
        'sortable' => true,
      ),
      'value' => 
      array (
        'type' => 'varchar',
        'length' => 255,
        'not null' => false,
        'sortable' => true,
      ),
      'provider' => 
      array (
        'type' => 'varchar',
        'length' => 255,
        'not null' => false,
        'sortable' => true,
      ),
      'data' => 
      array (
        'type' => 'text',
        'size' => 'big',
        'not null' => false,
        'sortable' => false,
      ),
    ),
    'display_settings' => 
    array (
      'label' => 
      array (
        'format' => 'above',
        'exclude' => 0,
      ),
      'teaser' => 
      array (
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => 
      array (
        'format' => 'default',
        'exclude' => 0,
      ),
      4 => 
      array (
        'format' => 'default',
        'exclude' => 0,
      ),
      2 => 
      array (
        'format' => 'default',
        'exclude' => 0,
      ),
      3 => 
      array (
        'format' => 'default',
        'exclude' => 0,
      ),
      'token' => 
      array (
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
  ),
);
$content['extra']  = array (
  'title' => '-5',
  'body_field' => '0',
  'menu' => '-2',
);

return $content;
}

