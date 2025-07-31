import { useEffect , useState} from "react"
import { mainTheme,hiddenTheme } from "../styles/theme"
import { fetchExperience } from "../api/resumeFunctions"

const Experience = ({showHidden}) => {
    const [experiences,setExperiences] =useState([]);

    const theme= showHidden? hiddenTheme:mainTheme;

    useEffect(()=>{
        fetchExperience().then( response =>{
            const filtered =response.data.filter( exp =>
                showHidden? exp.is_hidden: !exp.is_hidden
            ); 
            setExperiences(filtered);
        }
        );
    },[showHidden]);


    return(
    <div className={`${theme.container}`}>
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-8">
            <div className={`w-1 h-8 ${showHidden ? 'bg-red-500' : 'bg-blue-500'} rounded-full`}></div>
            <h2 className={`text-3xl font-bold ${theme.text.heading}`}>Experience</h2>
        </div>

        {/* Timeline */}
        <div className="relative">
            {/* Timeline Line */}
            <div className={`absolute left-6 top-0 bottom-0 w-0.5 ${showHidden ? 'bg-red-200' : 'bg-blue-200'}`}></div>

            {experiences.map((exp, i) => (
                <div key={i} className="relative mb-12 last:mb-0">
                    {/* Timeline Dot */}
                    <div className={`absolute left-4 w-4 h-4 rounded-full border-4 border-white shadow-lg
                        ${showHidden ? 'bg-red-500' : 'bg-blue-500'} z-10`}>
                    </div>

                    {/* Experience Card */}
                    <div className={`ml-16 ${theme.card} hover:scale-[1.02] transition-all duration-300`}>
                        {/* Header */}
                        <div className="mb-4">
                            <h3 className={`text-xl font-bold ${theme.text.heading} mb-2`}>
                                {exp.title}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <p className={`text-lg font-semibold ${theme.text.accent}`}>
                                    @ {exp.company}
                                </p>
                                <div className={`flex items-center space-x-4 text-sm ${theme.text.secondary}`}>
                                    <span className="flex items-center space-x-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                        <span>{exp.time}</span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        <span>{exp.location}</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className={`${theme.text.primary} leading-relaxed`}>
                            {exp.work_description.split('\n').map((paragraph, index) => (
                                <p key={index} className="mb-2 last:mb-0">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                       
                    </div>
                </div>
            ))}
        </div>

        
    </div>
    );
};
export default Experience; 