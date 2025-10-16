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
export default function Edit({ attributes, setAttributes }) {
  const { language } = attributes;
  const blockProps = useBlockProps();

  return (
    <div {...blockProps}>
      {/* Sidebar Controls */}
      <InspectorControls>
        <PanelBody
          title={__('Code Block Settings', 'narahosting-code-block')}
          initialOpen={true}
        >
          {/* Code Field */}
          <TextControl
            label={__('Code', 'narahosting-code-block')}
            value={language}
            onChange={(value) => setAttributes({ language: value })}
			help={__('e.g., JavaScript, PHP, CSS', 'narahosting-code-block')}
          />
        </PanelBody>
      </InspectorControls>

      {/* Block Layout in Editor */}
      <div className='narahosting-code-block'>
        <pre className='narahosting-code-block-content'>
          {/* Editable Paragraph */}
          <RichText
            tagName='code'
            value={code}
            onChange={(value) => setAttributes({ code: value })}
            placeholder={__('Code', 'narahosting-code-block')}
          />
        </pre>
      </div>
    </div>
  );
}
