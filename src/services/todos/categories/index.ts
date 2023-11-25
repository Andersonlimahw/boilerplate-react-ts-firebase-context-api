import { DocumentData, Query } from "firebase/firestore";
import { create, deleteById, get, update } from "../../firebase";
import { 
    CreateCategoryResponse, 
    DeleteCategoryResponse, 
    ICategoryService 
} from "./interfaces";
import { CategoryModel } from "../../../commons/models/category";

export class CategoryService implements ICategoryService {     
    private todoCategoryCollectionName : string;    
    private userId : string;    

    constructor(userId :string) {
        this.userId = userId;

        const baseCollectionName = 'todo-list-app';
        const baseCollectionDocumentId = '6CerQMT47nMlacSw6kZO';
        this.todoCategoryCollectionName = `${baseCollectionName}/${baseCollectionDocumentId}/users/${this.userId}/todos-categories`;
    }
    

    public get(): Promise<Query<DocumentData>> {
        return new Promise<Query<DocumentData>>(async (resolve, reject) => {
            await get({ collectionName : this.todoCategoryCollectionName })
            .then((response) => resolve(response))
            .catch(/* istanbul ignore next */(ex) => {
                console.error('[CategoryService]: Error on get TODO: ', ex);
                reject(new Error(ex));
            })
            .finally(() => console.log('[CategoryService]: GET finally')); 
        })
    }

    public create(category: CategoryModel): Promise<CreateCategoryResponse> {
        return new Promise<CreateCategoryResponse>(async (resolve, reject) => {
            await create({
                collectionName : this.todoCategoryCollectionName,
                payload: category
            })
            .then((response) => resolve(response))
            .catch(/* istanbul ignore next */(ex) => {
                console.error('[CategoryService]: Error on create TODO: ', ex);
                reject(new Error(ex));
            })
            .finally(() => console.log('[CategoryService]: create finally')); 
        })
    }

    public delele(id: string): Promise<DeleteCategoryResponse> {
        return new Promise<DeleteCategoryResponse>(async (resolve, reject) => {
            await deleteById({
                collectionName : this.todoCategoryCollectionName,
                id
            })
            .then((response) => resolve(response))
            .catch( /* istanbul ignore next */(ex) => {
                console.error('[CategoryService]: Error on delele TODO: ', ex);
                reject(new Error(ex));
            })
            .finally(() => console.log('[CategoryService]: delele finally')); 
        })
    }

    public patch(category: CategoryModel): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            await update({
                collectionName : this.todoCategoryCollectionName,
                id: category.id as string,
                payload: category
            })
            .then(() => resolve())
            .catch( /* istanbul ignore next */(ex) => {
                console.error('[CategoryService]: Error on patch TODO: ', ex);
                reject(new Error(ex));
            })
            .finally(() => console.log('[CategoryService]: patch finally')); 
        })
    }
    
    
}