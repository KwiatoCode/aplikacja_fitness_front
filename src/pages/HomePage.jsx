import React, { useEffect, useState } from 'react';
import { getSchedule } from '../api';

export default function HomePage({ token }) {
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Pobierz zaplanowane treningi z najbliższych 2 tygodni (dostosuj zakres jeśli chcesz)
        const today = new Date();
        const start = today.toISOString().slice(0, 10);
        const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);
        const end = endDate.toISOString().slice(0, 10);

        getSchedule(start, end, token)
            .then(res => setSchedule(res))
            .finally(() => setLoading(false));
    }, [token]);

    return (
        <div className="main-content">
            <h1 style={{
                textAlign: 'center',
                marginTop: 32,
                color: '#30d6ff',
                fontWeight: 900,
                letterSpacing: '-0.5px',
                textShadow: '0 2px 18px #44cfff23'
            }}>
                Twoje zaplanowane treningi
            </h1>
            {loading ? (
                <div className="info" style={{ margin: 42 }}>Ładowanie...</div>
            ) : schedule.length === 0 ? (
                <div className="info" style={{ margin: 42 }}>Brak zaplanowanych treningów!</div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
                    gap: '32px',
                    marginTop: '36px',
                    padding: '0 16px 36px 16px'
                }}>
                    {schedule.map(item => (
                        <div
                            key={item.id}
                            style={{
                                background: 'rgba(32,42,72,0.98)',
                                borderRadius: '18px',
                                boxShadow: '0 7px 26px #0ceaff1e, 0 2px 8px #161f402a',
                                padding: '28px 30px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                animation: 'glassFadeIn 0.62s cubic-bezier(.33,1.3,.34,1) both'
                            }}
                        >
                            <div style={{
                                fontWeight: 700,
                                fontSize: '1.18em',
                                color: '#4be0ff',
                                marginBottom: 5
                            }}>
                                {item.date && (new Date(item.date)).toLocaleDateString('pl-PL')}
                            </div>
                            <div style={{
                                fontSize: '1.25em',
                                fontWeight: 800,
                                color: '#fcfcfe',
                                marginBottom: 8,
                                letterSpacing: '0.03em'
                            }}>
                                {(item.training && item.training.name) || item.trainingName || "Trening bez nazwy"}
                            </div>
                            {item.training && item.training.exercises && item.training.exercises.length > 0 && (
                                <ul style={{
                                    margin: '8px 0 0 0',
                                    paddingLeft: 17,
                                    fontSize: '1em',
                                    color: '#e0f6ff'
                                }}>
                                    {item.training.exercises.map(ex => (
                                        <li key={ex.id}>
                                            <b>{ex.name}</b>
                                            {ex.category && <span style={{ color: '#2bcfff', marginLeft: 8 }}>({ex.category})</span>}
                                            {ex.description && <span style={{ color: '#ffe09c', marginLeft: 8 }}>– {ex.description}</span>}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
