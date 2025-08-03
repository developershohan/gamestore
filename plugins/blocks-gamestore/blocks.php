<?php
function view_block_games_line()
{

    $args = array(
        "post_type" => "product",
        "posts_per_page" => "12",
        "orderby" => "date",
        "order" => "DESC",
    );

    $game_query = new WP_Query($args);

    ob_start();

    if ($game_query->have_posts()) :
?>
        <div class="gamestore-last-products">
            <?php
            while ($game_query->have_posts()) :

                $game_query->the_post();
                $product = wc_get_product(get_the_ID());

            ?>
                <div class="product">
                    <?php echo $product->get_image(); ?>
                </div>
        </div>
<?php
            endwhile;
        endif;
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
