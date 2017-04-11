/*
*
*	Swift Slider Frontend JS
*	------------------------------------------------
*	Swift Slider
*	Copyright Swift Ideas 2014 - http://www.swiftideas.net
*
*/

/*global jQuery */
(function(){
	
	// USE STRICT
	"use strict";
	
	var swiftSliderElements = [],
		$window = jQuery(window),
		body = jQuery('body'),
		deviceAgent = navigator.userAgent.toLowerCase(),
		isMobile = deviceAgent.match(/(iphone|ipod|android|iemobile)/),
		isMobileAlt = deviceAgent.match(/(iphone|ipod|ipad|android|iemobile)/),
		isAppleDevice = deviceAgent.match(/(iphone|ipod|ipad)/),
		parallaxScroll = navigator.userAgent.indexOf('Safari') != -1 || navigator.userAgent.indexOf('Chrome') == -1,
		scrollLimited = false,
		isCurtainAnimating = false;
	
	var swiftSlider = {
		init: function() {
			
			// Set up each slider
			jQuery('.swift-slider').each(function(i) {
				
				var ssInstance = jQuery(this),
					sliderID = ssInstance.attr('id'),
					ssFullscreen = ssInstance.data('fullscreen'),
					windowHeight = parseInt($window.height(), 10),
					ssMaxHeight = parseInt(ssInstance.data('max-height'), 10);
				
				// Skip if no slides found
				if (ssInstance.hasClass('no-slides')) {
					return false;
				}
				
				// Set the slider height
				if (jQuery('#wpadminbar').length > 0) {
					windowHeight = windowHeight - jQuery('#wpadminbar').height();
				}
				var sliderHeight = windowHeight > ssMaxHeight || !ssFullscreen && ssMaxHeight ? ssMaxHeight : windowHeight;
				ssInstance.css('height', sliderHeight);
								
				// Setup slider
				swiftSlider.setupSlider(i, sliderID);
				
				// Prepare the first slide
				swiftSlider.prepareFirstSlide(i, jQuery('#' + sliderID));
			});
			
			$window.smartresize( function() {  
				swiftSlider.resizeSliders();
			});
				
		},
		setupSlider: function(i, sliderID) {
			
			// Slider variables
			var sliderInstance = '#' + sliderID,
				sliderElement = jQuery(sliderInstance),
				sliderType = sliderElement.data('type'),
				sliderLoop = sliderElement.data('loop'),
				slideCount = sliderElement.data('slide-count'),
				mobileNoSwipe = false,
				desktopSwipe = true,
				grabAbility = true;
			
			if (slideCount === 1) {
				desktopSwipe = false;
				grabAbility = false;
				mobileNoSwipe = true;
			}
			
			// Set up the Swift Slider instance
			if (sliderType == "curtain") {
				swiftSliderElements[i] = new Swiper(sliderInstance, {
					loop: false,
					progress: true,
					mode: 'vertical',
					speed: 1000,
					keyboardControl: true,
					simulateTouch: false,
					onFirstInit: swiftSlider.afterSliderCurtainInit,
					onSlideChangeStart: swiftSlider.slideTransitionStart,
					onSlideChangeEnd: swiftSlider.slideTransitionEnd,
					onProgressChange: function(swiper){
						for (var i = 0; i < swiper.slides.length; i++){
							var slide = swiper.slides[i];
							var progress = slide.progress;
							var translate, boxShadow, boxShadowOpacity;
							if (progress > 0) {
								//translate = progress*jQuery(swiper.container).height(); 
								translate = progress*swiper.height; 
								//translate = progress*swiper.width;  
								boxShadowOpacity = 0;
							} else {
								translate = 0; 
								boxShadowOpacity = 1  - Math.min(Math.abs(progress),1);
							}
							//slide.style.boxShadow='0px 0px 10px rgba(0,0,0,'+boxShadowOpacity+')';
							//swiper.setTransform(slide,'translate3d('+(translate)+'px,0,0)')
							swiper.setTransform(slide,'translate3d(0,'+(translate)+'px,0)');
						}
					},
					onTouchStart:function(swiper){
						for (var i = 0; i < swiper.slides.length; i++){
							swiper.setTransition(swiper.slides[i], 0);
						}
					},
					onSetWrapperTransition: function(swiper, speed) {
						for (var i = 0; i < swiper.slides.length; i++){
							swiper.setTransition(swiper.slides[i], speed);
						}
					}
				});
			} else {
				swiftSliderElements[i] = new Swiper(sliderInstance, {
					loop: sliderLoop,
					touchRatio: 0.7,
					mode: 'horizontal',
					speed: 600,
					grabCursor: grabAbility,
					paginationClickable: true,
					keyboardControl: true,
					noSwiping: mobileNoSwipe,
					simulateTouch: desktopSwipe,
					onFirstInit: swiftSlider.afterSliderInit,
					onSlideChangeStart: swiftSlider.slideTransitionStart,
					onSlideChangeEnd: swiftSlider.slideTransitionEnd
				});
				
				if (mobileNoSwipe) {
					sliderElement.addClass('no-swiping');
				}
			}
			
			// Resize the sliders
			swiftSliderElements[i].resizeFix();
			
		},
		prepareFirstSlide: function(i, sliderInstance) {
			
			var delay = 600;
			
			// Set controls style based on the slide
			sliderInstance.find('.swift-slider-pagination, .swift-slider-prev, .swift-slider-next, .swift-slider-continue').removeClass('dark').removeClass('light').addClass(sliderInstance.find('.swiper-slide-active').data('style'));
			
			// Check if first slide has a video
			if (sliderInstance.find('.swiper-slide-active video').length > 0) {
				// Check if browser supports video
				if (!jQuery('html').hasClass('no-video') && !isMobileAlt) {
					
					// Get video instance
					var videoInstance = sliderInstance.find('.swiper-slide-active video').get(0);
					
					// Load video
					videoInstance.load();
					
					// Add event listener for when video has loaded
					videoInstance.addEventListener('loadeddata', function() {
						
						// Slide video loaded, now display the slider
						swiftSlider.sliderLoaded(i, sliderInstance);
						swiftSlider.setSliderContent(sliderInstance);
						swiftSlider.showControls(sliderInstance);
						swiftSlider.slideTransitionEnd(swiftSliderElements[i], delay);
						
					});
					
				} else {
					
					// Video not supported, remove video and continue loading slider
					sliderInstance.find('.swiper-slide-active video').remove();
					swiftSlider.sliderLoaded(i, sliderInstance);
					swiftSlider.setSliderContent(sliderInstance);
					swiftSlider.showControls(sliderInstance);
					swiftSlider.slideTransitionEnd(swiftSliderElements[i], delay);
				}
			
			} else {
				var slideImageURL = sliderInstance.find('.swiper-slide-active').data('slide-img');
				if (slideImageURL && slideImageURL.length > 0) {
				
					var slideImage = new Image();
					
					// Callback for when slideImage loads					
					jQuery(slideImage).load(function(){ 
						
						// Slide image loaded, now display the slider
						swiftSlider.sliderLoaded(i, sliderInstance);
						swiftSlider.setSliderContent(sliderInstance);
						swiftSlider.showControls(sliderInstance);
						swiftSlider.slideTransitionEnd(swiftSliderElements[i], delay);
					});
					
					// Set the source
					slideImage.src = slideImageURL;
				
				} else {
					
					// If all else fails, now display the slider
					swiftSlider.sliderLoaded(i, sliderInstance);
					swiftSlider.setSliderContent(sliderInstance);
					swiftSlider.showControls(sliderInstance);
					swiftSlider.slideTransitionEnd(swiftSliderElements[i], delay);
				}
				
			}
			
		},
		afterSliderInit: function() {
				
			// Resize the sliders
			swiftSlider.resizeSliders();
			
		},
		afterSliderCurtainInit: function(e) {
			
			var sliderObject = e,
				sliderInstance = jQuery(sliderObject.container);
			
			// Resize the sliders
			swiftSlider.resizeSliders();
			
			// Bind scroll event on load
			if ($window.scrollTop < 10) {
				body.css('overflow', 'hidden');
			}
			
			jQuery('body,html').animate({
				scrollTop: sliderInstance.scrollTop()
			}, 800, 'easeOutCubic');
			
			// Check when slider is hovered & bind mousewheel
			sliderInstance.on('mouseenter', function () {
				body.css('overflow', 'hidden');
				if ($window.scrollTop() > 0) {
					isCurtainAnimating = true;
					jQuery('body,html').animate({
						scrollTop: sliderInstance.scrollTop()
					}, 800, 'easeOutCubic');
					setTimeout(function() {
						isCurtainAnimating = false;
					}, 1200);
				}
				sliderInstance.on('mousewheel', {mousewheel: { debounce: { leading: false, trailing: false, maxDelay: 100 } } }, function(event) {
					if (!isCurtainAnimating) {
						swiftSlider.curtainScroll(sliderObject, event);
					}
				});
			});
			
			// Remove
			sliderInstance.on('mouseleave', function () {
				body.css('overflow', '');
				sliderInstance.off('mousewheel');
			});
			
		},
		curtainScroll: function(sliderObject, event) {
			
			// Set up slider variables    
			var sliderInstance = jQuery(sliderObject.container),
				numberOfSlides = sliderInstance.find('.swiper-slide').length,
				currentSlideIndex = sliderObject.activeIndex + 1,
				stickyHeader = jQuery('.sticky-header'),
				stickyHeaderHeight = stickyHeader.length > 0 ? stickyHeader.height() : 0;
				
			// If header is below slider, nil the sticky header height
			stickyHeaderHeight = body.hasClass('header-below-slider') ? 0 : stickyHeaderHeight;
			
			// Check for wpadmin bar
			if (jQuery('#wpadminbar').length > 0) {
				stickyHeaderHeight = stickyHeaderHeight + jQuery('#wpadminbar').height();
			}
			
			// If user is scrolling down, next slide or continue	
			if (event.deltaY > 0 && !isCurtainAnimating) {
				isCurtainAnimating = true;
				if (currentSlideIndex === numberOfSlides) {
					body.css('overflow', '');
					sliderInstance.off('mousewheel');
					jQuery('body,html').stop().animate({
						scrollTop: sliderInstance.offset().top + sliderInstance.height() - stickyHeaderHeight
					}, 800, 'easeOutCubic');
				} else {
					sliderObject.swipeNext();
				}
				
			// If user is scrolling up, prev slide
			} else if (event.deltaY < 0 && !isCurtainAnimating) {
				isCurtainAnimating = true;
				if (currentSlideIndex > 0) {
					sliderObject.swipePrev();
				}
			
			}
			
			setTimeout(function() {
				isCurtainAnimating = false;
			}, 1500);
		},
		sliderLoaded: function(i, sliderInstance) {
			
			// Fade out the loader
			sliderInstance.find('.swift-slider-loader').fadeOut(400);
			
			// Fade in the slider
			sliderInstance.find('.swiper-wrapper').animate({
				'opacity': 1
			}, 400);
			
			// Fade in the video overlays
			sliderInstance.find('.video-overlay').animate({
				'opacity': 1
			}, 400);

			// Initiate parallax scrolling on the slider if it's using the hero location
			if ((sliderInstance.parent('#main-container').length > 0 || sliderInstance.parent('body').length > 0) && sliderInstance.data('type') != "curtain" && !isMobileAlt) {
				swiftSlider.parallax(sliderInstance);
			}
			
			// Slider prev button
			sliderInstance.find('.swift-slider-prev').on('click', function(e) {
				e.preventDefault();
				if (body.css("direction").toLowerCase() == "rtl") {
					swiftSliderElements[i].swipeNext();
				} else {
					swiftSliderElements[i].swipePrev();
				}
			});
			
			// Slider next button
			sliderInstance.find('.swift-slider-next').on('click', function(e) {
				e.preventDefault();
				if (body.css("direction").toLowerCase() == "rtl") {
					swiftSliderElements[i].swipePrev();
				} else {
					swiftSliderElements[i].swipeNext();
				}
			});
			
			// Slieder pagination
			sliderInstance.find('.swift-slider-pagination').on('click', '> div', function(e) {
				swiftSliderElements[i].swipeTo(jQuery(this).index());
				sliderInstance.find('.swift-slider-pagination .dot').removeClass('active');
				jQuery(this).addClass('active');
			});
			
			// Curtain slider continue
			sliderInstance.find('.swift-slider-continue').on('click', function(e) {
				e.preventDefault();
				
				var stickyHeaderHeight = body.hasClass('sticky-header-enabled') && !body.hasClass('header-below-slider') ? jQuery('.header-wrap').height() : 0,
					sliderScrollTop = sliderInstance.offset().top + sliderInstance.height() - stickyHeaderHeight;
				
				if (jQuery('#wpadminbar').length > 0) {
					sliderScrollTop = sliderScrollTop - jQuery('#wpadminbar').height();
				}
				
				jQuery('body,html').animate({
					scrollTop: sliderScrollTop
				}, 800, 'easeOutCubic');
			});
			
		},
		showControls: function(sliderInstance) {
			
			// Animate in controls
			if (sliderInstance.data('type') != "curtain") {
				if (sliderInstance.data('loop')) {
					sliderInstance.find('.swift-slider-prev').fadeIn(400);
				}
				sliderInstance.find('.swift-slider-next').fadeIn(400);
				sliderInstance.find('.swift-slider-pagination .dot').first().addClass('active');
				sliderInstance.find('.swift-slider-pagination').fadeIn(600);
			} else if (sliderInstance.data('type') === "curtain") {
				sliderInstance.find('.swift-slider-pagination .dot').first().addClass('active');
				sliderInstance.find('.swift-slider-pagination').css('margin-top', - sliderInstance.find('.swift-slider-pagination').height() / 2);
				sliderInstance.find('.swift-slider-pagination').fadeIn(600);
				sliderInstance.find('.swift-slider-continue').fadeIn(800);
			}
			
		},
		parallax: function(sliderInstance) {
		
			var sliderHeight = sliderInstance.height(),
				docHeight = jQuery(document).height();
		
			// Check if parallax scroll is possible
			if (parallaxScroll) {
				$window.scroll(function(){
					
					var scrollTop = $window.scrollTop();
					
					// Check if window width is greater than mobile sized
					if ($window.width() > 768) {
						
						// Only scroll if the slider is makes sense to do so
						if (sliderHeight / 2 > scrollTop && sliderHeight * 2.2 < docHeight && scrollTop > -2) {
							
							if (scrollTop < 0) {
								scrollTop = 0;
							}
							
							// Reduce the slider height
							sliderInstance.stop(true,true).transition({
								height: sliderHeight - scrollTop / 1.8
							}, 0);
							
							// Move & fade the slider content
							sliderInstance.find('.caption-wrap').stop(true,true).transition({
								y: scrollTop * -0.2,
								opacity: 1 - scrollTop / 350
							}, 0);
						}
					}
				}); 
			}
			
		},
		resizeSliders: function(sliderInstance) {
			
			// Cache the windowHeight
			var windowHeight = parseInt($window.height(), 10);
				
			if (jQuery('#wpadminbar').length > 0) {
				windowHeight = windowHeight - jQuery('#wpadminbar').height();
			}
			
			// Resize each slider
			if (sliderInstance) {
			
				var ssInstance = sliderInstance,
					ssFullscreen = ssInstance.data('fullscreen'),
					ssMaxHeight = parseInt(ssInstance.data('max-height'), 10),
					ssVideoWrap = ssInstance.find('.video-wrap'),
					sliderHeight = windowHeight > ssMaxHeight && !ssFullscreen ? ssMaxHeight : windowHeight,
					sliderWidth = ssInstance.width();
				
				// Set slider and slide width & height	
				swiftSlider.setSliderSize(ssInstance, ssFullscreen, sliderWidth, sliderHeight);
				
				// Check if a video is present
				if (ssVideoWrap.length > 0) {
					swiftSlider.setSlideVideoSize(ssVideoWrap, sliderWidth, sliderHeight);
				}	
				
			} else {
				
				jQuery('.swift-slider').each(function() {
					var ssInstance = jQuery(this),
						ssFullscreen = ssInstance.data('fullscreen'),
						ssMaxHeight = parseInt(ssInstance.data('max-height'), 10),
						ssVideoWrap = ssInstance.find('.video-wrap'),
						sliderHeight = windowHeight > ssMaxHeight && !ssFullscreen ? ssMaxHeight : windowHeight,
						sliderWidth = ssInstance.width();
					
					// Set slider and slide width & height	
					swiftSlider.setSliderSize(ssInstance, ssFullscreen, sliderWidth, sliderHeight);
					
					// Check if a video is present
					if (ssVideoWrap.length > 0) {
						swiftSlider.setSlideVideoSize(ssVideoWrap, sliderWidth, sliderHeight);
					}
				});
				
			}
			
		},
		setSliderSize: function(ssInstance, ssFullscreen, sliderWidth, sliderHeight) {
			
			// Modify height based on other elements
			if (!body.hasClass('vertical-header') && !body.hasClass('header-naked-light') && !body.hasClass('header-naked-dark') && !body.hasClass('header-below-slider') && !body.hasClass('header-standard-overlay') && ssFullscreen) {
				sliderHeight = sliderHeight - jQuery('.header-wrap').height();
			}
			if (body.hasClass('vertical-header') && jQuery('#wpadminbar').length > 0 && ssFullscreen) {
				//sliderHeight = sliderHeight + jQuery('#wpadminbar').height();
			}
			
			// Set slider height + width
			ssInstance.css('height', sliderHeight);
			ssInstance.find('.swiper-container, .swiper-slide').css('height', sliderHeight);
			ssInstance.find('.swiper-container').css('width', sliderWidth);
			
			// Vertically center caption & fade in
			ssInstance.find('.caption-content').each(function() {
				var caption = jQuery(this);
				caption.css('margin-top', - jQuery(this).height() / 2);
			});
		},
		setSlideVideoSize: function(ssVideoWrap, sliderWidth, sliderHeight) {
			var ssVideo = ssVideoWrap.find('.video'),
				videoWidth = parseInt(ssVideo.data('width'), 10),
				videoHeight = parseInt(ssVideo.data('height'), 10);
			
			// Set video width/height if needed
			if (videoWidth === 0) {
				videoWidth = ssVideo[0].videoWidth;
			}
			if (videoHeight === 0) {
				videoHeight = ssVideo[0].videoHeight;
			}
			// Last ditch fallbacks
			if (videoWidth === 0) {
				videoWidth = 1920;
			}
			if (videoHeight === 0) {
				videoHeight = 1080;
			}
			
			// Set slide video width + height
			ssVideo.css('height', sliderHeight).css('width', sliderWidth);
			ssVideoWrap.width(sliderWidth).height(sliderHeight);
			
			// Use the largest scale factor of horizontal/vertical
			var scale_h = sliderWidth / videoWidth;
			var scale_v = sliderHeight / videoHeight; 
			var scale = scale_h > scale_v ? scale_h : scale_v;
			
			// Update minium width to never allow excess space
			var min_w = videoWidth/videoHeight * (sliderHeight+20);
			
			// Don't allow scaled width < minimum video width
			if (scale * videoWidth < min_w) {scale = min_w / videoWidth;}
			
			// Scale the video
			ssVideo.width(Math.ceil(scale * videoWidth +2));
			ssVideo.height(Math.ceil(scale * videoHeight +2));
			
			// Center the video wrap
			ssVideo.css('margin-top', - (ssVideo.height() - ssVideoWrap.height()) / 2);
			ssVideo.css('margin-left', - (ssVideo.width() - ssVideoWrap.width()) /2);
		},
		slideTransitionStart: function(e) {
			var sliderObject = e,
				sliderInstance = jQuery(sliderObject.container),
				currentSlide = jQuery(e.activeSlide()),
				currentSlideIndex = e.activeIndex;
			
			// Resize current slider
			swiftSlider.resizeSliders(sliderInstance);
			
			// Update pagination
			if (sliderInstance.find('.swift-slider-pagination').length > 0) {
				
				var numberOfSlides = sliderInstance.find('.swift-slider-pagination .dot').length;
				
				if (sliderInstance.data('type') === "curtain") {
					
					currentSlideIndex = currentSlideIndex + 1;

				} else {
				
					if (sliderInstance.data('loop')) {
						if (currentSlideIndex === 0) {
							currentSlideIndex = numberOfSlides;
						} else if (currentSlideIndex > numberOfSlides) {
							currentSlideIndex = currentSlideIndex - numberOfSlides;
						}
					} else {
						currentSlideIndex = currentSlideIndex + 1;
					}
					
				}
				
				sliderInstance.find('.swift-slider-pagination .dot').removeClass('active');
				sliderInstance.find('.swift-slider-pagination .dot:nth-child('+currentSlideIndex+')').addClass('active');
			}
						
			// Set controls style based on the slide
			sliderInstance.find('.swift-slider-pagination, .swift-slider-prev, .swift-slider-next, .swift-slider-continue').removeClass('dark').removeClass('light').addClass(currentSlide.data('style'));
			
			if (currentSlideIndex === 1 && !sliderInstance.data('loop')) {
				sliderInstance.find('.swift-slider-prev').css('display', 'none');
				sliderInstance.find('.swift-slider-next').css('display', 'block');
			} else if (currentSlideIndex === sliderInstance.find('.swiper-slide').length && !sliderInstance.data('loop')) {
				sliderInstance.find('.swift-slider-prev').css('display', 'block');
				sliderInstance.find('.swift-slider-next').css('display', 'none');
			} else {
				sliderInstance.find('.swift-slider-prev').css('display', 'block');
				sliderInstance.find('.swift-slider-next').css('display', 'block');
			}
		},
		slideTransitionEnd: function(e, delay) {
			var sliderObject = e,
				sliderInstance = jQuery(sliderObject.container),
				currentSlide = jQuery(e.activeSlide()),
				currentIndex = e.activeIndex >= 0 ? e.activeIndex : 1,
				currentSlideID = currentSlide.data('slide-id') ? currentSlide.data('slide-id') : 1,
				timeoutDelay = delay || 0;
						
			// Resize the sliders
			swiftSlider.resizeSliders(sliderInstance);

			// Set content for each slide
			sliderInstance.find('.swiper-slide').each(function(i) {
				var slide = jQuery(this),
					slideID = slide.data('slide-id'),
					slideCaption = slide.find('.caption-content'),
					slideVideo = slide.find('.video-wrap > video');
				
				// Check if there is a video, and if so then pause it & set to start point
				if (slideVideo.length > 0) {
					if (!jQuery('html').hasClass('no-video') && !isMobileAlt) {
						slideVideo.get(0).pause();
						if (slideVideo.get(0).currentTime !== 0) {
							slideVideo.get(0).currentTime = 0;
						}
					} else {
						slideVideo.remove();
					}
				}
				
				// Reset caption position & opacity of other slides
				if (slideCaption.length > 0) {
					slideCaption.css({
						'margin-top': '',
						'padding-top': '',
						'padding-bottom': '',
						'opacity': '0'
					});
				}
				
				// animate current slide content
				if (slideID === currentSlideID) {
					// Play the active slide video, if there is one
					setTimeout(function() {
						if (!jQuery('html').hasClass('no-video')) {
							if (slideVideo.length > 0) {
								slideVideo.get(0).pause();
								slideVideo.get(0).play();
							}
						}
						
						// Fade in the current slide content
						if (slideCaption.length > 0) {
							var captionHeight = slideCaption.height();
							
							slideCaption.css('margin-top', - captionHeight / 2).stop().animate({
								'opacity': 1,
								'padding-top': 0,
								'padding-bottom': 0
							}, 800, 'easeOutQuart');
						}
					}, timeoutDelay);
				}
			});
		},
		setSliderContent: function(sliderInstance) {
			
			sliderInstance.find('.swiper-slide').each(function() {
				
				var content = jQuery(this).find('.caption-content'),
					contentHeight = content.height();
					
				// Set content vertically center
				content.css('margin-top', - contentHeight / 2);
				
			});
		}
	};
	
	var onReady = {
		init: function() {
			if (jQuery('.swift-slider').length > 0) {
				swiftSlider.init();
			}
		}
	};
	
	jQuery(document).ready(onReady.init);
	
})(jQuery);

/*
 * Swiper 2.6.1
 * Mobile touch slider and framework with hardware accelerated transitions
 *
 * http://www.idangero.us/sliders/swiper/
 *
 * Copyright 2010-2014, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under GPL & MIT
 *
 * Released on: May 6, 2014
*/
var Swiper=function(a,b){"use strict";function c(a,b){return document.querySelectorAll?(b||document).querySelectorAll(a):jQuery(a,b)}function d(a){return"[object Array]"===Object.prototype.toString.apply(a)?!0:!1}function e(){var a=F-I;return b.freeMode&&(a=F-I),b.slidesPerView>C.slides.length&&!b.centeredSlides&&(a=0),0>a&&(a=0),a}function f(){function a(a){var c=new Image;c.onload=function(){C&&void 0!==C.imagesLoaded&&C.imagesLoaded++,C.imagesLoaded===C.imagesToLoad.length&&(C.reInit(),b.onImagesReady&&C.fireCallback(b.onImagesReady,C))},c.src=a}var d=C.h.addEventListener,e="wrapper"===b.eventTarget?C.wrapper:C.container;if(C.browser.ie10||C.browser.ie11?(d(e,C.touchEvents.touchStart,p),d(document,C.touchEvents.touchMove,q),d(document,C.touchEvents.touchEnd,r)):(C.support.touch&&(d(e,"touchstart",p),d(e,"touchmove",q),d(e,"touchend",r)),b.simulateTouch&&(d(e,"mousedown",p),d(document,"mousemove",q),d(document,"mouseup",r))),b.autoResize&&d(window,"resize",C.resizeFix),g(),C._wheelEvent=!1,b.mousewheelControl){if(void 0!==document.onmousewheel&&(C._wheelEvent="mousewheel"),!C._wheelEvent)try{new WheelEvent("wheel"),C._wheelEvent="wheel"}catch(f){}C._wheelEvent||(C._wheelEvent="DOMMouseScroll"),C._wheelEvent&&d(C.container,C._wheelEvent,j)}if(b.keyboardControl&&d(document,"keydown",i),b.updateOnImagesReady){C.imagesToLoad=c("img",C.container);for(var h=0;h<C.imagesToLoad.length;h++)a(C.imagesToLoad[h].getAttribute("src"))}}function g(){var a,d=C.h.addEventListener;if(b.preventLinks){var e=c("a",C.container);for(a=0;a<e.length;a++)d(e[a],"click",n)}if(b.releaseFormElements){var f=c("input, textarea, select",C.container);for(a=0;a<f.length;a++)d(f[a],C.touchEvents.touchStart,o,!0)}if(b.onSlideClick)for(a=0;a<C.slides.length;a++)d(C.slides[a],"click",k);if(b.onSlideTouch)for(a=0;a<C.slides.length;a++)d(C.slides[a],C.touchEvents.touchStart,l)}function h(){var a,d=C.h.removeEventListener;if(b.onSlideClick)for(a=0;a<C.slides.length;a++)d(C.slides[a],"click",k);if(b.onSlideTouch)for(a=0;a<C.slides.length;a++)d(C.slides[a],C.touchEvents.touchStart,l);if(b.releaseFormElements){var e=c("input, textarea, select",C.container);for(a=0;a<e.length;a++)d(e[a],C.touchEvents.touchStart,o,!0)}if(b.preventLinks){var f=c("a",C.container);for(a=0;a<f.length;a++)d(f[a],"click",n)}}function i(a){var b=a.keyCode||a.charCode;if(!(a.shiftKey||a.altKey||a.ctrlKey||a.metaKey)){if(37===b||39===b||38===b||40===b){for(var c=!1,d=C.h.getOffset(C.container),e=C.h.windowScroll().left,f=C.h.windowScroll().top,g=C.h.windowWidth(),h=C.h.windowHeight(),i=[[d.left,d.top],[d.left+C.width,d.top],[d.left,d.top+C.height],[d.left+C.width,d.top+C.height]],j=0;j<i.length;j++){var k=i[j];k[0]>=e&&k[0]<=e+g&&k[1]>=f&&k[1]<=f+h&&(c=!0)}if(!c)return}M?((37===b||39===b)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),39===b&&C.swipeNext(),37===b&&C.swipePrev()):((38===b||40===b)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),40===b&&C.swipeNext(),38===b&&C.swipePrev())}}function j(a){var c=C._wheelEvent,d=0;if(a.detail)d=-a.detail;else if("mousewheel"===c)if(b.mousewheelControlForceToAxis)if(M){if(!(Math.abs(a.wheelDeltaX)>Math.abs(a.wheelDeltaY)))return;d=a.wheelDeltaX}else{if(!(Math.abs(a.wheelDeltaY)>Math.abs(a.wheelDeltaX)))return;d=a.wheelDeltaY}else d=a.wheelDelta;else if("DOMMouseScroll"===c)d=-a.detail;else if("wheel"===c)if(b.mousewheelControlForceToAxis)if(M){if(!(Math.abs(a.deltaX)>Math.abs(a.deltaY)))return;d=-a.deltaX}else{if(!(Math.abs(a.deltaY)>Math.abs(a.deltaX)))return;d=-a.deltaY}else d=Math.abs(a.deltaX)>Math.abs(a.deltaY)?-a.deltaX:-a.deltaY;if(b.freeMode){var f=C.getWrapperTranslate()+d;if(f>0&&(f=0),f<-e()&&(f=-e()),C.setWrapperTransition(0),C.setWrapperTranslate(f),C.updateActiveSlide(f),0===f||f===-e())return}else(new Date).getTime()-U>60&&(0>d?C.swipeNext():C.swipePrev()),U=(new Date).getTime();return b.autoplay&&C.stopAutoplay(!0),a.preventDefault?a.preventDefault():a.returnValue=!1,!1}function k(a){C.allowSlideClick&&(m(a),C.fireCallback(b.onSlideClick,C,a))}function l(a){m(a),C.fireCallback(b.onSlideTouch,C,a)}function m(a){if(a.currentTarget)C.clickedSlide=a.currentTarget;else{var c=a.srcElement;do{if(c.className.indexOf(b.slideClass)>-1)break;c=c.parentNode}while(c);C.clickedSlide=c}C.clickedSlideIndex=C.slides.indexOf(C.clickedSlide),C.clickedSlideLoopIndex=C.clickedSlideIndex-(C.loopedSlides||0)}function n(a){return C.allowLinks?void 0:(a.preventDefault?a.preventDefault():a.returnValue=!1,b.preventLinksPropagation&&"stopPropagation"in a&&a.stopPropagation(),!1)}function o(a){return a.stopPropagation?a.stopPropagation():a.returnValue=!1,!1}function p(a){if(b.preventLinks&&(C.allowLinks=!0),C.isTouched||b.onlyExternal)return!1;if(b.noSwiping&&(a.target||a.srcElement)&&s(a.target||a.srcElement))return!1;if($=!1,C.isTouched=!0,Z="touchstart"===a.type,!Z||1===a.targetTouches.length){C.callPlugins("onTouchStartBegin"),Z||C.isAndroid||(a.preventDefault?a.preventDefault():a.returnValue=!1);var c=Z?a.targetTouches[0].pageX:a.pageX||a.clientX,d=Z?a.targetTouches[0].pageY:a.pageY||a.clientY;C.touches.startX=C.touches.currentX=c,C.touches.startY=C.touches.currentY=d,C.touches.start=C.touches.current=M?c:d,C.setWrapperTransition(0),C.positions.start=C.positions.current=C.getWrapperTranslate(),C.setWrapperTranslate(C.positions.start),C.times.start=(new Date).getTime(),H=void 0,b.moveStartThreshold>0&&(W=!1),b.onTouchStart&&C.fireCallback(b.onTouchStart,C,a),C.callPlugins("onTouchStartEnd")}}function q(a){if(C.isTouched&&!b.onlyExternal&&(!Z||"mousemove"!==a.type)){var c=Z?a.targetTouches[0].pageX:a.pageX||a.clientX,d=Z?a.targetTouches[0].pageY:a.pageY||a.clientY;if("undefined"==typeof H&&M&&(H=!!(H||Math.abs(d-C.touches.startY)>Math.abs(c-C.touches.startX))),"undefined"!=typeof H||M||(H=!!(H||Math.abs(d-C.touches.startY)<Math.abs(c-C.touches.startX))),H)return void(C.isTouched=!1);if(a.assignedToSwiper)return void(C.isTouched=!1);if(a.assignedToSwiper=!0,b.preventLinks&&(C.allowLinks=!1),b.onSlideClick&&(C.allowSlideClick=!1),b.autoplay&&C.stopAutoplay(!0),!Z||1===a.touches.length){if(C.isMoved||(C.callPlugins("onTouchMoveStart"),b.loop&&(C.fixLoop(),C.positions.start=C.getWrapperTranslate()),b.onTouchMoveStart&&C.fireCallback(b.onTouchMoveStart,C)),C.isMoved=!0,a.preventDefault?a.preventDefault():a.returnValue=!1,C.touches.current=M?c:d,C.positions.current=(C.touches.current-C.touches.start)*b.touchRatio+C.positions.start,C.positions.current>0&&b.onResistanceBefore&&C.fireCallback(b.onResistanceBefore,C,C.positions.current),C.positions.current<-e()&&b.onResistanceAfter&&C.fireCallback(b.onResistanceAfter,C,Math.abs(C.positions.current+e())),b.resistance&&"100%"!==b.resistance){var f;if(C.positions.current>0&&(f=1-C.positions.current/I/2,C.positions.current=.5>f?I/2:C.positions.current*f),C.positions.current<-e()){var g=(C.touches.current-C.touches.start)*b.touchRatio+(e()+C.positions.start);f=(I+g)/I;var h=C.positions.current-g*(1-f)/2,i=-e()-I/2;C.positions.current=i>h||0>=f?i:h}}if(b.resistance&&"100%"===b.resistance&&(C.positions.current>0&&(!b.freeMode||b.freeModeFluid)&&(C.positions.current=0),C.positions.current<-e()&&(!b.freeMode||b.freeModeFluid)&&(C.positions.current=-e())),!b.followFinger)return;if(b.moveStartThreshold)if(Math.abs(C.touches.current-C.touches.start)>b.moveStartThreshold||W){if(!W)return W=!0,void(C.touches.start=C.touches.current);C.setWrapperTranslate(C.positions.current)}else C.positions.current=C.positions.start;else C.setWrapperTranslate(C.positions.current);return(b.freeMode||b.watchActiveIndex)&&C.updateActiveSlide(C.positions.current),b.grabCursor&&(C.container.style.cursor="move",C.container.style.cursor="grabbing",C.container.style.cursor="-moz-grabbin",C.container.style.cursor="-webkit-grabbing"),X||(X=C.touches.current),Y||(Y=(new Date).getTime()),C.velocity=(C.touches.current-X)/((new Date).getTime()-Y)/2,Math.abs(C.touches.current-X)<2&&(C.velocity=0),X=C.touches.current,Y=(new Date).getTime(),C.callPlugins("onTouchMoveEnd"),b.onTouchMove&&C.fireCallback(b.onTouchMove,C,a),!1}}}function r(a){if(H&&C.swipeReset(),!b.onlyExternal&&C.isTouched){C.isTouched=!1,b.grabCursor&&(C.container.style.cursor="move",C.container.style.cursor="grab",C.container.style.cursor="-moz-grab",C.container.style.cursor="-webkit-grab"),C.positions.current||0===C.positions.current||(C.positions.current=C.positions.start),b.followFinger&&C.setWrapperTranslate(C.positions.current),C.times.end=(new Date).getTime(),C.touches.diff=C.touches.current-C.touches.start,C.touches.abs=Math.abs(C.touches.diff),C.positions.diff=C.positions.current-C.positions.start,C.positions.abs=Math.abs(C.positions.diff);var c=C.positions.diff,d=C.positions.abs,f=C.times.end-C.times.start;5>d&&300>f&&C.allowLinks===!1&&(b.freeMode||0===d||C.swipeReset(),b.preventLinks&&(C.allowLinks=!0),b.onSlideClick&&(C.allowSlideClick=!0)),setTimeout(function(){b.preventLinks&&(C.allowLinks=!0),b.onSlideClick&&(C.allowSlideClick=!0)},100);var g=e();if(!C.isMoved&&b.freeMode)return C.isMoved=!1,b.onTouchEnd&&C.fireCallback(b.onTouchEnd,C,a),void C.callPlugins("onTouchEnd");if(!C.isMoved||C.positions.current>0||C.positions.current<-g)return C.swipeReset(),b.onTouchEnd&&C.fireCallback(b.onTouchEnd,C,a),void C.callPlugins("onTouchEnd");if(C.isMoved=!1,b.freeMode){if(b.freeModeFluid){var h,i=1e3*b.momentumRatio,j=C.velocity*i,k=C.positions.current+j,l=!1,m=20*Math.abs(C.velocity)*b.momentumBounceRatio;-g>k&&(b.momentumBounce&&C.support.transitions?(-m>k+g&&(k=-g-m),h=-g,l=!0,$=!0):k=-g),k>0&&(b.momentumBounce&&C.support.transitions?(k>m&&(k=m),h=0,l=!0,$=!0):k=0),0!==C.velocity&&(i=Math.abs((k-C.positions.current)/C.velocity)),C.setWrapperTranslate(k),C.setWrapperTransition(i),b.momentumBounce&&l&&C.wrapperTransitionEnd(function(){$&&(b.onMomentumBounce&&C.fireCallback(b.onMomentumBounce,C),C.callPlugins("onMomentumBounce"),C.setWrapperTranslate(h),C.setWrapperTransition(300))}),C.updateActiveSlide(k)}return(!b.freeModeFluid||f>=300)&&C.updateActiveSlide(C.positions.current),b.onTouchEnd&&C.fireCallback(b.onTouchEnd,C,a),void C.callPlugins("onTouchEnd")}G=0>c?"toNext":"toPrev","toNext"===G&&300>=f&&(30>d||!b.shortSwipes?C.swipeReset():C.swipeNext(!0)),"toPrev"===G&&300>=f&&(30>d||!b.shortSwipes?C.swipeReset():C.swipePrev(!0));var n=0;if("auto"===b.slidesPerView){for(var o,p=Math.abs(C.getWrapperTranslate()),q=0,r=0;r<C.slides.length;r++)if(o=M?C.slides[r].getWidth(!0,b.roundLengths):C.slides[r].getHeight(!0,b.roundLengths),q+=o,q>p){n=o;break}n>I&&(n=I)}else n=E*b.slidesPerView;"toNext"===G&&f>300&&(d>=n*b.longSwipesRatio?C.swipeNext(!0):C.swipeReset()),"toPrev"===G&&f>300&&(d>=n*b.longSwipesRatio?C.swipePrev(!0):C.swipeReset()),b.onTouchEnd&&C.fireCallback(b.onTouchEnd,C,a),C.callPlugins("onTouchEnd")}}function s(a){var c=!1;do a.className.indexOf(b.noSwipingClass)>-1&&(c=!0),a=a.parentElement;while(!c&&a.parentElement&&-1===a.className.indexOf(b.wrapperClass));return!c&&a.className.indexOf(b.wrapperClass)>-1&&a.className.indexOf(b.noSwipingClass)>-1&&(c=!0),c}function t(a,b){var c,d=document.createElement("div");return d.innerHTML=b,c=d.firstChild,c.className+=" "+a,c.outerHTML}function u(a,c,d){function e(){var f=+new Date,l=f-g;h+=i*l/(1e3/60),k="toNext"===j?h>a:a>h,k?(C.setWrapperTranslate(Math.round(h)),C._DOMAnimating=!0,window.setTimeout(function(){e()},1e3/60)):(b.onSlideChangeEnd&&("to"===c?d.runCallbacks===!0&&C.fireCallback(b.onSlideChangeEnd,C):C.fireCallback(b.onSlideChangeEnd,C)),C.setWrapperTranslate(a),C._DOMAnimating=!1)}var f="to"===c&&d.speed>=0?d.speed:b.speed,g=+new Date;if(C.support.transitions||!b.DOMAnimation)C.setWrapperTranslate(a),C.setWrapperTransition(f);else{var h=C.getWrapperTranslate(),i=Math.ceil((a-h)/f*(1e3/60)),j=h>a?"toNext":"toPrev",k="toNext"===j?h>a:a>h;if(C._DOMAnimating)return;e()}C.updateActiveSlide(a),b.onSlideNext&&"next"===c&&C.fireCallback(b.onSlideNext,C,a),b.onSlidePrev&&"prev"===c&&C.fireCallback(b.onSlidePrev,C,a),b.onSlideReset&&"reset"===c&&C.fireCallback(b.onSlideReset,C,a),("next"===c||"prev"===c||"to"===c&&d.runCallbacks===!0)&&v(c)}function v(a){if(C.callPlugins("onSlideChangeStart"),b.onSlideChangeStart)if(b.queueStartCallbacks&&C.support.transitions){if(C._queueStartCallbacks)return;C._queueStartCallbacks=!0,C.fireCallback(b.onSlideChangeStart,C,a),C.wrapperTransitionEnd(function(){C._queueStartCallbacks=!1})}else C.fireCallback(b.onSlideChangeStart,C,a);if(b.onSlideChangeEnd)if(C.support.transitions)if(b.queueEndCallbacks){if(C._queueEndCallbacks)return;C._queueEndCallbacks=!0,C.wrapperTransitionEnd(function(c){C.fireCallback(b.onSlideChangeEnd,c,a)})}else C.wrapperTransitionEnd(function(c){C.fireCallback(b.onSlideChangeEnd,c,a)});else b.DOMAnimation||setTimeout(function(){C.fireCallback(b.onSlideChangeEnd,C,a)},10)}function w(){var a=C.paginationButtons;if(a)for(var b=0;b<a.length;b++)C.h.removeEventListener(a[b],"click",y)}function x(){var a=C.paginationButtons;if(a)for(var b=0;b<a.length;b++)C.h.addEventListener(a[b],"click",y)}function y(a){for(var b,c=a.target||a.srcElement,d=C.paginationButtons,e=0;e<d.length;e++)c===d[e]&&(b=e);C.swipeTo(b)}function z(){_=setTimeout(function(){b.loop?(C.fixLoop(),C.swipeNext(!0)):C.swipeNext(!0)||(b.autoplayStopOnLast?(clearTimeout(_),_=void 0):C.swipeTo(0)),C.wrapperTransitionEnd(function(){"undefined"!=typeof _&&z()})},b.autoplay)}function A(){C.calcSlides(),b.loader.slides.length>0&&0===C.slides.length&&C.loadSlides(),b.loop&&C.createLoop(),C.init(),f(),b.pagination&&C.createPagination(!0),b.loop||b.initialSlide>0?C.swipeTo(b.initialSlide,0,!1):C.updateActiveSlide(0),b.autoplay&&C.startAutoplay(),C.centerIndex=C.activeIndex,b.onSwiperCreated&&C.fireCallback(b.onSwiperCreated,C),C.callPlugins("onSwiperCreated")}if(document.body.__defineGetter__&&HTMLElement){var B=HTMLElement.prototype;B.__defineGetter__&&B.__defineGetter__("outerHTML",function(){return(new XMLSerializer).serializeToString(this)})}if(window.getComputedStyle||(window.getComputedStyle=function(a){return this.el=a,this.getPropertyValue=function(b){var c=/(\-([a-z]){1})/g;return"float"===b&&(b="styleFloat"),c.test(b)&&(b=b.replace(c,function(){return arguments[2].toUpperCase()})),a.currentStyle[b]?a.currentStyle[b]:null},this}),Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){for(var c=b||0,d=this.length;d>c;c++)if(this[c]===a)return c;return-1}),(document.querySelectorAll||window.jQuery)&&"undefined"!=typeof a&&(a.nodeType||0!==c(a).length)){var C=this;C.touches={start:0,startX:0,startY:0,current:0,currentX:0,currentY:0,diff:0,abs:0},C.positions={start:0,abs:0,diff:0,current:0},C.times={start:0,end:0},C.id=(new Date).getTime(),C.container=a.nodeType?a:c(a)[0],C.isTouched=!1,C.isMoved=!1,C.activeIndex=0,C.centerIndex=0,C.activeLoaderIndex=0,C.activeLoopIndex=0,C.previousIndex=null,C.velocity=0,C.snapGrid=[],C.slidesGrid=[],C.imagesToLoad=[],C.imagesLoaded=0,C.wrapperLeft=0,C.wrapperRight=0,C.wrapperTop=0,C.wrapperBottom=0,C.isAndroid=navigator.userAgent.toLowerCase().indexOf("android")>=0;var D,E,F,G,H,I,J={eventTarget:"wrapper",mode:"horizontal",touchRatio:1,speed:300,freeMode:!1,freeModeFluid:!1,momentumRatio:1,momentumBounce:!0,momentumBounceRatio:1,slidesPerView:1,slidesPerGroup:1,slidesPerViewFit:!0,simulateTouch:!0,followFinger:!0,shortSwipes:!0,longSwipesRatio:.5,moveStartThreshold:!1,onlyExternal:!1,createPagination:!0,pagination:!1,paginationElement:"span",paginationClickable:!1,paginationAsRange:!0,resistance:!0,scrollContainer:!1,preventLinks:!0,preventLinksPropagation:!1,noSwiping:!1,noSwipingClass:"swiper-no-swiping",initialSlide:0,keyboardControl:!1,mousewheelControl:!1,mousewheelControlForceToAxis:!1,useCSS3Transforms:!0,autoplay:!1,autoplayDisableOnInteraction:!0,autoplayStopOnLast:!1,loop:!1,loopAdditionalSlides:0,roundLengths:!1,calculateHeight:!1,cssWidthAndHeight:!1,updateOnImagesReady:!0,releaseFormElements:!0,watchActiveIndex:!1,visibilityFullFit:!1,offsetPxBefore:0,offsetPxAfter:0,offsetSlidesBefore:0,offsetSlidesAfter:0,centeredSlides:!1,queueStartCallbacks:!1,queueEndCallbacks:!1,autoResize:!0,resizeReInit:!1,DOMAnimation:!0,loader:{slides:[],slidesHTMLType:"inner",surroundGroups:1,logic:"reload",loadAllSlides:!1},slideElement:"div",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",wrapperClass:"swiper-wrapper",paginationElementClass:"swiper-pagination-switch",paginationActiveClass:"swiper-active-switch",paginationVisibleClass:"swiper-visible-switch"};b=b||{};for(var K in J)if(K in b&&"object"==typeof b[K])for(var L in J[K])L in b[K]||(b[K][L]=J[K][L]);else K in b||(b[K]=J[K]);C.params=b,b.scrollContainer&&(b.freeMode=!0,b.freeModeFluid=!0),b.loop&&(b.resistance="100%");var M="horizontal"===b.mode,N=["mousedown","mousemove","mouseup"];C.browser.ie10&&(N=["MSPointerDown","MSPointerMove","MSPointerUp"]),C.browser.ie11&&(N=["pointerdown","pointermove","pointerup"]),C.touchEvents={touchStart:C.support.touch||!b.simulateTouch?"touchstart":N[0],touchMove:C.support.touch||!b.simulateTouch?"touchmove":N[1],touchEnd:C.support.touch||!b.simulateTouch?"touchend":N[2]};for(var O=C.container.childNodes.length-1;O>=0;O--)if(C.container.childNodes[O].className)for(var P=C.container.childNodes[O].className.split(/\s+/),Q=0;Q<P.length;Q++)P[Q]===b.wrapperClass&&(D=C.container.childNodes[O]);C.wrapper=D,C._extendSwiperSlide=function(a){return a.append=function(){return b.loop?a.insertAfter(C.slides.length-C.loopedSlides):(C.wrapper.appendChild(a),C.reInit()),a},a.prepend=function(){return b.loop?(C.wrapper.insertBefore(a,C.slides[C.loopedSlides]),C.removeLoopedSlides(),C.calcSlides(),C.createLoop()):C.wrapper.insertBefore(a,C.wrapper.firstChild),C.reInit(),a},a.insertAfter=function(c){if("undefined"==typeof c)return!1;var d;return b.loop?(d=C.slides[c+1+C.loopedSlides],d?C.wrapper.insertBefore(a,d):C.wrapper.appendChild(a),C.removeLoopedSlides(),C.calcSlides(),C.createLoop()):(d=C.slides[c+1],C.wrapper.insertBefore(a,d)),C.reInit(),a},a.clone=function(){return C._extendSwiperSlide(a.cloneNode(!0))},a.remove=function(){C.wrapper.removeChild(a),C.reInit()},a.html=function(b){return"undefined"==typeof b?a.innerHTML:(a.innerHTML=b,a)},a.index=function(){for(var b,c=C.slides.length-1;c>=0;c--)a===C.slides[c]&&(b=c);return b},a.isActive=function(){return a.index()===C.activeIndex?!0:!1},a.swiperSlideDataStorage||(a.swiperSlideDataStorage={}),a.getData=function(b){return a.swiperSlideDataStorage[b]},a.setData=function(b,c){return a.swiperSlideDataStorage[b]=c,a},a.data=function(b,c){return"undefined"==typeof c?a.getAttribute("data-"+b):(a.setAttribute("data-"+b,c),a)},a.getWidth=function(b,c){return C.h.getWidth(a,b,c)},a.getHeight=function(b,c){return C.h.getHeight(a,b,c)},a.getOffset=function(){return C.h.getOffset(a)},a},C.calcSlides=function(a){var c=C.slides?C.slides.length:!1;C.slides=[],C.displaySlides=[];for(var d=0;d<C.wrapper.childNodes.length;d++)if(C.wrapper.childNodes[d].className)for(var e=C.wrapper.childNodes[d].className,f=e.split(/\s+/),i=0;i<f.length;i++)f[i]===b.slideClass&&C.slides.push(C.wrapper.childNodes[d]);for(d=C.slides.length-1;d>=0;d--)C._extendSwiperSlide(C.slides[d]);c!==!1&&(c!==C.slides.length||a)&&(h(),g(),C.updateActiveSlide(),C.params.pagination&&C.createPagination(),C.callPlugins("numberOfSlidesChanged"))},C.createSlide=function(a,c,d){c=c||C.params.slideClass,d=d||b.slideElement;var e=document.createElement(d);return e.innerHTML=a||"",e.className=c,C._extendSwiperSlide(e)},C.appendSlide=function(a,b,c){return a?a.nodeType?C._extendSwiperSlide(a).append():C.createSlide(a,b,c).append():void 0},C.prependSlide=function(a,b,c){return a?a.nodeType?C._extendSwiperSlide(a).prepend():C.createSlide(a,b,c).prepend():void 0},C.insertSlideAfter=function(a,b,c,d){return"undefined"==typeof a?!1:b.nodeType?C._extendSwiperSlide(b).insertAfter(a):C.createSlide(b,c,d).insertAfter(a)},C.removeSlide=function(a){if(C.slides[a]){if(b.loop){if(!C.slides[a+C.loopedSlides])return!1;C.slides[a+C.loopedSlides].remove(),C.removeLoopedSlides(),C.calcSlides(),C.createLoop()}else C.slides[a].remove();return!0}return!1},C.removeLastSlide=function(){return C.slides.length>0?(b.loop?(C.slides[C.slides.length-1-C.loopedSlides].remove(),C.removeLoopedSlides(),C.calcSlides(),C.createLoop()):C.slides[C.slides.length-1].remove(),!0):!1},C.removeAllSlides=function(){for(var a=C.slides.length-1;a>=0;a--)C.slides[a].remove()},C.getSlide=function(a){return C.slides[a]},C.getLastSlide=function(){return C.slides[C.slides.length-1]},C.getFirstSlide=function(){return C.slides[0]},C.activeSlide=function(){return C.slides[C.activeIndex]},C.fireCallback=function(){var a=arguments[0];if("[object Array]"===Object.prototype.toString.call(a))for(var c=0;c<a.length;c++)"function"==typeof a[c]&&a[c](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);else"[object String]"===Object.prototype.toString.call(a)?b["on"+a]&&C.fireCallback(b["on"+a],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]):a(arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},C.addCallback=function(a,b){var c,e=this;return e.params["on"+a]?d(this.params["on"+a])?this.params["on"+a].push(b):"function"==typeof this.params["on"+a]?(c=this.params["on"+a],this.params["on"+a]=[],this.params["on"+a].push(c),this.params["on"+a].push(b)):void 0:(this.params["on"+a]=[],this.params["on"+a].push(b))},C.removeCallbacks=function(a){C.params["on"+a]&&(C.params["on"+a]=null)};var R=[];for(var S in C.plugins)if(b[S]){var T=C.plugins[S](C,b[S]);T&&R.push(T)}C.callPlugins=function(a,b){b||(b={});for(var c=0;c<R.length;c++)a in R[c]&&R[c][a](b)},!C.browser.ie10&&!C.browser.ie11||b.onlyExternal||C.wrapper.classList.add("swiper-wp8-"+(M?"horizontal":"vertical")),b.freeMode&&(C.container.className+=" swiper-free-mode"),C.initialized=!1,C.init=function(a,c){var d=C.h.getWidth(C.container,!1,b.roundLengths),e=C.h.getHeight(C.container,!1,b.roundLengths);if(d!==C.width||e!==C.height||a){C.width=d,C.height=e;var f,g,h,i,j,k,l;I=M?d:e;var m=C.wrapper;if(a&&C.calcSlides(c),"auto"===b.slidesPerView){var n=0,o=0;b.slidesOffset>0&&(m.style.paddingLeft="",m.style.paddingRight="",m.style.paddingTop="",m.style.paddingBottom=""),m.style.width="",m.style.height="",b.offsetPxBefore>0&&(M?C.wrapperLeft=b.offsetPxBefore:C.wrapperTop=b.offsetPxBefore),b.offsetPxAfter>0&&(M?C.wrapperRight=b.offsetPxAfter:C.wrapperBottom=b.offsetPxAfter),b.centeredSlides&&(M?(C.wrapperLeft=(I-this.slides[0].getWidth(!0,b.roundLengths))/2,C.wrapperRight=(I-C.slides[C.slides.length-1].getWidth(!0,b.roundLengths))/2):(C.wrapperTop=(I-C.slides[0].getHeight(!0,b.roundLengths))/2,C.wrapperBottom=(I-C.slides[C.slides.length-1].getHeight(!0,b.roundLengths))/2)),M?(C.wrapperLeft>=0&&(m.style.paddingLeft=C.wrapperLeft+"px"),C.wrapperRight>=0&&(m.style.paddingRight=C.wrapperRight+"px")):(C.wrapperTop>=0&&(m.style.paddingTop=C.wrapperTop+"px"),C.wrapperBottom>=0&&(m.style.paddingBottom=C.wrapperBottom+"px")),k=0;var p=0;for(C.snapGrid=[],C.slidesGrid=[],h=0,l=0;l<C.slides.length;l++){f=C.slides[l].getWidth(!0,b.roundLengths),g=C.slides[l].getHeight(!0,b.roundLengths),b.calculateHeight&&(h=Math.max(h,g));var q=M?f:g;if(b.centeredSlides){var r=l===C.slides.length-1?0:C.slides[l+1].getWidth(!0,b.roundLengths),s=l===C.slides.length-1?0:C.slides[l+1].getHeight(!0,b.roundLengths),t=M?r:s;if(q>I){if(b.slidesPerViewFit)C.snapGrid.push(k+C.wrapperLeft),C.snapGrid.push(k+q-I+C.wrapperLeft);else for(var u=0;u<=Math.floor(q/(I+C.wrapperLeft));u++)C.snapGrid.push(0===u?k+C.wrapperLeft:k+C.wrapperLeft+I*u);C.slidesGrid.push(k+C.wrapperLeft)}else C.snapGrid.push(p),C.slidesGrid.push(p);p+=q/2+t/2}else{if(q>I)if(b.slidesPerViewFit)C.snapGrid.push(k),C.snapGrid.push(k+q-I);else if(0!==I)for(var v=0;v<=Math.floor(q/I);v++)C.snapGrid.push(k+I*v);else C.snapGrid.push(k);else C.snapGrid.push(k);C.slidesGrid.push(k)}k+=q,n+=f,o+=g}b.calculateHeight&&(C.height=h),M?(F=n+C.wrapperRight+C.wrapperLeft,m.style.width=n+"px",m.style.height=C.height+"px"):(F=o+C.wrapperTop+C.wrapperBottom,m.style.width=C.width+"px",m.style.height=o+"px")}else if(b.scrollContainer)m.style.width="",m.style.height="",i=C.slides[0].getWidth(!0,b.roundLengths),j=C.slides[0].getHeight(!0,b.roundLengths),F=M?i:j,m.style.width=i+"px",m.style.height=j+"px",E=M?i:j;else{if(b.calculateHeight){for(h=0,j=0,M||(C.container.style.height=""),m.style.height="",l=0;l<C.slides.length;l++)C.slides[l].style.height="",h=Math.max(C.slides[l].getHeight(!0),h),M||(j+=C.slides[l].getHeight(!0));g=h,C.height=g,M?j=g:(I=g,C.container.style.height=I+"px")}else g=M?C.height:C.height/b.slidesPerView,b.roundLengths&&(g=Math.round(g)),j=M?C.height:C.slides.length*g;for(f=M?C.width/b.slidesPerView:C.width,b.roundLengths&&(f=Math.round(f)),i=M?C.slides.length*f:C.width,E=M?f:g,b.offsetSlidesBefore>0&&(M?C.wrapperLeft=E*b.offsetSlidesBefore:C.wrapperTop=E*b.offsetSlidesBefore),b.offsetSlidesAfter>0&&(M?C.wrapperRight=E*b.offsetSlidesAfter:C.wrapperBottom=E*b.offsetSlidesAfter),b.offsetPxBefore>0&&(M?C.wrapperLeft=b.offsetPxBefore:C.wrapperTop=b.offsetPxBefore),b.offsetPxAfter>0&&(M?C.wrapperRight=b.offsetPxAfter:C.wrapperBottom=b.offsetPxAfter),b.centeredSlides&&(M?(C.wrapperLeft=(I-E)/2,C.wrapperRight=(I-E)/2):(C.wrapperTop=(I-E)/2,C.wrapperBottom=(I-E)/2)),M?(C.wrapperLeft>0&&(m.style.paddingLeft=C.wrapperLeft+"px"),C.wrapperRight>0&&(m.style.paddingRight=C.wrapperRight+"px")):(C.wrapperTop>0&&(m.style.paddingTop=C.wrapperTop+"px"),C.wrapperBottom>0&&(m.style.paddingBottom=C.wrapperBottom+"px")),F=M?i+C.wrapperRight+C.wrapperLeft:j+C.wrapperTop+C.wrapperBottom,b.cssWidthAndHeight||(parseFloat(i)>0&&(m.style.width=i+"px"),parseFloat(j)>0&&(m.style.height=j+"px")),k=0,C.snapGrid=[],C.slidesGrid=[],l=0;l<C.slides.length;l++)C.snapGrid.push(k),C.slidesGrid.push(k),k+=E,b.cssWidthAndHeight||(parseFloat(f)>0&&(C.slides[l].style.width=f+"px"),parseFloat(g)>0&&(C.slides[l].style.height=g+"px"))}C.initialized?(C.callPlugins("onInit"),b.onInit&&C.fireCallback(b.onInit,C)):(C.callPlugins("onFirstInit"),b.onFirstInit&&C.fireCallback(b.onFirstInit,C)),C.initialized=!0}},C.reInit=function(a){C.init(!0,a)},C.resizeFix=function(a){C.callPlugins("beforeResizeFix"),C.init(b.resizeReInit||a),b.freeMode?C.getWrapperTranslate()<-e()&&(C.setWrapperTransition(0),C.setWrapperTranslate(-e())):(C.swipeTo(b.loop?C.activeLoopIndex:C.activeIndex,0,!1),b.autoplay&&(C.support.transitions&&"undefined"!=typeof _?"undefined"!=typeof _&&(clearTimeout(_),_=void 0,C.startAutoplay()):"undefined"!=typeof ab&&(clearInterval(ab),ab=void 0,C.startAutoplay()))),C.callPlugins("afterResizeFix")},C.destroy=function(){var a=C.h.removeEventListener,c="wrapper"===b.eventTarget?C.wrapper:C.container;C.browser.ie10||C.browser.ie11?(a(c,C.touchEvents.touchStart,p),a(document,C.touchEvents.touchMove,q),a(document,C.touchEvents.touchEnd,r)):(C.support.touch&&(a(c,"touchstart",p),a(c,"touchmove",q),a(c,"touchend",r)),b.simulateTouch&&(a(c,"mousedown",p),a(document,"mousemove",q),a(document,"mouseup",r))),b.autoResize&&a(window,"resize",C.resizeFix),h(),b.paginationClickable&&w(),b.mousewheelControl&&C._wheelEvent&&a(C.container,C._wheelEvent,j),b.keyboardControl&&a(document,"keydown",i),b.autoplay&&C.stopAutoplay(),C.callPlugins("onDestroy"),C=null},C.disableKeyboardControl=function(){b.keyboardControl=!1,C.h.removeEventListener(document,"keydown",i)},C.enableKeyboardControl=function(){b.keyboardControl=!0,C.h.addEventListener(document,"keydown",i)};var U=(new Date).getTime();if(C.disableMousewheelControl=function(){return C._wheelEvent?(b.mousewheelControl=!1,C.h.removeEventListener(C.container,C._wheelEvent,j),!0):!1},C.enableMousewheelControl=function(){return C._wheelEvent?(b.mousewheelControl=!0,C.h.addEventListener(C.container,C._wheelEvent,j),!0):!1},b.grabCursor){var V=C.container.style;V.cursor="move",V.cursor="grab",V.cursor="-moz-grab",V.cursor="-webkit-grab"}C.allowSlideClick=!0,C.allowLinks=!0;var W,X,Y,Z=!1,$=!0;C.swipeNext=function(a){!a&&b.loop&&C.fixLoop(),!a&&b.autoplay&&C.stopAutoplay(!0),C.callPlugins("onSwipeNext");var c=C.getWrapperTranslate(),d=c;if("auto"===b.slidesPerView){for(var f=0;f<C.snapGrid.length;f++)if(-c>=C.snapGrid[f]&&-c<C.snapGrid[f+1]){d=-C.snapGrid[f+1];break}}else{var g=E*b.slidesPerGroup;d=-(Math.floor(Math.abs(c)/Math.floor(g))*g+g)}return d<-e()&&(d=-e()),d===c?!1:(u(d,"next"),!0)},C.swipePrev=function(a){!a&&b.loop&&C.fixLoop(),!a&&b.autoplay&&C.stopAutoplay(!0),C.callPlugins("onSwipePrev");var c,d=Math.ceil(C.getWrapperTranslate());if("auto"===b.slidesPerView){c=0;for(var e=1;e<C.snapGrid.length;e++){if(-d===C.snapGrid[e]){c=-C.snapGrid[e-1];break}if(-d>C.snapGrid[e]&&-d<C.snapGrid[e+1]){c=-C.snapGrid[e];break}}}else{var f=E*b.slidesPerGroup;c=-(Math.ceil(-d/f)-1)*f}return c>0&&(c=0),c===d?!1:(u(c,"prev"),!0)},C.swipeReset=function(){C.callPlugins("onSwipeReset");{var a,c=C.getWrapperTranslate(),d=E*b.slidesPerGroup;-e()}if("auto"===b.slidesPerView){a=0;for(var f=0;f<C.snapGrid.length;f++){if(-c===C.snapGrid[f])return;if(-c>=C.snapGrid[f]&&-c<C.snapGrid[f+1]){a=C.positions.diff>0?-C.snapGrid[f+1]:-C.snapGrid[f];break}}-c>=C.snapGrid[C.snapGrid.length-1]&&(a=-C.snapGrid[C.snapGrid.length-1]),c<=-e()&&(a=-e())}else a=0>c?Math.round(c/d)*d:0;return b.scrollContainer&&(a=0>c?c:0),a<-e()&&(a=-e()),b.scrollContainer&&I>E&&(a=0),a===c?!1:(u(a,"reset"),!0)},C.swipeTo=function(a,c,d){a=parseInt(a,10),C.callPlugins("onSwipeTo",{index:a,speed:c}),b.loop&&(a+=C.loopedSlides);var f=C.getWrapperTranslate();if(!(a>C.slides.length-1||0>a)){var g;return g="auto"===b.slidesPerView?-C.slidesGrid[a]:-a*E,g<-e()&&(g=-e()),g===f?!1:(d=d===!1?!1:!0,u(g,"to",{index:a,speed:c,runCallbacks:d}),!0)}},C._queueStartCallbacks=!1,C._queueEndCallbacks=!1,C.updateActiveSlide=function(a){if(C.initialized&&0!==C.slides.length){C.previousIndex=C.activeIndex,"undefined"==typeof a&&(a=C.getWrapperTranslate()),a>0&&(a=0);var c;if("auto"===b.slidesPerView){if(C.activeIndex=C.slidesGrid.indexOf(-a),C.activeIndex<0){for(c=0;c<C.slidesGrid.length-1&&!(-a>C.slidesGrid[c]&&-a<C.slidesGrid[c+1]);c++);var d=Math.abs(C.slidesGrid[c]+a),e=Math.abs(C.slidesGrid[c+1]+a);C.activeIndex=e>=d?c:c+1}}else C.activeIndex=Math[b.visibilityFullFit?"ceil":"round"](-a/E);if(C.activeIndex===C.slides.length&&(C.activeIndex=C.slides.length-1),C.activeIndex<0&&(C.activeIndex=0),C.slides[C.activeIndex]){if(C.calcVisibleSlides(a),C.support.classList){var f;for(c=0;c<C.slides.length;c++)f=C.slides[c],f.classList.remove(b.slideActiveClass),C.visibleSlides.indexOf(f)>=0?f.classList.add(b.slideVisibleClass):f.classList.remove(b.slideVisibleClass);C.slides[C.activeIndex].classList.add(b.slideActiveClass)}else{var g=new RegExp("\\s*"+b.slideActiveClass),h=new RegExp("\\s*"+b.slideVisibleClass);for(c=0;c<C.slides.length;c++)C.slides[c].className=C.slides[c].className.replace(g,"").replace(h,""),C.visibleSlides.indexOf(C.slides[c])>=0&&(C.slides[c].className+=" "+b.slideVisibleClass);C.slides[C.activeIndex].className+=" "+b.slideActiveClass}if(b.loop){var i=C.loopedSlides;C.activeLoopIndex=C.activeIndex-i,C.activeLoopIndex>=C.slides.length-2*i&&(C.activeLoopIndex=C.slides.length-2*i-C.activeLoopIndex),C.activeLoopIndex<0&&(C.activeLoopIndex=C.slides.length-2*i+C.activeLoopIndex),C.activeLoopIndex<0&&(C.activeLoopIndex=0)}else C.activeLoopIndex=C.activeIndex;b.pagination&&C.updatePagination(a)}}},C.createPagination=function(a){if(b.paginationClickable&&C.paginationButtons&&w(),C.paginationContainer=b.pagination.nodeType?b.pagination:c(b.pagination)[0],b.createPagination){var d="",e=C.slides.length,f=e;b.loop&&(f-=2*C.loopedSlides);for(var g=0;f>g;g++)d+="<"+b.paginationElement+' class="'+b.paginationElementClass+'"></'+b.paginationElement+">";C.paginationContainer.innerHTML=d}C.paginationButtons=c("."+b.paginationElementClass,C.paginationContainer),a||C.updatePagination(),C.callPlugins("onCreatePagination"),b.paginationClickable&&x()},C.updatePagination=function(a){if(b.pagination&&!(C.slides.length<1)){var d=c("."+b.paginationActiveClass,C.paginationContainer);
if(d){var e=C.paginationButtons;if(0!==e.length){for(var f=0;f<e.length;f++)e[f].className=b.paginationElementClass;var g=b.loop?C.loopedSlides:0;if(b.paginationAsRange){C.visibleSlides||C.calcVisibleSlides(a);var h,i=[];for(h=0;h<C.visibleSlides.length;h++){var j=C.slides.indexOf(C.visibleSlides[h])-g;b.loop&&0>j&&(j=C.slides.length-2*C.loopedSlides+j),b.loop&&j>=C.slides.length-2*C.loopedSlides&&(j=C.slides.length-2*C.loopedSlides-j,j=Math.abs(j)),i.push(j)}for(h=0;h<i.length;h++)e[i[h]]&&(e[i[h]].className+=" "+b.paginationVisibleClass);b.loop?void 0!==e[C.activeLoopIndex]&&(e[C.activeLoopIndex].className+=" "+b.paginationActiveClass):e[C.activeIndex].className+=" "+b.paginationActiveClass}else b.loop?e[C.activeLoopIndex]&&(e[C.activeLoopIndex].className+=" "+b.paginationActiveClass+" "+b.paginationVisibleClass):e[C.activeIndex].className+=" "+b.paginationActiveClass+" "+b.paginationVisibleClass}}}},C.calcVisibleSlides=function(a){var c=[],d=0,e=0,f=0;M&&C.wrapperLeft>0&&(a+=C.wrapperLeft),!M&&C.wrapperTop>0&&(a+=C.wrapperTop);for(var g=0;g<C.slides.length;g++){d+=e,e="auto"===b.slidesPerView?M?C.h.getWidth(C.slides[g],!0,b.roundLengths):C.h.getHeight(C.slides[g],!0,b.roundLengths):E,f=d+e;var h=!1;b.visibilityFullFit?(d>=-a&&-a+I>=f&&(h=!0),-a>=d&&f>=-a+I&&(h=!0)):(f>-a&&-a+I>=f&&(h=!0),d>=-a&&-a+I>d&&(h=!0),-a>d&&f>-a+I&&(h=!0)),h&&c.push(C.slides[g])}0===c.length&&(c=[C.slides[C.activeIndex]]),C.visibleSlides=c};var _,ab;C.startAutoplay=function(){if(C.support.transitions){if("undefined"!=typeof _)return!1;if(!b.autoplay)return;C.callPlugins("onAutoplayStart"),b.onAutoplayStart&&C.fireCallback(b.onAutoplayStart,C),z()}else{if("undefined"!=typeof ab)return!1;if(!b.autoplay)return;C.callPlugins("onAutoplayStart"),b.onAutoplayStart&&C.fireCallback(b.onAutoplayStart,C),ab=setInterval(function(){b.loop?(C.fixLoop(),C.swipeNext(!0)):C.swipeNext(!0)||(b.autoplayStopOnLast?(clearInterval(ab),ab=void 0):C.swipeTo(0))},b.autoplay)}},C.stopAutoplay=function(a){if(C.support.transitions){if(!_)return;_&&clearTimeout(_),_=void 0,a&&!b.autoplayDisableOnInteraction&&C.wrapperTransitionEnd(function(){z()}),C.callPlugins("onAutoplayStop"),b.onAutoplayStop&&C.fireCallback(b.onAutoplayStop,C)}else ab&&clearInterval(ab),ab=void 0,C.callPlugins("onAutoplayStop"),b.onAutoplayStop&&C.fireCallback(b.onAutoplayStop,C)},C.loopCreated=!1,C.removeLoopedSlides=function(){if(C.loopCreated)for(var a=0;a<C.slides.length;a++)C.slides[a].getData("looped")===!0&&C.wrapper.removeChild(C.slides[a])},C.createLoop=function(){if(0!==C.slides.length){C.loopedSlides="auto"===b.slidesPerView?b.loopedSlides||1:b.slidesPerView+b.loopAdditionalSlides,C.loopedSlides>C.slides.length&&(C.loopedSlides=C.slides.length);var a,c="",d="",e="",f=C.slides.length,g=Math.floor(C.loopedSlides/f),h=C.loopedSlides%f;for(a=0;g*f>a;a++){var i=a;if(a>=f){var j=Math.floor(a/f);i=a-f*j}e+=C.slides[i].outerHTML}for(a=0;h>a;a++)d+=t(b.slideDuplicateClass,C.slides[a].outerHTML);for(a=f-h;f>a;a++)c+=t(b.slideDuplicateClass,C.slides[a].outerHTML);var k=c+e+D.innerHTML+e+d;for(D.innerHTML=k,C.loopCreated=!0,C.calcSlides(),a=0;a<C.slides.length;a++)(a<C.loopedSlides||a>=C.slides.length-C.loopedSlides)&&C.slides[a].setData("looped",!0);C.callPlugins("onCreateLoop")}},C.fixLoop=function(){var a;C.activeIndex<C.loopedSlides?(a=C.slides.length-3*C.loopedSlides+C.activeIndex,C.swipeTo(a,0,!1)):("auto"===b.slidesPerView&&C.activeIndex>=2*C.loopedSlides||C.activeIndex>C.slides.length-2*b.slidesPerView)&&(a=-C.slides.length+C.activeIndex+C.loopedSlides,C.swipeTo(a,0,!1))},C.loadSlides=function(){var a="";C.activeLoaderIndex=0;for(var c=b.loader.slides,d=b.loader.loadAllSlides?c.length:b.slidesPerView*(1+b.loader.surroundGroups),e=0;d>e;e++)a+="outer"===b.loader.slidesHTMLType?c[e]:"<"+b.slideElement+' class="'+b.slideClass+'" data-swiperindex="'+e+'">'+c[e]+"</"+b.slideElement+">";C.wrapper.innerHTML=a,C.calcSlides(!0),b.loader.loadAllSlides||C.wrapperTransitionEnd(C.reloadSlides,!0)},C.reloadSlides=function(){var a=b.loader.slides,c=parseInt(C.activeSlide().data("swiperindex"),10);if(!(0>c||c>a.length-1)){C.activeLoaderIndex=c;var d=Math.max(0,c-b.slidesPerView*b.loader.surroundGroups),e=Math.min(c+b.slidesPerView*(1+b.loader.surroundGroups)-1,a.length-1);if(c>0){var f=-E*(c-d);C.setWrapperTranslate(f),C.setWrapperTransition(0)}var g;if("reload"===b.loader.logic){C.wrapper.innerHTML="";var h="";for(g=d;e>=g;g++)h+="outer"===b.loader.slidesHTMLType?a[g]:"<"+b.slideElement+' class="'+b.slideClass+'" data-swiperindex="'+g+'">'+a[g]+"</"+b.slideElement+">";C.wrapper.innerHTML=h}else{var i=1e3,j=0;for(g=0;g<C.slides.length;g++){var k=C.slides[g].data("swiperindex");d>k||k>e?C.wrapper.removeChild(C.slides[g]):(i=Math.min(k,i),j=Math.max(k,j))}for(g=d;e>=g;g++){var l;i>g&&(l=document.createElement(b.slideElement),l.className=b.slideClass,l.setAttribute("data-swiperindex",g),l.innerHTML=a[g],C.wrapper.insertBefore(l,C.wrapper.firstChild)),g>j&&(l=document.createElement(b.slideElement),l.className=b.slideClass,l.setAttribute("data-swiperindex",g),l.innerHTML=a[g],C.wrapper.appendChild(l))}}C.reInit(!0)}},A()}};Swiper.prototype={plugins:{},wrapperTransitionEnd:function(a,b){"use strict";function c(){if(a(e),e.params.queueEndCallbacks&&(e._queueEndCallbacks=!1),!b)for(d=0;d<g.length;d++)e.h.removeEventListener(f,g[d],c)}var d,e=this,f=e.wrapper,g=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"];if(a)for(d=0;d<g.length;d++)e.h.addEventListener(f,g[d],c)},getWrapperTranslate:function(a){"use strict";var b,c,d,e,f=this.wrapper;return"undefined"==typeof a&&(a="horizontal"===this.params.mode?"x":"y"),this.support.transforms&&this.params.useCSS3Transforms?(d=window.getComputedStyle(f,null),window.WebKitCSSMatrix?e=new WebKitCSSMatrix("none"===d.webkitTransform?"":d.webkitTransform):(e=d.MozTransform||d.OTransform||d.MsTransform||d.msTransform||d.transform||d.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),b=e.toString().split(",")),"x"===a&&(c=window.WebKitCSSMatrix?e.m41:parseFloat(16===b.length?b[12]:b[4])),"y"===a&&(c=window.WebKitCSSMatrix?e.m42:parseFloat(16===b.length?b[13]:b[5]))):("x"===a&&(c=parseFloat(f.style.left,10)||0),"y"===a&&(c=parseFloat(f.style.top,10)||0)),c||0},setWrapperTranslate:function(a,b,c){"use strict";var d,e=this.wrapper.style,f={x:0,y:0,z:0};3===arguments.length?(f.x=a,f.y=b,f.z=c):("undefined"==typeof b&&(b="horizontal"===this.params.mode?"x":"y"),f[b]=a),this.support.transforms&&this.params.useCSS3Transforms?(d=this.support.transforms3d?"translate3d("+f.x+"px, "+f.y+"px, "+f.z+"px)":"translate("+f.x+"px, "+f.y+"px)",e.webkitTransform=e.MsTransform=e.msTransform=e.MozTransform=e.OTransform=e.transform=d):(e.left=f.x+"px",e.top=f.y+"px"),this.callPlugins("onSetWrapperTransform",f),this.params.onSetWrapperTransform&&this.fireCallback(this.params.onSetWrapperTransform,this,f)},setWrapperTransition:function(a){"use strict";var b=this.wrapper.style;b.webkitTransitionDuration=b.MsTransitionDuration=b.msTransitionDuration=b.MozTransitionDuration=b.OTransitionDuration=b.transitionDuration=a/1e3+"s",this.callPlugins("onSetWrapperTransition",{duration:a}),this.params.onSetWrapperTransition&&this.fireCallback(this.params.onSetWrapperTransition,this,a)},h:{getWidth:function(a,b,c){"use strict";var d=window.getComputedStyle(a,null).getPropertyValue("width"),e=parseFloat(d);return(isNaN(e)||d.indexOf("%")>0)&&(e=a.offsetWidth-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-left"))-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-right"))),b&&(e+=parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-left"))+parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-right"))),c?Math.round(e):e},getHeight:function(a,b,c){"use strict";if(b)return a.offsetHeight;var d=window.getComputedStyle(a,null).getPropertyValue("height"),e=parseFloat(d);return(isNaN(e)||d.indexOf("%")>0)&&(e=a.offsetHeight-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-top"))-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-bottom"))),b&&(e+=parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-top"))+parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-bottom"))),c?Math.round(e):e},getOffset:function(a){"use strict";var b=a.getBoundingClientRect(),c=document.body,d=a.clientTop||c.clientTop||0,e=a.clientLeft||c.clientLeft||0,f=window.pageYOffset||a.scrollTop,g=window.pageXOffset||a.scrollLeft;return document.documentElement&&!window.pageYOffset&&(f=document.documentElement.scrollTop,g=document.documentElement.scrollLeft),{top:b.top+f-d,left:b.left+g-e}},windowWidth:function(){"use strict";return window.innerWidth?window.innerWidth:document.documentElement&&document.documentElement.clientWidth?document.documentElement.clientWidth:void 0},windowHeight:function(){"use strict";return window.innerHeight?window.innerHeight:document.documentElement&&document.documentElement.clientHeight?document.documentElement.clientHeight:void 0},windowScroll:function(){"use strict";return"undefined"!=typeof pageYOffset?{left:window.pageXOffset,top:window.pageYOffset}:document.documentElement?{left:document.documentElement.scrollLeft,top:document.documentElement.scrollTop}:void 0},addEventListener:function(a,b,c,d){"use strict";"undefined"==typeof d&&(d=!1),a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},removeEventListener:function(a,b,c,d){"use strict";"undefined"==typeof d&&(d=!1),a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)}},setTransform:function(a,b){"use strict";var c=a.style;c.webkitTransform=c.MsTransform=c.msTransform=c.MozTransform=c.OTransform=c.transform=b},setTranslate:function(a,b){"use strict";var c=a.style,d={x:b.x||0,y:b.y||0,z:b.z||0},e=this.support.transforms3d?"translate3d("+d.x+"px,"+d.y+"px,"+d.z+"px)":"translate("+d.x+"px,"+d.y+"px)";c.webkitTransform=c.MsTransform=c.msTransform=c.MozTransform=c.OTransform=c.transform=e,this.support.transforms||(c.left=d.x+"px",c.top=d.y+"px")},setTransition:function(a,b){"use strict";var c=a.style;c.webkitTransitionDuration=c.MsTransitionDuration=c.msTransitionDuration=c.MozTransitionDuration=c.OTransitionDuration=c.transitionDuration=b+"ms"},support:{touch:window.Modernizr&&Modernizr.touch===!0||function(){"use strict";return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===!0||function(){"use strict";var a=document.createElement("div").style;return"webkitPerspective"in a||"MozPerspective"in a||"OPerspective"in a||"MsPerspective"in a||"perspective"in a}(),transforms:window.Modernizr&&Modernizr.csstransforms===!0||function(){"use strict";var a=document.createElement("div").style;return"transform"in a||"WebkitTransform"in a||"MozTransform"in a||"msTransform"in a||"MsTransform"in a||"OTransform"in a}(),transitions:window.Modernizr&&Modernizr.csstransitions===!0||function(){"use strict";var a=document.createElement("div").style;return"transition"in a||"WebkitTransition"in a||"MozTransition"in a||"msTransition"in a||"MsTransition"in a||"OTransition"in a}(),classList:function(){"use strict";var a=document.createElement("div").style;return"classList"in a}()},browser:{ie8:function(){"use strict";var a=-1;if("Microsoft Internet Explorer"===navigator.appName){var b=navigator.userAgent,c=new RegExp(/MSIE ([0-9]{1,}[\.0-9]{0,})/);null!==c.exec(b)&&(a=parseFloat(RegExp.$1))}return-1!==a&&9>a}(),ie10:window.navigator.msPointerEnabled,ie11:window.navigator.pointerEnabled}},(window.jQuery||window.Zepto)&&!function(a){"use strict";a.fn.swiper=function(b){var c=new Swiper(a(this)[0],b);return a(this).data("swiper",c),c}}(window.jQuery||window.Zepto),"undefined"!=typeof module&&(module.exports=Swiper),"function"==typeof define&&define.amd&&define([],function(){"use strict";return Swiper});


/*
 * Swiper Smooth Progress 1.1.0
 * Smooth progress plugin for Swiper
 *
 * http://www.idangero.us/sliders/swiper/plugins/progress.php
 *
 * Copyright 2010-2014, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under GPL & MIT
 *
 * Released on: January 29, 2014
*/
Swiper.prototype.plugins.progress=function(a){function b(){for(var b=0;b<a.slides.length;b++){var c=a.slides[b];c.progressSlideSize=e?a.h.getWidth(c):a.h.getHeight(c),c.progressSlideOffset="offsetLeft"in c?e?c.offsetLeft:c.offsetTop:e?c.getOffset().left-a.h.getOffset(a.container).left:c.getOffset().top-a.h.getOffset(a.container).top}d=e?a.h.getWidth(a.wrapper)+a.wrapperLeft+a.wrapperRight-a.width:a.h.getHeight(a.wrapper)+a.wrapperTop+a.wrapperBottom-a.height}function c(b){var c,b=b||{x:0,y:0,z:0};c=1==a.params.centeredSlides?e?-b.x+a.width/2:-b.y+a.height/2:e?-b.x:-b.y;for(var f=0;f<a.slides.length;f++){var g=a.slides[f],h=1==a.params.centeredSlides?g.progressSlideSize/2:0,i=(c-g.progressSlideOffset-h)/g.progressSlideSize;g.progress=i}a.progress=e?-b.x/d:-b.y/d,a.params.onProgressChange&&a.fireCallback(a.params.onProgressChange,a)}var d,e="horizontal"==a.params.mode,f={onFirstInit:function(){b(),c({x:a.getWrapperTranslate("x"),y:a.getWrapperTranslate("y")})},onInit:function(){b()},onSetWrapperTransform:function(a){c(a)}};return f};

/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 4.0.0-pre
 *
 * Requires: jQuery 1.7+
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

        // Events that need to be added to fixHooks
    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        // Events that will be listened for
        // The wheel event is most modern
        // The DomMouseScroll and MozMousePixelScroll are for older Firefoxs
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    // Make sure we register the toFix events as mouse related
    // events so jQuery will apply standard mouse fixes
    for ( var i = toFix.length; i; ) {
        $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
    }

    // The mousewheel special event
    var special = $.event.special.mousewheel = {
        version: '4.0.0-pre',

        // Runs once per an element
        // Tell jQuery we'll handle how the event is added
        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special._getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special._getPageHeight(this));
        },

        // Runs once per an event handler
        // Use this to modify the handler function
        // based on any "settings" that are passed
        add: function(handleObj) {
            // Settings are stored in mousewheel namespace on the data object
            var data     = handleObj.data,
                settings = data && data.mousewheel;
            if ( settings ) {
                // throttle and debounce get applied first
                if ( 'throttle' in settings || 'debounce' in settings ) {
                    special._delayHandler.call(this, handleObj);
                }
                // intent gets applied last so that it will be called
                // first since it deals with the initial interaction
                if ( 'intent' in settings ) {
                    special._intentHandler.call(this, handleObj);
                }
            }
        },

        // Runs when $().trigger() is called
        // Used to make sure the handler gets appropriately called
        trigger: function(data, event) {
            if (!event) {
                event = data;
                data  = null;
            }

            handler.call(this, event);

            // Let jQuery know we fully handled the trigger call
            return false;
        },

        // Runs once per an element
        // Tell jQuery we'll handle how the event is removed
        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        },

        // Used to get the line height multiplier when deltaMode is 1
        _getLineHeight: function(elem) {
            return parseInt($(elem).offsetParent().css('fontSize'), 10);
        },

        // Used to get the page height multiplier when deltaMode is 2
        _getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true
        },

        trigger: function(data, event) {
            if (!event) {
                event = data;
                data = null
            }

            handler.call(this, event);

            return false;
        },

        // All the related delta fixing logic
        _fix: function(orgEvent) {
            var delta	 = 0,
            	deltaX   = 0,
                deltaY   = 0,
                absDelta = 0,
                event    = $.event.fix(orgEvent);

            // Old school scrollwheel delta
            if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail; }
            if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta  * -1; }
            if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY * -1; }
            if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

            // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
            if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
                deltaX = deltaY;
                deltaY = 0;
            }

            // New school wheel delta (wheel event)
            if ( 'deltaY' in orgEvent ) { deltaY = orgEvent.deltaY; }
            if ( 'deltaX' in orgEvent ) { deltaX = orgEvent.deltaX; }

            // No change actually happened, no reason to go any further
            if ( deltaY === 0 && deltaX === 0 ) { return; }

            // Need to convert lines and pages to pixels if we aren't already in pixels
            // There are three delta modes:
            //   * deltaMode 0 is by pixels, nothing to do
            //   * deltaMode 1 is by lines
            //   * deltaMode 2 is by pages
            if ( orgEvent.deltaMode === 1 ) {
                var lineHeight = $.data(this, 'mousewheel-line-height');
                delta  *= lineHeight;
                deltaY *= lineHeight;
                deltaX *= lineHeight;
            } else if ( orgEvent.deltaMode === 2 ) {
                var pageHeight = $.data(this, 'mousewheel-page-height');
                delta  *= pageHeight;
                deltaY *= pageHeight;
                deltaX *= pageHeight;
            }

            // Store lowest absolute delta to normalize the delta values
            absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

            if ( !lowestDelta || absDelta < lowestDelta ) {
                lowestDelta = absDelta;

                // Adjust older deltas if necessary
                if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                    lowestDelta /= 40;
                }
            }

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                // Divide all the things by 40!
                delta  /= 40;
                deltaX /= 40;
                deltaY /= 40;
            }

            // Get a whole, normalized value for the deltas
            deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
            deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

            // Add information to the event object
            event.deltaX = deltaX;
            event.deltaY = deltaY;
            event.deltaFactor = lowestDelta;
            // Go ahead and set deltaMode to 0 since we converted to pixels
            // Although this is a little odd since we overwrite the deltaX/Y
            // properties with normalized deltas.
            event.deltaMode = 0;

            event.type = 'mousewheel';

            return event;
        },

        // Returns a new handler that checks for users intent
        // by monitoring the mouse movement
        // Can use as:
        //   { mousewheel: { intent: true } }
        // Or customize the default settings:
        //   { mousewheel: { intent { interval: 300, sensitivity: 2 } }
        // Can also pass preventDefault and stopPropagation which will
        // be called for all events that aren't passed to the original
        // event handler.
        _intentHandler: function(handleObj) {
            var timeout, pX, pY, cX, cY,
                hasIntent   = false,
                elem        = this,
                settings    = handleObj.data.mousewheel.intent,
                interval    = settings.interval || 100,
                sensitivity = settings.sensitivity || 7,
                oldHandler  = handleObj.handler,
                track       = function(event) {
                    cX = event.pageX;
                    cY = event.pageY;
                },
                compare    = function() {
                    if ( (Math.abs(pX-cX) + Math.abs(pY-cY)) < sensitivity ) {
                        $(elem).off('mousemove', track);
                        hasIntent = true;
                    } else {
                        pX = cX;
                        pY = cY;
                        timeout = setTimeout(compare, interval);
                    }
                },
                newHandler = function(event) {
                    if (hasIntent) { return oldHandler.apply(elem, arguments); }
                    else { preventAndStopIfSet(settings, event); }
                };

            $(elem).on('mouseenter', function() {
                pX = event.pageX;
                pY = event.pageY;
                $(elem).on('mousemove', track);
                timeout = setTimeout(compare, interval);
            }).on('mouseleave', function() {
                if (timeout) { clearTimeout(timeout); }
                $(elem).off('mousemove', track);
                hasIntent = false;
            });

            handleObj.handler = newHandler;
        },

        // Returns a new handler that uses either throttling or debouncing
        // Can be used as:
        //   { mousewheel: { debounce: true } }
        //   { mousewheel: { throttle: true } }
        // Or customize the default settings
        //   { mousewheel: { debounce: { delay: 500, maxDelay: 2000 } }
        // Can also pass preventDefault and stopPropagation which will
        // be called for all events.
        _delayHandler: function(handleObj) {
            var delayTimeout, maxTimeout, lastRun,
                elem       = this,
                method     = 'throttle' in handleObj.data.mousewheel ? 'throttle' : 'debounce',
                settings   = handleObj.data.mousewheel[method],
                leading    = 'leading' in settings ? settings.leading : method === 'debounce' ? false : true,
                trailing   = 'trailing' in settings ? settings.trailing : true,
                delay      = settings.delay || 100,
                maxDelay   = method === 'throttle' ? delay : settings.maxDelay,
                oldHandler = handleObj.handler,
                newHandler = function(event) {
                    var args = arguments,
                        clear = function() {
                            if ( maxTimeout ) { clearTimeout(maxTimeout); }
                            delayTimeout  = null;
                            maxTimeout    = null;
                            lastRun       = null;
                        },
                        run = function() {
                            lastRun = +new Date();
                            return oldHandler.apply(elem, args);
                        },
                        maxDelayed = function() {
                            maxTimeout = null;
                            return run();
                        },
                        delayed = function() {
                            clear();
                            if ( trailing ) { return run(); }
                        },
                        result;

                    if ( delayTimeout ) {
                        clearTimeout(delayTimeout);
                    } else {
                        if ( leading ) { result = run(); }
                    }

                    delayTimeout = setTimeout(delayed, delay);

                    if ( method === 'throttle' ) {
                        if ( maxDelay && (+new Date() - lastRun) >= maxDelay ) { result = maxDelayed(); }
                    } else if ( maxDelay && !maxTimeout ) {
                        maxTimeout = setTimeout(maxDelayed, maxDelay);
                    }

                    preventAndStopIfSet(settings, event);

                    return result;
                };
            handleObj.handler = newHandler;
        }
    };

    // What is actually bound to the element
    function handler(event) {
        // Might be trigged event, so check for the originalEvent first
        var orgEvent = event ? event.originalEvent || event : window.event,
            args     = slice.call(arguments, 1);

        event = special._fix(orgEvent);

        // Add event to the front of the arguments
        args.unshift(event);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return $.event.dispatch.apply(this, args);
    }

    // Used to clear out the last lowest delta value in a delayed fashion
    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

    // Used by intent and delay handlers
    function preventAndStopIfSet(settings, event) {
        if (settings.preventDefault  === true) { event.preventDefault();  }
        if (settings.stopPropagation === true) { event.stopPropagation(); }
    }

}));