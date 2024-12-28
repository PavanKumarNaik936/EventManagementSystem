import React, { useState, useEffect } from "react";

const PastEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/form/pastevent")  // Ensure your backend has an endpoint for past events
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => setEvents(data))
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  return (
    <div>
      <h2>Past Events</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Event Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Venue</th>
            <th>Description</th>
            <th>Type</th>
            <th>Organiser Name</th>
            <th>Organiser Contact</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.eventName}</td>
              <td>{event.eventDate}</td>
              <td>{event.eventTime}</td>
              <td>{event.eventVenue}</td>
              <td>{event.eventDescription}</td>
              <td>{event.eventType}</td>
              <td>{event.organiserName}</td>
              <td>{event.organiserContact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PastEvents;
