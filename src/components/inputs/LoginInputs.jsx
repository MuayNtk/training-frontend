import React from 'react';
import TextField from '@mui/material/TextField';

const LoginInputs = ({ field, meta, ...props }) => {
  // Determine error message based on form validation state
  const errorText = meta && meta.error && meta.touched ? meta.error : '';

  return (
    <TextField
      {...props}         // Spread other props like label, variant, etc.
      {...field}         // Spread form library field props (e.g., value, onChange)
      helperText={errorText}  // Display error message if there's an error
      error={!!errorText}     // Set error state based on whether errorText is not empty
      sx={{               // Styling using Material-UI's sx prop (Box component styling)
        width: {          // Responsive width based on breakpoints
          xs: '89%',      // Extra small screens
          sm: '100%',     // Small screens
          lg: '100%',     // Large screens
        },
        '& .MuiInputBase-input': {  // Styling the input text specifically
          fontSize: 14,   // Example: setting font size to 14px
        },
        ...props.sx,      // Allow overriding styles via props
      }}
    />
  );
};

export default LoginInputs;
