import React, { useEffect, useState } from 'react';
import { getSchedule } from '../api';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function ScheduleCalendar({ token, start, end }) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getSchedule(start, end, token).then(setEvents);
    }, [start, end, token]);

    const datesWithEvents = events.reduce((acc, workout) => {
        acc[new Date(workout.date).toDateString()] = workout.scheduledExercises.length;
        return acc;
    }, {});

    return (
        <div className="calendar-container shadow-lg p-4 rounded-lg bg-white">
            <Calendar
                tileContent={({ date, view }) =>
                    view === 'month' && datesWithEvents[date.toDateString()] ? (
                        <div className="event-count bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center mx-auto">
                            {datesWithEvents[date.toDateString()]}
                        </div>
                    ) : null
                }
            />
        </div>
    );
}
