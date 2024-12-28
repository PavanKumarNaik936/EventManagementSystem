import React, { useContext, useState, useEffect } from 'react'; // Correct imports
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext'; // Ensure the correct path
import '../styles/header.css';

const navLinks = [
  { path: '/home', display: 'Home' },
  { path: '/events', display: 'Events' },
  { path: '/resources', display: 'Resources' },
  { path: '/dashboard', display: 'Dashboard' },
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVolunteeringDropdownOpen, setIsVolunteeringDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const toggleVolunteeringDropdown = () => {
    setIsVolunteeringDropdownOpen(!isVolunteeringDropdownOpen);
  };

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

  return (
    <header className="header">
      <div className="main_navbar">
        <div className="navigation_wrapper">
          <h3>EventManager</h3>
          <span className="mobile_menu"><i className="ri-menu-fill"></i></span>
          <div className="navigation">
            <div className="menu">
              {navLinks.map((item, index) => (
                item.display === 'Events' ? (
                  <div
                    className="nav_item dropdown"
                    key={index}
                    onMouseEnter={toggleDropdown}
                    onMouseLeave={toggleDropdown}
                  >
                    <NavLink
                      to={item.path}
                      style={{ color: 'white' }}
                      className={(navClass) =>
                        navClass.isActive ? 'nav_active nav_link' : 'nav_link'
                      }
                    >
                      {item.display}
                    </NavLink>
                    {isDropdownOpen && (
                      <ul className="dropdown_menu">
                        {(role === 'student' ? studentEventLinks : 
                          role === 'eventmanager' ? EventManagerEventLinks  : facultyEventLinks
                        ).map((event, index) => (
                          <li key={index} className="dropdown_item">
                            <NavLink
                              to={`/events/${event.path}`}
                              className="dropdown_link"
                            >
                              {event.display}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? 'nav_active nav_item' : 'nav_item'
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                )
              ))}
              {role === 'eventmanager' && (
                <div
                  className="nav_item dropdown"
                  onMouseEnter={toggleVolunteeringDropdown}
                  onMouseLeave={toggleVolunteeringDropdown}
                >
                  <span className="nav_link">Volunteering</span>
                  {isVolunteeringDropdownOpen && (
                    <ul className="dropdown_menu">
                      {EventManagerVolunteeringLinks.map((subEvent, index) => (
                        <li key={index} className="dropdown_item">
                          <NavLink
                            to={`/volunteering/${subEvent.path}`}
                            className="dropdown_link"
                          >
                            {subEvent.display}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
                <div className='logout'><button onClick={handleLogout}>Logout</button></div>
            </div>
                  
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
