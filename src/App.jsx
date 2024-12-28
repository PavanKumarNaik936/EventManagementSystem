import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/UserContext'; // Ensure the correct path
import { LoginStudent } from './LoginStudent';
import { LoginFaculty } from './LoginFaculty';
import { LoginEvent } from './LoginEvent';
import { StudentP } from './StudentP';  
import { FacultyP } from './FacultyP';
import { EventP } from './EventP';
import Home from './pages/Home.jsx';
import Events from "./pages/Events";
import Resources from './pages/Resources';
import About from "./pages/About";
import AddEvent from "./pages/AddEvent";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PastEvents from "./pages/PastEvents";
import FutureEvents from "./pages/FutureEvents";
import Volunteer from "./pages/Volunteer"; // Import Volunteer component
import Layout from './components/LayOut.jsx';
import { Assigned } from './pages/Assigned.jsx';
import { UnAssigned } from './pages/UnAssigned.jsx';
import Volunteering from './pages/Volunteering.jsx';
 import OpenEventManager from './pages/OpenEventManager.jsx';
import Gallery from './pages/Gallery.jsx';
import VerifyEmail from './VerifyEmail.jsx';
import ResetPassword from './ResetPassword.jsx';
import Review from './pages/Review.jsx';
import ReviewBarChart from './pages/ReviewBarChart.jsx';
import ReviewBarChart2 from './pages/ReviewBarChart2.jsx';
function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                {/* <Route path="/reviewbar" element={<ReviewBarChart />} />
                <Route path="/reviewbars" element={<ReviewBarChart2 />} /> */}
                     {/* Route to OpenEventManager as the first page */}
                     <Route path='/resetpassword' element={<ResetPassword/>}/>
                     <Route path="/" element={<OpenEventManager />} />
                     <Route path='/verifyemail' element={<VerifyEmail/>}/>
                    {/* Login Routes */}
                    <Route path="/login" element={<LoginStudent />} />
                    <Route path="/faculty" element={<LoginFaculty />} />
                    <Route path="/event" element={<LoginEvent />} />
                    <Route path="/studentp" element={<StudentP />} />
                    <Route path="/facultyp" element={<FacultyP />} />
                    <Route path="/eventp" element={<EventP />} />
                    <Route path="/gallery1" element={<Gallery />} />

                   

                    {/* Main Application Routes wrapped in Layout */}
                    <Route element={<Layout />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                      
                        <Route path="/events" element={<Events />}>
                            <Route path="addevents" element={<AddEvent />} />
                            <Route path="pastevents" element={<PastEvents />} />
                            <Route path="futureevents" element={<FutureEvents />} />
                            <Route path="volunteer" element={<Volunteer />} /> {/* Add route for Volunteer */}
                        </Route>
                        <Route path="/volunteering" element={<Volunteering/>}>
                            <Route path="assigned" element={<Assigned/>}/>
                            <Route path="notassigned" element={<UnAssigned/>}/>
                        </Route>
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/r" element={<Review />} />
                    </Route>

                    {/* 404 Not Found Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
