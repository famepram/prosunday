<?php
	
	/*
	*
	*	Swift Page Builder - Builder Class
	*	------------------------------------------------
	*	Swift Framework
	* 	Copyright Swift Ideas 2014 - http://www.swiftideas.net
	*
	*/
	
	class SwiftPageBuilder extends SFPageBuilderAbstract {
	    private $is_theme = false;
	    private $postTypes;
	    private $layout;
	    protected $shortcodes, $images_media_tab;
	
	    public static function getInstance() {
	        static $instance=null;
	        if ($instance === null)
	            $instance = new SwiftPageBuilder();
	        return $instance;
	    }
	
	    public function setTheme() {
	        $this->is_theme = true;
	        $this->postTypes = null;
	    }

	    public function getPostTypes() {
	        if(is_array($this->postTypes)) return $this->postTypes;
	
            $pt_array = get_option('spb_js_theme_content_types');
            
            $options = get_option('sf_cardinal_options');
            if (isset($options['spb-post-types'])) {
            	$pt_array = $options['spb-post-types'];
            }
            $this->postTypes = $pt_array ? $pt_array : array('page', 'post', 'portfolio', 'team', 'ajde_events', 'product');	            
	        return $this->postTypes;
	    }
	
	    public function getLayout() {
	        if($this->layout==null)
	            $this->layout = new SPBLayout();
	        return $this->layout;
	    }
	
	    /* Add shortCode to plugin */
	    public function addShortCode($shortcode, $function = false) {
	        $name = 'SwiftPageBuilderShortcode_' . $shortcode['base'];
	        if( class_exists( $name ) && is_subclass_of( $name, 'SwiftPageBuilderShortcode' ) ) $this->shortcodes[$shortcode['base']] = new $name($shortcode);
	    }
	
	    public function createShortCodes() {
	        remove_all_shortcodes();
	        foreach( SPBMap::getShortCodes() as $sc_base => $el) {
	            $name = 'SwiftPageBuilderShortcode_' . $el['base'];
	            if( class_exists( $name ) && is_subclass_of( $name, 'SwiftPageBuilderShortcode' ) ) $this->shortcodes[$sc_base] = new $name($el);
	        }	
	    }
	
	    /* Save generated shortcodes, html and builder status in post meta
	    ---------------------------------------------------------- */
	    public function saveMetaBoxes($post_id) {
	        if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ) return $post_id;
	        $value = $this->post( 'spb_js_status' );
	        if ($value !== null) {
	            //var_dump(sf_get_post_meta($post_id, '_spb_js_status'));
	            // Get the value
	            //var_dump($value);
	
	            // Add value
	            if ( sf_get_post_meta( $post_id, '_spb_js_status' ) == '' ) { add_post_meta( $post_id, '_spb_js_status', $value, true );	}
	            // Update value
	            elseif ( $value != sf_get_post_meta( $post_id, '_spb_js_status', true ) ) { update_post_meta( $post_id, '_spb_js_status', $value ); }
	            // Delete value
	            elseif ( $value == '' ) { delete_post_meta( $post_id, '_spb_js_status', sf_get_post_meta( $post_id, '_spb_js_status', true ) ); }
	        }
	    }
	
	    public function elementBackendHtmlJavascript_callback() {
	        $output = '';
	        $element = $this->post( 'element' );
	        $data_element = $this->post( 'data_element' );
	
	        if ( $data_element == 'spb_column' && $this->post( 'data_width' )!==null ) {
	            $output = do_shortcode( '[spb_column width="'. $this->post( 'data_width' ).'"]' );
	            echo $output;
	        } else {
	            $output = do_shortcode( '['.$data_element.']' );
	            echo $output;
	        }
	        die();
	    }
	
	    public function spbShortcodesJS_callback() {
	        $content = $this->post( 'content' );
	
	        $content = stripslashes( $content );
	        $output = spb_format_content( $content );
	        echo $output;
	        die();
	    }
	
	
	    public function showEditFormJavascript_callback() {
	        $element = $this->post( 'element' );
	        $shortCode = $this->post( 'shortcode' );
	        $shortCode = stripslashes( $shortCode );
	
	        $this->removeShortCode($element);
	        $settings = SPBMap::getShortCode($element);
	
	        new SwiftPageBuilderShortcode_Settings($settings);
	
	        echo do_shortcode($shortCode);
	
	        die();
	    }
	    
		/* Save template callback
		---------------------------------------------------------- */
	    public function saveTemplateJavascript_callback() {
	        $output = '';
	        $template_name = $this->post( 'template_name' );
	        $template = $this->post( 'template' );
	
	        if ( !isset($template_name) || $template_name == "" || !isset($template) || $template == "" ) { echo 'Error: TPL-01'; die(); }
	
	        $template_arr = array( "name" => $template_name, "template" => $template );
	
	        $option_name = 'spb_templates';
	        $saved_templates = get_option($option_name);
	
	        /*if ( $saved_templates == false ) {
	            update_option('spb_templates', $template_arr);
	        }*/
	
	        $template_id = sanitize_title($template_name)."_".rand();
	        if ( $saved_templates == false ) {
	            $deprecated = '';
	            $autoload = 'no';
	            //
	            $new_template = array();
	            $new_template[$template_id] = $template_arr;
	            //
	            add_option( $option_name, $new_template, $deprecated, $autoload );
	        } else {
	            $saved_templates[$template_id] = $template_arr;
	            update_option($option_name, $saved_templates);
	        }
	
	        echo $this->getLayout()->getNavBar()->getTemplateMenu();
	
	        //delete_option('spb_templates');
	
	        die();
	    }
		
		/* Load template callback
		---------------------------------------------------------- */
	    public function loadTemplateJavascript_callback() {
	        $output = '';
	        $template_id = $this->post( 'template_id' );
	
	        if ( !isset($template_id) || $template_id == "" ) { echo 'Error: TPL-02'; die(); }
	
	        $option_name = 'spb_templates';
	        $saved_templates = get_option($option_name);
	
	        $content = $saved_templates[$template_id]['template'];
	        $content = str_ireplace('\"', '"', $content);
	        //echo $content;
	        echo do_shortcode($content);
	
	        die();
	    }
	   
	   	/* Delete template callback
	   	---------------------------------------------------------- */
	    public function deleteTemplateJavascript_callback() {
	        $output = '';
	        $template_id = $this->post( 'template_id' );
	
	        if ( !isset($template_id) || $template_id == "" ) { echo 'Error: TPL-03'; die(); }
	
	        $option_name = 'spb_templates';
	        $saved_templates = get_option($option_name);
	
	        unset($saved_templates[$template_id]);
	        if ( count($saved_templates) > 0 ) {
	            update_option($option_name, $saved_templates);
	        } else {
	            delete_option($option_name);
	        }
	
	        echo $this->getLayout()->getNavBar()->getTemplateMenu();
	
	        die();
	    }
		
		/* Load pre-built template callback
		---------------------------------------------------------- */
		public function loadSFTemplateJavascript_callback() {
	        $output = $content = '';
	        $template_id = $this->post( 'template_id' );
	
	        if ( !isset($template_id) || $template_id == "" ) { echo 'Error: TPL-02'; die(); }
	        
	        $content = spb_get_prebuilt_template_code($template_id);
				        
	        echo do_shortcode($content);
	
	        die();
	    }
	    
	    /* Save element callback
	    ---------------------------------------------------------- */
	    public function saveElementJavascript_callback() {
            $output = '';
            $element_name = $this->post( 'element_name' );
            $element = $this->post( 'element' );
    
            if ( !isset($element_name) || $element_name == "" || !isset($element) || $element == "" ) { echo 'Error: TPL-01'; die(); }
    
            $element_arr = array( "name" => $element_name, "element" => $element );
    
            $option_name = 'spb_elements';
            $saved_elements = get_option($option_name);
        
            $element_id = sanitize_title($element_name)."_".rand();
            if ( $saved_elements == false ) {
                $deprecated = '';
                $autoload = 'no';
                //
                $new_element = array();
                $new_element[$element_id] = $element_arr;
                //
                add_option( $option_name, $new_element, $deprecated, $autoload );
            } else {
                $saved_elements[$element_id] = $element_arr;
                update_option($option_name, $saved_elements);
            }
    
            echo $this->getLayout()->getNavBar()->getElementsMenu();
        
            die();
        }
        
        /* Delete element callback
        ---------------------------------------------------------- */
        public function deleteElementJavascript_callback() {
            $output = '';
            $element_id = $this->post( 'element_id' );
    
            if ( !isset($element_id) || $element_id == "" ) { echo 'Error: TPL-03'; die(); }
    
            $option_name = 'spb_elements';
            $saved_elements = get_option($option_name);
    
            unset($saved_elements[$element_id]);
            if ( count($saved_elements) > 0 ) {
                update_option($option_name, $saved_elements);
            } else {
                delete_option($option_name);
            }
    
            echo $this->getLayout()->getNavBar()->getElementsMenu();
    
            die();
        }
        
        /* Load element callback
        ---------------------------------------------------------- */
        public function loadElementJavascript_callback() {
            $output = '';
            $element_id = $this->post( 'element_id' );
    
            if ( !isset($element_id) || $element_id == "" ) { echo 'Error: TPL-02'; die(); }
    
            $option_name = 'spb_elements';
            $saved_elements = get_option($option_name);
    
            $content = $saved_elements[$element_id]['element'];
            $content = str_ireplace('\"', '"', $content);

            echo do_shortcode($content);
    
            die();
        }
	}
	
?>