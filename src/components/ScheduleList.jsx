import React, { useEffect, useState } from 'react';
import { getSchedule, deleteScheduledWorkout } from '../api';

export default function ScheduleList({ token, start, end }) {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState('');

    useEffect(() => {
        setLoading(true);
        getSchedule(start, end, token).then(data => {
            setWorkouts(data);
            setLoading(false);
        });
    }, [token, start, end]);

    const handleDelete = async (id) => {
        await deleteScheduledWorkout(id, token);
        setWorkouts(workouts.filter(w => w.id !== id));
        setInfo('Trening usunięty.');
        setTimeout(() => setInfo(''), 2000);
    };

    if (loading) return <div>Ładowanie...</div>;

    return (
        <div className="schedule-list">
            <h2>Zaplanowane treningi</h2>
            {info && <div className="info">{info}</div>}
            <ul className="schedule-ul">
                {(!workouts || workouts.length === 0) && <li>Brak treningów</li>}
                {workouts && workouts.map(workout => (
                    <li key={workout.id} className="schedule-li">
                        <div>
                            <span className="schedule-date">{workout.date}</span>
                            {/* Dodaj więcej pól jeśli chcesz */}
                            {workout.duration && (
                                <span className="schedule-duration">
                                    &nbsp;| {workout.duration} min
                                </span>
                            )}
                        </div>
                        <button className="delete-btn" onClick={() => handleDelete(workout.id)}>Usuń</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

