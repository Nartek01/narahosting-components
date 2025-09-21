/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} root0
 * @param {Object} root0.attributes
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save( { attributes } ) {
	const {
		heading,
		subHeading,
		description,
		buttonText,
		buttonUrl,
		imageUrl,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'narahosting-cta-block container',
	} );

	return (
		<div { ...blockProps }>
			<div className="narahosting-cta-content">
				<div className="narahosting-cta-subheading">
					<RichText.Content tagName="p" value={ subHeading } />
				</div>
				<RichText.Content tagName="h2" value={ heading } />
				<RichText.Content tagName="p" value={ description } />
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
	);
}
