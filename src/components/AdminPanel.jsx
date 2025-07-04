import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser, makeAdmin } from '../api';

export default function AdminPanel({ token, user }) {
    const [users, setUsers] = useState([]);
    const [info, setInfo] = useState('');

    useEffect(() => {
        if (user?.role === 'ADMIN') {
            getAllUsers(token).then(setUsers);
        }
    }, [token, user]);

    const handleDelete = async (id) => {
        await deleteUser(id, token);
        setUsers(users.filter(u => u.id !== id));
        setInfo('Użytkownik usunięty!');
    };

    const handleMakeAdmin = async (id) => {
        await makeAdmin(id, token);
        setInfo('Awansowano na admina!');
    };

    if (user?.role !== 'ADMIN') return null; // Nie pokazuj, jeśli nie admin

    return (
        <div className="admin-panel">
            <h2>Panel administratora</h2>
            {info && <div>{info}</div>}
            <table>
                <thead>
                <tr>
                    <th>ID</th><th>Nazwa</th><th>Email</th><th>Rola</th><th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {users.map(u => (
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>{u.role}</td>
                        <td>
                            <button onClick={() => handleDelete(u.id)}>Usuń</button>
                            {u.role !== 'ADMIN' && <button onClick={() => handleMakeAdmin(u.id)}>Awansuj</button>}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
