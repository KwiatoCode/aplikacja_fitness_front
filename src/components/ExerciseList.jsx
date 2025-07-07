import React, { useState, useEffect } from 'react';
import { getExercises, deleteExercise } from '../api';

export default function ExerciseList({ token }) {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        getExercises(token).then(setExercises);
    }, [token]);

    const handleDelete = async id => {
        await deleteExercise(id, token);
        setExercises(prev => prev.filter(ex => ex.id !== id));
    };

    return (
        <div className="exercise-list p-4">
            <h3 className="text-xl font-bold mb-4">Lista ćwiczeń</h3>
            {exercises.map(ex => (
                <div key={ex.id} className="p-4 mb-3 bg-gray-100 rounded-lg shadow">
                    <div className="font-bold text-lg">{ex.name}</div>
                    <div className="text-sm text-gray-700">{ex.description}</div>
                    <div className="text-xs text-blue-500">Kategoria: {ex.category}</div>
                    <button
                        className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                        onClick={() => handleDelete(ex.id)}
                    >
                        Usuń
                    </button>
                </div>
            ))}
        </div>
    );
}

