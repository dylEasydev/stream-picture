import { Response , Request } from 'express';
import { CodeStatut, statusResponse } from '../helper';
import { BaseController } from './base.controller';
import { __basedir } from '../global_dir';
import { join } from 'node:path';

export class IndexController  extends BaseController{

    async accueilService(req:Request , res:Response){
        return statusResponse.sendResponseJson(CodeStatut.VALID_STATUS,res,`Bienvenue sur pictures-streamCam api !`);
    }

    async documentationService(req:Request , res:Response){
        return statusResponse.sendResponseFile(CodeStatut.VALID_STATUS,res,join(__basedir,'/docs/index.html'));
    }
}