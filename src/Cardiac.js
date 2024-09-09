import React, { useEffect, useState } from 'react';
import './Cardiac.css';
import { Container } from 'react-bootstrap';
import axios from 'axios';

// FilterDropdown component definition
const FilterDropdown = ({ title, options, selectedOption, setSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="filter--item">
      <span 
        className={`filter--tab ${selectedOption ? 'active-filter' : ''}`} // Highlight if selected
        onClick={toggleDropdown}
      >
        <span>{title}</span>
        <span className="filter--arrow">{isOpen ? '▲' : '▼'}</span>
      </span>
      {isOpen && (
        <div className="filter--dropdown">
          {options.map((option, index) => (
            <div 
              key={index} 
              className={`filter--dropdown-item ${selectedOption === option ? 'selected' : ''}`} 
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor--card">
      <div className="doctor--card-body">
        <div className="doctor--card-header">
          <img
            alt={`${doctor.name} Image`}
            className="doctor--card-img"
            src={`data:image/jpg;base64,${doctor.image}`}
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
const SidebarFilter = ({ locations, specializations, organizations, onFilterChange, filters }) => {
  return (
    <div className="dashboard-container">
      <div id="doctor-desktop-filter" className="doctor--filters">
        <div className="doctor--filter-wrapper">
          <h2 className="filter--title">Doctor Search</h2>
          <div className="doctor--filters-tabs">
            <FilterDropdown
              title="Location/City"
              options={locations}
              selectedOption={filters.location}
              setSelectedOption={(value) => onFilterChange('location', value)}
            />
            <FilterDropdown
              title="Hospitals & Clinics"
              options={organizations}
              selectedOption={filters.organization}
              setSelectedOption={(value) => onFilterChange('organization', value)}
            />
            <FilterDropdown
              title="Speciality"
              options={specializations}
              selectedOption={filters.specialization}
              setSelectedOption={(value) => onFilterChange('specialization', value)}
            />
            <FilterDropdown
              title="Doctor's Gender"
              options={['Male', 'Female', 'Other']}
              selectedOption={filters.gender}
              setSelectedOption={(value) => onFilterChange('gender', value)}
            />
          </div>
          <span className="filter--apply-btn-container">
            <button type="button" className="filter--apply-btn" onClick={() => onFilterChange('clear')}>Clear Filter</button>
          </span>
        </div>
      </div>
    </div>
  );
};

// Main Cardiac component
const Cardiac = () => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [locations, setLocations] = useState([]);

  const [filters, setFilters] = useState({
    location: '',
    specialization: '',
    organization: '',
    gender: ''
  });

  const fetchDoctors = async () => {
    const response = await axios.get("https://localhost:7146/api/Doctor/");
    const data = response.data["$values"];

    const uniqueSpecializations = [...new Set(data.map(doctor => doctor.specialization))];
    setSpecializations(uniqueSpecializations);

    const uniqueOrganizations = [...new Set(data.map(doctor => doctor.organization))];
    setOrganizations(uniqueOrganizations);

    const uniqueLocations = [...new Set(data.map(doctor => doctor.location))];
    setLocations(uniqueLocations);

    const doctorsData = data.map(doctor => ({
      name: doctor.name,
      specialization: doctor.specialization,
      hospital: doctor.organization,
      image: doctor.imageData,
      availabilityDate: formatDate(doctor.availableFrom),
      gender: doctor.gender,
      location: doctor.location
    }));

    setDoctorsList(doctorsData);
    setFilteredDoctors(doctorsData);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const applyFilters = () => {
    let filtered = doctorsList;

    if (filters.location) {
      filtered = filtered.filter(doctor => doctor.location === filters.location);
    }
    if (filters.specialization) {
      filtered = filtered.filter(doctor => doctor.specialization === filters.specialization);
    }
    if (filters.organization) {
      filtered = filtered.filter(doctor => doctor.hospital === filters.organization);
    }
    if (filters.gender) {
      filtered = filtered.filter(doctor => doctor.gender === filters.gender);
    }

    setFilteredDoctors(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'clear') {
      setFilters({
        location: '',
        specialization: '',
        organization: '',
        gender: ''
      });
      setFilteredDoctors(doctorsList);
    } else {
      setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }));
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = getDayWithSuffix(date.getDate());
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
  };

  const getDayWithSuffix = (day) => {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1: return `${day}st`;
      case 2: return `${day}nd`;
      case 3: return `${day}rd`;
      default: return `${day}th`;
    }
  };

  return (
    <Container>
      <div className="row">
        <div className="col-md-3">
          <SidebarFilter
            locations={locations}
            specializations={specializations}
            organizations={organizations}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="col-md-9">
          <div className="cardiac-container">
            <div className="search-results-summary">
              <span className="font--family container--fluid mt--20 fs--18 font--normal display--block color--grey">
                {filteredDoctors.length} results found, from your search &nbsp;
                <strong>
                  <span className="font--bold fs--20 font--capitalize"> {filters.specialization ? `"${filters.specialization}" , ` : ''}  {filters.location ? `"${filters.location}" , ` : ''}  {filters.organization ? `"${filters.organization} , "` : ''} {filters.gender ? `"${filters.gender}"` : ''}</span>
                </strong>
              </span>
            </div>
            <div className="doctor--card-container">
              {filteredDoctors.length > 0 ? filteredDoctors.map((doctor, index) => (
                <DoctorCard key={index} doctor={doctor} />
              )) : "No results found."}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cardiac;
