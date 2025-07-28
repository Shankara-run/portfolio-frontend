import { useEffect, useState } from "react";
import { fetchProfile } from "../api/resumeFunctions";
import { mainTheme, hiddenTheme } from "../styles/theme";
import {FaLinkedinIn}  from 'react-icons/fa' 
import { FaGithub , FaBehance } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { BiRightArrow } from "react-icons/bi";


const Profile = ({ showHidden }) => {
  const [profile, setProfile] = useState([]);
 // const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile()
      .then((res) => {
        const filtered = res.data.filter(pro =>
          showHidden ? pro.is_hidden : !pro.is_hidden
        )
        setProfile(filtered);
      })
      //.catch((err) => {
      //  console.error("Error fetching profile:", err);
      //  setError("Failed to load profile.");
      //});
  }, [showHidden]);

  const theme = showHidden ? hiddenTheme : mainTheme;

  //if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;
  //if (!profile || profile.length === 0) return <div className="text-gray-500 text-center mt-4">Loading...</div>;

  return (
    <div  className="space-y-4 ">
      {profile.map((p, index) => (
        <div key={index} className="container space-y-3 ">
          <img
            src={p.image}
            alt="Profile"
            className={`h-32 rounded-full mb-4 border-4 ${showHidden? "border-red-950" : "border-blue-950"}`}
          />
          <h2 className="">{p.name}</h2>
          <p className="" >{p.title}</p>
            <div className="flex  flex-row gap-8 mt-4">
            <a href={`tel:${p.contact}`} ><FaPhoneAlt/></a>
            <a href={`mailto:${p.email}`}><MdEmail/></a>
            <a href={`${p.linkedin}`}><FaLinkedinIn/></a>
            {showHidden? <a href={`${p.project_website}`}><FaBehance/></a> :  <a href={`${p.project_website}`}><FaGithub/></a>   }
            
            </div>
        </div>
      ))}
      <div>
        {["objective","Experience","Projects"].map((item)=>(
          
          <p key={item} className=""><BiRightArrow/>{item}</p>
          
          ))}
      </div>
    </div>
  );
};

export default Profile;
