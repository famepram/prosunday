<?php
	
	/*
	*
	*	Cardinal Functions
	*	------------------------------------------------
	*	Swift Framework
	* 	Copyright Swift Ideas 2014 - http://www.swiftideas.net
	*
	*	VARIABLE DEFINITIONS
	*	PLUGIN INCLUDES
	*	THEME UPDATER
	*	THEME SUPPORT
	*	THUMBNAIL SIZES
	*	CONTENT WIDTH
	*	LOAD THEME LANGUAGE
	*	sf_custom_content_functions()
	*	sf_include_framework()
	*	sf_enqueue_styles()
	*	sf_enqueue_scripts()
	*	sf_load_custom_scripts()
	*	sf_admin_scripts()
	*	sf_layerslider_overrides()
	*
	*/
	
	
	/* VARIABLE DEFINITIONS
	================================================== */ 
	define('SF_TEMPLATE_PATH', get_template_directory());
	define('SF_INCLUDES_PATH', SF_TEMPLATE_PATH . '/includes');
	define('SF_FRAMEWORK_PATH', SF_TEMPLATE_PATH . '/swift-framework');
	define('SF_WIDGETS_PATH', SF_INCLUDES_PATH . '/widgets');
	define('SF_LOCAL_PATH', get_template_directory_uri());
	
	
	/* PLUGIN INCLUDES
	================================================== */
	require_once(SF_INCLUDES_PATH . '/plugins/aq_resizer.php');
	include_once(SF_INCLUDES_PATH . '/plugin-includes.php');
	require_once(SF_INCLUDES_PATH . '/wp-updates-theme.php');
	new WPUpdatesThemeUpdater_748( 'http://wp-updates.com/api/2/theme', basename( get_template_directory() ) );
		

	/* THEME SETUP
	================================================== */
	if (!function_exists('sf_cardinal_setup')) {
		function sf_cardinal_setup() { 	
			
			/* THEME SUPPORT
			================================================== */	
			add_theme_support( 'structured-post-formats', array('audio', 'gallery', 'image', 'link', 'video') );
			add_theme_support( 'post-formats', array('aside', 'chat', 'quote', 'status') );
			add_theme_support( 'automatic-feed-links' );
			add_theme_support( 'post-thumbnails' );
			add_theme_support( 'woocommerce' );
			add_theme_support( 'appthemer-crowdfunding', array(
				'campaign-edit'           	=> true,
				'campaign-featured-image' 	=> true,
				'campaign-video'          	=> true,
				'campaign-widget'        	=> true,
				'campaign-category'			=> true,
				'campaign-tag'     			=> true,
				'campaign-type'     		=> true
			) );
			
			
			/* THUMBNAIL SIZES
			================================================== */  	
			set_post_thumbnail_size( 220, 150, true);
			add_image_size( 'widget-image', 94, 70, true);
			add_image_size( 'thumb-square', 250, 250, true);
			add_image_size( 'thumb-image', 600, 450, true);
			add_image_size( 'thumb-image-twocol', 900, 675, true);
			add_image_size( 'thumb-image-onecol', 1800, 1200, true);
			add_image_size( 'blog-image', 1280, 9999);
			add_image_size( 'gallery-image', 1000, 9999);
			add_image_size( 'large-square', 1200, 1200, true);
			add_image_size( 'full-width-image-gallery', 1280, 720, true);
			
			
			/* CONTENT WIDTH
			================================================== */
			if ( ! isset( $content_width ) ) $content_width = 1140;
			
			
			/* LOAD THEME LANGUAGE
			================================================== */
			load_theme_textdomain('swiftframework', SF_TEMPLATE_PATH.'/language');
			
		}
		add_action( 'after_setup_theme', 'sf_cardinal_setup' );
	}
		
	
	/* THEME FRAMEWORK FUNCTIONS
	================================================== */ 
	if (!function_exists('sf_include_framework')) {
		function sf_include_framework() {
			require_once(SF_INCLUDES_PATH . '/sf-theme-functions.php');
			require_once(SF_INCLUDES_PATH . '/sf-customizer-options.php');
			include_once(SF_INCLUDES_PATH . '/sf-custom-styles.php');
			include_once(SF_INCLUDES_PATH . '/sf-styleswitcher/sf-styleswitcher.php');
			require_once(SF_FRAMEWORK_PATH . '/swift-framework.php');
		}
		add_action('init', 'sf_include_framework', 0);
	}
	
	
	/* THEME OPTIONS FRAMEWORK
	================================================== */ 
	require_once(SF_INCLUDES_PATH . '/sf-colour-scheme.php');
	if (!function_exists('sf_include_theme_options')) {
		function sf_include_theme_options() {
			if (!class_exists( 'ReduxFramework' )) {
			    require_once( SF_INCLUDES_PATH . '/options/framework.php' );
			}
			require_once( SF_INCLUDES_PATH . '/option-extensions/loader.php' );
			require_once( SF_INCLUDES_PATH . '/sf-options.php' );
			global $sf_cardinal_options, $sf_options;
			$sf_options = $sf_cardinal_options;
		}
		add_action('init', 'sf_include_theme_options', 10);
	}
	
	
	/* LOVE IT INCLUDE
	================================================== */ 
	if (!function_exists('sf_love_it_include')) {
		function sf_love_it_include() {
			global $sf_options;
			$disable_loveit = false;
			if (isset($sf_options['disable_loveit'])) {
			$disable_loveit = $sf_options['disable_loveit'];
			}
			
			if (!$disable_loveit) {
			include_once(SF_INCLUDES_PATH . '/plugins/love-it-pro/love-it-pro.php');
			}
		}
		add_action('init', 'sf_love_it_include', 20);
	}
	
	
	/* LOAD STYLESHEETS
	================================================== */
	if (!function_exists('sf_enqueue_styles')) {
		function sf_enqueue_styles() {  
			
			global $sf_options;
			$enable_responsive = $sf_options['enable_responsive'];		
			$enable_rtl = $sf_options['enable_rtl'];
			
		    wp_register_style('bootstrap', SF_LOCAL_PATH . '/css/bootstrap.min.css', array(), NULL, 'all');
		    wp_register_style('fontawesome', SF_LOCAL_PATH .'/css/font-awesome.min.css', array(), NULL, 'all');
		    wp_register_style('ssgizmo', SF_LOCAL_PATH .'/css/ss-gizmo.css', array(), NULL, 'all');
		    wp_register_style('sf-main', get_stylesheet_directory_uri() . '/style.css', array(), NULL, 'all'); 
		    wp_register_style('sf-rtl', SF_LOCAL_PATH . '/rtl.css', array(), NULL, 'all');
		    wp_register_style('sf-woocommerce', SF_LOCAL_PATH . '/css/sf-woocommerce.css', array(), NULL, 'screen');
		    wp_register_style('sf-responsive', SF_LOCAL_PATH . '/css/responsive.css', array(), NULL, 'screen');
			
		    wp_enqueue_style('bootstrap');  
		    wp_enqueue_style('ssgizmo');
		    wp_enqueue_style('fontawesome'); 
		    wp_enqueue_style('sf-main');  

		    if (sf_woocommerce_activated()) {
		    	wp_enqueue_style('sf-woocommerce'); 
		    }
		    
		    if ($enable_rtl || isset($_GET['RTL'])) {
		    	wp_enqueue_style('sf-rtl');
		    }
		    
		    if ($enable_responsive) {
		    	wp_enqueue_style('sf-responsive');  
		    }
		
		}		
		add_action('wp_enqueue_scripts', 'sf_enqueue_styles', 99);  
	}
	
	
	/* LOAD FRONTEND SCRIPTS
	================================================== */
	if (!function_exists('sf_enqueue_scripts')) {
		function sf_enqueue_scripts() {
			
			// Variables
			global $sf_options;
		    $enable_rtl = $sf_options['enable_rtl'];
		    $enable_min_scripts = $sf_options['enable_min_scripts'];
			$post_type = get_query_var('post_type');
			
		    // Register Scripts
		    wp_register_script('sf-bootstrap-js', SF_LOCAL_PATH . '/js/bootstrap.min.js', 'jquery', NULL, TRUE);
		    wp_register_script('sf-flexslider', SF_LOCAL_PATH . '/js/jquery.flexslider-min.js', 'jquery', NULL, TRUE);
		    wp_register_script('sf-flexslider-rtl', SF_LOCAL_PATH . '/js/jquery.flexslider-rtl-min.js', 'jquery', NULL, TRUE);
		    wp_register_script('sf-isotope', SF_LOCAL_PATH . '/js/jquery.isotope.min.js', 'jquery', NULL, TRUE);
		    wp_register_script('sf-imagesLoaded', SF_LOCAL_PATH . '/js/imagesloaded.js', 'jquery', NULL, TRUE);
		    wp_register_script('sf-owlcarousel', SF_LOCAL_PATH . '/js/owl.carousel.min.js', 'jquery', NULL, TRUE); 
			wp_register_script('sf-jquery-ui', SF_LOCAL_PATH . '/js/jquery-ui-1.10.2.custom.min.js', 'jquery', NULL, TRUE);
			wp_register_script('sf-ilightbox', SF_LOCAL_PATH . '/js/ilightbox.min.js', 'jquery', NULL, TRUE);
		    wp_register_script('sf-maps', '//maps.google.com/maps/api/js?sensor=false', 'jquery', NULL, TRUE);
		    wp_register_script('sf-elevatezoom', SF_LOCAL_PATH . '/js/jquery.elevateZoom.min.js', 'jquery', NULL, TRUE);
		    wp_register_script('sf-infinite-scroll',  SF_LOCAL_PATH . '/js/jquery.infinitescroll.min.js', 'jquery', NULL, TRUE);
		    wp_register_script('sf-theme-scripts', SF_LOCAL_PATH . '/js/theme-scripts.js', 'jquery', NULL, TRUE);
		    wp_register_script('sf-theme-scripts-min', SF_LOCAL_PATH . '/js/sf-scripts.min.js', 'jquery', NULL, TRUE);
		    wp_register_script('sf-functions', SF_LOCAL_PATH . '/js/functions.js', 'jquery', NULL, TRUE);
		    wp_register_script('sf-functions-min', SF_LOCAL_PATH . '/js/functions.min.js', 'jquery', NULL, TRUE);
			
			// jQuery
		    wp_enqueue_script('jquery');
		    		   	
		    if ( !is_admin() ) {
		    	
		    	// Theme Scripts
		    	if ($enable_min_scripts) {
		    		wp_enqueue_script('sf-theme-scripts-min');
		    		if ( !is_singular('tribe_events') && $post_type != 'tribe_events' ) {
		    			wp_enqueue_script('sf-maps');
		    		}
		    		wp_enqueue_script('sf-functions-min');
		    	} else {
		    		wp_enqueue_script('sf-bootstrap-js');
		    		wp_enqueue_script('sf-jquery-ui');
		    		
		    		if ( $enable_rtl || isset($_GET['RTL']) ) {
		    			wp_enqueue_script('sf-flexslider-rtl');
		    		} else {
		    			wp_enqueue_script('sf-flexslider');
		    		}
		    		
		    		wp_enqueue_script('sf-owlcarousel');
		    		wp_enqueue_script('sf-theme-scripts');
		    		wp_enqueue_script('sf-ilightbox');
		    		
		    		if ( !is_singular('tribe_events') && $post_type != 'tribe_events' ) {
		    			wp_enqueue_script('sf-maps');
		    		}
		    		
		    		wp_enqueue_script('sf-isotope');
		    		wp_enqueue_script('sf-imagesLoaded');
		    		wp_enqueue_script('sf-infinite-scroll');
		    		
		    		if ( $sf_options['enable_product_zoom'] ) {
		    			wp_enqueue_script('sf-elevatezoom');
		    		}
		    		
		    		wp_enqueue_script('sf-functions');	
		    	}
		    	
		    	// Comments reply
				if ( is_singular() && comments_open() ) {
					wp_enqueue_script('comment-reply');
				}
		    }
		}
		add_action('wp_enqueue_scripts', 'sf_enqueue_scripts');
	}
	
	/* LOAD BACKEND SCRIPTS
	================================================== */
	function sf_admin_scripts() {
	    wp_register_script('admin-functions', get_template_directory_uri() . '/js/sf-admin.js', 'jquery', '1.0', TRUE);
		wp_enqueue_script('admin-functions');
	}
	add_action('admin_init', 'sf_admin_scripts');
	
	
	/* LAYERSLIDER OVERRIDES
	================================================== */
	function sf_layerslider_overrides() {
		// Disable auto-updates
		$GLOBALS['lsAutoUpdateBox'] = false;
	}
	add_action('layerslider_ready', 'sf_layerslider_overrides');
	
	
	/* THEME UPDATES
	================================================== */
	function sf_envato_toolkit_admin_init() {
	 	
	    // Include the Toolkit Library
	    include_once( SF_INCLUDES_PATH .'/envato-wordpress-toolkit-library/class-envato-wordpress-theme-upgrader.php' );
	    
	    // Display a notice in the admin to remind the user to enter their credentials
	    function sf_envato_toolkit_credentials_admin_notices() {
	        $message = sprintf( __( "To enable Cardinal update notifications, please enter your Envato Marketplace credentials in the %s", "swift-framework-admin" ),
	            "<a href='" . admin_url() . "admin.php?page=envato-wordpress-toolkit'>Envato WordPress Toolkit Plugin</a>" );
	        echo "<div id='message' class='updated below-h2'><p>{$message}</p></div>";
	    }
	    
	    // Use credentials used in toolkit plugin so that we don't have to show our own forms anymore
	    $credentials = get_option( 'envato-wordpress-toolkit' );
	    if ( empty( $credentials['user_name'] ) || empty( $credentials['api_key'] ) ) {
	        add_action( 'admin_notices', 'sf_envato_toolkit_credentials_admin_notices' );
	        return;
	    }
	    
	    // Check updates only after a while
	    $lastCheck = get_option( 'toolkit-last-toolkit-check' );
	    if ( false === $lastCheck ) {
	        update_option( 'toolkit-last-toolkit-check', time() );
	        return;
	    }
	     
	    // Check for an update every 3 hours
	    if ( (time() - $lastCheck) < 10800 ) {
	        return;
	    }
	     
	    // Update the time we last checked
	    update_option( 'toolkit-last-toolkit-check', time() );
	    
	    // Check for updates
	    $upgrader = new Envato_WordPress_Theme_Upgrader( $credentials['user_name'], $credentials['api_key'] );
	    $updates = $upgrader->check_for_theme_update();
	    
	    // Add update alert, to update the theme
	    if ( $updates->updated_themes_count ) {
	        add_action( 'admin_notices', 'sf_envato_toolkit_admin_notices' );
	    }
	    
	    // Display a notice in the admin that an update is available	    
	    function sf_envato_toolkit_admin_notices() {
	        $message = sprintf( __( "An update to Cardinal is available! Head over to %s to update it now.", "swift-framework-admin" ),
	            "<a href='" . admin_url() . "admin.php?page=envato-wordpress-toolkit'>Envato WordPress Toolkit Plugin</a>" );
	        echo "<div id='message' class='updated below-h2'><p>{$message}</p></div>";
	    }

	}
	if (class_exists('Envato_WP_Toolkit')) {
		add_action( 'admin_init', 'sf_envato_toolkit_admin_init' );
	}

	global $wp_version;
	if( version_compare( $wp_version, '4.4', '<' ) ) {
		if ( ! function_exists( 'is_embed' ) ) {
		    function is_embed() { return false; }
		}
	}

	wp_enqueue_style ('theme-style', get_template_directory_uri().'/css/style.css');
	wp_enqueue_style ('fmy-style', get_template_directory_uri().'/css/fmy-style.css', array('theme-style'));
	
?>