import React, { useState } from 'react';
import { Event } from '@mui/icons-material';
import { Grid, Paper, Typography, Box } from '@mui/material';
import '../styles/Home1.css' // For custom animations

function HomePage() {
  const [showEvents, setShowEvents] = useState(false);

  // Show events on hover or scroll
  const handleScrollOrHover = () => {
    setShowEvents(true);
  };

  return (
    <div>
      {/* Icon with hover effect */}
      <div className="icon-container" onMouseEnter={handleScrollOrHover}>
        <Event className="event-icon" />
        <Typography variant="h6">Upcoming Events</Typography>
      </div>

      {/* Section for Upcoming Events */}
      {showEvents && (
        <Box className="upcoming-events-section" mt={4}>
          <Typography variant="h4" gutterBottom>
            Upcoming Events
          </Typography>
          <Grid container spacing={3}>
            {/* List of upcoming events */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper style={{ padding: 20 }}>
                <Typography variant="h6">Event 1</Typography>
                <Typography>Date: 2024-10-05</Typography>
                <Typography>Location: City Hall</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper style={{ padding: 20 }}>
                <Typography variant="h6">Event 2</Typography>
                <Typography>Date: 2024-10-15</Typography>
                <Typography>Location: Convention Center</Typography>
              </Paper>
            </Grid>
            {/* Add more events here */}
          </Grid>
        </Box>
      )}
    </div>
  );
}

export default HomePage;
