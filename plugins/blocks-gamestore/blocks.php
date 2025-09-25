<?php
function view_block_games_line($attributes)
{
    $args = array(
        "post_type" => "product",
        "posts_per_page" => $attributes['count'],
        "orderby" => "date",
        "order" => "DESC",
    );

    $game_query = new WP_Query($args);


    ob_start();
    echo '<div ' . get_block_wrapper_attributes() .  '>';

    if ($game_query->have_posts()) :
        echo '<div class="games-line-container"> <div class="swiper-wrapper">';



        while ($game_query->have_posts()) :
            $game_query->the_post();
            $product = wc_get_product(get_the_ID());
?>
            <div class="game-item swiper-slide">
                <a href="<?php echo get_the_permalink(); ?>">

                    <?php echo $product->get_image('full'); ?>
                </a>
            </div>
        <?php
        endwhile;


        echo '</div></div>'; // Close gamestore-line-container
    endif;

    echo '</div>'; // Close block wrapper
    wp_reset_postdata();

    return ob_get_clean();
}



function view_block_news($attributes)
{
    $args = array(
        "post_type" => "news",
        "posts_per_page" => 3,
        "orderby" => "date",
        "order" => "DESC",
    );

    $news_query = new WP_Query($args);
    $bgImage = (isset($attributes["bgImage"])) ? 'style="background-image: url(' . $attributes["bgImage"] . ')"'  : "";

    ob_start();
    echo '<div ' . get_block_wrapper_attributes() . $bgImage  . '>';

    echo '<div class="news_heading_wrapper">';
    if ($attributes['title']) {
        echo ' <h2 class="title">' . $attributes['title'] . ' </h2>';
    }
    if ($attributes['description']) {
        echo ' <p class="description"> ' . $attributes['description'] . ' </p>';
    }
    echo '</div>';
    echo ' <div class="news_container_wrapper">';

    if ($news_query->have_posts()) :
        while ($news_query->have_posts()) :
            $news_query->the_post();
        ?>
            <div class="news-item">
                <h3 class="title"><?php the_title(); ?></h3>
                <img src="<?php echo esc_url(get_the_post_thumbnail_url() ); ?>" class="news-image" alt="<?php the_title_attribute(); ?>">

            </div>
    <?php
        endwhile;
    endif;


    echo '</div>';

    wp_reset_postdata();

    return ob_get_clean();
}



function view_block_subscribe($attributes)
{
    $bgImage = (isset($attributes["bgImage"])) ? 'style="background-image: url(' . $attributes["bgImage"] . ')"'  : "";


    ob_start();
    ?>
    <div <?php echo get_block_wrapper_attributes(array('class' => 'alignfull')) ?> <?php echo $bgImage  ?>>
        <div class="subscribe-inner  wrapper">
            <h2 class="subscribe-title"><?php echo $attributes['title'] ?></h2>
            <p class="subscribe-description"> <?php echo $attributes['description'] ?></p>
            <div class="subscribe-shortcode"> <?php echo do_shortcode($attributes['shortcode']) ?> </div>
        </div>
    </div>
<?php

    return ob_get_clean();
}
