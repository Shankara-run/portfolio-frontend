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
    <div className={theme.container}>
        <h2 className={theme.heading}>
            Experience
        </h2>
        <ul className="list-disc pl-6">
            {experiences.map((exp,i)=>(
                <li key={i} className={theme.txt}>
                    <div className={`${theme.text} font-semibold`}>
                        {exp.title} @ {exp.company}
                    </div>
                    <div className={theme.txt}>
                        {exp.time}| {exp.location}
                    </div>
                    <p className={theme.txt}>{exp.work_description}</p>
                </li>
            ))}
        </ul>
    </div>
    );
};
export default Experience; 