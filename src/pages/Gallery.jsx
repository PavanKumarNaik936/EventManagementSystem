
import React, { useState, useEffect,useContext } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
// import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Hook to detect when element is in view
import ImageCard from './ImageCard';
import { Close } from '@mui/icons-material';
// import Header from '../components/Header'; // Import your header component if needed
import { useNavigate } from 'react-router-dom';
 import { UserContext } from '../components/UserContext';
 import './gallery.css'

const Gallery = () => {
  const { role, setRole } = useContext(UserContext) || {};
const navigate = useNavigate();
const handleLogout = () => {
  localStorage.removeItem('userRole');
  localStorage.removeItem('authToken');
  setRole(null);
};

// Redirect to login if no role is found
useEffect(() => {
  if (!role) {
    navigate('/');
  }
}, [role, navigate]);
  const [images, setImages] = useState([]); // State to store images fetched from backend
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    imageFile: null,
    imagePreview: null,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false); // For Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // To set Snackbar message

  // Fetch images from backend when the component mounts
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:8080/upload/all');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data); // Assuming data is an array of image objects
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file change for image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, imageFile: file, imagePreview: reader.result });
      };
      reader.readAsDataURL(file); // Convert image to base64 for preview
    }
  };

  // Handle removing the selected image
  const handleRemoveImage = () => {
    setFormData({ ...formData, imageFile: null, imagePreview: null });
  };

  // Handle form submission (sending MultipartFile data to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const dataToSend = new FormData();
    dataToSend.append('eventName', formData.eventName);
    dataToSend.append('description', formData.description);
    if (formData.imageFile) {
      dataToSend.append('file', formData.imageFile); // Append the image file
    }

    // Send data to the backend
    try {
      const response = await fetch('http://localhost:8080/upload/image', {
        method: 'POST',
        body: dataToSend, // Send FormData
      });
      if (!response.ok) {
        throw new Error('Failed to submit data'); // Handle non-200 responses
      }
      const data = await response.json();
      console.log('Success:', data);
      setOpenForm(false); // Close the form after successful submission
      setSnackbarMessage('Image uploaded successfully!'); // Set success message
      setSnackbarOpen(true); // Show Snackbar on success

      // Refetch images after submission to include the new image
      fetchImages();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Open form dialog
  const handleOpenForm = () => {
    setOpenForm(true);
  };

  // Close form dialog
  const handleCloseForm = () => {
    setOpenForm(false);
  };

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
console.log(role);
const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <>
      
      <Box sx={{  }}>
        <Grid container spacing={2} style={{
              backgroundImage: `url('/grybg4.jpeg')`,
              backgroundSize:'contain',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              minHeight: '100vh',   // Use minHeight to ensure it covers at least the full height of the viewport
              width: '100%',        // Full width of the container
              marginTop: '-90px',   // Offset margin if needed
              display: 'flex',      // Ensure flexbox layout for full stretch
              flexDirection: 'column',  // Align items vertically
              margin:'1px',
             // backgroundRepeat:'no-repeat'
            }}>
        <Grid container spacing={2}
            style={{
              display: 'flex',      // Ensure flexbox layout for full stretch
              flexDirection: 'column',  // Align items vertically
              padding:'30px'
            }}
          >
            <Typography
            variant="h2"
            sx={{
              color: 'black',
              textAlign: 'center',
              fontWeight: 'bold',
              fontFamily: '"Playfair Display","Dancing Script", serif', // Corrected fontFamily syntax
              fontStyle: 'normal',
              letterSpacing: '1px', // Add subtle letter spacing for a refined look
              lineHeight: '1.2', // Adjust line height for better readability
              textShadow: '4px 4px 5px white', // Add a white border effect to the text

            }}
          >
            Moments & Memories
          </Typography>

          <Grid container spacing={4}>
      {images.map((item, index) => (
        <ImageCard key={item.imageId} item={item} index={index} />
      ))}
    </Grid>
          
         {/* Add Image Button at the top */}
         {role==='null' || role==='student' || role==='faculty'?null:
          <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
              <Button variant="contained" color="primary" onClick={handleOpenForm}>Add Image </Button>
         
          </Box>}
        </Grid>

        {/* Add Image Form in a Dialog */}
        <Dialog open={openForm} onClose={handleCloseForm}>
          <DialogTitle>
            Add New Image
            <IconButton
              aria-label="close"
              onClick={handleCloseForm}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Event Name"
                name="eventName"
                fullWidth
                value={formData.eventName}
                onChange={handleInputChange}
                sx={{ marginBottom: '10px', fontSize: '12px' }} // Reduced size
                required
              />
              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={2}
                value={formData.description}
                onChange={handleInputChange}
                sx={{ marginBottom: '10px', fontSize: '12px' }} // Reduced size
                required
              />
              <Button
                variant="outlined"
                component="label"
                sx={{ marginBottom: '16px', fontSize: '12px' }} // Reduced size
              >
                Upload Image (jpg, jpeg, png)
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>

              {/* Image preview with an 'X' button to remove */}
              {formData.imagePreview && (
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    }}
                    onClick={handleRemoveImage}
                  >
                    <Close />
                  </IconButton>
                  <img
                    src={formData.imagePreview}
                    alt="Selected Preview"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '4px',
                      marginBottom: '10px',
                    }}
                  />
                </Box>
              )}

              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Snackbar for success message */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
        </Grid>
      </Box>
    </>
  );
};

export default Gallery;
