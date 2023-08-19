import React, { Fragment } from "react";
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";


const Home = () => (
        <Fragment>
                <Helmet><title>Quiz App - Home</title></Helmet>
                <div className="bg-[#02001c] bg-[url('https://transparenttextures.com/patterns/asfalt-light.png')] min-h-screen font-['quicksand']">
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-opacity-10 bg-blue-900/50 w-[275px] md:w-[600px] rounded-2xl p-6 px-12">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-[100px] m-auto fill-white pb-20"><title>cube-outline</title><path d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z" /></svg>
                                <p className="text-white text-xl font-semibold text-center mb-[50px] md:text-4xl">QUICKQUIZZE</p>

                                <ul>
                                        <Link to="/play/instructions" className="bg-white/60 mb-[40px] cursor-pointer rounded-full hover:bg-white/100 flex justify-center items-center w-[200px] m-auto  p-6 text-center hover:duration-500 text-white/100 text-sm md:text-2xl hover:text-black/100">Have a Quick Play</Link>
                                </ul>

                        </div>

                </div>
        </Fragment>

);



export default Home;