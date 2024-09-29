import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const EventsDisplay = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEventList, setShowEventList] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/events');
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  const toggleEventList = () => {
    setShowEventList(!showEventList);
  };

  return (
    <div className="user-event-display">
      <h1>User Event Calendar</h1>
      <div className="calendar-container">
        {loading ? (
          <div>Loading events...</div>
        ) : (
          <Calendar
            localizer={localizer}
            events={events.map(event => ({
              ...event,
              start: new Date(event.start),
              end: new Date(event.end)
            }))}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
          />
        )}
      </div>
      <div className={`event-list-container ${showEventList ? 'show' : ''}`}>
        <div className="event-list">
          <h2>Events</h2>
          <ul>
            {events.map((event) => (
              <li key={event._id}>
                <strong>{event.title}</strong> - {moment(event.start).format('MMMM Do YYYY, h:mm a')} to{' '}
                {moment(event.end).format('MMMM Do YYYY, h:mm a')}
              </li>
            ))}
          </ul>
        </div>
        <button className="toggle-button" onClick={toggleEventList}>
          {showEventList ? 'Hide Events' : 'Show Events'}
        </button>
      </div>

      <style jsx>{`
        .user-event-display {
          max-width: 800px;
          margin: auto;
          padding: 20px;
        }

        .calendar-container {
          height: 500px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .event-list-container {
          position: relative;
          overflow: hidden;
        }

        .event-list {
          height: 300px;
          overflow-y: auto;
          transition: height 0.3s;
        }

        .event-list.show {
          height: 100px;
        }

        .event-list h2 {
          margin-bottom: 10px;
        }

        .event-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .event-list li {
          margin-bottom: 5px;
        }

        .toggle-button {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          padding: 5px 10px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default EventsDisplay;
