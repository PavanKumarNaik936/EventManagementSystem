import React from 'react';
// import './eventHstyle.css'; // Import your custom CSS file
import '../styles/resources.css'

const Resources = () => {
    return (
        <section id="vendors">
            <div className="section-content">
                <h2>Vendor Details</h2>

                <div className="vendor-card">
                    <h3 className='title'>Lights Vendor: Lumina Lighting</h3>
                    <p><strong>Contact:</strong> John Doe, 555-1234</p>
                    <p><strong>Location:</strong> 123 Bright Ave, Light City</p>
                    <p><strong>Service Type:</strong> Lighting Solutions</p>
                </div>

                <div className="vendor-card">
                    <h3 className='title'>Catering Vendor: Gourmet Eats</h3>
                    <p><strong>Contact:</strong> Jane Smith, 555-5678</p>
                    <p><strong>Location:</strong> 456 Delicious Rd, Food Town</p>
                    <p><strong>Service Type:</strong> Catering Services</p>
                </div>

                <div className="vendor-card">
                    <h3 className='title'>Sound System Vendor: Sonic Sounds</h3>
                    <p><strong>Contact:</strong> Mike Johnson, 555-9101</p>
                    <p><strong>Location:</strong> 789 Audio Ln, Sound City</p>
                    <p><strong>Service Type:</strong> Sound Systems</p>
                </div>

                <div className="vendor-card">
                    <h3 className='title'>Furniture Vendor: FurniPlace</h3>
                    <p><strong>Contact:</strong> Emily Davis, 555-1213</p>
                    <p><strong>Location:</strong> 101 Comfort St, Furniture City</p>
                    <p><strong>Service Type:</strong> Event Furniture</p>
                </div>

                <div className="vendor-card">
                    <h3 className='title'>Decoration Vendor: Elegant Decor</h3>
                    <p><strong>Contact:</strong> Robert Brown, 555-1415</p>
                    <p><strong>Location:</strong> 202 Decor Blvd, Elegance City</p>
                    <p><strong>Service Type:</strong> Event Decorations</p>
                </div>

            </div>
        </section>
    );
};

export default Resources;
