import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { TextControl, PanelBody } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { emailTo, smtpServer } = attributes;

	const handleEmailChange = ( value ) => {
		setAttributes( { emailTo: value } );
	};

	const handleServerChange = ( value ) => {
		setAttributes( { smtpServer: value } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="SMTP Settings">
					<TextControl
						label="Recipient Email"
						value={ emailTo }
						onChange={ handleEmailChange }
					/>
					<TextControl
						label="SMTP Server"
						value={ smtpServer }
						onChange={ handleServerChange }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<h3>WP SMTP Mail Settings</h3>
				<p>Email to: { emailTo }</p>
				<p>SMTP Server: { smtpServer }</p>
			</div>
		</>
	);
}
