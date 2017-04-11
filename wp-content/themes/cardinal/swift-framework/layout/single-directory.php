<?php
	global $sf_options, $sf_sidebar_config;
	
	/* META SETUP */
	$default_sidebar_config = $sf_options['default_sidebar_config'];
	$default_left_sidebar = $sf_options['default_left_sidebar'];
	$default_right_sidebar = $sf_options['default_right_sidebar'];
	
	$sidebar_config = sf_get_post_meta($post->ID, 'sf_sidebar_config', true);
	$left_sidebar = sf_get_post_meta($post->ID, 'sf_left_sidebar', true);
	$right_sidebar = sf_get_post_meta($post->ID, 'sf_right_sidebar', true);
	
	if ($sidebar_config == "") {
		$sidebar_config = $default_sidebar_config;
	}
	if ($left_sidebar == "") {
		$left_sidebar = $default_left_sidebar;
	}
	if ($right_sidebar == "") {
		$right_sidebar = $default_right_sidebar;
	}
	$page_content_class = $content_wrap_class = "";

	/* SIDEBAR SETUP */
	if ($sidebar_config == "left-sidebar") {
		add_action('sf_after_post_content', 'sf_post_left_sidebar', 10);
	} else if ($sidebar_config == "right-sidebar") {
		add_action('sf_after_post_content', 'sf_post_right_sidebar', 10);
	}
	
	/* PAGE BUILDER CHECK */
	$pb_active = sf_get_post_meta($post->ID, '_spb_js_status', true);
	if ($pb_active != "true" || ($pb_active == "true" && $sidebar_config != "no-sidebars")) {
		$page_content_class = "container";
	}
	
	/* CONTENT WRAP */
	if ($sidebar_config == "right-sidebar") {
		$content_wrap_class = apply_filters('sf_post_content_wrap_class', 'col-sm-8 content-left');
	} else if ($sidebar_config == "left-sidebar") {
		$content_wrap_class = apply_filters('sf_post_content_wrap_class', 'col-sm-8 content-right');
	} else {
		$content_wrap_class = apply_filters('sf_post_content_wrap_class_nosidebar', 'col-sm-8 col-sm-offset-2');
	}
	
	remove_action('sf_post_after_article', 'sf_post_pagination', 5);
	remove_action('sf_post_after_article', 'sf_post_related_articles', 10);
	remove_action('sf_post_after_article', 'sf_post_comments', 20);
?>

<?php if (have_posts()) : the_post(); ?>

	<!-- OPEN article -->
	<article <?php post_class('clearfix single-directory'); ?> id="<?php the_ID(); ?>">
							
		<?php 
			/**
			 * @hooked - sf_post_detail_heading - 10
			 * @hooked - sf_post_detail_media - 20
			**/
			do_action('sf_post_article_start'); 
		?>
		
		<section class="page-content clearfix <?php echo $page_content_class; ?>">
	
			<?php
				do_action('sf_before_post_content');
			?>
			
			<div class="content-wrap <?php echo $content_wrap_class; ?> clearfix" itemprop="articleBody">
				<?php 
					/**
					 * @hooked - sf_post_detail_media - 10 (standard)
					**/
					do_action('sf_post_content_start');
				?>
				<?php the_content(); ?>
				<div class="link-pages"><?php wp_link_pages(); ?></div>
				<?php 
					/**
					 * @hooked - sf_post_review - 20
					 * @hooked - sf_post_share - 30
					 * @hooked - sf_post_details - 40
					**/
					do_action('sf_post_content_end');
				?>
			</div>
				
			<?php 
				/**
				 * @hooked - sf_post_left_sidebar - 10
				 * @hooked - sf_post_right_sidebar - 10
				**/
				do_action('sf_after_post_content');
			?>
									
		</section>
		
		<?php 
			do_action('sf_post_article_end'); 
		?>
		
	<!-- CLOSE article -->
	</article>
	
	<section class="article-extras">
	
	<?php 
		/**
		 * @hooked - sf_post_pagination - 5
		 * @hooked - sf_post_related_articles - 10
		 * @hooked - sf_post_comments - 20
		**/
		do_action('sf_post_after_article');
	?>
	
	</section>
	
<?php endif; ?>