import React, { useState } from 'react';
import { login } from '../api';

export default function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [info, setInfo] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setInfo('');
        setError('');
        const res = await login({ username, password });
        if (res.token) {
            setInfo('Zalogowano pomyślnie!');
            setError('');
            onLogin(res.token);
        } else {
            setError(res.error || 'Nieprawidłowy login lub hasło');
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>Logowanie</h2>
            <input
                type="text"
                placeholder="Login"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button type="submit">Zaloguj</button>
            {info && <div className="info">{info}</div>}
            {error && <div className="error">{error}</div>}
        </form>
    );
}

