<?php
$args = array(
    'post_type' => 'post',
    'posts_per_page' => 3,
    'orderby' => 'date',
    'order' => 'DESC',
    'post_status' => 'publish'
);

$latest_posts = new WP_Query($args);
?>

<div class="narahosting-latest-posts-block">
    <div class="posts-header">
        <h3 class="posts-subtitle">GAME INSIGHTS</h3>
        <h2 class="posts-title">Stay updated with gamereviews and tips.</h2>
    </div>
    <?php if ($latest_posts->have_posts()): ?>
        <div class="posts-list">
            <?php while ($latest_posts->have_posts()):
                $latest_posts->the_post(); ?>
                <article <?php post_class('post-item'); ?>>

                    <?php if (has_post_thumbnail()): ?>
                        <a href="<?php the_permalink(); ?>">
                            <figure>
                                <?php the_post_thumbnail([600, 200]); ?>
                            </figure>
                        </a>
                    <?php endif; ?>

                    <div class="narahosting-text">
                        <h3 class="post-title">
                            <a href="<?php the_permalink(); ?>">
                                <?php the_title(); ?>
                            </a>
                        </h3>

                        <?php if (has_excerpt()): ?>
                            <a href="<?php the_permalink(); ?>">
                                <div class="post-excerpt">
                                    <?php the_excerpt(); ?>
                                </div>
                            </a>
                        <?php else: ?>
                            <a href="<?php the_permalink(); ?>">
                                <div class="post-excerpt">
                                    <p><?php echo wp_trim_words(get_the_content(), 20, '...'); ?></p>
                                </div>
                            </a>
                        <?php endif; ?>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>
        <?php wp_reset_postdata(); ?>
    <?php else: ?>
        <p><?php esc_html_e('No posts found', domain: 'narahosting-latest-posts'); ?></p>
    <?php endif; ?>
</div>