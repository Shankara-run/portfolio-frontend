import { useEffect, useState } from "react";
import { fetchSkills } from "../api/resumeFunctions";
import { hiddenTheme, mainTheme } from "../styles/theme";

const Skills = ({showHidden})=> {
    const [skills,setSkills]= useState([]);
    const theme= showHidden?hiddenTheme:mainTheme;
    

useEffect(()=>{
    fetchSkills().then(response=>{
        const filtered = response.data.filter(skill=> 
            showHidden? skill.is_hidden_skill: !skill.is_hidden_skill
        );
        setSkills(filtered);
    });
},[showHidden]);

return(
    <div className={theme.container}>
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-6">
            <div className={`w-1 h-8 ${showHidden ? 'bg-red-500' : 'bg-blue-500'} rounded-full`}></div>
            <h2 className={`text-3xl font-bold ${theme.text.heading}`}>Skills</h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill, i) => (
                <div
                    key={i}
                    className={`${theme.card} group hover:scale-105 transform transition-all duration-300`}
                >
                    {/* Skill Category */}
                    <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-3 h-3 rounded-full ${showHidden ? 'bg-red-400' : 'bg-blue-400'}
                            group-hover:scale-125 transition-transform duration-300`}>
                        </div>
                        <h3 className={`font-bold text-lg ${theme.text.accent}`}>
                            {skill.category}
                        </h3>
                    </div>

                    {/* Skill Tools */}
                    <div className={`${theme.text.secondary} leading-relaxed`}>
                        {skill.tools.split(',').map((tool, index) => (
                            <span
                                key={index}
                                className={`inline-block px-3 py-1 m-1 text-sm rounded-full
                                    ${showHidden ? 'bg-red-50 text-red-700 border border-red-200' :
                                      'bg-blue-50 text-blue-700 border border-blue-200'}
                                    hover:shadow-md transition-all duration-200`}
                            >
                                {tool.trim()}
                            </span>
                        ))}
                    </div>

                    {/* Decorative Element */}
                    <div className={`absolute top-2 right-2 w-2 h-2 rounded-full
                        ${showHidden ? 'bg-red-200' : 'bg-blue-200'} opacity-50
                        group-hover:opacity-100 transition-opacity duration-300`}>
                    </div>
                </div>
            ))}
        </div>

        {/* Skills Summary */}
        <div className={`mt-8 p-4 rounded-lg ${showHidden ? 'bg-red-50/50' : 'bg-blue-50/50'}
            border ${showHidden ? 'border-red-100' : 'border-blue-100'}`}>
            <p className={`text-center ${theme.text.secondary} italic`}>
                💡 Hover over skill cards to see interactive effects
            </p>
        </div>
    </div>
)
};
export default Skills;