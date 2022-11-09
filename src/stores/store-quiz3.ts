import type { ProjectInput } from '@/models/Inputs/Project';
import type { Project } from '@/models/Project';


//import { initializeProvider } from '@metamask/providers';

import { defineStore } from 'pinia'
import { getProjects, postProject } from './api';




interface State {
  project: Project| null;
  projects: Project[];
  loading: boolean;
  message?: string;
  openBag: boolean;
  openProjects:boolean;
  openQuiz:boolean;
  openQuestions:boolean;
  openAnswers:boolean;

  showFormProject: boolean;
  showFormBag: boolean;
  showFormQuiz: boolean;
  showFormQuestion: boolean;
  showFormAnswer: boolean;
}

export const useQuiz = defineStore('city/quiz', {

  state: (): State => ({
    projects:[],
    project: null,
    loading: false,
    openAnswers:false,
    openBag:false,
    openProjects:false,
    openQuestions:false,
    openQuiz:false,

    showFormProject: false,
    showFormBag: false,
    showFormQuiz: false,
    showFormQuestion: false,
    showFormAnswer: false
  }),
  getters: {
    getProject: (state) => state.project,
    getProjects: (state) => state.projects,
    getQuiz: (state) => state.project?.quiz,
    getQuizes: (state) => state.project?.quizes,
    getQuestion: (state) => state.project?.quiz?.question,
    getQuestions: (state) => state.project?.quiz?.questions,
    

    isLoading: (state) => state.loading,
    isOpenAnswers: (state) => state.openAnswers,
    isOpenBag: (state) => state.openBag,
    isOpenProjects: (state) => state.openProjects,
    isOpenQuestions: (state) => state.openQuestions,
    isOpenQuiz: (state) => state.openQuiz,
  },
  actions: {
    requestProjects(){
      getProjects().then((res:Project[])=>{
        this.projects=res;
      });
    },

    registerProject(){
      if(this.project){
        postProject(this.project as ProjectInput).then((res:Project)=>{
          this.project=res;
        });
      }
    },

    selectProject(id: number|null){
      debugger
      if(id!=null){
        this.project = this.projects.find(item=>item.id==id)??null;
        
        console.log(this.project);
      }else{
        this.project={
          name:'',
          description:'',
          logo:''
        }
      }
    },
    clearProject(){
      this.project=null;
    },

    selectQuiz(id:number | null){
      if(this.project==null){
        alert("Elija un projecto!");
        return;
      }
      if(id!=null){
        this.project.quiz = this.project!.quizes!.find(item=>item.id==id);
        
        console.log(this.project);
      }else{
        this.project.quiz={
          project_id: this.project.id!,
          questions:[],
          name:'',
        }
      }
    },
    clearQuiz(){
      if(this.project){
        this.project.quiz=undefined;
      }
    },

    toggleProjects(){
      this.openProjects=!this.openProjects;
      this.openBag=false;
      this.openQuiz=false;
      this.openQuestions=false;
      this.openAnswers=false;
    },
    toggleBag(){
      this.openProjects=false;
      this.openBag=!this.openBag;
      this.openQuiz=false;
      this.openQuestions=false;
      this.openAnswers=false;
    },
    toggleQuiz(){
      this.openProjects=false;
      this.openBag=false;
      this.openQuiz=!this.openQuiz;
      this.openQuestions=false;
      this.openAnswers=false;
    },
    toggleQuestions(){
      this.openProjects=false;
      this.openBag=false;
      this.openQuiz=false;
      this.openQuestions=!this.openQuestions;
      this.openAnswers=false;
    },
    toggleAnswers(){
      this.openProjects=false;
      this.openBag=false;
      this.openQuiz=false;
      this.openQuestions=false;
      this.openAnswers=!this.openAnswers;
    },

    showProject(toggle: boolean){
      this.showFormProject=toggle;
    },
    showBag(toggle: boolean){
      this.showFormBag=toggle;
    },
    showQuiz(toggle: boolean){
      this.showFormQuiz=toggle;
    },
    showQuestion(toggle: boolean){
      this.showFormQuestion=toggle;
    },
    showAnswer(toggle: boolean){
      this.showFormAnswer=toggle;
    },

    clear() {
      this.$reset()
    }
  }
})


