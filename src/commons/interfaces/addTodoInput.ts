import { CategoryModel } from "../models/category";

export interface AddTodoInput {
    title: string;
    categories: CategoryModel[];
}