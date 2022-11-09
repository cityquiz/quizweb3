import type { Quiz } from "./Quiz";
export interface Project{
    name: string;
    logo: string;
    description: string;
    id?: number;
    quizes?: Quiz[];
    quiz?:Quiz | null;
}