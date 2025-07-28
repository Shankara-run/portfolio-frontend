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
        <h2 >
            Experience
        </h2>
        {experiences.map((exp,i)=>(
        <ul key={i} >
                    
                    <div>
                        {exp.title} @ {exp.company}                  
                    <div >
                        {exp.time}| {exp.location}
                    </div>
                    </div>
                    <div >{exp.work_description}</div>
        </ul>
    ))}
        
    </div>
    );
};
export default Experience; 