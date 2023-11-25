import { DocumentData, Query } from "firebase/firestore";
import { TodoModel } from "../../commons/models/todo";
import { create, deleteById, get, update } from "../firebase";
import { 
    CreateTodoResponse, 
    DeleteTodoResponse, 
    ITodoService 
} from "./interfaces";

export class TodoService implements ITodoService {     
    private todoCollectionName : string;    
    private userId : string;    

    constructor(userId :string) {
        this.userId = userId;
        const baseCollectionName = 'todo-list-app';
        const baseCollectionDocumentId = '6CerQMT47nMlacSw6kZO';
        this.todoCollectionName = `${baseCollectionName}/${baseCollectionDocumentId}/users/${this.userId}/todos`;
    }
    

    public get(): Promise<Query<DocumentData>> {
        return new Promise<Query<DocumentData>>(async (resolve, reject) => {
            await get({ collectionName : this.todoCollectionName })
            .then((response) => resolve(response))
            .catch((ex) => {
                 /* istanbul ignore next */
                console.error('[TodoService]: Error on get TODO: ', ex);
                 /* istanbul ignore next */
                reject(new Error(ex));
            })
            .finally(() => console.log('[TodoService]: finally')); 
        })
    }

    public create(todo: TodoModel): Promise<CreateTodoResponse> {
        return new Promise<CreateTodoResponse>(async (resolve, reject) => {
            await create({
                collectionName : this.todoCollectionName,
                payload: todo
            })
            .then((response) => resolve(response))
            .catch((ex) => {
                /* istanbul ignore next */
                console.error('[TodoService]: Error on create TODO: ', ex);
                 /* istanbul ignore next */
                reject(new Error(ex));
            })
            .finally(() => console.log('[TodoService]: finally')); 
        })
    }

    public delele(id: string): Promise<DeleteTodoResponse> {
        return new Promise<DeleteTodoResponse>(async (resolve, reject) => {
            await deleteById({
                collectionName : this.todoCollectionName,
                id
            })
            .then((response) => resolve(response))
            .catch((ex) => {
                 /* istanbul ignore next */
                console.error('[TodoService]: Error on delele TODO: ', ex);
                 /* istanbul ignore next */
                reject(new Error(ex));
            })
            .finally(() => console.log('[TodoService]: delele finally')); 
        })
    }

    public patch(todo: TodoModel): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            await update({
                collectionName : this.todoCollectionName,
                id: todo.id as string,
                payload: todo
            })
            .then(() => resolve())
            .catch((ex) => {
                /* istanbul ignore next */
                console.error('[TodoService]: Error on patch TODO: ', ex);
                /* istanbul ignore next */
                reject(new Error(ex));
            })
            .finally(() => console.log('[TodoService]: finally')); 
        })
    }
    
    
}