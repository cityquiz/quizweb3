import type { Question } from "@/city/interfaces/Question";


export interface Quiz {
          id?: number;
          project_id:number;
          answer_id?: number;
          name: string;
          questions: Question[];
          question?: Question;
          answer?:Question;
}