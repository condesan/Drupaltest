<?php

$image_path = variable_get("node-imagepath-".$node->nid, '');
$nodeurl = variable_get("node-url-".$node->nid, '');

if($node->field_video[0]['embed']){

  $myimagedata = $node->field_video['0']['data']['thumbnail']['url'];

  $myimage = $node->content['field_video']['#children'];

  $node_body = $node->content['body']['#value'];

} else if ($image_path) {
  $myimage = "<a target = '_blank' href = '$nodeurl'>".theme('imagecache','eb_custom_slider_main',$image_path)."</a>";
  $node_body = $node->body;
}else {
  $myimage = theme('imagecache', 'eb_custom_slider_main',  drupal_get_path('module', 'eb_custom_slider').'/warning.jpg');
  $node_body = $node->body;
}

echo '<div class="contentdiv">';
echo "<div class='slider_title'>"; 
echo "<h2>".$node->title."</h2>";
echo "<div class='s-body'>".$node_body."</div>";
echo "</div>";

echo "<div class='sliderwrapper'>";
echo "<div class='slider_image'>";
echo $myimage;
echo "</div>";

echo "</div>";   
echo '</div>';



?>

