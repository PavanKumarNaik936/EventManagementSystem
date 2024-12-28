// import React, { useEffect, useState } from 'react';
// import {
//   TextField,
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from '@mui/material';
// import { Rating } from '@mui/lab'; // Ensure you have @mui/lab installed

// const Review = () => {
//   const [overallRating, setOverallRating] = useState(0);
//   const [comment, setComment] = useState('');
//   const [events, setEvents] = useState([]); // State for storing events
//   const [selectedEvent, setSelectedEvent] = useState(''); // State for selected event
//   const [roleRatings, setRoleRatings] = useState({
//     registration: 0,
//     waterManagement: 0,
//     crowdManagement: 0,
//     promotions: 0,
//     refreshments: 0,
//     helpDesk: 0,
//   });

//   // Fetch past events from the API
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/form/pastevent");
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setEvents(data); // Assuming data is an array of event objects
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create the data object to be sent to the backend
//     const reviewData = {
//       eventId: selectedEvent, // Selected event ID
//       registrationDeskRating: roleRatings.registration, // Individual ratings
//       waterManagementRating: roleRatings.waterManagement,
//       crowdManagementRating: roleRatings.crowdManagement,
//       promotionsRating: roleRatings.promotions,
//       refreshmentsRating: roleRatings.refreshments,
//       helpDeskRating: roleRatings.helpDesk,
//       overallRating: overallRating, // Overall rating
//       comment: comment, // User's comment
//     };
// console.log(JSON.stringify(reviewData))
//     try {
//       const response = await fetch("http://localhost:8080/reviews/addreview", {
//         method: "POST", // Use POST method
//         headers: {
//           "Content-Type": "application/json", // Set content type to JSON
//         },
//         body: JSON.stringify(reviewData), // Convert the data to JSON
      
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit review'); // Handle response errors
//       }

//       // Optionally handle the successful response here (e.g., show a success message)
//       console.log('Review submitted successfully:', reviewData);
//     } catch (error) {
//       console.error('Error submitting review:', error); // Handle submission errors
//     }

//     // Reset form fields
//     setOverallRating(0);
//     setComment('');
//     setSelectedEvent('');
//     setRoleRatings({
//       registration: 0,
//       waterManagement: 0,
//       crowdManagement: 0,
//       promotions: 0,
//       refreshments: 0,
//       helpDesk: 0,
//     });
//   };

//   return (
//     <Grid
//       container
//       justifyContent="center"
//       alignItems="center"
//       style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }} // Light gray background
//     >
//       <Grid item xs={12} sm={8} md={6} lg={4}>
//         <Card variant="outlined" sx={{ padding: '20px', borderRadius: '10px', boxShadow: 3 }}>
//           <CardContent>
//             <Typography variant="h5" gutterBottom align="center" color="primary">
//               Write a Review
//             </Typography>

//             <form onSubmit={handleSubmit}>
//               {/* Event Selection */}
//               <FormControl fullWidth sx={{ marginBottom: '20px' }}>
//                 <InputLabel id="event-select-label">Select Past Event</InputLabel>
//                 <Select
//                   labelId="event-select-label"
//                   value={selectedEvent}
//                   onChange={(e) => setSelectedEvent(e.target.value)}
//                   required
//                   sx={{ borderRadius: '8px' }} // Rounded corners for dropdown
//                 >
//                   {events.map((event) => (
//                     <MenuItem key={event.id} value={event.id}> {/* Assuming event has an id */}
//                       {event.eventName} {/* Assuming event has a name */}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               {/* Role Ratings */}
//               <Typography component="legend" color="textSecondary">Rate Your Experience</Typography>

//               {/* Registration Desk Rating */}
//               <Typography variant="subtitle1">Registration Desk</Typography>
//               <Rating
//                 name="registration"
//                 value={roleRatings.registration}
//                 onChange={(event, newValue) => {
//                   setRoleRatings({ ...roleRatings, registration: newValue });
//                 }}
//                 precision={0.5} // Allows half stars
//               />

//               {/* Water Management Rating */}
//               <Typography variant="subtitle1">Water Management</Typography>
//               <Rating
//                 name="waterManagement"
//                 value={roleRatings.waterManagement}
//                 onChange={(event, newValue) => {
//                   setRoleRatings({ ...roleRatings, waterManagement: newValue });
//                 }}
//                 precision={0.5}
//               />

//               {/* Crowd Management Rating */}
//               <Typography variant="subtitle1">Crowd Management</Typography>
//               <Rating
//                 name="crowdManagement"
//                 value={roleRatings.crowdManagement}
//                 onChange={(event, newValue) => {
//                   setRoleRatings({ ...roleRatings, crowdManagement: newValue });
//                 }}
//                 precision={0.5}
//               />

//               {/* Promotions Rating */}
//               <Typography variant="subtitle1">Promotions</Typography>
//               <Rating
//                 name="promotions"
//                 value={roleRatings.promotions}
//                 onChange={(event, newValue) => {
//                   setRoleRatings({ ...roleRatings, promotions: newValue });
//                 }}
//                 precision={0.5}
//               />

//               {/* Refreshments Rating */}
//               <Typography variant="subtitle1">Refreshments</Typography>
//               <Rating
//                 name="refreshments"
//                 value={roleRatings.refreshments}
//                 onChange={(event, newValue) => {
//                   setRoleRatings({ ...roleRatings, refreshments: newValue });
//                 }}
//                 precision={0.5}
//               />

//               {/* Help Desk Rating */}
//               <Typography variant="subtitle1">Help Desk</Typography>
//               <Rating
//                 name="helpDesk"
//                 value={roleRatings.helpDesk}
//                 onChange={(event, newValue) => {
//                   setRoleRatings({ ...roleRatings, helpDesk: newValue });
//                 }}
//                 precision={0.5}
//               />

//               {/* Overall Rating */}
//               <Typography component="legend" color="textSecondary">Overall Rating</Typography>
//               <Rating
//                 name="overallRating"
//                 value={overallRating}
//                 onChange={(event, newValue) => {
//                   setOverallRating(newValue);
//                 }}
//                 precision={0.5}
//                 sx={{ marginBottom: '20px' }} // Add margin
//               />

//               {/* Review Comment Input */}
//               <TextField
//                 label="Write your review"
//                 variant="outlined"
//                 fullWidth
//                 multiline
//                 rows={4}
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 required
//                 sx={{
//                   marginBottom: '20px',
//                   borderRadius: '8px', // Rounded corners for textarea
//                   '& .MuiOutlinedInput-root': {
//                     '& fieldset': {
//                       borderRadius: '8px', // Rounded corners for input
//                     },
//                   },
//                 }} // Add margin and rounded corners
//               />

//               {/* Submit Button */}
//               <Button
//                 variant="contained"
//                 color="primary"
//                 type="submit"
//                 fullWidth
//                 sx={{ borderRadius: '8px', padding: '10px', fontWeight: 'bold' }} // Rounded corners and padding
//               >
//                 Submit Review
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// };

// export default Review;

import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Rating } from '@mui/lab'; // Ensure you have @mui/lab installed

const Review = () => {
  const [overallRating, setOverallRating] = useState(0);
  const [comment, setComment] = useState('');
  const [events, setEvents] = useState([]); // State for storing events
  const [selectedEvent, setSelectedEvent] = useState(''); // State for selected event (eventName)
  const [roleRatings, setRoleRatings] = useState({
    registration: 0,
    waterManagement: 0,
    crowdManagement: 0,
    promotions: 0,
    refreshments: 0,
    helpDesk: 0,
  });

  // Fetch past events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/form/pastevent");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data); // Assuming data is an array of event objects
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get selected event's name based on the selectedEvent ID
    const selectedEventName = events.find(event => event.id === selectedEvent)?.eventName || '';

    // Create the data object to be sent to the backend (excluding eventId, only eventName)
    const reviewData = {
      eventName: selectedEventName, // Selected event name
      registrationDeskRating: roleRatings.registration, // Individual ratings
      waterManagementRating: roleRatings.waterManagement,
      crowdManagementRating: roleRatings.crowdManagement,
      promotionsRating: roleRatings.promotions,
      refreshmentsRating: roleRatings.refreshments,
      helpDeskRating: roleRatings.helpDesk,
      overallRating: overallRating, // Overall rating
      comment: comment, // User's comment
    };

    console.log(JSON.stringify(reviewData));

    try {
      const response = await fetch("http://localhost:8080/reviews/addreview", {
        method: "POST", // Use POST method
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify(reviewData), // Convert the data to JSON
      });

      if (!response.ok) {
        throw new Error('Failed to submit review'); // Handle response errors
      }

      console.log('Review submitted successfully:', reviewData);
    } catch (error) {
      console.error('Error submitting review:', error); // Handle submission errors
    }

    // Reset form fields
    setOverallRating(0);
    setComment('');
    setSelectedEvent('');
    setRoleRatings({
      registration: 0,
      waterManagement: 0,
      crowdManagement: 0,
      promotions: 0,
      refreshments: 0,
      helpDesk: 0,
    });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }} // Light gray background
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card variant="outlined" sx={{ padding: '20px', borderRadius: '10px', boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom align="center" color="primary">
              Write a Review
            </Typography>

            <form onSubmit={handleSubmit}>
              {/* Event Selection */}
              <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                <InputLabel id="event-select-label"  variant="body1" style={{ margin: '4px 0' }}>Select Past Event</InputLabel>
                <Select
                  labelId="event-select-label"
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  required
                  sx={{ borderRadius: '8px' }} // Rounded corners for dropdown
                >
                  {events.map((event) => (
                    <MenuItem key={event.id} value={event.id}>
                      {event.eventName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Role Ratings */}
              <Typography component="legend" color="textSecondary">Rate Your Experience</Typography>

              <Typography variant="subtitle1">Registration Desk</Typography>
              <Rating
                name="registration"
                value={roleRatings.registration}
                onChange={(event, newValue) => {
                  setRoleRatings({ ...roleRatings, registration: newValue });
                }}
                precision={0.5}
              />

              <Typography variant="subtitle1">Water Management</Typography>
              <Rating
                name="waterManagement"
                value={roleRatings.waterManagement}
                onChange={(event, newValue) => {
                  setRoleRatings({ ...roleRatings, waterManagement: newValue });
                }}
                precision={0.5}
              />

              <Typography variant="subtitle1">Crowd Management</Typography>
              <Rating
                name="crowdManagement"
                value={roleRatings.crowdManagement}
                onChange={(event, newValue) => {
                  setRoleRatings({ ...roleRatings, crowdManagement: newValue });
                }}
                precision={0.5}
              />

              <Typography variant="subtitle1">Promotions</Typography>
              <Rating
                name="promotions"
                value={roleRatings.promotions}
                onChange={(event, newValue) => {
                  setRoleRatings({ ...roleRatings, promotions: newValue });
                }}
                precision={0.5}
              />

              <Typography variant="subtitle1">Refreshments</Typography>
              <Rating
                name="refreshments"
                value={roleRatings.refreshments}
                onChange={(event, newValue) => {
                  setRoleRatings({ ...roleRatings, refreshments: newValue });
                }}
                precision={0.5}
              />

              <Typography variant="subtitle1">Help Desk</Typography>
              <Rating
                name="helpDesk"
                value={roleRatings.helpDesk}
                onChange={(event, newValue) => {
                  setRoleRatings({ ...roleRatings, helpDesk: newValue });
                }}
                precision={0.5}
              />

              <Typography component="legend" color="textSecondary">Overall Rating</Typography>
              <Rating
                name="overallRating"
                value={overallRating}
                onChange={(event, newValue) => {
                  setOverallRating(newValue);
                }}
                precision={0.5}
                sx={{ marginBottom: '20px' }}
              />

              {/* Review Comment Input */}
              <TextField
                label="Write your review"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                sx={{
                  marginBottom: '20px',
                  borderRadius: '8px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderRadius: '8px',
                    },
                  },
                }}
              />

              {/* Submit Button */}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ borderRadius: '8px', padding: '10px', fontWeight: 'bold' }}
              >
                Submit Review
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Review;

