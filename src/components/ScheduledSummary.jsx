import React, { useEffect, useState } from 'react';
import { getSchedule } from '../api';

export default function ScheduledSummary({ token, start, end }) {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getSchedule(start, end, token)
            .then(data => {
                const sum = data.reduce(
                    (acc, w) => acc + w.scheduledExercises.reduce((a, se) => a + se.durationMinutes, 0),
                    0
                );
                setTotal(sum);
            })
            .catch(console.error);
    }, [start, end, token]);

    return (
        <p>
            Od <strong>{start}</strong> do <strong>{end}</strong>: <strong>{total}</strong> minut
        </p>
    );
}
