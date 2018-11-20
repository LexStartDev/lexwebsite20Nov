( function( $ ) {
	$( function() {
		css_jsChanges();
		menuHandler();
		searchBox();
		searchWidget();
		lsTabs();
		slickSlider();
		lsAccordion();
		redirectToTab();
		frontToggleContent();
		lsPopup();
		if( $('body.home').length ){
			smoothScroll();			
		}
	});

	function lsPopup() {
		$('.article_slider_section .access_btn').click( function(){
			$(this).parents('.article_slider_section').siblings('.ls-popup-form').show();
			$('body').css({ 'overflow' : 'hidden' });
		});

		$('.ls-popup-close').click( function(){
			$(this).parent('.ls-popup-form').hide();
			$('body').css({ 'overflow' : 'auto' });
		});

		$('#primary-menu > li:nth-last-child(1) a').click( function(){
			$(this).parents('header').find('.ls-popup-form').show();
			$('body').css({ 'overflow' : 'hidden' });
		});
	}

	function css_jsChanges() {

		
		$('.lexstart-share-icons .ls-shareit').click( function(){
			$(this).siblings('.sharedaddy').toggleClass('top-pos');
		})


		//To prevent autocomplete dropdown from exceeding input width
		$.ui.autocomplete.prototype._resizeMenu = function () {
		  var ul = this.menu.element;
		  ul.outerWidth(this.element.outerWidth());
		}


		//scrollToTop
		$(window).scroll(function() {
		    if ($(this).scrollTop() >= 200) {        // If page is scrolled more than 50px
		        $('#ls-back-to-top').fadeIn(200);    // Fade in the arrow
		    } else {
		        $('#ls-back-to-top').fadeOut(200);   // Else fade out the arrow
		    }
		});
		$('#ls-back-to-top').click(function() {      // When arrow is clicked
		    $('body,html').animate({
		        scrollTop : 0                       // Scroll to top of body
		    }, 500);
		});

		//Related offerings title
		if (!$('.related_cpt_container .flex').children().length) {
	        $('.related_cpt_container .no-content-message').show();
	    }
	}

	function menuHandler() {

		$('.ham-open').click( function(){
			$(this).siblings('.main-navigation').addClass('slide-menu')
		})

		$('.ham-close').click( function(){
			$(this).parent('.main-navigation').removeClass('slide-menu')
		})

		var toggle1 = $( '#primary-menu .menu-item-has-children > a' );
  		toggle1.click(function() {
			$(this).toggleClass('special');
			$(this).find('+ .sub-menu').slideToggle(400);
  		});


  	// 	var toggle2 = $( '#primary-menu >  .menu-item-has-children > .sub-menu > .menu-item-has-children' );
  	// 	toggle2.click(function() {
			// $(this).find('> .sub-menu').slideToggle(400);
			// $(this).find('> a').toggleClass('special');
  	// 	});
	}

	function searchBox() {
		
		var url = LexstartAutocomplete.url + "?action=lexstart_search";
		$( ".search-autocomplete" ).autocomplete({
			source: url,
			select: function(event, ui) {
		        window.location.href=ui.item.link;
		    },
			delay: 500,
			minLength: 3
		});

	}

	function searchWidget() {

		$('header .search-widget-container .button').click( function(){
			// $(this).siblings('.widget-container').slideToggle(400);
			$(this).siblings('.widget-container').slideDown(400);
			$(this).css({ 'display' : 'none' });
		});

		$('header .widget-close').click( function(){
			// $(this).siblings('.widget-container').slideToggle(400);
			$(this).parents('.widget-container').slideUp(400);
			$('header .search-widget-container .button').css({ 'display' : 'block' });
		});

		if($('#wpadminbar').length > 0) {
			$('header .search-widget-container .widget-container').css({ 'top' : '7.7em' });
		}

	}

	function lsTabs() {
		//Tabs
	 
        $('.tab-links > li:first-child, .tab-content > div:first-child').addClass('active');

		$('.tabs-container .tab-links a').on('click', function(e)  {
	        var currentAttrValue = $(this).attr('href');
	 
	        $('.tabs-container ' + currentAttrValue).addClass('active').siblings().removeClass('active');
	 
	        // Change/remove current tab to active
	        $(this).parent('li').addClass('active').siblings().removeClass('active');

	        //Additional for kb template page
	        // if($('.taxonomy-terms ' + currentAttrValue).length == 0) {
	        // 	$('.taxonomy-terms').find('.tab-content').children().removeClass('active');
	        // }
	        $(this).parent('li').parent('ul').parent('li').removeClass('active');
	        $(this).siblings('.term-child').find('.active').removeClass('active');
	        $(this).parent('li').parent('ul').parent('li').siblings().removeClass('active').find('.active').removeClass('active');
	        $(this).parent('li').siblings().find('.active').removeClass('active');
	 
	        e.preventDefault();
		});

		//Search page tabs
        $('.post_type_results > li:first-child, .post-content > div:first-child').addClass('active');
		var activeTab = sessionStorage.activeTab;
		$(".post-content").show();
		if (activeTab) {
		    $('.post-content ' + activeTab ).show().siblings().hide();

		    // also make sure you your active class to the corresponding tab menu here
		    $(".post_type_results li a[href=" + "\"" + activeTab + "\"" + "]").parent().addClass('active').siblings().removeClass('active');
		}
		else {
		    activeTab = "#all_post";
		    $('.post-content ' + activeTab ).show().siblings().hide();
		    
		    // also make sure you your active class to the corresponding tab menu here
		    $(".post_type_results li a[href=" + "\"" + activeTab + "\"" + "]").parent().addClass('active').siblings().removeClass('active');
	    }

		// Enable, disable and switch tabs on click
		$('.post_type_results li a').on('click', function(e)  {
		    var currentAttrValue = $(this).attr('href');

		    // Show/Hide Tabs
		    $('.post-content ' + currentAttrValue).show().siblings().hide();
		    sessionStorage.activeTab = currentAttrValue;

		    // Change/remove current tab to active
		    $(this).parent('li').addClass('active').siblings().removeClass('active');
		    e.preventDefault();
		});
	}

	function lsAccordion() {

		//Accordion
		$('.kb-accordion .kb-accordion-title').click(function() {
			$(this).toggleClass('active minus');
			// $('.faq .answer').slideToggle(400);
			$(this).siblings('.kb-accordion-content').slideToggle(400);
			$(this).parent().siblings().children('.kb-accordion-title').removeClass('active minus');
			$(this).parent().siblings().children('.kb-accordion-content').slideUp(400);
  		});

		$('.taxonomy-terms > .tab-links > li:first-child .fas').addClass('active fa-minus');
		$('.taxonomy-terms > .tab-links > li:first-child .term-child').css({ 'display' : 'block' });
		$('.taxonomy-terms .fas').click(function() {
			$(this).toggleClass('active fa-minus');
			$(this).siblings('.term-child').slideToggle(400);
			$(this).parent().siblings().children('.fas').removeClass('active fa-minus');
			$(this).parent().siblings().children('.term-child').slideUp(400);
  		});
	}

	function redirectToTab() {
		var hash = window.location.hash;
		//checks whether or not the hash tag is set

		if (hash != "" && hash != "#kb-classify" ) {
			//removes all active classes from tabs
			$('.kb-accordion-content > .tab-links li').each(function() {
				$(this).removeClass('active');
			});

			$('.kb-accordion-content > .tab-content > div').each(function() {
				$(this).removeClass('active');
			});

			//this will add the active class on the hashtagged value
			var link = "";
			$('.tab-links li').each(function() {
				link = $(this).find('a').attr('href');

				if (link == hash) {
					$(this).addClass('active');
				}
			});

			$('.tab-content div').each(function() {
				link = $(this).attr('id');

				if ('#'+link == hash) {
					$(this).addClass('active');
				}
			});
		}
	}

	function smoothScroll() {
		// Add smooth scrolling to all links
		$("#primary-menu a").on('click', function(event) {

			if (this.hash !== "") {
				event.preventDefault();

				var hash = this.hash;

				$('html, body').animate({
				    scrollTop: $(hash).offset().top
				}, 800, function(){
				    window.location.hash = hash;
				});
			} 
		});
	}

	function frontToggleContent() {

		$('.ls-toggle-btn').click(function() {
			$('.team-levels:not(:nth-child(1))').slideToggle(400);

			if ($(this).text() == 'More') {
			    $(this).text('Less');
			} else {
			    $(this).text('More');
			}
		});	
	}

	function slickSlider() {

		$(".post-slider").slick({
	        dots: true,
	        infinite: true,
	        slidesToShow: 3,
	        slidesToScroll: 1,

			responsive: [
            {
				breakpoint: 991,
				settings: {
			        arrows: false,
					slidesToShow: 2,
					slidesToScroll: 1,
				}
            },

            {
				breakpoint: 671,
				settings: {
			        arrows: false,
					slidesToShow: 1,
					slidesToScroll: 1,
				}
            }
			]
		});

		$(".article-slider").slick({
	        dots: true,
	        infinite: true,
	        slidesToShow: 3,
	        slidesToScroll: 1,

			responsive: [
            {
				breakpoint: 991,
				settings: {
			        arrows: false,
					slidesToShow: 2,
					slidesToScroll: 1,
				}
            },

            {
				breakpoint: 671,
				settings: {
			        arrows: false,
					slidesToShow: 1,
					slidesToScroll: 1,
				}
            }
			]
		});


		$(".testimonials_slider").slick({
	        dots: true,
	        infinite: true,
	        slidesToShow: 1,
	        slidesToScroll: 1
		});


		$(".content_slider_section").slick({
	        dots: true,
	        infinite: true,
	        slidesToShow: 1,
	        slidesToScroll: 1
		});
	}
})( jQuery );