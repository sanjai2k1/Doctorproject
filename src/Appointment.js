import React, { useEffect, useState } from 'react';
import './Appointment.css';
import axios from 'axios';

const doctors = [
  { name: 'Dr. Sanjai', image: '/images/Sanjai.jpg' },
  { name: 'Dr. Karuppiah', image: '/images/Karuppiah.jpg' },
  { name: 'Dr. Vijay', image: '/images/Vijay.jpg' },
  { name: 'Dr. Ikfan', image: '/images/Ikfan.jpg' },
  { name: 'Dr. Nirmal', image: '/images/Nirmal.jpg' },
  { name: 'Dr. Kavitha', image: 'https://th.bing.com/th/id/OIP.0ATUKUzvH0YCzUygxZFxLgAAAA?w=275&h=183&c=7&r=0&o=5&dpr=1.1&pid=1.7' },
];

const Appointment = () => {
  const [doctor,setDoctor] = useState()
  const [patient,setPatient] = useState()
  const getDoctor = async () => {

    const response = await axios.get("https://localhost:7146/api/Doctor/1")
    setDoctor(response.data)
  }

  const getPatient = async () => {

    const response = await axios.get("https://localhost:7146/api/Patient/1")
    setPatient(response.data)
    
  }
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


  useEffect(()=>{
    getDoctor()
    getPatient()
  },[])
  const validateForm = () => {
    const newErrors = {};

    if (!date) newErrors.date = 'Please select a date.';
    if (!time) newErrors.time = 'Please select a time.';
 

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      alert(`Appointment booked with Dr. ${doctor.name} on ${date} at ${time}`);
      setDate('');
      setTime('');
      setPatientName('');
      setEmail('');
      setMessage('');
      setErrors({});
      
    } else {
      setErrors(newErrors);
      return;
    }

    console.log("submitting..")
    const combinedDateTime = new Date(`${date}T${time}:00`); // Assuming the format is "yyyy-MM-ddTHH:mm:ss"
      
    // Convert it to ISO string (yyyy-MM-ddTHH:mm:ss) or customize as needed
    const formattedDateTime = combinedDateTime.toISOString();
    axios.post("https://localhost:7146/api/Bookings",{
      "bookingDate": formattedDateTime,
      "status": "Pending",
      "doctorId": doctor.doctorId,
      "patientId": patient.patientId,
      "message": message
    }).then((res)=>console.log(res))
  };

  return (
    <div className="appointment-container">
      <h2>Book an Appointment</h2>

      {doctor && (
        <div className="doctor-info">
          <img src =  {`data:image/jpg;base64,${doctor.imageData}`} alt={doctor.name} className="doctor-image" />
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
            value={patient ? patient.name : ""}
            onChange={(e) => setPatientName(e.target.value)}
          readOnly
          />
          {errors.patientName && <span className="error-text">{errors.patientName}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={patient ? patient.email : ""}
            onChange={(e) => setEmail(e.target.value)}
            readOnly
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
