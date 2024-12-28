import React, { useState, useEffect } from "react";

export const Assigned = ({ onAssign }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/volunteer/getvolunteer")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => setEvents(data))
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  const handleAssign = (volunteer) => {
    fetch(`http://localhost:8080/volunteer/unassign/${volunteer.id}`, {
      method: 'PUT',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to assign work');
        }else{
          alert("modify to zero");
        }
        setVolunteers(volunteers.filter(v => v.id !== volunteer.id)); // Remove the assigned volunteer from the list
        onAssign(volunteer); // Callback for any additional logic
        setShowPopup(true); // Show popup box
        setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
      })
       .catch(error => console.error('Error assigning work:', error));
  };

  return (
    <div>
      <h2>Assigned Works</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Volunteer Name</th>
            <th>Assigned Event</th>
            <th>Assigned Role</th>
            <th>Assigned Shift</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            
            <tr key={event.id}>
              {event.workassigned?<td>{event.id}</td>:null}
              {event.workassigned?<td>{event.fullname}</td>:null}
              {event.workassigned?<td>{event.interestedin}</td>:null}
              {event.workassigned?<td>{event.volunteerrole}</td>:null}
              {event.workassigned?<td>{event.preferredshift}</td>:null}
              {event.workassigned? <td>
                <button onClick={() => handleAssign(event)} className="assign-button">
                  UnAssign
                </button>
              </td>:null}
             
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
