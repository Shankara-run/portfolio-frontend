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
        <h2 className={theme.heading}>Skills</h2>
        <ul className="list-disc pl-6">
            {skills.map((skill,i)=>(
               <li key={i} className={theme.text} >
                <strong>{skill.category}</strong>: {skill.tools}
               </li>
            ))}
        </ul>
    </div>
)
};
export default Skills;