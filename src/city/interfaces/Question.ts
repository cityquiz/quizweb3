import type { Option } from "./Option";

export interface Question{
    response_correct_id?: string;

    
    id: string;
    question: string;
    options: Option[];
}