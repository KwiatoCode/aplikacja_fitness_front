import React, { useEffect, useState } from 'react';
import { getSchedule, deleteScheduledWorkout } from '../api';

export default function ScheduleList({ token, start, end }) {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        getSchedule(start, end, token).then(setWorkouts);
    }, [start, end, token]);

    const handleDelete = async id => {
        await deleteScheduledWorkout(id, token);
        setWorkouts(ws => ws.filter(w => w.id !== id));
    };

    if (!workouts.length) return <p>Brak treningów.</p>;

    return (
        <ul>
            {workouts.map(w => (
                <li key={w.id}>
                    {w.date} – <button onClick={() => handleDelete(w.id)}>Usuń</button>
                </li>
            ))}
        </ul>
    );
}

