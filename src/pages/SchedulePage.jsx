import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { getSchedule, getTrainings, addScheduledTraining } from '../api';

export default function SchedulePage({ token }) {
    const [value, setValue] = useState(new Date());
    const [schedule, setSchedule] = useState([]);
    const [trainings, setTrainings] = useState([]);
    const [selectedTraining, setSelectedTraining] = useState('');
    const [info, setInfo] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        getTrainings(token).then(setTrainings);
    }, [token]);

    useEffect(() => {
        const start = new Date(value.getFullYear(), value.getMonth(), 1).toISOString().slice(0, 10);
        const end = new Date(value.getFullYear(), value.getMonth() + 1, 0).toISOString().slice(0, 10);
        getSchedule(start, end, token).then(setSchedule);
    }, [value, token]);

    function getTrainingForDate(date) {
        const day = date.toISOString().slice(0, 10);
        return schedule.find(e => e.date === day);
    }
    function formatDateLocal(date) {
        // "YYYY-MM-DD" z polskiej strefy, NIE UTC
        const pad = n => n < 10 ? '0' + n : n;
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    }


    async function handleAdd(e) {
        e.preventDefault();
        setInfo('');
        setError('');
        try {
            await addScheduledTraining(formatDateLocal(value), selectedTraining, token);
            setInfo('Trening dodany do kalendarza!');
            setTimeout(() => setInfo(''), 1400);
            const start = new Date(value.getFullYear(), value.getMonth(), 1).toISOString().slice(0, 10);
            const end = new Date(value.getFullYear(), value.getMonth() + 1, 0).toISOString().slice(0, 10);
            getSchedule(start, end, token).then(setSchedule);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', margin: '22px 0' }}>Kalendarz treningów</h2>
            <div className="calendar-container">
                <Calendar
                    onChange={setValue}
                    value={value}
                    tileContent={({ date }) => {
                        const ev = getTrainingForDate(date);
                        return ev ? (
                            <div style={{
                                fontSize: '0.77em',
                                background: '#4bc8ff',
                                color: '#222942',
                                borderRadius: '8px',
                                padding: '1px 4px',
                                marginTop: 2,
                                textAlign: 'center'
                            }}>
                                {ev.training?.name}
                            </div>
                        ) : null;
                    }}
                    tileClassName={({ date }) => getTrainingForDate(date) ? 'calendar-training-day' : ''}
                    calendarType="iso8601"
                    locale="pl-PL"
                />
            </div>
            <div style={{
                marginTop: 30,
                background: 'rgba(22,26,44,0.92)',
                borderRadius: 16,
                boxShadow: '0 6px 28px #1ee9ff1c',
                padding: 22
            }}>
                <b>Wybrana data:</b> {value.toLocaleDateString('pl-PL')}
                <br />
                {getTrainingForDate(value) ? (
                    <div style={{ marginTop: 14 }}>
                        <b>Zaplanowany trening:</b>
                        <div style={{ color: '#5cf7ff', marginTop: 6 }}>
                            {getTrainingForDate(value).training?.name}
                        </div>
                        <ul style={{ margin: '10px 0 0 0', color: '#eee', fontSize: '.99em', paddingLeft: 15 }}>
                            {(getTrainingForDate(value).training?.exercises || []).map(ex => (
                                <li key={ex.id}>
                                    {ex.name} {ex.category && <span style={{ color: '#aaf' }}>({ex.category})</span>}
                                    {ex.description && <span style={{ color: '#ffe09c' }}> - {ex.description}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <form onSubmit={handleAdd} style={{ marginTop: 12 }}>
                        <b>Dodaj trening do dnia:</b>
                        <select
                            value={selectedTraining}
                            onChange={e => setSelectedTraining(e.target.value)}
                            style={{
                                background: '#232946',
                                color: '#c1ebff',
                                marginLeft: 8,
                                padding: '5px 11px',
                                borderRadius: 7,
                                border: '1px solid #25395a'
                            }}
                            required
                        >
                            <option value="">-- Wybierz trening --</option>
                            {trainings.map(tr => (
                                <option value={tr.id} key={tr.id}>{tr.name}</option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            style={{
                                marginLeft: 11,
                                background: 'linear-gradient(90deg,#4bc8ff 40%,#6f74ff 100%)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 7,
                                padding: '6px 18px',
                                fontWeight: 700
                            }}
                        >
                            Dodaj
                        </button>
                        {info && <div className="info">{info}</div>}
                        {error && <div className="error">{error}</div>}
                    </form>
                )}
            </div>
        </div>
    );
}






