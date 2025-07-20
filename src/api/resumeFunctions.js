import api from "./api"

export const fetchObjective=()=> api.get("/objectives");
export const fetchSkills=() => api.get("/skills");
export const fetchExperience=()=> api.get("/experiences");
export const fetchProject=()=> api.get("/projects");
export const fetchEducation=()=> api.get("/educations")

