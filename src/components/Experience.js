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
        <ul>
            {experiences.map((exp,i)=>(
                <li key={i} className="mb-4">
                    <div className={'${theme.text} font-semibold'}>
                        {exp.title} @ {exp.company}
                    </div>
                    <div className="text-sm text-gray-500">
                        {exp.time}| {exp.location}
                    </div>
                    <p className={'${theme.text} mt-1'}>{exp.work_description}</p>
                </li>
            ))}
        </ul>
    </div>
    );
};
export default Experience; 