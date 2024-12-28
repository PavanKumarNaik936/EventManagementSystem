import React, { useState, useEffect } from "react";

export const UnAssigned = ({ onAssign }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState(null); // State for editing

  useEffect(() => {
    fetch("http://localhost:8080/volunteer/getvolunteer")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setVolunteers(data))
      .catch((error) => console.error("Error fetching volunteers:", error));
  }, []);

  const handleAssign = (volunteer) => {
    fetch(`http://localhost:8080/volunteer/assign/${volunteer.id}`, {
      method: 'PUT',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to assign work');
        }else{
          alert("modify to one");
        }
        setVolunteers(volunteers.filter(v => v.id !== volunteer.id)); // Remove the assigned volunteer from the list
        onAssign(volunteer); // Callback for any additional logic
        setShowPopup(true); // Show popup box
        setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
      })
      .catch(error => console.error('Error assigning work:', error));
  };

  const handleEdit = (volunteer) => {
    setEditingVolunteer(volunteer);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setVolunteers((prevVolunteers) =>
      prevVolunteers.map((vol) =>
        vol.id === editingVolunteer.id ? editingVolunteer : vol
      )
    );
    setEditingVolunteer(null); // Close the form after updating
  };

  return (
    <div>
      <h2>Unassigned Works</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Volunteer Name</th>
            <th>Interested In</th>
            <th>Volunteer Role</th>
            <th>Preferred Shift</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((volunteer) => (
            <tr key={volunteer.id}>
             {!volunteer.workassigned?<td>{volunteer.id}</td>:null} 
             {!volunteer.workassigned?<td>{volunteer.fullname}</td>:null} 
             {!volunteer.workassigned?<td>{volunteer.interestedin}</td>:null} 
             {!volunteer.workassigned?<td>{volunteer.volunteerrole}</td>:null} 
             {!volunteer.workassigned?<td>{volunteer.preferredshift}</td>:null} 
             {!volunteer.workassigned? <td>
                <button
                  onClick={() => handleEdit(volunteer)}
                  className="btn btn-primary"
                >
                  Edit
                </button>
              </td>:null}
             {!volunteer.workassigned? <td>
                <button onClick={() => handleAssign(volunteer)} className="assign-button">
                  Assign
                </button>
              </td>:null}
             
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup-box">
          <div className="popup-content">
            <p>Work has been assigned!</p>
          </div>
        </div>
      )}

      {editingVolunteer && (
        <div className="edit-form">
          <h3>Edit Volunteer</h3>
          <form onSubmit={handleUpdate}>
            <label>
              Volunteer Name:
              <input
                type="text"
                value={editingVolunteer.fullname}
                onChange={(e) =>
                  setEditingVolunteer({ ...editingVolunteer, fullname: e.target.value })
                }
              />
            </label>
            <label>
              Interested In:
              <input
                type="text"
                value={editingVolunteer.interestedin}
                onChange={(e) =>
                  setEditingVolunteer({ ...editingVolunteer, interestedin: e.target.value })
                }
              />
            </label>
            <label>
              Volunteer Role:
              <input
                type="text"
                value={editingVolunteer.volunteerrole}
                onChange={(e) =>
                  setEditingVolunteer({ ...editingVolunteer, volunteerrole: e.target.value })
                }
              />
            </label>
            <label>
              Preferred Shift:
              <input
                type="text"
                value={editingVolunteer.preferredshift}
                onChange={(e) =>
                  setEditingVolunteer({ ...editingVolunteer, preferredshift: e.target.value })
                }
              />
            </label>
            <button type="submit" className="update-button">
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
