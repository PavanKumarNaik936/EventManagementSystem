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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography"; // Import Typography

export const Assigned = ({ onAssign }) => {
  const [events, setEvents] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
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
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleAssign = (volunteer) => {
    fetch(`http://localhost:8080/volunteer/unassign/${volunteer.id}`, {
      method: "PUT",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to unassign work");
        } else {
          setSnackbarMessage("Volunteer unassigned successfully!");
          setSnackbarOpen(true);
        }
        setEvents(events.filter((v) => v.id !== volunteer.id));
        onAssign(volunteer);
      })
      .catch((error) => console.error("Error unassigning work:", error));
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        sx={{ mb: 2, textAlign: 'center' }} // Centered title with margin-bottom
      >
        Assigned Works
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 400,
          overflowX: "auto",
          width: "100%",
        }}
      >
        <Table stickyHeader aria-label="assigned works table" sx={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              {["ID", "Volunteer Name", "Assigned Event", "Assigned Role", "Assigned Shift", "Actions"].map((header) => (
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
          {events.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: 'center' }}>No unassigned works</TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {events.map((event) =>
                event.workassigned ? (
                  <TableRow key={event.id}>
                    <TableCell>
                      <Typography variant={isMobile ? "body2" : "body1"} sx={{ textAlign: 'center' }}>
                        {event.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant={isMobile ? "body2" : "body1"} sx={{ textAlign: 'center' }}>
                        {event.fullname}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant={isMobile ? "body2" : "body1"} sx={{ textAlign: 'center' }}>
                        {event.interestedin}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant={isMobile ? "body2" : "body1"} sx={{ textAlign: 'center' }}>
                        {event.volunteerrole}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant={isMobile ? "body2" : "body1"} sx={{ textAlign: 'center' }}>
                        {event.preferredshift}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size={isMobile ? "small" : "medium"}
                        onClick={() => handleAssign(event)}
                      >
                        Unassign
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : null
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {/* Snackbar for Success Message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Centered for better visibility
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
