const API_URL = '/api';

export async function register(data) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return await res.json();
}

export async function login(data) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        // Jeśli backend zwraca {message: "..."} to pokaż to użytkownikowi
        throw new Error(errorData.message || 'Nieprawidłowy login lub hasło');
    }
    return await res.json();
}


export async function addExercise(data, token) {
    const res = await fetch(`${API_URL}/exercises`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return await res.json();
}

export async function getExercises(token) {
    const res = await fetch(`${API_URL}/exercises`, {
        headers: { 'Authorization': `Bearer ${token}` },
    });
    return await res.json();
}

export async function deleteExercise(id, token) {
    await fetch(`${API_URL}/exercises/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
}

export async function getSchedule(start, end, token) {
    const res = await fetch(`${API_URL}/schedule?start=${start}&end=${end}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return await res.json();
}

export async function addScheduledWorkout(workout, token) {
    const res = await fetch(`${API_URL}/schedule`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(workout),
    });
    return await res.json();
}

export async function deleteScheduledWorkout(scheduleId, token) {
    await fetch(`${API_URL}/schedule/${scheduleId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
}


