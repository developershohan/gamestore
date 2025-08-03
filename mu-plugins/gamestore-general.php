<?php
/**
 * Plugin Name: Gamestore General
 * Description: Core Code for Gamestore
 * Version: 1.0
 * Author: Genius.Courses
 * Author URI: https://genius.courses
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

 function gamestore_remove_dashboard_widgets(){
    global $wp_meta_boxes;

    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_activity']);
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']);
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links']);
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now']);
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins']);
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_drafts']);
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments']);
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']);
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary']);
    unset($wp_meta_boxes['dashboard']['normal']['high']['rank_math_dashboard_widget']);
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_site_health']);
 }
 add_action('wp_dashboard_setup', 'gamestore_remove_dashboard_widgets');

 // Allow SVG uploads
function gamestore_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'gamestore_mime_types');

// Fix SVG display in media library
function gamestore_fix_svg() {
  echo '<style>
      .attachment-266x266, .thumbnail img {
          width: 100% !important;
          height: auto !important;
      }
  </style>';
}
add_action('admin_head', 'gamestore_fix_svg');



// Registering Custom Post Type Themes
add_action( 'init', 'register_news_post', 20 );
function register_news_post() {
    $labels = array(
        'name' => _x( 'Themes', 'my_custom_post','custom' ),
        'singular_name' => _x( 'Theme', 'my_custom_post', 'custom' ),
        'add_new' => _x( 'Add New', 'my_custom_post', 'custom' ),
        'add_new_item' => _x( 'Add New ThemePost', 'my_custom_post', 'custom' ),
        'edit_item' => _x( 'Edit ThemePost', 'my_custom_post', 'custom' ),
        'new_item' => _x( 'New ThemePost', 'my_custom_post', 'custom' ),
        'view_item' => _x( 'View ThemePost', 'my_custom_post', 'custom' ),
        'search_items' => _x( 'Search ThemePosts', 'my_custom_post', 'custom' ),
        'not_found' => _x( 'No ThemePosts found', 'my_custom_post', 'custom' ),
        'not_found_in_trash' => _x( 'No ThemePosts found in Trash', 'my_custom_post', 'custom' ),
        'parent_item_colon' => _x( 'Parent ThemePost:', 'my_custom_post', 'custom' ),
        'menu_name' => _x( 'Themes Posts', 'my_custom_post', 'custom' ),
    );

    $args = array(
        'labels' => $labels,
        'hierarchical' => true,
        'description' => 'Custom Theme Posts',
        'supports' => array( 'title', 'editor', 'excerpt', 'author', 'thumbnail', 'comments', 'revisions', 'post-formats', 'custom-fields' ),
        'taxonomies' => array( 'post_tag','themes_categories'),
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'show_in_nav_menus' => true,
        'publicly_queryable' => true,
        'exclude_from_search' => false,
        'query_var' => true,
        'can_export' => true,
        'public' => true,
        'has_archive' => 'themes',
        'capability_type' => 'post',

    );
    register_post_type( 'themes', $args ); 

    
}

/*
* Plugin Name: Course Taxonomy
* Description: A short example showing how to add a taxonomy called Course.
* Version: 1.0
* Author: developer.wordpress.org
* Author URI: https://codex.wordpress.org/User:Aternus
*/

function wporg_register_taxonomy_course() {
	 $labels = array(
		 'name'              => _x( 'Courses', 'taxonomy general name' ),
		 'singular_name'     => _x( 'Course', 'taxonomy singular name' ),
		 'search_items'      => __( 'Search Courses' ),
		 'all_items'         => __( 'All Courses' ),
		 'parent_item'       => __( 'Parent Course' ),
		 'parent_item_colon' => __( 'Parent Course:' ),
		 'edit_item'         => __( 'Edit Course' ),
		 'update_item'       => __( 'Update Course' ),
		 'add_new_item'      => __( 'Add New Course' ),
		 'new_item_name'     => __( 'New Course Name' ),
		 'menu_name'         => __( 'Course' ),
	 );
	 $args   = array(
		 'hierarchical'      => true, // make it hierarchical (like categories)
		 'labels'            => $labels,
		 'show_ui'           => true,
		 'show_admin_column' => true,
		 'query_var'         => true,
		 'rewrite'           => [ 'slug' => 'course' ],
	 );
	 register_taxonomy( 'course', [ 'themes' ], $args );
}
add_action( 'init', 'wporg_register_taxonomy_course' );