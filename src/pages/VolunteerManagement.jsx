

import React, { useState } from "react";
import { UnAssigned } from "./UnAssigned";
import { Assigned } from "./Assigned";

const VolunteerManagement = () => {
  const [assignedVolunteers, setAssignedVolunteers] = useState([]);

  const handleAssign = (volunteer) => {
    setAssignedVolunteers([...assignedVolunteers, volunteer]);
  };

  return (
    <div className="volunteer-management">
      <UnAssigned onAssign={handleAssign} />
      <Assigned assignedVolunteers={assignedVolunteers} />
    </div>
  );
};

export default VolunteerManagement;