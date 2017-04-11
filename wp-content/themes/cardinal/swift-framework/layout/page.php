<?php if (have_posts()) : the_post(); ?>

	<div <?php post_class('clearfix'); ?> id="<?php the_ID(); ?>">
		
		<?php the_content(); ?>
		
		<div class="link-pages"><?php wp_link_pages(); ?></div>
	
	</div>

<?php endif; ?>