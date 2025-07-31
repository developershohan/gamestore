<?php

/**
 * mintraro: Block Patterns
 *
 * @since mintraro 1.0.0
 */

/**
 * Registers pattern categories for mintraro
 *
 * @since mintraro 1.0.0
 *
 * @return void
 */
function mintraro_register_pattern_category()
{
	$block_pattern_categories = array(
		'mintraro' => array('label' => __('Mintraro', 'mintraro')),
	);

	$block_pattern_categories = apply_filters('mintraro_block_pattern_categories', $block_pattern_categories);

	foreach ($block_pattern_categories as $name => $properties) {
		if (!WP_Block_Pattern_Categories_Registry::get_instance()->is_registered($name)) {
			register_block_pattern_category($name, $properties);
		}
	}
}
add_action('init', 'mintraro_register_pattern_category', 9);
