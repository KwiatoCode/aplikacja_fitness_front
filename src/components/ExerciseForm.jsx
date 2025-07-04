import React, { useState } from 'react';
import { addExercise } from '../api';

export default function ExerciseForm({ token }) {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [info, setInfo] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setInfo('');
        setError('');
        const res = await addExercise({ name, description: desc, category }, token);
        if (res.id) {
            setInfo('Dodano ćwiczenie!');
            setError('');
            setName('');
            setDesc('');
            setCategory('');
        } else {
            setError('Błąd dodawania ćwiczenia');
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>Dodaj ćwiczenie</h2>
            <input
                type="text"
                placeholder="Nazwa ćwiczenia"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Opis"
                value={desc}
                onChange={e => setDesc(e.target.value)}
            />
            <input
                type="text"
                placeholder="Kategoria (np. nogi, cardio...)"
                value={category}
                onChange={e => setCategory(e.target.value)}
            />
            <button type="submit">Dodaj</button>
            {info && <div className="info">{info}</div>}
            {error && <div className="error">{error}</div>}
        </form>
    );
}




