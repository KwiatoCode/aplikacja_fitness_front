import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HomePage from './pages/HomePage';
import WorkoutsPage from './pages/WorkoutsPage';
import ExercisesPage from './pages/ExercisesPage';
import SchedulePage from './pages/SchedulePage';
import TrainingsPage from './pages/TrainingsPage';
import AdminPage from './pages/AdminPage';

import './App.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState('USER');  // <--- dodane!
    const [isRegister, setIsRegister] = useState(false);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserId(decoded.id);
                setUserRole(decoded.role || 'USER');
            } catch {
                setUserId(null);
                setUserRole('USER');
            }
        } else {
            setUserId(null);
            setUserRole('USER');
        }
    }, [token]);

    const handleLogin = tok => {
        localStorage.setItem('token', tok);
        setToken(tok);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUserId(null);
        setUserRole('USER');
    };

    const PrivateRoute = ({ children }) =>
        token ? children : <Navigate to="/login" replace />;

    return (
        <div className="dashboard">
            {token && (
                <aside className="sidebar">
                    <h3 className="sidebar-title">🏋️‍♂️ FitApp</h3>
                    <nav>
                        <NavLink to="/home">Strona główna</NavLink>
                        <NavLink to="/treningi">Treningi</NavLink>
                        <NavLink to="/cwiczenia">Ćwiczenia</NavLink>
                        <NavLink to="/kalendarz">Kalendarz</NavLink>
                        {userRole === "ADMIN" && (
                            <NavLink to="/admin">Panel admina</NavLink>
                        )}
                    </nav>
                    <button className="logout-btn" onClick={handleLogout}>
                        Wyloguj
                    </button>
                </aside>
            )}

            <main className="main-area">
                <Routes>
                    <Route
                        path="/login"
                        element={
                            token ? <Navigate to="/home" replace /> : (
                                !isRegister ? (
                                    <LoginForm onLogin={handleLogin} switchToRegister={() => setIsRegister(true)} />
                                ) : (
                                    <RegisterForm onRegister={() => setIsRegister(false)} switchToLogin={() => setIsRegister(false)} />
                                )
                            )
                        }
                    />

                    <Route path="/register" element={<Navigate to="/login" replace />} />

                    <Route
                        path="/home"
                        element={
                            <PrivateRoute>
                                <HomePage token={token} />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/treningi"
                        element={
                            <PrivateRoute>
                                <TrainingsPage token={token} />
                            </PrivateRoute>
                        }
                    />

                    <Route path="/cwiczenia" element={<PrivateRoute><ExercisesPage token={token} /></PrivateRoute>} />
                    <Route path="/kalendarz" element={<PrivateRoute><SchedulePage token={token} /></PrivateRoute>} />

                    {/* Panel admina TYLKO dla ADMIN */}
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute>
                                {userRole === "ADMIN"
                                    ? <AdminPage token={token} />
                                    : <Navigate to="/home" />}
                            </PrivateRoute>
                        }
                    />

                    <Route path="/" element={<Navigate to={token ? '/home' : '/login'} replace />} />
                    <Route path="*" element={<Navigate to={token ? '/home' : '/login'} replace />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
