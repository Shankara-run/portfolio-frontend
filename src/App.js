import { useState } from "react";
import Profile from "./components/Profile";
import Objective from "./components/Objective";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Project";
import Education from "./components/Education";
import './App.css';
import { mainTheme,hiddenTheme } from "./styles/theme";
function App() {

  const [showHidden, setShowHidden] = useState(false);
  const handleToggle = () => 
    setShowHidden(prev=>!prev)
  
    const theme = showHidden? hiddenTheme:mainTheme;

  return (
    <div className={`grid grid-cols-4 ${showHidden ? "bg-red-100" : "bg-sky-100"}`}>
         
      <div className="col-span-1  overflow-auto relative p-4 h-screen ">
        <Profile showHidden={showHidden} />
        <div className="absolute top-4 right-2 ">
        <input
          
          type="checkbox"
          checked={showHidden}
          onChange={handleToggle}
          className=" appearance-none w-10 h-5 bg-gray-300 rounded-full checked:bg-blue-500 transition-colors relative 
            before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:w-4 before:h-4 before:bg-white before:rounded-full 
            before:transition-transform checked:before:translate-x-5"
        />
        </div>
     </div>
      <div className="col-span-3 overflow-y-scroll p-4 h-screen ">
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
