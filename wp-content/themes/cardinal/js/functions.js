/*global jQuery,google */
(function(){
	
	// USE STRICT
	"use strict";
	
	/////////////////////////////////////////////
	// PAGE FUNCTIONS
	/////////////////////////////////////////////
	
	var page = {
		init: function () {
			
			// BROWSER CHECK
			page.browserCheck();
							
			// FITVIDS
			page.resizeVideos();
			
			// FITTEXT
			page.resizeHeadings();
					
			// HEADER SLIDER
			if (jQuery('body').hasClass('header-below-slider') && jQuery('.home-slider-wrap').length > 0) {
			page.headerSlider();
			}
			
			// ONE PAGE NAV
			if (jQuery('#one-page-nav').length > 0) {
				page.onePageNav();
			}
			
			// BACK TO TOP
			if (jQuery('#back-to-top').length > 0) {
				$window.scroll(function() {
					page.backToTop();
				});
			}
			
			// SMOOTH SCROLL
			page.niceScroll();

			// RECENT POSTS
			if (jQuery('.recent-posts').length > 0) {
				recentPosts.init();
			}
			
			// MOVE MODALS TO BOTTOM OF PAGE
			page.moveModals();
			
			// LOAD MAP ASSET ON MODAL CLICK
			jQuery('a[data-toggle="modal"]').on('click', function() {
				setTimeout(function() {
					map.init();						
				}, 300);
				
				return true;
			});
			
			// REFRESH MODAL IFRAME ON CLOSE (FOR VIDEOS)
			page.modalClose();
			
			// REPLACE COMMENTS REPLY TITLE HTML
			if (body.hasClass('single-post')) {
				var replyTitle = jQuery('#respond').find('h3');
				var originalText = jQuery('#respond').find('h3').html();
				
				replyTitle.addClass('spb-heading');
				replyTitle.html('<span>'+originalText+'</span>');
			}
			
			// SMOOTH SCROLL LINKS
			page.smoothScrollLinks();
			
			// STICKY SIDEBAR
			if (!isMobileAlt && sfIncluded.hasClass('stickysidebars') && jQuery('.sidebar').length > 0) {
				page.stickySidebars();
			}
			
			// PORTFOLIO STICKY SIDEBAR	
			if (!isMobileAlt && jQuery('.sticky-details').length > 0) {
				portfolio.stickyDetails();
			}
			
			// BUDDYPRESS ACTIVITY LINK CLICK
			jQuery('.activity-time-since,.bp-secondary-action').on('click', function(e) {
				e.preventDefault();
				jQuery('.viewer').css('display', 'none');
				window.location = jQuery(this).attr('href');
			});
			
			// LOVE IT CLICK
			jQuery('.love-it').on('click', function() {
				page.loveIt(jQuery(this));
				return false;
			});
			
			// ARTICLE SHARE
			page.articleShare();
			
			// ARTICLE WITH FULL WIDTH MEDIA TITLE
			if (jQuery('article').hasClass('single-post-fw-media-title')) {
				page.postMediaTitle();
			}
			
			// RELATED POSTS
			if (jQuery('.related-items').length > 0) {
				relatedPosts.init();
			}
			
			// LIGHTBOX
			page.lightbox();
			
			// PAGE FADE OUT
			if (body.hasClass('page-transitions')) {
				page.pageTransitions();
			}
			
			// DIRECTORY SUBMIT
			page.directorySubmit();
		},
		load: function() {
			// PAGE BUILDER ROW CONTENT HEIGHT
			if ($window.width() > 767) {
				page.fwRowContent();
			}
			$window.smartresize( function() {
				if ($window.width() > 767) {
					page.fwRowContent();
				}
			});
			
			// FANCY HEADING
			if (jQuery('.fancy-heading').length > 0) {
				page.fancyHeading();
			}
		},
		browserCheck: function() {
			jQuery.browser = {};
			jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
			jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
			jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
			jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
			jQuery.browser.msieMobile10 = /iemobile\/10\.0/.test(navigator.userAgent.toLowerCase());
					
			// BODY CLASSES
			if (isMobileAlt) {
				body.addClass("mobile-browser");
			} else {
				body.addClass("standard-browser");
			}
			if (isIEMobile) {
				body.addClass("ie-mobile");
			}
			if (isAppleDevice) {
				body.addClass("apple-mobile-browser");
			}
			if (body.hasClass("woocommerce-page") && !body.hasClass("woocommerce")) {
				body.addClass("woocommerce");
			}
			
			// ADD IE CLASS
			if (IEVersion && IEVersion < 9) {
				body.addClass('browser-ie');
			}
			
			// ADD IE10 CLASS
			var pattern = /MSIE\s([\d]+)/,
				ua = navigator.userAgent,
				matched = ua.match(pattern);
			if (matched) {
			body.addClass('browser-ie10');
			}
			
			// ADD MOZILLA CLASS
			if (jQuery.browser.mozilla) {
				body.addClass('browser-ff');
			}
			
			// ADD SAFARI CLASS
			if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
				body.addClass('browser-safari');
			}
		}, 
		resizeVideos: function() {
			jQuery('.blog-items:not(.carousel-items),article.type-portfolio,article.type-post,article.type-team,.spb_video_widget,.infocus-item,.full-width-detail,#activity-stream').fitVids({ ignore: '.no-fv'});
		},
		resizeHeadings: function() {	
			var h1FontSize = jQuery('h1:not(.logo-h1)').css('font-size'),
				h2FontSize = jQuery('h2:not(.caption-title)').css('font-size');
						
			page.resizeHeadingsResize(h1FontSize, h2FontSize);
			$window.smartresize( function() {
				page.resizeHeadingsResize(h1FontSize, h2FontSize);
			});
		},
		resizeHeadingsResize: function(h1FontSize, h2FontSize) {
			if ($window.width() <= 768) {		
				if (h1FontSize) {
					h1FontSize = h1FontSize.replace("px", "");
					var h1FontSizeMin = Math.floor(h1FontSize * 0.6);
					jQuery('h1:not(.logo-h1)').fitText(1, { minFontSize: h1FontSizeMin + 'px', maxFontSize: h1FontSize +'px' }).css('line-height', '120%');
				}
				
				if (h2FontSize) {
					h2FontSize = h2FontSize.replace("px", "");
					var h2FontSizeMin = Math.floor(h2FontSize * 0.6);
					jQuery('h2:not(.caption-title)').fitText(1, { minFontSize: h2FontSizeMin + 'px', maxFontSize: h2FontSize +'px' }).css('line-height', '120%');
				}
			} else {
				jQuery('h1:not(.logo-h1)').css('font-size', '').css('line-height', '');
				jQuery('h2:not(.caption-title)').css('font-size', '').css('line-height', '');
			}
		},
		loveIt: function($this) {	
			var locale = jQuery('#loveit-locale'),
				post_id = $this.data('post-id'),
				user_id = $this.data('user-id'),
				action = 'love_it';
			
			if ($this.hasClass('loved')) {
				action = 'unlove_it';
			}	
			if (locale.data('loggedin') == 'false' && jQuery.cookie('loved-' + post_id)) {
				action = 'unlove_it';
			}
			
			var data = {
				action: action,
				item_id: post_id,
				user_id: user_id,
				love_it_nonce: locale.data('nonce')
			};
			
			jQuery.post(locale.data('ajaxurl'), data, function(response) {
				var ajaxResponse = jQuery.trim(response),
					count_wrap,
					count;
					
				if (ajaxResponse == 'loved') {
					$this.addClass('loved');
					count_wrap = $this.find('data.count');
					count = count_wrap.text();
					count_wrap.text(parseInt(count) + 1);
					if(locale.data('loggedin') == 'false') {
						jQuery.cookie('loved-' + post_id, 'yes', { expires: 1 });
					}
				} else if (ajaxResponse == 'unloved') {
					$this.removeClass('loved');
					count_wrap = $this.find('data.count');
					count = count_wrap.text();
					count_wrap.text(parseInt(count) - 1);
					if (locale.data('loggedin') == 'false') {
						jQuery.cookie('loved-' + post_id, 'no', { expires: 1 });
					}
				} else {
					alert(locale.data('error'));
				}
			});
		},
		niceScroll: function() {
			
			if (jQuery('.swift-slider').length > 0) {
				if (jQuery('.swift-slider').data('type') === "curtain") {
					return;
				}
			}
			
			if (!isMobileAlt || jQuery.browser.msieMobile10 || isIEMobile) {
				return;
			}
			
			jQuery("html").niceScroll({
				scrollspeed: 40,
				mousescrollstep: 40,
				cursorwidth: 15,
				cursorborder: 0,
				cursorcolor: '#444444',
				cursorborderradius: 6,
				autohidemode: false,
				horizrailenabled: false
			});
			jQuery("html").addClass('nice-scroll-enabled');
		},
		fwRowContent: function() {	
			jQuery('.spb-row-container[data-v-center="true"]').each(function() {
			
				if (jQuery(this).find('.row').length > 0) {
					
					jQuery(this).find('.row').each(function() {
						var contentHeight = 0,
							parentContainer = jQuery(this).parents('.spb-row-container');
						
						if (parentContainer.hasClass('parallax-window-height')) {
							parentContainer.find('> .spb_content_element').vCenterTop();
						}
						
						if (jQuery(this).find('> div').length > 1) {
							
							jQuery(this).addClass('multi-column-row');
							
							jQuery(this).find('> div').each(function() {
								var assetPadding = parseInt(jQuery(this).css('padding-top')) + parseInt(jQuery(this).css('padding-bottom')),
									itemHeight = jQuery(this).find('.spb-asset-content').first().innerHeight() + assetPadding;
								if (itemHeight > contentHeight) {
									contentHeight = itemHeight;
								}
							});
												
							// SET THE ROW & INNER ASSET MIN HEIGHT
							jQuery(this).css('min-height', contentHeight);
							jQuery(this).find('> div').css('min-height', contentHeight);
		
							// VERTICAL ALIGN THE INNER ASSET CONTENT
							jQuery(this).find('> div').each(function() {
								var assetContent = jQuery(this).find('.spb-asset-content').first(),
									assetPadding = parseInt(jQuery(this).css('padding-top')) + parseInt(jQuery(this).css('padding-bottom')) + parseInt(assetContent.css('padding-top')) + parseInt(assetContent.css('padding-bottom')),
									innerHeight = assetContent.height() + assetPadding,
									margins = Math.floor((contentHeight / 2) - (innerHeight /2));
															
								if (margins > 0) {
									assetContent.css('margin-top', margins).css('margin-bottom', margins);
								} else {
									assetContent.css('margin-top', '').css('margin-bottom', '');
								}
							});
							
						}
						
					});
					
				}
			});
		},
		headerSlider: function() {
			
			// SET LOADING INDICATOR
			jQuery('#site-loading').css('display', 'block');		
		
			// SET SLIDER POSITION & HEIGHT
			jQuery('.home-slider-wrap').css('position', 'fixed');
			jQuery('#container').css('top', jQuery('.home-slider-wrap').height());
			setTimeout(function() {
				jQuery('#site-loading').fadeOut(1000);		
			}, 250);
			
			// RESIZE SLIDER HEIGHT
			$window.smartresize( function() {
				jQuery('#container').css('top', jQuery('.home-slider-wrap').height());
			});
			
			// CONTINUE LINK
			jQuery('a#slider-continue').on('click', function(e) {
				
				// Prevent default anchor action
				e.preventDefault();
				
				// Animate scroll to main content
				jQuery('html, body').stop().animate({
					scrollTop: jQuery('#container').css('top')
				}, 1500, 'easeInOutExpo');
				
			});
		},
		fancyHeading: function() {
			var fancyHeading = jQuery('.fancy-heading'),
				fancyHeadingText = fancyHeading.find('.heading-text'),
				fancyHeadingTextHeight = fancyHeadingText.height(),
				fancyHeadingHeight = parseInt(fancyHeading.data('height'), 10),
				header = jQuery('.header-wrap'),
				headerHeight = 0;
			
			if (body.hasClass('header-naked-light') || body.hasClass('header-naked-dark')) {
				headerHeight = header.height();
			}	
			
			if (!fancyHeadingHeight) {
				fancyHeadingHeight = 400;
			}
			
			if (fancyHeadingTextHeight > fancyHeadingHeight) {
				fancyHeadingHeight = fancyHeadingTextHeight + 80;
			}
			
			fancyHeadingHeight = fancyHeadingHeight + headerHeight;
			
			// Vertically center the heading text
			fancyHeadingText.vCenterTop();
			
			// Animate in the heading text and title
			setTimeout(function() {
				fancyHeading.css({
					'height': fancyHeadingHeight + 'px',
					'opacity': 1
				});
			}, 400);
			setTimeout(function() {
				fancyHeadingText.css('opacity', 1);
			}, 800);
			setTimeout(function() {
				fancyHeading.addClass('animated');
			}, 1400);
			
			// Check if parallax scroll is possible
			if (parallaxScroll) {
				$window.scroll(function(){
					
					var scrollTop = $window.scrollTop();
					
					// Only scroll if the heading is makes sense to do so
					if (scrollTop > 0 && scrollTop < jQuery(document).height() - $window.height()) {
						
						// Reduce the heading height
						fancyHeading.stop(true,true).transition({
							height: fancyHeadingHeight - scrollTop * 1.1
						}, 0);
						
						// Move & fade the heading content
						fancyHeadingText.stop(true,true).transition({
							y: scrollTop * 0.2,
							opacity: 1 - scrollTop / 200
						}, 0);
					}
					
				}); 
			}
		},
		moveModals: function() {
			jQuery(".modal").each(function(){
				jQuery(this).appendTo("body");
			});
		},
		modalClose: function() {
			jQuery(".modal-backdrop, .modal .close, .modal .btn").on("click", function() {
				jQuery(".modal iframe").each(function() {
					var thisModal = jQuery(this);
					thisModal.attr("src", thisModal.attr("src"));
				});
			});
		},
		smoothScrollLinks: function() {
			jQuery('a.smooth-scroll-link').on('click', function(e) {
				
				var linkHref = jQuery(this).attr('href');
								
				if (linkHref && linkHref.indexOf('#') === 0) {
					var headerHeight = 0;
						
					if (jQuery('.sticky-header').length > 0) {
						headerHeight = jQuery('.sticky-header').height();
					}
					if (jQuery('#wpadminbar').length > 0) {
						headerHeight = headerHeight + 32;
					}
					
					jQuery('html, body').stop().animate({
						scrollTop: jQuery(linkHref).offset().top - headerHeight
					}, 1000, 'easeInOutExpo');
					
					e.preventDefault();
					
				} else {
					return e;
				}
				
			});
		},
		onePageNav: function() {
				
			var onePageNav = jQuery('#one-page-nav'),
				onePageNavType = onePageNav.hasClass('opn-arrows') ? "arrows" : "standard",
				onePageNavItems = "",
				pageSectionCount = 0,
				mainContent = jQuery('.page-content');
			
			mainContent.find('section.row').each(function() {
				var linkID = jQuery(this).attr('id'),
					linkName = jQuery(this).data('rowname');
				
				if (linkID && linkName.length > 0 && jQuery(this).height() > 0) {
					onePageNavItems += '<li><a href="#'+linkID+'" data-title="'+linkName+'"><i></i></a><div class="hover-caption">'+linkName+'</div></li>';
					pageSectionCount++;
				}
			});
			
			if (pageSectionCount > 0) {
				onePageNav.append('<ul>'+onePageNavItems+'</ul>');
				
				if (onePageNavType === "arrows") {
					onePageNav.find('ul').css('display', 'none');
					onePageNav.append('<a href="#" class="opn-up"><i class="ss-up"></i></a>');
					onePageNav.append('<div class="opn-status"><span class="current">1</span>/<span class="total">'+pageSectionCount+'</span></div>');
					onePageNav.append('<a href="#" class="opn-down"><i class="ss-down"></i></a>');
				}
					
				onePageNav.vCenter();
				setTimeout(function() {
					
					page.onePageNavScroll(onePageNav);
					
					onePageNav.css('display', 'block').stop().animate({
						'right': '0',
						'opacity': 1
					}, 1000, "easeOutQuart");
					
					// Nav Dots
					jQuery('#one-page-nav ul li a').bind('click', function(e) {
						page.onePageNavGoTo(jQuery(this).attr('href'));
						e.preventDefault();
					});
					
					// Up Arrow
					jQuery('#one-page-nav a.opn-up').bind('click', function(e) {
						var currentSection = parseInt(jQuery('.opn-status .current').text(), 10),
							prevSection = currentSection - 1,
							prevSectionHref = jQuery('#one-page-nav ul li:nth-child('+ prevSection +') > a').attr('href');
						
						if (prevSection > 0) { 
							page.onePageNavGoTo(prevSectionHref);
						}
						e.preventDefault();
					});
					
					// Down Arrow
					jQuery('#one-page-nav a.opn-down').bind('click', function(e) {
						var currentSection = parseInt(jQuery('.opn-status .current').text(), 10),
							nextSection = currentSection + 1,
							nextSectionHref = jQuery('#one-page-nav ul li:nth-child('+ nextSection +') > a').attr('href');
						
						if (nextSection <= pageSectionCount) { 
							page.onePageNavGoTo(nextSectionHref);
						}
						e.preventDefault();
					});
					
					// Assign current on init and scroll
					page.onePageNavScroll(onePageNav);
					$window.on('scroll', function() {
						page.onePageNavScroll(onePageNav);
					});
					
				}, 1000);
			}
		},
		onePageNavGoTo: function(anchor) {
			
			var adjustment = 0;
			
			if (jQuery('#wpadminbar').length > 0) {
				adjustment = jQuery('#wpadminbar').height();
			}
			
			if (body.hasClass('sticky-header-enabled')) {
				adjustment = adjustment + jQuery('.sticky-header').height();
			}
			
			jQuery('html, body').stop().animate({
				scrollTop: jQuery(anchor).offset().top - adjustment
			}, 1000, 'easeInOutExpo');
		},
		onePageNavScroll: function(onePageNav) {
			
			var adjustment = 0;
			
			if (body.hasClass('sticky-header-enabled')) {
				adjustment = jQuery('.sticky-header').height();
			}
			
			if (jQuery('#wpadminbar').length > 0) {
				adjustment = adjustment + jQuery('#wpadminbar').height();
			}
			
			var currentSection = jQuery('section.row:in-viewport('+adjustment+')').data('rowname'),
				currentSectionIndex = 0;
			
			if (!currentSection) {
				onePageNav.find('li').removeClass('selected');	
			}
				
			if (onePageNav.is(':visible') && currentSection) {
				onePageNav.find('li').removeClass('selected');				
				onePageNav.find('li a[data-title="'+currentSection+'"]').parent().addClass('selected');
				currentSectionIndex = onePageNav.find('li a[data-title="'+currentSection+'"]').parent().index() + 1;
			}
			
			if (currentSectionIndex > 0) {
				jQuery('.opn-status .current').text(currentSectionIndex);
			}
			
			if (onePageNav.hasClass('opn-arrows')) {
				var current = onePageNav.find('.current').text(),
					total = onePageNav.find('.total').text();
				
				if (current === "1") {
					onePageNav.find('.opn-up').addClass('disabled');
				} else {
					onePageNav.find('.opn-up').removeClass('disabled');
				}
				
				if (current === total) {
					onePageNav.find('.opn-down').addClass('disabled');
				} else {
					onePageNav.find('.opn-down').removeClass('disabled');
				}
			}
		},
		articleShare: function() {
			jQuery('.article-share').each(function() {
				var articleShare = jQuery(this);
				articleShare.share({
					button_text: articleShare.data('buttontext'),
					image: articleShare.data('image'),
				});
			});
		},
		postMediaTitle: function() {
			var detailsOverlay = jQuery('.details-overlay'),
				detailFeature = jQuery('.detail-feature');
				
			detailFeature.css('height', detailsOverlay.height() + 80);
			setTimeout(function() {
				jQuery('.details-overlay').vCenter().stop().animate({
					'bottom': '50%',
					'opacity': 1
				}, 1500, "easeOutExpo");	
			}, 500);
			
			$window.smartresize( function() {	
				detailFeature.css('height', detailsOverlay.height() + 80);
				jQuery('.details-overlay').vCenter();
			});
			
		},
		lightbox: function() {	
		
			// Lightbox Social
			var lightboxSocial = {};
			if (lightboxSharing) {
				lightboxSocial = {
					facebook: true,
					twitter: true,
					googleplus: true,
					pinterest: {
						source: "https://pinterest.com/pin/create/bookmarklet/?url={URL}",
						text: "Share on Pinterest"
					}
				};
			}
					
			// Lightbox Galleries
			var galleryArr = [];
			jQuery('[rel^="ilightbox["]').each(function () {
				var attr = this.getAttribute("rel");
				if (jQuery.inArray(attr, galleryArr) == -1 ) {
					galleryArr.push(attr);
				}
			});
			jQuery.each(galleryArr, function (b, c) {
				jQuery('[rel="' + c + '"]').iLightBox({
					skin: lightboxSkin,
					social: {
						buttons: lightboxSocial
					},
					path: 'horizontal',
					thumbnails: {
						maxWidth: 120,
						maxHeight: 120
					},
					controls: {
						arrows: lightboxControlArrows
					}
				});
			});	
		},
		backToTop: function() {
			var scrollPosition = $window.scrollTop();
						
			if (scrollPosition > 300) {
				jQuery('#back-to-top').stop().animate({
					'bottom': '10px',
					'opacity': 1
				}, 300, "easeOutQuart");
			} else if (scrollPosition < 300) {
				jQuery('#back-to-top').stop().animate({
					'bottom': '-40px',
					'opacity': 0
				}, 300, "easeInQuart");
			}
		},
		stickySidebars: function() {
			
			var topMargin = 10;
			
			if (jQuery('.sticky-header').length > 0) {
				topMargin += jQuery('.sticky-header').height();
			}

			if (jQuery('#breadcrumbs').length > 0) {
				topMargin += jQuery('#breadcrumbs').height();
			}
			
			jQuery('.sidebar > .sidebar-widget-wrap').stickySidebar({
				headerSelector: '.header-wrap',
				navSelector: '.page-heading',
				contentSelector: '.hentry',
				footerSelector: '#footer-wrap',
				sidebarTopMargin: topMargin,
				footerThreshold: 160,
			});
			
			page.stickySidebarsResize();
			$window.smartresize( function() {
				page.stickySidebarsResize();
			});
		},
		stickySidebarsResize: function() {
			jQuery('.sidebar-widget-wrap').each(function() {
				var sidebar = jQuery(this);
					sidebar.css('width', sidebar.parent().width());
				});
		},
		getViewportHeight: function() {
			var height = "innerHeight" in window ? window.innerHeight: document.documentElement.offsetHeight; 
			return height;		
		},
		checkIE: function() {
			var undef,
				v = 3,
				div = document.createElement('div'),
				all = div.getElementsByTagName('i');
				
			while (
				div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
				all[0]
			);
			
			return v > 4 ? v : undef;
		},
		pageTransitions: function() {
			jQuery('a').on('click', function(e) {
				var linkElement = jQuery(this),
					link = linkElement.attr('href');
				if (link.indexOf('?') >= 0 || link.indexOf('#') === 0 || link.indexOf('.jpg') >= 0 || link.indexOf('.png') >= 0 || link.indexOf('mailto') >= 0 || e.ctrlKey || e.metaKey || link.indexOf('javascript') === 0 ) {
					return e;
				} else {
					if (body.hasClass('mobile-menu-open')) {
						nav.hideMobileMenu();
						nav.hideMobileCart();
					}
					page.fadePageOut(link);
					e.preventDefault();
				}
			});
		},
		fadePageIn: function() {
			body.addClass('page-fading-in');
			jQuery('#site-loading').animate({
				'opacity': 0,
			}, 400, 'easeInExpo', function() {
				jQuery(this).css('display', 'none');
			});
			setTimeout(function() {
				jQuery('#main-container').animate({
					'opacity': 1,
					'paddingTop': '0'
				}, 600, 'easeOutExpo', function() {
					body.removeClass('page-fading-in');
				});
			}, 100);
		},
		fadePageOut: function(link) {
			var ptop = '150px';
			
			if (body.hasClass('header-naked-light') || body.hasClass('header-naked-dark')) {
				ptop = '0px';
			}
			
			jQuery('#site-loading').css('display', 'block').animate({
				'opacity': 1,
			}, 400, 'easeInExpo');
			jQuery('#main-container').animate({
				'opacity': 0,
				'paddingTop': ptop
			}, 600, 'easeInExpo', function() {
				window.location = link;
			});
		},
		directorySubmit: function() {
			jQuery('#sf_directory_calculate_coordinates').live("click", function(e) {
				e.preventDefault();
				var geocoder = new google.maps.Geocoder();	
						geocoder.geocode( { 'address': jQuery('#sf_directory_address').val()}, function(results, status) {
									jQuery('#sf_directory_lat_coord').val(results[0].geometry.location.lat());
									jQuery('#sf_directory_lng_coord').val(results[0].geometry.location.lng());	
					});
								
			});
			
			jQuery('#directory-submit').click(function(e) {
			
			if (jQuery('#sf_directory_address').val() === '' || jQuery('#sf_directory_lat_coord').val() === '' || jQuery('sf_directory_lng_coord').val() === '' || jQuery('#directory_title').val() === '' || jQuery('#directory_description').val() === '' || jQuery('#directory-cat').val() <= 0 || jQuery('#directory-loc').val() <= 0) {
					e.preventDefault();
					jQuery('.directory-error').show();
					jQuery('html, body').animate({ scrollTop: jQuery('.directory-error').offset().top-100}, 700);
					return false;
				}
				jQuery('#add-directory-entry').submit();
			});
		}
	};

	
	/////////////////////////////////////////////
	// SUPER SEARCH
	/////////////////////////////////////////////
		
	var superSearch = {
		init: function() {
						
			jQuery('.search-options .ss-dropdown').on('click', function(e) {
				e.preventDefault();
				
				var option = jQuery(this),
					dropdown = option.find( 'ul' );
								
				if (isMobileAlt) {
					if (dropdown.hasClass('show-dropdown')) {
						dropdown.removeClass('show-dropdown');
					} else {
						dropdown.addClass('show-dropdown');							
					}
				} else {
					if (dropdown.hasClass('show-dropdown')) {
						dropdown.css('top', 30);
						dropdown.removeClass('show-dropdown');
					} else {
						dropdown.css('top', -10);
						dropdown.addClass('show-dropdown');							
					}
				}
			});
						
			jQuery('.ss-option').on('click', function(e) {
				e.preventDefault();
				
				var selectedOption = jQuery(this).attr('data-attr_value');
				var parentOption = jQuery(this).parent().parent().parent();
								
				parentOption.find('li').removeClass('selected');
				jQuery(this).parent().addClass('selected');
				
				parentOption.attr('data-attr_value', selectedOption);
				parentOption.find('span').text(jQuery(this).text());
			});
			
			jQuery('.super-search-go').on('click', function(e) {
				e.preventDefault();
				var parentSearch = jQuery(this).parents('.sf-super-search'),
					filterURL = superSearch.urlBuilder(parentSearch),
					homeURL = jQuery(this).attr('data-home_url'),
					shopURL = jQuery(this).attr('data-shop_url');
				
				if (filterURL.indexOf("product_cat") >= 0) {
				location.href = homeURL + filterURL;
				} else {
				location.href = shopURL + filterURL;
				}
				
			});
		},
		urlBuilder: function(searchInstance) {
			
			var queryString = "";
			
			jQuery(searchInstance).find('.search-options .ss-dropdown').each(function() {
				
				var attr = jQuery(this).attr('id');
				var attrValue = jQuery(this).attr('data-attr_value');
				if (attrValue !== "") {
					if (attr === "product_cat") {
						if (queryString === "") {
							queryString += "?product_cat=" + attrValue;
						} else {
							queryString += "&product_cat=" + attrValue;
						}
					} else {
						if (queryString === "") {
						queryString += "?filter_" + attr + "=" + attrValue;				
						} else {
						queryString += "&filter_" + attr + "=" + attrValue;									
						}
					}
				}
			});
			
			jQuery('.search-options input').each(function() {
				var attr = jQuery(this).attr('name');
				var attrValue = jQuery(this).attr('value');
				if (queryString === "") {
					queryString += "?"+ attr + "=" + attrValue;				
				} else {
					queryString += "&" + attr + "=" + attrValue;									
				}
			});
			
			return queryString;
		}
	};
	
	
	/////////////////////////////////////////////
	// HEADER
	/////////////////////////////////////////////
		
	var header = {
		init: function() {
			
			var lastAjaxSearchValue = "",
				searchTimer = false;
									
			if (body.hasClass('sticky-header-enabled') && !body.hasClass('vertical-header')) {
				header.stickyHeaderInit();
			}
			
			jQuery('.header-search-link-alt').on('click', function(e) {
				e.preventDefault();
				
				var ajaxSearchWrap = jQuery('.ajax-search-wrap');
				
				if (ajaxSearchWrap.is(':visible')) {
					ajaxSearchWrap.fadeOut(300);
					setTimeout(function() {
						jQuery('.ajax-search-results').slideUp(100).empty();
						jQuery('.ajax-search-form input[name=s]').val('');
					}, 300);
				} else {
					ajaxSearchWrap.fadeIn(300);
					setTimeout(function() {
						jQuery('.ajax-search-form input[name=s]').focus();
						jQuery("#container").bind("click", function(e) {
							var ajaxSearchWrap = jQuery('.ajax-search-wrap');
							if (!jQuery(e.target).closest('.ajax-search-wrap').length) {
								ajaxSearchWrap.fadeOut(300);
								setTimeout(function() {
									jQuery('.ajax-search-results').slideUp(100).empty();
									jQuery('.ajax-search-form input[name=s]').val('');
								}, 300);
								jQuery("#container").unbind("click");
							}
						});
					}, 300);
				}
				
			});

			jQuery('.ajax-search-form input[name=s]').on('keyup', function(e) {
				var searchvalue = e.currentTarget.value;

				clearTimeout(searchTimer);								
				if (lastAjaxSearchValue != jQuery.trim(searchvalue) && searchvalue.length >= 3) {
					searchTimer = setTimeout( function() {
						header.ajaxSearch(e);
					}, 400);
				}
			});
			
			jQuery('a.overlay-menu-link').on('click', function(e) {
				e.preventDefault();
				header.overlayMenuToggle();
			});
			
			jQuery('#overlay-menu li.menu-item a').on('click', function() {
				header.overlayMenuToggle();
			});
			
			jQuery('a.contact-menu-link').on('click', function(e) {
				e.preventDefault();
				var windowTop = $window.scrollTop();
				if (windowTop > 0) {
					jQuery('body,html').animate({scrollTop: 0}, 600, 'easeOutCubic');
					setTimeout(function() {
						jQuery('#contact-slideout').slideToggle(800, 'easeInOutExpo');
						if (jQuery(this).hasClass('slide-open')) {
							jQuery(this).removeClass('slide-open');
						} else {
							map.init();
							jQuery(this).addClass('slide-open');
						}
					}, 800);
				} else {
					jQuery('#contact-slideout').slideToggle(800, 'easeInOutExpo');
					if (jQuery(this).hasClass('slide-open')) {
						jQuery(this).removeClass('slide-open');
					} else {
						map.init();
						jQuery(this).addClass('slide-open');
					}
				}
			});	
			
			// Mobile Sticky Header
			if (body.hasClass('mh-sticky')) {
				var mobileHeader = jQuery('#mobile-header');
				
				mobileHeader.sticky({
					topSpacing: 0
				});
				
				jQuery('#mobile-header-sticky-wrapper').css('height', mobileHeader.outerHeight(true));
				
				$window.smartresize( function() {
					mobileHeader.sticky('update');
					jQuery('#mobile-header-sticky-wrapper').css('height', mobileHeader.outerHeight(true));
				});
				
			}
		},	
		stickyHeaderInit: function() {
			var spacing = 0,
				stickyHeader = jQuery('.sticky-header');
			
			if (jQuery('#wpadminbar').length > 0) {
				spacing = 32;
			}
			
			stickyHeader.sticky({
				topSpacing: spacing
			});
			
			$window.smartresize( function() {
				stickyHeader.sticky('update');
			});
			
			if (body.hasClass('layout-boxed')) {
				jQuery('.sticky-header').css('max-width', jQuery('.header-wrap').width());
				$window.smartresize( function() {
					jQuery('.sticky-header').css('max-width', jQuery('.header-wrap').width());
				});
			}
		},
		ajaxSearch: function(e) {			
			var searchInput = jQuery(e.currentTarget),
				searchValues = searchInput.parents('form').serialize() + '&action=sf_ajaxsearch',
				results = jQuery('.ajax-search-results'),
				loadingIndicator = jQuery('.ajax-search-wrap .ajax-loading'),
				ajaxurl = jQuery('.ajax-search-wrap').data('ajaxurl');
						
			jQuery.ajax({
				url: ajaxurl,
				type: "POST",
				data: searchValues,
				beforeSend: function() {
					loadingIndicator.fadeIn(50);
				},
				success: function(response) {
					if (response === 0) {
						response = "";
					} else {
						results.html(response);
					}
				},
				complete: function() {
					loadingIndicator.fadeOut(200);
					results.slideDown(400);
				}
			});
		},
		overlayMenuToggle: function() {
			var overlayMenu = jQuery('#overlay-menu'),
				overlayMenuItemHeight = Math.floor(overlayMenu.find('nav ul').height() / overlayMenu.find('ul.menu > li').length) - 5,
				overlayMenuItemFS = Math.floor(overlayMenuItemHeight * 0.5);
			
			if (overlayMenuItemFS > 60) {
				overlayMenuItemFS = 60;
			}
			
			overlayMenu.find('li').css('height', overlayMenuItemHeight + 'px').css('font-size', overlayMenuItemFS + 'px').css('line-height', overlayMenuItemHeight - 20 + 'px');
			
			if (body.hasClass('overlay-menu-open')) {
				body.removeClass('overlay-menu-open');
				body.addClass('overlay-menu-closing');
				setTimeout(function() {
					jQuery('#main-nav,#main-navigation').fadeIn(400);
				}, 200);
			} else {
				setTimeout(function() {
					body.removeClass('overlay-menu-closing');
					body.addClass('overlay-menu-open');
					jQuery('#main-nav,#main-navigation').fadeOut(300);
				}, 30);
			}
		}
	};
	
	
	/////////////////////////////////////////////
	// NAVIGATION
	/////////////////////////////////////////////
	
	var nav = {
		init: function() {
			
			// Set up Mega Menu
			if (!isMobile || $window.width() > 768) {
				nav.mainMenu();
			}
			
			// Set up Mobile Menu
			nav.mobileMenuInit();
			
			// Add main menu actions
			nav.mainMenuActions();

		},
		mainMenu: function() {
						
			jQuery("#main-navigation").find(".menu li.menu-item").hoverIntent({
				over: function() {
					if (jQuery('#container').width() > 767 || body.hasClass('responsive-fixed')) {
						jQuery(this).find('ul.sub-menu,.mega-menu-sub').first().fadeIn(200);
					}
				},
				out:function() {
					if (jQuery('#container').width() > 767 || body.hasClass('responsive-fixed')) {
						jQuery(this).find('ul.sub-menu,.mega-menu-sub').first().fadeOut(150);
					}
				},
				timeout: 0
			});
			
			// Set sub-menu position based on menu height
			var mainNav = jQuery('#main-navigation'),
				mainNavHeight = mainNav.height(),
				subMenu = mainNav.find('.sub-menu');
			
			subMenu.each(function() {
				jQuery(this).css('top', mainNavHeight);
			});
		},
		mainMenuActions: function() {
			// Add parent class to items with sub-menus
			jQuery("ul.sub-menu").parents('li').addClass('parent');
			
			// Menu parent click function
			jQuery('.menu li.parent > a').on('click', function(e) {
			
				if (jQuery('#container').width() < 1024 || body.hasClass('standard-browser')) {
					return e;
				}
				
				var directDropdown = jQuery(this).parent().find('ul.sub-menu').first();
				
				if (directDropdown.css('opacity') === '1' || directDropdown.css('opacity') === 1) {
					return e;
				} else {
					e.preventDefault();
				}
			});
			
			// Set Standard Sub Menu Top Position
			jQuery("nav.std-menu").find(".menu li").each(function() {
				var top = jQuery(this).outerHeight();
				jQuery(this).find('ul.sub-menu').first().css('top', top);
			});
			
			// Enable hover dropdowns for window size above tablet width
			jQuery("nav.std-menu").find(".menu li.parent").hoverIntent({
				over: function() {
					if (jQuery('#container').width() > 767 || body.hasClass('responsive-fixed')) {
						jQuery(this).find('ul.sub-menu').first().stop( true, true ).fadeIn(200);
					}
				},
				out:function() {
					if (jQuery('#container').width() > 767 || body.hasClass('responsive-fixed')) {
						jQuery(this).find('.sub-menu').first().stop( true, true ).fadeOut(150);
					}
				},
				timeout: 100
			});
			
			
			// Shopping bag hover function
			jQuery(document).on("mouseenter", "li.shopping-bag-item", function() {
				if (jQuery('#container').width() > 767 || body.hasClass('responsive-fixed')) {
					jQuery(this).find('ul.sub-menu').first().stop( true, true ).fadeIn(200);
				}
			}).on("mouseleave", "li.shopping-bag-item", function() {
				if (jQuery('#container').width() > 767 || body.hasClass('responsive-fixed')) {
					jQuery(this).find('ul.sub-menu').first().stop( true, true ).fadeOut(150);
				}
			});
			
			
			// Menu item click function
			jQuery('.menu-item').on('click', 'a', function(e) {
				
				var menuItem = jQuery(this),
					linkHref = menuItem.attr('href'),
					isMobileMenuItem = false,
					youtubeURL = linkHref.match(/watch\?v=([a-zA-Z0-9\-_]+)/),
					vimeoURL = linkHref.match(/^http:\/\/(www\.)?vimeo\.com\/(clip\:)?(\d+).*$/);
				
				
				if (jQuery(this).parents('nav').attr('id') === "mobile-menu") {
					isMobileMenuItem = true;
				}
				
				// Link to full width video overlay if link is YouTube/Vimeo
				if (youtubeURL || vimeoURL) {
					
					var videoURL = "";
					
					if (youtubeURL) {
						videoURL = 'http://www.youtube.com/embed/'+ youtubeURL[1] +'?autoplay=1&amp;wmode=transparent';
					} else if (vimeoURL) {
						videoURL = 'https://player.vimeo.com/video/'+ vimeoURL[3] +'?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1&amp;wmode=transparent';
					}
					
					if (videoURL !== "") {
						jQuery(this).data('video', videoURL);
						widgets.openFullWidthVideo(jQuery(this));
					}
					e.preventDefault();		
				// Smooth Scroll
				} else if (linkHref.indexOf('#') === 0 && linkHref.length > 1) {
					var headerHeight = 0;
					
					if (isMobileMenuItem) {
						nav.mobileMenuHideTrigger();
						setTimeout(function() {
							if (body.hasClass('mh-sticky')) {
								headerHeight = jQuery('#mobile-header').height();
							}
							if (jQuery('#wpadminbar').length > 0) {
								headerHeight = headerHeight + jQuery('#wpadminbar').height();
							}
												
							if (jQuery(linkHref).length > 0) {
								jQuery('html, body').stop().animate({
									scrollTop: jQuery(linkHref).offset().top - headerHeight + 2
								}, 1000, 'easeInOutExpo');
							}
						}, 400);
					} else {						
						if (jQuery('.sticky-header').length > 0) {
							headerHeight = jQuery('.sticky-header').height();
						}
						if (jQuery('#wpadminbar').length > 0) {
							headerHeight = headerHeight + jQuery('#wpadminbar').height();
						}
											
						if (jQuery(linkHref).length > 0) {
							jQuery('html, body').stop().animate({
								scrollTop: jQuery(linkHref).offset().top - headerHeight + 2
							}, 1000, 'easeInOutExpo');
						}
					}
					e.preventDefault();
				} else {
					return e;
				}
				
			});
			
			
			// Set current language to top bar item
			var currentLanguage = jQuery('li.aux-languages').find('.current-language').html();
			if (currentLanguage !== "") {
				jQuery('li.aux-languages > a').html(currentLanguage);
			}
			
			// Set menu state on resize
			$window.smartresize( function() {  
				if (jQuery('#container').width() > 767 || body.hasClass('responsive-fixed')) {
					var menus = jQuery('nav').find('ul.menu');
					menus.each(function() {
						jQuery(this).css("display", "");
					});
				}
			});
			
			// Change menu active when scroll through sections
			nav.currentScrollIndication();
			$window.scroll(function () {
				nav.currentScrollIndication();
			});
		},
		currentScrollIndication: function() {
			var adjustment = 0;
			
			if (body.hasClass('sticky-header-enabled')) {
				adjustment = jQuery('.header-wrap').height();
			}
						
			var inview = jQuery('section.row:in-viewport('+adjustment+')').attr('id'),
				menuItems = jQuery('#main-navigation .menu li a'),
				link = menuItems.filter('[href=#' + inview + ']');

			menuItems.parent().removeClass('current-scroll-item');
			
			if (link.length > 0 && !link.hasClass('.current-scroll-item')) {
				menuItems.parent().removeClass('current-scroll-item');
				link.parent().addClass('current-scroll-item');
			}
		},
		mobileMenuInit: function() {
			
			// Check if admin bar present
			if (jQuery('#wpadminbar').length > 0) {
				jQuery('#mobile-menu-wrap').css('padding-top', '46px');
				jQuery('#mobile-cart-wrap').css('padding-top', '46px');
			}
			
			// Mobile Logo click	
			jQuery('#mobile-logo > a').on('click touchstart', function(e) {
				if (body.hasClass('mobile-menu-open') || body.hasClass('mobile-cart-open') || body.hasClass('mobile-menu-closing')) {
					return false;
				} else {
					return e;
				}
			});
			
			// Mobile Nav show		
			jQuery('.mobile-menu-link').on('click', function(e) {
				e.preventDefault();
				if (body.hasClass('mobile-menu-open')) {
					nav.mobileMenuHideTrigger();
				} else {
					nav.showMobileMenu();
				}
			});
			
			// Mobile Cart show	
			jQuery('.mobile-cart-link').on('click', function(e) {
				e.preventDefault();
				if (body.hasClass('mobile-menu-open')) {
					nav.mobileMenuHideTrigger();
				} else {
					nav.showMobileCart();
				}
			});
			
			
			// Swipe to hide mobile menu
			jQuery("#mobile-menu-wrap").swipe({
				swipeLeft:function() {
					if (!body.hasClass('mobile-header-center-logo-alt') && !body.hasClass('mobile-header-left-logo')) {
						nav.mobileMenuHideTrigger();
					}
				},
				swipeRight:function() {
					if (body.hasClass('mobile-header-center-logo-alt') || body.hasClass('mobile-header-left-logo')) {
						nav.mobileMenuHideTrigger();
					}
				},
			});
			
			// Swipe to hide mobile cart
			jQuery("#mobile-cart-wrap").swipe( {
				swipeLeft:function() {
					if (body.hasClass('mobile-header-center-logo-alt') || body.hasClass('mobile-header-right-logo') || body.hasClass('mobile-header-center-logo')) {
						nav.mobileMenuHideTrigger();  
					}
				},
				swipeRight:function() {
					if (!body.hasClass('mobile-header-center-logo-alt') && !body.hasClass('mobile-header-right-logo')) {
						nav.mobileMenuHideTrigger();  
					}
				},
			});
			
			// Hide on resize
			$window.smartresize( function() {
				
				var windowWidth = $window.width();
				
				if (windowWidth > 1024 && body.hasClass('mhs-tablet-land')) {
					nav.mobileMenuHideTrigger();
				} else if (windowWidth > 991 && body.hasClass('mhs-tablet-port')) {
					nav.mobileMenuHideTrigger();
				} else if (windowWidth > 767 && body.hasClass('mhs-mobile')) {
					nav.mobileMenuHideTrigger();
				}
				
			});
			
		},
		showMobileMenu: function() {
			
			var windowTop = $window.scrollTop();			
			if (jQuery('#wpadminbar').length > 0) {
				windowTop = windowTop - jQuery('#wpadminbar').height();
			}
			if (windowTop > 0 && body.hasClass('mh-sticky')) {
				jQuery('#mobile-header').css('position', 'absolute').css('top', windowTop);
			}
			
			if (body.hasClass('header-below-slider')) {
				jQuery('#mobile-menu-wrap').css('position', 'absolute').css('top', jQuery('#container').offset().top);	
			}
			
			jQuery('#mobile-menu-wrap').css('display', 'block');
			body.addClass('mobile-menu-open');
			setTimeout(function() {
				jQuery('#container').on('click touchstart', nav.mobileMenuHideTrigger);
			}, 400);
		},
		hideMobileMenu: function() {
			var windowTop = $window.scrollTop();
			body.removeClass('mobile-menu-open');
			setTimeout(function() {
				jQuery('#mobile-menu-wrap').css('display', 'none');
				if (windowTop > 0 && body.hasClass('mh-sticky')) {
					jQuery('#mobile-header').css('position', 'fixed').css('top', '0');
				} else {
					jQuery('#mobile-header').css('position', '').css('top', '');
				}
				jQuery('#container').off('click touchstart', nav.mobileMenuHideTrigger);
			}, 300);
			setTimeout(function() {
				body.removeClass('mobile-menu-closing');
			}, 1000);
		},
		showMobileCart: function() {
			var windowTop = $window.scrollTop();
			if (jQuery('#wpadminbar').length > 0) {
				windowTop = windowTop - jQuery('#wpadminbar').height();
			}
			if (windowTop > 0 && body.hasClass('mh-sticky')) {
				jQuery('#mobile-header').css('position', 'absolute').css('top', windowTop);
			}
			
			if (body.hasClass('header-below-slider')) {
				jQuery('#mobile-cartdon-wrap').css('position', 'absolute').css('top', jQuery('#container').offset().top);	
			}
			
			jQuery('#mobile-cart-wrap').css('display', 'block');
			body.addClass('mobile-menu-open');
			body.addClass('mobile-cart-open');
			setTimeout(function() {
				jQuery('#container').on('click touchstart', nav.mobileMenuHideTrigger);
			}, 400);
		},
		hideMobileCart: function() {
			var windowTop = $window.scrollTop();
			body.removeClass('mobile-cart-open');
			setTimeout(function() {
				jQuery('#mobile-cart-wrap').css('display', 'none');
				if (windowTop > 0 && body.hasClass('mh-sticky')) {
					jQuery('#mobile-header').css('position', 'fixed').css('top', '0');
				} else {
					jQuery('#mobile-header').css('position', '').css('top', '');
				}
				jQuery('#container').off('click touchstart', nav.mobileMenuHideTrigger);
			}, 400);
			setTimeout(function() {
				body.removeClass('mobile-menu-closing');
			}, 1000);
		},
		mobileMenuHideTrigger: function() {
			body.addClass('mobile-menu-closing');
			nav.hideMobileMenu();
			nav.hideMobileCart();
		}
	};
	
	
	/////////////////////////////////////////////
	// WOOCOMMERCE FUNCTIONS
	/////////////////////////////////////////////
	
	var woocommerce = {
		init: function() {
		
			jQuery('.add_to_cart_button').on('click', function() {
				var button = jQuery(this);
				var added_text = button.attr("data-added_text");
				button.addClass("product-added");
				button.find('span').text(added_text);
				button.find('i').attr('class', 'fa-check');
			});
			
//			jQuery("body").bind("added_to_cart", function() {
//				console.log('added to cart');
//			});
						
			jQuery('.show-products-link').on('click', function(e) {
				e.preventDefault();
				var linkHref = jQuery(this).attr('href').replace('?', '');
				var currentQuery = document.location.search;
				
				if (currentQuery.indexOf('?show') >= 0) {				
					window.location = jQuery(this).attr('href');
				} else if (currentQuery.indexOf('?') >= 0) {
					window.location = currentQuery + '&' + linkHref;
				} else {
					window.location = document.location + '?' + linkHref;
				}
			});
			
			jQuery('.shipping-calculator-form input').keypress(function(e) {
				if(e.which == 10 || e.which == 13) {
					jQuery(".update-totals-button button").click();
				}
			}); 
			
			if (jQuery('.product-grid').length > 0) {
				
				if (!jQuery('.inner-page-wrap').hasClass('full-width-shop')) {
					var productGrid = jQuery('.product-grid');
					productGrid.imagesLoaded(function () {
						productGrid.equalHeights();
					});
					
					$window.smartresize( function() {
						jQuery('.product-grid').children().css('min-height','0');
						jQuery('.product-grid').equalHeights();
					});
				}
			}
		},
		load: function() {
			
			if (jQuery('.woocommerce-shop-page').hasClass('full-width-shop') && !(IEVersion && IEVersion < 9)) {
				woocommerce.fullWidthShop();
			}
			
		},
		variations: function() {
			jQuery('.variations select').each( function() {
				var variationSelect = jQuery(this);
				variationSelect.on("change", function(){
					if (jQuery('#sf-included').hasClass('has-productzoom')) {
						jQuery('.zoomContainer').remove();
						setTimeout(function() {
							jQuery('.product-slider-image').each(function() {
								jQuery(this).data('zoom-image', jQuery(this).parent().find('a.zoom').attr('href'));
							});
							var firstImage = jQuery('#product-img-slider li:first').find('.product-slider-image');
							woocommerce.productZoom(firstImage);
							jQuery('#product-img-slider').flexslider(0);
						}, 500);
					} else {
						setTimeout(function() {
							jQuery('#product-img-slider').flexslider(0);
							var flexViewport = jQuery('#product-img-slider').find('.flex-viewport'),
							flexsliderHeight = flexViewport.find('ul.slides').css('height');
							
							flexViewport.animate({
								'height': flexsliderHeight
							}, 300);
						}, 500);
					}
				});
			});
		},
		productZoom: function(zoomObject) {
			zoomObject.elevateZoom({
				zoomType: "inner",
				cursor: "crosshair",
				zoomParent: '#product-img-slider',
				responsive: true,
				zoomWindowFadeIn: 500,
				zoomWindowFadeOut: 750
			});
		},
		fullWidthShop: function() {
			var shopItems = jQuery('.full-width-shop').find('.products'),
				itemWidth = shopItems.find('div.product').first().data('width'),
				shopSidebar = shopItems.find('.sidebar');
			
			if (shopSidebar.length > 0) {
				
				// Full Width Shop Sidebar
				woocommerce.fullWidthShopSetSidebarHeight();
				$window.smartresize( function() {  
					woocommerce.fullWidthShopSetSidebarHeight();
				});
				
				shopItems.isotope({
					itemSelector: '.product',
					layoutMode: 'masonry',
					masonry: {
						columnWidth: '.'+itemWidth
					},
					isOriginLeft: !isRTL
				});
				
				woocommerce.animateItems(shopItems);
				
				shopSidebar.stop().animate({
					'opacity': 1
				}, 500);
				shopItems.isotope( 'stamp', shopSidebar );
				shopItems.isotope('layout');
					
			} else {
				
				shopItems.isotope({
					itemSelector: '.product',
					layoutMode: 'fitRows',
					isOriginLeft: !isRTL
				});
				
				woocommerce.animateItems(shopItems);
				
			}
		},
		fullWidthShopSetSidebarHeight: function() {
			var shopItems = jQuery('.full-width-shop').find('.products'),
				shopSidebar = shopItems.find('div.sidebar'),
				defaultSidebarHeight = shopSidebar.css('height', '').outerHeight(),
				newSidebarHeight = 0,
				sidebarHeightMultiply = 2,
				firstProductHeight = shopItems.find('div.product').first().outerHeight(true);
			
			sidebarHeightMultiply = Math.ceil(defaultSidebarHeight / firstProductHeight);
			newSidebarHeight = firstProductHeight * sidebarHeightMultiply;
			shopSidebar.css('height', newSidebarHeight);
		},
		animateItems: function(shopItems) {
			shopItems.find('.product').each(function(i) {
				jQuery(this).delay(i*200).animate({
					'opacity' : 1
				}, 800, 'easeOutExpo', function() {
					jQuery(this).addClass('item-animated');
				});
			});
		},
	};

	/////////////////////////////////////////////
	// FLEXSLIDER FUNCTION
	/////////////////////////////////////////////
	
	var flexSlider = {
		init: function() {
			
			var hasProductZoom = false;
			
			if (jQuery('#sf-included').hasClass('has-productzoom') && !body.hasClass('mobile-browser')) {
				hasProductZoom = true;
			}

			jQuery('#product-img-slider').flexslider({
				animation: "slide",
				controlNav: true,
				smoothHeight: true,
				animationLoop: false,
				slideshow: sliderAuto,
				slideshowSpeed: sliderSlideSpeed,           //Integer: Set the speed of the slideshow cycling, in milliseconds
				animationDuration: sliderAnimSpeed,			//Integer: Set the speed of animations, in milliseconds
				rtl: isRTL,
				start: function(productSlider) {
					if (hasProductZoom) {
						if (productSlider.slides) {
							var currentImageHasSlides = productSlider.slides.eq(productSlider.currentSlide).find('.product-slider-image');
							woocommerce.productZoom(currentImageHasSlides);
						} else {
							var currentImageNoSlides = jQuery('#product-img-slider').find('.product-slider-image');
							woocommerce.productZoom(currentImageNoSlides);
						}
					}
				},
				before: function() {
					if (hasProductZoom) {
						jQuery('.zoomContainer').remove();
					}
				},
				after: function(productSlider) {
					if (hasProductZoom) {
						var currentSlideImage = productSlider.slides.eq(productSlider.currentSlide).find('.product-slider-image');
						woocommerce.productZoom(currentSlideImage);
					}
				}
			});
			
			var flexUseCSS = true;
			
			if (isMobileAlt) {
				flexUseCSS = false;
			}
					
			jQuery('.item-slider').flexslider({
				useCSS: flexUseCSS,
				animation: "slide",              //String: Select your animation type, "fade" or "slide"
				slideDirection: "horizontal",   //String: Select the sliding direction, "horizontal" or "vertical"
				slideshow: sliderAuto,	//Boolean: Animate slider automatically
				slideshowSpeed: sliderSlideSpeed,           //Integer: Set the speed of the slideshow cycling, in milliseconds
				animationDuration: sliderAnimSpeed,			//Integer: Set the speed of animations, in milliseconds
				rtl: isRTL,
				smoothHeight: true,         
				directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
				controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
				keyboardNav: false,              //Boolean: Allow slider navigating via keyboard left/right keys
				mousewheel: false,              //Boolean: Allow slider navigating via mousewheel
				prevText: "Prev",           //String: Set the text for the "previous" directionNav item
				nextText: "Next",               //String: Set the text for the "next" directionNav item
				pausePlay: true,               //Boolean: Create pause/play dynamic element
				pauseText: '',             //String: Set the text for the "pause" pausePlay item
				playText: '',               //String: Set the text for the "play" pausePlay item
				randomize: false,               //Boolean: Randomize slide order
				slideToStart: 0,                //Integer: The slide that the slider should start on. Array notation (0 = first slide)
				animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
				pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
				pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
				controlsContainer: "",          //Selector: Declare which container the navigation elements should be appended too. Default container is the flexSlider element. Example use would be ".flexslider-container", "#container", etc. If the given element is not found, the default action will be taken.
				manualControls: "",             //Selector: Declare custom control navigation. Example would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
				start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
				before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
				after: function(){},      //Callback: function(slider) - Fires after each slider animation completes
				end: function(){}               //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
			});
			jQuery('.content-slider').each(function() {
				var slider = jQuery(this),
					autoplay = ((slider.attr('data-autoplay') === "yes") ? true : false);
				
				slider.flexslider({
					animation: "fade",              //String: Select your animation type, "fade" or "slide"
					slideshow: autoplay,	//Boolean: Animate slider automatically
					slideshowSpeed: 6000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
					animationDuration: 1000,			//Integer: Set the speed of animations, in milliseconds
					smoothHeight: false,         
					directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
					rtl: isRTL,
					controlNav: false,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
					prevText: "",           //String: Set the text for the "previous" directionNav item
					nextText: "",               //String: Set the text for the "next" directionNav item
					start: function() {
						flexSlider.slideEqualHeights();
						$window.smartresize( function() {  
							flexSlider.slideEqualHeights();
						});
					}
				});
			});
		},
		thumb: function() {			
			jQuery('.thumb-slider').flexslider({
				animation: "fade",              //String: Select your animation type, "fade" or "slide"
				slideDirection: "horizontal",   //String: Select the sliding direction, "horizontal" or "vertical"
				slideshow: sliderAuto,	//Boolean: Animate slider automatically
				slideshowSpeed: sliderSlideSpeed,           //Integer: Set the speed of the slideshow cycling, in milliseconds
				animationDuration: sliderAnimSpeed,         //Integer: Set the speed of animations, in milliseconds
				directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
				controlNav: false,               //Boolean: Create navigation for paging control of each slide? Note: Leave true for manualControls usage
				keyboardNav: false,              //Boolean: Allow slider navigating via keyboard left/right keys
				smoothHeight: false,
				rtl: isRTL
			});
		},
		slideEqualHeights: function() {
			setTimeout(function() {
				jQuery('.content-slider').find('.slide-content-wrap').css('position', 'relative');
				jQuery('.content-slider > ul').equalHeights();
				jQuery('.content-slider').find('.slide-content-wrap').vCenterTop();
				jQuery('.content-slider').find('.slide-content-wrap').css('position', 'absolute');
			}, 200);
		}
	};
	
	/////////////////////////////////////////////
	// PORTFOLIO
	/////////////////////////////////////////////
	
	var portfolioContainer = jQuery('.portfolio-wrap').find('.filterable-items');
	
	var portfolio = {
		init: function() {
			portfolioContainer.each(function() {
				var portfolioInstance = jQuery(this);
				if (portfolioInstance.hasClass('masonry-items') && !(IEVersion && IEVersion < 9)) {
					portfolio.masonrySetup(portfolioInstance);
				} else if (portfolioInstance.hasClass('multi-masonry-items') && !(IEVersion && IEVersion < 9)) {
					portfolio.multiMasonrySetup(portfolioInstance);
				} else {
					portfolio.standardSetup(portfolioInstance);
				}
			});
						
			// PORTFOLIO WINDOW RESIZE
			$window.smartresize( function() {  
				portfolio.windowResized();
			});
			
			// Enable filter options on when there are items from that skill
			jQuery('.filtering li').each( function() {
				var filter = jQuery(this),
					filterName = jQuery(this).find('a').attr('class'),
					portfolioItems = jQuery(this).parents('.portfolio-wrap').find('.filterable-items');
				
				portfolioItems.find('.portfolio-item').each( function() {
					if ( jQuery(this).hasClass(filterName) ) {
						filter.addClass('has-items');
					}
				});
			}).parents('.filtering').animate({
				opacity: 1
			}, 400);
	
			// filter items when filter link is clicked
			jQuery('.filtering li').on('click', 'a', function(e) {
				e.preventDefault();
				jQuery(this).parent().parent().find('li').removeClass('selected');
				jQuery(this).parent().addClass('selected');
				var selector = jQuery(this).data('filter');
				var portfolioItems = jQuery(this).parents('.portfolio-wrap').find('.filterable-items');
				portfolioItems.isotope({ filter: selector });				
			});  
			
			jQuery('.filter-wrap > a').on('click', function(e) {
				e.preventDefault();
				jQuery(this).parent().find('.filter-slide-wrap').slideToggle();
			});
		},
		standardSetup: function(portfolioInstance) {
			portfolioInstance.imagesLoaded(function () {
				portfolio.setItemHeight();
				flexSlider.thumb();
				portfolioInstance.animate({opacity: 1}, 800);
				portfolioInstance.isotope({
					resizable: true,
					layoutMode: 'fitRows',
					isOriginLeft: !isRTL
				});
			});
			portfolioInstance.appear(function() {
				portfolio.animateItems(portfolioInstance);
			});
		},
		masonrySetup: function(portfolioInstance) {
			portfolioInstance.imagesLoaded(function () {
				flexSlider.thumb();
				portfolioInstance.isotope({
					resizable: false, 
					itemSelector : '.portfolio-item',
					layoutMode: 'masonry',
					isOriginLeft: !isRTL
				});
			});
			portfolioInstance.appear(function() {
				portfolio.animateItems(portfolioInstance);
			});
		},
		multiMasonrySetup: function(portfolioInstance) {
			portfolioInstance.imagesLoaded(function () {
				flexSlider.thumb();
				portfolioInstance.isotope({
					resizable: false, 
					itemSelector : '.portfolio-item',
					layoutMode: 'masonry',
					masonry: {
						columnWidth: '.grid-sizer'
					},
					isOriginLeft: !isRTL
				});
			});
			portfolioInstance.appear(function() {
				portfolio.animateItems(portfolioInstance);
			});
		},
		animateItems: function(portfolioInstance) {
			portfolioInstance.find('.portfolio-item').each(function(i) {
				jQuery(this).delay(i*200).animate({
					'opacity' : 1
				}, 800, 'easeOutExpo', function() {
					jQuery(this).addClass('item-animated');
				});
			});
		},
		setItemHeight: function() {
			if (!portfolioContainer.hasClass('col-1') && !portfolioContainer.hasClass('masonry-items') && !portfolioContainer.hasClass('multi-masonry-items')) {
				portfolioContainer.children().css('min-height','0');
				portfolioContainer.equalHeights();
			}
		},
		windowResized: function() {
			if (!portfolioContainer.hasClass('col-1') && !portfolioContainer.hasClass('masonry-items') && !portfolioContainer.hasClass('multi-masonry-items')) {
				portfolio.setItemHeight();
			}
		},
		portfolioShowcaseInit: function() {
			flexSlider.thumb();
			portfolio.portfolioShowcaseWrap();
			portfolio.portfolioShowcaseItems();
			$window.smartresize( function() {
				portfolio.portfolioShowcaseWrap();
				portfolio.portfolioShowcaseItems();
			});
		},
		portfolioShowcaseWrap: function() {
			var portfolioShowcaseWrap = jQuery('.portfolio-showcase-wrap');						
			portfolioShowcaseWrap.animate({opacity: 1}, 600);
		},
		portfolioShowcaseItems: function() {
			jQuery('.portfolio-showcase-wrap').each(function() {
				
				var contWidth = jQuery('#main-container').width();
				
				if (jQuery('#container').hasClass('boxed-layout')) {
					contWidth = jQuery('#container').width();
				}
				
				var thisShowcase = jQuery(this),
					columns = thisShowcase.find('.portfolio-showcase-items').data('columns'),
					windowWidth = contWidth + 2,
					itemWidth = Math.floor(windowWidth / columns),
					maximisedWidth = Math.floor(windowWidth * 40 / 100),
					reducedWidth = Math.floor(windowWidth / 5),
					deselectedLeft = (itemWidth / 2 - maximisedWidth / 2) / 0.75,
					resetLeft = (reducedWidth / 2 - maximisedWidth / 2) / 1.3,
					isAnimating = !1,
					speed = 300;

				var showcaseItem = thisShowcase.find('li.portfolio-item');
				
				if (columns === 5) {
					maximisedWidth = Math.floor(windowWidth * 25 / 100);
					reducedWidth = Math.floor(windowWidth / 5.33);
					deselectedLeft = (itemWidth / 2 - maximisedWidth / 2) / 0.75;
					resetLeft = (reducedWidth / 2 - maximisedWidth / 2) / 1.3;
					showcaseItem.css("width", itemWidth);
					showcaseItem.css("height", maximisedWidth / 1.5);
					showcaseItem.find('.main-image').css("width", maximisedWidth);
					showcaseItem.find('.main-image').css("left", resetLeft);
					showcaseItem.find('.main-image').css("top", - maximisedWidth / 6);
					speed = 200;
				} else {
					showcaseItem.css("width", itemWidth);
					showcaseItem.css("height", maximisedWidth / 2);
					showcaseItem.find('.main-image').css("width", maximisedWidth);
					showcaseItem.find('.main-image').css("left", resetLeft);
				}
							
				showcaseItem.each(function () {
					if (windowWidth > 768) {
						jQuery(this).mouseenter(function () {
							if (!isAnimating) {
								isAnimating = !0;
								jQuery(this).removeClass("deselected-item");
								thisShowcase.find(".deselected-item").stop().animate({
									width: reducedWidth
								}, speed);
								thisShowcase.find(".deselected-item").find(".main-image").stop().animate({
									left: deselectedLeft
								}, speed);
								jQuery(this).find(".main-image").stop().animate({
									left: 0
								}, speed);
								jQuery(this).stop().animate({
									width: maximisedWidth
								}, speed + 1, function () {
									jQuery(this).find(".item-info").stop().show();
									jQuery(this).find(".item-info").stop().animate({
										bottom: 0
									}, speed, "easeInOutQuart");
								});
							}
						});
						jQuery(this).mouseleave(function () {
							if (isAnimating) {
								isAnimating = !1;
								jQuery(this).addClass("deselected-item");
								thisShowcase.find(".portfolio-item").stop().animate({
									width: itemWidth
								}, speed);
								thisShowcase.find(".portfolio-item .main-image").stop().animate({
									left: resetLeft
								}, speed);
								jQuery(this).find(".item-info").stop().animate({
									bottom: -85
								}, speed, function () {
									jQuery(this).find(".item-info").stop().hide();
								});
							}
						});
					}
				});
			});			
		},
		stickyDetails: function() {
			
			var offset = 0,
				navSelectorElement = '.media-wrap',
				footerOffset = 160;
			
			if (jQuery('.page-heading').length > 0) {
				offset += jQuery('.page-heading').outerHeight(true);
			}
			
			if (jQuery('.inner-main-container').hasClass('portfolio-type-standard')) {
				offset += 130;
			}
			
			if (jQuery('.related-projects').length > 0) {
				footerOffset = 520;
			}
			
			jQuery('.sticky-details').stickySidebar({
				headerSelector: '.header-wrap',
				navSelector: navSelectorElement,
				contentSelector: '.article-body-wrap',
				footerSelector: '#footer-wrap',
				sidebarTopMargin: 0,
				footerThreshold: footerOffset,
				offset: offset
			});
			
			jQuery('.sticky-details').css('max-width', jQuery('.sticky-details').outerWidth(true));
			
			portfolio.stickyDetailsScroll();
			$window.scroll(function() { 
				portfolio.stickyDetailsScroll();
			});
		},
		stickyDetailsScroll: function() {
			
			var contentElement = jQuery('.article-body-wrap');
			
			if (jQuery('.inner-main-container').hasClass('portfolio-type-fw-media')) {
				contentElement = jQuery('.portfolio-detail-description');
			}
			
			if (jQuery('.sticky-details').hasClass('sticky')) {
				jQuery('.sticky-details').css('margin-left', contentElement.outerWidth(true));
			} else {
				jQuery('.sticky-details').css('margin-left', 0);			
			}
		},
	};
	
	
	/////////////////////////////////////////////
	// BLOG
	/////////////////////////////////////////////
	
	var blogItems = jQuery('.blog-wrap').find('.blog-items');
	
	var blog = {
		init: function() {
		
			// BLOG ITEM SETUP
			blogItems.each(function() {
				var blogInstance = jQuery(this);
				if (blogInstance.hasClass('blog-grid-items')) {
					blog.blogGrid(blogInstance.find('.grid-items'));
				} else {
					blog.blogLayout(blogInstance);
				}
			});
			
			// Enable filter options on when there are items from that skill
			jQuery('.filtering li').each( function() {
				var filter = jQuery(this),
					filterName = jQuery(this).find('a').attr('class'),
					blogItems = jQuery(this).parents('.blog-wrap').find('.blog-items');
				
				blogItems.find('.blog-item').each( function() {
					if ( jQuery(this).hasClass(filterName) ) {
						filter.addClass('has-items');
					}
				});
			}).parents('.filtering').animate({
				opacity: 1
			}, 400);
	
			// filter items when filter link is clicked
			jQuery('.filtering li').on('click', 'a', function(e) {
				e.preventDefault();
				jQuery(this).parent().parent().find('li').removeClass('selected');
				jQuery(this).parent().addClass('selected');
				var selector = jQuery(this).data('filter');
				var blogItems = jQuery(this).parents('.blog-wrap').find('.blog-items');
				blogItems.isotope({ filter: selector });				
			});  
			
			jQuery('.filter-wrap > a').on('click', function(e) {
				e.preventDefault();
				jQuery(this).parent().find('.filter-slide-wrap').slideToggle();
			});
			
			
			// BLOG AUX SLIDEOUT
			jQuery('.blog-slideout-trigger').on('click', function(e) {
				e.preventDefault();
				
				// VARIABLES
				var blogWrap = jQuery(this).parent().parent().parent().parent();
				var filterPanel = blogWrap.find('.blog-filter-wrap .filter-slide-wrap');
				var auxType = jQuery(this).attr('data-aux');
								
				// ADD COLUMN SIZE AND REMOVE BRACKETS FROM COUNT
				blogWrap.find('.aux-list li').addClass('col-sm-2');
				blogWrap.find('.aux-list li a span').each(function() {
					jQuery(this).html(jQuery(this).html().replace("(","").replace(")",""));
				});
				
				// IF SELECTING AN OPTION THAT IS OPEN, CLOSE THE PANEL
				if (jQuery(this).parent().hasClass('selected') && !filterPanel.is(':animated')) {
					blogWrap.find('.blog-aux-options li').removeClass('selected');
					filterPanel.slideUp(400);
					return;
				}
				
				// AUX BUTTON SELECTED STATE
				blogWrap.find('.blog-aux-options li').removeClass('selected');	
				jQuery(this).parent().addClass('selected');
				
				// IF SLIDEOUT IS OPEN
				if (filterPanel.is(':visible')) {
					
					filterPanel.slideUp(400);
					setTimeout(function() {
						blogWrap.find('.aux-list').css('display', 'none');
						blogWrap.find('.aux-'+auxType).css('display', 'block');
						filterPanel.slideDown();
					}, 600);
					
				// IF SLIDEOUT IS CLOSED
				} else {
					
					blogWrap.find('.aux-list').css('display', 'none');
					blogWrap.find('.aux-'+auxType).css('display', 'block');
					filterPanel.slideDown();
					
				}
			});
			
		},
		blogLayout: function(blogInstance) {
			
			var blogType = blogInstance.data('blog-type'),
				layoutMode = 'fitRows';
			
			if (blogType === "masonry") {
				layoutMode = 'masonry';
			}
			
			if (blogType === "masonry" && blogInstance.hasClass('social-blog')) {
				var tweets = blogInstance.parent().find('.blog-tweets').html(),
					instagrams = blogInstance.parent().find('.blog-instagrams');
					
				blogInstance.imagesLoaded(function () {
					flexSlider.thumb();
					blogInstance.isotope({
						resizable: false, 
						itemSelector : '.blog-item',
						layoutMode: 'masonry',
						getSortData : {
							date : function ( elem ) {
								return jQuery(elem).data('date');
							}
						},
						sortBy: 'date',
						sortAscending: false,
						isOriginLeft: !isRTL
					});
					if (tweets !== "") {
					blogInstance.isotope('insert', jQuery(tweets));
					}
					if (instagrams.length > 0) {
					blog.masonryInstagram(instagrams, blogInstance);
					}
					blogInstance.isotope('updateSortData').isotope();
				});
				
			} else {
				blogInstance.imagesLoaded(function () {
					flexSlider.thumb();
					blogInstance.isotope({
						resizable: true,
						layoutMode: layoutMode,
						isOriginLeft: !isRTL
					});
				});
				blogInstance.appear(function() {
					blog.animateItems(blogInstance);
				});
			}
		},
		masonryInstagram: function(instagrams, blogItems) {
			var userID = instagrams.data('userid'),
				token = instagrams.data('token'),
				count = instagrams.data('count'),
				itemClass = instagrams.data('itemclass');
				
			jQuery.ajax({
				type: "GET",
				dataType: "jsonp",
				cache: false,
				url: "https://api.instagram.com/v1/users/"+userID+"/media/recent/?access_token="+token,
				success: function(data) {
					for (var i = 0; i < count; i++) {
						if (data.data[i]) {
							var caption = "";
							if (data.data[i].caption) {
								caption = data.data[i].caption.text;
							}
							instagrams.append("<li class='blog-item instagram-item "+itemClass+"' data-date='"+data.data[i].created_time+"'><a class='timestamp inst-icon' target='_blank' href='" + data.data[i].link +"'><i class='fa-instagram'></i></a><div class='inst-overlay'><a target='_blank' href='" + data.data[i].link +"'></a><h6>"+instagrams.data('title')+"</h6><h2>"+caption+"</h2><div class='name-divide'></div><data class='date timeago' title='"+data.data[i].created_time+"' value=''>"+data.data[i].created_time+"</data></div><img class='instagram-image' src='" + data.data[i].images.low_resolution.url +"' width='306px' height='306px' /></li>");  
						} 
					}
					jQuery("data.timeago").timeago();
					instagrams.imagesLoaded(function(){
						blogItems.isotope('insert', jQuery(instagrams.html()));
					});
					blogItems.isotope('updateSortData').isotope();
				}
			});
		},
		animateItems: function(blogInstance) {
			blogInstance.find('.blog-item').each(function(i) {
				jQuery(this).delay(i*200).animate({
					'opacity' : 1,
				}, 800, 'easeOutExpo', function() {
					jQuery(this).addClass('item-animated');
				});
			});
		},
		blogGrid: function(gridItems) {
			var tweets = gridItems.parent().find('.blog-tweets').html(),
				instagrams = gridItems.parent().find('.blog-instagrams');
						
			gridItems.imagesLoaded(function () {
				flexSlider.thumb();
				gridItems.isotope({
					resizable: false, 
					itemSelector : '.blog-item',
					layoutMode: 'fitRows',
					getSortData : {
						id : function ( elem ) {
							return jQuery(elem).data('sortid');
						}
					},
					sortBy: 'id',
					sortAscending: true,
					isOriginLeft: !isRTL
				});
				if (tweets !== "") {
				gridItems.isotope('insert', jQuery(tweets));
				}
				if (instagrams.length > 0) {
				blog.blogGridInstagram(instagrams, gridItems);
				}
				gridItems.isotope('updateSortData').isotope();
				blog.blogGridResize();
			}).animate({
				'opacity' : 1
			}, 800, 'easeOutExpo');
			
			$window.smartresize( function() {  
				blog.blogGridResize();
			});
			
		},
		blogGridResize: function() {
			blogItems.find('.grid-items').each(function() {
				var gridItem = jQuery(this).find('.blog-item'),
					itemWidth = gridItem.first().width();
				if (gridItem.first().hasClass('col-sm-sf-25')) {
					itemWidth = itemWidth / 2;
				}
				gridItem.css('height', itemWidth);
			});
			setTimeout(function() {
				jQuery(".tweet-text,.quote-excerpt").dotdotdot();
				blogItems.find('.grid-items').isotope('layout');			
			}, 500);
		},
		blogGridInstagram: function(instagrams, gridItems) {
			var userID = instagrams.data('userid'),
				token = instagrams.data('token'),
				count = instagrams.data('count');
				
			jQuery.ajax({
				type: "GET",
				dataType: "jsonp",
				cache: false,
				url: "https://api.instagram.com/v1/users/"+userID+"/media/recent/?access_token="+token,
				success: function(data) {
					for (var i = 0; i < count; i++) {
						if (data.data[i]) {
							var caption = "";
							if (data.data[i].caption) {
								caption = data.data[i].caption.text;
							}
							instagrams.append("<li class='blog-item col-sm-sf-5 instagram-item' data-date='"+data.data[i].created_time+"' data-sortid='"+i*2+"'><a class='timestamp inst-icon' target='_blank' href='" + data.data[i].link +"'><i class='fa-instagram'></i></a><div class='inst-img-wrap'><div class='inst-overlay'><a target='_blank' href='" + data.data[i].link +"'></a><h6>"+instagrams.data('title')+"</h6><h2>"+caption+"</h2><div class='name-divide'></div><data class='date timeago' title='"+data.data[i].created_time+"' value=''>"+data.data[i].created_time+"</data></div><img class='instagram-image' src='" + data.data[i].images.low_resolution.url +"' /></div></li>");   
						}
					}
					jQuery("data.timeago").timeago();
					blog.blogGridResize();
					instagrams.imagesLoaded(function(){
						gridItems.isotope('insert', jQuery(instagrams.html()));
						blog.blogGridResize();
					});
					gridItems.isotope('updateSortData').isotope();
				}
			});
		},
		infiniteScroll: function() {
			if (!(IEVersion && IEVersion < 9)) {
				var infScrollData = jQuery('#inf-scroll-params');
				var infiniteScroll = {
					loading: {
						img: infScrollData.data('loadingimage'),
						msgText: infScrollData.data('msgtext'),
						finishedMsg: infScrollData.data('finishedmsg')
					},
					"nextSelector":".pagenavi li.next a",
					"navSelector":".pagenavi",
					"itemSelector":".blog-item",
					"contentSelector":".blog-items"
				};
				jQuery( infiniteScroll.contentSelector ).infinitescroll(
					infiniteScroll, function(elements) {
						flexSlider.thumb();
						blogItems.fitVids();
						blogItems.imagesLoaded(function () {
							blogItems.isotope( 'appended', elements );
							jQuery.each(elements, function(i, element) {
								jQuery(element).addClass('item-animated');
							});
						});
						if (blogItems.parent().find('.pagination-wrap').hasClass('load-more')) {
							jQuery('.load-more-btn').animate({
								'opacity': 1
							}, 400);
						}
					}
				);
				if (blogItems.parent().find('.pagination-wrap').hasClass('load-more')) {
					$window.unbind('.infscr');
					jQuery('.load-more-btn').on('click', function(e) {
						e.preventDefault();					
						jQuery( infiniteScroll.contentSelector ).infinitescroll('retrieve');
						jQuery('.load-more-btn').animate({
							'opacity': 0
						}, 400);
					});
				}
			} else {
				jQuery('.pagination-wrap').removeClass('hidden');
			}
		}
	};
	
	/////////////////////////////////////////////
	// GALLERIES
	/////////////////////////////////////////////
	
	var galleriesContainer = jQuery('.galleries-wrap').find('.filterable-items');
	
	var galleries = {
		init: function() {
			galleriesContainer.each(function() {
				var galleriesInstance = jQuery(this);
				if (galleriesInstance.hasClass('masonry-items')) {
					galleries.masonrySetup(galleriesInstance);
				} else {
					galleries.standardSetup(galleriesInstance);
				}
			});
						
			// PORTFOLIO WINDOW RESIZE
			$window.smartresize( function() {  
				galleries.windowResized();
			});
			
			// Enable filter options on when there are items from that skill
			jQuery('.filtering li').each( function() {
				var filter = jQuery(this),
					filterName = jQuery(this).find('a').attr('class'),
					galleryItems = jQuery(this).parents('.galleries-wrap').find('.filterable-items');
				
				galleryItems.find('.gallery-item').each( function() {
					if ( jQuery(this).hasClass(filterName) ) {
						filter.addClass('has-items');
					}
				});
			}).parents('.filtering').animate({
				opacity: 1
			}, 400);
	
			// filter items when filter link is clicked
			jQuery('.filtering li').on('click', 'a', function(e) {
				e.preventDefault();
				jQuery(this).parent().parent().find('li').removeClass('selected');
				jQuery(this).parent().addClass('selected');
				var selector = jQuery(this).data('filter');
				var galleryItems = jQuery(this).parents('.galleries-wrap').find('.filterable-items');
				galleryItems.isotope({ filter: selector });				
			});  
		},
		standardSetup: function(galleryInstance) {
			galleryInstance.imagesLoaded(function () {
				galleries.setItemHeight();
				galleryInstance.animate({opacity: 1}, 800);
				galleryInstance.isotope({
					resizable: true,
					layoutMode: 'fitRows',
					isOriginLeft: !isRTL
				});
			});
			galleryInstance.appear(function() {
				galleries.animateItems(galleryInstance);
			});
		},
		masonrySetup: function(galleryInstance) {
			galleryInstance.imagesLoaded(function () {
				galleryInstance.isotope({
					resizable: false, 
					itemSelector : '.gallery-item',
					layoutMode: 'masonry',
					isOriginLeft: !isRTL
				});
			});
			galleryInstance.appear(function() {
				galleries.animateItems(galleryInstance);
			});
		},
		animateItems: function(galleryInstance) {
			galleryInstance.find('.gallery-item').each(function(i) {
				jQuery(this).delay(i*200).animate({
					'opacity' : 1
				}, 800, 'easeOutExpo', function() {
					jQuery(this).addClass('item-animated');
				});
			});
		},
		setItemHeight: function() {
			if (!galleriesContainer.hasClass('col-1') && !galleriesContainer.hasClass('masonry-items')) {
				galleriesContainer.children().css('min-height','0');
				galleriesContainer.equalHeights();
			}
		},
		windowResized: function() {
			if (!galleriesContainer.hasClass('col-1') && !galleriesContainer.hasClass('masonry-items')) {
				galleries.setItemHeight();
			}
		},
	};
	
	
	/////////////////////////////////////////////
	// GALLERY
	/////////////////////////////////////////////
	
	var gallery = {
		init: function() {
			
			jQuery('.spb_gallery_widget').each(function() {
				if (jQuery(this).hasClass('gallery-masonry')) {
					gallery.galleryMasonry(jQuery(this));
				} else if (jQuery(this).hasClass('gallery-slider')) {
					gallery.gallerySlider(jQuery(this));
				}
			});
		},
		galleryMasonry: function(element) {
			element.imagesLoaded(function () {
				element.isotope({
					resizable: false, 
					itemSelector : '.gallery-image',
					layoutMode: 'masonry',
					isOriginLeft: !isRTL
				});
			});
			element.appear(function() {
				gallery.animateItems(element);
			});
		},
		animateItems: function(element) {
			element.find('.gallery-image').each(function(i) {
				jQuery(this).delay(i*200).animate({
					'opacity' : 1
				}, 800, 'easeOutExpo', function() {
					jQuery(this).addClass('item-animated');
				});
			});
		},
		gallerySlider: function(element) {
				
			var gallerySlider = element.find('.gallery-slider'),
				galleryNav = element.find('.gallery-nav'),
				galleryAuto = gallerySlider.data('autoplay');
			
			if (galleryAuto === "yes") {
				galleryAuto = true;
			} else {
				galleryAuto = false;
			}
				
			galleryNav.flexslider({
				animation: "slide",
				directionNav: true,
				controlNav: false,
				animationLoop: false,
				slideshow: false,
				itemWidth: 100,
				itemMargin: 30, 
				rtl: isRTL,
				asNavFor: gallerySlider
			});
				
			gallerySlider.flexslider({
				animation: gallerySlider.data('transition'),
				slideshow: galleryAuto,
				slideshowSpeed: sliderSlideSpeed,           //Integer: Set the speed of the slideshow cycling, in milliseconds
				animationDuration: sliderAnimSpeed,         //Integer: Set the speed of animations, in milliseconds
				controlNav: false,
				animationLoop: false,
				rtl: isRTL,
				sync: galleryNav
			});
		
		}
	};
	
	
	/////////////////////////////////////////////
	// RECENT POSTS
	/////////////////////////////////////////////
	
	var recentPosts = {
		init: function() {
			
			// TEAM EQUAL HEIGHTS
			var recentPosts = jQuery('.recent-posts:not(.carousel-items,.posts-type-list)');
			recentPosts.imagesLoaded(function () {
				flexSlider.thumb();
				recentPosts.equalHeights();
			});
			
			// TEAM ASSETS
			$window.smartresize( function() {
				jQuery('.recent-posts:not(.carousel-items,.posts-type-list)').children().css('min-height','0');
				jQuery('.recent-posts:not(.carousel-items,.posts-type-list)').equalHeights();
			});
		}
	};
	
	
	/////////////////////////////////////////////
	// CAROUSEL FUNCTIONS
	/////////////////////////////////////////////
	
	var carouselWidgets = {
		init: function() {
	
			// CAROUSELS
			var carousel = jQuery('.carousel-items'),
				carouselAuto = sfOptionParams.data('carousel-autoplay'),
				carouselPSpeed = sfOptionParams.data('carousel-pagespeed'),
				carouselSSpeed = sfOptionParams.data('carousel-slidespeed'),
				carouselPagination = sfOptionParams.data('carousel-pagination'),
				carouselPDirection = 'ltr',
				desktopWidth = 1199;
			
			if (body.hasClass('vertical-header')) {
				desktopWidth = desktopWidth + jQuery('#header-section').width();
			}
			
			if (carouselAuto) {
				carouselAuto = true;
			} else {
				carouselAuto = false;
			}	
			if (carouselPagination) {
				carouselPagination = true;
			} else {
				carouselPagination = false;
			}
			if (isRTL) {
				carouselPDirection = 'rtl';
			}
			
			carousel.each(function() {
				var carouselInstance = jQuery('#'+jQuery(this).attr('id')),
					carouselColumns = parseInt(carouselInstance.attr("data-columns"), 10);
				
				carouselInstance.imagesLoaded(function () {
					
					if (!carouselInstance.hasClass('no-gutters')) {
						var carouselWidth = carouselInstance.width();
						if (isRTL) {
						carouselInstance.css('margin-right', '-15px').css('width', carouselWidth + 30);
						} else {
						carouselInstance.css('margin-left', '-15px').css('width', carouselWidth + 30);
						}
					}
										
					carouselInstance.owlCarousel({
						items : carouselColumns,
						itemsDesktop: [desktopWidth,4],
						itemsDesktopSmall: [desktopWidth-220,3],
						paginationSpeed: carouselPSpeed,
						slideSpeed: carouselSSpeed,
						autoPlay: carouselAuto,
						autoPlayDirection : carouselPDirection,
						pagination: carouselPagination,
						autoHeight : true,
						beforeUpdate: function() {
							if (!carouselInstance.hasClass('no-gutters')) {
								carouselInstance.css('width', '');
								var carouselWidth = carouselInstance.width();
								carouselInstance.css('width', carouselWidth + 30);
							}
						},
						afterUpdate: function () {
							carouselInstance.find('.flex-active-slide').resize();
							//carouselWidgets.carouselMinHeight(carouselInstance);
						},
						afterInit: function() {
							flexSlider.thumb();
							carouselInstance.find('.flex-active-slide').resize();
							//carouselWidgets.carouselMinHeight(carouselInstance);
							carouselInstance.find('.owl-wrapper-outer').css('height', carouselInstance.find('.owl-wrapper').height());
						}
					}).animate({
						'opacity': 1
					},800);
				});
			});		
			
			// Previous
			jQuery('.carousel-next').click( function(e) {
				e.preventDefault();
				var carousel = jQuery(this).closest('.spb_content_element').find('.owl-carousel');
				if (isRTL) {
				carousel.data( 'owlCarousel' ).prev();
				} else {
				carousel.data( 'owlCarousel' ).next();
				}
			});
	
			// Next
			jQuery('.carousel-prev').click( function(e) {
				e.preventDefault();
				var carousel = jQuery(this).closest('.spb_content_element').find('.owl-carousel');
				if (isRTL) {
				carousel.data( 'owlCarousel' ).next();
				} else {
				carousel.data( 'owlCarousel' ).prev();
				}
			});	
		},
		carouselSwipeIndicator: function(carousel) {
			carousel.appear(function() {
				var swipeIndicator = jQuery(this).parents('.carousel-wrap').find('.sf-swipe-indicator');
				setTimeout(function() {
					swipeIndicator.fadeIn(500);
				}, 400);
				setTimeout(function() {
					swipeIndicator.addClass('animate');
				}, 1000);
				setTimeout(function() {
					swipeIndicator.fadeOut(400);	
				}, 3000);
			});
		},
		carouselMinHeight: function(carousel) {
			var minHeight = parseInt(carousel.find('.carousel-item:not(.no-thumb)').eq(0).css('height'));
			carousel.find('.owl-item').each(function () {
				jQuery(this).css('min-height',minHeight+'px');
			});
		}
	};

	
	/////////////////////////////////////////////
	// WIDGET FUNCTIONS
	/////////////////////////////////////////////
	
	var widgets = {
		init: function() {
			
			// CHARTS
			if (sfIncluded.hasClass('has-chart')) {
				jQuery('.chart-shortcode').each(function(){
					jQuery(this).easyPieChart({
						animate: 1000,
						lineCap: 'round',
						lineWidth: jQuery(this).attr('data-linewidth'),
						size: jQuery(this).attr('data-size'),
						barColor: jQuery(this).attr('data-barcolor'),
						trackColor: jQuery(this).attr('data-trackcolor'),
						scaleColor: 'transparent'
					});
				});
			}
			
			// LOAD WIDGETS
			widgets.accordion();
			widgets.tabs();
			widgets.toggle();
			widgets.fullWidthVideo();
			widgets.introAnimations();
			widgets.iconBoxes();
			widgets.countAssets();
			
			if (sfIncluded.hasClass('has-countdown')) {
			widgets.countdownAssets();
			}
			
			if (sfIncluded.hasClass('has-imagebanner')) {
			widgets.imageBanners();
			}			

			// SF TOOLTIPS
			jQuery('[rel=tooltip]').tooltip();
			
			// DYNAMIC TABS
			jQuery('.tabs-type-dynamic .menu-icon').hover(function() {
				jQuery(this).parents('.nav-tabs').addClass('show-tabs');
			});
			
			jQuery('.tabs-type-dynamic').mouseleave(function() {
				jQuery(this).find('.nav-tabs').removeClass('show-tabs');
			});
			
		},
		accordion: function() {
			jQuery('.spb_accordion').each(function() {
				var spb_tabs,				
					active_tab = false,
					active_attr = parseInt(jQuery(this).attr('data-active'), 10);
							
				if (jQuery.type( active_attr ) === "number") { active_tab = active_attr; }
							
				spb_tabs = jQuery(this).find('.spb_accordion_wrapper').accordion({
					header: "> div > h4",
					autoHeight: true,
					collapsible: true,
					active: active_tab,
					heightStyle: "content"
				});
			}).fadeIn(400);
		},
		tabs: function() {
			// SET ACTIVE TABS PANE
			jQuery('.spb_tabs').each(function() {
				jQuery(this).find('.tab-pane').first().addClass('active');
				jQuery(this).find('.tab-pane').removeClass('load');
			});
			
			// SET ACTIVE TOUR PANE
			jQuery('.spb_tour').each(function() {
				jQuery(this).find('.tab-pane').first().addClass('active');
				jQuery(this).find('.tab-pane').removeClass('load');
			});
		},
		toggle: function() {
			jQuery('.spb_toggle').click(function() {
				if ( jQuery(this).hasClass('spb_toggle_title_active') ) {
					jQuery(this).removeClass('spb_toggle_title_active').next().slideUp(500);
				} else {
					jQuery(this).addClass('spb_toggle_title_active').next().slideDown(500);
				}
			});
			jQuery('.spb_toggle_content').each(function() {
				if ( jQuery(this).next().is('h4.spb_toggle') === false ) {
					jQuery('<div class="last_toggle_el_margin"></div>').insertAfter(this);
				}
			});
		},
		initSkillBars: function() {		
			// SKILL BARS
			widgets.animateSkillBars();			
			$window.scroll(function() { 
				widgets.animateSkillBars();
			});
		},
		animateSkillBars: function() {
			jQuery('.progress:not(.animated)').each(function(){
				var progress = jQuery(this);
				
				progress.appear(function() {
					var progressBar = jQuery(this),
					progressValue = progressBar.find('.bar').data('value');
					progressBar.addClass('animated');
					progressBar.find('.bar').animate({
						width: progressValue + "%"
					}, 800, function() {
						progressBar.parent().find('.bar-text').css('width', progressValue + "%");
						progressBar.parent().find('.bar-text .progress-value').fadeIn(600);
					});
				});
			});
		},
		charts: function() {
			widgets.animateCharts();
			$window.scroll(function() { 
				widgets.animateCharts();
			});	
		},
		animateCharts: function() {
			jQuery('.chart-shortcode').each(function(){
				var chart = jQuery(this);
				chart.appear(function() {
					if (!jQuery(this).hasClass('animated')) {
						jQuery(this).addClass('animated');
						var animatePercentage = parseInt(jQuery(this).attr('data-animatepercent'), 10);
						jQuery(this).data('easyPieChart').update(animatePercentage);
					}
				});
			});
		},
		fullWidthVideo: function() {			
			jQuery('.fw-video-link').unbind().on({
				'click':function(){
					if (jQuery(this).data('video') !== "") {
					widgets.openFullWidthVideo(jQuery(this));
					}
					return false;
				}
			});
			
			jQuery('.fw-video-close').unbind().on({
				'click':function(){
					widgets.closeFullWidthVideo();
				}
			});
		},
		openFullWidthVideo: function(element) {
			jQuery('.fw-video-close').addClass('is-open');
			jQuery('.fw-video-spacer').animate({
				height: windowheight
			}, 1000, 'easeInOutExpo');
			
			jQuery('.fw-video-area').css('display', 'block').animate({
				top: 0,
				height: '100%'
			}, 1000, 'easeInOutExpo', function() {
				// load video here
				jQuery('.fw-video-area > .fw-video-wrap').append('<iframe class="fw-video" src="'+element.data('video')+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>');
			});
		},
		closeFullWidthVideo: function() {
			jQuery('.fw-video-close').removeClass('is-open');
			jQuery('.fw-video-spacer').animate({
				height: 0
			}, 1000, 'easeInOutExpo', function(){
			});
			jQuery('.fw-video-area').animate({
				top:'-100%'
			}, 1000, 'easeInOutExpo', function() {
				jQuery('.fw-video-area').css('display', 'none');
				jQuery('.fw-video-area .fw-video').remove();
			});
			
			// pause videos
			jQuery('.fw-video-area video').each(function(){
				this.pause();
			});
			setTimeout(function() {
				jQuery('.fw-video-area').find('iframe').remove();
			}, 1500);
			
			return false;
		},
		introAnimations: function() {
			
			if (!isMobileAlt) {
				jQuery('.sf-animation').each(function() {
	
					var animatedItem = jQuery(this),
						itemAnimation = animatedItem.data('animation'),
						itemDelay = animatedItem.data('delay');
										
					animatedItem.appear(function() {				
						if (itemAnimation == 'fade-from-left') {
							animatedItem.delay(itemDelay).animate({
								'opacity' : 1,
								'left' : '0px'
							}, 800, 'easeOutCubic');
						} else if (itemAnimation == 'fade-from-right') {
							animatedItem.delay(itemDelay).animate({
								'opacity' : 1,
								'right' : '0px'
							}, 800, 'easeOutCubic');
						} else if(itemAnimation == 'fade-from-bottom') {
							if (animatedItem.hasClass('image-banner-content')) {
								animatedItem.delay(itemDelay).animate({
									'opacity' : 1,
									'bottom' : '50%'
								}, 1000, 'easeOutCubic');
							} else {
								animatedItem.delay(itemDelay).animate({
									'opacity' : 1,
									'bottom' : '0px'
								}, 800, 'easeOutCubic');
							}
						} else if (itemAnimation == 'fade-in') {
							animatedItem.delay(itemDelay).animate({
								'opacity' : 1
							}, 800, 'easeOutCubic');
						} else if (itemAnimation == 'grow') {
							setTimeout(function(){ 
								animatedItem.addClass('sf-animate');
							}, itemDelay);
						} else {
							setTimeout(function() {
								animatedItem.addClass('sf-animate');						
							}, itemDelay);
						}
					}, {accX: 0, accY: -150}, 'easeInCubic');
				
				});
			}
		},
		iconBoxes: function() {
			if (isMobileAlt) {
				jQuery('.sf-icon-box').on('click', function() {
					jQuery(this).addClass('sf-mobile-hover');
				});
			} else {
				jQuery('.sf-icon-box').hover(
					function() {
						jQuery(this).addClass('sf-hover');
					}, function() {
						jQuery(this).removeClass('sf-hover');
					}
				);
			}
		},
		countAssets: function() {
			jQuery('.sf-count-asset').each(function() {

				var countAsset = jQuery(this),
					countNumber = countAsset.find('.count-number'),
					countDivider = countAsset.find('.count-divider').find('span'),
					countSubject = countAsset.find('.count-subject');
				
				countNumber.fitText(0.4, { minFontSize: '16px', maxFontSize: '62px' });
				
				if (!isMobileAlt) {						
					countAsset.appear(function() {				
					
						countNumber.countTo({
							onComplete: function () {
								countDivider.animate({
									'width': 50
								}, 400, 'easeOutCubic');
								countSubject.delay(100).animate({
									'opacity' : 1,
									'bottom' : '0px'
								}, 600, 'easeOutCubic');
							}
						});
						
					}, {accX: 0, accY: -150}, 'easeInCubic');
				} else {
					countNumber.countTo({
						onComplete: function () {
							countDivider.animate({
								'width': 50
							}, 400, 'easeOutCubic');
							countSubject.delay(100).animate({
								'opacity' : 1,
								'bottom' : '0px'
							}, 600, 'easeOutCubic');
						}
					});
				}
			
			});
		},
		countdownAssets: function() {
			jQuery('.sf-countdown').each(function() {
				var countdownInstance = jQuery(this),
					year = parseInt(countdownInstance.data('year'), 10),
					month = parseInt(countdownInstance.data('month'), 10),
					day = parseInt(countdownInstance.data('day'), 10),
					countdownDate = new Date(year, month - 1, day);
				
				var labelStrings = jQuery('#countdown-locale'),
					pluralLabels = [labelStrings.data('label_years'),labelStrings.data('label_months'),labelStrings.data('label_weeks'),labelStrings.data('label_days'),labelStrings.data('label_hours'),labelStrings.data('label_mins'),labelStrings.data('label_secs')],
					singularLabels = [labelStrings.data('label_year'),labelStrings.data('label_month'),labelStrings.data('label_week'),labelStrings.data('label_day'),labelStrings.data('label_hour'),labelStrings.data('label_min'),labelStrings.data('label_sec')];
				
				countdownInstance.countdown({
					until: countdownDate,
					since: null,
					format: 'dHMS',
					labels: pluralLabels,
					labels1: singularLabels,
					onExpiry: function() {
						setTimeout(function() {
							countdownInstance.fadeOut(500);						
						}, 1000);
					}
				});
			});
		},
		imageBanners: function() {
			jQuery('.sf-image-banner').each(function() {
				jQuery(this).find('.image-banner-content').vCenter();
			});
		}
	};
	
	
	/////////////////////////////////////////////
	// TEAM MEMBERS FUNCTION
	/////////////////////////////////////////////
	
	var teamMembers = {
		init: function() {
			// TEAM EQUAL HEIGHTS
			var team = jQuery('.team-members:not(.carousel-items)');
			team.imagesLoaded(function () {
				if ($window.width() > 767) {
					team.equalHeights();
				}
			});
			
			// TEAM ASSETS
			$window.smartresize( function() {
				jQuery('.team-members:not(.carousel-items)').children().css('min-height','0');
				if ($window.width() > 767) {
					jQuery('.team-members:not(.carousel-items)').equalHeights();
				}
			});
		}
	};
	
	/////////////////////////////////////////////
	// RELATED POSTS FUNCTION
	/////////////////////////////////////////////
	
	var relatedPosts = {
		init: function() {
			// TEAM EQUAL HEIGHTS
			var relatedItems = jQuery('.related-items');
			relatedItems.imagesLoaded(function () {
				if ($window.width() > 767) {
					relatedItems.equalHeights();
				}
			});
			
			// TEAM ASSETS
			$window.smartresize( function() {
				jQuery('.related-items').children().css('min-height','0');
				if ($window.width() > 767) {
					jQuery('.related-items').equalHeights();
				}
			});
		}
	};
	
	/////////////////////////////////////////////
	// PARALLAX FUNCTION
	/////////////////////////////////////////////
	
	var parallax = {
		init: function() {
			
			jQuery('.spb_parallax_asset').each(function() {
				
				var parallaxAsset = jQuery(this);
				
				if (parallaxAsset.hasClass('sf-parallax-video')) {
				
					if (!isMobileAlt) {
						parallax.parallaxVideoInit();
					} else {
						parallaxAsset.find('video').remove();
					}
					
					// Add resize handler
					$window.smartresize( function() {
						parallax.parallaxVideoResize(parallaxAsset);
					});
					
				} else if (parallaxAsset.hasClass('parallax-window-height')) {
					
					var assetHeight = $window.height();
					
					if (parallaxAsset.height() > assetHeight) {
						assetHeight = parallaxAsset.height();
					}
					
					
					parallaxAsset.height(assetHeight - (parseInt(parallaxAsset.css('padding-top'), 10) * 2));
					if (parallaxAsset.data('v-center') === "true") {
						parallaxAsset.find('div:first').vCenterTop();
					}
					
					// Fade in
					parallaxAsset.transition({
						opacity: 1
					}, 300);
					
					// Add resize handler
					$window.smartresize( function() {
						parallax.windowImageResize(parallaxAsset);
					});
				}
			});
		},
		load: function() {
			jQuery('.spb_parallax_asset.parallax-stellar').each(function() {
				var parallaxAsset = jQuery(this),
					parallaxSpeed = parseInt(parallaxAsset.data('parallax-speed'));
				
				parallaxAsset.parallax(parallaxSpeed);
			});
		},
		videoScroll: function(asset) {
			
			var offsetTop = asset.offset().top,
				windowTop = $window.scrollTop(),
				defaultHeight = parseInt(asset.data('height-default'), 10),
				diff = windowTop - offsetTop,
				currentTop = asset.find('.spb_content_wrapper').css('top'),
				heightDifference = defaultHeight - diff * 1.5;
				
			if (windowTop > offsetTop) {	
				asset.css('height', heightDifference); 
				asset.find('.spb_content_wrapper').css('opacity', 1 - (diff / 300));
				if (asset.hasClass('parallax-window-height') && asset.data('v-center') === "true") {
				asset.find('.spb_content_wrapper').css('top', currentTop + (diff / 4));
				} else if (asset.data('v-center') === "true") {
				asset.find('.spb_content_wrapper').css('top', (diff / 3));
				}
			} else {	
				asset.css('height', defaultHeight);
				asset.find('.spb_content_wrapper').css('opacity', 1);
				if (asset.hasClass('parallax-video-height') && asset.data('v-center') === "true") {
				asset.find('.spb_content_wrapper').css('top', '50%');
				} else {
				asset.find('.spb_content_wrapper').css('top', 0);				
				}
			}
				
		},
		windowImageResize: function(asset) {
		
			if (asset.hasClass('spb-row-container')) {
				
				var rowContentHeight = asset.find('> .spb_content_element').height();
				
				if (asset.hasClass('parallax-window-height')) {
					
					if (rowContentHeight < $window.height()) {
						rowContentHeight = $window.height();
					}
				}
				
				asset.height(rowContentHeight);
				
				if (asset.data('v-center')) {
				asset.find('> .spb_content_element').vCenterTop();
				}
				
			} else {
				
				var assetHeight = asset.height();
				
				if (asset.hasClass('parallax-window-height')) {
					
					if (assetHeight < $window.height()) {
						assetHeight = $window.height();
					}
				}
				
				asset.height(assetHeight - asset.css('padding-top') / 2);
				asset.find('.spb_content_wrapper').vCenterTop();
			}
			
		},
		parallaxVideoInit: function() {
			jQuery('.spb_parallax_asset.sf-parallax-video').each(function() {
				var parallaxAsset = jQuery(this),
					parallaxVideo = parallaxAsset.find('video'),
					parallaxVideoWidth = parallaxVideo.width(),
					parallaxContent = parallaxAsset.find('div:first'),
					parallaxAssetHeight = 0;
								
				if (parallaxAsset.hasClass('parallax-window-height')) {
					
					if (parallaxContent.height() > $window.height()) {
						parallaxAssetHeight = parallaxContent.height();
					} else {
						parallaxAssetHeight = $window.height();
					}
					
					parallaxAsset.animate({
						'height': parallaxAssetHeight
					}, 400, function() {
					
						// Scale video
						parallax.scaleVideo(parallaxAsset);
						
						// Fade in
						parallaxAsset.transition({
							opacity: 1
						}, 300);
						
					});
					
					setTimeout(function() {
						parallaxAsset.find('.video-overlay').animate({
							'opacity': 0.8
						}, 200);
					}, 100);
					
					if (parallaxAsset.data('v-center') === "true") {
					parallaxContent.vCenterTop();
					}
					
					setTimeout(function() {
						parallaxContent.animate({
							'opacity': 1,
							'top': '50%'
						}, 600, 'easeOutExpo');
					}, 600);
					
					parallaxAsset.attr('data-height-default', parallaxVideo.height()); 
					
				} else {
					parallax.scaleVideo(parallaxAsset);
				}
								
				if ($window.width() < parallaxVideoWidth) {
					parallaxVideo.css('left', - (parallaxVideoWidth - $window.width()) /2);
				}
				
			});
		},
		parallaxVideoResize: function(parallaxAsset) {
			var parallaxContent = parallaxAsset.find('div:first'),
				parallaxAssetHeight = 0;
			
			if (parallaxAsset.hasClass('parallax-window-height')) {
				if (parallaxContent.height() > $window.height()) {
					parallaxAssetHeight = parallaxContent.height();
				} else {
					parallaxAssetHeight = $window.height();
				}
				
				parallaxAsset.animate({
					'height': parallaxAssetHeight
				}, 400);
				
				if (parallaxAsset.data('v-center') === "true") {
				parallaxContent.vCenterTop();
				}			
			}
			
			parallax.scaleVideo(parallaxAsset);
		},
		scaleVideo: function(parallaxAsset) {
			
			var video = parallaxAsset.find('video'),
				assetHeight = parallaxAsset.outerHeight(),
				assetWidth = parallaxAsset.width(),
				videoWidth = video[0].videoWidth,
				videoHeight = video[0].videoHeight;
						
			// Use the largest scale factor of horizontal/vertical
			var scale_h = assetWidth / videoWidth;
			var scale_v = assetHeight / videoHeight; 
			var scale = scale_h > scale_v ? scale_h : scale_v;
			
			// Update minium width to never allow excess space
			var min_w = videoWidth/videoHeight * (assetHeight+20);
			
			// Don't allow scaled width < minimum video width
			if (scale * videoWidth < min_w) {scale = min_w / videoWidth;}
			
			// Scale the video
			video.width(Math.ceil(scale * videoWidth +2));
			video.height(Math.ceil(scale * videoHeight +50));
			video.css('top', - (video.height() - assetHeight) /2);
			video.css('margin-left', - (video.width() - assetWidth) /2);
		},
		
	};
	
	
	
	/////////////////////////////////////////////
	// MAP FUNCTIONS
	/////////////////////////////////////////////
	
	var infowindow, bounds, directory_bounds, mapTypeIdentifier = "", mapType, mapColor, mapSaturation, companyPos = "", isDraggable = true, latitude, longitude, mapCoordinates, markersArray = [];
	
	var map = {
		init:function() {
			
			var maps = jQuery('.map-canvas');
			var mapContainer;
			
			if (google) {
				bounds = new google.maps.LatLngBounds();
			}
			
			maps.each(function(i, element) {
				mapContainer = element;
				var mapZoom = mapContainer.getAttribute('data-zoom');
				
				mapType = mapContainer.getAttribute('data-maptype');
				mapColor = mapContainer.getAttribute('data-mapcolor');
				mapSaturation = mapContainer.getAttribute('data-mapsaturation');
				
				map.directoryMap( mapContainer, mapZoom, mapType, mapColor, mapSaturation, jQuery(this));
			});
			 
		},
		getLatLong: function(address, fn) {
			var geocoder;
			geocoder = new google.maps.Geocoder();	
			geocoder.geocode( { 'address': address}, function(results, status) {
				fn(results[0].geometry.location, results[0].geometry.location.lat(), results[0].geometry.location.lng()); 
			});
		},
		addWinContent: function(marker, html, map) {
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.setContent(html);
				infowindow.open(map, marker);
			});	
		},
		addMarker: function(mapInstance, pinLogoURL, pinTitle, pinContent, pinLink, address, pinButtonText) {
			var companyMarker;

			mapCoordinates = new google.maps.LatLng(latitude, longitude);	

			if (pinLogoURL) {					
				companyPos = new google.maps.LatLng(latitude, longitude);
				companyMarker = new google.maps.Marker({
					position: mapCoordinates,
					map: mapInstance,
					icon: pinLogoURL,
					animation: google.maps.Animation.DROP });
			} else {
				companyPos = new google.maps.LatLng(latitude, longitude);
				companyMarker = new google.maps.Marker({
					position: mapCoordinates,
					map: mapInstance,
					animation: google.maps.Animation.DROP });  
			}
			
			var html = '<div class="pinmarker">';
			if (pinTitle !== "") {
			html += '<h3>'+pinTitle+'</h3>';
			}
			if (pinContent !== "") {
			html += '<p>'+pinContent+' </p>';
			}
			if (pinLink !== "" && pinButtonText !== "") {
			html += '<div><a href="http://' + pinLink + '" target="_blank">'+pinButtonText+'</a></div>';
			}
			html += '</div>';
											
			infowindow = new google.maps.InfoWindow();
			map.addWinContent(companyMarker, html, mapInstance);
			bounds.extend(mapCoordinates);
		},
		directoryMap: function(mapContainer, mapZoom, mapType, mapColor, mapSaturation, targetMap) {
			
			if (google) {
				directory_bounds = new google.maps.LatLngBounds();
			}	
			
			var pinLogoURL = "", mapLightness = false;
								
			if (mapSaturation == "mono-light") {
				if (mapColor === "") {
					mapColor = "#ffffff";
				}
				mapSaturation = -100;
			} else if (mapSaturation == "mono-dark") {
				if (mapColor === "") {
					mapColor = "#222222";
				}
				mapSaturation = -100;
				mapLightness = true;
			} else {
				mapSaturation = -20;
			}
			
			var styles = [   
				{
					stylers: [
						{hue: mapColor},
						{"invert_lightness": mapLightness},
						{saturation: mapSaturation}
					]
				}
			];
			
			var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});  
									
			if (isMobileAlt) {
			isDraggable = false;
			}
			
			if (mapType === "satellite") {
			mapTypeIdentifier = google.maps.MapTypeId.SATELLITE;
			} else if (mapType === "terrain") {
			mapTypeIdentifier = google.maps.MapTypeId.TERRAIN;
			} else if (mapType === "hybrid") {
			mapTypeIdentifier = google.maps.MapTypeId.HYBRID;
			} else {
			mapTypeIdentifier = google.maps.MapTypeId.ROADMAP;
			}
			
			var settings = {
				scrollwheel: false,
				draggable: isDraggable,
				mapTypeControl: true,
				mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
				navigationControl: true,
				navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
				mapTypeId: mapTypeIdentifier
			};
			
			var mapInstance = new google.maps.Map(mapContainer, settings);
			var pinTitle, pinContent, pinLink, address, pinButtonText;
			var pincount = targetMap.parent().find('.pin_location').length;
			
			//Resize Window Responsiveness
			google.maps.event.addDomListener(window, 'resize', function() {		
				mapInstance.fitBounds(bounds);
				mapInstance.setZoom(parseInt(mapZoom, 10));
			});
			
			console.log(mapZoom);
			bounds = new google.maps.LatLngBounds();
			targetMap.parent().find('.pin_location').each(function(i, element) {
		
				pinLogoURL = element.getAttribute('data-pinimage');
				pinTitle = element.getAttribute('data-title');
				pinContent = element.getAttribute('data-content');
				address = element.getAttribute('data-address');
				pinLink = element.getAttribute('data-pinlink');			
				latitude = element.getAttribute('data-lat');
				longitude = element.getAttribute('data-lng');
				pinButtonText = element.getAttribute('data-button-text');
						
	
				if (latitude === '' && longitude === '') {

					map.getLatLong(address, function(location, lati,longi ) {
							
						latitude = lati; 
						longitude = longi;
						map.addMarker(mapInstance, pinLogoURL, pinTitle, pinContent, pinLink, address, pinButtonText);
						
						if ( pincount > 1 ) {
							mapInstance.fitBounds(bounds);	
						} else {
							mapInstance.setZoom(parseInt(mapZoom, 10));
							mapInstance.setCenter(new google.maps.LatLng(latitude, longitude));
						}
								
					});								

				} else {
								
					map.addMarker(mapInstance, pinLogoURL, pinTitle, pinContent, pinLink, address, pinButtonText);
				
					if ( pincount > 1 ) {
						mapInstance.fitBounds(bounds);
					} else {
						mapInstance.setZoom(parseInt(mapZoom, 10));
						mapInstance.setCenter(new google.maps.LatLng(latitude, longitude));
					}
					
				}
									
			});   
					
								
			// MAP COLOURIZE
			if (mapColor !== "") {
				mapInstance.mapTypes.set('map_style', styledMap);
				mapInstance.setMapTypeId('map_style');
			}					
		}
	};
		
	
	/////////////////////////////////////////////
	// MAP DIRECTORY FUNCTIONS
	/////////////////////////////////////////////
	
	var mapDirectory = {
		init : function(searchTerm, locationFilter, categoryFilter) {
					
			var mapsDirectory = jQuery('.map-directory-canvas');
			var mapDirContainer, mapZoom;
			
			mapsDirectory.each(function(i, element) {
			
				var mapDirContainer = element,
					mapZoom = mapDirContainer.getAttribute('data-zoom'),
					mapType = mapDirContainer.getAttribute('data-maptype'),
					mapColor = mapDirContainer.getAttribute('data-mapcolor'),
					mapSaturation = mapDirContainer.getAttribute('data-mapsaturation');
				
				mapDirectory.directoryMap( mapDirContainer, mapZoom, mapType, mapColor, mapSaturation, jQuery(this), searchTerm, locationFilter, categoryFilter);
							
			});
		},
		searchDirectory: function(){			
			mapDirectory.init(jQuery('#dir-search-value').val(), jQuery('.directory-location-option').val(), jQuery('.directory-category-option').val());
		},
		getLatLong: function(address, fn){
			var geocoder;
			geocoder = new google.maps.Geocoder();	
			geocoder.geocode( { 'address': address}, function(results, status) {
				fn(results[0].geometry.location, results[0].geometry.location.lat(), results[0].geometry.location.lng()); 
			});
		},
		addWinContent: function(marker, html, map){
				markersArray.push(marker);
				google.maps.event.addListener(marker, 'click', function() {
				infowindow.setContent(html);
				infowindow.open(map, marker);
			});	
		},
		addMarkerDir: function(mapInstance, pinLogoURL, pinTitle, pinContent, pinLink, address, pinButtonText,pinFeaturedImage, lat, lng){
			var companyMarker, pinImgContainer;
					
			mapCoordinates = new google.maps.LatLng(lat, lng);	

			if (pinLogoURL) {					
				companyPos = new google.maps.LatLng(lat, lng);
				companyMarker = new google.maps.Marker({
					position: mapCoordinates,
					map: mapInstance,
					icon: pinLogoURL,
					optimized: false,
					animation: google.maps.Animation.DROP });
			} else {
				companyPos = new google.maps.LatLng(lat, lng);
				companyMarker = new google.maps.Marker({
					position: mapCoordinates,
					map: mapInstance,
					animation: google.maps.Animation.DROP });  
			}
			if (pinFeaturedImage === null) {
				pinImgContainer = '';
			} else {
				pinImgContainer = '<img class="info-window-img" alt="" src="'+pinFeaturedImage+'" height="140" width="140"/>';
			}
										
			var html = '';
			if (pinLink === '' || pinButtonText === '') {
				html = '<div class="pinmarker">'+pinImgContainer+'<div class="pinmarker-container"><h3>'+pinTitle+'</h3><div class="excerpt">'+pinContent+'</div></div></div>';	
			} else {
				html = '<div class="pinmarker">'+pinImgContainer+'<div class="pinmarker-container"><h3>'+pinTitle+'</h3><div class="excerpt">'+pinContent+'</div><a class="pin-button" href="' + pinLink + '" target="_blank">'+pinButtonText+'</a></div></div>';
			}
				
											
			infowindow = new google.maps.InfoWindow();
			mapDirectory.addWinContent(companyMarker, html, mapInstance);
			directory_bounds.extend(mapCoordinates);
		},
		directoryMap: function(mapContainer, mapZoom, mapType, mapColor, mapSaturation, targetMap, searchTerm, locationFilter, categoryFilter) {
				
			var pinLogoURL = "", mapLightness = false;
			var mapFilter = mapContainer.getAttribute('data-directory-map-filter');
			var mapFilterPos =  mapContainer.getAttribute('data-directory-map-filter-pos');
			var mapResults =  mapContainer.getAttribute('data-directory-map-results');
			var directoryItemHtml = "";
			
			//Only if we want to display the map
			if (mapResults !== 'list') {
				
				if (mapSaturation == "mono-light") {
					if (mapColor === "") {
						mapColor = "#ffffff";
					}
					mapSaturation = -100;
				} else if (mapSaturation == "mono-dark") {
					if (mapColor === "") {
						mapColor = "#222222";
					}
					mapSaturation = -100;
					mapLightness = true;
				} else {
					mapSaturation = -20;
				}
			
				var styles = [   
					{
						stylers: [
							{hue: mapColor},
							{"invert_lightness": mapLightness},
							{saturation: mapSaturation}
						]
					}
				];
				
				var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});  
				
				if (isMobileAlt) {
					isDraggable = false;
				}
			
				if (mapType === "satellite") {
				mapTypeIdentifier = google.maps.MapTypeId.SATELLITE;
				} else if (mapType === "terrain") {
				mapTypeIdentifier = google.maps.MapTypeId.TERRAIN;
				} else if (mapType === "hybrid") {
				mapTypeIdentifier = google.maps.MapTypeImapDirContainerd.HYBRID;
				} else {
				mapTypeIdentifier = google.maps.MapTypeId.ROADMAP;
				}
				
			
			} else { 
				jQuery('.map-directory-canvas').hide();
			}
			
			var pinTitle, pinContent, pinLink, address, pinButtonText, pinShortContent, pinThumbnail;
			var pincount = targetMap.parent().find('.pin_location').length;
			
			directory_bounds = new google.maps.LatLngBounds();
			
			if (categoryFilter === "") {
				categoryFilter = mapContainer.getAttribute('data-directory-category');
			}
			
			//Ajax call to get the Directory Itens	
			var data = {
				action: 'sf_directory',
				search_term: searchTerm,
				location_term: locationFilter,
				category_term: categoryFilter
			};
			
			jQuery.post(mapContainer.getAttribute('data-ajaxurl'), data, function(response) {
				var json = jQuery.parseJSON(response);
				var mapFilterHtml;
				var pincount = json.results;
				
				jQuery('.directory-results').empty();
				
				var settings = {
					scrollwheel: false,
					draggable: isDraggable,
					mapTypeControl: true,
					mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
					navigationControl: true,
					navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
					mapTypeId: mapTypeIdentifier
				};
				
				if (pincount > 0) {
				
					var mapInstance = new google.maps.Map(mapContainer, settings);
					markersArray = [];
																				
					// MAP COLOURIZE
					if (mapColor !== "" && mapResults != 'list') {
						mapInstance.mapTypes.set('map_style', styledMap);
						mapInstance.setMapTypeId('map_style');
					}
					
					//Resize Window Responsiveness
					google.maps.event.addDomListener(window, 'resize', function() {	
						mapInstance.fitBounds(directory_bounds);
						mapInstance.setZoom(parseInt(mapZoom, 10));
					});
					
					//Map Filter HTML
					mapFilterHtml = '<div class="filter-search-container">';
					mapFilterHtml += '<input type="text" name="dir-search-value" id="dir-search-value" placeholder="'+json.map_1st_text+'"></div>';
					mapFilterHtml += '<div class="directory-filter">'+json.locations+'</div>';
					mapFilterHtml += '<div class="directory-filter"> '+json.categories+'</div>';
					mapFilterHtml += '<div class="directory-search-container"><a class="btn read-more-button directorySearch" name="directory-search-button" id="directory-search-button">'+json.search_text+'</a></div>'; 
					
					//Add the Directory Map Filter
					if (mapFilter == 'yes') {  
						
						//Map Filter Above the Map
						if(mapFilterPos == 'above' && jQuery('body').children().find(".filter-search-container").length <= 0) {
							jQuery('.spb_directory_filter_above').append(mapFilterHtml);									
						}
						
						//Map Filter below the Map
						if (mapFilterPos == 'below' && jQuery('body').children().find(".filter-search-container").length <= 0) {
							jQuery('.spb_directory_filter_below').append(mapFilterHtml);		
						}
					}			
					
					var resultText = "", thumbnail_image = '';
					if (pincount == 1){
						resultText = "result";
					} else {
						resultText = "results";		
					}
					resultText = json.results_text_1 + ' '+pincount+' '+json.results_text_2;	
					jQuery('.directory-results').append('<h2>'+resultText+'</h2>');
				
				} else {	
						
					for (var i=0; i < markersArray.length; i++) {
						markersArray[i].setMap(null);
					}
					
					jQuery('.directory-results').append('<h2>'+json.errormsg+'</h2>');
				
				}
				
				if (pincount > 0) {
				
					jQuery.each(json.items, function(i, item) {
					
						//Get the directory itens details
						var pinTitle = item.pin_title,
							pinLogoURL = item.pin_logo_url,
							pinContent = item.pin_content,
							pinShortContent = item.pin_short_content,
							address = item.pin_address,
							pinLink = item.pin_link,
							pinButtonText = item.pin_button_text,
							latitude = item.pin_lat,
							longitude = item.pin_lng,
							pinThumbnail = item.pin_thumbnail,
							categories = item.categories,
							location = item.location,
							thumbnail_image	= '',
							result_header = true,
							hasThumb = false,
							extra_class = '';
						
						if (pinThumbnail && pinLink) {
							hasThumb = true;				
							thumbnail_image = '<figure class="animated-overlay overlay-alt"><img itemprop="image" src="'+pinThumbnail+'" alt="'+pinTitle+'"><a href="'+pinLink+'" target="_blank" class="link-to-post"></a><div class="figcaption-wrap"></div><figcaption><div class="thumb-info"><h4>'+pinTitle+'</h4></div></figcaption></figure>';
						} else if (pinThumbnail) {
							hasThumb = true;
							thumbnail_image = '<figure><img itemprop="image" src="'+pinThumbnail+'" alt="'+pinTitle+'"></figure>';
						}
							
						//Add the Directory List Results
						if (!hasThumb) {
							extra_class = 'no-thumb';
						}
						if ( mapResults == 'maplist' ||  mapResults == 'list') {
							if (pinLink !== '') {
								directoryItemHtml = '<div class="directory-item info-window-container '+extra_class+' clearfix">'+thumbnail_image+'<div class="directory-item-details"><h3><a href="'+pinLink+'">'+pinTitle+'</a></h3><div class="item-meta">'+categories+'<span>|</span>'+location+'</div><div class="excerpt" itemprop="description">'+pinContent+'</div><a class="read-more-button" href="'+pinLink+'" target="_blank">'+pinButtonText+'</a></div></div>';
								
							} else {
								directoryItemHtml = '<div class="directory-item info-window-container '+extra_class+' clearfix">'+thumbnail_image+'<div class="directory-item-details"><h3>'+pinTitle+'</h3><div class="item-meta">'+categories+'<span>|</span>'+location+'</div><div class="excerpt" itemprop="description">'+pinContent+'</div></div></div>';
							}
							jQuery('.directory-results').append(directoryItemHtml);
					
						}
						
						if ( mapResults != 'list') {
						
							//Add directory item to the map
							mapDirectory.addMarkerDir(mapInstance, pinLogoURL, pinTitle, pinShortContent, pinLink, address, pinButtonText,pinThumbnail, latitude, longitude);
							
							if ( pincount > 1 ) {
								mapInstance.fitBounds(directory_bounds);	
							} else {
								mapInstance.setZoom(parseInt(mapZoom, 10));
								mapInstance.setCenter(new google.maps.LatLng(latitude, longitude));
							}
						}			
					});
				}
			});					
		}
	};
		
	/////////////////////////////////////////////
	// CROWDFUNDING FUNCTIONS
	/////////////////////////////////////////////
	
	var crowdfunding = {
		init:function() {
			
			if (jQuery('#back-this-project').find('.edd_price_options').length <= 0) {
				jQuery('#back-this-project > h2').css('display', 'none');
			}
		
			jQuery('.atcf-price-option').on('click', function() {
				
				var selectedOption = jQuery(this);
				
				if (selectedOption.hasClass('inactive')) {
					return false;
				}
				jQuery('.atcf-price-option').find('input[type="radio"]').prop('checked', false);
				jQuery('.atcf-price-option').removeClass('atcf-selected');
				selectedOption.find('input[type="radio"]').prop('checked', true);
				selectedOption.addClass('atcf-selected');
			});
			
			var campaignItems = jQuery('.campaign-items:not(.carousel-items)');
			campaignItems.imagesLoaded(function () {
				campaignItems.equalHeights();
			});
			
			$window.smartresize( function() {
				jQuery('.campaign-items:not(.carousel-items)').children().css('min-height','0');
				jQuery('.campaign-items:not(.carousel-items)').equalHeights();
			});
			
		}
	};
	
	/////////////////////////////////////////////
	// RELOAD FUNCTIONS
	/////////////////////////////////////////////
	
	var reloadFunctions = {
		init:function() {	
	
			// Remove title attributes from images to avoid showing on hover 
			jQuery('img[title]').each(function() {
				jQuery(this).removeAttr('title');
			});
			
			if (!isAppleDevice) {
				jQuery('embed').show();
			}
						
			// Animate Top Links
			jQuery('.animate-top').on('click', function(e) {
				e.preventDefault();
				jQuery('body,html').animate({scrollTop: 0}, 800, 'easeOutCubic');           
			});
		},
		load:function() {
			if (!isMobile) {
			
				// Button hover tooltips
				jQuery('.tooltip').each( function() {
					jQuery(this).css( 'marginLeft', '-' + Math.round( (jQuery(this).outerWidth(true) / 2) ) + 'px' );
				});
				
				jQuery('.comment-avatar').hover( function() {
					jQuery(this).find('.tooltip' ).stop().animate({
						bottom: '44px',
						opacity: 1
					}, 500, 'easeInOutExpo');
				}, function() {
						jQuery(this).find('.tooltip').stop().animate({
							bottom: '25px',
							opacity: 0
						}, 400, 'easeInOutExpo');
				});
				
				jQuery('.grid-image').hover( function() {
					jQuery(this).find('.tooltip' ).stop().animate({
						bottom: '85px',
						opacity: 1
					}, 500, 'easeInOutExpo');
				}, function() {
						jQuery(this).find('.tooltip').stop().animate({
							bottom: '65px',
							opacity: 0
						}, 400, 'easeInOutExpo');
				});
			
			}	
		}
	};
	
	
	/////////////////////////////////////////////
	// GLOBAL VARIABLES
	/////////////////////////////////////////////
	
	var $window = jQuery(window),
		body = jQuery('body'),
		sfIncluded = jQuery('#sf-included'),
		sfOptionParams = jQuery('#sf-option-params'),
		windowheight = page.getViewportHeight(),
		deviceAgent = navigator.userAgent.toLowerCase(),
		isMobile = deviceAgent.match(/(iphone|ipod|android|iemobile)/),
		isMobileAlt = deviceAgent.match(/(iphone|ipod|ipad|android|iemobile)/),
		isAppleDevice = deviceAgent.match(/(iphone|ipod|ipad)/),
		isIEMobile = deviceAgent.match(/(iemobile)/),
		parallaxScroll = navigator.userAgent.indexOf('Safari') != -1 || navigator.userAgent.indexOf('Chrome') == -1,
		IEVersion = page.checkIE(),
		isRTL = body.hasClass('rtl') ? true : false,
		sliderAuto = sfOptionParams.data('slider-autoplay') ? true : false,
		sliderSlideSpeed = sfOptionParams.data('slider-slidespeed'),
		sliderAnimSpeed = sfOptionParams.data('slider-animspeed'),
		lightboxControlArrows = sfOptionParams.data('lightbox-nav') === "arrows" ? true : false,
		lightboxSkin = sfOptionParams.data('lightbox-skin') === "dark" ? "metro-black" : "metro-white",
		lightboxSharing = sfOptionParams.data('lightbox-sharing') ? true : false;


	/////////////////////////////////////////////
	// LOAD + READY FUNCTION
	/////////////////////////////////////////////
		
	var onReady = {
		init: function(){
			page.init();
			if (jQuery('.sf-super-search').length > 0) {
			superSearch.init();
			}
			if (jQuery('#header-section').length > 0) {
			header.init();
			}
			nav.init();
			if (sfIncluded.hasClass('has-products') || body.hasClass('woocommerce-cart') || body.hasClass('woocommerce-account')) {
			woocommerce.init();
			}
			if (sfIncluded.hasClass('has-portfolio')) {
			portfolio.init();
			}
			if (sfIncluded.hasClass('has-portfolio-showcase')) {
			portfolio.portfolioShowcaseInit();
			}
			if (sfIncluded.hasClass('has-blog')) {
			blog.init();
			}
			if (sfIncluded.hasClass('has-infscroll') && !isMobile) {
			blog.infiniteScroll();
			}
			if (sfIncluded.hasClass('has-gallery')) {
			gallery.init();
			}
			if (sfIncluded.hasClass('has-galleries')) {
			galleries.init();
			}
			widgets.init();
			if (sfIncluded.hasClass('has-team')) {
			teamMembers.init();
			}
			if (sfIncluded.hasClass('has-carousel')) {
			carouselWidgets.init();
			}
			if (sfIncluded.hasClass('has-parallax')) {
			parallax.init();
			}
			crowdfunding.init();
			reloadFunctions.init();
		}
	};
	var onLoad = {
		init: function(){
			flexSlider.init();
			if (sfIncluded.hasClass('has-parallax')) {
			parallax.load();
			}
			if (sfIncluded.hasClass('has-products') || body.hasClass('woocommerce-cart') || body.hasClass('woocommerce-account')) {
			woocommerce.load();
			}
			page.load();
			if (body.hasClass('page-transitions')) {
			page.fadePageIn();
			}
			if (sfIncluded.hasClass('has-chart')) {
			widgets.charts();
			}
			if (sfIncluded.hasClass('has-progress-bar')) {
			widgets.initSkillBars();
			}
			if (sfIncluded.hasClass('has-map')) {
				map.init();
				mapDirectory.init('', '', '');
			
				jQuery('#directory-search-button').live( "click", function() {
					mapDirectory.searchDirectory();
				});
				jQuery('ul.nav-tabs li a').click(function(){
					var thisTabHref = jQuery(this).attr('href');
					if (jQuery(thisTabHref).find('.spb_gmaps_widget').length > 0) {
						map.init();
						mapDirectory.init('', '', '');
					}
				});
			}
			reloadFunctions.load();
			woocommerce.variations();
		}
	};
	
	jQuery(document).ready(onReady.init);
	jQuery(window).load(onLoad.init);
	
})(jQuery);
