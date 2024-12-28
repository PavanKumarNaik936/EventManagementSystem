import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyEmail = () => {
  const [verificationToken, setVerificationToken] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from URL when the component is mounted
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    if (token) {
      setVerificationToken(token);
    } else {
      setMessage('Invalid or missing token.');
    }
  }, [location.search]);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!verificationToken) {
      setMessage('Verification token is missing.');
      return;
    }

    try {
      // Send the token to the backend for verification
      const response = await fetch('http://localhost:8080/student/verify', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: verificationToken }),
      });

      if (response.ok) {
        const data = await response.text();
        setMessage(data.message); // Backend should return a message
        // Navigate to a success page or home page
        navigate('/login');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Verification failed.');
      }
    } catch (error) {
      setMessage('An error occurred during verification.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Email Verification</h1>
        <p style={styles.description}>Click the button below to verify your email.</p>

        {/* Show token information for debugging */}
        {/* {verificationToken && <p style={styles.token}>Token: {verificationToken}</p>} */}

        <form onSubmit={handleVerify}>
          <button style={styles.button} type="submit">Verify Email</button>
        </form>

        {/* Display the message to the user */}
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f9',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '350px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  description: {
    fontSize: '16px',
    marginBottom: '30px',
    color: '#666',
  },
  token: {
    fontSize: '14px',
    color: '#999',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  message: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#f00',
  },
};

export default VerifyEmail;
