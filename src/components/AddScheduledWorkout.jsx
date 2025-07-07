import React, { useEffect, useState } from 'react';
import { getExercises, addScheduledWorkout } from '../api';

export default function AddScheduledWorkout({ token, initialDate, onAdded }) {
    const [exercises, setExercises] = useState([]);
    const [selectedExerciseId, setSelectedExerciseId] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState(initialDate);

    useEffect(() => {
        getExercises(token).then(setExercises);
    }, [token]);

    useEffect(() => {
        setDate(initialDate);
    }, [initialDate]);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await addScheduledWorkout(
                { date, scheduledExercises: [{ exercise: { id: +selectedExerciseId }, durationMinutes: +duration }] },
                token
            );
            setDuration('');
            setSelectedExerciseId('');
            onAdded();
        } catch (err) {
            console.error('Add workout failed:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <label>
                Data:
                <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
            </label>
            <label>
                Ćwiczenie:
                <select value={selectedExerciseId} onChange={e => setSelectedExerciseId(e.target.value)} required>
                    <option value="">Wybierz…</option>
                    {exercises.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
                </select>
            </label>
            <label>
                Czas (min):
                <input type="number" value={duration} onChange={e => setDuration(e.target.value)} min="1" required />
            </label>
            <button type="submit">Dodaj trening</button>
        </form>
    );
}
