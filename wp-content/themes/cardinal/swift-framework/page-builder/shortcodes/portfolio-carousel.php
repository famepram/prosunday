<?php

class SwiftPageBuilderShortcode_spb_portfolio_carousel extends SwiftPageBuilderShortcode {

    protected function content($atts, $content = null) {

		    $title = $category = $item_class = $width = $el_class = $output = $filter = $items = $el_position = '';
		
	        extract(shortcode_atts(array(
		        'title' => '',
	        	"item_count"	=> '12',
	        	'item_columns' => '4',
	        	"category"		=> 'all',
	        	'el_position' => '',
	        	'width' => '1/1',
	        	'el_class' => ''
	        ), $atts));
	        
	        // CATEGORY SLUG MODIFICATION
	        if ($category == "All") {$category = "all";}
	        if ($category == "all") {$category = '';}
	        $category_slug = str_replace('_', '-', $category);
		    
    		global $post, $wp_query, $sf_carouselID;
    		
    		if ($sf_carouselID == "") {
    		$sf_carouselID = 1;
    		} else {
    		$sf_carouselID++;
    		}
    		
    		$portfolio_args=array(
    			'post_type' => 'portfolio',
    			'post_status' => 'publish',
    			'portfolio-category' => $category_slug,
    			'posts_per_page' => $item_count,
    			'no_found_rows' => 1
    			);
    			    		
    		$portfolio_items = new WP_Query( $portfolio_args );
    		
    		$count = 0;
    		
    		$figure_width = 300;
    		$figure_height = 225;
    		
    		if ($item_columns == "3") {
    			$figure_width = 400;
    			$figure_height = 300;
    		} if ($item_columns == "2") {
    			$figure_width = 600;
    			$figure_height = 450;
    		}
    		    		
    		$sidebar_config = sf_get_post_meta(get_the_ID(), 'sf_sidebar_config', true);
    		
    		if (is_singular('portfolio')) {
    		$sidebar_config = "no-sidebars";
    		}
    		    		
			$items .= '<div id="carousel-'.$sf_carouselID.'" class="portfolio-items carousel-items gutters clearfix" data-columns="'.$item_columns.'" data-auto="false">';
	
			while ( $portfolio_items->have_posts() ) : $portfolio_items->the_post();
								
				$item_title = get_the_title();				
				$thumb_type = sf_get_post_meta($post->ID, 'sf_thumbnail_type', true);
				$thumb_image = rwmb_meta('sf_thumbnail_image', 'type=image&size=full');
				$thumb_video = sf_get_post_meta($post->ID, 'sf_thumbnail_video_url', true);
				$thumb_gallery = rwmb_meta( 'sf_thumbnail_gallery', 'type=image&size=thumb-image' );
				$thumb_link_type = sf_get_post_meta($post->ID, 'sf_thumbnail_link_type', true);
				$thumb_link_url = sf_get_post_meta($post->ID, 'sf_thumbnail_link_url', true);
				$thumb_lightbox_thumb = rwmb_meta( 'sf_thumbnail_image', 'type=image&size=large' );
				$thumb_lightbox_image = rwmb_meta( 'sf_thumbnail_link_image', 'type=image&size=large' );
				$thumb_lightbox_video_url = sf_get_post_meta($post->ID, 'sf_thumbnail_link_video_url', true);
				$thumb_lightbox_video_url = sf_get_embed_src($thumb_lightbox_video_url);
				
				foreach ($thumb_image as $detail_image) {
					$thumb_img_url = $detail_image['url'];
					break;
				}
												
				if (!$thumb_image) {
					$thumb_image = get_post_thumbnail_id();
					$thumb_img_url = wp_get_attachment_url( $thumb_image, 'full' );
				}
					
				$thumb_lightbox_img_url = wp_get_attachment_url( $thumb_lightbox_image, 'full' );				
				
				$item_title = get_the_title();
				$item_subtitle = sf_get_post_meta($post->ID, 'sf_portfolio_subtitle', true);
				$permalink = get_permalink();
								
				if ($thumb_link_type == "link_to_url") {
					$link_config = 'href="'.$thumb_link_url.'" class="link-to-url"';
					$item_icon = "ss-link";
				} else if ($thumb_link_type == "link_to_url_nw") {
					$link_config = 'href="'.$thumb_link_url.'" class="link-to-url" target="_blank"';
					$item_icon = "ss-link";
				} else if ($thumb_link_type == "lightbox_thumb") {
					$link_config = 'href="'.$thumb_img_url.'" class="lightbox" rel="ilightbox[portfolio]"';
					$item_icon = "ss-view";
				} else if ($thumb_link_type == "lightbox_image") {
					$lightbox_image_url = '';
					foreach ($thumb_lightbox_image as $image) {
						$lightbox_image_url = $image['full_url'];
					}
					$link_config = 'href="'.$lightbox_image_url.'" class="lightbox" rel="ilightbox[portfolio]"';	
					$item_icon = "ss-view";
				} else if ($thumb_link_type == "lightbox_video") {
					$link_config = 'data-video="'.$thumb_lightbox_video_url.'" href="#" class="fw-video-link"';
					$item_icon = "ss-video";				
				} else {
					$link_config = 'href="'.$permalink.'" class="link-to-post"';
					$item_icon = "ss-navigateright";
				}
				    					   	
				$items .= '<div itemscope data-id="id-'. $count .'" class="clearfix carousel-item portfolio-item">';
				
				$items .= '<figure class="animated-overlay">';
						
				// THUMBNAIL MEDIA TYPE SETUP
				
				if ($thumb_type == "video") {
					
						$video = sf_video_embed($thumb_video, $figure_width, $figure_height);
					
					$items .= $video;
					
				} else if ($thumb_type == "slider") {
					
					$items .= '<div class="flexslider thumb-slider"><ul class="slides">';
								
					foreach ( $thumb_gallery as $image )
					{
						$alt = $image['alt'];
						if (!$alt) {
						$alt = $image['title'];
						}
					    $items .= "<li><a ".$link_config."><img src='{$image['url']}' width='{$image['width']}' height='{$image['height']}' alt='{$alt}' /></a></li>";
					}
																	
					$items .= '</ul></div>';
					
				} else {
					
					if ($thumb_type == "image" && $thumb_img_url == "") {
						$thumb_img_url = "default";
					}
					
					$image = sf_aq_resize( $thumb_img_url, $figure_width, $figure_height, true, false);
					    					  					
					if($image) {						
						$items .= '<img itemprop="image" src="'.$image[0].'" width="'.$image[1].'" height="'.$image[2].'" alt="'.$item_title.'" />';
						$items .= '<a '.$link_config.'></a>';						    			
						$items .= '<figcaption><div class="thumb-info">';
						$items .= '<h4>'.$item_title.'</h4>';
						if ($item_subtitle != "") {
						$items .= '<div class="name-divide"></div>';
						$items .= '<h5>'.$item_subtitle.'</h5>';
						}
						$items .= '</div></figcaption>';			    						
					}
				}
				
				$items .= '</figure>';

				$items .= '</div>';
				$count++;
			
			endwhile;
			
			wp_reset_query();
			wp_reset_postdata();
			
			$items .= '</div>';
    		        	
        	$width = spb_translateColumnWidthToSpan($width);
    		$el_class = $this->getExtraClass($el_class);
                 
            $output .= "\n\t".'<div class="spb_portfolio_carousel_widget carousel-asset spb_content_element '.$width.$el_class.'">';
            $output .= "\n\t\t".'<div class="spb-asset-content">'; 
            $output .= "\n\t\t".'<div class="title-wrap clearfix">';	 
        	if ($title != '') { $output .= '<h3 class="spb-heading"><span>'.$title.'</span></h3>'; }
        	$output .= '<div class="carousel-arrows"><a href="#" class="carousel-prev"><i class="ss-navigateleft"></i></a><a href="#" class="carousel-next"><i class="ss-navigateright"></i></a></div>';
        	$output .= '</div>';
            $output .= "\n\t\t".$items;
            $output .= "\n\t\t".'</div>';
            $output .= "\n\t".'</div> '.$this->endBlockComment($width);
    
            $output = $this->startRow($el_position) . $output . $this->endRow($el_position);
            
            global $sf_include_carousel, $sf_include_isotope;
            $sf_include_carousel = true;
            $sf_include_isotope = true;
            
            return $output;
		
    }
}

SPBMap::map( 'spb_portfolio_carousel', array(
    "name"		=> __("Portfolio Carousel", "swift-framework-admin"),
    "base"		=> "spb_portfolio_carousel",
    "class"		=> "spb_portfolio_carousel spb_carousel",
    "icon"      => "spb-icon-portfolio-carousel",
    "params"	=> array(
	    array(
	        "type" => "textfield",
	        "heading" => __("Widget title", "swift-framework-admin"),
	        "param_name" => "title",
	        "value" => "",
	        "description" => __("Heading text. Leave it empty if not needed.", "swift-framework-admin")
	    ),
        array(
            "type" => "textfield",
            "class" => "",
            "heading" => __("Number of items", "swift-framework-admin"),
            "param_name" => "item_count",
            "value" => "12",
            "description" => __("The number of portfolio items to show in the carousel.", "swift-framework-admin")
        ),
        array(
            "type" => "dropdown",
            "heading" => __("Columns", "swift-framework-admin"),
            "param_name" => "item_columns",
            "value" => array(
            			__('2', "swift-framework-admin") => "2",
            			__('3', "swift-framework-admin") => "3",
            			__('4', "swift-framework-admin") => "4",
            			__('5', "swift-framework-admin") => "5"
            		),
            "description" => __("Choose the amount of columns you would like for the clients asset.", "swift-framework-admin")
        ),
        array(
            "type" => "select-multiple",
            "heading" => __("Portfolio category", "swift-framework-admin"),
            "param_name" => "category",
            "value" => sf_get_category_list('portfolio-category'),
            "description" => __("Choose the category for the portfolio items.", "swift-framework-admin")
        ),
        array(
            "type" => "textfield",
            "heading" => __("Extra class name", "swift-framework-admin"),
            "param_name" => "el_class",
            "value" => "",
            "description" => __("If you wish to style this particular content element differently, then use this field to add a class name and then refer to it in your css file.", "swift-framework-admin")
        )
    )
) );

?>