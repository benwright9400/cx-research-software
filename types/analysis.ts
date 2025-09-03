export interface Analysis {
    purpose: string;
    codes: {
        id: number;
        code: string;
        rationale:string;
    }[]
    themes: {
        theme: string;
        description: string;
        codes: number[]
    }[]
}