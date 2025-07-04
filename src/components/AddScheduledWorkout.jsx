import React, { useState } from 'react';
import { addScheduledWorkout } from '../api';

export default function AddScheduledWorkout({ token, onAdded }) {
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');
    const [info, setInfo] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setInfo('');
        setError('');
        const workout = {
            date,
            duration: Number(duration),
            scheduledExercises: [], // Tu możesz rozbudować w przyszłości
        };
        const res = await addScheduledWorkout(workout, token);
        if (res && res.id) {
            setInfo('Dodano trening!');
            setError('');
            setDate('');
            setDuration('');
            if (onAdded) onAdded();
        } else {
            setError('Błąd dodawania treningu');
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>Dodaj zaplanowany trening</h2>
            <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Czas trwania (minuty)"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                min={1}
            />
            <button type="submit">Dodaj trening</button>
            {info && <div className="info">{info}</div>}
            {error && <div className="error">{error}</div>}
        </form>
    );
}

