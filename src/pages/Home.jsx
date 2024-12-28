
import React, { useState, useEffect } from "react";
import "../styles/home.css"; // Keep your existing styles
import Carousel from "../components/Carousel";
import img1 from "../assets1/all_images/slider-1.jpg";
import img2 from "../assets1/all_images/slider-2.jpg";
import img3 from "../assets1/all_images/slider-3.jpeg";
import img4 from '../assets1/all_images/slider-4.png';
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material"; // Importing MUI Dialog components
import './home.css';
const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetching upcoming events from backend
  useEffect(() => {
    fetch("http://localhost:8080/form/futureevent") // Adjust the URL as per your backend API
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setUpcomingEvents(data))
      .catch((error) => console.error("Error fetching upcoming events:", error));
  }, []);

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const CarouselImages = [img1, img2, img3,img4];

  return (
    <>
      <div className="welcome-container">
        <h1 style={{fontFamily: 'Roboto Slab, serif',
            fontOpticalSizing: 'auto',
            fontWeight: 'bold',
            fontSize:'36px',
            fontStyle: 'normal'}}>Welcome to EventManagement System</h1>
        <p style={{fontFamily: '"Dancing Script", cursive',
  fontOpticalSizing: 'auto',
  fontWeight: 'bold',
  fontSize:'24px',
  fontStyle: 'normal'}}>your one-stop solution for seamless event planning and management.</p>
      </div>

      <div className="Carousel-container">
        <Carousel images={CarouselImages} interval={3000} />
      </div>

      <div className="container-3">
  <h3>Upcoming Events</h3>
  {upcomingEvents.length > 0 ? (
    upcomingEvents.map((item, index) => {
      // Convert the string date into a Date object
      const formattedDate = new Date(item.eventDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      
      return (
        <div key={index} className="event_details_card">
          <h3>{item.eventName}</h3>
          {/* Use the formattedDate */}
          <p>Date: {formattedDate}</p>
          <p>Venue: {item.eventVenue}</p>
          <Button variant="contained" onClick={() => handleViewDetails(item)}>
            View Details
          </Button>
        </div>
      );
    })
  ) : (
    <p>No upcoming events available at the moment.</p>
  )}
</div>


      <div className="container-4">
        <h3>Your DashBoard</h3>
        <p>
          Manage your events, view analytics, and access all tools you need
          right here. Go to Dashboard
        </p><br/>
        <Link to="/dashboard">
          <Button variant="contained">Go to Dashboard</Button>
        </Link>
        <br />
        <br />
      </div>

      {/* MUI Dialog for Event Details */}
      <Dialog 
        open={isModalOpen} 
        onClose={handleCloseModal} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          style: {
            padding: "15px", // Add padding to the dialog content
            borderRadius: "10px", // Rounded corners
            backgroundColor: "#f5f5f5", // Light background color
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" component="div" align="center">
            {selectedEvent ? selectedEvent.eventName : ""}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <>
              {/* Format the event date before displaying */}
              <Typography variant="body1">
                <strong>Date:</strong> {new Date(selectedEvent.eventDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
              <Typography variant="body1">
                <strong>Venue:</strong> {selectedEvent.eventVenue}
              </Typography>
             
              <Typography variant="body1">
                <strong>Organizer:</strong> {selectedEvent.organiserName}
              </Typography>
              <Typography variant="body1">
                <strong>Contact:</strong> {selectedEvent.organiserContact}
              </Typography>
              <Typography variant="body1">
                <strong>Description:</strong> {selectedEvent.eventDescription}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;
