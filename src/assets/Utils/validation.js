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

export const ForgotPassvalidation = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
});

export const ChangePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character',
    )
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

export const formatString = str => {
  const extractedPart = str.split('/')[1];

  const withSpaces = extractedPart.replace(/-/g, ' ');

  const capitalized = withSpaces.replace(/\b\w/g, char => char.toUpperCase());

  return capitalized;
};

export const get_constructed_cashback = (amount_type, current_cb) => {
  let amount = '';
  if (!current_cb) {
    return '';
  }
  if (amount_type === 'percent') {
    amount = current_cb + '%';
  } else {
    amount = current_cb + '%';
  }
  return amount;
};
