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
        <div className={theme.container}>
            {/* Section Header */}
            <div className="flex items-center space-x-3 mb-8">
                <div className={`w-1 h-8 ${showHidden ? 'bg-red-500' : 'bg-blue-500'} rounded-full`}></div>
                <h2 className={`text-3xl font-bold ${theme.text.heading}`}>Objective</h2>
            </div>

            {/* Objective Content */}
            <div className="space-y-6">
                {objective.map((obj, i) => (
                    <div key={i} className="relative">
                        {/* Quote Icon */}
                        <div className={`absolute -top-2 -left-2 text-4xl ${showHidden ? 'text-red-200' : 'text-blue-200'}
                            opacity-50 font-serif`}>
                            "
                        </div>

                        {/* Objective Text */}
                        <div className={`${theme.card} relative overflow-hidden`}>
                            <p className={`${theme.text.primary} text-lg leading-relaxed text-center italic relative z-10`}>
                                {showHidden ? obj.hidden_summary : obj.summary}
                            </p>

                            {/* Decorative Background */}
                            <div className={`absolute inset-0 ${showHidden ? 'bg-red-50' : 'bg-blue-50'}
                                opacity-30 rounded-lg`}>
                            </div>
                        </div>

                        {/* Closing Quote */}
                        <div className={`absolute -bottom-6 -right-2 text-4xl ${showHidden ? 'text-red-200' : 'text-blue-200'}
                            opacity-50 font-serif`}>
                            "
                        </div>
                    </div>
                ))}
            </div>

            {/* Inspirational Footer */}
            
        </div>
    );
};


export default Objective;