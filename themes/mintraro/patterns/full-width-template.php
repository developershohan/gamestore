<?php
/**
 * Title: full-width-template
 * Slug: mintraro/full-width-template
 * Inserter: no
 */
?>
<!-- wp:group {"className":"bg-light-custom-primary","style":{"background":{"backgroundImage":{"url":"<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/lines.png","id":1993,"source":"file","title":"lines"},"backgroundSize":"cover"}},"layout":{"type":"default"}} -->
<div class="wp-block-group bg-light-custom-primary"><!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","layout":{"type":"default"}} -->
<main class="wp-block-group"><!-- wp:post-content /-->

<!-- wp:spacer {"height":"var:preset|spacing|70"} -->
<div style="height:var(--wp--preset--spacing--70)" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer --></main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /--></div>
<!-- /wp:group -->