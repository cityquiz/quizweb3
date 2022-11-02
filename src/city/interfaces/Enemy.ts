import type { Question } from "./Question";

export interface Enemy{
    name: string;
    src: string;
    questions: Question[];
}