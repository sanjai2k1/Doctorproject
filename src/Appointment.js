import React, { useState } from 'react';
import './Appointment.css';

const doctors = [
  { name: 'Dr. Sanjai', image: '/images/Sanjai.jpg' },
  { name: 'Dr. Karuppiah', image: '/images/Karuppiah.jpg' },
  { name: 'Dr. Vijay', image: '/images/Vijay.jpg' },
  { name: 'Dr. Ikfan', image: '/images/Ikfan.jpg' },
  { name: 'Dr. Nirmal', image: '/images/Nirmal.jpg' },
  { name: 'Dr. Kavitha', image: 'https://th.bing.com/th/id/OIP.0ATUKUzvH0YCzUygxZFxLgAAAA?w=275&h=183&c=7&r=0&o=5&dpr=1.1&pid=1.7' },
];

const Appointment = ({ selectedDoctor }) => {
  const doctor = doctors.find((doc) => doc.name === selectedDoctor);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!date) newErrors.date = 'Please select a date.';
    if (!time) newErrors.time = 'Please select a time.';
    if (!patientName) newErrors.patientName = 'Please enter your name.';
    if (!email) {
      newErrors.email = 'Please enter your email.';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      alert(`Appointment booked with Dr. ${selectedDoctor} on ${date} at ${time}`);
      setDate('');
      setTime('');
      setPatientName('');
      setEmail('');
      setMessage('');
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="appointment-container">
      <h2>Book an Appointment</h2>

      {doctor && (
        <div className="doctor-info">
          <img src={doctor.image} alt={doctor.name} className="doctor-image" />
          <h3>{doctor.name}</h3>
        </div>
      )}

      <form className="appointment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Appointment Date</label>
          <input
            type="date"
            value={date}
            min={today} // Restrict selection to today and future dates
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && <span className="error-text">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label>Appointment Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          {errors.time && <span className="error-text">{errors.time}</span>}
        </div>

        <div className="form-group">
          <label>Patient Name</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
          {errors.patientName && <span className="error-text">{errors.patientName}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Additional Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="appointment-submit-btn">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default Appointment;
