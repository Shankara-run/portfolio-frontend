import { useState, useRef, useEffect } from "react";
import Profile from "./components/Profile";
import Objective from "./components/Objective";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Project";
import Education from "./components/Education";
import './App.css';
import { mainTheme, hiddenTheme } from "./styles/theme";
import ChatComponent from "./components/ChatComponent";


function App() {
  const [showHidden, setShowHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('objective');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleToggle = () => setShowHidden(prev => !prev);

  // Refs for scrolling to sections
  const objectiveRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const educationRef = useRef(null);
  const chatRef = useRef(null);


  const theme = showHidden ? hiddenTheme : mainTheme;

  // Navigation function
  const scrollToSection = (sectionName) => {
    setActiveSection(sectionName);
    const refs = {
      objective: objectiveRef,
      skills: skillsRef,
      experience: experienceRef,
      projects: projectsRef,
      education: educationRef,
      chat: chatRef

    };

    if (refs[sectionName]?.current) {
      refs[sectionName].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Scroll spy functionality with debouncing
  useEffect(() => {
    let timeoutId;

    const handleScroll = (e) => {
      // Clear previous timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Debounce the scroll handling
      timeoutId = setTimeout(() => {
        const mainContent = e.target;
        const sections = [
          { name: 'objective', ref: objectiveRef },
          { name: 'skills', ref: skillsRef },
          { name: 'experience', ref: experienceRef },
          { name: 'projects', ref: projectsRef },
          { name: 'education', ref: educationRef },
          { name: 'chat', ref: chatRef }
        ];

        const scrollPosition = mainContent.scrollTop + 200; // Offset for better UX
        let currentSection = activeSection; // Keep current as default

        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          if (section.ref.current) {
            const sectionTop = section.ref.current.offsetTop;
            const sectionHeight = section.ref.current.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;

            // Check if the section is currently in view with some threshold
            if (scrollPosition >= sectionTop - 50 && scrollPosition < sectionBottom + 50) {
              currentSection = section.name;
              break;
            }
          }
        }

        // Only update if there's actually a change
        if (currentSection !== activeSection) {
          setActiveSection(currentSection);
        }
      }, 100); // 100ms debounce
    };

    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
      // Initial check with delay
      setTimeout(() => {
        if (mainContent) {
          handleScroll({ target: mainContent });
        }
      }, 500);

      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        mainContent.removeEventListener('scroll', handleScroll);
      };
    }
  }, [activeSection]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [sidebarOpen]);

  return (
    <div className={`min-h-screen ${theme.gradients.primary}`}>
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-50 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
      </div>

      {/* Fixed Desktop Sidebar - Only visible on large screens */}
      <div className={`fixed left-0 top-0 w-80 h-screen ${theme.gradients.sidebar} z-30 hidden lg:block`}>
        {/* Active Section Indicator */}
        <div className={`absolute left-0 top-0 w-1 h-full ${showHidden ? 'bg-red-500/20' : 'bg-blue-500/20'}`}>
          <div
            className={`w-full h-12 ${showHidden ? 'bg-red-500' : 'bg-blue-500'} rounded-r-full
              transition-all duration-500 ease-in-out shadow-lg`}
            style={{
              transform: `translateY(${
                activeSection === 'objective' ? '280px' :
                activeSection === 'skills' ? '310px' :
                activeSection === 'experience' ? '340px' :
                activeSection === 'projects' ? '370px' :
                activeSection === 'education' ? '400px' :
                activeSection === 'chat' ? '430px' : '280px'
              })`,
              opacity: activeSection ? 1 : 0
            }}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"></div>



        {/* Sidebar Content - No Scroll */}
        <div className="h-full">
          <div className="relative z-10 p-3 h-full">
            <Profile
              showHidden={showHidden}
              onNavigate={scrollToSection}
              activeSection={activeSection}
              onToggle={() => setShowHidden(prev => !prev)}
            />
          </div>
         
        </div>
      </div>

      {/* Mobile Menu Button - Fixed position */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className={`p-3 rounded-full ${showHidden ? 'bg-red-600' : 'bg-blue-600'}
            text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110
            backdrop-blur-sm border border-white/20`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>



      {/* Mobile Sidebar Overlay */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
        sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
        <div className={`absolute left-0 top-0 w-80 h-full ${theme.gradients.sidebar}
          transform transition-transform duration-300 ease-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/20 text-white
              hover:bg-white/30 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Active Section Indicator for Mobile */}
          <div className={`absolute left-0 top-0 w-1 h-full ${showHidden ? 'bg-red-500/20' : 'bg-blue-500/20'}`}>
            <div
              className={`w-full h-12 ${showHidden ? 'bg-red-500' : 'bg-blue-500'} rounded-r-full
                transition-all duration-500 ease-in-out shadow-lg`}
              style={{
                transform: `translateY(${
                  activeSection === 'objective' ? '280px' :
                  activeSection === 'skills' ? '310px' :
                  activeSection === 'experience' ? '340px' :
                  activeSection === 'projects' ? '370px' :
                  activeSection === 'education' ? '380px' :
                  activeSection === 'chat' ? '410px' : '280px'
                })`,
                opacity: activeSection ? 1 : 0
              }}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"></div>
          <div className="h-full">
            <div className="relative z-10 p-3 pt-16 h-full">
              <Profile
                showHidden={showHidden}
                onNavigate={(section) => {
                  scrollToSection(section);
                  setSidebarOpen(false);
                }}
                activeSection={activeSection}
                onToggle={() => setShowHidden(prev => !prev)}
              />
               
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="min-h-screen lg:ml-80">
        <div className="h-screen overflow-y-auto main-content">
          <div className="p-6 lg:p-8">


            {/* Header */}
            <div className="text-center mb-12 mt-20 lg:mt-0">
              <h1 className={`text-4xl lg:text-5xl font-bold ${theme.text.heading} mb-4`}>
                Professional Showcase
                
              </h1>
              <div className={`w-24 h-1 ${showHidden ? 'bg-red-500' : 'bg-blue-500'} mx-auto rounded-full`}></div>
              <p className={`mt-4 text-lg ${theme.text.secondary} max-w-3xl mx-auto`}>
                {showHidden
                  ? "Exploring creative ventures, artistic projects, and innovative business solutions"
                  : "Showcasing technical expertise, development projects, and engineering excellence"
                }
              </p>
            </div>

          {/* Content Sections with Refs */}
          <div className="space-y-12">
            <div ref={objectiveRef} id="objective" className="section-spacing">
              <Objective showHidden={showHidden} />
            </div>

            <div ref={skillsRef} id="skills" className="section-spacing">
              <Skills showHidden={showHidden} />
            </div>

            <div ref={experienceRef} id="experience" className="section-spacing">
              <Experience showHidden={showHidden} />
            </div>

            <div ref={projectsRef} id="projects" className="section-spacing">
              <Projects showHidden={showHidden} />
            </div>

            <div ref={educationRef} id="education" className="section-spacing">
              <Education showHidden={showHidden} />
            </div>

            <div ref={chatRef} id="chat" className="section-spacing">
              <ChatComponent showHidden={showHidden} theme={theme} />
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-8 mt-12 border-t border-gray-200/50">
            <p className={`${theme.text.secondary} text-sm`}>
              © 2024 Portfolio Dashboard. Crafted with ❤️ using React & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
      </div>
    
    </div>
    
  );
}

export default App;

