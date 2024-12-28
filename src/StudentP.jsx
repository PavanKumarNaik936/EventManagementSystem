import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./index.css";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
export function StudentP() {
    const [isSignIn, setIsSignIn] = useState(true);
    const [formData, setFormData] = useState({
        
        email: '',
        password: '',
        confirmpassword:''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'
  
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const updatePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/student/requestupdatepassword', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
               // alert('Verification Email Sent for Updating Password');
               setSnackbarMessage('Verification Email Sent for Updating Password');
               setSnackbarSeverity('success');
               setSnackbarOpen(true);
               setTimeout(() => {
                navigate('/login');
            }, 2000);
               // navigate('/login');
            } else {
                setSnackbarMessage('Email Was not Found');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
                setTimeout(() => {
                 navigate('/login');
             }, 2000);
               // alert('Email Was not Found');
               // navigate('/login');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div id="container" className={`container ${isSignIn ? 'sign-in' : 'sign-up'}`}>
            <div className="head">
                <div className="logo"><img src="rgukt.jpg" alt="no-img" className='logo' /></div>
                <div>
                    <h2>Rajiv Gandhi University Of Knowledge Technologies-Andhra Pradesh
                    <span className="name" > Rkvalley campus kadapa Dist,516330</span> 
                    </h2>
                   
                </div>
            </div>
            <div className="row">
                {/* SIGN UP */}
                <div className="col align-items-center flex-col sign-up">
                    <div className="form-wrapper align-items-center">
                        <div className="form sign-up">
                            <form>
                                <div className="input-group" id="names">
                                   
                                </div>
                                <div className="input-group">
                                  
                                </div>
                                <div className="input-group">
                                   
                                </div>
                                <div className="input-group" id="names">
                                    
                                </div>
                                <div id="spass"></div>
                                
                            </form>
                            <p>
                                
                            </p>
                        </div>
                    </div>
                </div>
                {/* SIGN IN */}
                <div className="col align-items-center flex-col sign-in">
                    <div className="form-wrapper align-items-center">
                        <div className="form sign-in">
                            <form onSubmit={updatePassword}>
                                <div className="input-group">
                                    <input type="email" name="email" placeholder="Email" required onChange={handleInputChange} />
                                </div>
                            
                                <button type="submit">Update password</button> 
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row content-row">
                {/* SIGN IN CONTENT */}
                <div className="col align-items-center flex-col">
                    <div className="text sign-in">
                        <h2 style={{marginLeft:'-100px', marginTop:'-50px'}}>Resetting password</h2>
                    </div>
                    <div className="img sign-in"></div>
                </div>
                {/* SIGN UP CONTENT */}
                <div className="col align-items-center flex-col">
                    <div className="img sign-up"></div>
                    <div className="text sign-up">
                        <h2>Join with us</h2>
                    </div>
                </div>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Positioning Snackbar
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}