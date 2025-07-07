import React, { useEffect, useState } from 'react';
import {
    getTrainings,
    addTraining,
    updateTraining,
    deleteTraining,
    getExercises
} from '../api';

export default function TrainingsPage({ token }) {
    const [trainings, setTrainings] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [name, setName] = useState('');
    const [exerciseIds, setExerciseIds] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editExerciseIds, setEditExerciseIds] = useState([]);
    const [info, setInfo] = useState('');
    const [error, setError] = useState('');

    // Pobierz treningi i ćwiczenia na starcie
    useEffect(() => {
        getTrainings(token).then(setTrainings);
        getExercises(token).then(setExercises);
    }, [token]);

    const handleAdd = async e => {
        e.preventDefault();
        setInfo('');
        setError('');
        try {
            await addTraining({ name, exerciseIds }, token);
            setName('');
            setExerciseIds([]);
            setInfo('Dodano trening');
            setTimeout(() => setInfo(''), 1200);
            getTrainings(token).then(setTrainings);
        } catch (err) {
            setError(err.message || 'Błąd dodawania treningu');
        }
    };

    const handleDelete = async id => {
        if (!window.confirm('Usunąć ten trening?')) return;
        await deleteTraining(id, token);
        getTrainings(token).then(setTrainings);
    };

    const handleEdit = (training) => {
        setEditId(training.id);
        setEditName(training.name);
        setEditExerciseIds(training.exercises.map(e => e.id));
    };

    const handleEditSubmit = async e => {
        e.preventDefault();
        await updateTraining(editId, { name: editName, exerciseIds: editExerciseIds }, token);
        setEditId(null);
        getTrainings(token).then(setTrainings);
    };

    const isChecked = (ids, eid) => ids.includes(eid);

    return (
        <div className="form" style={{ maxWidth: 800 }}>
            <h2>Nowy trening</h2>
            <form onSubmit={handleAdd} style={{ marginBottom: 36 }}>
                <input
                    type="text"
                    placeholder="Nazwa treningu"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <div style={{ margin: '16px 0' }}>
                    <b>Ćwiczenia:</b>
                    <div style={{
                        display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: 8
                    }}>
                        {exercises.map(ex => (
                            <label key={ex.id} style={{ display: 'flex', alignItems: 'center', background: '#232946', borderRadius: 7, padding: '4px 11px' }}>
                                <input
                                    type="checkbox"
                                    checked={exerciseIds.includes(ex.id)}
                                    onChange={e =>
                                        setExerciseIds(ids => e.target.checked
                                            ? [...ids, ex.id]
                                            : ids.filter(i => i !== ex.id))
                                    }
                                    style={{ marginRight: 7 }}
                                />
                                {ex.name}
                            </label>
                        ))}
                    </div>
                </div>
                <button type="submit">Dodaj trening</button>
            </form>

            {info && <div className="info">{info}</div>}
            {error && <div className="error">{error}</div>}

            <h2>Twoje treningi</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {trainings.map(tr => (
                    <li key={tr.id} className="glass-card" style={{
                        margin: '0 0 24px 0',
                        border: '1px solid #25395a',
                        padding: '18px 16px',
                        borderRadius: 15,
                        background: 'rgba(22,26,44,0.85)'
                    }}>
                        {editId === tr.id ? (
                            <form onSubmit={handleEditSubmit}>
                                <input
                                    value={editName}
                                    onChange={e => setEditName(e.target.value)}
                                    style={{ marginBottom: 8 }}
                                    required
                                />
                                <div style={{
                                    display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: 10
                                }}>
                                    {exercises.map(ex => (
                                        <label key={ex.id} style={{ display: 'flex', alignItems: 'center', background: '#232946', borderRadius: 7, padding: '3px 9px' }}>
                                            <input
                                                type="checkbox"
                                                checked={isChecked(editExerciseIds, ex.id)}
                                                onChange={e =>
                                                    setEditExerciseIds(ids => e.target.checked
                                                        ? [...ids, ex.id]
                                                        : ids.filter(i => i !== ex.id))
                                                }
                                                style={{ marginRight: 7 }}
                                            />
                                            {ex.name}
                                        </label>
                                    ))}
                                </div>
                                <button type="submit">Zapisz</button>
                                <button type="button" onClick={() => setEditId(null)} style={{ marginLeft: 8 }}>Anuluj</button>
                            </form>
                        ) : (
                            <>
                                <b style={{ fontSize: '1.13em', color: '#4acaff' }}>{tr.name}</b>
                                <div style={{ margin: '8px 0 3px 0' }}>
                                    <b>Ćwiczenia:</b>
                                    <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                                        {(tr.exercises || []).map(ex => (
                                            <li key={ex.id} style={{ color: '#c1ebff', fontSize: '1em', margin: '2px 0' }}>
                                                <span style={{ color: '#5cf7ff', marginRight: 6 }}>•</span>
                                                <span>{ex.name}</span>
                                                {ex.category && (
                                                    <span style={{ color: '#a8a4ff', marginLeft: 8, fontSize: '.98em' }}>
                            ({ex.category})
                          </span>
                                                )}
                                                {ex.description && (
                                                    <span style={{ color: '#ffe09c', marginLeft: 6, fontSize: '.93em' }}>
                            {ex.description}
                          </span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button onClick={() => handleEdit(tr)}>Edytuj</button>
                                <button onClick={() => handleDelete(tr.id)} style={{ marginLeft: 9, background: '#a3192c' }}>Usuń</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

