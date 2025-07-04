import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ExerciseForm from './components/ExerciseForm';
import ExerciseList from './components/ExerciseList';
import ScheduleList from './components/ScheduleList';
import AddScheduledWorkout from './components/AddScheduledWorkout';
import './App.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [showRegister, setShowRegister] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken('');
    };

    // Domyślny zakres miesiąca
    const today = new Date();
    const monthStart = today.toISOString().slice(0, 8) + '01';
    const monthEnd = today.toISOString().slice(0, 8) + '31';

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <div className="sidebar-title">🏋️‍♂️ FitApp</div>
                <nav>
                    <a href="#" className="active">Strona główna</a>
                    <a href="#">Treningi</a>
                    <a href="#">Ćwiczenia</a>
                    <a href="#">Kalendarz</a>
                </nav>
                <div className="sidebar-footer">
                    <a href="#">Profil</a>
                </div>
            </aside>
            <main className="main-area">
                <header className="main-header">
                    <h1>Twój panel fitness</h1>
                </header>
                <section className="main-content">
                    <div className="app-container">
                        <div className="form">
                            {token ? (
                                <>
                                    <button className="logout-btn" onClick={handleLogout}>
                                        Wyloguj
                                    </button>
                                    <ExerciseForm token={token} />
                                    <ExerciseList token={token} />
                                    <AddScheduledWorkout
                                        token={token}
                                        onAdded={() => setRefresh(!refresh)}
                                    />
                                    <ScheduleList
                                        token={token}
                                        start={monthStart}
                                        end={monthEnd}
                                        key={refresh}
                                    />
                                </>
                            ) : (
                                <>
                                    <div className="tab-btns" style={{ marginBottom: 20 }}>
                                        <button
                                            className={!showRegister ? 'active' : ''}
                                            onClick={() => setShowRegister(false)}
                                        >
                                            Logowanie
                                        </button>
                                        <button
                                            className={showRegister ? 'active' : ''}
                                            onClick={() => setShowRegister(true)}
                                        >
                                            Rejestracja
                                        </button>
                                    </div>
                                    {showRegister
                                        ? <RegisterForm onRegister={() => setShowRegister(false)} />
                                        : <LoginForm onLogin={handleLogin} />}
                                </>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;
