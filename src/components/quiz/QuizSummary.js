import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Icon from '@mdi/react';
import { mdiCheckDecagramOutline } from '@mdi/js';

function QuizSummary() {
    const location = useLocation();
    const playerStats = location.state?.playerStats || {};
    const hasAnsweredQuestions = playerStats.numberOfAnsweredQuestions > 0;
    let remark = "";

    if (playerStats.score <= 30) {
        remark = "You need more practice!";
    } else if (playerStats.score > 30 && playerStats.score <= 50) {
        remark = "Better luck next time!";
    } else if (playerStats.score > 50 && playerStats.score <= 70) {
        remark = "You can do better!";
    } else if (playerStats.score >= 71 && playerStats.score <= 84) {
        remark = "You did great!";
    } else {
        remark = "You are a genius!";
    }

    return (
        <Fragment>
            <Helmet>
                  <title>Quiz App - Summary</title>
            </Helmet>
        <div className="py-20 text-white bg-[#707278] min-h-screen bg-[url('https://transparenttextures.com/patterns/cubes.png')]">
            {hasAnsweredQuestions ? (
                <div className="mx-4 sm:mx-20 flex flex-col justify-center items-center">
                    <div className="bg-white/80 p-4 rounded-t-xl flex flex-col justify-center items-center w-full sm:w-[400px]">

                        <Icon path={mdiCheckDecagramOutline} size={6} className="text-green-400" />
                        <h1 className="text-green-400 font-bold text-[16px] sm:text-[20px] pt-8">Congratulations, you made it!</h1>
                    </div>
                    <div className="bg-white/60 sm:w-[400px] text-[12px] sm:text-[14px] p-4 rounded-b-xl text-black w-full">
                        <p className="text-center text-[14px] sm:text-[18px]">{remark}</p>
                        <p className="text-center py-6 text-blue-600 text-[20px] sm:text-[30px]">Your Score is: {playerStats.score.toFixed(0)}&#37;</p>
                        <p className="py-6">Total Number of Questions: <span className="float-right">{playerStats.numberOfQuestions}</span></p>
                        <p>Number of Correct Answers: <span className="float-right">{playerStats.numberOfCorrectAnswers}</span></p>
                        <p className="py-6">Number of Incorrect Answers: <span className="float-right">{playerStats.numberOfIncorrectAnswers}</span></p>
                        <p>Number of Attempted Questions: <span className="float-right">{playerStats.numberOfAnsweredQuestions}</span></p>
                        <p className="py-6">Used Hints: <span className="float-right">{playerStats.hintsUsed}</span></p>

                        <section className="my-6 text-[12px] font-semibold">
                            <Link to="/" className="bg-white p-2 px-4 bg-white hover:bg-green-400 hover:duration-700 rounded-xl">Return Home</Link>
                            <Link to="/Play/quiz" className="float-right mt-[-8px] px-4 rounded-xl hover:duration-700 bg-white hover:bg-green-400 p-2">Play Again</Link>
                        </section>
                    </div>
                </div>
            ) : (
                <div className="bg-white/60 sm:w-[400px] mx-2 sm:mx-auto flex flex-col justify-center items-center sm:m-auto rounded-xl">
                    <div className=" p-6">

                    <p className="text-center my-[40px] text-[2rem] sm:text-[3rem]">No Statistics Available☹️</p>
                    <section className="my-16 text-[12px] text-black font-semibold">
                            <Link to="/" className="bg-white p-2 px-4 bg-white hover:bg-green-400 hover:duration-700 rounded-xl">Return Home</Link>
                            <Link to="/Play/quiz" className="float-right mt-[-8px] px-4 rounded-xl hover:duration-700 bg-white hover:bg-green-400 p-2">Take a Quiz</Link>
                        </section>
                    </div>
                </div>
            )}
        </div>

    </Fragment>
    );
}

export default QuizSummary;
