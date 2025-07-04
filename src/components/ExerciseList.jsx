import React, { useEffect, useState } from 'react';
import { getExercises, deleteExercise } from '../api';

export default function ExerciseList({ token }) {
    const [exercises, setExercises] = useState([]);
    const [info, setInfo] = useState('');

    useEffect(() => {
        getExercises(token).then(data => setExercises(data));
    }, [token]);

    const handleDelete = async (id) => {
        await deleteExercise(id, token);
        setExercises(exercises.filter(e => e.id !== id));
        setInfo('Usunięto ćwiczenie.');
        setTimeout(() => setInfo(''), 2000);
    };

    return (
        <div className="exercise-list">
            <h2>Lista ćwiczeń</h2>
            {info && <div className="info">{info}</div>}
            <ul className="exercise-ul">
                {(!exercises || exercises.length === 0) && <li>Brak ćwiczeń</li>}
                {exercises && exercises.map(e => (
                    <li key={e.id} className="exercise-li">
                        <div>
                            <span className="exercise-name">{e.name}</span>
                            <span className="exercise-category">[{e.category || 'brak kategorii'}]</span>
                        </div>
                        <div className="exercise-desc">{e.description}</div>
                        <button className="delete-btn" onClick={() => handleDelete(e.id)}>Usuń</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
