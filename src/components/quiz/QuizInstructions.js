import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Icon from "@mdi/react";
import { mdiSetCenter } from "@mdi/js/mdi";
import { mdiLightbulbOn10 } from '@mdi/js';


const QuizInstructions = () => (
      < Fragment >
            <Helmet>
                  <title>Quiz App - Instructions</title>
            </Helmet>

            <div className="text-white bg-[#02001c]
             bg-[url('https://transparenttextures.com/patterns/asfalt-light.png')] min-h-screen
             ">
                  <div className="
                  p-10 leading-9">
                        <h1 className="text-3xl text-center sm:text-5xl underline underline-offset-8 py-10">How to Play the Game</h1>
                        <p className="text-2xl pb-6">Ensure you read this guide from start to finish.</p>
                        <ul className="list-disc ml-9">
                              <li>
                                    The game has a duration of 15 minutes and ends as soon as your time elapses.
                              </li>
                              <li>Each game consists of 15 questions.</li>
                              <li>Every question contains 4 options.</li>
                              <li>Select the option which best answers the question by clicking (or selecting) it.</li>
                              <li>Each game has 2 lifelines, namely:
                                    <ul className="list-disc ml-6">
                                          <li>2 50-50 chances</li>
                                          <li>5 Hints</li>
                                    </ul>
                              </li>
                              <li>Selecting a 50-50 lifeline by clicking the icon,
                                    <Icon path={mdiSetCenter} size={1.2} className="inline text-blue-500" />, will remove 2 wrong answers, leaving one correct answer and one wrong one.
                              </li>
                              <li>Using a hint by clicking the icon <Icon path={mdiLightbulbOn10} size={1.3} className="inline text-blue-500" />
                                    will remove one wrong answer leaving two wrong answers and one correct answer. You can use as many hints as possible on a single question.</li>
                              <li>Feel free to quit (or retire from) the game at any time. In that cse, your score will be revealed afterwards.</li>
                              <li>The timer starts as soon as the game starts.</li>
                              <li>Let's do this if you think you've got what it takes!🚀</li>
                        </ul>
                        <div className="mt-8 mb-10">
                              <Link to="/" className="float-left text-blue-400">No, take me back.</Link>
                              <Link to="/play/quiz" className="float-right text-blue-400">Okay, let's do this!</Link>
                        </div>
                  </div>
            </div>
      </Fragment>
);


export default QuizInstructions;
