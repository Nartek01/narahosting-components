<?php
/**
 * Plugin Name:       Narahosting Cta
 * Description:       A call-to-action block for Narahosting.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Nara Tekchuen
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       narahosting-cta
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_narahosting_cta_block_init() {
	register_block_type( __DIR__ . '/build/narahosting-cta' );
}
add_action( 'init', 'create_block_narahosting_cta_block_init' );
