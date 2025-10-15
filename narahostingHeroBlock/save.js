import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { backgroundImage, title, subtitle, buttonText, buttonUrl } =
		attributes;

	const blockProps = useBlockProps.save( {
		className: 'narahosting-hero-block',
		style: {
			backgroundImage: backgroundImage
				? `url(${ backgroundImage })`
				: 'none',
		},
	} );

	return (
		<div { ...blockProps }>
			<div className="narahosting-hero-content">
				<RichText.Content
					tagName="h2"
					className="narahosting-hero-title"
					value={ title }
				/>
				<RichText.Content
					tagName="p"
					className="narahosting-hero-subtitle"
					value={ subtitle }
				/>
				<a className="narahosting-hero-button" href={ buttonUrl }>
					{ buttonText }
				</a>
			</div>
		</div>
	);
}
