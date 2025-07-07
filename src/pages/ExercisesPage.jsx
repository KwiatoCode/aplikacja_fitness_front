import React from 'react';
import ExerciseForm from '../components/ExerciseForm';
import ExerciseList from '../components/ExerciseList';

export default function ExercisesPage({ token }) {
    return (
        <div className="page exercises-page">
            <h2>Ćwiczenia</h2>
            <ExerciseForm token={token} />
            <ExerciseList token={token} />
        </div>
    );
}
