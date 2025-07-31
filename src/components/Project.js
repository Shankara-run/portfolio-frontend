import { useEffect, useState } from "react";
import { fetchProject } from "../api/resumeFunctions";
import { mainTheme,hiddenTheme } from "../styles/theme";

const Projects = ({showHidden}) => {
    const [projects,setProjects]= useState([]);
    const theme= showHidden? hiddenTheme:mainTheme;

    useEffect(()=>{
        fetchProject().then(res=>{
            const filtered = res.data.filter(pro=>
                showHidden? pro.is_hidden: !pro.is_hidden
            );
        setProjects(filtered);
        });
    },[showHidden]);

    return(
        <div className={theme.container}>
            {/* Section Header */}
            <div className="flex items-center space-x-3 mb-8">
                <div className={`w-1 h-8 ${showHidden ? 'bg-red-500' : 'bg-blue-500'} rounded-full`}></div>
                <h2 className={`text-3xl font-bold ${theme.text.heading}`}>Projects</h2>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((proj, i) => (
                    <div
                        key={i}
                        className={`${theme.card} group hover:scale-105 transform transition-all duration-300
                            hover:shadow-2xl relative overflow-hidden`}
                    >
                        {/* Project Header */}
                        <div className="mb-4">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className={`text-xl font-bold ${theme.text.heading} group-hover:${theme.text.accent}
                                    transition-colors duration-300`}>
                                    {proj.title}
                                </h3>
                                <span className={`text-sm px-3 py-1 rounded-full font-medium
                                    ${showHidden ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {proj.time}
                                </span>
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="mb-4">
                            <h4 className={`text-sm font-semibold ${theme.text.secondary} mb-2 uppercase tracking-wide`}>
                                Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {proj.tech_stack.split(',').map((tech, index) => (
                                    <span
                                        key={index}
                                        className={`px-2 py-1 text-xs rounded-md font-medium
                                            ${showHidden ?
                                                'bg-red-50 text-red-600 border border-red-200' :
                                                'bg-blue-50 text-blue-600 border border-blue-200'
                                            } hover:shadow-sm transition-all duration-200`}
                                    >
                                        {tech.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Project Description */}
                        <div className={`${theme.text.primary} leading-relaxed mb-4`}>
                            {proj.project_description.split('\n').map((paragraph, index) => (
                                <p key={index} className="mb-2 last:mb-0">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        
                        

                        {/* Hover Effect Border */}
                        <div className={`absolute inset-0 border-2 border-transparent rounded-lg
                            group-hover:border-${showHidden ? 'red' : 'blue'}-200 transition-colors duration-300`}>
                        </div>
                    </div>
                ))}
            </div>

            
        </div>
    );
};

export default Projects;