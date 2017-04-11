<?php

	/*
	*
	*	Swift Page Builder - Page Slider Function Class
	*	------------------------------------------------
	*	Swift Framework
	* 	Copyright Swift Ideas 2014 - http://www.swiftideas.net
	*
	*
	*/
	
	if (!function_exists('sf_pageslider')) {
		function sf_pageslider() {
			global $post;
				
			if (!is_page()) {
				return;
			}
			
			// Get page slider meta values
			$page_slider = sf_get_post_meta($post->ID, 'sf_page_slider', true);
			
			// Swift Slider meta
			$ss_type = sf_get_post_meta($post->ID, 'sf_ss_type', true);
			$ss_category = sf_get_post_meta($post->ID, 'sf_ss_category', true);
			$ss_fs = sf_get_post_meta($post->ID, 'sf_ss_fs', true);
			$ss_maxheight = sf_get_post_meta($post->ID, 'sf_ss_maxheight', true);
			$ss_slidecount = sf_get_post_meta($post->ID, 'sf_ss_slides', true);
			$ss_loop = sf_get_post_meta($post->ID, 'sf_ss_loop', true);
			$ss_nav = sf_get_post_meta($post->ID, 'sf_ss_nav', true);
			$ss_pagination = sf_get_post_meta($post->ID, 'sf_ss_pagination', true);

			// Revolution Slider ID
			$rs_ID = sf_get_post_meta($post->ID, 'sf_rev_slider_alias', true);
			
			// LayerSlider ID
			$ls_ID = sf_get_post_meta($post->ID, 'sf_layerslider_id', true);
			
			// Master Slider ID
			$ms_ID = sf_get_post_meta($post->ID, 'sf_masterslider_id', true);
						
			?>
			
			<?php if ($page_slider == "swift-slider") { ?>
				
				<?php echo do_shortcode('[swift_slider type="'.$ss_type.'" category="'.$ss_category.'" fullscreen="'.$ss_fs.'" max_height="'.$ss_maxheight.'" slide_count="'.$ss_slidecount.'" loop="'.$ss_loop.'" nav="'.$ss_nav.'" pagination="'.$ss_pagination.'"]'); ?>
			
			<?php } else if ($page_slider == "revslider" && $rs_ID != "") { ?>
				
				<div class="home-slider-wrap">
					<a href="#container" id="slider-continue"><i class="ss-navigatedown"></i></a>
					<?php if (function_exists('putRevSlider')) {
						putRevSlider($rs_ID);
					} ?>
				</div>
				
			<?php } else if ($page_slider == "layerslider" && $ls_ID != "") { ?>
			
				<div class="home-slider-wrap">
					<?php echo do_shortcode('[layerslider id="'.$ls_ID.'"]'); ?>
				</div>
				
			<?php } else if ($page_slider == "masterslider" && $ms_ID != "") { ?>
			
				<div class="home-slider-wrap">
					<?php echo do_shortcode('[masterslider id="'.$ms_ID.'"]'); ?>
				</div>
				
			<?php }
		}
	}
?>