import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Events from "../pages/Events";
import Resources from '../pages/Resources'
import About from "../pages/About";
import AddEvent from "../pages/AddEvent";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import PastEvents from "../pages/PastEvents";
import FutureEvents from "../pages/FutureEvents";
import Volunteer from "../pages/Volunteer";
import { Assigned } from "../pages/Assigned";
import { UnAssigned } from "../pages/UnAssigned";
import Volunteering from "../pages/Volunteering";
import Gallery from "../pages/Gallery";
import Review from "../pages/Review";
const Routers = () => {
  return (
    <Routes>
      
      <Route path="/home" element={<Home />} />
    
      <Route path="/about" element={<About />} />
      <Route path="/events" element={<Events />}>
        <Route path="volunteer" element={<Volunteer/>}/>
        <Route path="addevents" element={<AddEvent />} />
        <Route path="pastevents" element={<PastEvents />} />
        <Route path="futureevents" element={<FutureEvents />} />
      </Route>
      <Route path="/volunteering" element={<Volunteering />}> 
        <Route path="assigned" element={<Assigned/>}/>
        <Route path="notassigned" element={<UnAssigned />} />
         
       </Route> 
      <Route path="/resources" element={<Resources/>}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/r" element={<Review />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
