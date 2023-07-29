import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiSetCenter } from "@mdi/js/mdi";
import { mdiLightbulbOn10 } from '@mdi/js';
import { mdiClockOutline } from '@mdi/js';
import { mdiWindowClose } from '@mdi/js';

class Play extends React.Component {
        render() {
                return (
                        <Fragment>
                                <Helmet>
                                        <title>Quiz Page</title>
                                </Helmet>

                                <div className="bg-[#02001c] p-10 min-h-screen bg-[url('https://transparenttextures.com/patterns/asfalt-light.png')]">
                                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-opacity-10">
                                                <h5 className="text-white text-[3rem] pb-8">Simple Quiz Mode</h5>
                                                <div className="text-white rounded-r-xl border-l-8 border-blue-900 bg-blue-900/50 w-[25rem] md:w-[600px] p-4">
                                                        <div className="flex justify-between">
                                                                <div>
                                                                        <Icon path={mdiSetCenter} size={1.2} className="inline text-blue-500" /> <span className="text-blue-500">2</span>
                                                                        <p>1 of 15</p>
                                                                </div>
                                                                <div>
                                                                        <p><Icon path={mdiLightbulbOn10} size={1.2} className="inline text-blue-500" /> <span className="text-blue-500">5</span></p>
                                                                        <Icon path={mdiClockOutline} size={0.9} className="inline" /> <span className="">2:12</span>
                                                                </div>
                                                        </div>
                                                        <p className="text-center py-12 text-[16px] ">Google was founded in what year?</p>
                                                        <div className="md:flex md:justify-between">
                                                                <div className="md:mb-8">
                                                                        <p className="bg-blue-900 mb-10 text-center m-auto rounded-full md:w-[270px] cursor-pointer py-4 hover:bg-blue-500">1997</p>
                                                                        <p className="bg-blue-900 mb-10 text-center m-auto rounded-full md:w-[270px] cursor-pointer py-4 hover:bg-blue-500">1998</p>
                                                                </div>
                                                                <div>
                                                                        <p className="bg-blue-900 mb-10 text-center m-auto rounded-full md:w-[270px] cursor-pointer py-4 hover:bg-blue-500">1999</p>
                                                                        <p className="bg-blue-900 mb-10 text-center m-auto rounded-full md:w-[270px] cursor-pointer py-4 hover:bg-blue-500">2000</p>
                                                                </div>
                                                        </div>
                                                </div>
                                                        <div className="my-10 ">
                                                                <Link to="/play/instructions" className="bg-gray-500 hover:bg-gray-300 rounded p-3 px-5">&lt;&lt; Previous</Link>
                                                                <Link to="/" className="bg-green-600 hover:bg-green-400 p-3 px-5 mx-8 rounded">Next &gt;&gt;</Link>
                                                                <Link to="/" className="bg-red-600 hover:bg-red-500 p-3 px-5 rounded">Quit <span className="font-bold pl-1"> x</span></Link>
                                                        </div>
                                        </div>
                                </div>
                        </Fragment>
                );

        }

}

export default Play;