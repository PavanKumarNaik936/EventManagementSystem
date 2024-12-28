import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Grid,
  Paper,
  IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material'; // Importing icons

const Resources = () => {
  const { role, setRole } = useContext(UserContext) || {};
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [vendorData, setVendorData] = useState({
    id: '', // Added id field
    name: '',
    location: '',
    service: '',
    contact: '',
    email: '',
  });
  const [currentVendorId, setCurrentVendorId] = useState(null); // Track the vendor being edited
  const [vendors, setVendors] = useState([]);

  // Handle logout
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

  // Fetch vendors from backend
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('http://localhost:8080/vendor/getVendor');
        if (!response.ok) {
          throw new Error('Failed to fetch vendors');
        }
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    fetchVendors();
  }, []);

  // Open modal for adding or editing vendor
  const handleOpenModal = (vendor = null) => {
    if (vendor) {
      setIsEditMode(true);
      setVendorData({
        id: vendor.id, // Populate id for editing
        name: vendor.name,
        location: vendor.location,
        service: vendor.service,
        contact: vendor.contact,
        email: vendor.email, // Populate email for editing
      });
      setCurrentVendorId(vendor.id); // Store vendor id for editing
    } else {
      setIsEditMode(false);
      setVendorData({ id: '', name: '', location: '', service: '', contact: '', email: '' });
    }
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentVendorId(null);
  };

  // Handle vendor form submission (Add or Edit)
  const handleSubmitVendor = () => {
    console.log(vendorData);
    const apiUrl = isEditMode
      ? `http://localhost:8080/vendor/update`
      : 'http://localhost:8080/vendor/add';

    fetch(apiUrl, {
      method: isEditMode ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vendorData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to save vendor');
        }
      })
      .then((data) => {
        if (isEditMode) {
          setVendors((prev) =>
            prev.map((vendor) => (vendor.id === currentVendorId ? data : vendor))
          );
        } else {
          setVendors([...vendors, data]); // Add new vendor to the list
        }
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Error saving vendor:', error);
      });
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
  };

  // Handle delete action
  const handleDeleteVendor = (vendor) => {
    fetch(`http://localhost:8080/vendor/deleteVendor`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vendor), // Send the whole vendor object as JSON
    })
      .then((response) => {
        if (response.ok) {
          setVendors(vendors.filter((v) => v.id !== vendor.id)); // Filter out the deleted vendor
        } else {
          throw new Error('Failed to delete vendor');
        }
      })
      .catch((error) => {
        console.error('Error deleting vendor:', error);
      });
  };

  return (
    <section id="vendors">
      <div className="section-content">
        <Typography variant="h4" gutterBottom align="center">
          Vendor Details
        </Typography>

        {/* Grid layout for vendor items */}
        <Grid container spacing={4} justifyContent="center">
          {vendors.map((vendor) => (
            <Grid item xs={12} key={vendor.id}>
              <Paper
                elevation={0}
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  padding: '20px',
                  margin: '20px auto',
                  borderRadius: '10px',
                  width: '40%',
                  boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {vendor.name}
                </Typography>
                <Typography variant="body1" style={{ margin: '4px 0' }}>
                  <strong>Location:</strong> {vendor.location}
                </Typography>
                <Typography variant="body1" style={{ margin: '4px 0' }}>
                  <strong>Service:</strong> {vendor.service}
                </Typography>
                <Typography variant="body1" style={{ margin: '4px 0' }}>
                  <strong>Contact:</strong> {vendor.contact}
                </Typography>
                <Typography variant="body1" style={{ margin: '4px 0' }}>
                  <strong>Email:</strong> {vendor.email}
                </Typography>

                <div>
                  {/* Only show Edit and Delete buttons if the role is 'eventmanager' */}
                  {role === 'eventmanager' && (
                    <>
                      <IconButton color="primary" onClick={() => handleOpenModal(vendor)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDeleteVendor(vendor)}>
                        <Delete />
                      </IconButton>
                    </>
                  )}
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Only show Add Vendor button if the role is 'eventmanager' */}
        {role === 'eventmanager' && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal()}
            sx={{ marginTop: 4, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          >
            Add Vendor
          </Button>
        )}

        {/* Dialog for Adding/Editing Vendor */}
        <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Typography variant="h6" align="center">
              {isEditMode ? 'Edit Vendor' : 'Add New Vendor'}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <TextField
              name="id"
              label="Vendor ID"
              fullWidth
              margin="normal"
              value={vendorData.id}
              onChange={handleInputChange}
            />
            <TextField
              name="name"
              label="Vendor Name"
              fullWidth
              margin="normal"
              value={vendorData.name}
              onChange={handleInputChange}
            />
            <TextField
              name="location"
              label="Location"
              fullWidth
              margin="normal"
              value={vendorData.location}
              onChange={handleInputChange}
            />
            <TextField
              name="service"
              label="Service Type"
              fullWidth
              margin="normal"
              value={vendorData.service}
              onChange={handleInputChange}
            />
            <TextField
              name="contact"
              label="Contact"
              fullWidth
              margin="normal"
              value={vendorData.contact}
              onChange={handleInputChange}
            />
            <TextField
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              value={vendorData.email}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmitVendor} color="primary">
              {isEditMode ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </section>
  );
};

export default Resources;

