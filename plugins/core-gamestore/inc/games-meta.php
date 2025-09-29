<?php



// Add custom tab to WooCommerce product data
function add_gamestore_tab($default_tabs)
{

    $tabs = array(
        'wk_custom_tab' => array(
            'label'       => esc_html__('Game Store', 'wk-webkul'),
            'target'      => 'wk_custom_tab',
            'priority'    => 60,
            'class'       => array(),
        ),
    );

    $default_tabs = array_merge($default_tabs, $tabs);

    return $default_tabs;
}
add_filter('woocommerce_product_data_tabs', 'add_gamestore_tab', 10, 1);

// Add custom fields (text box, multi checkbox, radio button, conditional fields)
function wk_product_tab_field()
{
    global $post;

    // Get saved values for the fields
    $custom_checkbox_value = get_post_meta($post->ID, '_saucal_custom_checkbox_id', true);
    $text_box_value = get_post_meta($post->ID, '_custom_text_box', true);
    $multi_checkbox_value = get_post_meta($post->ID, '_custom_multi_checkbox', true); // Get saved multi-checkbox value
    $radio_button_value = get_post_meta($post->ID, '_custom_radio_button', true);

?>
    <div id="wk_custom_tab" class="panel woocommerce_options_panel">
        <!-- Checkbox Field -->
        <p class="form-field">
            <?php
            woocommerce_wp_checkbox(
                array(
                    'id'          => '_saucal_custom_checkbox_id',
                    'label'       => esc_html__('Your new custom checkbox field', 'saucal-custom-code'),
                    'description' => esc_html__('Check this box if the product has special features.', 'saucal-custom-code'),
                    'desc_tip'    => true,
                    'value'       => $custom_checkbox_value === 'yes' ? 'yes' : '',
                )
            );
            ?>
        </p>

        <!-- Text Box Field -->
        <p class="form-field">
            <label for="_custom_text_box"><?php esc_html_e('Custom Text Box', 'saucal-custom-code'); ?></label>
            <input type="text" name="_custom_text_box" id="_custom_text_box" value="<?php echo esc_attr($text_box_value); ?>" />
        </p>

        <p class="form-field">
            <label for="_custom_multi_checkbox"><?php esc_html_e('Select Features', 'saucal-custom-code'); ?></label>
            <select name="_custom_multi_checkbox[]" id="_custom_multi_checkbox" multiple="multiple" class="wc-enhanced-select">
                <?php
                $platforms = ['Xbox', 'PC', 'PlayStation'];

                foreach ($platforms as $platform) {
                    $platform_value = '_platform_' . strtolower($platform);

                    $selected = (is_array($multi_checkbox_value) && in_array($platform_value, (array)$multi_checkbox_value)) ? 'selected' : '';
                ?>
                    <option value="<?php echo esc_attr($platform_value); ?>" <?php echo $selected; ?>><?php esc_html_e($platform, 'saucal-custom-code'); ?></option>
                <?php
                }
                ?>
            </select>
        </p>

        <!-- Radio Button Field -->
        <p class="form-field">
            <label for="_custom_radio_button"><?php esc_html_e('Would you like to enable hidden fields?', 'saucal-custom-code'); ?></label>
            <input type="radio" name="_custom_radio_button" value="yes" <?php checked($radio_button_value, 'yes'); ?> /> Yes
            <input type="radio" name="_custom_radio_button" value="no" <?php checked($radio_button_value, 'no'); ?> /> No
        </p>

        <!-- Conditional Fields (Only visible if Radio Button is 'Yes') -->
        <div id="conditional_fields" style="display: <?php echo ($radio_button_value === 'yes') ? 'block' : 'none'; ?>;">
            <p class="form-field">
                <label for="_conditional_textbox"><?php esc_html_e('Conditional Text Box', 'saucal-custom-code'); ?></label>
                <input type="text" name="_conditional_textbox" id="_conditional_textbox" value="<?php echo esc_attr(get_post_meta($post->ID, '_conditional_textbox', true)); ?>" />
            </p>

            <p class="form-field">
                <label for="_conditional_checkbox"><?php esc_html_e('Conditional Checkbox', 'saucal-custom-code'); ?></label>
                <input type="checkbox" name="_conditional_checkbox" id="_conditional_checkbox" value="yes" <?php checked(get_post_meta($post->ID, '_conditional_checkbox', true), 'yes'); ?> />
            </p>
        </div>
    </div>

    <script type="text/javascript">
        jQuery(document).ready(function($) {
            // Show/hide conditional fields based on radio button selection
            $('input[name="_custom_radio_button"]').change(function() {
                if ($(this).val() === 'yes') {
                    $('#conditional_fields').show();
                } else {
                    $('#conditional_fields').hide();
                }
            }).change(); 
        });
    </script>
<?php
}
add_action('woocommerce_product_data_panels', 'wk_product_tab_field');

// Save all custom fields
function wk_save_custom_tab_data($post_id, $post, $update)
{
    // Checkbox Field
    if (isset($_POST['_saucal_custom_checkbox_id'])) {
        $custom_checkbox_value = $_POST['_saucal_custom_checkbox_id'] === 'yes' ? 'yes' : 'no';
        update_post_meta($post_id, '_saucal_custom_checkbox_id', $custom_checkbox_value);
    }

    // Text Box Field
    if (isset($_POST['_custom_text_box'])) {
        update_post_meta($post_id, '_custom_text_box', sanitize_text_field($_POST['_custom_text_box']));
    }

    // Multi Checkbox Field
    if (isset($_POST['_custom_multi_checkbox'])) {
        // Save multi-checkbox values as an array
        update_post_meta($post_id, '_custom_multi_checkbox', array_map('sanitize_text_field', $_POST['_custom_multi_checkbox']));
    }

    // Radio Button Field
    if (isset($_POST['_custom_radio_button'])) {
        update_post_meta($post_id, '_custom_radio_button', sanitize_text_field($_POST['_custom_radio_button']));
    }

    // Conditional Fields
    if (isset($_POST['_conditional_textbox'])) {
        if ($_POST['_custom_radio_button'] === 'no') {
            // If "No" is selected, remove the conditional data
            delete_post_meta($post_id, '_conditional_textbox');
            delete_post_meta($post_id, '_conditional_checkbox');
        } else {
            update_post_meta($post_id, '_conditional_textbox', sanitize_text_field($_POST['_conditional_textbox']));
            update_post_meta($post_id, '_conditional_checkbox', $_POST['_conditional_checkbox'] === 'yes' ? 'yes' : 'no');
        }
    }
}
add_action('save_post', 'wk_save_custom_tab_data', 10, 3);
