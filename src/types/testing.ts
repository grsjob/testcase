interface Answer{
    id: string;
    label: string;
    weight: number;
}
export interface Question {
    id: string;
    title: string;
    wants_comment: number;
    answers: Answer[]
}
export interface ComponentUnderTest {
    id: string;
    name: string;
    sort: number;
    questions: Question[];
}


export interface TestinComponentsResponse {
    status: string;
    page_id: string;
    title: string;
    components: ComponentUnderTest[]
}


