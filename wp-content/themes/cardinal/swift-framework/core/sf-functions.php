<?php
	
	/*
	*
	*	Swift Framework Functions
	*	------------------------------------------------
	*	Swift Framework v3.0
	* 	Copyright Swift Ideas 2014 - http://www.swiftideas.net
	*
	*	sf_output_container_open()
	*	sf_output_container_close()
	*	sf_output_container_row_open()
	*	sf_output_container_row_close()
	*	sf_get_post_meta()
	*	sf_get_option()
	*	sf_unregister_post_type()
	*	sf_content_filter()
	*	sf_widget_area_filter()
	*	sf_get_tweets()
	*	sf_hyperlinks()
	*	sf_twitter_users()
	*	sf_encode_tweet()
	*	sf_latest_tweet()
	*	posts_custom_columns()
	*	sf_list_galleries()
	*	sf_portfolio_related_posts()
	*	sf_has_previous_posts()
	*	sf_has_next_posts()
	*	sf_admin_altbg_css()
	*
	*/
	
	/* LAYOUT OUTPUT
	================================================== */
	function sf_output_container_open() {
		echo apply_filters('sf_container_open', '<div class="container">');
	}
	function sf_output_container_close() {
		echo apply_filters('sf_container_close', '</div><!-- CLOSE .container -->');
	}
	function sf_output_container_row_open() {
		echo apply_filters('sf_container_row_open', '<div class="container"><div class="row">');
	}
	function sf_output_container_row_close() {
		echo apply_filters('sf_container_row_close', '</div></div><!-- CLOSE .container -->');
	}
	
	
	/* PERFORMANCE FRIENDLY GET META FUNCTION
	================================================== */
	function sf_get_post_meta( $id, $key = "", $single = false ) {
	
	    $GLOBALS['sf_post_meta'] = isset( $GLOBALS['sf_post_meta'] ) ? $GLOBALS['sf_post_meta'] : array();
	    if ( !isset( $id ) ) {
	        return;
	    }
	    if (!is_array($id)) {
	        if ( ! isset( $GLOBALS['sf_post_meta'][ $id ] ) ) {
	            //$GLOBALS['sf_post_meta'][ $id ] = array();
	            $GLOBALS['sf_post_meta'][ $id ] = get_post_meta( $id );
	        }
	        if ( !empty($key) && isset($GLOBALS['sf_post_meta'][ $id ][$key]) && !empty($GLOBALS['sf_post_meta'][ $id ][$key]) ) {
	            if ( $single )
	                return maybe_unserialize( $GLOBALS['sf_post_meta'][ $id ][$key][0] );
	            else
	                return array_map('maybe_unserialize', $GLOBALS['sf_post_meta'][ $id ][$key] );
	        }
	
	        if ($single)
	            return '';
	        else
	            return array();
	
	    }
	
	    return get_post_meta($id, $key, $single);
	
	}
	
	/* PERFORMANCE FRIENDLY GET OPTION FUNCTION
	================================================== */
    function sf_get_option( $key, $default = "" ) {
        // Original calls
        //return get_option($key, $default);
		
		// Optimised calls
        if ( isset( $GLOBALS['sf_customizer'][ $key ] ) ) {
            return $GLOBALS['sf_customizer'][ $key ];
        } else if ( isset( $default ) ) {
            return $default;
        }

        return '';
    }
	
	
	/* UNREGISTER CUSTOM POST TYPES
	================================================== */
	function sf_unregister_post_type( $post_type, $slug = '' ) {
		global $sf_options, $wp_post_types;
		if (isset($sf_options['cpt-disable'])) {
			$cpt_disable = $sf_options['cpt-disable'];
			if (!empty($cpt_disable)) {
				foreach ($cpt_disable as $post_type => $cpt) {
					if ($cpt == 1 && isset( $wp_post_types[ $post_type ] ) ) {
					        unset( $wp_post_types[ $post_type ] );
					}
				}
			}
		}
	}
	add_action('init', 'sf_unregister_post_type', 20);
	
	
	/* SHORTCODE FIX
	================================================== */	 
	if (!function_exists('sf_content_filter')) {
		function sf_content_filter($content) {
			// array of custom shortcodes requiring the fix 
			$block = join("|",array("alert","sf_button","icon","sf_iconbox","sf_imagebanner","social","sf_social_share","highlight","decorative_ampersand","blockquote1","blockquote2","blockquote3","pullquote","dropcap1","dropcap2","dropcap3","dropcap4","one_half","one_half_last","one_third","one_third_last","two_third","two_third_last","one_fourth","one_fourth_last","three_fourth","three_fourth_last","one_half","one_half_last","progress_bar","chart","sf_count","sf_countdown","sf_tooltip","sf_modal","sf_fullscreenvideo","sf_visibility","table","trow","thcol","tcol","list","list_item","hr","accordion","panel","tabs","tab","sf_supersearch","gallery","spb_accordion","spb_accordion_tab","spb_blog","spb_boxed_content","spb_clients","spb_codesnippet","spb_divider","spb_faqs","spb_gallery","spb_googlechart","spb_gmaps","spb_latest_tweets","spb_message","spb_parallax","spb_portfolio","spb_portfolio_carousel","spb_portfolio_showcase","spb_posts_carousel","spb_products","spb_products_mini","spb_recent_posts","spb_slider","spb_sitemap","spb_search","spb_supersearch","spb_tabs","spb_tab","spb_text_block","spb_team","spb_testimonial","spb_testimonial_carousel","spb_testimonial_slider","spb_toggle","spb_tour","spb_tweets_slider","spb_video","spb_blank_spacer","spb_image", "spb_blog_grid", "spb_promo_bar", "spb_gravityforms", "spb_campaigns", "spb_column", "spb_row", "spb_icon_box"));
			// opening tag
			$rep = preg_replace("/(<p>)?\[($block)(\s[^\]]+)?\](<\/p>|<br \/>)?/","[$2$3]",$content);
			// closing tag
			$rep = preg_replace("/(<p>)?\[\/($block)](<\/p>|<br \/>)?/","[/$2]",$rep);
			return $rep; 
		}
		add_filter("the_content", "sf_content_filter");
	}
	
	
	/* WIDGET AREA FILTER
	================================================== */
	if (!function_exists('sf_widget_area_filter')) {
		function sf_widget_area_filter($options) {
			$options = array(
				'before_widget' => '<section id="%1$s" class="widget %2$s clearfix">',
				'after_widget' => '</section>',
				'before_title' => '<div class="widget-heading clearfix"><h4 class="spb-heading"><span>',
				'after_title' => '</span></h4></div>',
			);
			return $options; 
		}
		add_filter('redux_custom_widget_args', 'sf_widget_area_filter');
	}
		
	
	/* TWEET FUNCTIONS
	================================================== */
	if (!function_exists('sf_get_tweets')) {
		function sf_get_tweets($twitterID, $count, $type = "", $item_class = "col-sm-4") {
			
			global $sf_options;
			$enable_twitter_rts = false;
			if (isset($sf_options['enable_twitter_rts'])) {
				$enable_twitter_rts = $sf_options['enable_twitter_rts'];
			}
			
			$content = "";
			$blog_grid_count = 0;
				
			if (function_exists('getTweets')) {
				
				$options = array('trim_user'=>true, 'exclude_replies'=> false, 'include_rts'=> $enable_twitter_rts);
							
				$tweets = getTweets($twitterID, $count, $options);
								
				if(is_array($tweets)){
																
					if (isset($tweets["error"]) && $tweets["error"] != "") {
						
						return '<li>'.$tweets["error"].'</li>';
					
					} else {
											
						foreach($tweets as $tweet) {
						
							if ($type == "blog-grid") {
								
								$content .= '<li class="blog-item col-sm-sf-5" data-date="'.strtotime($tweet['created_at']).'" data-sortid="'.$blog_grid_count.'">';
								$content .= '<a class="grid-link" href="https://twitter.com/'.$twitterID.'/status/'.$tweet['id_str'].'" target="_blank"></a>';
								$content .= '<div class="grid-no-image">';
								$content .= '<h6>'.__("Twitter", "swiftframework").'</h6>';
								
								$blog_grid_count = $blog_grid_count + 2;
								
							} else if ($type == "blog") {
								
								$content .= '<li class="blog-item '.$item_class.'" data-date="'.strtotime($tweet['created_at']).'">';
								$content .= '<a class="grid-link" href="https://twitter.com/'.$twitterID.'/status/'.$tweet['id_str'].'" target="_blank"></a>';
								$content .= '<div class="details-wrap">';
								$content .= '<h6>'.__("Twitter", "swiftframework").'</h6>';
							
							} else if ($type == "blog-fw") {
								
								$content .= '<li class="blog-item '.$item_class.'" data-date="'.strtotime($tweet['created_at']).'">';
								$content .= '<a class="grid-link" href="https://twitter.com/'.$twitterID.'/status/'.$tweet['id_str'].'" target="_blank"></a>';
								$content .= '<div class="details-wrap">';
								$content .= '<h6>'.__("Twitter", "swiftframework").'</h6>';
								
							} else {
							
								$content .= '<li>';
							
							}
							
						    if (isset($tweet['text']) && $tweet['text']) {
						    	
						    	if ($type == "blog" || $type == "blog-grid" || $type == "blog-fw") {	
						    	$content .= '<h2 class="tweet-text">';
						    	} else {
						    	$content .= '<div class="tweet-text slide-content-wrap">';
						    	}
						    	
						        $the_tweet = $tweet['text'];
						        /*
						        Twitter Developer Display Requirements
						        https://dev.twitter.com/terms/display-requirements
						
						        2.b. Tweet Entities within the Tweet text must be properly linked to their appropriate home on Twitter. For example:
						          i. User_mentions must link to the mentioned user's profile.
						         ii. Hashtags must link to a twitter.com search with the hashtag as the query.
						        iii. Links in Tweet text must be displayed using the display_url
						             field in the URL entities API response, and link to the original t.co url field.
						        */
						
						        // i. User_mentions must link to the mentioned user's profile.
						        if(isset($tweet['entities']['user_mentions']) && is_array($tweet['entities']['user_mentions'])){
						            foreach($tweet['entities']['user_mentions'] as $key => $user_mention){
						                $the_tweet = preg_replace(
						                    '/@'.$user_mention['screen_name'].'/i',
						                    '<a href="http://www.twitter.com/'.$user_mention['screen_name'].'" target="_blank">@'.$user_mention['screen_name'].'</a>',
						                    $the_tweet);
						            }
						        }
						
						        // ii. Hashtags must link to a twitter.com search with the hashtag as the query.
						        if(isset($tweet['entities']['hashtags']) && is_array($tweet['entities']['hashtags'])){
						            foreach($tweet['entities']['hashtags'] as $key => $hashtag){
						                $the_tweet = preg_replace(
						                    '/#'.$hashtag['text'].'/i',
						                    '<a href="https://twitter.com/search?q=%23'.$hashtag['text'].'&amp;src=hash" target="_blank">#'.$hashtag['text'].'</a>',
						                    $the_tweet);
						            }
						        }
						
						        // iii. Links in Tweet text must be displayed using the display_url
						        //      field in the URL entities API response, and link to the original t.co url field.
						        if(isset($tweet['entities']['urls']) && is_array($tweet['entities']['urls'])){
						            foreach($tweet['entities']['urls'] as $key => $link){
						                $the_tweet = preg_replace(
						                    '`'.$link['url'].'`',
						                    '<a href="'.$link['url'].'" target="_blank">'.$link['url'].'</a>',
						                    $the_tweet);
						            }
						        }
						        
						        // Custom code to link to media
						        if(isset($tweet['entities']['media']) && is_array($tweet['entities']['media'])){
						            foreach($tweet['entities']['media'] as $key => $media){
						                $the_tweet = preg_replace(
						                    '`'.$media['url'].'`',
						                    '<a href="'.$media['url'].'" target="_blank">'.$media['url'].'</a>',
						                    $the_tweet);
						            }
						        }
						
						        $content .= $the_tweet;
								
								if ($type == "blog" || $type == "blog-grid" || $type == "blog-fw") {	
								$content .= '</h2>';
								} else {
								$content .= '</div>';
								}
						
						        // 3. Tweet Actions
						        //    Reply, Retweet, and Favorite action icons must always be visible for the user to interact with the Tweet. These actions must be implemented using Web Intents or with the authenticated Twitter API.
						        //    No other social or 3rd party actions similar to Follow, Reply, Retweet and Favorite may be attached to a Tweet.
						        // 4. Tweet Timestamp
						        //    The Tweet timestamp must always be visible and include the time and date. e.g., "3:00 PM - 31 May 12".
						        // 5. Tweet Permalink
						        //    The Tweet timestamp must always be linked to the Tweet permalink.
						        
						       	$content .= '<div class="twitter_intents">'. "\n";
						        $content .= '<a class="reply" href="https://twitter.com/intent/tweet?in_reply_to='.$tweet['id_str'].'"><i class="fa-reply"></i></a>'. "\n";
						        $content .= '<a class="retweet" href="https://twitter.com/intent/retweet?tweet_id='.$tweet['id_str'].'"><i class="fa-retweet"></i></a>'. "\n";
						        $content .= '<a class="favorite" href="https://twitter.com/intent/favorite?tweet_id='.$tweet['id_str'].'"><i class="fa-star"></i></a>'. "\n";
						        
						        $date = strtotime($tweet['created_at']); // retrives the tweets date and time in Unix Epoch terms
						        $blogtime = current_time('U'); // retrives the current browser client date and time in Unix Epoch terms
						        $dago = human_time_diff($date, $blogtime) . ' ' . sprintf(__('ago', 'swiftframework')); // calculates and outputs the time past in human readable format
								$content .= '<a class="timestamp" href="https://twitter.com/'.$twitterID.'/status/'.$tweet['id_str'].'" target="_blank">'.$dago.'</a>'. "\n";
								$content .= '</div>'. "\n";
						    } else {
						        $content .= '<a href="http://twitter.com/'.$twitterID.'" target="_blank">@'.$twitterID.'</a>';
						    }
						    
						    if ($type == "blog" || $type == "blog-grid" || $type == "blog-fw") {	
						    	$content .= '<data class="date" data-date="'.$date.'">'.$dago.'</data>';
						    	$content .= '<div class="author"><span>@'.$twitterID.'</span></div>';
						    	$content .= '<div class="tweet-icon"><i class="fa-twitter"></i></div>'. "\n";
						    	$content .= '</div>';
						    }
						    
						    $content .= '</li>';
						}
					}
					return $content;
					
				}
			} else {
				return '<li><div class="tweet-text">Please install the oAuth Twitter Feed Plugin and follow the theme documentation to set it up.</div></li>';
			}	
	
		}
	}
		
	function sf_hyperlinks($text) {
		    $text = preg_replace('/\b([a-zA-Z]+:\/\/[\w_.\-]+\.[a-zA-Z]{2,6}[\/\w\-~.?=&%#+$*!]*)\b/i',"<a href=\"$1\" class=\"twitter-link\">$1</a>", $text);
		    $text = preg_replace('/\b(?<!:\/\/)(www\.[\w_.\-]+\.[a-zA-Z]{2,6}[\/\w\-~.?=&%#+$*!]*)\b/i',"<a href=\"http://$1\" class=\"twitter-link\">$1</a>", $text);
		    // match name@address
		    $text = preg_replace("/\b([a-zA-Z][a-zA-Z0-9\_\.\-]*[a-zA-Z]*\@[a-zA-Z][a-zA-Z0-9\_\.\-]*[a-zA-Z]{2,6})\b/i","<a href=\"mailto://$1\" class=\"twitter-link\">$1</a>", $text);
		        //mach #trendingtopics. Props to Michael Voigt
		    $text = preg_replace('/([\.|\,|\:|\>|\{|\(]?)#{1}(\w*)([\.|\,|\:|\!|\?|\>|\}|\)]?)\s/i', "$1<a href=\"http://twitter.com/#search?q=$2\" class=\"twitter-link\">#$2</a>$3 ", $text);
		    return $text;
		}
		
	function sf_twitter_users($text) {
	       $text = preg_replace('/([\.|\,|\:|\>|\{|\(]?)@{1}(\w*)([\.|\,|\:|\!|\?|\>|\}|\)]?)\s/i', "$1<a href=\"http://twitter.com/$2\" class=\"twitter-user\">@$2</a>$3 ", $text);
	       return $text;
	}

    function sf_encode_tweet($text) {
            $text = mb_convert_encoding( $text, "HTML-ENTITIES", "UTF-8");
            return $text;
    }
	
	
	/* LATEST TWEET FUNCTION
	================================================== */
	if (!function_exists('sf_latest_tweet')) {
		function sf_latest_tweet($count, $twitterID) {
		
			global $sf_options;
			$enable_twitter_rts = false;
			if (isset($sf_options['enable_twitter_rts'])) {
				$enable_twitter_rts = $sf_options['enable_twitter_rts'];
			}
			
			$content = "";
			
			if ($twitterID == "") {
				return __("Please provide your Twitter username", "swiftframework");
			}
			
			if (function_exists('getTweets')) {
							
				$options = array('trim_user'=>true, 'exclude_replies'=>false, 'include_rts'=> $enable_twitter_rts);
							
				$tweets = getTweets($twitterID, $count, $options);
			
				if(is_array($tweets)){
							
					foreach($tweets as $tweet){
											
						$content .= '<li>';
					
					    if(is_array($tweet) && $tweet['text']){
					    	
					    	$content .= '<div class="tweet-text">';
					    	
					        $the_tweet = $tweet['text'];
					        /*
					        Twitter Developer Display Requirements
					        https://dev.twitter.com/terms/display-requirements
					
					        2.b. Tweet Entities within the Tweet text must be properly linked to their appropriate home on Twitter. For example:
					          i. User_mentions must link to the mentioned user's profile.
					         ii. Hashtags must link to a twitter.com search with the hashtag as the query.
					        iii. Links in Tweet text must be displayed using the display_url
					             field in the URL entities API response, and link to the original t.co url field.
					        */
					
					        // i. User_mentions must link to the mentioned user's profile.
					        if(is_array($tweet['entities']['user_mentions'])){
					            foreach($tweet['entities']['user_mentions'] as $key => $user_mention){
					                $the_tweet = preg_replace(
					                    '/@'.$user_mention['screen_name'].'/i',
					                    '<a href="http://www.twitter.com/'.$user_mention['screen_name'].'" target="_blank">@'.$user_mention['screen_name'].'</a>',
					                    $the_tweet);
					            }
					        }
					
					        // ii. Hashtags must link to a twitter.com search with the hashtag as the query.
					        if(is_array($tweet['entities']['hashtags'])){
					            foreach($tweet['entities']['hashtags'] as $key => $hashtag){
					                $the_tweet = preg_replace(
					                    '/#'.$hashtag['text'].'/i',
					                    '<a href="https://twitter.com/search?q=%23'.$hashtag['text'].'&amp;src=hash" target="_blank">#'.$hashtag['text'].'</a>',
					                    $the_tweet);
					            }
					        }
					
					        // iii. Links in Tweet text must be displayed using the display_url
					        //      field in the URL entities API response, and link to the original t.co url field.
					        if(is_array($tweet['entities']['urls'])){
					            foreach($tweet['entities']['urls'] as $key => $link){
					                $the_tweet = preg_replace(
					                    '`'.$link['url'].'`',
					                    '<a href="'.$link['url'].'" target="_blank">'.$link['url'].'</a>',
					                    $the_tweet);
					            }
					        }
							
							// Custom code to link to media
							if(isset($tweet['entities']['media']) && is_array($tweet['entities']['media'])){
							    foreach($tweet['entities']['media'] as $key => $media){
							        $the_tweet = preg_replace(
							            '`'.$media['url'].'`',
							            '<a href="'.$media['url'].'" target="_blank">'.$media['url'].'</a>',
							            $the_tweet);
							    }
							}
							
					        $content .= $the_tweet;
							
							$content .= '</div>';
					
					        // 3. Tweet Actions
					        //    Reply, Retweet, and Favorite action icons must always be visible for the user to interact with the Tweet. These actions must be implemented using Web Intents or with the authenticated Twitter API.
					        //    No other social or 3rd party actions similar to Follow, Reply, Retweet and Favorite may be attached to a Tweet.
					        // 4. Tweet Timestamp
					        //    The Tweet timestamp must always be visible and include the time and date. e.g., "3:00 PM - 31 May 12".
					        // 5. Tweet Permalink
					        //    The Tweet timestamp must always be linked to the Tweet permalink.
					        
					       	$content .= '<div class="twitter_intents">'. "\n";
					        $content .= '<a class="reply" href="https://twitter.com/intent/tweet?in_reply_to='.$tweet['id_str'].'"><i class="fa-reply"></i></a>'. "\n";
					        $content .= '<a class="retweet" href="https://twitter.com/intent/retweet?tweet_id='.$tweet['id_str'].'"><i class="fa-retweet"></i></a>'. "\n";
					        $content .= '<a class="favorite" href="https://twitter.com/intent/favorite?tweet_id='.$tweet['id_str'].'"><i class="fa-star"></i></a>'. "\n";
					        
					        $date = strtotime($tweet['created_at']); // retrives the tweets date and time in Unix Epoch terms
					        $blogtime = current_time('U'); // retrives the current browser client date and time in Unix Epoch terms
					        $dago = human_time_diff($date, $blogtime) . ' ' . sprintf(__('ago', 'swiftframework')); // calculates and outputs the time past in human readable format
							$content .= '<a class="timestamp" href="https://twitter.com/'.$twitterID.'/status/'.$tweet['id_str'].'" target="_blank">'.$dago.'</a>'. "\n";
							$content .= '</div>'. "\n";
					    } else {
					        $content .= '<a href="http://twitter.com/'.$twitterID.'" target="_blank">@'.$twitterID.'</a>';
					    }
					    $content .= '</li>';
					}
				}
				return $content;
			} else {
				return '<li><div class="tweet-text">Please install the oAuth Twitter Feed Plugin and follow the theme documentation to set it up.</div></li>';
			}	
		}
	}
	
	
	/* GET INSTAGRAMS FUNCTION
	================================================== */
	if (!function_exists('sf_get_instagrams')) {
		function sf_get_instagrams() {
			
			if (class_exists('PhotoTileForInstagramBot')) {
				
				$bot = new PhotoTileForInstagramBot();
				
				$optiondetails = $bot->option_defaults();
				$options = array();
				foreach( $optiondetails as $opt=>$details ){
					$options[$opt] = $details['default'];
					if( isset($details['short']) && isset($atts[ $details['short'] ]) ){
						$options[$opt] = $atts[ $details['short'] ];
					}
				}
				$id = rand(100, 1000);
				$bot->set_private('wid','id'.$id);
				$bot->set_private('options',$options);
				$bot->do_alpine_method( 'update_global_options' );
				$bot->do_alpine_method( 'enqueue_style_and_script' );  
				// Do the photo search
				$bot->do_alpine_method( 'photo_retrieval' );
				
				$return = '<div id="'.$bot->get_private('id').'-by-shortcode-'.$id.'" class="AlpinePhotoTiles_inpost_container">';
				$return .= $bot->get_active_result('hidden');
				if( $bot->check_active_result('success') ){
					if( 'vertical' == $options['style_option'] ){
						$bot->do_alpine_method( 'display_vertical' );
					} elseif ( 'cascade' == $options['style_option'] ){
						$bot->do_alpine_method( 'display_cascade' );
					} else {
						$bot->do_alpine_method( 'display_hidden' );
					}
					$return .= $bot->get_private('output');
				}
				// If user does not have necessary extensions 
				// or error occured before content complete, report such...
				elseif( $bot->check_active_option('general_hide_message') ){
					$return .= '<!-- Sorry:<br>'.$bot->get_active_result('message').'-->';
				} else {
					$return .= 'Sorry:<br>'.$bot->get_active_result('message');
				}
				$return .= '</div>';
			    
			    return $return;
			}	
		}
	}
	
	
	/* CHECK IF BUDDYPRESS PAGE
	================================================== */	  
	function sf_is_buddypress(){
		$bp_component = "";
		if (function_exists('bp_current_component')) {
			$bp_component = bp_current_component();
		}
		return $bp_component;
	}
	
	
	/* CHECK IF BBPRESS PAGE
	================================================== */	  
	function sf_is_bbpress(){
		$bbpress = false;
		if (function_exists('is_bbpress')) {
			$bbpress = is_bbpress();
		}
		return $bbpress;
	}
	
	
	/* CUSTOM POST TYPE COLUMNS
	================================================== */	  
	function sf_posts_custom_columns($column){
	    global $post;  
	    switch ($column)  
	    {  
	        case "description":  
	            the_excerpt();  
	            break;
	        case "thumbnail":  
	            the_post_thumbnail('thumbnail');  
	            break;
	        case "portfolio-category":
	            echo get_the_term_list($post->ID, 'portfolio-category', '', ', ','');
	            break;
	        case "swift-slider-category":
	            echo get_the_term_list($post->ID, 'swift-slider-category', '', ', ','');
	            break;
	        case "gallery-category":
	            echo get_the_term_list($post->ID, 'gallery-category', '', ', ','');
	            break;
	        case "testimonials-category":
	            echo get_the_term_list($post->ID, 'testimonials-category', '', ', ','');
	            break;
	        case "team-category":
	            echo get_the_term_list($post->ID, 'team-category', '', ', ','');
	            break;
	        case "clients-category":
	            echo get_the_term_list($post->ID, 'clients-category', '', ', ','');
	            break;
			case "directory-category":
	            echo get_the_term_list($post->ID, 'directory-category', '', ', ','');
	            break;
			case "location":
			    echo get_the_term_list($post->ID, 'directory-location', '', ', ','');
			    break;
	    }  
	}  
	add_action("manage_posts_custom_column",  "sf_posts_custom_columns"); 
	
		
	/* GALLERY LIST FUNCTION
	================================================== */
	function sf_list_galleries() {
		$galleries_list = array();
		$galleries_query = new WP_Query( array( 'post_type' => 'galleries', 'posts_per_page' => -1 ) );
		while ( $galleries_query->have_posts() ) : $galleries_query->the_post();
			$galleries_list[get_the_title()] = get_the_ID();
		endwhile;
		wp_reset_query();
		
		if (empty($galleries_list)) {
			$galleries_list[] = "No galleries found";
		}
		return $galleries_list;
	}
	
	
	/* PORTFOLIO RELATED POSTS
	================================================== */	
	function sf_portfolio_related_posts( $post_id , $item_count = 3) {	    
	    $query = new WP_Query();
	    $terms = wp_get_object_terms( $post_id, 'portfolio-category' );
	    if ( count( $terms ) ) {
	        $post_ids = get_objects_in_term( $terms[0]->term_id, 'portfolio-category' );
			
			$index = array_search($post_id,$post_ids);
			if($index !== FALSE){
			    unset($post_ids[$index]);
			}
			
	        $args = array(
	                'post_type' => 'portfolio',
	                'post__in' => $post_ids,
	                'taxonomy' => 'portfolio-category',
	                'term' => $terms[0]->slug,
	                'posts_per_page' => $item_count
	            ) ;
	        $query = new WP_Query( $args );
	    }
	
	    // Return our results in query form
	    return $query;
	}
	
	
	/* REVIEW CALCULATION FUNCTIONS
	================================================== */
	function sf_review_barpercent($value, $format) {
		$barpercentage = 0;
		
		if ($format == "percentage") {
		$barpercentage = $value;
		} else {
		$barpercentage = $value / 10 * 100;
		}
		
	    return $barpercentage;
	}
	
	if (!function_exists('sf_review_overall')) {
		function sf_review_overall($arr) {
			$total = $average = "";
		    $count = count($arr); //total numbers in array
		    if ($count > 0) {
		    foreach ($arr as $value) {
		        $total = $total + $value; // total value of array numbers
		    }
		    $average = floor(($total/$count)); // get average value
		    }
		    return $average;
		}
	}
	
	
	/* NAVIGATION CHECK
	================================================== */
	//functions tell whether there are previous or next 'pages' from the current page
	//returns 0 if no 'page' exists, returns a number > 0 if 'page' does exist
	//ob_ functions are used to suppress the previous_posts_link() and next_posts_link() from printing their output to the screen
	function sf_has_previous_posts() {
		ob_start();
		previous_posts_link();
		$result = strlen(ob_get_contents());
		ob_end_clean();
		return $result;
	}
	
	function sf_has_next_posts() {
		ob_start();
		next_posts_link();
		$result = strlen(ob_get_contents());
		ob_end_clean();
		return $result;
	}	
?>
