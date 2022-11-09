import type { ProjectInput } from "@/models/Inputs/Project";
import type { Project } from "@/models/Project";
const cn= "http://localhost:8000";

const post=(uri: string, args:{})=>{
    return fetch(`${uri}`, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
        })
  .then((response) => response.json())
  .then((data) => {
    return data;
    //console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

const get=(uri: string, args:{}={})=>{
    return fetch(`${uri}`, {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        
        })
  .then((response) => response.json())
  .then((data) => {
    return data;
    //console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


const getProjects= ():Promise<Project[]>=>{
    return get(`${cn}/projects`);
}

const postProject= (data: ProjectInput):Promise<Project>=>{
    return post(`${cn}/projects`, data);
}


const getQuizById=(quiz_id:number)=>{
  debugger;
  return get(`${cn}/quizes/${quiz_id}`);
}


export {
    getProjects,
    postProject,
    getQuizById
}