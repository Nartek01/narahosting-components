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
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';

import { PanelBody, TextControl, Button } from '@wordpress/components';

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
 * @param  root0
 * @param  root0.attributes
 * @param  root0.setAttributes
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		heading,
		subHeading,
		description,
		buttonText,
		buttonUrl,
		imageUrl,
	} = attributes;
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			{ /* Sidebar Controls */ }
			<InspectorControls>
				<PanelBody
					title={ __( 'CTA Settings', 'narahosting-cta' ) }
					initialOpen={ true }
				>
					{ /* Sub Heading Field */ }
					<TextControl
						label={ __( 'Sub Heading', 'narahosting-cta' ) }
						value={ subHeading }
						onChange={ ( value ) =>
							setAttributes( { subHeading: value } )
						}
					/>
					{ /* Heading Field */ }
					<TextControl
						label={ __( 'Heading', 'narahosting-cta' ) }
						value={ heading }
						onChange={ ( value ) =>
							setAttributes( { heading: value } )
						}
					/>

					{ /* Description Field */ }
					<TextControl
						label={ __( 'Description', 'narahosting-cta' ) }
						value={ description }
						onChange={ ( value ) =>
							setAttributes( { description: value } )
						}
					/>

					{ /* Button Text Field */ }
					<TextControl
						label={ __( 'Button Text', 'narahosting-cta' ) }
						value={ buttonText }
						onChange={ ( value ) =>
							setAttributes( { buttonText: value } )
						}
					/>

					{ /* Button Url Field */ }
					<TextControl
						label={ __( 'Button URL', 'narahosting-cta' ) }
						value={ buttonUrl }
						onChange={ ( value ) =>
							setAttributes( { buttonUrl: value } )
						}
					/>

					{ /* Image Upload */ }
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( { imageUrl: media.url } )
							}
							allowedTypes={ [ 'image' ] }
							render={ ( { open } ) => (
								<Button onClick={ open } variant="secondary">
									{ imageUrl
										? __(
												'Change Image',
												'narahosting-cta'
										  )
										: __(
												'Select Image',
												'narahosting-cta'
										  ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>

			{ /* Block Layout in Editor */ }
			<div className="narahosting-cta-block container">
				<div className="narahosting-cta-content">
					<div className="narahosting-cta-subheading">
						{ /* Editable Sub Heading */ }
						<RichText
							tagName="p"
							value={ subHeading }
							onChange={ ( value ) =>
								setAttributes( { subHeading: value } )
							}
							placeholder={ __( 'Heading…', 'narahosting-cta' ) }
						></RichText>
					</div>

					{ /* Editable Heading */ }
					<RichText
						tagName="h2"
						value={ heading }
						onChange={ ( value ) =>
							setAttributes( { heading: value } )
						}
						placeholder={ __( 'Heading…', 'narahosting-cta' ) }
					></RichText>

					{ /* Editable Paragraph */ }
					<RichText
						tagName="p"
						value={ description }
						onChange={ ( value ) =>
							setAttributes( { description: value } )
						}
						placeholder={ __( 'Description', 'narahosting-cta' ) }
					></RichText>

					{ /* Button */ }
					<a
						className="narahosting-cta-button"
						href={ buttonUrl }
						target="_blank"
						rel="noopener noreferrer"
					>
						{ buttonText }
					</a>
				</div>

				<div
					className="narahosting-cta-image"
					style={ { backgroundImage: `url(${ imageUrl })` } }
				/>
			</div>
		</div>
	);
}
