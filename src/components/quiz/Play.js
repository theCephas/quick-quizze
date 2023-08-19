import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import M from "materialize-css";
import Icon from "@mdi/react";
import { mdiLightbulbOn10 } from "@mdi/js";
import { mdiClockOutline } from "@mdi/js";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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
        const [score, setScore] = useState(0);
        const [numberOfQuestions, setNumberOfQuestions] = useState(0);
        // const [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState(
        //         numberOfCorrectAnswers + numberOfIncorrectAnswers);
        const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
        const [numberOfIncorrectAnswers, setNumberOfIncorrectAnswers] = useState(0);
        
        const [hints, setHints] = useState(6);
        const [time, setTime] = useState({ minutes: 2, seconds: 59 }); // Initial time
        const navigate = useNavigate();
        const [intervalId, setIntervalId] = useState(null);
        const [usedHintForQuestion, setUsedHintForQuestion] = useState({});

        useEffect(() => {
                fetch("https://the-trivia-api.com/api/questions?limit=15")
                        .then((resp) => resp.json())
                        .then((apiData) => {
                                const initializedQuestions = apiData.map((question) => ({
                                        ...question,
                                        shuffledOptions: shuffleArray([
                                                question.correctAnswer,
                                                ...question.incorrectAnswers,
                                        ]),
                                }));
                                setQuestions(initializedQuestions);
                                setLoading(false);
                        });
        }, []);

        function startTimer() {
                const countdownTime = new Date();
                countdownTime.setMinutes(countdownTime.getMinutes() + time.minutes);
                countdownTime.setSeconds(countdownTime.getSeconds() + time.seconds);

                const interval = setInterval(() => {
                        const now = new Date();
                        const distance = countdownTime - now;
                        const minutes = Math.floor(distance / (1000 * 60));
                        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                        setTime({ minutes, seconds });

                        if (distance <= 0) {
                                clearInterval(interval);
                                endGame();
                        }
                }, 1000);

                setIntervalId(interval);
        }

        useEffect(() => {
                if (!loading && questions.length > 0) {
                        startTimer();
                }
        }, [loading, questions]);

        useEffect(() => {
                return () => {
                        clearInterval(intervalId);
                };
        }, [intervalId]);

        useEffect(() => {
                setNumberOfQuestions(questions.length);
        }, [questions]);



        const currentQuestion = questions[currentQuestionIndex] || null;

        useEffect(() => {
                if (currentQuestion) {
                        const shuffledOptions = shuffleArray([
                                currentQuestion.correctAnswer,
                                ...currentQuestion.incorrectAnswers,
                        ]);
                        setQuestions(prevQuestions => {
                                const updatedQuestions = [...prevQuestions];
                                updatedQuestions[currentQuestionIndex].shuffledOptions = shuffledOptions;
                                return updatedQuestions;
                        });
                }
        }, [currentQuestionIndex, currentQuestion]);

        const shuffledAnswers = currentQuestion
                ? questions[currentQuestionIndex].shuffledOptions
                : [];

        // useEffect(() => {
        //         // Set the initial number of answered questions to 1 when the first question is rendered
        //         if (currentQuestionIndex === 0) {
        //             setNumberOfAnsweredQuestions(1);
        //         //     setNumberOfCorrectAnswers(1);
        //         //     setNumberOfIncorrectAnswers(1);
        //         }
        //     }, [currentQuestionIndex]);
        function handleClick(e) {
                resetOptionsVisibility();
                const selectedAnswer = e.target.innerHTML.toLowerCase();
                const correctAnswer = currentQuestion.correctAnswer.toLowerCase();

                if (selectedAnswer === correctAnswer) {
                        handleCorrectAnswer();
                } else {
                        handleWrongAnswer();
                }

                // setNumberOfAnsweredQuestions(prevCount => prevCount + 1);
                // const answeredQuestionsCount = currentQuestionIndex + 1;
                // console.log("Number of answered questions:", numberOfAnsweredQuestions);

                if (currentQuestionIndex === questions.length - 1) {
                        setTimeout(() => {
                        endGame();
                        }, 1500);
                } else {
                        setTimeout(() => {
                                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                        }, 500);
                }
                setUsedHintForQuestion(prevUsedHints => ({
                        ...prevUsedHints,
                        [currentQuestionIndex]: false,
                }));
        }

        function handleCorrectAnswer(e) {

                M.toast({
                        html: "Correct Answer!",
                        classes: "bg-green-500  mt-[-600px] ml-3 w-[14rem] text-center p-3 relative rounded-xl",
                        displayLength: 1500,
                });
                setScore(prevScore => prevScore + 1);
                setNumberOfCorrectAnswers(prevCount => prevCount + 1);
                // setNumberOfAnsweredQuestions(prevCount => prevCount + 1)
        }

        function handleWrongAnswer() {
                navigator.vibrate(1000);
                M.toast({
                        html: "Wrong Answer!",
                        classes: "bg-red-500 mt-[-600px] w-[14rem] ml-3 p-3 text-center relative rounded-xl",
                        displayLength: 1500,
                });
                setNumberOfIncorrectAnswers(prevCount => prevCount + 1);
                // setNumberOfAnsweredQuestions(prevCount => prevCount + 1)
        }
        function handleNextButton() {
                resetOptionsVisibility();
                if (currentQuestionIndex < questions.length - 1) {
                        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                } else {
                        console.log("No more questions.");
                }
        }
        function handlePreviousButton() {
                if (currentQuestionIndex > 0) {
                        setCurrentQuestionIndex(prevIndex => prevIndex - 1)
                } else {
                        console.log("No previous questions")
                }
        }
        function handleQuitButton() {
                const confirmButton = window.confirm("Are you sure you want to quit the quiz?");
                if (confirmButton === true) {
                        endGame();
                }

        }

        function handleHints() {
                if (hints > 0 && !usedHintForQuestion[currentQuestionIndex]) {
                        const options = Array.from(document.querySelectorAll('.option'));
                        const wrongOptions = options.filter((option) => {
                                const isCorrectAnswer = option.innerHTML.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
                                return !isCorrectAnswer && getComputedStyle(option).visibility !== 'hidden';
                        });

                        if (wrongOptions.length > 0) {
                                const randomWrongOptionIndex = Math.floor(Math.random() * wrongOptions.length);
                                wrongOptions[randomWrongOptionIndex].style.visibility = 'hidden';
                        }

                        setUsedHintForQuestion((prevUsedHints) => ({
                                ...prevUsedHints,
                                [currentQuestionIndex]: true,
                        }));

                        setHints((prevState) => prevState - 1);
                }
        }

        function resetOptionsVisibility() {
                const options = Array.from(document.querySelectorAll('.option'));
                options.forEach(option => option.style.visibility = 'visible');
        }

        function endGame() {

                // alert("Quiz has ended!")

                // setNumberOfCorrectAnswers(prevCount =>
                //         prevCount + score
                //     );
                //     setNumberOfIncorrectAnswers(prevCount =>
                //         prevCount + (numberOfAnsweredQuestions - score)
                //     );
            
                const playerStats = {
                        score: score,
                        numberOfQuestions: numberOfQuestions,
                        numberOfAnsweredQuestions: numberOfCorrectAnswers + numberOfIncorrectAnswers,
                        numberOfCorrectAnswers: numberOfCorrectAnswers,
                        numberOfIncorrectAnswers: numberOfIncorrectAnswers,
                        hintsUsed: 6 - hints,
                };
                alert("Quiz has ended");
                console.log(playerStats);
                setTimeout(() => {
                navigate("/Play/quizSummary", { state: { playerStats } });
                }, 1000);
        }
        return (
                <Fragment>
                        <Helmet>
                                <title>Quiz Page</title>
                        </Helmet>

                        <div className="bg-[#02001c] p-10 min-h-screen bg-[url('https://transparenttextures.com/patterns/asfalt-light.png')]">
                                <div className="flex flex-col justify-center items-center">
                                        <h5 className="text-white text-xl md:text-2xl pt-10 pb-8">Simple Quiz Mode</h5>
                                        <div className="text-white rounded-r-xl border-l-8 border-blue-900 bg-blue-900/50 w-[275px] md:w-[600px] p-4 mx-20">
                                                <div className="flex justify-between text-sm md:text-xl">
                                                        <div>

                                                                <Icon path={mdiClockOutline} size={0.7} className="inline" />{" "}
                                                                <span className="">{time.minutes}:{time.seconds < 10 ? `0${time.seconds}` : time.seconds}</span>
                                                        </div>
                                                        <div>
                                                                <p onClick={handleHints} className="cursor-pointer">
                                                                        <Icon path={mdiLightbulbOn10} size={.8} className="inline text-blue-500" />
                                                                        <span className="text-blue-500">{hints}</span>
                                                                </p>
                                                                <p className="">
                                                                        {currentQuestionIndex + 1} of {questions.length}
                                                                </p>
                                                        </div>
                                                </div>

                                                <div>
                                                        {currentQuestion && !loading ? (
                                                                <p className="text-center py-12 text-[16px] leading-9">
                                                                        {currentQuestion.question}

                                                                </p>

                                                        ) : (
                                                                <div className="text-center py-12 pt-20">
                                                                        <Backdrop className="w-full m-auto"
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
                                                                                                onClick={(e) => handleClick(e)}
                                                                                                className="option bg-blue-900 mb-10 text-center text-sm md:text-[1.2rem] m-auto flex justify-center px-10 rounded-full cursor-pointer py-4 hover:bg-blue-500"
                                                                                        >
                                                                                                {answer}
                                                                                        </p>
                                                                                ))}
                                                                        </div>
                                                                </div>

                                                        </div>
                                                </div>
                                        </div>
                                        <div className="my-10 w-[260px] md:w-[300px] flex md:flex md:flex-start justify-between text-[.8rem] sm:text-[1rem]">
                                                <button onClick={handlePreviousButton} className={`${currentQuestionIndex === 0
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-sky-500 hover:bg-sky-400"
                                                        } rounded p-2  px-3`}
                                                        disabled={currentQuestionIndex === 0}>
                                                        &lt;&lt; Previous
                                                </button>
                                                <button onClick={handleNextButton} className={`${currentQuestionIndex === questions.length - 1
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-green-600 hover:bg-green-400"
                                                        }  p-2 px-3 md:mx-6 rounded`}
                                                        disabled={currentQuestionIndex === questions.length - 1}>
                                                        {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"} &gt;&gt;
                                                </button>
                                                <button onClick={handleQuitButton} className="bg-red-600 hover:bg-red-500 p-2 px-3 rounded">
                                                        Quit <span className="font-bold pl-1"> x</span>
                                                </button>
                                        </div>
                                </div>
                        </div>
                </Fragment>
        );

}

export default Play;
