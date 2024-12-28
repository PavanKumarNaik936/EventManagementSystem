
import React, { useEffect, useState } from 'react';
import '../styles/about.css';
const About = () => {
    const [eventManagers, setEventManagers] = useState([]);

    // Fetch data from backend using fetch API
    useEffect(() => {
        fetch('http://localhost:8080/event/getManager')
            .then(response => response.json())
            .then(data => setEventManagers(data))
            .catch(error => {
                console.error("There was an error fetching the event managers!", error);
            });
    }, []);

    return (
        <section id="about-us">
            <div className="section-content">
                <div className="hero">
                    <h1>About Us</h1>
                    <p>Welcome to the Event Management portal! We are dedicated to making your events memorable and successful. Our team of professionals ensures that every detail is taken care of.</p>
                </div>

                <div className="team-members">
                    {eventManagers.map(manager => (
                        <div className="team-member" key={manager.id}>
                            
                            <h3><strong>Name:</strong><b> {manager.firstname}{manager.lastname}</b></h3>
                            
                            <p><strong>Role:</strong> {manager.role}</p>
                            
                            <p><strong>Event Name:</strong> {manager.eventcode}</p>
                            <p><strong>Email:</strong> {manager.email}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Inline CSS styles for the component
const styles = `
    .section-content {
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center; /* Centering the content */
    }
    .hero {
        margin-bottom: 40px;
        text-align: center;
    }
    .team-members {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
    .team-member {
        border: 1px solid #ddd;
        padding: 20px;
        border-radius: 10px;
        width: 50%; /* Take up 50% of the width to center the card */
        max-width: 500px; /* Ensure the card doesn't get too wide */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        background-color: #fff;
        margin-bottom: 20px;
        text-align: center;
    }
    h1 {
        font-size: 2em;
        color: #333;
    }
    
    p {
        font-size: 1em;
        color: #555;
    }
`;

// Append styles to the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default About;
