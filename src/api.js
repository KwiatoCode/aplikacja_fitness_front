 const API_URL = process.env.REACT_APP_API_URL + '/api';


// Rejestracja
export async function register(data) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    // spróbuj sparsować JSON
    const payload = await res.json().catch(() => ({}));

    // jeśli status nie jest 2xx, rzuć wyjątek
    if (!res.ok) {
        // backend może zwrócić { error: "..." } albo { message: "..." }
        throw new Error(payload.error || payload.message || 'Błąd rejestracji');
    }

    return payload;
}

// Logowanie
export async function login(data) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(payload.error || payload.message || 'Nieprawidłowy login lub hasło');
    }
    return payload;
}

// Ćwiczenia
export async function addExercise(data, token) {
    const res = await fetch(`${API_URL}/exercises`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}

export async function getExercises(token) {
    const res = await fetch(`${API_URL}/exercises`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return await res.json();
}

export async function deleteExercise(id, token) {
    await fetch(`${API_URL}/exercises/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
}

// Harmonogram treningów
export async function addScheduledWorkout(data, token) {
    const res = await fetch(`${API_URL}/schedule`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
    }
    const text = await res.text();
    return text ? JSON.parse(text) : null;
}

export async function getSchedule(start, end, token) {
    const res = await fetch(`${API_URL}/api/schedule?start=${start}&end=${end}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const text = await res.text();
    if (!text) return [];
    return JSON.parse(text);
}


export async function deleteScheduledWorkout(id, token) {
    await fetch(`${API_URL}/schedule/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
}

// Panel admina
export async function getAllUsers(token) {
    const res = await fetch(`${API_URL}/admin/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return await res.json();
}

export async function deleteUser(id, token) {
    await fetch(`${API_URL}/admin/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
}

export async function makeAdmin(id, token) {
    await fetch(`${API_URL}/admin/users/${id}/make-admin`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
    });
}

// Podsumowanie treningów
export async function getSummary(start, end, token) {
    const res = await fetch(`${API_URL}/entries/summary?start=${start}&end=${end}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    try {
        return await res.json();
    } catch {
        return 0;
    }
}

export async function getTrainings(token) {
    const res = await fetch('${API_URL}/api/trainings', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return await res.json();
}

// Dodaj nowy trening
export async function addTraining(data, token) {
    const res = await fetch('${API_URL}/api/trainings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}

export async function deleteTraining(id, token) {
    await fetch(`${API_URL}/api/trainings/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
}

export async function updateTraining(id, data, token) {
    const res = await fetch(`${API_URL}/api/trainings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}


export async function addScheduledTraining(date, trainingId, token) {
    const res = await fetch('${API_URL}/api/schedule/add-training', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ date, trainingId })
    });
    if (!res.ok) throw new Error('Błąd zapisywania treningu w kalendarzu');
    return await res.json();
}




