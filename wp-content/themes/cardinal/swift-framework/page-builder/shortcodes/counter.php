<?php

class SwiftPageBuilderShortcode_spb_counter extends SwiftPageBuilderShortcode {

    protected function content($atts, $content = null) {

		    $width = $el_class = $output = $items = $el_position = '';
		
	        extract(shortcode_atts(array(
	        	'subject' => '',
	        	'from' => '0',
	        	'to' => '100',
	        	'speed' => '2000',
	        	'refresh' => '25',
	        	'textstyle' => 'h3',
	        	'textcolor' => '',
	        	'width' => '1/1',
	        	'el_position' => '',
	        	'el_class' => ''
	        ), $atts));
    		      		
    		$el_class = $this->getExtraClass($el_class);
            $width = spb_translateColumnWidthToSpan($width);
            
           	$output .= "\n\t".'<div class="spb_counter spb_content_element '.$width.$el_class.'">';            
            $output .= "\n\t\t".'<div class="spb-asset-content">'; 
            $output .= "\n\t\t\t". do_shortcode('[sf_count from="'.$from.'" to="'.$to.'" speed="'.$speed.'" refresh="'.$refresh.'" textstyle="'.$textstyle.'" subject="'.$subject.'" color="'.$textcolor.'"]');
            $output .= "\n\t\t".'</div>';
            $output .= "\n\t".'</div> '.$this->endBlockComment($width);
    
            $output = $this->startRow($el_position) . $output . $this->endRow($el_position);
            
            return $output;
		
    }
}

SPBMap::map( 'spb_counter', array(
    "name"		=> __("Counter", "swift-framework-admin"),
    "base"		=> "spb_counter",
    "class"		=> "spb_counter",
    "icon"      => "spb-icon-counter",
    "params"	=> array(
        array(
            "type" => "textfield",
            "holder" => "div",
            "heading" => __("Counter Subject", "swift-framework-admin"),
            "param_name" => "subject",
            "value" => "",
            "description" => __("The text which you would like to show below the counter.", "swift-framework-admin")
        ),
        array(
            "type" => "textfield",
            "heading" => __("Counter From", "swift-framework-admin"),
            "param_name" => "from",
            "value" => "0",
            "description" => __("The number from which the counter starts at.", "swift-framework-admin")
        ),
        array(
            "type" => "textfield",
            "holder" => "div",
            "heading" => __("Counter To", "swift-framework-admin"),
            "param_name" => "to",
            "value" => "100",
            "description" => __("The number from which the counter counts up to.", "swift-framework-admin")
        ),
        array(
            "type" => "textfield",
            "heading" => __("Counter Speed", "swift-framework-admin"),
            "param_name" => "speed",
            "value" => "2000",
            "description" => __("The time you want for the counter to take to complete, this is in milliseconds and the default is 2000.", "swift-framework-admin")
        ),
        array(
            "type" => "textfield",
            "heading" => __("Counter Refresh", "swift-framework-admin"),
            "param_name" => "refresh",
            "value" => "25",
            "description" => __("The time to wait between refreshing the counter. This is in milliseconds and the default is 25.", "swift-framework-admin")
        ),
		array(
		   "type" => "dropdown",
		   "heading" => __("Counter Text Style", "swift-framework-admin"),
		   "param_name" => "textstyle",
		   "value" => array(
		   		"H3" => "h3",
		   		"H6" => "h6",
		   		"Body" => "div"
		   	),
		   "description" => __("Chose the subject text style for the counter.", "swift-framework-admin")
		),
		array(
		    "type" => "colorpicker",
		    "heading" => __("Counter Text Color", "swift-framework-admin"),
		    "param_name" => "textcolor",
		    "value" => "",
		    "description" => __("Select a colour for the counter text here.", "swift-framework-admin")
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