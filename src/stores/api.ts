import { Enemies } from "@/city/Content/enemies";
import type { UserInput } from "@/models/Inputs/UserInput";
import type { AnswerInput } from "@/models/Inputs/AnswerInput";
import type { CheckProjectInput } from "@/models/Inputs/CheckProjectInput";
import type { ProjectInput } from "@/models/Inputs/Project";
import type { QuestionInput } from "@/models/Inputs/QuestionInput";
import type { QuizInput } from "@/models/Inputs/QuizInput";
import type { ClaimTokenInput } from "@/models/Inputs/ClaimTokenInput";
import type { Project } from "@/models/Project";

const cn= "http://localhost:3000";

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

const postQuiz=(data:QuizInput)=>{
  return post(`${cn}/quizes`, data);
}


const postQuestion=(data:QuestionInput)=>{
  return post(`${cn}/questions`, data);
}

const postAnswer=(data:AnswerInput)=>{
  return post(`${cn}/answer`, data);
}

const postRegister=(data: UserInput)=>{
  return post(`${cn}/register`, data);
}

const postLoginUser=(address: string)=>{
  return post(`${cn}/login`, {address});
}




const getProjectQuizById=(project_id:string):Promise<Project>=>{
  const quiz= {
    "name": "Npc1",
    "logo": "logo.jpg",
    "description": "description for moonbean",
    "id": 1,
    "quizes": [
      {
        "id": 2,
        "name": "la capita de chevala",
        "questions": [
          {
            "id": 4,
            "question": "Lima"
          },
          {
            "id": 5,
            "question": "Talara"
          },
          {
            "id": 6,
            "question": "Panama"
          }
        ]
      }
    ]
  };
  


  /* return  new Promise((resolve, reject) => {
    resolve(quiz as unknown as Project);
      //reject(new Error("Something awful happened"));
    }); */
  return get(`${cn}/projects/${project_id}`);
}






const postCheckQuizProject=async (response:CheckProjectInput)=>{
  //const Enemies.values
  
  //await sleep(10000);
  console.log(response);
   return post(`${cn}/projects/resolve`,response);
  
}


const postRegisterToken=async (response:ClaimTokenInput)=>{
  //const Enemies.values
  
  //await sleep(10000);
  console.log(response);
   return post(`${cn}/user/register/token`,response);
  
}




const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export {
    getProjects,
    postProject,
    postQuiz,
    postQuestion,
    postAnswer,
    getProjectQuizById,
    postCheckQuizProject,
    postRegister,
    postLoginUser,
    postRegisterToken
}