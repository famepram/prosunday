<?php
	/*
	*
	*	Single Gallery
	*	------------------------------------------------
	*	Swift Framework v3.0
	* 	Copyright Swift Ideas 2014 - http://www.swiftideas.net
	*
	*
	*/
?>

<?php if (have_posts()) : the_post(); ?>
	
	<?php	
		$gallery_id = get_the_ID();
	?>
		
	<?php do_action('sf_gallery_before_article'); ?>
	
	<!-- OPEN article -->
	<article <?php post_class('clearfix single-team'); ?> id="<?php the_ID(); ?>">
						
		<?php 
			do_action('sf_gallery_article_start'); 
		?>
				
		<section class="page-content clearfix">
	
			<?php 
				do_action('sf_before_gallery_content');
			?>
			
			<?php echo do_shortcode('[spb_gallery gallery_id="'.$gallery_id.'" display_type="masonry" columns="3" fullwidth="no" gutters="yes" slider_transition="slide" show_thumbs="yes" autoplay="yes" show_captions="yes" enable_lightbox="yes" width="1/1" el_position="first last"]'); ?>
			
			<?php 
				do_action('sf_after_gallery_content');
			?>
									
		</section>
		
		<?php 
			do_action('sf_gallery_article_end'); 
		?>
		
	<!-- CLOSE article -->
	</article>
	
	<?php 
		do_action('sf_gallery_after_article');
	?>

<?php endif; ?>