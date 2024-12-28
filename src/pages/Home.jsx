import React from "react";
import "../styles/home.css";
import Carousel from "../components/Carousel"
import img1 from "../assets1/all_images/slider-1.jpg";
import img2 from "../assets1/all_images/slider-2.jpg";
import img3 from "../assets1/all_images/slider-3.jpeg";
import { Link } from "react-router-dom";
const Home=()=>{
    const upcomingEvents=[
        {"name":"Event Name","Date":"Event date","Venue":"Event Venue"},
        {"name":"Event Name","Date":"Event date","Venue":"Event Venue"},
        {"name":"Event Name","Date":"Event date","Venue":"Event Venue"},
        {"name":"Event Name","Date":"Event date","Venue":"Event Venue"},
        {"name":"Event Name","Date":"Event date","Venue":"Event Venue"}
        
    ]
    const CarouselImages = [
        img1,img2,img3
    ];
    return (
        <>
            <div className="welcome-container">
            <h1>Welcome to EventManager</h1>
            <p>Your one-stop solution for seamless event planning and management.</p>
            </div>
            <div className="Carousel-container">
            <Carousel images={CarouselImages} interval={3000} />
            </div>
            <div className="container-3">
                <h3>Upcoming Events</h3>
                {upcomingEvents.map((item,index)=>(
                    <div key={index} className="event_details_card">
                        <h3>{item.name}</h3>
                        <p>Date: {item.Date}</p>
                        <p>Venue: {item.Venue}</p>
                        <button>View Details</button>
                    </div>
                ))}
            </div>
            <div className="container-4">
                <h3>Your DashBoard</h3>
                <p>Manage your events, view analytics, and access all tools you need right here.Go to Dashboard</p>
               <Link to="/dashboard"> <button>Go to Dashboard</button></Link>
                <br></br>
                <br/>
            </div>
        </>
    )
};
export default Home;