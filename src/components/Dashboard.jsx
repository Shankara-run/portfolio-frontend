import { useState } from "react";
import Objective from "../components/Objective";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Project";
import Education from "../components/Education";

const Dashboard= ()=> {
    const [showHidden,setShowHidden]= useState(false);
    const toggleTheme=()=>{
        setShowHidden(prev=> !prev);
    };

    return (
       <div className={'min-h-screen p-6 transition-colors duration-300 ${showHidden? "bg-gray-50":"bg-white"'}>
        <div className="max-w-5xl mx-auto">
            {/** Toggle Button */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl fond-bold">
                    {showHidden?"Undercover Profile":"Main Resume"}
                </h1>
                <button 
                onClick={toggleTheme}
                className={'px-4 py-2 rounded shadow text-white trainsition duration-300 ${showHidden? "bg-purple-600 hover:bg-purple-700" : "bg-blue-600 hover:bg-blue-700"}'}
                >
                {showHidden ? "Switch to Main View" : "Switch to Creative View"}
                </button>
            </div>
        <Objective showHidden={showHidden} />
        <Skills showHidden={showHidden} />
        <Experience showHidden={showHidden} />
        <Projects showHidden={showHidden} />
        <Education showHidden={showHidden} />
        </div>
        </div>
    );
};

export default Dashboard