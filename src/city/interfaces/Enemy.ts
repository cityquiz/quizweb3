import type { Question } from "./Question";

export interface Enemy{
    quiz_name?: string;
    project_name?: string;
    project_id?: string;
    quiz_id?: number;
    name: string;
    src: string;
    questions: Question[];
    options?: any[];
}