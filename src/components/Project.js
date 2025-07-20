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
            <h2 className={theme.heading}> Projects</h2>
            {projects.map((proj,i) => (
                <div key={i} className="mb-4">
                    <div className={'${theme.text} front-semibold'}>
                        {proj.title} ({proj.time})
                    </div>
                    <div className="text-sm text-gray-500 mb-1">
                        Tech stack: {proj.tech_stack}    
                    </div>  
                    <p className={theme.text}>{proj.project_description}</p> 
                </div>
            ))
            }
        </div>
    );
};

export default Projects;