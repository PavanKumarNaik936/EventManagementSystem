// import React from "react";
// import { Link } from "react-router-dom";
// import { Box, Typography, Grid, TextField, IconButton, Divider } from "@mui/material";
// import SendIcon from '@mui/icons-material/Send';
// import CopyrightIcon from '@mui/icons-material/Copyright';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// const Footer = () => {
//   const QuickLinks = [
//     {
//       path: '/home',
//       display: 'Home'
//     },
//     {
//       path: '/events/pastevents',
//       display: 'Past Events'
//     },
//     {
//       path: '/events/futureevents',
//       display: 'Future Events'
//     },
//     {
//       path: '/gallery',
//       display: 'Gallery'
//     },
//     {
//       path: '/dashboard',
//       display: 'Dashboard'
//     },
//     {
//       path: '/about',
//       display: 'About Us'
//     },
//   ];

//   return (
//     <Box 
//       sx={{ 
//         background: 'linear-gradient(#800000,#620000,#2A0001)', 
//         padding: '20px 50px', 
//         mt: '2rem',
//         color: 'rgb(195, 188, 188)'
//       }}
//     >
//       <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'space-around', lineHeight: '1.8rem' }}>
        
//         {/* Logo and Introduction Section */}
//         <Grid item xs={12} md={3}>
//           <Typography variant="h4" component={Link} to="/home" sx={{ textDecoration: 'none', color: 'rgb(250, 245, 245)' }}>
//             Event<br />Manager
//           </Typography>
//           <Typography variant="body1" sx={{color: 'rgba(255, 255, 255, 0.747)', mt: 2 }}>
//             Welcome to Event Management portal! We are dedicated to making your events memorable and successful.
//             Our team of professionals ensures that every detail is taken care of.
//           </Typography>
//         </Grid>
        
//         {/* Quick Links Section */}
//         <Grid item xs={12} md={3}>
//           <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
//             Quick Links
//           </Typography>
//           <Box className="quick_links" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//             {QuickLinks.map((item, index) => (
//               <Link 
//                 key={index} 
//                 to={item.path} 
//                 style={{ 
//                   textDecoration: 'none', 
//                   color: 'rgba(255, 255, 255, 0.747)' 
//                 }}
//               >
//                 {item.display}
//               </Link>
//             ))}
//           </Box>
//         </Grid>

//         {/* Head Office Section */}
//         <Grid item xs={12} md={3} sx={{ color: 'rgba(255, 255, 255, 0.747)' }}> 
//           <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
//             Head Office
//           </Typography>
//           <Typography sx={{color: 'rgba(255, 255, 255, 0.747)' }} variant="body1">xxxxx xx, xxxxxx</Typography>
//           <Typography sx={{color: 'rgba(255, 255, 255, 0.747)' }} variant="body1">Phone: +91 8688467417</Typography>
//           <Typography sx={{color: 'rgba(255, 255, 255, 0.747)' }} variant="body1">Email: xyz@gmail.com</Typography>
//           <Typography sx={{color: 'rgba(255, 255, 255, 0.747)' }} variant="body1">Office Time: 10am-7pm</Typography>
//         </Grid>

//         {/* Newsletter Section */}
//         <Grid item xs={12} md={3}>
//           <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
//             Newsletter
//           </Typography>
//           <Typography variant="body1" sx={{ color: 'white' }}>Subscribe to our newsletter</Typography>
//           <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, background: 'rgb(55, 55, 150,0.8)', padding: '1px 20px', borderRadius: '50px' }}>
//             <TextField
//               variant="outlined"
//               placeholder="Email"
//               size="small"
//               InputProps={{
//                 sx: {
//                   flex: 1,
//                   color: '#fff', // Text color
//                   '& .MuiOutlinedInput-notchedOutline': {
//                     borderColor: 'transparent', // Remove default border
//                   },
//                   '&:hover .MuiOutlinedInput-notchedOutline': {
//                     borderColor: 'transparent', // Remove border on hover
//                   },
//                   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                     borderColor: 'transparent', // Remove blue border on focus
//                   },
//                   'input::placeholder': {
//                     fontSize: '.8rem',
//                     color: 'rgba(255,255,255,0.747)', // Placeholder color
//                   },
//                 },
//               }}
//             />
//             <IconButton sx={{ color: 'rgba(255,255,255,0.747)' }}>
//               <SendIcon />
//             </IconButton>
//           </Box>
//            {/* Social Media Icons Section */}
//            <Typography variant="h6" noWrap sx={{ color: 'white',fontWeight:'bold', mt: 2 ,ml:7}}> Follow Us</Typography>
//            <Grid item xs={12} md={3} sx={{ width: '100%' }}>
          

//   <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'nowrap', gap: 1 }}>
//     <IconButton href="https://www.linkedin.com" target="_blank" sx={{ color: 'rgba(255,255,255,0.747)' }}>
//       <LinkedInIcon />
//     </IconButton>
//     <IconButton href="https://www.instagram.com" target="_blank" sx={{ color: 'rgba(255,255,255,0.747)' }}>
//       <InstagramIcon />
//     </IconButton>
//     <IconButton href="https://www.twitter.com" target="_blank" sx={{ color: 'rgba(255,255,255,0.747)' }}>
//       <TwitterIcon />
//     </IconButton>
//     <IconButton href="https://www.facebook.com" target="_blank" sx={{ color: 'rgba(255,255,255,0.747)' }}>
//       <FacebookIcon />
//     </IconButton>
//     <IconButton href="https://wa.me/yourwhatsappnumber" target="_blank" sx={{ color: 'rgba(255,255,255,0.747)' }}>
//       <WhatsAppIcon />
//     </IconButton>
//   </Box>
// </Grid>

//         </Grid>

       
//       </Grid>

//       {/* Footer Bottom Section */}
//       <Divider sx={{ my: 1, backgroundColor: 'rgba(255,255,255,0.1)' }} />
//       <Box sx={{ textAlign: 'center', py: 2, color: 'rgb(250, 245, 245)' }}>
//         <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.747)' }}>
//           <CopyrightIcon sx={{ fontSize: 'small', mr: 0.5 }} />
//           {`Copyright 2024, developed by codeX. All rights reserved.`}
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default Footer;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid, TextField, IconButton, Divider } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import CopyrightIcon from '@mui/icons-material/Copyright';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
  // State to hold the email input
  const [email, setEmail] = useState('');

  const QuickLinks = [
    {
      path: '/home',
      display: 'Home'
    },
    {
      path: '/events/pastevents',
      display: 'Past Events'
    },
    {
      path: '/events/futureevents',
      display: 'Future Events'
    },
    {
      path: '/gallery',
      display: 'Gallery'
    },
    {
      path: '/dashboard',
      display: 'Dashboard'
    },
    {
      path: '/about',
      display: 'About Us'
    },
  ];

  // Function to handle email submission
  const handleSubscribe = async () => {
    if (email.trim() === '') {
      alert('Please enter a valid email.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/footer/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('Subscription successful!');
        setEmail('');  // Clear the email input
      } else {
        alert('Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <Box 
      sx={{ 
        background: 'linear-gradient(#800000,#620000,#2A0001)', 
        padding: '20px 50px', 
        mt: '2rem',
        color: 'rgb(195, 188, 188)'
      }}
    >
      <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'space-around', lineHeight: '1.8rem' }}>
        
        {/* Logo and Introduction Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="h4" component={Link} to="/home" sx={{ textDecoration: 'none', color: 'rgb(250, 245, 245)' }}>
            Event<br />Management System
          </Typography>
          <Typography variant="body1" sx={{color: 'rgba(255, 255, 255, 0.747)', mt: 2 }}>
            Welcome to Event Management portal! We are dedicated to making your events memorable and successful.
            Our team of professionals ensures that every detail is taken care of.
          </Typography>
        </Grid>
        
        {/* Quick Links Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
            Quick Links
          </Typography>
          <Box className="quick_links" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {QuickLinks.map((item, index) => (
              <Link 
                key={index} 
                to={item.path} 
                style={{ 
                  textDecoration: 'none', 
                  color: 'rgba(255, 255, 255, 0.747)' 
                }}
              >
                {item.display}
              </Link>
            ))}
          </Box>
        </Grid>

        {/* Head Office Section */}
        <Grid item xs={12} md={3} sx={{ color: 'rgba(255, 255, 255, 0.747)' }}> 
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
            Head Office
          </Typography>
          <Typography sx={{color: 'rgba(255, 255, 255, 0.747)' }} variant="body1">RGUKT RKValley</Typography>
          <Typography sx={{color: 'rgba(255, 255, 255, 0.747)' }} variant="body1">Phone: +91 8688467417</Typography>
          <Typography sx={{color: 'rgba(255, 255, 255, 0.747)' }} variant="body1">Email: xyz@gmail.com</Typography>
          <Typography sx={{color: 'rgba(255, 255, 255, 0.747)' }} variant="body1">Office Time: 10am-7pm</Typography>
        </Grid>

        {/* Newsletter Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
            Newsletter
          </Typography>
          <Typography variant="body1" sx={{ color: 'white' }}>Subscribe to our newsletter</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, background: 'rgb(55, 55, 150,0.8)', padding: '1px 20px', borderRadius: '50px' }}>
            <TextField
              variant="outlined"
              placeholder="Email"
              size="small"
              value={email} // bind input value to state
              onChange={(e) => setEmail(e.target.value)} // handle input change
              InputProps={{
                sx: {
                  flex: 1,
                  color: '#fff', // Text color
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent', // Remove default border
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent', // Remove border on hover
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent', // Remove blue border on focus
                  },
                  'input::placeholder': {
                    fontSize: '.8rem',
                    color: 'rgba(255,255,255,0.747)', // Placeholder color
                  },
                },
              }}
            />
            <IconButton sx={{ color: 'rgba(255,255,255,0.747)' }} onClick={handleSubscribe}>
              <SendIcon />
            </IconButton>
          </Box>
          {/* Social Media Icons Section */}
          <Typography variant="h6" noWrap sx={{ color: 'white',fontWeight:'bold', mt: 2 ,ml:7}}> Follow Us</Typography>
          <Grid item xs={12} md={3} sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'nowrap', gap: 1 }}>
              <IconButton href="https://www.linkedin.com" target="_blank" sx={{ color: 'rgba(255,255,255,0.747)' }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton href="https://www.instagram.com" target="_blank" sx={{ color: 'rgba(255,255,255,0.747)' }}>
                <InstagramIcon />
              </IconButton>
              <IconButton href="https://www.twitter.com" target="_blank" sx={{ color: 'rgba(255,255,255,0.747)' }}>
                <TwitterIcon />
              </IconButton>
              <IconButton href="https://www.facebook.com" target="_blank" sx={{ color: 'rgba(255,255,255,0.747)' }}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="https://wa.me/yourwhatsappnumber" target="_blank" sx={{ color: 'rgba(255,255,255,0.747)' }}>
                <WhatsAppIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      {/* Footer Bottom Section */}
      <Divider sx={{ my: 1, backgroundColor: 'rgba(255,255,255,0.1)' }} />
      <Box sx={{ textAlign: 'center', py: 2, color: 'rgb(250, 245, 245)' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.747)' }}>
          <CopyrightIcon sx={{ fontSize: 'small', mr: 0.5 }} />
          {new Date().getFullYear()} Event Manager. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
 