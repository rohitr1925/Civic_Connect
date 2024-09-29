import React, { useState } from 'react';
import axios from 'axios';

const AddEventCalendar = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    start: '',
    end: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/events', formData);
      alert('Event created successfully!');
      // Reset form fields after successful submission
      setFormData({
        title: '',
        description: '',
        location: '',
        start: '',
        end: ''
      });
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event. Please try again.');
    }
  };

  return (
    <div className="add-event-container">
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Start:</label>
          <input type="datetime-local" name="start" value={formData.start} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>End:</label>
          <input type="datetime-local" name="end" value={formData.end} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-btn">Create Event</button>
      </form>

      <style jsx>{`
        .add-event-container {
          max-width: 500px;
          margin: auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .event-form {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        label {
          font-weight: bold;
          margin-bottom: 5px;
        }

        input[type="text"], input[type="datetime-local"] {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
        }

        .submit-btn {
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          cursor: pointer;
          font-size: 16px;
        }

        .submit-btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default AddEventCalendar;
