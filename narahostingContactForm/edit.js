import React from 'react';

/**
 * Get the translation text
 */
import { __ } from '@wordpress/i18n';

/**
 * React wrapper element
 */
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	useSelect,
	useDispatch,
} from '@wordpress/block-editor';

import {
	PanelBody,
	TextControl,
	Button,
	SelectControl,
	Notice,
	ToggleControl
} from '@wordpress/components';
import { useState, useEffect } from 'react';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Webpack handles CSS and SCSS
 */
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const {
		heading,
		subHeading,
		description,
		contactFormId,
		contactFormTitle,
		imageUrl,
	} = attributes;

	const blockProps = useBlockProps();

	// Alternative: Use wp.apiFetch directly
	const [contactForms, setContactForms] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		async function fetchForms() {
			try {
				setIsLoading(true);
				const response = await wp.apiFetch({
					path: '/wp/v2/wpcf7_contact_form?per_page=-1&status=publish'
				});
				setContactForms(response);
			} catch (error) {
				console.error('Failed to fetch Contact Form 7 forms:', error);
				setContactForms([]);
			} finally {
				setIsLoading(false);
			}
		}

		fetchForms();
	}, []);

	// Create options for the select control with proper fallbacks
	const formOptions = React.useMemo(() => {
		if (!contactForms) {
			return [
				{ label: __('Loading forms...', 'narahosting-contact-form'), value: '' }
			];
		}

		if (contactForms.length === 0) {
			return [
				{ label: __('No Contact Form 7 forms found', 'narahosting-contact-form'), value: '' }
			];
		}

		return [
			{ label: __('Select a contact form', 'narahosting-contact-form'), value: '' },
			...contactForms.map((form) => ({
				label: form.title?.rendered || form.title || `Form ${form.id}`,
				value: form.id.toString(),
			})),
		];
	}, [contactForms]);

	// Get the selected form object with error handling
	const selectedForm = React.useMemo(() => {
		if (!contactFormId || !contactForms) {
			return null;
		}

		return contactForms.find(form => form.id.toString() === contactFormId) || null;
	}, [contactFormId, contactForms]);

	// This would require server-side PHP to expose the forms
	const contactFormsFromSelect = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'custom-cf7-forms', ...);
	}, []);

	return (
		<div {...blockProps}>
			{ /** Sidebar Controls */}
			<InspectorControls>
				<PanelBody
					title={__('Contact Form Settings', 'narahosting-contact-form')}
					initialOpen={true}
				>
					{ /** Contact Form Selection */}
					<SelectControl
						label={__('Contact Form 7 Forms', 'narahosting-contact-form')}
						value={contactFormId}
						options={formOptions}
						onChange={(value) => {
							setAttributes({ contactFormId: value });
							// Find the form title for the selected form
							const form = contactForms ? contactForms.find(form => form.id.toString() === value) : null;
							setAttributes({ contactFormTitle: form ? form.title.rendered : '' });
						}}
						help={__('Select a Contact Form 7 form to use for API integration', 'narahosting-contact-form')}
					/>

					{ /** Heading */}
					<TextControl
						label={__('Heading', 'narahosting-contact-form')}
						value={heading}
						onChange={(value) =>
							setAttributes({ heading: value })
						}
					/>
				</PanelBody>
			</InspectorControls>

			{/* Block Content */}
			<div className="narahosting-contact-form-block">
				<h2>{heading || __('Contact Form', 'narahosting-contact-form')}</h2>
				{/* Add your form preview here */}
			</div>
		</div>
	);
}
