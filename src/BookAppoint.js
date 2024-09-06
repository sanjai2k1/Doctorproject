import React from 'react';
import './BookAppoint.css'; // Ensure the CSS file is correctly linked

function BookAppoint() {
  return (
    <div className="breadcrumbs-container">
      <div className="banner-container">
        <div className="banner-content">
          <h1 className="banner-title">Book an Appointment</h1>
          <div className="banner-description">
            <p>
              Search for doctors by name, specialty, or condition from our comprehensive list of healthcare experts.
            </p>
          </div>
        </div>
        <div className="banner-image-container">
          <img
            id="banner-image"
            alt="Book an Appointment"
            className="banner-image"
            src="https://stgaccinwbsdevlrs01.blob.core.windows.net/newcorporatewbsite/page-banner-details/November2023/zlyTf662xOu1m25PAfVv.webp?w=1920&q=100"
          />
        </div>
      </div>

    </div>
  );
}

export default BookAppoint;
