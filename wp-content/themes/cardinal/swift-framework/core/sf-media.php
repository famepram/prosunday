<?php
	
	/*
	*
	*	Swift Framework Media Functions
	*	------------------------------------------------
	*	Swift Framework v3.0
	* 	Copyright Swift Ideas 2014 - http://www.swiftideas.net
	*
	*	sf_return_slider()
	*	sf_video_embed()
	*	sf_video_youtube()
	*	sf_video_vimeo()
	*	sf_get_embed_src()
	*	sf_featured_img_title()
	*	sf_swift_slider()
	*
	*/

	
	/* REVSLIDER RETURN FUNCTION
	================================================== */
	function sf_return_slider($revslider_shortcode) {
	    ob_start();
	    putRevSlider($revslider_shortcode);
	    return ob_get_clean();
	}


	/* VIDEO EMBED FUNCTIONS
	================================================== */
	if (!function_exists('sf_video_embed')) {
		function sf_video_embed($url, $width = 640, $height = 480) {
			if (strpos($url,'youtube') || strpos($url,'youtu.be')){
				return sf_video_youtube($url, $width, $height);
			} else {
				return sf_video_vimeo($url, $width, $height);
			}
		}
	}
	
	if (!function_exists('sf_video_youtube')) {
		function sf_video_youtube($url, $width = 640, $height = 480) {
			preg_match('/[\\?\\&]v=([^\\?\\&]+)/', $url, $video_id);
			$youtube_params = apply_filters('sf_youtube_embed_params', '?wmode=transparent');
			if (is_ssl()) {
				return '<iframe itemprop="video" class="video-embed" src="https://www.youtube.com/embed/'. $video_id[1] . $youtube_params .'" width="'. $width .'" height="'. $height .'" ></iframe>';
			} else {
				return '<iframe itemprop="video" class="video-embed" src="http://www.youtube.com/embed/'. $video_id[1] . $youtube_params .'" width="'. $width .'" height="'. $height .'" ></iframe>';
			}
		}
	}
	
	if (!function_exists('sf_video_vimeo')) {
		function sf_video_vimeo($url, $width = 640, $height = 480) {
			$url = str_replace('https://', 'http://', $url);
			preg_match('/http:\/\/vimeo.com\/(\d+)$/', $url, $video_id);		
			$vimeo_params = apply_filters('sf_vimeo_embed_params', '?title=0&amp;byline=0&amp;portrait=0&wmode=transparent');
			if (is_ssl()) {
				return '<iframe itemprop="video" class="video-embed" src="https://player.vimeo.com/video/'. $video_id[1] . $vimeo_params .'" width="'. $width .'" height="'. $height .'"></iframe>';
			} else {
				return '<iframe itemprop="video" class="video-embed" src="http://player.vimeo.com/video/'. $video_id[1] . $vimeo_params .'" width="'. $width .'" height="'. $height .'"></iframe>';
			}
		}
	}
	
	if (!function_exists('sf_get_embed_src')) {
		function sf_get_embed_src($url) {
			if (strpos($url,'youtube')){
				preg_match('/[\\?\\&]v=([^\\?\\&]+)/', $url, $video_id);
				if (is_ssl()) {
					if (isset($video_id[1])) {
						return 'https://www.youtube.com/embed/'. $video_id[1] .'?autoplay=1&amp;wmode=transparent';
					}
				} else {
					if (isset($video_id[1])) {
						return 'http://www.youtube.com/embed/'. $video_id[1] .'?autoplay=1&amp;wmode=transparent';
					}
				}
			} else {
				$url = str_replace('https://', 'http://', $url);
				preg_match('/http:\/\/vimeo.com\/(\d+)$/', $url, $video_id);
				if (is_ssl()) {
					if (isset($video_id[1])) {
						return 'https://player.vimeo.com/video/'. $video_id[1] .'?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1&amp;wmode=transparent';
					}
				} else {
					if (isset($video_id[1])) {
						return 'http://player.vimeo.com/video/'. $video_id[1] .'?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1&amp;wmode=transparent';
					}
				}
			}
		}
	}	
		
	/* FEATURED IMAGE TITLE
	================================================== */
	function sf_featured_img_title() {
		global $post;
		$sf_thumbnail_id = get_post_thumbnail_id($post->ID);
		$sf_thumbnail_image = get_posts(array('p' => $sf_thumbnail_id, 'post_type' => 'attachment', 'post_status' => 'any'));
		if ($sf_thumbnail_image && isset($sf_thumbnail_image[0])) {
			return $sf_thumbnail_image[0]->post_title;
		}
	}
?>