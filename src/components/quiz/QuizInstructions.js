import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Icon from "@mdi/react";
import { mdiLightbulbOn10 } from '@mdi/js';


const QuizInstructions = () => (
      < Fragment >
            <Helmet>
                  <title>Quiz App - Instructions</title>
            </Helmet>

            <div className="py-20 text-white bg-[#707278] min-h-screen bg-[url('https://transparenttextures.com/patterns/cubes.png')]">
                  <div className=" text-white rounded-r-xl pt-0 md:w-[600px] p-4 mx-2 md:mx-20
             px-2 leading-9 ">
                        <h1 className="text-xl text-center sm:text-5xl underline underline-offset-8 py-10">How to Play the Game</h1>
                        <p className="text-xl pb-6">Ensure you read this guide from start to finish.</p>
                        <ul className="list-disc ml-9 text-sm leading-10">
                              <li>
                                    The game has a duration of 15 minutes and ends as soon as your time elapses.
                              </li>
                              <li>Each game consists of 15 questions.</li>
                              <li>Every question contains 4 options.</li>
                              <li>Select the option which best answers the question by clicking (or selecting) it.</li>
                              <li>For the whole game, there are 6 hints available. You can only use one hint for one game.</li>
                              <li>Using a hint by clicking the icon <Icon path={mdiLightbulbOn10} size={1.3} className="inline text-blue-700" />
                                    will remove one wrong answer leaving two wrong answers and one correct answer. You can only use one hint on a single question.</li>
                              <li>Feel free to quit (or retire from) the game at any time. In that case, your score will be revealed afterwards.</li>
                              <li>The timer starts as soon as the game starts.</li>
                              <li>Let's do this if you think you've got what it takes!🚀</li>
                        </ul>
                        <div className="mt-8 mb-10 mx-4 flex justify-between flex-row">
                              <Link to="/" className="text-[10px] font-bold sm:text-[14px] text-red-600">No, take me back.</Link>
                              <Link to="/play/quiz" className="text-[10px] font-bold sm:text-[14px] text-green-500">Okay, let's do this!</Link>
                        </div>
                  </div>
            </div>
      </Fragment>
);


export default QuizInstructions;
