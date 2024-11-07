import { ItemInterfaceServie } from './interface';
import {Item} from '../interface';
import axios,{ AxiosInstance } from 'axios';

export class RequestError extends Error{
    public status:number;
    public data:any;
    constructor(
        status:number,
        data:unknown,
        message?:string
    ){
        super(message);
        this.status=status;
        this.data =data;
    }
}
export class ItemService implements ItemInterfaceServie{
    public axiosRequest: AxiosInstance;

    constructor(jeton?:string){
        this.axiosRequest = axios.create({
            baseURL:'http://localhost:3000/',
            timeout:3000,
            headers:{
                Authorization:`Bearer ${jeton}`,
                Connection:"keep-alive",
                Upgrade:"h2"
            }
        })
    }
    getAudioById(id:number){
        return new Promise<{message:string; data:Item;}>(async(resolve, reject) => {
            try {
                const matterFind = await this.axiosRequest.get<
                {message:string; data:unknown;}
                >(`/audio/${id}`,{
                    validateStatus:(status:number)=>{return status < 500}
                });
                if(matterFind.status < 200 || matterFind.status > 300){
                    reject(
                        new RequestError(
                            matterFind.status,
                            matterFind.data.data,
                            matterFind.data.message
                        )
                    )
                }else resolve(matterFind.data as {message:string,data:Item}); 
            } catch (error) {
               reject(error);
            }
        })
    }

    getVideoById(id:number){
        return new Promise<{message:string; data:Item;}>(async(resolve, reject) => {
            try {
                const matterFind = await this.axiosRequest.get<
                {message:string; data:unknown;}
                >(`/video/${id}`,{
                    validateStatus:(status:number)=>{return status < 500}
                });
                if(matterFind.status < 200 || matterFind.status > 300){
                    reject(
                        new RequestError(
                            matterFind.status,
                            matterFind.data.data,
                            matterFind.data.message
                        )
                    )
                }else resolve(matterFind.data as {message:string,data:Item}); 
            } catch (error) {
               reject(error);
            }
        })
    }
}