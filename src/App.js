import { useState } from "react";
import Profile from "./components/Profile";
import Objective from "./components/Objective";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Project";
import Education from "./components/Education";
import "./styles/theme.css";

function App() {

  const [showHidden, setShowHidden] = useState(false);
  const handleToggle = () => 
    setShowHidden(prev=>!prev)
  ;

  return (
    <div className={`min-h-screen p-6 ${showHidden ? "bg-red-100" : "bg-sky-100"}`}>
      
      {/* Toggle Switch */}
      <div className="flex justify-end mb-4">
      <label className="inline-flex cursor-pointer items-center">
        <span className="mr-2 text-gray-700 font-normal">
          {showHidden ? "Technology" : "Creative"}
        </span>
        <input
          type="checkbox"
          checked={showHidden}
          onChange={handleToggle}
          className="appearance-none w-10 h-5 bg-gray-300 rounded-full checked:bg-blue-500 transition-colors relative 
            before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:w-4 before:h-4 before:bg-white before:rounded-full 
            before:transition-transform checked:before:translate-x-5"
        />
        <div>
        </div>
      </label>
    </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
         <Profile showHidden={showHidden} />
        </div>
        <Objective showHidden={showHidden} />
        <Skills showHidden={showHidden} />
        <Experience showHidden={showHidden} />
        <Projects showHidden={showHidden} />
        <Education showHidden={showHidden} />
      </div>
    </div>
  );
}

export default App;
