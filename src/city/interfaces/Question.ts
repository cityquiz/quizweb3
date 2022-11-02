import type { Option } from "./Option";

export interface Question{
    id: string;
    question: string;
    options: Option[];
}