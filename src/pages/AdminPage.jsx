import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser, makeAdmin } from '../api';

export default function AdminPage({ token }) {
    const [users, setUsers] = useState([]);
    const [info, setInfo] = useState('');
    const [error, setError] = useState('');

    const refresh = () => {
        getAllUsers(token)
            .then(setUsers)
            .catch(e => setError(e.message || 'Błąd pobierania użytkowników'));
    };

    useEffect(() => { refresh(); }, [token]);

    const handleDelete = async (id) => {
        if (!window.confirm('Na pewno usunąć użytkownika?')) return;
        try {
            await deleteUser(id, token);
            setInfo('Usunięto użytkownika');
            setTimeout(() => setInfo(''), 1200);
            refresh();
        } catch (err) {
            setError(err.message || 'Błąd usuwania');
        }
    };

    const handleMakeAdmin = async (id) => {
        try {
            await makeAdmin(id, token);
            setInfo('Nadano uprawnienia admina');
            setTimeout(() => setInfo(''), 1200);
            refresh();
        } catch (err) {
            setError(err.message || 'Błąd promocji');
        }
    };

    return (
        <div className="form" style={{ maxWidth: 760 }}>
            <h2>Panel administratora – użytkownicy</h2>
            {info && <div className="info">{info}</div>}
            {error && <div className="error">{error}</div>}
            <table style={{ width: '100%', color: '#d7f4ff', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Login</th>
                    <th>Email</th>
                    <th>Rola</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {users.map(u => (
                    <tr key={u.id} style={{ background: u.role === "ADMIN" ? '#142c5b' : 'transparent' }}>
                        <td>{u.id}</td>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td style={{ color: u.role === "ADMIN" ? '#27f7ff' : '#ffd952' }}>{u.role}</td>
                        <td>
                            {u.role !== "ADMIN" && (
                                <button style={{ marginRight: 7 }} onClick={() => handleMakeAdmin(u.id)}>
                                    Nadaj admina
                                </button>
                            )}
                            <button onClick={() => handleDelete(u.id)} style={{ background: '#a3192c' }}>
                                Usuń
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
