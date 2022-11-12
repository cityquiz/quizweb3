export interface ReponseQuiz{
    quiz_id: number;
    answer_id: number;
}
export interface CheckProjectInput{
    address: string;
    project_id: string;
    responses: ReponseQuiz[];
}