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
                <ul >
                <div key={i}>
                    <div className={`${theme.text} font-semibold`}>
                        {proj.title} ({proj.time})
                    </div>
                    <div className={theme.text}>
                        Tech stack: {proj.tech_stack}    
                    </div>  
                    <p className={theme.text}>{proj.project_description}</p> 
                </div>
                </ul>
            ))
            }
        </div>
    );
};

export default Projects;