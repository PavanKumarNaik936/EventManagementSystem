import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Get token from URL and make sure it's a string
  const [searchParams] = useSearchParams();
  const token = String(searchParams.get('token'));

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Basic password match validation
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      // Send the token and new password to the backend
      const response = await axios.put(`http://localhost:8080/student/verifyresetpassword`, {
        token: token, // Token passed as a string
        newPassword: newPassword
      });

      if (response.status === 200) {
        setSuccessMessage("Password reset successful. You can now log in.");
        // Redirect to login page after success
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error);
        setErrorMessage("Invalid or expired token.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}
    >
      <Typography variant="h4" gutterBottom>
        Reset Password
      </Typography>
      
      {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}
      {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
      
      <TextField
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        fullWidth
        margin="normal"
        sx={{ maxWidth: 400 }}
      />
      
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        fullWidth
        margin="normal"
        sx={{ maxWidth: 400 }}
      />
      
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ maxWidth: 400, mt: 2 }}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Reset Password'}
      </Button>
    </Box>
  );
};

export default ResetPassword;
