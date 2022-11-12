import type { Option } from "./Option";

export interface Question{
    response_correct_id?: string;

    
    id?: number;
    quiz_id: number;
    name: string;
    options?: Option[];
}