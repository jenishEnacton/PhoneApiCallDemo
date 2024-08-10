import * as yup from 'yup';

export const phonenumberschema = yup.object().shape({
  phoneNumber: yup
    .string()
    .transform(value => {
      // Remove non-numeric characters except +
      let cleanedValue = value.replace(/\D/g, '');

      // If value is already prefixed with 91, ensure it's cleaned properly
      if (cleanedValue.startsWith('91')) {
        cleanedValue = cleanedValue; // Already correct format
      } else {
        // Add 91 prefix if not present
        cleanedValue = `91${cleanedValue}`;
      }

      return cleanedValue;
    })
    .matches(/^(91)[6-9][0-9]{9}$/, 'Enter a valid phone number')
    .required('Phone number is required'),
});

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});
