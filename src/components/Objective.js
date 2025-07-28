import { useEffect,useState } from "react";
import { fetchObjective } from "../api/resumeFunctions";
import { mainTheme, hiddenTheme } from "../styles/theme";

const Objective = ({showHidden}) => {
    const [objective,setObjective]= useState(null);

    useEffect(()=>{
        fetchObjective().then(res => {
             console.log("Objective data:", res.data);
            setObjective(res.data);
        });
    },[]);

    if (!objective) return <p> Loading...</p>;

    const theme = showHidden? hiddenTheme:mainTheme;

    return(
        <div className="flex flex-col h-screen justify-center  ">
      <h2 className="mt-4  sticky top-0 x-0 z-0">Objective</h2>
      {objective.map((obj, i) => (
        <p key={i} className="text-center">
          {showHidden ? obj.hidden_summary : obj.summary}
        </p>
      ))}
    </div>
    );
};


export default Objective;