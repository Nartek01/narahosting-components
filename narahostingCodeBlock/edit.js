/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';

import { PanelBody, TextControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   root0
 * @param {Object}   root0.attributes
 * @param {Function} root0.setAttributes
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { code } = attributes;
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			{ /* Sidebar Controls */ }
			<InspectorControls>
				<PanelBody
					title={ __(
						'Code Block Settings',
						'narahosting-code-block'
					) }
					initialOpen={ true }
				>
					{ /* Code Field */ }
					<TextControl
						label={ __( 'Code', 'narahosting-code-block' ) }
						value={ code }
						onChange={ ( value ) =>
							setAttributes( { code: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			{ /* Block Layout in Editor */ }
			<div className="narahosting-code-block">
				<div className="narahosting-code-block-content">
					{ /* Editable Paragraph */ }
					<RichText
						tagName="pre"
						value={ code }
						onChange={ ( value ) =>
							setAttributes( { code: value } )
						}
						placeholder={ __( 'Code', 'narahosting-code-block' ) }
					></RichText>
				</div>
			</div>
		</div>
	);
}
