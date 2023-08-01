import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import M from "materialize-css"
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiSetCenter } from "@mdi/js/mdi";
import { mdiLightbulbOn10 } from "@mdi/js";
import { mdiClockOutline } from "@mdi/js";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
};

function Play() {
        const [questions, setQuestions] = useState([]);
        const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
                fetch(
                        "https://the-trivia-api.com/api/questions?limit=15"
                )
                        .then((resp) => resp.json())
                        .then((apiData) => {
                                setQuestions(apiData);
                                setLoading(false);
                        });
        }, []);

        
        const currentQuestion = questions[currentQuestionIndex] || null;
        
        const shuffledAnswers = currentQuestion
                ? shuffleArray([
                        currentQuestion.correctAnswer,
                        ...currentQuestion.incorrectAnswers,
                ])
                : [];

        function handleClick(e) {
                M.toast({
                        html: "Option Clicked!",
                        classes: "text-white font-bold text-sm text-center p-6 w-[15rem] md:w-[300px] bg-[#000] mt-[-200px] ml-[18px] relative tracking-wider",
                        
                });
        }
        
        return (
                <Fragment>
                        <Helmet>
                                <title>Quiz Page</title>
                        </Helmet>

                        <div className="bg-[#02001c] p-10 min-h-screen bg-[url('https://transparenttextures.com/patterns/asfalt-light.png')]">
                                <div className="flex flex-col justify-center items-center">
                                        <h5 className="text-white text-[2rem] pt-10 pb-8">Simple Quiz Mode</h5>
                                        <div className="text-white rounded-r-xl border-l-8 border-blue-900 bg-blue-900/50 w-[22.6rem] md:w-[600px] p-4">
                                                <div className="flex justify-between">
                                                        <div>
                                                                <Icon path={mdiSetCenter} size={1.2} className="inline text-blue-500" />
                                                                <span className="text-blue-500">2</span>
                                                                <p>
                                                                        {currentQuestionIndex + 1} of {questions.length}
                                                                </p>
                                                        </div>
                                                        <div>
                                                                <p>
                                                                        <Icon path={mdiLightbulbOn10} size={1.2} className="inline text-blue-500" />
                                                                        <span className="text-blue-500">5</span>
                                                                </p>
                                                                <Icon path={mdiClockOutline} size={0.9} className="inline" />{" "}
                                                                <span className="">2:12</span>
                                                        </div>
                                                </div>

                                                <div>
                                                        {currentQuestion && !loading ? (
                                                                <p className="text-center py-12 text-[16px] leading-9">
                                                                        {currentQuestion.question}

                                                                </p>

                                                        ) : (
                                                                <div className="text-center py-12 pt-20">
                                                                        <Backdrop className="w-[22.6rem] md:w-[600px] m-auto"
                                                                                sx={{ color: '#0000FF', backgroundColor: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                                                                open

                                                                        >
                                                                                <CircularProgress color="inherit" />
                                                                        </Backdrop>
                                                                </div>
                                                        )
                                                        }


                                                        <div className="md:flex md:justify-between">
                                                                <div className="md:mb-8 flex flex-col justify-center items-center m-auto md:grid md:grid-rows- md:grid-flow-col">
                                                                        <div className="">
                                                                                {shuffledAnswers.map((answer, index) => (
                                                                                        <p
                                                                                                key={index}
                                                                                                onClick={handleClick}
                                                                                                className="bg-blue-900 mb-10 text-center m-auto w-[230px] md:w-[400px] rounded-full cursor-pointer  py-4 hover:bg-blue-500"
                                                                                        >
                                                                                                {answer}
                                                                                        </p>
                                                                                ))}
                                                                        </div>
                                                                </div>

                                                        </div>
                                                </div>
                                        </div>
                                        <div className="my-10">
                                                <Link to="/play/instructions" className="bg-gray-500 hover:bg-gray-300 rounded p-2 px-3">
                                                        &lt;&lt; Previous
                                                </Link>
                                                <Link to="/" className="bg-green-600 hover:bg-green-400 p-2 px-3 mx-2 md:mx-6 rounded">
                                                        Next &gt;&gt;
                                                </Link>
                                                <Link to="/" className="bg-red-600 hover:bg-red-500 p-2 px-3 rounded">
                                                        Quit <span className="font-bold pl-1"> x</span>
                                                </Link>
                                        </div>
                                </div>
                        </div>
                </Fragment>
        );
        
}

export default Play;
