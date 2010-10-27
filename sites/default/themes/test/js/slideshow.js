$(document).ready(function(){
	$('.slideshow .view-content').cycle({ //.slideshow es el nombre del identificador personalizado que le puse a la vista para los slideshows en Drupal
		fx:     'turnDown', 
		speed:  'fast', 
		timeout: 0, 
		pager:  '.nav', //.nav es el nombre del identificador personalizado que le puse a la vista para los thumbnails en Drupal
		 
		// callback fn that creates a thumbnail to use as pager anchor 
		//poner la ruta completa a los thumbnails en Drupal
		pagerAnchorBuilder: function(idx, slide) { 
		 return '.nav .view-content .item-list ul li:eq(' + idx + ') .views-field-phpcode .field-content a'; 
		} 
	});
});
