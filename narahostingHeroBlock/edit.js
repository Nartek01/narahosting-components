import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, Button, TextControl } from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { backgroundImage, title, subtitle, buttonText, buttonUrl } =
		attributes;

	const blockProps = useBlockProps( {
		className: 'narahosting-hero-block',
		style: {
			// Inline style for background if an image is selected
			backgroundImage: backgroundImage
				? `url(${ backgroundImage })`
				: 'none',
		},
	} );

	// Handlers
	const onUpdateBackgroundImage = ( media ) => {
		setAttributes( { backgroundImage: media.url } );
	};

	const removeBackgroundImage = () => {
		setAttributes( { backgroundImage: '' } );
	};

	return (
		<>
			{ /* SIDEBAR CONTROLS */ }
			<InspectorControls>
				<PanelBody
					title={ __( 'Hero Settings', 'narahosting-hero-block' ) }
					initialOpen={ true }
				>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onUpdateBackgroundImage }
							allowedTypes={ [ 'image' ] }
							render={ ( { open } ) => (
								<Button variant="primary" onClick={ open }>
									{ backgroundImage
										? __(
												'Change Background Image',
												'narahosting-hero-block'
										  )
										: __(
												'Select Background Image',
												'narahosting-hero-block'
										  ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					{ backgroundImage && (
						<Button
							variant="secondary"
							onClick={ removeBackgroundImage }
							style={ { marginTop: '10px' } }
						>
							{ __(
								'Remove Background Image',
								'narahosting-hero-block'
							) }
						</Button>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Button Settings', 'narahosting-hero-block' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Button Text', 'narahosting-hero-block' ) }
						value={ buttonText }
						onChange={ ( val ) =>
							setAttributes( { buttonText: val } )
						}
					/>
					<TextControl
						label={ __( 'Button URL', 'narahosting-hero-block' ) }
						value={ buttonUrl }
						onChange={ ( val ) =>
							setAttributes( { buttonUrl: val } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			{ /* EDITOR PREVIEW */ }
			<div { ...blockProps }>
				<div className="narahosting-hero-content">
					<RichText
						tagName="h2"
						placeholder={ __( 'Block Title…', 'narahosting-hero-block' ) }
						value={ title }
						onChange={ ( val ) => setAttributes( { title: val } ) }
						className="narahosting-hero-title"
					/>
					<RichText
						tagName="p"
						placeholder={ __(
							'Block Subtitle…',
							'narahosting-hero-block'
						) }
						value={ subtitle }
						onChange={ ( val ) =>
							setAttributes( { subtitle: val } )
						}
						className="narahosting-hero-subtitle"
					/>
					<span className="narahosting-hero-button" href={ buttonUrl }>
						{ buttonText }
					</span>
				</div>
			</div>
		</>
	);
}
