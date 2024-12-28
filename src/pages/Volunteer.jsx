import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "./VolunteerForm.css";

const Volunteer = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobilenumber: "",
    gender: "",
    interestedin: "",
    volunteerrole: "",
    preferredshift: "",
    experience: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/volunteer/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        alert("Volunteer Data Submitted");
        console.log("Volunteer application submitted successfully!");
      } else {
        alert("Volunteer Data Not Submitted");
        console.error("Failed to submit volunteer application");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <><br/>
      <br/>
    <div className="form-container">
      {submitted ? (
        <h3>Thank you for submitting your application!</h3>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Volunteer Application Form</h2>

          <label>Full Name:</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Mobile Number:</label>
          <input
            type="tel"
            name="mobilenumber"
            value={formData.mobilenumber}
            onChange={handleChange}
            required
          />

          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label>Event(s) Interested In:</label>
          <input
            type="text"
            name="interestedin"
            value={formData.interestedin}
            onChange={handleChange}
            required
          />

          <label>Preferred Volunteer Role:</label>
          <select
            name="volunteerrole"
            value={formData.volunteerrole}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="registration desk">Registration Desk</option>
            <option value="water management">Water Management</option>
            <option value="crowd management">Crowd Management</option>
            <option value="promotions">Promotions</option>
            <option value="refreshments">Refreshments</option>
            <option value="help desk">Help Desk</option>
          </select>

          <label>Preferred Shift:</label>
          <select
            name="preferredshift"
            value={formData.preferredshift}
            onChange={handleChange}
            required
          >
            <option value="">Select Shift</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>

          <label>Do you have any previous volunteer experience?</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />

          <button type="submit">Submit Application</button>
        </form>
      )}
    </div>
    </>
  );
};

export default Volunteer;
