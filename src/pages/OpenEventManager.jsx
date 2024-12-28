import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Container, Box } from "@mui/material";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom"; // For navigation
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "../styles/openEventManager.css";  // Ensure this path is correct
import { useMediaQuery } from '@mui/material';
import { useState } from "react";
const OpenEventManager = () => {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");  // Navigate to login page
  };
  const handleGalleryClick = () => {
    setSwipeUp(true); // Start swipe-up animation
    setTimeout(() => {
        navigate("/gallery1"); // Navigate to the gallery after animation
    }, 800); // 800ms animation duration
};

  const [swipeUp, setSwipeUp] = useState(false);

  return (
    <section className={`header ${swipeUp ? 'swipe-up' : ''}`} id="HOME">
      <AppBar position="fixed" sx={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar className="themain">
        <Box display="flex" alignItems="center" justifyContent={"space-around"} className="logo">
        <img src="rgukt.jpg" alt="RGUKT Logo" height="70" width="75" style={{ borderRadius: '40px' }} />
        <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
                color: 'white', 
                marginLeft: 2, 
                fontWeight: 'bold', 
                // font-family: "Prociono", serif;
                fontFamily: `'Ubuntu', Arial, sans-serif`  // Apply the Google font here
            }}
            >
            <span style={{ fontSize: '45px', display: 'block', fontFamily: `'Ubuntu', sans-serif` }}>EVENT</span>
            <span style={{ fontSize: '20px', marginTop: '-18px', display: 'block', fontFamily: `'Ubuntu', sans-serif` }}>MANAGEMENT</span>
        </Typography>

        </Box>

          <Box sx={{ flexGrow: 1,marginLeft:'-50px',display:'block' }} />
          <div className="nav-links">
            <ul>
            <li>
          <RouterLink to="/gallery1" onClick={handleGalleryClick}>  <Button
                onClick={() => navigate("/gallery")}
                sx={{
                textDecoration: 'none',
                fontFamily: `'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif`,
                fontSize: '18px',
                color: 'white',
                fontWeight: 'bold',
                display: {
                    xs: 'none', // Hide on extra-small screens (small devices)
                    sm: 'none', // Hide on small screens
                    md: 'block', // Show on medium and larger screens
                  },
                }}
                className="nav-link"
            >
                GALLERY
            </Button>
            </RouterLink>
            </li>

            <Button
            className="btnlogin" // Keep the className if you prefer using the external CSS
            sx={{
                // marginTop: '30px',
                color: 'white',
                fontSize: '18px',
                fontFamily: `'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif`,
                background: 'transparent',
                border: '2px solid orange',
                // padding: '18px',
                cursor: 'pointer',
                fontWeight: 'bold',
                '&:hover': {
                backgroundColor: 'orange',
                transition: '1s',
                },
                borderRadius:'20px'
            }}
            variant="outlined" // Since the CSS has border styling, we can remove this if needed
            color="inherit"
            endIcon={<ExitToAppIcon />}
            onClick={handleLoginClick}
            >
            Login
            </Button>

            </ul>
          </div>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box className="mid-text" textAlign="center"  >
           <Box  sx={{
    marginTop: {
      xs: '120px',   // Default margin for extra-small screens
    //   sm: '50px',  // Apply 50px margin-top for small screens and above
      md: '0px',   // Reset to 0px for medium and larger screens
    },
  }}>
           <Typography variant="h1" sx={{ color: 'white', fontWeight: 'bold'  ,fontSize:'50px !important',}}>
            Leaving a Lasting <span className="highlight">Legacy</span> at Every Event.
          </Typography>
          <Typography variant="body1" sx={{ color: 'white', marginTop: 2 }}>
            "A Successful Event Is Not Just About Meeting the Objectives,<br />
            But Also About Creating A Lasting Impression On the Attendees."
          </Typography>
        <Link to="/gallery1">  <Button variant="outlined" className="btnlogin" sx={{
                marginTop: '30px',
                color: 'white',
                fontSize: '18px',
                fontFamily: `'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif`,
                background: 'transparent',
                border: '2px solid orange',
                padding: '12px',
                cursor: 'pointer',
                fontWeight: 'bold',
                '&:hover': {
                backgroundColor: 'orange',
                transition: '1s',
                },
                // borderRadius:'20px'
            }}>
             {isSmallScreen ? 'Visit Our Gallery' : 'Visit Us To Know More'}
          </Button>
          </Link>
           </Box>
        </Box>
      </Container>
    </section>
  );
};

export default OpenEventManager;


