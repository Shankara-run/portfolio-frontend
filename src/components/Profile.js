import { useEffect, useState } from "react";
import { fetchProfile } from "../api/resumeFunctions";
import { mainTheme, hiddenTheme } from "../styles/theme";

const Profile = ({ showHidden }) => {
  const [profile, setProfile] = useState([]);
 // const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile()
      .then((res) => {
        const filtered = res.data.filter(pro =>
          showHidden ? pro.is_hidden : !pro.is_hidden
        );
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
    <div>
      {profile.map((p, index) => (
        <div key={index} className={`${theme.container} flex flex-col items-center text-center p-6 `}>
          <img
            src={p.image}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-gray-300 shadow-lg"
          />
          <h2 className={theme.heading}>{p.name}</h2>
          <p className={theme.heading}>{p.title}</p>
          <div className={theme.text}>
            <p className>Contact: {p.contact}</p>
            <p className>Email: {p.email}</p>
            <p className>LinkedIn: {p.linkedin}</p>
            <p className>Instagram: {p.instagram}</p>
            <p className>Website: {p.project_website}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
