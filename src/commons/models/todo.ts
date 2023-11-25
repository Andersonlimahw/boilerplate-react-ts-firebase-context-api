import { CategoryModel } from "./category";

export interface TodoModel {
    id?: string;
    code: string;
    title?: string;
    completed?: boolean;
    userId: string;
    created?:string;
    categories?: CategoryModel[]
}