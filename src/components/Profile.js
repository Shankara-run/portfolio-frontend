import { useEffect, useState } from "react";
import { fetchProfile } from "../api/resumeFunctions";
import { mainTheme, hiddenTheme } from "../styles/theme";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub, FaBehance } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { BiRightArrow } from "react-icons/bi";

const Profile = ({ showHidden, onNavigate, activeSection, onToggle }) => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    fetchProfile().then((res) => {
      const filtered = res.data.filter((pro) =>
        showHidden ? pro.is_hidden : !pro.is_hidden
      );
      setProfile(filtered);
    });
  }, [showHidden]);

  const theme = showHidden ? hiddenTheme : mainTheme;

  return (
    <div className="flex flex-col justify-between h-full">
      {profile.map((p, index) => (
        <div key={index} className="text-center space-y-3">
          {/* Profile Image with Glow Effect */}
          <div className="relative mx-auto w-fit">
            <div
              className={`absolute inset-0 rounded-full blur-xl opacity-30 ${
                showHidden ? "bg-red-400" : "bg-blue-400"
              }`}
            ></div>
            <img
              src={p.image}
              alt="Profile"
              className={`relative rounded-full border-3 ${
                showHidden ? "border-red-300/50" : "border-blue-300/50"
              } shadow-2xl hover:scale-105 transition-transform duration-300`}
              style={{ height: "100px", width: "100px" }}
            />
          </div>

          {/* Name and Title */}
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white drop-shadow-lg">
              {p.name}
            </h2>
            <p className="text-sm text-white/90 font-medium drop-shadow-md">
              {p.title}
            </p>
          </div>

          {/* Contact Icons */}
          <div className="flex justify-center gap-3 mt-3">
            <a
              href={`tel:${p.contact}`}
              className={`p-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30
                hover:bg-white/30 hover:scale-110 transition-all duration-300 text-white shadow-lg
                ${showHidden ? "hover:bg-red-500/30" : "hover:bg-blue-500/30"}`}
              title="Phone"
            >
              <FaPhoneAlt className="text-xs" />
            </a>
            <a
              href={`mailto:${p.email}`}
              className={`p-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30
                hover:bg-white/30 hover:scale-110 transition-all duration-300 text-white shadow-lg
                ${showHidden ? "hover:bg-red-500/30" : "hover:bg-blue-500/30"}`}
              title="Email"
            >
              <MdEmail className="text-xs" />
            </a>
            <a
              href={p.linkedin}
              className={`p-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30
                hover:bg-white/30 hover:scale-110 transition-all duration-300 text-white shadow-lg
                ${showHidden ? "hover:bg-red-500/30" : "hover:bg-blue-500/30"}`}
              title="LinkedIn"
            >
              <FaLinkedinIn className="text-xs" />
            </a>
            <a
              href={p.project_website}
              className={`p-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30
                hover:bg-white/30 hover:scale-110 transition-all duration-300 text-white shadow-lg
                ${showHidden ? "hover:bg-red-500/30" : "hover:bg-blue-500/30"}`}
              title={showHidden ? "Behance" : "GitHub"}
            >
              {showHidden ? (
                <FaBehance className="text-xs" />
              ) : (
                <FaGithub className="text-xs" />
              )}
            </a>
          </div>
        </div>
      ))}

      {/* Navigation Menu */}
      <div className="flex-1 flex flex-col space-y-1.5  justify-center ">
        <h3 className="text-sm font-semibold text-white/90 mb-2 text-center">
          Navigation
        </h3>
        {[
          { name: "Objective", key: "objective" },
          { name: "Skills", key: "skills" },
          { name: "Experience", key: "experience" },
          { name: "Projects", key: "projects" },
          { name: "Education", key: "education" },
        ].map((item) => {
          const isActive = activeSection === item.key;
          return (
            <div
              key={item.key}
              onClick={() => onNavigate && onNavigate(item.key)}
              className={`relative flex items-center space-x-2 px-2 py-1.5 rounded-md backdrop-blur-sm
                border transition-all duration-300 cursor-pointer transform hover:scale-105
                ${
                  isActive
                    ? `${
                        showHidden
                          ? "bg-red-500/30 border-red-300/70 shadow-lg shadow-red-500/20"
                          : "bg-blue-500/30 border-blue-300/70 shadow-lg shadow-blue-500/20"
                      } ring-1 ${
                        showHidden ? "ring-red-400/30" : "ring-blue-400/30"
                      }`
                    : `bg-white/10 border-white/20 hover:bg-white/20 ${
                        showHidden
                          ? "hover:border-red-300/50"
                          : "hover:border-blue-300/50"
                      }`
                } overflow-hidden`}
            >
              {/* Glow effect for active item */}
              {isActive && (
                <div
                  className={`absolute inset-0 ${
                    showHidden ? "bg-red-400" : "bg-blue-400"
                  } opacity-10 animate-pulse rounded-lg`}
                ></div>
              )}
              <BiRightArrow
                className={`relative z-10 transition-all duration-300 ${
                  isActive
                    ? `${
                        showHidden
                          ? "text-red-200"
                          : "text-blue-200"
                      } transform rotate-90 scale-110`
                    : `${
                        showHidden
                          ? "text-red-300"
                          : "text-blue-300"
                      }`
                }`}
              />
              <span
                className={`relative z-10 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-white font-bold drop-shadow-sm"
                    : "text-white/90"
                }`}
              >
                {item.name}
              </span>
              {isActive && (
                <div
                  className={`relative z-10 ml-auto w-2 h-2 rounded-full ${
                    showHidden ? "bg-red-300" : "bg-blue-300"
                  } animate-pulse shadow-lg ${
                    showHidden
                      ? "shadow-red-300/50"
                      : "shadow-blue-300/50"
                  }`}
                ></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Profile Toggle Button */}
      <div className="mt-4 pt-3 border-t border-white/20">
        <button
          onClick={onToggle}
          className={`w-full group flex flex-col items-center space-y-1.5 px-3 py-2.5 rounded-md
            ${
              showHidden
                ? "bg-red-500/20 hover:bg-red-500/30 border border-red-300/30"
                : "bg-blue-500/20 hover:bg-blue-500/30 border border-blue-300/30"
            } backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
        >
          <span className="text-white font-medium text-xs text-center leading-tight">
            {showHidden ? "Check out Technology ?" : "Check out Business ?"}
          </span>

          <div className="flex items-center space-x-1.5">
            <span
              className={`text-xs ${
                showHidden ? "text-red-200" : "text-blue-200"
              }`}
            >
              {showHidden ? "Biz" : "Tech"}
            </span>
            <div
              className={`w-10 h-5 rounded-full relative transition-all duration-300 ${
                showHidden ? "bg-red-600" : "bg-blue-600"
              }`}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 transform shadow-md ${
                  showHidden ? "translate-x-5" : "translate-x-0.5"
                }`}
              ></div>
            </div>
            <span
              className={`text-xs ${
                showHidden ? "text-red-200" : "text-blue-200"
              }`}
            >
              {showHidden ? "Tech" : "Biz"}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Profile;
