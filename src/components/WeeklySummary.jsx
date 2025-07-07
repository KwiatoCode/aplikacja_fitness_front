import React, { useEffect, useState } from 'react';
import { getSummary } from '../api';

export default function WeeklySummary({ token, userId, start, end }) {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getSummary(userId, start, end, token).then(setTotal);
    }, [userId, start, end, token]);

    return (
        <div className="weekly-summary">
            <h4>Podsumowanie czasu treningu</h4>
            <p>{start} – {end}: <strong>{total} min</strong></p>
        </div>
    );
}