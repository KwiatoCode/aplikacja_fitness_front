import React, { useEffect, useState } from 'react';
import { getExercises, addExercise, deleteExercise } from '../api';

export default function WorkoutsPage({ token, userId }) {
    const [exercises, setExercises] = useState([]);
    const [newExercise, setNewExercise] = useState({ name: '', category: '', description: '', rating: '', tags: '' });
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadExercises();
    }, []);

    const loadExercises = async () => {
        const data = await getExercises(token);
        setExercises(data);
    };

    const handleAdd = async () => {
        await addExercise(newExercise, token);
        setNewExercise({ name: '', category: '', description: '', rating: '', tags: '' });
        loadExercises();
    };

    const handleDelete = async (id) => {
        await deleteExercise(id, token);
        loadExercises();
    };

    const filtered = exercises
        .filter(ex =>
            ex.name.toLowerCase().includes(search.toLowerCase()) ||
            ex.category.toLowerCase().includes(search.toLowerCase()) ||
            (ex.tags || '').toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));

    return (
        <div className="exercise-list">
            <h2>Twoje treningi</h2>

            <input
                placeholder="Szukaj po nazwie, kategorii, tagach..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: '15px' }}
            />

            <div className="exercise-form">
                <input
                    placeholder="Nazwa"
                    value={newExercise.name}
                    onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                />
                <input
                    placeholder="Kategoria"
                    value={newExercise.category}
                    onChange={(e) => setNewExercise({ ...newExercise, category: e.target.value })}
                />
                <input
                    placeholder="Opis"
                    value={newExercise.description}
                    onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })}
                />
                <input
                    placeholder="Ocena (1-10)"
                    value={newExercise.rating}
                    onChange={(e) => setNewExercise({ ...newExercise, rating: e.target.value })}
                />
                <input
                    placeholder="Tagi (np. cardio, siłowy)"
                    value={newExercise.tags}
                    onChange={(e) => setNewExercise({ ...newExercise, tags: e.target.value })}
                />
                <button onClick={handleAdd}>Dodaj</button>
            </div>

            <ul>
                {filtered.map((ex) => (
                    <li key={ex.id}>
                        <div>
                            <b>{ex.name}</b> <span className="exercise-category">{ex.category}</span>
                            <div className="exercise-desc">{ex.description}</div>
                            {ex.rating && <div className="exercise-rating">Ocena: {ex.rating}/10</div>}
                            {ex.tags && <div className="exercise-tags">Tagi: {ex.tags}</div>}
                        </div>
                        <button className="delete-btn" onClick={() => handleDelete(ex.id)}>Usuń</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

