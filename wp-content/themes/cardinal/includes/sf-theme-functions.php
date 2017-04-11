<?php
	
	/*
	*
	*	Swift Framework Theme Functions
	*	------------------------------------------------
	*	Swift Framework v3.0
	* 	Copyright Swift Ideas 2014 - http://www.swiftideas.net
	*
	*	sf_theme_activation()
	*	sf_bwm_filter()
	*	sf_bwm_filter_script()
	*	sf_filter_wp_title()
	*	sf_maintenance_mode()
	*	sf_custom_login_logo()
	*	sf_language_flags()
	*	sf_hex2rgb()
	*	sf_get_comments_number()
	*	sf_get_menus_list()
	*	sf_get_category_list()
	*	sf_get_category_list_key_array()
	*	sf_get_woo_product_filters_array()
	*	sf_add_nofollow_cat()
	*	sf_remove_head_links()
	*	sf_current_page_url()
	*	sf_woocommerce_activated()
	*	sf_gravityforms_activated()
	*	sf_gopricing_activated()
	*	sf_gravityforms_list()
	*	sf_gopricing_list()
	*	sf_global_include_classes()
	*	sf_admin_bar_menu()
	*	sf_admin_css()
	*
	*/
	
	
	/* CUSTOMIZER COLOUR MIGRATION
	================================================== */
    function sf_run_migration() {
        $GLOBALS['sf_customizer']['design_style_type'] = get_option('design_style_type', 'minimal');
        $GLOBALS['sf_customizer']['accent_color'] = get_option('accent_color', '#fe504f');
        $GLOBALS['sf_customizer']['accent_alt_color'] = get_option('accent_alt_color', '#ffffff');
        $GLOBALS['sf_customizer']['secondary_accent_color'] = get_option('secondary_accent_color', '#222222');
        $GLOBALS['sf_customizer']['secondary_accent_alt_color'] = get_option('secondary_accent_alt_color', '#ffffff');
        $GLOBALS['sf_customizer']['page_bg_color'] = get_option('page_bg_color', '#222222');
        $GLOBALS['sf_customizer']['inner_page_bg_transparent'] = get_option('inner_page_bg_transparent', 'color');
        $GLOBALS['sf_customizer']['inner_page_bg_color'] = get_option('inner_page_bg_color', '#FFFFFF');
        $GLOBALS['sf_customizer']['section_divide_color'] = get_option('section_divide_color', '#e4e4e4');
        $GLOBALS['sf_customizer']['alt_bg_color'] = get_option('alt_bg_color', '#f7f7f7');
        $GLOBALS['sf_customizer']['topbar_bg_color'] = get_option('topbar_bg_color', '#ffffff');
        $GLOBALS['sf_customizer']['topbar_text_color'] = get_option('topbar_text_color', '#222222');
        $GLOBALS['sf_customizer']['topbar_link_color'] = get_option('topbar_link_color', '#666666');
        $GLOBALS['sf_customizer']['topbar_link_hover_color'] = get_option('topbar_link_hover_color', '#fe504f');
        $GLOBALS['sf_customizer']['topbar_divider_color'] = get_option('topbar_divider_color', '#e3e3e3');
        $GLOBALS['sf_customizer']['header_bg_color'] = get_option('header_bg_color', '#ffffff');
        $GLOBALS['sf_customizer']['header_bg_transparent'] = get_option('header_bg_transparent', 'color');
        $GLOBALS['sf_customizer']['header_border_color'] = get_option('header_border_color', '#e4e4e4');
        $GLOBALS['sf_customizer']['header_text_color'] = get_option('header_text_color', '#222');
        $GLOBALS['sf_customizer']['header_link_color'] = get_option('header_link_color', '#222');
        $GLOBALS['sf_customizer']['header_link_hover_color'] = get_option('header_link_hover_color', '#fe504f');
        $GLOBALS['sf_customizer']['header_divider_style'] = get_option('header_divider_style', 'divider');
        $GLOBALS['sf_customizer']['mobile_menu_bg_color'] = get_option('mobile_menu_bg_color', '#222');
        $GLOBALS['sf_customizer']['mobile_menu_divider_color'] = get_option('mobile_menu_divider_color', '#444');
        $GLOBALS['sf_customizer']['mobile_menu_text_color'] = get_option('mobile_menu_text_color', '#e4e4e4');
        $GLOBALS['sf_customizer']['mobile_menu_link_color'] = get_option('mobile_menu_link_color', '#fff');
        $GLOBALS['sf_customizer']['mobile_menu_link_hover_color'] = get_option('mobile_menu_link_hover_color', '#fe504f');
        $GLOBALS['sf_customizer']['nav_hover_style'] = get_option('nav_hover_style', 'standard');
        $GLOBALS['sf_customizer']['nav_bg_color'] = get_option('nav_bg_color', '#fff');
        $GLOBALS['sf_customizer']['nav_text_color'] = get_option('nav_text_color', '#252525');
        $GLOBALS['sf_customizer']['nav_bg_hover_color'] = get_option('nav_bg_hover_color', '#f7f7f7');
        $GLOBALS['sf_customizer']['nav_text_hover_color'] = get_option('nav_text_hover_color', '#fe504f');
        $GLOBALS['sf_customizer']['nav_selected_bg_color'] = get_option('nav_selected_bg_color', '#e3e3e3');
        $GLOBALS['sf_customizer']['nav_selected_text_color'] = get_option('nav_selected_text_color', '#fe504f');
        $GLOBALS['sf_customizer']['nav_pointer_color'] = get_option('nav_pointer_color', '#07c1b6');
        $GLOBALS['sf_customizer']['nav_sm_bg_color'] = get_option('nav_sm_bg_color', '#FFFFFF');
        $GLOBALS['sf_customizer']['nav_sm_text_color'] = get_option('nav_sm_text_color', '#666666');
        $GLOBALS['sf_customizer']['nav_sm_bg_hover_color'] = get_option('nav_sm_bg_hover_color', '#f7f7f7');
        $GLOBALS['sf_customizer']['nav_sm_text_hover_color'] = get_option('nav_sm_text_hover_color', '#000000');
        $GLOBALS['sf_customizer']['nav_sm_selected_text_color'] = get_option('nav_sm_selected_text_color', '#000000');
        $GLOBALS['sf_customizer']['nav_divider'] = get_option('nav_divider', 'solid');
        $GLOBALS['sf_customizer']['nav_divider_color'] = get_option('nav_divider_color', '#f0f0f0');
        $GLOBALS['sf_customizer']['overlay_menu_bg_color'] = get_option('overlay_menu_bg_color', '#fe504f');
        $GLOBALS['sf_customizer']['overlay_menu_link_color'] = get_option('overlay_menu_link_color', '#ffffff');
        $GLOBALS['sf_customizer']['overlay_menu_link_hover_color'] = get_option('overlay_menu_link_hover_color', '#fe504f');
        $GLOBALS['sf_customizer']['overlay_menu_link_hover_bg_color'] = get_option('overlay_menu_link_hover_bg_color', '#ffffff');
        $GLOBALS['sf_customizer']['promo_bar_bg_color'] = get_option('promo_bar_bg_color', '#e4e4e4');
        $GLOBALS['sf_customizer']['promo_bar_text_color'] = get_option('promo_bar_text_color', '#222');
        $GLOBALS['sf_customizer']['breadcrumb_bg_color'] = get_option('breadcrumb_bg_color', '#e4e4e4');
        $GLOBALS['sf_customizer']['breadcrumb_text_color'] = get_option('breadcrumb_text_color', '#666666');
        $GLOBALS['sf_customizer']['breadcrumb_link_color'] = get_option('breadcrumb_link_color', '#999999');
        $GLOBALS['sf_customizer']['page_heading_bg_color'] = get_option('page_heading_bg_color', '#f7f7f7');
        $GLOBALS['sf_customizer']['page_heading_text_color'] = get_option('page_heading_text_color', '#222222');
        $GLOBALS['sf_customizer']['page_heading_text_align'] = get_option('page_heading_text_align', 'left');
        $GLOBALS['sf_customizer']['body_color'] = get_option('body_color', '#222222');
        $GLOBALS['sf_customizer']['body_alt_color'] = get_option('body_alt_color', '#222222');
        $GLOBALS['sf_customizer']['link_color'] = get_option('link_color', '#444444');
        $GLOBALS['sf_customizer']['link_hover_color'] = get_option('link_hover_color', '#999999');
        $GLOBALS['sf_customizer']['h1_color'] = get_option('h1_color', '#222222');
        $GLOBALS['sf_customizer']['h2_color'] = get_option('h2_color', '#222222');
        $GLOBALS['sf_customizer']['h3_color'] = get_option('h3_color', '#222222');
        $GLOBALS['sf_customizer']['h4_color'] = get_option('h4_color', '#222222');
        $GLOBALS['sf_customizer']['h5_color'] = get_option('h5_color', '#222222');
        $GLOBALS['sf_customizer']['h6_color'] = get_option('h6_color', '#222222');
        $GLOBALS['sf_customizer']['overlay_bg_color'] = get_option('overlay_bg_color', '#fe504f');
        $GLOBALS['sf_customizer']['overlay_text_color'] = get_option('overlay_text_color', '#ffffff');
        $GLOBALS['sf_customizer']['article_review_bar_alt_color'] = get_option('article_review_bar_alt_color', '#f7f7f7');
        $GLOBALS['sf_customizer']['article_review_bar_color'] = get_option('article_review_bar_color', '#2e2e36');
        $GLOBALS['sf_customizer']['article_review_bar_text_color'] = get_option('article_review_bar_text_color', '#fff');
        $GLOBALS['sf_customizer']['article_extras_bg_color'] = get_option('article_extras_bg_color', '#f7f7f7');
        $GLOBALS['sf_customizer']['article_np_bg_color'] = get_option('article_np_bg_color', '#444');
        $GLOBALS['sf_customizer']['article_np_text_color'] = get_option('article_np_text_color', '#fff');
        $GLOBALS['sf_customizer']['input_bg_color'] = get_option('input_bg_color', '#f7f7f7');
        $GLOBALS['sf_customizer']['input_text_color'] = get_option('input_text_color', '#222222');
        $GLOBALS['sf_customizer']['icon_container_bg_color'] = get_option('icon_container_bg_color', '#1dc6df');
        $GLOBALS['sf_customizer']['sf_icon_color'] = get_option('sf_icon_color', '#1dc6df');
        $GLOBALS['sf_customizer']['icon_container_hover_bg_color'] = get_option('icon_container_hover_bg_color', '#222');
        $GLOBALS['sf_customizer']['sf_icon_alt_color'] = get_option('sf_icon_alt_color', '#ffffff');
        $GLOBALS['sf_customizer']['boxed_content_color'] = get_option('boxed_content_color', '#07c1b6');
        $GLOBALS['sf_customizer']['share_button_bg'] = get_option('share_button_bg', '#fe504f');
        $GLOBALS['sf_customizer']['share_button_text'] = get_option('share_button_text', '#ffffff');
        $GLOBALS['sf_customizer']['bold_rp_bg'] = get_option('bold_rp_bg', '#e3e3e3');
        $GLOBALS['sf_customizer']['bold_rp_text'] = get_option('bold_rp_text', '#222');
        $GLOBALS['sf_customizer']['bold_rp_hover_bg'] = get_option('bold_rp_hover_bg', '#fe504f');
        $GLOBALS['sf_customizer']['bold_rp_hover_text'] = get_option('bold_rp_hover_text', '#ffffff');
        $GLOBALS['sf_customizer']['tweet_slider_bg'] = get_option('tweet_slider_bg', '#1dc6df');
        $GLOBALS['sf_customizer']['tweet_slider_text'] = get_option('tweet_slider_text', '#ffffff');
        $GLOBALS['sf_customizer']['tweet_slider_link'] = get_option('tweet_slider_link', '#339933');
        $GLOBALS['sf_customizer']['tweet_slider_link_hover'] = get_option('tweet_slider_link_hover', '#ffffff');
        $GLOBALS['sf_customizer']['testimonial_slider_bg'] = get_option('testimonial_slider_bg', '#1dc6df');
        $GLOBALS['sf_customizer']['testimonial_slider_text'] = get_option('testimonial_slider_text', '#ffffff');
        $GLOBALS['sf_customizer']['footer_bg_color'] = get_option('footer_bg_color', '#222222');
        $GLOBALS['sf_customizer']['footer_text_color'] = get_option('footer_text_color', '#cccccc');
        $GLOBALS['sf_customizer']['footer_link_color'] = get_option('footer_link_color', '#ffffff');
        $GLOBALS['sf_customizer']['footer_link_hover_color'] = get_option('footer_link_hover_color', '#cccccc');
        $GLOBALS['sf_customizer']['footer_border_color'] = get_option('footer_border_color', '#333333');
        $GLOBALS['sf_customizer']['copyright_bg_color'] = get_option('copyright_bg_color', '#222222');
        $GLOBALS['sf_customizer']['copyright_text_color'] = get_option('copyright_text_color', '#999999');
        $GLOBALS['sf_customizer']['copyright_link_color'] = get_option('copyright_link_color', '#ffffff');
        $GLOBALS['sf_customizer']['copyright_link_hover_color'] = get_option('copyright_link_hover_color', '#cccccc');
        update_option( 'sf_customizer', $GLOBALS['sf_customizer']);
    }

    if (!isset($GLOBALS['sf_customizer'])) {
        $GLOBALS['sf_customizer'] = get_option('sf_customizer', array());
        if (empty($GLOBALS['sf_customizer'])) {
            sf_run_migration();
        }
    }	    
	
	
	/* THEME ACTIVATION
	================================================== */	
	if (!function_exists('sf_theme_activation')) {
		function sf_theme_activation() {
			global $pagenow;
			if ( is_admin() && 'themes.php' == $pagenow && isset( $_GET['activated'] ) ) {
				// set frontpage to display_posts
				update_option('show_on_front', 'posts');
				
				// provide hook so themes can execute theme specific functions on activation
				do_action('sf_theme_activation');
				
				// flush rewrite rules
				flush_rewrite_rules();
				
				// redirect to options page
				//header( 'Location: '.admin_url().'admin.php?page=_sf_options&sf_welcome=true' ) ;
				header( 'Location: '.admin_url().'themes.php?page=install-required-plugins' ) ;
			}
		}
		add_action('admin_init', 'sf_theme_activation');
	}
	
	
	/* REQUIRED IE8 COMPATIBILITY SCRIPTS
	================================================== */
	if (!function_exists('sf_html5_ie_scripts')) {	
	    function sf_html5_ie_scripts() {
	        $theme_url = get_template_directory_uri();
	        $ie_scripts = '';
	        
	        $ie_scripts .= '<!--[if lt IE 9]>';
	        $ie_scripts .= '<script data-cfasync="false" src="'.$theme_url.'/js/respond.js"></script>';
	        $ie_scripts .= '<script data-cfasync="false" src="'.$theme_url.'/js/html5shiv.js"></script>';
	        $ie_scripts .= '<script data-cfasync="false" src="'.$theme_url.'/js/excanvas.compiled.js"></script>';
	        $ie_scripts .= '<![endif]-->';
	        echo $ie_scripts;
	    }
	    add_action('wp_head', 'sf_html5_ie_scripts');
	}
	
	
	/* BETTER WORDPRESS MINIFY FILTER
	================================================== */	
	function sf_bwm_filter($excluded) {
		global $is_IE;
		
		$excluded = array('fontawesome', 'ssgizmo');
		
		if ($is_IE) {	
		$excluded = array('bootstrap', 'sf-main', 'sf-responsive', 'fontawesome', 'ssgizmo', 'woocommerce_frontend_styles');
		}
				
		return $excluded;
	}
	add_filter('bwp_minify_style_ignore', 'sf_bwm_filter');
	
	function sf_bwm_filter_script($excluded) {
		
		global $is_IE;
		
		$excluded = array();
		
		if ($is_IE) {	
		$excluded = array('jquery', 'sf-bootstrap-js', 'sf-functions');
		}
				
		return $excluded;
		
	}
	add_filter('bwp_minify_script_ignore', 'sf_bwm_filter_script');
	
	
	/* BETTER SEO PAGE TITLE
	================================================== */
	if (!function_exists('sf_filter_wp_title')) {
		function sf_filter_wp_title( $title ) {
			global $page, $paged;
		
			if ( is_feed() )
				return $title;
		
			$site_description = get_bloginfo( 'description' );
		
			$filtered_title = $title . get_bloginfo( 'name' );
			$filtered_title .= ( ! empty( $site_description ) && ( is_home() || is_front_page() ) ) ? ' | ' . $site_description: '';
			$filtered_title .= ( 2 <= $paged || 2 <= $page ) ? ' | ' . sprintf( __( 'Page %s', 'swiftframework' ), max( $paged, $page ) ) : '';
		
			return $filtered_title;
		}
		add_filter( 'wp_title', 'sf_filter_wp_title' );
	}
	
	
	/* MAINTENANCE MODE
	================================================== */
	if (!function_exists('sf_maintenance_mode')) {
		function sf_maintenance_mode() {
			global $sf_options;
			$custom_logo = array();
			$custom_logo_output = $maintenance_mode = "";
			if (isset($sf_options['custom_admin_login_logo'])) {
			$custom_logo = $sf_options['custom_admin_login_logo'];
			}
			if (isset($custom_logo['url'])) {		
			$custom_logo_output = '<img src="'. $custom_logo['url'] .'" alt="maintenance" style="margin: 0 auto; display: block;" />';
			} else {
			$custom_logo_output = '<img src="'. get_template_directory_uri() .'/images/custom-login-logo.png" alt="maintenance" style="margin: 0 auto; display: block;" />';
			}
	
			if (isset($sf_options['enable_maintenance'])) {
			$maintenance_mode = $sf_options['enable_maintenance'];
			} else {
			$maintenance_mode = false;
			}
			
			if ($maintenance_mode == 2) {
				
				$holding_page = __($sf_options['maintenance_mode_page'], 'swiftframework');
			    $current_page_URL = sf_current_page_url();
			    $holding_page_URL = get_permalink($holding_page);
			    
			    if ($current_page_URL != $holding_page_URL) {
			    	if ( !current_user_can( 'edit_themes' ) || !is_user_logged_in() ) {
			    	wp_redirect( $holding_page_URL );
			    	exit;
			    	}
			    }
		    
		    } else if ($maintenance_mode == 1) {
		    	if ( !current_user_can( 'edit_themes' ) || !is_user_logged_in() ) {
		    	    wp_die($custom_logo_output . '<p style="text-align:center">'.__('We are currently in maintenance mode, please check back shortly.', 'swiftframework').'</p>', get_bloginfo( 'name' ));
		    	}
		    }
		}
		add_action('get_header', 'sf_maintenance_mode');
	}
	
	
	/* CUSTOM LOGIN LOGO
	================================================== */
	if (!function_exists('sf_custom_login_logo')) {
		function sf_custom_login_logo() {
			global $sf_options;
			$custom_logo = "";
			if (isset($sf_options['custom_admin_login_logo']['url'])) {
			$custom_logo = $sf_options['custom_admin_login_logo']['url'];
			}
			if ($custom_logo) {		
			echo '<style type="text/css">
			    .login h1 a { background-image:url('. $custom_logo .') !important; height: 95px!important; width: 100%!important; background-size: auto!important; }
			</style>';
			} else {
			echo '<style type="text/css">
			    .login h1 a { background-image:url('. get_template_directory_uri() .'/images/custom-login-logo.png) !important; height: 95px!important; width: 100%!important; background-size: auto!important; }
			</style>';
			}
		}
		add_action('login_head', 'sf_custom_login_logo');
	}
	
	
	/* LANGUAGE FLAGS
	================================================== */
	function sf_language_flags() {
		
		$language_output = "";
		
		if (function_exists('icl_get_languages')) {
		    $languages = icl_get_languages('skip_missing=0&orderby=code');
		    if(!empty($languages)){
		        foreach($languages as $l){
		            $language_output .= '<li>';
		            if($l['country_flag_url']){
		                if(!$l['active']) {
		                	$language_output .= '<a href="'.$l['url'].'"><img src="'.$l['country_flag_url'].'" height="12" alt="'.$l['language_code'].'" width="18" /><span class="language name">'.$l['translated_name'].'</span></a>'."\n";
		                } else {
		                	$language_output .= '<div class="current-language"><img src="'.$l['country_flag_url'].'" height="12" alt="'.$l['language_code'].'" width="18" /><span class="language name">'.$l['translated_name'].'</span></div>'."\n";
		                }
		            }
		            $language_output .= '</li>';
		        }
		    }
	    } else {
	    	//echo '<li><div>No languages set.</div></li>';
	    	$flags_url = get_template_directory_uri() . '/images/flags';
	    	$language_output .= '<li><a href="#">DEMO - EXAMPLE PURPOSES</a></li><li><a href="#"><span class="language name">German</span></a></li><li><div class="current-language"><span class="language name">English</span></div></li><li><a href="#"><span class="language name">Spanish</span></a></li><li><a href="#"><span class="language name">French</span></a></li>'."\n";
	    }
	    
	    return $language_output;
	}
	
	
	/* HEX TO RGB COLOR
	================================================== */
	function sf_hex2rgb( $colour ) {
	        if ( $colour[0] == '#' ) {
	                $colour = substr( $colour, 1 );
	        }
	        if ( strlen( $colour ) == 6 ) {
	                list( $r, $g, $b ) = array( $colour[0] . $colour[1], $colour[2] . $colour[3], $colour[4] . $colour[5] );
	        } elseif ( strlen( $colour ) == 3 ) {
	                list( $r, $g, $b ) = array( $colour[0] . $colour[0], $colour[1] . $colour[1], $colour[2] . $colour[2] );
	        } else {
	                return false;
	        }
	        $r = hexdec( $r );
	        $g = hexdec( $g );
	        $b = hexdec( $b );
	        return array( 'red' => $r, 'green' => $g, 'blue' => $b );
	}


	/* GET COMMENTS COUNT TEXT
	================================================== */
	function sf_get_comments_number($post_id) {
		$num_comments = get_comments_number($post_id); // get_comments_number returns only a numeric value
		$comments_text = "";
		
		if ( $num_comments == 0 ) {
			$comments_text = __('0 Comments', 'swiftframework');
		} elseif ( $num_comments > 1 ) {
			$comments_text = $num_comments . __(' Comments', 'swiftframework');
		} else {
			$comments_text = __('1 Comment', 'swiftframework');
		}
		
		return $comments_text;
	}
	
	
	/* SET AUTHOR PAGE TO SHOW CAMPAIGNS
	================================================== */
	function sf_post_author_archive( $query ) {
		if (class_exists('ATCF_Campaigns')) {
			if ( $query->is_author ) {
				$query->set( 'post_type', 'download' );
			}
		}
	}
	add_action( 'pre_get_posts', 'sf_post_author_archive' );
	
	
	/* GET USER MENU LIST
	================================================== */
	function sf_get_menu_list() {
		$menu_list = array( '' => '' );
	    $user_menus = get_terms( 'nav_menu', array( 'hide_empty' => false ) ); 
	  
	    foreach( $user_menus as $menu ) {
			$menu_list[$menu->term_id] = $menu->name;
	    }
	    
	    return $menu_list;
	}
		
	
	/* GET CUSTOM POST TYPE TAXONOMY LIST
	================================================== */
	function sf_get_category_list( $category_name, $filter=0, $category_child = "" ){
		
		if (!$filter) { 
		
			$get_category = get_categories( array( 'taxonomy' => $category_name	));
			$category_list = array( '0' => 'All');
			
			foreach( $get_category as $category ){
				if (isset($category->slug)) {
				$category_list[] = $category->slug;
				}
			}
				
			return $category_list;
			
		} else if ($category_child != "" && $category_child != "All") {
			
			$childcategory = get_term_by('slug', $category_child, $category_name);	
			$get_category = get_categories( array( 'taxonomy' => $category_name, 'child_of' => $childcategory->term_id));
			$category_list = array( '0' => 'All');
			
			foreach( $get_category as $category ){
				if (isset($category->cat_name)) {
				$category_list[] = $category->slug;
				}
			}
				
			return $category_list;	
		
		} else {
			
			$get_category = get_categories( array( 'taxonomy' => $category_name));
			$category_list = array( '0' => 'All');
			
			foreach( $get_category as $category ){
				if (isset($category->cat_name)) {
				$category_list[] = $category->cat_name;
				}
			}
				
			return $category_list;	
		}
	}
	
	function sf_get_category_list_key_array($category_name) {
			
		$get_category = get_categories( array( 'taxonomy' => $category_name	));
		$category_list = array( 'all' => 'All');
		
		foreach( $get_category as $category ){
			if (isset($category->slug)) {
			$category_list[$category->slug] = $category->cat_name;
			}
		}
			
		return $category_list;
	}
	
	function sf_get_woo_product_filters_array() {
		
		global $woocommerce;
		
		$attribute_array = array();
		
		$transient_name = 'wc_attribute_taxonomies';

		if (sf_woocommerce_activated()) {
		
			if ( false === ( $attribute_taxonomies = get_transient( $transient_name ) ) ) {
				global $wpdb;
				
					$attribute_taxonomies = $wpdb->get_results( "SELECT * FROM " . $wpdb->prefix . "woocommerce_attribute_taxonomies" );
					set_transient( $transient_name, $attribute_taxonomies );
			}
	
			$attribute_taxonomies = apply_filters( 'woocommerce_attribute_taxonomies', $attribute_taxonomies );
			
			$attribute_array['product_cat'] = __('Product Category', 'swiftframework');
			$attribute_array['price'] = __('Price', 'swiftframework');
					
			if ( $attribute_taxonomies ) {
				foreach ( $attribute_taxonomies as $tax ) {
					$attribute_array[$tax->attribute_name] = $tax->attribute_name;
				}
			}
		
		}
		
		return $attribute_array;	
	}
	
	/* CATEGORY REL FIX
	================================================== */
	function sf_add_nofollow_cat( $text) {
	    $text = str_replace('rel="category tag"', "", $text);
	    return $text;
	}
	add_filter( 'the_category', 'sf_add_nofollow_cat' );
	
	
	/* GET CURRENT PAGE URL
	================================================== */
	function sf_current_page_url() {
		$pageURL = 'http';
		if( isset($_SERVER["HTTPS"]) ) {
			if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
		}
		$pageURL .= "://";
		if ($_SERVER["SERVER_PORT"] != "80") {
			$pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
		} else {
			$pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
		}
		return $pageURL;
	}
	
	
	/* CHECK WOOCOMMERCE IS ACTIVE
	================================================== */ 
	if ( ! function_exists( 'sf_woocommerce_activated' ) ) {
		function sf_woocommerce_activated() {
			if ( class_exists( 'woocommerce' ) ) {
				return true;
			} else {
				return false;
			}
		}
	}
	
	
	/* CHECK GRAVITY FORMS IS ACTIVE
	================================================== */ 
	if ( ! function_exists( 'sf_gravityforms_activated' ) ) {
		function sf_gravityforms_activated() {
			if ( class_exists( 'GFForms' ) ) {
				return true;
			} else {
				return false;
			}
		}
	}
	
	
	/* CHECK GP PRICING IS ACTIVE
	================================================== */ 
	if ( ! function_exists( 'sf_gopricing_activated' ) ) {
		function sf_gopricing_activated() {
			if ( class_exists( 'GW_GoPricing' ) ) {
				return true;
			} else {
				return false;
			}
		}
	}
	
	
	/* GET GRAVITY FORMS LIST
	================================================== */ 
	if ( ! function_exists( 'sf_gravityforms_list' ) ) {
		function sf_gravityforms_list() {
			$forms = RGFormsModel::get_forms( null, 'title' );
			$forms_array = array();
			
			if (!empty($forms)) {
				foreach( $forms as $form ):
					$forms_array[$form->id] = $form->title;
				endforeach;
			}
			
			return $forms_array;
		}
	}
	
	
	/* GET GO PRICING TABLES LIST
	================================================== */ 
	if ( ! function_exists( 'sf_gopricing_list' ) ) {
		function sf_gopricing_list() {
			$pricing_tables = get_option( GW_GO_PREFIX . 'tables' ); 
			$ptables_array = array();
			
			if ( !empty( $pricing_tables ) ) {
				foreach ( $pricing_tables as $pricing_table ) {
					$ptables_array[$pricing_table['table-id']] = esc_attr( $pricing_table['table-name'] );
				}
			}
			
			return $ptables_array;
		}
	}
	
	/* UPLOAD ATTACHMENTS
	================================================== */ 
	if ( ! function_exists( 'sf_insert_attachment' ) ) {
		function sf_insert_attachment($file_handler,$post_id) {
			// check to make sure its a successful upload
			if ($_FILES[$file_handler]['error'] !== UPLOAD_ERR_OK) __return_false();

			require_once(ABSPATH . "wp-admin" . '/includes/image.php');
			require_once(ABSPATH . "wp-admin" . '/includes/file.php');
			require_once(ABSPATH . "wp-admin" . '/includes/media.php');

			$attach_id = media_handle_upload( $file_handler, $post_id );
	
			return $attach_id;
		}
	}

	
	/* DIRECTORY FRONT END SUBMISSION
	================================================== */ 
	if ( ! function_exists( 'sf_create_directory_item' ) ) {
		function sf_create_directory_item() {	
		
			if( !is_admin()){
		 		if( 'POST' == $_SERVER['REQUEST_METHOD'] && !empty( $_POST['action'] ) && $_POST['dirtype'] == 'directory' ) { 
				
					// Do some minor form validation to make sure there is content
					if (isset ($_POST['directory_title'])) { $title =  $_POST['directory_title']; }
					if (isset ($_POST['directory_description'])) { $description = $_POST['directory_description']; } 
		
					$sf_directory_address = trim( $_POST['sf_directory_address'] );
					$sf_directory_lat_coord = trim( $_POST['sf_directory_lat_coord'] );
					$sf_directory_lng_coord = trim( $_POST['sf_directory_lng_coord'] );
					$sf_directory_pin_link = trim( $_POST['sf_directory_pin_link'] );
					$sf_directory_pin_button_text = trim( $_POST['sf_directory_pin_button_text'] );
		
					// Get the array of selected categories as multiple cats can be selected
					$category = $_POST['directory-cat'];
					$location = $_POST['directory-loc'];
				
					// Add the content of the form to $post as an array
					$post = array(
						'post_title'	=> wp_strip_all_tags( $title ),
						'post_content'	=> $description,
						'post_status'	=> 'pending', // Choose: publish, preview, future, etc.
						'post_type'		=> 'directory' // Set the post type based on the IF is post_type X
					);
					$post_id = wp_insert_post($post);  // Pass  the value of $post to WordPress the insert function
		 
					// Add Custom meta fields 
					add_post_meta($post_id, 'sf_directory_address', $sf_directory_address); 
					add_post_meta($post_id, 'sf_directory_lat_coord', $sf_directory_lat_coord); 
					add_post_meta($post_id, 'sf_directory_lng_coord', $sf_directory_lng_coord); 
					add_post_meta($post_id, 'sf_directory_pin_link', $sf_directory_pin_link); 
					add_post_meta($post_id, 'sf_directory_pin_button_text', $sf_directory_pin_button_text); 
		
					//Add Taxonomy terms(Location/Category)
					wp_set_object_terms( $post_id, (int)$category, 'directory-category', true );	
					wp_set_object_terms( $post_id, (int)$location, 'directory-location', true );
			
					//Proccess Images		
					if ($_FILES) {
					
    					foreach ($_FILES as $file => $array) {
    						$newupload = sf_insert_attachment($file,$post_id);
				
							if($file == 'pin_image' ){
								update_post_meta($post_id,'sf_directory_map_pin',$newupload);
							}else{
								update_post_meta($post_id,'_thumbnail_id',$newupload);
							}
	    				}
					}
		
					//Send notification email to admin	
					$blogname = wp_specialchars_decode(get_option('blogname'), ENT_QUOTES);
					$itemlink = get_edit_post_link($post_id, "");
       				$message  = sprintf(__('There is a new directory entry pending review, you can view it here:', 'swiftframework').' %s', $itemlink) . "\r\n\r\n";
				  
    				@wp_mail(get_option('admin_email'), sprintf(__('[%s] New directory entry pending review.', 'swiftframework'), $blogname), $message);
		
					//Success Message
					echo "<h3>". __("Thank you for your submission, your entry is pending review.", "swiftframework")."</h3>";
					exit();

				} 
				else{
				
					//Dropdown translation text
					$choosecatmsg = __('Choose a Category', 'swiftframework'); 
					$chooselocmsg = __('Choose a Location', 'swiftframework');			
				
					//Directory Category
					$argscat = array(
    						'id' => 'directory-cat',
    						'name' => 'directory-cat',
    						'show_option_none' => $choosecatmsg,
    						'tab_index' => 4,
    						'taxonomy'  => 'directory-category'
    						);
							
					//Directory Location
					$argsloc = array(
    						'id' => 'directory-loc',
    						'name' => 'directory-loc',
    						'show_option_none' => $chooselocmsg,
    						'tab_index' => 4,
    						'taxonomy'  => 'directory-location'
    						);			
					?>
			
					<!--  Front End Form display   -->
					<div class="directory-submit-wrap">
						<form id="add-directory-entry" name="add-directory-entry" method="post"  action="" enctype="multipart/form-data">
							<p class="directory-error">
								<label class="directory_error_form"><span> <?php _e("Please fill all the fields", "swiftframework");?></span></label>
							</p>
						
							<!--   Title  -->
							<p><label for="directory_title"><?php _e("Title", "swiftframework");?></label><br />
							<input type="text" id="directory_title" value="" tabindex="1" size="20" name="directory_title" /></p>
						
							<!--   Description  -->
							<p><label for="description"><?php _e("Description", "swiftframework");?></label><br />
							<textarea id="directory_description" tabindex="3" name="directory_description" cols="50" rows="6"></textarea></p>
						
							<!--   Directory Category  -->
							<p>
								<label for="description"><?php _e("Category", "swiftframework");?></label>
								<?php wp_dropdown_categories($argscat);?>
							</p>											
						
							<!--   Directory Location  -->
							<p>
								<label for="description"><?php _e("Location", "swiftframework");?></label>
								<?php wp_dropdown_categories($argsloc); ?>
							</p>
						
							<!--   Address  -->
							<p>
								<label for="sf_directory_address"><?php _e("Address", "swiftframework");?></label>
								<input type="text" value="" tabindex="5" size="16" name="sf_directory_address" id="sf_directory_address" />
								<a href="#" id="sf_directory_calculate_coordinates" class="read-more-button hide-if-no-js"><?php _e("Generate Coordinates", "swiftframework");?></a>
							</p>
							
							<!--   Latitude Coordinate  -->
							<p><label for="sf_directory_lat_coord"><?php _e("Latitude Coordinate", "swiftframework");?></label>
							<input type="text" value="" tabindex="5" size="16" name="sf_directory_lat_coord" id="sf_directory_lat_coord" /></p>
						
							<!--   Longitude Coordinate  -->
							<p><label for="sf_directory_lng_coord"><?php _e("Longitude Coordinate", "swiftframework");?></label>
							<input type="text" value="" tabindex="5" size="16" name="sf_directory_lng_coord" id="sf_directory_lng_coord" /></p>
						
							<!--   Pin Image  -->
							<label for="file"><?php _e("Pin Image", "swiftframework");?></label>
							<p><input type="file" name="pin_image" id="pin_image"></p>
						
							<!--   Directory Featured Image  -->
							<label for="file"><?php _e("Featured Image", "swiftframework");?></label>
							<p><input type="file" name="featured_image" id="featured_image"></p>
						
							<!--   Pin Link Button  -->
							<p><label for="sf_directory_pin_link"><?php _e("Pin Link", "swiftframework");?></label>
							<input type="text" value="" tabindex="5" size="16" name="sf_directory_pin_link" id="sf_directory_pin_link" /></p>
						
							<!--   Pin Button Text  -->
							<p><label for="sf_directory_pin_button_text"><?php _e("Pin Button Text", "swiftframework");?></label>
							<input type="text" value="" tabindex="5" size="16" name="sf_directory_pin_button_text" id="sf_directory_pin_button_text" /></p>
						
							<!--   Post type  -->				
							<input type="hidden" name="dirtype" id="dirtype" value="directory" />
							<input type="hidden" name="action" value="postdirectory" />
							<p><input type="submit" value="<?php _e("Create", "swiftframework");?>" id="directory-submit" name="directory-submit" /></p>
						</form>
					</div>

				
				<?php													
				}
			}
		}
	}
		
	add_action('sf_insert_directory', 'sf_create_directory_item');
	
	
	
	/* DYNAMIC GLOBAL INCLUDE CLASSES
	================================================== */ 
	function sf_global_include_classes() {
	
		// INCLUDED FUNCTIONALITY SETUP
		global $post, $sf_has_portfolio, $sf_has_blog, $sf_has_products, $sf_include_maps, $sf_include_isotope, $sf_include_carousel, $sf_include_parallax, $sf_include_infscroll, $sf_has_progress_bar, $sf_has_chart, $sf_has_countdown, $sf_has_imagebanner, $sf_has_team, $sf_has_portfolio_showcase, $sf_has_gallery, $sf_has_galleries;
			
		$sf_inc_class = "";
		
		if ($sf_has_portfolio) {
			$sf_inc_class .= "has-portfolio ";
		}
		if ($sf_has_blog) {
			$sf_inc_class .= "has-blog ";
		}
		if ($sf_has_products) {
			$sf_inc_class .= "has-products ";
		}
		
		if ($post) {
			$content = $post->post_content;	
			if (function_exists('has_shortcode') && $content != "") {
				if (has_shortcode( $content, 'product_category' ) || has_shortcode( $content, 'featured_products' ) || has_shortcode( $content, 'products' )) {
					$sf_inc_class .= "has-products ";
					$sf_include_isotope = true;
				}
			}
		}
		
		if ($sf_include_maps) {
			$sf_inc_class .= "has-map ";
		}
		if ($sf_include_carousel) {
			$sf_inc_class .= "has-carousel ";
		}
		if ($sf_include_parallax) {
			$sf_inc_class .= "has-parallax ";
		}
		if ($sf_has_progress_bar) {
			$sf_inc_class .= "has-progress-bar ";
		}
		if ($sf_has_chart) {
			$sf_inc_class .= "has-chart ";
		}
		if ($sf_has_countdown) {
			$sf_inc_class .= "has-countdown ";
		}
		if ($sf_has_imagebanner) {
			$sf_inc_class .= "has-imagebanner ";
		}
		if ($sf_has_team) {
			$sf_inc_class .= "has-team ";
		}
		if ($sf_has_portfolio_showcase) {
			$sf_inc_class .= "has-portfolio-showcase ";
		}
		if ($sf_has_gallery) {
			$sf_inc_class .= "has-gallery ";
		}
		if ($sf_has_galleries) {
			$sf_inc_class .= "has-galleries ";
		}
		if ($sf_include_infscroll) {
			$sf_inc_class .= "has-infscroll ";
		}
		
		global $sf_options;
		
		if (isset($sf_options['enable_product_zoom'])) {	
			$enable_product_zoom = $sf_options['enable_product_zoom'];	
			if ($enable_product_zoom) {
				$sf_inc_class .= "has-productzoom ";
			}
		}
		
//		if (isset($sf_options['enable_stickysidebars'])) {
//			$enable_stickysidebars = $sf_options['enable_stickysidebars'];
//			if ($enable_stickysidebars) {
//				$sf_inc_class .= "stickysidebars ";
//			} 
//		}
		
		if (isset($sf_options['disable_megamenu'])) {
			$disable_megamenu = $sf_options['disable_megamenu'];
			if ($disable_megamenu) {
				$sf_inc_class .= "disable-megamenu ";
			} 
		}
		
		return $sf_inc_class;
	}
	
	
	/* CUSTOM ADMIN MENU ITEMS
	================================================== */
	if(!function_exists('sf_admin_bar_menu')) {		
		function sf_admin_bar_menu() {
		
			global $wp_admin_bar;
			
			if ( current_user_can( 'manage_options' ) ) {
								
				$theme_customizer = array(
					'id' => '1',
					'title' => __('Color Customizer', 'swiftframework'),
					'href' => admin_url('/customize.php'),
					'meta' => array('target' => 'blank')
				);
				
				$wp_admin_bar->add_menu($theme_customizer);
			
			}
			
		}
		add_action('admin_bar_menu', 'sf_admin_bar_menu', 99);
	}	
	
	
	/* ADMIN CUSTOM POST TYPE ICONS
	================================================== */
	if (!function_exists('sf_admin_css')) {
		function sf_admin_css() { ?>	    
		    <style type="text/css" media="screen">
		    	
		    	#adminmenu #toplevel_page_admin-import-swiftdemo .wp-menu-image img {
		    		padding: 7px 0 0;
		    	}
		    	
		    	.sf-plugin-note-wrap {
		    		padding: 20px;
		    		background: #fff;
		    		margin: 20px 0;
		    		border: 1px solid #e3e3e3;
		    	}
		    	.sf-plugin-note-wrap h3 {
		    		margin-top: 0;
		    	}
		    	
		    	/* REVSLIDER HIDE ACTIVATION */
		    	a[name="activateplugin"] + div, a[name="activateplugin"] + div + div, a[name="activateplugin"] + div + div + div, a[name="activateplugin"] + div + div + div + div {
		    		display: none;
		    	}
		    	
		    	.redux-container-ace_editor .ace_editor {
					height: 400px;
				}
		    	#redux_demo-preset_bg_image.redux-container-image_select .redux-image-select img {
		    		width: 50px;
		    		height: 50px;
		    		min-height: 50px;	
		    	}
		    	
		        #toplevel_page_sf_theme_options .wp-menu-image img {
		        	width: 11px;
		        	margin-top: -2px;
		        	margin-left: 3px;
		        }
		        .toplevel_page_sf_theme_options #adminmenu li#toplevel_page_sf_theme_options.wp-has-current-submenu a.wp-has-current-submenu, .toplevel_page_sf_theme_options #adminmenu #toplevel_page_sf_theme_options .wp-menu-arrow div, .toplevel_page_sf_theme_options #adminmenu #toplevel_page_sf_theme_options .wp-menu-arrow {
		        	background: #222;
		        	border-color: #222;
		        }
		        #wpbody-content {
		        	min-height: 815px;
		        }
		        .wp-list-table th#thumbnail, .wp-list-table td.thumbnail {
		        	width: 80px;
		        }
		        .wp-list-table td.thumbnail img {
		        	max-width: 100%;
		        	height: auto;
		        }
		        .sf-menu-options {
		        	clear: both;
		        	height: auto;
		        	overflow: hidden;
		        }
		        .sf-menu-options h4 {
		        	margin-top: 20px;
		        	margin-bottom: 5px;
		        	border-bottom: 1px solid #e3e3e3;
		        	margin-right: 15px;
		        	padding-bottom: 5px;
		        }
		        .sf-menu-options p label input[type=checkbox] {
		        	margin-left: 10px;
		        }
		        .sf-menu-options p label input[type=text] {
		        	margin-top: 5px;
		        }
		        .sf-menu-options p label textarea {
		        	margin-top: 5px;
		        	width: 100%;
		        }
		        
		        /* THEME OPTIONS */
		        .redux-container {
		        	position: relative;
		        }
		        #redux-header h2 {
		        	color: #666!important;
		        }
		        .redux_field_search {
			        right: 10px;
			        top: 50px;
		        }
		        .admin-color-fresh #redux-header {
		        	background: #fff;
		        	border-color: #ff6666;
		        }
		        .admin-color-fresh .redux-sidebar .redux-group-menu li.active {
		        	border-left-color: #ff6666;
		        }
		        .admin-color-fresh .redux-sidebar .redux-group-menu li.active.hasSubSections a, .admin-color-fresh .redux-sidebar .redux-group-menu li.activeChild.hasSubSections a {
		        	background: #ff6666;
		        }
		        .admin-color-fresh .redux-sidebar .redux-group-menu li.active.hasSubSections ul.subsection li a, .admin-color-fresh .redux-sidebar .redux-group-menu li.activeChild.hasSubSections ul.subsection li a {
		        	padding: 12px 10px;
		        }
		        .redux-container-image_select ul.redux-image-select li, .redux-container-image_select ul.redux-image-select label {
		        	width: 50px;
		        	height: 50px;
		        	margin: 0 10px 10px 0!important;
		        } 
		        #sf_cardinal_options-page_layout ul.redux-image-select li, #sf_cardinal_options-page_layout ul.redux-image-select li  label {
		        	width: 100px;
		        	height: 100px;
		        	margin: 0 10px 25px 0!important;
		        }
		        #sf_cardinal_options-footer_layout ul.redux-image-select li, #sf_cardinal_options-footer_layout ul.redux-image-select li  label {
		        	width: 128px;
		        	height: 55px;
		        }
		        #sf_cardinal_options-header_layout ul.redux-image-select li, #sf_cardinal_options-header_layout ul.redux-image-select label {
		        	width: 98%;
		        	height: auto;
		        }
		        #sf_cardinal_options-header_layout ul.redux-image-select label > img {
		        	height: auto;
		        }
		        .redux-container-image_select ul.redux-image-select li img {
		        	width: 100%;
		        	height: 100%;
		        }
		        .redux_field_th .scheme-buttons {
		        	margin-top: 20px;
		        }
		        .redux_field_th .scheme-buttons .save-this-scheme-name {
		        	margin-right: 8px;
		        	padding: 6px 8px 5px;
		        	line-height: 15px;
		        	border-radius: 2px;
		        }
		        #sf-export-scheme-name, .delete-this-scheme {
		        	margin-right: 8px!important;
		        }
		        
		        /* META BOX CUSTOM */
		        .rwmb-input .rwmb-slider {
		        	background: #f7f7f7;
		        	border: 1px solid #e3e3e3;
		        }
		        .ui-slider-horizontal .ui-slider-range-min {
		        	background: #fe504f;
		        }
		        .rwmb-slider-value-label {
		        	vertical-align: 0;
		        }
		        .rwmb-images img {
			        max-width: 150px;
			        max-height: 150px;
			        width: auto;
			        height: auto;
			    }
		        h2.meta-box-section {
			        border-bottom: 1px solid #e4e4e4;
			        padding-bottom: 10px!important;
			        margin-top: 20px!important;
			        font-size: 18px!important;
			        color: #444;
			    }
			    .rwmb-meta-box div:first-child h2.meta-box-section {
			    	margin-top: 0!important;
			    }
		        
		        /* META BOX TABS */
		        .rwmb-meta-box {
		        	padding: 20px 10px;
		        }
		        .sf-meta-tabs-wrap.all-hidden {
		        	display: none;
		        }
		        #sf-tabbed-meta-boxes {
		        	position: relative;
		        	z-index: 1;
		        }
		        #sf-tabbed-meta-boxes > div > .hndle, #sf-tabbed-meta-boxes > div > .handlediv {
		        	display: none!important;
		        }
		        #sf-tabbed-meta-boxes .inside {
		        	display: block!important;
		        }
		        #sf-tabbed-meta-boxes > div {
		        	border-left: 0;	
		        	border-right: 0;	
		        	border-bottom: 0;	
		        	margin-bottom: 0;
		        	padding-bottom: 20px;
		        }
		        /*#sf-tabbed-meta-boxes > div.hide-if-js {
		   			display: none!important;
		        }*/
		        #sf-meta-box-tabs {
		        	margin: 15px 0 0 15px;
		        	position: relative;
		        	z-index: 2;
		        }
		        #sf-meta-box-tabs li {
		        	float: left;
		        	margin-right: 5px;
		        	margin-bottom: -1px;
		        }
		        #sf-meta-box-tabs li.user-hidden {
		        	display: none!important;
		        }
		        #sf-meta-box-tabs li > a {
		        	display: inline-block;
		        	background: #fff;
		        	padding: 10px;
		        	border: 1px solid #e5e5e5;
		        	-webkit-box-shadow: 0 1px 1px rgba(0,0,0,.04);
		        	box-shadow: 0 1px 1px rgba(0,0,0,.04);
		        	text-decoration: none;
		        }
		        #sf-meta-box-tabs li > a:hover {
		        	color: #222;
		        }
		        #sf-meta-box-tabs li > a.active {
		        	border-bottom-color: #fff;
		        	box-shadow: none;
		        }
		        .closed #sf-meta-box-tabs, .closed #sf-tabbed-meta-boxes {
		        	display: none;
		        }
			</style>
		
		<?php }
		add_action( 'admin_head', 'sf_admin_css' );
	}
?>
