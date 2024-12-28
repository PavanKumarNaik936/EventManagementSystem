import "../styles/addEvent.css";
import React, { useState } from "react";

const AddEvent = () => {
    const [eventName, setEventName] = useState('');
    const [organiserName, setOrganiserName] = useState('');
    const [organiserContact, setOrganiserContact] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventVenue, setEventVenue] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventType, setEventType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create an object with the event data
        const eventData = {
          eventName,        
          organiserName,    
          organiserContact, 
          eventDate,        
          eventTime,        
          eventVenue,       
          eventDescription, 
          eventType, 
        };

        try {
            // Send a POST request to the server
            const response = await fetch('http://localhost:8080/form/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            // Check if the request was successful
            if (response.ok) {
                // const result = await response.json();
                // console.log('Event added successfully:', result);
                alert("Event added successfully");
                // Optionally, clear the form or navigate to another page
            } else {
                // console.error('Failed to add event:', response.statusText);
                alert("Not Added");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <section id="add-event-container">
            <div className="section-content-addevent">
                <h2>Add New Event</h2>
                <form id="event-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="event-name">Event Name:</label>
                        <input
                            type="text"
                            id="event-name"
                            name="event-name"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="event-date">Date:</label>
                        <input
                            type="date"
                            id="event-date"
                            name="event-date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="event-time">Time:</label>
                        <input
                            type="time"
                            id="event-time"
                            name="event-time"
                            value={eventTime}
                            onChange={(e) => setEventTime(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="event-venue">Venue:</label>
                        <input
                            type="text"
                            id="event-venue"
                            name="event-venue"
                            value={eventVenue}
                            onChange={(e) => setEventVenue(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="organiser-name">Organiser Name:</label>
                        <input
                            type="text"
                            id="organiser-name"
                            name="organiser-name"
                            value={organiserName}
                            onChange={(e) => setOrganiserName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="organiser-contact">Organiser Contact:</label>
                        <input
                            type="text"
                            id="organiser-contact"
                            name="organiser-contact"
                            value={organiserContact}
                            onChange={(e) => setOrganiserContact(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="event-description">Description:</label>
                        <textarea
                            id="event-description"
                            name="event-description"
                            rows="4"
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="event-type">Event Type:</label>
                        <select
                            id="event-type"
                            name="event-type"
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value)}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="CONFERENCE">CONFERENCE</option>
                            <option value="workshop">Workshop</option>
                            <option value="seminar">Seminar</option>
                            <option value="meetup">Meetup</option>
                        </select>
                    </div>
                    <button type="submit" className="btn">Add Event</button>
                </form>
            </div>
        </section>
    );
};

export default AddEvent;
