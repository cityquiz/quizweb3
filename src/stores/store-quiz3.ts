import type { ProjectInput } from '@/models/Inputs/Project';
import type { QuizInput } from '@/models/Inputs/QuizInput';
import type { Project } from '@/models/Project';
import type { Question } from '@/models/Question';
import type { Quiz } from '@/models/Quiz';


//import { initializeProvider } from '@metamask/providers';

import { defineStore } from 'pinia'
import { getProjects, postAnswer, postProject, postQuestion, postQuiz } from './api';
import { useWallet } from './store-wallet';




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
          this.projects.push(res);
        });
      }
    },

    selectProject(id: number|null){
      
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



    registerQuiz(){
      if(this.project?.quiz){
        postQuiz(this.project!.quiz).then((res:Quiz)=>{
          this.project!.quiz=res;
          if(this.project!.quizes==undefined){
            this.project!.quizes=[];
          }
          this.project!.quizes!.push(res);
        });
      }
    },

    selectQuiz(id:number | null){
      if(this.project==null){
        alert("Elija un projecto!");
        return;
      }
      
      if(id!=null){
        this.project.quiz = this.project!.quizes!.find(item=>item.id==id);
        if(!this.project.quiz!.answer){
          this.project.quiz!.answer = {
            id:0,
            quiz_id: this.project.quiz!.id!,
            name:''
          }
        }
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


    registerQuestion(){
      if(this.project?.quiz?.question){
        postQuestion(this.project!.quiz!.question).then((res:Question)=>{
          this.project!.quiz!.question=res;
          if(this.project!.quiz!.questions==undefined){
            this.project!.quiz!.questions=[];
          }
          this.project!.quiz!.questions!.push(res);
        });
      }
    },
    selectQuestion(id?:number){
      
      if(!this.project && !this.project!.quiz){
        alert("Elija un  un quiz!");
        return;
      }
      if(id!=null){
        this.project!.quiz!.question = this.project!.quiz!.questions.find(item=>item.id==id);
        
        console.log(this.project?.quiz?.question);
      }else{
        this.project!.quiz!.question={
          quiz_id: this.project!.quiz!.id!,
          name:'',
        }
      }
    },
    clearQuestion(){
      if(this.project?.quiz?.question){
        this.project.quiz.question=undefined;
      }
    },


    registerAnswer(){
      if(this.project?.quiz?.answer){
        const question_id = this.project.quiz.answer.id;
        const quiz_id = this.project.quiz.id;
        postAnswer({question_id: question_id!, quiz_id:quiz_id!}).then((res:Question)=>{
          this.project!.quiz!.answer=res;
          
          console.log(res)
          //this.project!.quiz!.questions!.push(res);
        });
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

      if(this.openBag){
        const store= useWallet();
        //store.getUri()
      }
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


