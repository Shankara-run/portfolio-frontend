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
            {/* Section Header */}
            <div className="flex items-center space-x-3 mb-8">
                <div className={`w-1 h-8 ${showHidden ? 'bg-red-500' : 'bg-blue-500'} rounded-full`}></div>
                <h2 className={`text-3xl font-bold ${theme.text.heading}`}>Education</h2>
            </div>

            {/* Education Timeline */}
            <div className="space-y-6">
                {educations.map((edu, index) => (
                    <div
                        key={index}
                        className={`${theme.card} hover:scale-[1.02] transition-all duration-300 relative overflow-hidden`}
                    >
                        {/* Education Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                            <h3 className={`text-xl font-bold ${theme.text.heading} mb-2 sm:mb-0`}>
                                {edu.institute}
                            </h3>
                            <div className={`flex items-center space-x-2 text-sm ${theme.text.secondary}`}>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">{edu.year}</span>
                            </div>
                        </div>

                        {/* Education Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <h4 className={`text-sm font-semibold ${theme.text.secondary} mb-1 uppercase tracking-wide`}>
                                    Category
                                </h4>
                                <p className={`${theme.text.accent} font-medium`}>
                                    {edu.category}
                                </p>
                            </div>
                            <div>
                                <h4 className={`text-sm font-semibold ${theme.text.secondary} mb-1 uppercase tracking-wide`}>
                                    Performance
                                </h4>
                                <div className="flex items-center space-x-2">
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold
                                        ${showHidden ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {edu.marks}
                                    </span>
                                    <div className={`flex-1 h-2 rounded-full ${showHidden ? 'bg-red-100' : 'bg-blue-100'}`}>
                                        <div
                                            className={`h-full rounded-full ${showHidden ? 'bg-red-500' : 'bg-blue-500'}
                                                transition-all duration-1000 ease-out`}
                                            style={{
                                                width: `${Math.min(parseFloat(edu.marks.replace('%', '')) || 85, 100)}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className={`absolute top-0 right-0 w-16 h-16 transform translate-x-8 -translate-y-8
                            ${showHidden ? 'bg-red-100' : 'bg-blue-100'} rounded-full opacity-20`}>
                        </div>

                        <div className={`absolute bottom-2 right-2 w-2 h-2 rounded-full
                            ${showHidden ? 'bg-red-300' : 'bg-blue-300'} opacity-50`}>
                        </div>

                        {/* Academic Icon */}
                        <div className={`absolute top-4 left-4 ${showHidden ? 'text-red-200' : 'text-blue-200'} opacity-30`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* Education Summary */}
            {educations.length > 0 && (
                <div className={`mt-8 p-4 rounded-lg ${showHidden ? 'bg-red-50/50' : 'bg-blue-50/50'}
                    border ${showHidden ? 'border-red-100' : 'border-blue-100'}`}>
                    <p className={`text-center ${theme.text.secondary} italic`}>
                        🎓 {educations.length} educational milestone{educations.length !== 1 ? 's' : ''} achieved
                    </p>
                </div>
            )}
        </div>
    );

};

export default Education;