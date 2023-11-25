import { DocumentData, Query } from 'firebase/firestore';
import { CreateResponse, DeleteResponse } from '../../firebase';
import { CategoryModel } from '../../../commons/models/category';

export interface ICategoryService {
    create(category: CategoryModel) : Promise<CreateCategoryResponse>;
    delele(id: string) : Promise<DeleteCategoryResponse>;
    get() : Promise<Query<DocumentData>>;
    patch(category: CategoryModel) : Promise<void>;
}

export interface CreateCategoryResponse extends CreateResponse {};
export interface DeleteCategoryResponse extends DeleteResponse {};
export interface GetCategoryesResponse { 
    data: CategoryModel[]
}