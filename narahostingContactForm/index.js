import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import './style.scss';
import './editor.scss';

registerBlockType( 'narahosting/smtp-mail', {
	title: 'WP SMTP Mail Settings',
	icon: 'email',
	category: 'widgets',
	edit: Edit,
	save: () => null, // This uses render.php to save the block, not client-side render
} );
