import React, { useState } from 'react';
import { login } from '../api';

export default function LoginForm({ onLogin, switchToRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            const res = await login({ username, password });
            onLogin(res.token);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>Logowanie</h2>
            {error && <div className="error">{error}</div>}
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
            <button type="button" onClick={switchToRegister} style={{ marginTop: '10px', background: '#595aff' }}>
                Zarejestruj się
            </button>
        </form>
    );
}


