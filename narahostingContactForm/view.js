/**
 * Front-end React form component that integrates with Contact Form 7 API
 */

(function () {
    'use strict';

    // React form component
    function NarahostingContactForm({ formId, formFields }) {
        const [formData, setFormData] = React.useState({});
        const [isSubmitting, setIsSubmitting] = React.useState(false);
        const [submitStatus, setSubmitStatus] = React.useState(null);
        const [errors, setErrors] = React.useState({});

        // Initialize form data
        React.useEffect(() => {
            const initialData = {};
            Object.keys(formFields).forEach(key => {
                initialData[key] = '';
            });
            setFormData(initialData);
        }, [formFields]);

        // Handle input changes
        const handleInputChange = (field, value) => {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));

            // Clear error when user starts typing
            if (errors[field]) {
                setErrors(prev => ({
                    ...prev,
                    [field]: ''
                }));
            }
        };

        // Validate form
        const validateForm = () => {
            const newErrors = {};

            Object.entries(formFields).forEach(([key, field]) => {
                if (field.required && (!formData[key] || formData[key].trim() === '')) {
                    newErrors[key] = `${field.label} is required`;
                }

                if (field.type === 'email' && formData[key] && !isValidEmail(formData[key])) {
                    newErrors[key] = 'Please enter a valid email address';
                }
            });

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        // Email validation helper
        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        // Handle form submission
        const handleSubmit = async (e) => {
            e.preventDefault();

            if (!validateForm()) {
                return;
            }

            setIsSubmitting(true);
            setSubmitStatus(null);

            try {
                // Prepare form data for Contact Form 7 API
                const submitData = new FormData();
                submitData.append('_wpcf7', formId);
                submitData.append('_wpcf7_version', '5.7.7'); // Update to match your CF7 version
                submitData.append('_wpcf7_locale', 'en_US');
                submitData.append('_wpcf7_unit_tag', `wpcf7-f${formId}-p${Date.now()}-o1`);
                submitData.append('_wpcf7_container_post', '0');

                // Add form fields
                Object.entries(formData).forEach(([key, value]) => {
                    submitData.append(key, value);
                });

                // Submit to Contact Form 7 endpoint
                const response = await fetch('/wp-json/contact-form-7/v1/contact-forms/' + formId + '/feedback', {
                    method: 'POST',
                    body: submitData,
                    headers: {
                        'X-WP-Nonce': window.wpApiSettings?.nonce || ''
                    }
                });

                const result = await response.json();

                if (result.status === 'mail_sent') {
                    setSubmitStatus('success');
                    setFormData({}); // Reset form
                } else {
                    setSubmitStatus('error');
                    if (result.invalid_fields) {
                        const fieldErrors = {};
                        result.invalid_fields.forEach(field => {
                            fieldErrors[field.field] = field.message;
                        });
                        setErrors(fieldErrors);
                    }
                }
            } catch (error) {
                console.error('Form submission error:', error);
                setSubmitStatus('error');
            } finally {
                setIsSubmitting(false);
            }
        };

        // Render form fields
        const renderField = (key, field) => {
            const fieldId = `narahosting-${key}`;
            const hasError = errors[key];

            return (
                <div key={key} className={`narahosting-form-field ${hasError ? 'has-error' : ''}`}>
                    <label htmlFor={fieldId}>
                        {field.label}
                        {field.required && <span className="required">*</span>}
                    </label>

                    {field.type === 'textarea' ? (
                        <textarea
                            id={fieldId}
                            name={key}
                            value={formData[key] || ''}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                            placeholder={field.label}
                            required={field.required}
                            rows={4}
                        />
                    ) : (
                        <input
                            id={fieldId}
                            type={field.type}
                            name={key}
                            value={formData[key] || ''}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                            placeholder={field.label}
                            required={field.required}
                        />
                    )}

                    {hasError && (
                        <span className="error-message">{hasError}</span>
                    )}
                </div>
            );
        };

        return (
            <form onSubmit={handleSubmit} className="narahosting-react-form">
                {/* Form fields */}
                {Object.entries(formFields).map(([key, field]) => renderField(key, field))}

                {/* Submit button */}
                <button
                    type="submit"
                    className="narahosting-submit-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {/* Status messages */}
                {submitStatus === 'success' && (
                    <div className="narahosting-success-message">
                        Thank you! Your message has been sent successfully.
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="narahosting-error-message">
                        Sorry, there was an error sending your message. Please try again.
                    </div>
                )}
            </form>
        );
    }

    // Initialize forms when DOM is ready
    function initForms() {
        const formContainers = document.querySelectorAll('.narahosting-contact-form[data-form-id]');

        formContainers.forEach(container => {
            const formId = container.getAttribute('data-form-id');
            const formFieldsData = container.getAttribute('data-form-fields');

            if (formId && formFieldsData) {
                try {
                    const formFields = JSON.parse(formFieldsData);

                    // Render React component
                    ReactDOM.render(
                        React.createElement(NarahostingContactForm, {
                            formId: formId,
                            formFields: formFields
                        }),
                        container
                    );
                } catch (error) {
                    console.error('Error parsing form fields:', error);
                }
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initForms);
    } else {
        initForms();
    }

})();