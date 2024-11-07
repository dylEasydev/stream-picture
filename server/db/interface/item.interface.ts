export interface Item{
    id:number;

    title:string;
    duration:number;
    actorName:string;
    path:string;
    name:string;

    miniature? : string;

    readonly createdAt:Date;
    readonly updatedAt:Date;
    readonly deletedAt:Date;
}