import { Item } from '../../interface';

export interface ItemInterfaceServie {
    getAudioById(id:number):Promise<{message:string; data:Item;}>;
    getVideoById(id:number):Promise<{message:string; data:Item;}>;
}