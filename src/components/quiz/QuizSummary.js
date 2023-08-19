import React from "react";
import { useLocation } from "react-router-dom";

function QuizSummary() {
    const location = useLocation();
    const playerStats = location.state?.playerStats || {};
    const hasAnsweredQuestions = playerStats.numberOfAnsweredQuestions > 0;

    return (
        <div>
            <h1>Quiz Summary</h1>
            {hasAnsweredQuestions ? (
                <>
                    <p>Score: {playerStats.score}</p>
                    <p>Number of Questions: {playerStats.numberOfQuestions}</p>
                    <p>Number of Correct Answers: {playerStats.numberOfCorrectAnswers}</p>
                    <p>Number of Incorrect Answers: {playerStats.numberOfIncorrectAnswers}</p>
                    <p>Number of Answered Questions: {playerStats.numberOfAnsweredQuestions}</p>
                    <p>Used Hints: {playerStats.hintsUsed}</p>
                </>
            ) : (
                <p>Please take a quiz.</p>
            )}
        </div>
    );
}

export default QuizSummary;
