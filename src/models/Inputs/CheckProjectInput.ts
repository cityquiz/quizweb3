export interface ReponseQuiz{
    questionId: string;
    responseId: string;
}
export interface CheckProjectInput{
    address: string;
    project_id: string;
    responses: ReponseQuiz[];
}