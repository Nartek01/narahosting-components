<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<h1 className="narahosting-title">
		<a href="/">
			<?php echo get_bloginfo(show: 'name') ?>
		</a>
	</h1>
	<ul class="menu-items">
		<li class="menu-single-item"><a href="/">Home</a></li>
		<li class="menu-single-item"><a href="/about">About</a></li>
		<li class="menu-single-item"><a href="/services">Services</a></li>
		<li class="menu-single-item"><a href="/blog">Blog</a></li>
		<a class="menu-single-item narahosting-primary-button" href="#">CONTACT</a>
	</ul>
</div>