import React from 'react';
// import './AboutUs.css'; // Import your custom CSS file
import '../styles/about.css'
const About = () => {
    return (
        <section id="about-us">
            <div className="section-content">
                <div className="hero">
                    <h1>About Us</h1>
                    <p>Welcome to the Event Management portal! We are dedicated to making your events memorable and successful. Our team of professionals ensures that every detail is taken care of.</p>
                </div>

                <div className="team-member">
                    <h3>Bingi Ramesh</h3>
                    <p><strong>Role:</strong> Event Organizer</p>
                    <p><strong>Email:</strong> bingiram@example.com</p>
                </div>

                <div className="team-member">
                    <h3>John Smith</h3>
                    <p><strong>Role:</strong> Event Coordinator</p>
                    <p><strong>Email:</strong> john.smith@example.com</p>
                </div>

                <div className="team-member">
                    <h3>Emily Johnson</h3>
                    <p><strong>Role:</strong> Resource Manager</p>
                    <p><strong>Email:</strong> emily.johnson@example.com</p>
                </div>
            </div>
        </section>
    );
};

export default About;
