// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// // imort UserContext
// import "./index.css";
// import { UserContext } from './components/UserContext';

// export function LoginStudent() {
//     const { setRole } = useContext(UserContext); 
//     const [isSignIn, setIsSignIn] = useState(true);
//     const [formData, setFormData] = useState({
//         firstname: '',
//         lastname: '',
//         email: '',
//         password: '',
//         role:'',
//         id: '',
//         year: ''
//     });
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const toggleForm = () => {
//         setIsSignIn(!isSignIn);
//         setError('');
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSignUp = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:8080/student/create', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (response.ok) {
//                 alert('Student created successfully');
//                 navigate('/login');

//             } else {
//                 alert('Failed to create student. Email already registered.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const handleSignIn = async (e) => {
//         console.log(e);
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:8080/student/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: formData.email,
//                     password: formData.password
//                 }),
//             });

//             if (response.ok) {
//                 const data = await response.json(); // Parse as JSON
//                 const { message, role } = data; // Extract message and role from JSON response
//                 alert(message); // Show login status message
//                 if (role) {
//                     // Set role in a global state or context if needed
//                     // For example, using local storage (if applicable):
//                     localStorage.setItem('userRole', role);
//                 setRole(role); // Update the role in UserContext
//                 navigate('/home'); // Navigate to the home page or dashboard
//                 }
//             } else if (response.status === 404) {
//                 alert('Email not found. Please register first.');
//             } else if (response.status === 401) {
//                 alert('Wrong password. Please try again.');
//             }else if(response.status === 400) {
//                 alert('Go and Verify Your Email');
//             } else {
//                 setError('Failed to sign in');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <div id="container" className={`container ${isSignIn ? 'sign-in' : 'sign-up'}`}>
//             <div className="head">
//                 <div className="logo"><img src="rgukt.jpg" alt="no-img" className='logo' /></div>
//                 <div id="head-name" style={{marginLeft:"70px"}}>
//                     <h2>Rajiv Gandhi University Of Knowledge Technologies-Andhra Pradesh
//                    <span className="name"> Rkvalley campus kadapa Dist,516330</span> 
//                     </h2>
//                 </div>
//             </div>
          
//             <div className="row">
//                 {/* SIGN UP */}
//                 <div className="col align-items-center flex-col sign-up">
//                     <div className="form-wrapper align-items-center">

                        

//                         <div className="form sign-up">
//                         <div className='login-wraper'>
//                             <form onSubmit={handleSignUp}>
//                                 <div className="input-group" id="names">
//                                     <input type="text" name="firstname" placeholder="First Name" required onChange={handleInputChange} /> &nbsp; &nbsp;
//                                     <input type="text" name="lastname" placeholder="Last Name" required onChange={handleInputChange} />
//                                 </div>
//                                 <div className="input-group">
//                                     <input type="email" name="email" placeholder="Email" id="email" required onChange={handleInputChange} />
//                                 </div>
//                                 <div className="input-group">
//                                     <input type="password" name="password" placeholder="Password" required onChange={handleInputChange} />
//                                 </div>
//                                 {/* <div className="input-group" >
//                                     <input type="text" name="role"  placeholder="Role"  required onChange={handleInputChange} />
//                                 </div> */}
//                                          <div className="input-group">                     
//  <select name="role" required onChange={handleInputChange} placeholder="select Role" defaultValue="">
//     <option value="" disabled>
//       Select Role
//     </option>
   
//     <option  name="role" value="student">student</option>
  
//   </select>
// </div>
//                                 <div className="input-group" id="names">
//                                     <input type="text" name="id" placeholder="ID" required onChange={handleInputChange} />  &nbsp; &nbsp;
//                                     <input type="text" name="year" placeholder="Year" required onChange={handleInputChange} />
//                                 </div>
//                                 <div id="spass"></div>
//                                 <button type="submit" id="signUp">Sign up</button>
//                             </form>
//                             <p>
//                                 <span  style={{color:'black'}}>Already have an account?</span>
//                                 <b onClick={toggleForm} className="pointer"><Link to="/login" className='pointer'>Sign in here</Link></b>
//                             </p>
//                         </div>

//                         </div>

//                     </div>
//                 </div>
//                 {/* SIGN IN */}
//                 <div className="col align-items-center flex-col sign-in">
//                     <div className="form-wrapper align-items-center">
//                         <div className="form sign-in">
//                             <form onSubmit={handleSignIn}>
//                                 <div className="input-group">
//                                     <input type="email" name="email" placeholder="Email" autocomplete='off' required onChange={handleInputChange} />
//                                 </div>
//                                 <div className="input-group">
//                                     <input type="password" name="password" placeholder="Password" required onChange={handleInputChange} />
//                                 </div>
//                                 <button type="submit" style={{color:'white'}}>Sign in</button>
//                                 <p>
//                                     <b style={{color:'blue'}}>
//                                         <Link to="/studentp">Forgot password?</Link>
//                                     </b>
//                                 </p>
//                                 <p>
//                                     <span style={{color:'white'}}>Don't have an account?</span>
//                                     <b onClick={toggleForm} className="pointer" style={{color:'blue'}}>Sign up here</b>
//                                 </p>
//                                 <div className="type">
//                                     <button className="active"> <Link to="/login" className='ltype'>Student</Link></button>
//                                     <button type="button">  <Link to="/faculty" className='ltype'>Faculty</Link></button>
//                                     <button type="button">   <Link to="/event" className='ltype'>Event Manager</Link></button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="row content-row" id='animate'>
//                 {/* SIGN IN CONTENT */}
//                 <div className="col align-items-center flex-col">
//                     <div className="text sign-in">
//                         <h2 style={{color:'white',marginTop:'-20px'}}>Welcome</h2>
//                     </div>
//                     <div className="img sign-in"></div>
//                 </div>
//                 {/* SIGN UP CONTENT */}
//                 <div className="col align-items-center flex-col">
//                     <div className="img sign-up"></div>
//                     <div className="text sign-up">
//                         <h2 style={{color:'white'}}>Join with us</h2>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './components/UserContext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import "./index.css";

export function LoginStudent() {
    const { setRole } = useContext(UserContext); 
    const [isSignIn, setIsSignIn] = useState(true);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: '',
        id: '',
        year: ''
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/student/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSnackbarMessage('Student created successfully');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
              //  navigate('/login');
            } else {
                setSnackbarMessage('Failed to create student. Email already registered.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setSnackbarMessage('An error occurred. Please try again later.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/student/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const { message, role } = data;
                setSnackbarMessage(message);
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                if (role) {
                    localStorage.setItem('userRole', role);
                    setRole(role);
                 //  alert("login successful")
                   setSnackbarMessage(message);
                   setSnackbarSeverity('success');
                   setSnackbarOpen(true);
                   setTimeout(() => {
                    navigate('/home');
                }, 2000);
                   // navigate('/home');
                }
            } else if (response.status === 404) {
                setSnackbarMessage('Email not found. Please register first.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            } else if (response.status === 401) {
                setSnackbarMessage('Wrong password. Please try again.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            } else if (response.status === 400) {
                setSnackbarMessage('Go and Verify Your Email');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            } else {
                setSnackbarMessage('Failed to sign in');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setSnackbarMessage('An error occurred. Please try again later.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div id="container" className={`container ${isSignIn ? 'sign-in' : 'sign-up'}`}>
            <div className="head">
                <div className="logo"><img src="rgukt.jpg" alt="no-img" className='logo' /></div>
                <div id="head-name" style={{marginLeft:"70px"}}>
                    <h2>Rajiv Gandhi University Of Knowledge Technologies-Andhra Pradesh
                   <span className="name"> Rkvalley campus kadapa Dist,516330</span> 
                    </h2>
                </div>
            </div>
          
            <div className="row">
                {/* SIGN UP */}
                <div className="col align-items-center flex-col sign-up">
                    <div className="form-wrapper align-items-center">
                        <div className="form sign-up">
                            <div className='login-wraper'>
                                <form onSubmit={handleSignUp}>
                                    <div className="input-group" id="names">
                                        <input type="text" name="firstname" placeholder="First Name" required onChange={handleInputChange} /> &nbsp; &nbsp;
                                        <input type="text" name="lastname" placeholder="Last Name" required onChange={handleInputChange} />
                                    </div>
                                    <div className="input-group">
                                        <input type="email" name="email" placeholder="Email" id="email" required onChange={handleInputChange} />
                                    </div>
                                    <div className="input-group">
                                        <input type="password" name="password" placeholder="Password" required onChange={handleInputChange} />
                                    </div>
                                    <div className="input-group">                     
                                        <select name="role" required onChange={handleInputChange} defaultValue="">
                                            <option value="" disabled>
                                                Select Role
                                            </option>
                                            <option value="student">student</option>
                                        </select>
                                    </div>
                                    <div className="input-group" id="names">
                                        <input type="text" name="id" placeholder="ID" required onChange={handleInputChange} />  &nbsp; &nbsp;
                                        <input type="text" name="year" placeholder="Year" required onChange={handleInputChange} />
                                    </div>
                                    <div id="spass"></div>
                                    <button type="submit" id="signUp">Sign up</button>
                                </form>
                                <p>
                                    <span style={{color:'black'}}>Already have an account?</span>
                                    <b onClick={toggleForm} className="pointer"><Link to="/login" className='pointer'>Sign in here</Link></b>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* SIGN IN */}
                <div className="col align-items-center flex-col sign-in">
                    <div className="form-wrapper align-items-center">
                        <div className="form sign-in">
                            <form onSubmit={handleSignIn}>
                                <div className="input-group">
                                    <input type="email" name="email" placeholder="Email" autoComplete='off' required onChange={handleInputChange} />
                                </div>
                                <div className="input-group">
                                    <input type="password" name="password" placeholder="Password" required onChange={handleInputChange} />
                                </div>
                                <button type="submit" style={{color:'white'}}>Sign in</button>
                                <p>
                                    <b style={{color:'blue'}}>
                                        <Link to="/studentp">Forgot password?</Link>
                                    </b>
                                </p>
                                <p>
                                    <span style={{color:'white'}}>Don't have an account?</span>
                                    <b onClick={toggleForm} className="pointer" style={{color:'blue'}}>Sign up here</b>
                                </p>
                                <div className="type">
                                    <button className="active"> <Link to="/login" className='ltype'>Student</Link></button>
                                    <button type="button">  <Link to="/faculty" className='ltype'>Faculty</Link></button>
                                    <button type="button">   <Link to="/event" className='ltype'>Event Manager</Link></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row content-row" id='animate'>
                {/* SIGN IN CONTENT */}
                <div className="col align-items-center flex-col">
                    <div className="text sign-in">
                        <h2 style={{color:'white',marginTop:'-20px'}}>Welcome</h2>
                    </div>
                    <div className="img sign-in"></div>
                </div>
                {/* SIGN UP CONTENT */}
                <div className="col align-items-center flex-col">
                    <div className="img sign-up"></div>
                    <div className="text sign-up">
                        <h2 style={{color:'white'}}>Join with us</h2>
                    </div>
                </div>
            </div>

            {/* Snackbar for notifications */}
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
