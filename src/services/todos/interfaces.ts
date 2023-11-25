import { DocumentData, Query } from 'firebase/firestore';
import { TodoModel } from '../../commons/models/todo';
import { CreateResponse, DeleteResponse } from '../firebase';

export interface ITodoService {
    create(todo: TodoModel) : Promise<CreateTodoResponse>;
    delele(id: string) : Promise<DeleteTodoResponse>;
    get() : Promise<Query<DocumentData>>;
    patch(todo: TodoModel) : Promise<void>;
}

export interface CreateTodoResponse extends CreateResponse {};
export interface DeleteTodoResponse extends DeleteResponse {};
export interface GetTodosResponse { 
    data: TodoModel[]
}