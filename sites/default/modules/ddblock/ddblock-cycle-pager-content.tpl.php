<?php
// $Id: ddblock-cycle-pager-content.tpl.php,v 1.3.2.3 2010/03/03 06:03:47 ppblaauw Exp $ 

/**
 * @file
 * Default theme implementation to display a dynamic display blocks from a dynamic display block instance.
 *
 * Available variables:
 * - $ddblock_delta: Block number of the block.
 * - $ddblock_pager: Add a pager to the dynamic display block.
 * - $ddblock_pager_height: Height of the container of the pager.
 * - $ddblock_pager_width: Width of the container of the pager.
 * - $ddblock_pager_position: position of the slider (top | bottom) 
  * - $ddblock_content: themed content
 *
 * notes: don't change the ID names, they are used by the jQuery script.
 */
$number_of_items = 6; 
$number_of_items_per_row=3;
?>

<?php //custom pager. ?>
 
<?php if ($ddblock_pager == 'custom-pager'): ?>
 <?php if ($ddblock_pager_position == 'bottom' || $ddblock_pager_position == 'both'): ?>
   <div class="spacer-horizontal"><b></b></div>
 <?php endif; ?>
 <div id="ddblock-pager-<?php print $ddblock_delta ?>" class="<?php print $ddblock_pager ?> clear-block border">  <div  class="<?php print $ddblock_pager ?>-inner clear-block border">   <?php if ($ddblock_content): ?>
    <?php $item_counter=0; ?>
    <?php foreach ($ddblock_content as $pager_item): ?>
     <div class="<?php print $ddblock_pager ?>-item <?php print $ddblock_pager ?>-item-<?php print $item_counter ?>">
      <div class="<?php print $ddblock_pager ?>-item-inner"> 
       <a href="#" title="navigate to topic"><?php print $pager_item['image']; ?><?php print $pager_item['text']; ?></a>
      </div>
     </div>
     <?php $item_counter++; if ($item_counter == $number_of_items_per_row):?>
      <div class="spacer-horizontal"><b></b></div>
     <?php else: ?>
      <div class="spacer-vertical"></div>
     <?php endif; ?>
    <?php endforeach; ?>
   <?php endif; ?>
  </div> <!-- pager-inner-->
 </div>  <!-- pager-->
 <?php if ($ddblock_pager_position == 'top' || $ddblock_pager_position == 'both'): ?>
   <div class="spacer-horizontal"><b></b></div>
 <?php endif; ?>
<?php endif; ?> 
