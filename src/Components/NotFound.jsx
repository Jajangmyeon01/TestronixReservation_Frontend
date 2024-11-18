import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      bgcolor="#f3f4f6"
      p={3}
    >
      <Typography variant="h1" color="error" fontWeight="bold" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body2" color="textSecondary" maxWidth="400px" mb={3}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/login"
      >
        Go to Homepage
      </Button>
    </Box>
  );
};

export default NotFound;
