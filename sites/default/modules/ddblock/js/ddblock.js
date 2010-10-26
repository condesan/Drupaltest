// $Id: ddblock.js,v 1.4.2.4 2010/03/23 02:53:24 ppblaauw Exp $

/**
  * Set image settings
  * only used if no template is choosen for the dynamic display block
  */
Drupal.behaviors.ddblockImg = function (context) {
  for (var base in Drupal.settings.ddblockImages) {
    // get variables
    var ddblockSettings = Drupal.settings.ddblockImages[base];

    // if no template and CCS is used set the image dimensions here
    if (ddblockSettings.setDimensions == 'none') {
      if ((ddblockSettings.imageHeight > 0) && (ddblockSettings.imageWidth > 0 )) {
        $('#ddblock-'+ ddblockSettings.block +' .ddblock-container img:not(.ddblock-processed)', context)
        .css('height',ddblockSettings.imageHeight + 'px')
        .css('width',ddblockSettings.imageWidth + 'px')
//       .css('padding', '2px')
//       .css('border', '1px solid #ddd')
//       .css('background-color', '#eee')
        .addClass('ddblock-processed');
      }
    }
  }
};

/**
  * Set content dimensions.
  * only used if no template is choosen for the dynamic display block
  */
Drupal.behaviors.ddblockImgContainer = function (context) {
  for (var base in Drupal.settings.ddblockImageContainer) {
    // get variables
    var ddblockSettings = Drupal.settings.ddblockImageContainer[base];

    // if no template and CCS is used set the content dimensions here
    if (ddblockSettings.setDimensions == 'none') {
      if ((ddblockSettings.imageContainerHeight > 12) && (ddblockSettings.imageContainerWidth > 12 )) {
        $('#ddblock-' + ddblockSettings.block  +' .ddblock-container:not(.ddblock-processed)', context)
        .css('height',ddblockSettings.imageContainerHeight + 'px')
        .css('width',ddblockSettings.imageContainerWidth + 'px')
        .css('overflow','hidden')
        .addClass('ddblock-processed');
      }
    }
  }
};

/**
  * Set the cycle plugin settings.
  *
  * Examples how and what to override for your own blocks
  *   Replace ddblockCycle with the ddblockCycle[BLOCKNUMBER]
  *   Change the onBefore and onAfter functions
  *
  */
Drupal.behaviors.ddblockCycle = function (context) {

  //helper function to clone the options object
  function CloneObject(inObj) {
    for (i in inObj)
    {
        this[i] = inObj[i];
    }
  }

  // cycle Plugin onBefore function to add functionality before the next slide shows up
  // can be used to add the following effects to slide-text
  // fadeOut - Fade out all matched elements by adjusting their opacity and firing an optional callback after completion.
  // slideUp - Hide all matched elements by adjusting their height and firing an optional callback after completion.
  // hide - Hide all matched elements using a graceful animation and firing an optional callback after completion.
  function onBefore(curr, next, opts, fwd) {
    if (opts.slideTextjQuery == 1){
      if (opts.slideTextEffectBeforeSpeed == 0) {
        opts.slideTextEffectBeforeSpeed = 1;
      };
      switch (opts.slideTextEffectBefore) {
      case "fadeOut":
        $("#ddblock-"+ opts.ddblocknr + ' ' + opts.slideTextContainer + '-' + opts.slideTextPosition).fadeOut(opts.slideTextEffectBeforeSpeed);
      break;
      case "slideUp":
        $("#ddblock-"+ opts.ddblocknr + ' ' + opts.slideTextContainer + '-' + opts.slideTextPosition).slideUp(opts.slideTextEffectBeforeSpeed);
      break;
      default:
        $("#ddblock-"+ opts.ddblocknr + ' ' + opts.slideTextContainer + '-' + opts.slideTextPosition).hide(opts.slideTextEffectBeforeSpeed);
      }
    }  
  }

  // cycle Plugin onAfter function to add functionality after the next slide shows up
  // can be used to add the following effects to slide-text
  // fadein - Fade in all matched elements by adjusting their opacity and firing an optional callback after completion.
  // slideDown - Reveal all matched elements by adjusting their height and firing an optional callback after completion.
  // show - Show all matched elements using a graceful animation and firing an optional callback after completion.
  function onAfter(curr, next, opts, fwd) {
    if (opts.slideTextjQuery == 1){
      if (opts.slideTextEffectAfterSpeed == 0) {
        opts.slideTextEffectAfterSpeed = 1;
      };
      switch (opts.slideTextEffectAfter) {
      case "fadeIn":
       $("#ddblock-"+ opts.ddblocknr + ' ' + opts.slideTextContainer + '-'  + opts.slideTextPosition).fadeIn(opts.slideTextEffectAfterSpeed);
      break;
      case 'slideDown':
       $("#ddblock-"+ opts.ddblocknr + ' ' + opts.slideTextContainer + '-' + opts.slideTextPosition).slideDown(opts.slideTextEffectAfterSpeed);
      break;
      default:
       $("#ddblock-"+ opts.ddblocknr + ' ' + opts.slideTextContainer + '-' + opts.slideTextPosition).show(opts.slideTextEffectAfterSpeed);
      }
    }  
    
    //when scrollable pager is used set active pager-item to current slide
    if (opts.pager1 == 'scrollable-pager' ){
      var myScrollable = $('#ddblock-' + block + ' ' + 'div.scrollable-pager').scrollable();      myScrollable.click(opts.currSlide);
    }


    // show pager count (0 of x)
    $("#ddblock-"+ opts.ddblocknr + ' ' + 'a.count').html((opts.currSlide + 1) + " of " + opts.slideCount);

    // For prev/next pager in the pager. Only show prev if previous slide exist - Only show next if next slide exist
    var index = $(this).parent().children().index(this);
    if (opts.pager2PagerHide == 1) {
      $("#ddblock-"+ opts.ddblocknr + ' li.pager-prev ' + 'a.prev')[index == 1 ? 'hide' : 'show']();
      $("#ddblock-"+ opts.ddblocknr + ' li.pager-next ' + 'a.next')[index == opts.slideCount ? 'hide' : 'show']();
    }

    // For prev/next pager in the slides. Only show prev if previous slide exist - Only show next if next slide exist
    var index = $(this).parent().children().index(this);
    if (opts.pager2SlideHide == 1) {
      $("#ddblock-"+ opts.ddblocknr + ' div.prev-container ' + 'a.prev')[index == 1 ? 'hide' : 'show']();
      $("#ddblock-"+ opts.ddblocknr + ' div.next-container ' + 'a.next')[index == opts.slideCount ? 'hide' : 'show']();
    }
  }

  i=0;
  for (var base in Drupal.settings.ddblockContent) {
    // new options var for every block
    var options = new CloneObject($.fn.cycle.defaults);

    // simplify variable name
    var ddblockSettings = Drupal.settings.ddblockContent[base];
    var block = ddblockSettings.block;
    var custom = ddblockSettings.custom;
    var pager = ddblockSettings.pager;
    var pager2 = ddblockSettings.pager2;
    var contentContainer = ddblockSettings.contentContainer;
    var pagerContainer = ddblockSettings.pagerContainer;

    // if not processed
    if (!$('#ddblock-' + block + '.ddblock-processed', context).size()) {

      // set transition option
      options.fx = ddblockSettings.fx;

      //set delay option for the blocks at different values so they less interfere with eachother
      options.delay = i * -1000;

      // set pager. You can have only one pager per block this way
      if (pager == 'image-pager' || pager == 'number-pager' || pager == 'custom-pager' || pager == 'scrollable-pager') {
        // number pager, image pager , custom pager and scrollable pager
        options.pager = "#ddblock-" + pager + "-" + block;
        //store pager1
        options.pager1 = pager;
        if (pager == 'number-pager') {
          options.pagerAnchorBuilder = function(idx, slide) {
            // return selector string for existing anchor
            return "#ddblock-" + pager + "-" + block + " li.number-pager-item:eq(" + idx + ") a.pager-link";
          }
        }
        if (pager == 'image-pager') {
          options.pagerAnchorBuilder = function(idx, slide) {
            // return selector string for existing anchor
            return "#ddblock-" + pager + "-" + block + " li.image-pager-item:eq(" + idx + ") a.pager-link";
          }
        }
        if (pager == 'custom-pager') {
          options.pagerAnchorBuilder = function(idx, slide) {
            // return selector string for existing anchor
            return "#ddblock-" + pager + "-" + block + " " + pagerContainer + ".custom-pager-item:eq(" + idx + ") a.pager-link";
          }
        }
        if (pager == 'scrollable-pager') {
          options.pagerAnchorBuilder = function(idx, slide) {
            // return selector string for existing anchor
            return "#ddblock-" + pager + "-" + block + " " 
            + pagerContainer + ":eq(" + idx + ") a.pager-link";
          }
        }

      }

      //set event which drives the pager navigation
      options.pagerEvent = ddblockSettings.pagerEvent;
	    options.prevNextEvent = ddblockSettings.pager2Event;

      // If pager fast set use fastOnEvent pager
      options.fastOnEvent = (ddblockSettings.pagerFast == 1) ? 1 : 0;
          
      // pause slideshow on pager hover
      options.pauseOnPagerHover = (ddblockSettings.pagerPause == 1) ? 1 : 0;

      // disable click if pager is mouseover
      if (ddblockSettings.pagerEvent == 'mouseover') {
          $("#ddblock-" + pager + "-" + ddblockSettings.block + " a.pager-link").click(function() {
            return false;
          });
      }
       
      // disable click if prev/next pager is mouseover
      if (ddblockSettings.pager2Event == 'mouseover') {
          $("#ddblock-"+ ddblockSettings.block + ' a.prev').click(function() {
            return false;
          });
          $("#ddblock-"+ ddblockSettings.block + ' a.next').click(function() {
            return false;
          });
      }

      //add prev next pager
      //alert(pager2);
      if (pager2 == 1) {
        options.prev = "#ddblock-"+ ddblockSettings.block + ' a.prev';
        options.next = "#ddblock-"+ ddblockSettings.block + ' a.next';
      } 
      else {
        //set next
        if (ddblockSettings.next) {
            options.next = "#ddblock-"+ ddblockSettings.block + ' ' + contentContainer;
        }
      }
      
      //set expression for selecting slides (if something other than all children is required)
      options.slideExpr = contentContainer;

      //set speed of the transition (any valid fx speed value)
      options.speed = ddblockSettings.speed;
      if (options.speed == 0) {
        options.speed = 1;
      };

      //set timeout in milliseconds between slide transitions (0 to disable auto advance)
      options.timeout = ddblockSettings.timeOut;

      //set pause, true to enable "pause on hover"
      if (ddblockSettings.pause) {
        options.pause = ddblockSettings.pause;
      }

      //set custom options
      if (custom) {
        // get the \r\n from the string
        var custom1 = custom.replace(/\r\n/gi,"");

        // parse into JSON object
        var custom2 = JSON.parse(custom1);

        // merge custom2 with options object
        jQuery.extend(true, options, custom2);
      }

      // redefine Cycle's updateActivePagerLink function
      $.fn.cycle.updateActivePagerLink = function(pager, currSlide) {
        $(pager)
          .find('a.pager-link')
            .removeClass('activeSlide')
            .filter('a.pager-link:eq('+currSlide+')')
            .addClass('activeSlide');
        $(pager)
          .find('.custom-pager-item')
          .removeClass('active-pager-item')
          .filter('.custom-pager-item:eq('+currSlide+')')
          .addClass('active-pager-item');
        $(pager)
          .find('.scrollable-pager-item')
          .removeClass('active-pager-item')
          .filter('.scrollable-pager-item:eq('+currSlide+')')
          .addClass('active-pager-item');
      };

      options.pager2PagerHide = ddblockSettings.pager2PagerHide;
      options.pager2SlideHide = ddblockSettings.pager2SlideHide;
      options.ddblocknr = block;
      options.before = onBefore;
      options.after = onAfter;

      
      // simple block
      if (ddblockSettings.setDimensions == 'none') {
        if ((ddblockSettings.height > 0) && (ddblockSettings.width > 0 )) {
          var $container = $('#ddblock-'+ block+ ' .ddblock-container ' + contentContainer).parent()
          .cycle(options)
          .css('height',ddblockSettings.height + 'px')
          .css('width',ddblockSettings.width + 'px')
          .css('overflow', ddblockSettings.overflow)
          .css('visibility', 'visible')
          .addClass('ddblock-processed');
        }
        else {
          var $container = $('#ddblock-'+ block + ' .ddblock-container ' + contentContainer).parent()
          .cycle(options)
          .css('overflow', ddblockSettings.overflow)
          .css('visibility', 'visible')
          .addClass('ddblock-processed');
        }
      }
      // advanced block
      else {
        if (ddblockSettings.slideText == 1) {
          //set slidetext options
          options.slideTextContainer = ddblockSettings.slideTextContainer;
          options.slideTextPosition = ddblockSettings.slideTextPosition;
          options.slideTextEffectBefore = ddblockSettings.slideTextEffectBefore;
          options.slideTextEffectBeforeSpeed = ddblockSettings.slideTextEffectBeforeSpeed;
          options.slideTextEffectAfter = ddblockSettings.slideTextEffectAfter;
          options.slideTextEffectAfterSpeed = ddblockSettings.slideTextEffectAfterSpeed;
          options.slideTextjQuery = ddblockSettings.slideTextjQuery;
        }
 
        options.pagerContainer = ddblockSettings.pagerContainer;

        //Use the parent of the slides as the parent container so the children function can be used for the second pager
        var $container = $('#ddblock-' + block + ' ' + contentContainer).parent();
        $container
        .cycle(options)
        .css('visibility', 'visible')
        .addClass('ddblock-processed');
        
        if (pager == 'scrollable-pager') {
          // create one scrollable element and return the API by enabling the "api" property
          var myScrollable1 = $('#ddblock-' + block + ' ' + 'div.scrollable-pager').scrollable({ 
            //enable api property
            api:true,
        
            // number of items vissible in scrollable pager 
            size: 5
      
          });
    
          //activate slide 1
          myScrollable1.click(0);
        }
      }  
    }
    i++;
  }
};

/*        $('#ddblock-' + block + ' ' + 'a.pause').click(function() { 
          $('#ddblock-' + block + ' ' + contentContainer).parent().cycle(2); 
          return false;
        }); 

        $('#ddblock-' + block + ' ' + 'a.play').click(function() { 
          $('#ddblock-' + block + ' ' + contentContainer).parent().cycle('resume', true);
          return false;          
        });
 
        $container.hover(
          function() { $('#ddblock-' + block + ' ' +'.controls').fadeIn(); },
          function() { $('#ddblock-' + block + ' ' +'.controls').fadeOut(); }
        );
 */


