import React, { useState } from 'react';
import { register } from '../api';

export default function RegisterForm({ onRegister }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [info, setInfo] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setInfo('');
        setError('');
        try {
            const res = await register({ username, email, password });
            if (res.message === 'Registered!') {
                setInfo('Rejestracja zakończona. Zaloguj się!');
                setTimeout(onRegister, 1500);
            } else {
                setError(res.error || 'Błąd rejestracji');
            }
        } catch (err) {
            setError(err.message || 'Błąd rejestracji');
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>Rejestracja</h2>
            <input
                type="text"
                placeholder="Login"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button type="submit">Zarejestruj</button>
            {info && <div className="info">{info}</div>}
            {error && <div className="error">{error}</div>}
        </form>
    );
}


