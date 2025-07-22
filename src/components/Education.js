import { useEffect,useState } from "react";
import { fetchEducation } from "../api/resumeFunctions";
import { mainTheme,hiddenTheme } from "../styles/theme";

const Education = ({showHidden}) =>{
    const [educations,setEducation]= useState([]);
    const theme= showHidden? hiddenTheme : mainTheme;

    useEffect(()=>{
        fetchEducation().then(res=>{
            const filter = res.data.filter(edu=>
                showHidden? edu.is_hidden: !edu.is_hidden          
            );
            setEducation(filter);
        })
    },[showHidden]) 
    return (
        <div className={theme.container}>
            <h2 className={theme.heading}>
                Education
            </h2>
            <ul className=" list-disc pl-6">
            {educations.map((edu,index)=>( 
            <div key={index} className="mb-3">
                <div className={theme.text}>
                    {edu.institute}
                </div>
                <div className={theme.text}>
                    {edu.year} | {edu.category} | Marks: {edu.marks}
                </div>
            </div>  
            )
        )} </ul> 

        </div>
       
    );

};

export default Education;