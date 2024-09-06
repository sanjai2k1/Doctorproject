import React, { useState } from 'react';
import './Cardiac.css';
import { Container } from 'react-bootstrap';

// FilterDropdown component definition
const FilterDropdown = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="filter--item">
      <span className="filter--tab" onClick={toggleDropdown}>
        <span>{title}</span>
        <span className="filter--arrow">{isOpen ? '▲' : '▼'}</span>
      </span>
      {isOpen && (
        <div className="filter--dropdown">
          {options.map((option, index) => (
            <div key={index} className="filter--dropdown-item">
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// DoctorCard component definition
const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor--card">
      <div className="doctor--card-body">
        <div className="doctor--card-header">
          <img
            alt={`${doctor.name} Image`}
            className="doctor--card-img"
            src={doctor.image}
          />
          <div className="doctor--card-info">
            <button className="doctor--card-name">{doctor.name}</button>
            <div className="doctor--card-specialization">
              {doctor.specialization}
            </div>
          </div>
        </div>
        <div className="doctor--card-details">
          <div className="doctor--card-hospital">
            <strong>Hospital:</strong> {doctor.hospital}
          </div>
        </div>
        <div className="doctor--card-footer">
          <span className="doctor--card-availability">
            Available on {doctor.availabilityDate}
          </span>
          <button className="doctor--card-button">
            <span className="doctor--card-action">Book Appointment</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// SidebarFilter component definition
const SidebarFilter = () => {
  return (
    <div className="dashboard-container">
      <div id="doctor-desktop-filter" className="doctor--filters">
        <div className="doctor--filter-wrapper">
          <h2 className="filter--title">Doctor Search</h2>
          <div className="doctor--filters-tabs">
            <FilterDropdown
              title="Location/City"
              options={['New York', 'Los Angeles', 'Chicago', 'Houston']}
            />
            <FilterDropdown
              title="Hospitals & Clinics"
              options={['Hospital A', 'Clinic B', 'Hospital C']}
            />
            <FilterDropdown
              title="Speciality"
              options={['Cardiology', 'Dermatology', 'Neurology', 'Pediatrics']}
            />
            <FilterDropdown
              title="Doctor's Gender"
              options={['Male', 'Female', 'Other']}
            />
           
          </div>
          <span className="filter--apply-btn-container">
            <button type="button" className="filter--apply-btn">Clear Filter</button>
          </span>
        </div>
      </div>
    </div>
  );
};

// Main Cardiac component
const Cardiac = () => {
  const doctors = [
    {
      name: 'Dr. Sanjai',
      specialization: 'Cardiology',
      hospital: 'Rella Medical Centre, Chennai',
      image: '/images/Sanjai.jpg',
      availabilityDate: '5th Sep',
    },
    {
      name: 'Dr. Karuppiah',
      specialization: 'Cardiology',
      hospital: 'Jolen Clinic, Chennai City',
      image: '/images/Karupu.jpg',
      availabilityDate: '6th Sep',
    },
    {
      name: 'Dr. Vijay',
      specialization: 'Interventional Cardiology',
      hospital: 'Apollo Hospital, Chennai',
      image: '/images/vijay.jpeg',
      availabilityDate: '7th Sep',
    },
    {
      name: 'Dr. Ikfan',
      specialization: 'Cardiovascular Surgery',
      hospital: 'VK Hospital, Chennai',
      image: '/images/Ikfan.jpg',
      availabilityDate: '8th Sep',
    },
    {
      name: 'Dr. Nirmal',
      specialization: 'Pediatric Cardiology',
      hospital: 'Narayana Health, Chennai',
      image: '/images/Nirmal.jpg',
      availabilityDate: '9th Sep',
    },
    {
      name: 'Dr. Kavitha ',
      specialization: 'Electrophysiology',
      hospital: 'Hindu Mission Hospital, Chennai',
      image: 'https://th.bing.com/th/id/OIP.0ATUKUzvH0YCzUygxZFxLgAAAA?w=275&h=183&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      availabilityDate: '10th Sep',
    },
  ];

  return (
    <Container>
      <div className="row">
        <div className="col-md-3">
          <SidebarFilter />
        </div>
        <div className="col-md-9">
          <div className="cardiac-container">
            <div className="search-results-summary">
              <span className="font--family container--fluid mt--20 fs--18 font--normal display--block color--grey">
                {doctors.length} results found, from your search &nbsp;
                <strong>
                  <span className="font--bold fs--20 font--capitalize">“Cardiology”</span>
                </strong>
              </span>
            </div>
            <div className="doctor--card-container">
              {doctors.map((doctor, index) => (
                <DoctorCard key={index} doctor={doctor} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cardiac;
