<?php
// $Id: ddblock-cycle-block-content.tpl.php,v 1.4.2.5 2010/03/23 02:53:24 ppblaauw Exp $ 

/**
 * @file
 * Default theme implementation to display a dynamic display blocks from a dynamic display block instance.
 *
 * Available variables:
 * - $settings['origin: Original module of the block.
 * - $settings['delta: Block number of the block.
 * - $settings['pager: Pager type to add the dynamic display block.
 * - $settings['pager_height: Pager container height.
 * - $settings['pager_width: Pager container width.
 * - $settings['imgcache_pager_item: Image cache preset name for the pager item.
 * - $ddblock_content: themed content.
 */
$settings = $ddblock_slider_settings;
?>
<!-- block content. -->
<div id="ddblock-<?php print $settings['delta']; ?>" class="ddblock-contents clear-block" >
 <div class="ddblock-content clear-block">
  <?php if ($ddblock_content): ?>
   <?php if (($settings['pager'] == 'number-pager')): ?>
    <!-- number pager. -->
    <div id="ddblock-<?php print $settings['pager'] ."-". $settings['delta'] ?>" class="ddblock-<?php print $settings['pager'] ?> ddblock-pager clear-block" style="height: <?php print $settings['pager_height'] ?>px; width:<?php print $settings['pager_width'] ?>px;">
     <?php $item_counter=1; ?>
     <ul>
      <?php if ($settings['pager2'] == 1 && $settings['pager2_position']['pager'] === 'pager'): ?>
       <li class="number-pager-prev pager-prev">
        <a class="prev" href="#"><?php print $settings['pager_prev']?></a>
       </li>
      <?php endif; ?> 
      <?php foreach ($ddblock_content as $item): ?>
       <li class="number-pager-item">
        <a href="#" class="pager-link" title="click to navigate to topic">
         <?php print $item_counter; ?>
        </a>
       </li>
       <?php $item_counter++;?>
      <?php endforeach; ?>
      <?php if ($settings['pager2'] == 1 && $settings['pager2_position']['pager'] === 'pager'): ?>
       <li class="number-pager-next pager-next">
        <a class="next" href="#"><?php print $settings['pager_next']?></a>
       </li>
      <?php endif; ?> 
     </ul>
    </div>
   <?php endif; ?>  

   <?php if (($settings['pager'] == 'image-pager')): ?>
    <!-- image pager. -->
    <div id="ddblock-<?php print $settings['pager'] ."-". $settings['delta'] ?>" class="ddblock-<?php print $settings['pager'] ?> ddblock-pager clear-block" style="height: <?php print $settings['pager_height'] ?>px; width:<?php print $settings['pager_width'] ?>px;">
     <?php if (($settings['pager2'] == 1)): ?>
      <ul>
	   <li>
        <a class="prev" href="#"><?php print $settings['pager2_pager_prev']?></a>
       </li>
       <li>
        <a class="next" href="#"><?php print $settings['pager2_pager_next']?></a>
       </li>
	  </ul>  
     <?php endif; ?> 
     <ul>
      <?php if($settings['imgcache_pager_item'] != '<none>'):?>
       <?php foreach ($ddblock_content as $image_file): ?>
        <li class="image-pager-item">
         <a href="#" class="pager-link" title="click to navigate to topic">
          <?php print theme('imagecache', $settings['imgcache_pager_item'], $image_file); ?>
         </a>
        </li>
       <?php endforeach; ?>    
      <?php else :?>
       <?php foreach ($ddblock_content as $image_file): ?>
        <li class="image-pager-item">
         <a href="#" class="pager-link" title="click to navigate to topic"><img src="<?php print base_path() . $image_file; ?>" alt="" width="55" height="55" /></a>
        </li>
       <?php endforeach; ?> 
      <?php endif;?>
     </ul>
    </div>
   <?php endif; ?>

   <?php if ($settings['pager'] == 'none' && $settings['pager2'] == 1 && $settings['pager2_position']['pager'] === 'pager'): ?>  
    <!-- prev next pager. -->
    <div id="ddblock-<?php print $settings['pager'] ."-". $settings['delta'] ?>" class="ddblock-<?php print $settings['pager'] ?> ddblock-pager clear-block" style="height: <?php print $settings['pager_height'] ?>px; width:<?php print $settings['pager_width'] ?>px;">
     <a class="prev" href="#"><?php print $settings['pager_prev']?></a>
     <a class="next" href="#"><?php print $settings['pager_next']?></a>
    </div>
   <?php endif; ?>  

   <?php if ($settings['output_type'] == 'images') : ?>
    <div class="ddblock-container visibility:hidden"> 
     <!-- prev/next page on slide -->
     <?php if ($settings['pager2'] == 1 && $settings['pager2_position']['slide'] === 'slide'): ?>
      <div class="ddblock-prev-next-slide ddblock-prev-next-slide-<?php print $settings['pager_position']?>">
       <div class="prev-container">
        <a class="prev" href="#"><?php print $settings['pager2_slide_prev']?></a>
       </div>
       <div class="next-container">
        <a class="next" href="#"><?php print $settings['pager2_slide_next'] ?></a>
       </div>
      </div>
     <?php endif; ?> 
     <?php if($settings['imgcache_slide'] != '<none>'):?>
      <?php foreach ($ddblock_content as $image_file): ?>
       <?php print theme('imagecache', $settings['imgcache_slide'], $image_file); ?>
      <?php endforeach; ?>    
     <?php else :?>
      <?php foreach ($ddblock_content as $image_file): ?>
       <img src="<?php print base_path() . $image_file; ?>" alt=""/>
      <?php endforeach; ?>    
     <?php endif;?>
     <?php if ($settings['pager2'] == 1 && $settings['pager2_position']['slide'] === 'slide'): ?>
      <div class="ddblock-prev-next-slide">
       <div class="prev-container">
        <a class="prev" href="#"><?php print $settings['slide_prev']?></a>
       </div>
       <div class="next-container">
        <a class="next" href="#"><?php print $settings['slide_next'] ?></a>
       </div>
      </div>
     <?php endif; ?> 
    </div>
   <?php endif; ?>
  
   <?php if ($settings['output_type'] == 'content_array') : ?>
    <div class="ddblock-container"> 
     <!-- prev/next page on slide -->
     <?php if ($settings['pager2'] == 1 && $settings['pager2_position']['slide'] === 'slide'): ?>
      <div class="ddblock-prev-next-slide ddblock-prev-next-slide-<?php print $settings['pager_position']?>">
       <div class="prev-container">
        <a class="prev" href="#"><?php print $settings['pager2_slide_prev']?></a>
       </div>
       <div class="next-container">
        <a class="next" href="#"><?php print $settings['pager2_slide_next'] ?></a>
       </div>
      </div>
     <?php endif; ?> 
     <?php foreach ($ddblock_content as $item): ?>
      <?php print($item); ?>
     <?php endforeach; ?>
    </div>
   <?php endif; ?>

   <?php if ($settings['output_type'] == 'view_content') : ?>
    <div class="ddblock-container"> 
     <!-- prev/next page on slide -->
     <?php if ($settings['pager2'] == 1 && $settings['pager2_position']['slide'] === 'slide'): ?>
      <div class="ddblock-prev-next-slide ddblock-prev-next-slide-<?php print $settings['pager_position']?>">
       <div class="prev-container">
        <a class="prev" href="#"><?php print $settings['pager2_slide_prev']?></a>
       </div>
       <div class="next-container">
        <a class="next" href="#"><?php print $settings['pager2_slide_next'] ?></a>
       </div>
      </div>
     <?php endif; ?> 
     <?php print($ddblock_content); ?>
    </div>
   <?php endif; ?>
  <?php endif; ?>
 </div>
</div>
