// frontend/src/utils/validators.js

export const validateJobForm = (values) => {
  const errors = {};

  if (!values.title?.trim())
    errors.title = 'Job title is required.';
  else if (values.title.trim().length < 3)
    errors.title = 'Title must be at least 3 characters.';
  else if (values.title.trim().length > 120)
    errors.title = 'Title must not exceed 120 characters.';

  if (!values.company?.trim())
    errors.company = 'Company name is required.';
  else if (values.company.trim().length < 2)
    errors.company = 'Company name must be at least 2 characters.';

  if (!values.location?.trim())
    errors.location = 'Location is required.';

  if (!values.type)
    errors.type = 'Job type is required.';
  else if (!['Remote', 'On-site', 'Hybrid'].includes(values.type))
    errors.type = 'Please select a valid job type.';

  if (!values.description?.trim())
    errors.description = 'Job description is required.';
  else if (values.description.trim().length < 20)
    errors.description = 'Description must be at least 20 characters.';
  else if (values.description.trim().length > 5000)
    errors.description = 'Description must not exceed 5000 characters.';

  if (values.apply_url?.trim()) {
    try {
      const url = new URL(values.apply_url.trim());
      if (!['http:', 'https:'].includes(url.protocol))
        errors.apply_url = 'URL must start with http:// or https://';
    } catch {
      errors.apply_url = 'Please enter a valid URL.';
    }
  }

  return errors;
};

export const isFormValid = (errors) => Object.keys(errors).length === 0;
