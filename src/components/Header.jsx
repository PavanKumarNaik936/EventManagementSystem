import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton, Box, Drawer, List } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { UserContext } from './UserContext';
import '../styles/header.css';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './Header.css';
import HomeIcon from '@mui/icons-material/Home';
import { ListItem, ListItemText, ListItemIcon } from '@mui/material';
const navLinks = [
  { path: '/home', display: 'Home' },
  { path: '/resources', display: 'Resources' },
  { path: '/dashboard', display: 'Dashboard' },
  { path: '/gallery', display: 'Gallery' },
  { path: '/r', display: 'Reviews' },
  { path: '/about', display: 'About Us' },
];

const studentEventLinks = [
  { path: 'volunteer', display: 'Apply for Volunteering' },
  { path: 'pastevents', display: 'Past Events' },
  { path: 'futureevents', display: 'Future Events' },
];

const EventManagerEventLinks = [
  { path: 'addevents', display: 'Add new Event' },
  { path: 'pastevents', display: 'Past Events' },
  { path: 'futureevents', display: 'Future Events' },
];
const EventManagerVolunteeringLinks = [
  { path: 'assigned', display: 'Assigned' },
  { path: 'notassigned', display: 'Not Assigned' }
];
const facultyEventLinks = [
  { path: 'pastevents', display: 'Past Events' },
  { path: 'futureevents', display: 'Future Events' },
];

const Header = () => {
  const { role, setRole } = useContext(UserContext) || {};
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [volunteerAnchorEl, setVolunteerAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken');
    setRole(null);
  };

  useEffect(() => {
    if (role === null) {
      navigate('/');
    }
  }, [role, navigate]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleVolunteerMenuOpen = (event) => {
    setVolunteerAnchorEl(event.currentTarget);
  };

  const handleVolunteerMenuClose = () => {
    setVolunteerAnchorEl(null);
  };
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const getLinkStyle = ({ isActive }) => ({
    color: isActive ? 'gold' : 'inherit', // Change color for active link
  });


  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'maroon' }} >
      <Toolbar
        sx={{
          justifyContent: { xs: 'center', md: 'space-between' },
          
        }}
      >
        {/* Logo/Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: { xs: 1, md: 0 },
            textAlign: { xs: 'center', md: 'left' },
            fontFamily:"IBM Plex Sans, sans-serif", 
            fontWeight: "bold",
           fontStyle: "normal",
           fontSize:"26px"
          }}
        >
          Events
        </Typography>

        {/* Main Navigation Links for large screens */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Button color="inherit" component={NavLink} to="/home" style={getLinkStyle} sx={{fontSize:'15px'}}>
            <HomeIcon/>
          </Button>

          <Box
            onMouseEnter={handleMenuOpen}
            onMouseLeave={handleMenuClose}
            sx={{ display: 'inline-block' }}
          >
            <Button color="inherit"  sx={{fontSize:'15px'}}>Events</Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              MenuListProps={{ onMouseLeave: handleMenuClose }}
              sx={{ width: '170px' }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              {(role === 'student' ? studentEventLinks :
                role === 'eventmanager' ? EventManagerEventLinks : facultyEventLinks
              ).map((event, index) => (
                <MenuItem
                  key={index}
                  component={NavLink}
                  to={`/events/${event.path}`}
                  onClick={handleMenuClose}
                  sx={{
                    fontSize: '12px',
                    padding: '8px 12px',
                  
                  }}
                  style={getLinkStyle} // Apply active styles
                >
                  {event.display}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Volunteering Menu for Event Manager */}
{role === 'eventmanager' && (
  <Box
    onMouseEnter={handleVolunteerMenuOpen}
    onMouseLeave={handleVolunteerMenuClose}
    sx={{ display: 'inline-block',borderRadius:'20px' }}
  >
    <Button color="inherit"  sx={{fontSize:'15px'}}>Volunteering</Button>
    <Menu
      anchorEl={volunteerAnchorEl}
      open={Boolean(volunteerAnchorEl)}
      onClose={handleVolunteerMenuClose}
      MenuListProps={{ onMouseLeave: handleVolunteerMenuClose }}
      sx={{ width: '200px' ,marginLeft:'30px'}}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      {EventManagerVolunteeringLinks.map((subEvent, index) => (
        <MenuItem
          key={index}
          component={NavLink}
          to={`/volunteering/${subEvent.path}`}
          onClick={handleVolunteerMenuClose}
          sx={{
            fontSize: '12px',
            padding: '8px 12px',
          }}
          style={getLinkStyle} // Apply active styles
        >
          {subEvent.display}
        </MenuItem>
      ))}
    </Menu>
  </Box>
)}
          {navLinks.slice(1).map((item, index) => (
            <Button
              key={index}
              color="inherit"
              component={NavLink}
              to={item.path}
              style={getLinkStyle} // Apply active styles
              sx={{fontSize:'15px'}}
            >
              {item.display}
            </Button>
          ))}

          {/* Logout */}
          <Button color="inherit" onClick={handleLogout} startIcon={<ExitToAppIcon />}></Button>
        </Box>

        {/* Mobile Menu (Drawer) */}
<IconButton
  color="inherit"
  edge="start"
  onClick={toggleDrawer(true)}
  sx={{ display: { xs: 'flex', md: 'none' } }}
>
  <MenuIcon />
</IconButton>

<Drawer
  anchor="left"
  open={drawerOpen}
  onClose={toggleDrawer(false)}
>
  <Box
    sx={{ width: 250 }}
    role="presentation"
    onClick={toggleDrawer(false)}
    onKeyDown={toggleDrawer(false)}
  >
    <IconButton onClick={toggleDrawer(false)} sx={{ ml: 'auto' }}>
      <CloseIcon />
    </IconButton>
    <List>
      {/* Navigation Links */}
      {navLinks.map((item, index) => (
        <ListItem button key={index} component={NavLink} to={item.path} style={getLinkStyle}>
          <ListItemText primary={item.display} />
        </ListItem>
      ))}

      {/* Events Links Based on Role */}
      <ListItem>
      <ListItemText 
        primary="Events" 
        primaryTypographyProps={{ 
          sx: { fontWeight: 'bold' } 
        }}
      />
    </ListItem>

      {(role === 'student' ? studentEventLinks :
        role === 'eventmanager' ? EventManagerEventLinks : facultyEventLinks
      ).map((event, index) => (
        <ListItem button key={index} component={NavLink} to={`/events/${event.path}`} style={getLinkStyle}>
          <ListItemText primary={event.display} />
        </ListItem>
      ))}

      {/* Conditional Volunteering Links for Students */}
      <ListItem>
      <ListItemText 
        primary="Volunteering" 
        primaryTypographyProps={{ 
          sx: { fontWeight: 'bold' } 
        }}
      />
    </ListItem>
      {role === 'eventmanager' && EventManagerVolunteeringLinks.map((link, index) => (
        <ListItem button key={index} component={NavLink} to={`/volunteer/${link.path}`} style={getLinkStyle}>
          <ListItemText primary={link.display} />
        </ListItem>
      ))}

      {/* Logout */}
      <ListItem button onClick={handleLogout}>
      <ListItemIcon>
        <ExitToAppIcon /> {/* Add exit icon here */}
      </ListItemIcon>
      <ListItemText  />
    </ListItem>
    </List>
  </Box>
</Drawer>

      </Toolbar>
    </AppBar>
  );
};

export default Header;


// import React, { useContext, useState, useEffect } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton, Box, Drawer, List } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';
// import { UserContext } from './UserContext';
// import '../styles/header.css';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import { ListItem, ListItemText, ListItemIcon } from '@mui/material';

// const navLinks = [
//   { path: '/home', display: 'Home' },
//   { path: '/resources', display: 'Resources' },
//   { path: '/dashboard', display: 'Dashboard' },
//   { path: '/gallery', display: 'Gallery' },
//   { path: '/about', display: 'About Us' },
//   // Reviews link comes after About Us, check role before displaying it
//   { path: '/r', display: 'Reviews', roles: ['student', 'faculty'] },
// ];

// const studentEventLinks = [
//   { path: 'volunteer', display: 'Apply for Volunteering' },
//   { path: 'pastevents', display: 'Past Events' },
//   { path: 'futureevents', display: 'Future Events' },
// ];

// const EventManagerEventLinks = [
//   { path: 'addevents', display: 'Add new Event' },
//   { path: 'pastevents', display: 'Past Events' },
//   { path: 'futureevents', display: 'Future Events' },
// ];

// const EventManagerVolunteeringLinks = [
//   { path: 'assigned', display: 'Assigned' },
//   { path: 'notassigned', display: 'Not Assigned' },
// ];

// const facultyEventLinks = [
//   { path: 'pastevents', display: 'Past Events' },
//   { path: 'futureevents', display: 'Future Events' },
// ];

// const Header = () => {
//   const { role, setRole } = useContext(UserContext) || {};
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [volunteerAnchorEl, setVolunteerAnchorEl] = useState(null);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('userRole');
//     localStorage.removeItem('authToken');
//     setRole(null);
//   };

//   useEffect(() => {
//     if (role === null) {
//       navigate('/');
//     }
//   }, [role, navigate]);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleVolunteerMenuOpen = (event) => {
//     setVolunteerAnchorEl(event.currentTarget);
//   };

//   const handleVolunteerMenuClose = () => {
//     setVolunteerAnchorEl(null);
//   };

//   const toggleDrawer = (open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }
//     setDrawerOpen(open);
//   };

//   const getLinkStyle = ({ isActive }) => ({
//     color: isActive ? 'gold' : 'inherit', // Change color for active link
//   });

//   return (
//     <AppBar position="fixed" sx={{ backgroundColor: 'maroon' }}>
//       <Toolbar
//         sx={{
//           justifyContent: { xs: 'center', md: 'space-between' },
//         }}
//       >
//         {/* Logo/Title */}
//         <Typography
//           variant="h6"
//           component="div"
//           sx={{
//             flexGrow: { xs: 1, md: 0 },
//             textAlign: { xs: 'center', md: 'left' },
//           }}
//         >
//           EventManager
//         </Typography>

//         {/* Main Navigation Links for large screens */}
//         <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
//           {navLinks.map((item, index) => 
//             (!item.roles || item.roles.includes(role)) && ( // Check if the link should be displayed based on the role
//               <Button
//                 key={index}
//                 color="inherit"
//                 component={NavLink}
//                 to={item.path}
//                 style={getLinkStyle} // Apply active styles
//               >
//                 {item.display}
//               </Button>
//             )
//           )}

//           {/* Events Menu */}
//           <Box
//             onMouseEnter={handleMenuOpen}
//             onMouseLeave={handleMenuClose}
//             sx={{ display: 'inline-block' }}
//           >
//             <Button color="inherit">Events</Button>
//             <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleMenuClose}
//               MenuListProps={{ onMouseLeave: handleMenuClose }}
//               sx={{ width: '170px' }}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//             >
//               {(role === 'student' ? studentEventLinks :
//                 role === 'eventmanager' ? EventManagerEventLinks : facultyEventLinks
//               ).map((event, index) => (
//                 <MenuItem
//                   key={index}
//                   component={NavLink}
//                   to={`/events/${event.path}`}
//                   onClick={handleMenuClose}
//                   sx={{
//                     fontSize: '12px',
//                     padding: '8px 12px',
//                   }}
//                   style={getLinkStyle} // Apply active styles
//                 >
//                   {event.display}
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>

//           {/* Volunteering Menu for Event Manager */}
//           {role === 'eventmanager' && (
//             <Box
//               onMouseEnter={handleVolunteerMenuOpen}
//               onMouseLeave={handleVolunteerMenuClose}
//               sx={{ display: 'inline-block', borderRadius: '20px' }}
//             >
//               <Button color="inherit">Volunteering</Button>
//               <Menu
//                 anchorEl={volunteerAnchorEl}
//                 open={Boolean(volunteerAnchorEl)}
//                 onClose={handleVolunteerMenuClose}
//                 MenuListProps={{ onMouseLeave: handleVolunteerMenuClose }}
//                 sx={{ width: '200px', marginLeft: '30px' }}
//                 anchorOrigin={{
//                   vertical: 'bottom',
//                   horizontal: 'left',
//                 }}
//                 transformOrigin={{
//                   vertical: 'top',
//                   horizontal: 'left',
//                 }}
//               >
//                 {EventManagerVolunteeringLinks.map((subEvent, index) => (
//                   <MenuItem
//                     key={index}
//                     component={NavLink}
//                     to={`/volunteering/${subEvent.path}`}
//                     onClick={handleVolunteerMenuClose}
//                     sx={{
//                       fontSize: '12px',
//                       padding: '8px 12px',
//                     }}
//                     style={getLinkStyle} // Apply active styles
//                   >
//                     {subEvent.display}
//                   </MenuItem>
//                 ))}
//               </Menu>
//             </Box>
//           )}

//           {/* Logout */}
//           <Button color="inherit" onClick={handleLogout} startIcon={<ExitToAppIcon />}></Button>
//         </Box>

//         {/* Mobile Menu (Drawer) */}
//         <IconButton
//           color="inherit"
//           edge="start"
//           onClick={toggleDrawer(true)}
//           sx={{ display: { xs: 'flex', md: 'none' } }}
//         >
//           <MenuIcon />
//         </IconButton>

//         <Drawer
//           anchor="left"
//           open={drawerOpen}
//           onClose={toggleDrawer(false)}
//         >
//           <Box
//             sx={{ width: 250 }}
//             role="presentation"
//             onClick={toggleDrawer(false)}
//             onKeyDown={toggleDrawer(false)}
//           >
//             <IconButton onClick={toggleDrawer(false)} sx={{ ml: 'auto' }}>
//               <CloseIcon />
//             </IconButton>
//             <List>
//               {/* Navigation Links */}
//               {navLinks.map((item, index) => 
//                 (!item.roles || item.roles.includes(role)) && ( // Check if the link should be displayed based on the role
//                   <ListItem button key={index} component={NavLink} to={item.path} style={getLinkStyle}>
//                     <ListItemText primary={item.display} />
//                   </ListItem>
//                 )
//               )}

//               {/* Events Links Based on Role */}
//               <ListItem>
//                 <ListItemText 
//                   primary="Events" 
//                   primaryTypographyProps={{ 
//                     sx: { fontWeight: 'bold' } 
//                   }}
//                 />
//               </ListItem>

//               {(role === 'student' ? studentEventLinks :
//                 role === 'eventmanager' ? EventManagerEventLinks : facultyEventLinks
//               ).map((event, index) => (
//                 <ListItem button key={index} component={NavLink} to={`/events/${event.path}`} style={getLinkStyle}>
//                   <ListItemText primary={event.display} />
//                 </ListItem>
//               ))}

//               {/* Conditional Volunteering Links for Students */}
//               <ListItem>
//                 <ListItemText 
//                   primary="Volunteering" 
//                   primaryTypographyProps={{ 
//                     sx: { fontWeight: 'bold' } 
//                   }}
//                 />
//               </ListItem>
//               {role === 'student' && studentEventLinks.map((event, index) => (
//                 <ListItem button key={index} component={NavLink} to={`/volunteering/${event.path}`} style={getLinkStyle}>
//                   <ListItemText primary={event.display} />
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         </Drawer>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;
