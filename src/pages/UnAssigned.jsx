import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const UnAssigned = ({ onAssign }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [editingVolunteer, setEditingVolunteer] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      method: "PUT",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to assign work");
        }
        setOpenSnackbar(true);
        setVolunteers(volunteers.filter((v) => v.id !== volunteer.id));
        onAssign(volunteer);
      })
      .catch((error) => console.error("Error assigning work:", error));
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
    setEditingVolunteer(null);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        gutterBottom
        sx={{ mb: 2, textAlign: 'center' }} // Centered title with margin-bottom
      >
        Unassigned Works
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 400,
          overflowX: "auto",
          width: "100%",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {["ID", "Volunteer Name", "Interested In", "Volunteer Role", "Preferred Shift", "Actions"].map((header) => (
                <TableCell key={header}>
                  <Typography
                    variant={isMobile ? "body2" : "body1"}
                    sx={{ fontWeight: 'bold', textAlign: 'center' }} // Bold and centered header
                  >
                    {header}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {volunteers.length > 0 ? (
              volunteers.map((volunteer) => (
                <TableRow key={volunteer.id}>
                  {!volunteer.workassigned && (
                    <>
                      <TableCell>
                        <Typography variant={isMobile ? "body2" : "body1"} sx={{ textAlign: 'center' }}>
                          {volunteer.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant={isMobile ? "body2" : "body1"} sx={{ textAlign: 'center' }}>
                          {volunteer.fullname}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant={isMobile ? "body2" : "body1"} sx={{ textAlign: 'center' }}>
                          {volunteer.interestedin}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant={isMobile ? "body2" : "body1"} sx={{ textAlign: 'center' }}>
                          {volunteer.volunteerrole}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant={isMobile ? "body2" : "body1"} sx={{ textAlign: 'center' }}>
                          {volunteer.preferredshift}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          size={isMobile ? "small" : "medium"}
                          onClick={() => handleEdit(volunteer)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="success"
                          size={isMobile ? "small" : "medium"}
                          onClick={() => handleAssign(volunteer)}
                        >
                          Assign
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                  No Unassigned Works
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          Assigned successfully!
        </Alert>
      </Snackbar>

      {editingVolunteer && (
        <div className="edit-form">
          <Typography variant="h5" gutterBottom>
            Edit Volunteer
          </Typography>
          <form onSubmit={handleUpdate}>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
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
            </div>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};
