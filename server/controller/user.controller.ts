import { Token } from '../db/interface';
import { imageService } from '../db/service';
import { CodeStatut, ExtensionError, UploadMulter, statusResponse } from '../helper';
import { BaseController } from './base.controller';
import { Request,Response } from 'express';
import { unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { __basedir } from '../global_dir';
import sharp from 'sharp';
import { ValidationError } from 'sequelize';

export class UserController extends BaseController{
    
    async updateImage(req:Request, res:Response){
        try {
            const userToken = req.body.token as Token;
            const uploader = new UploadMulter('pictures',2).uploader();
            await uploader(req,res);
            if(!req.file){
                return statusResponse.sendResponseJson(
                    CodeStatut.CLIENT_STATUS,
                    res,
                    `Aucune image fourni !`
                )
            }
            const filepath = req.file.path ;
            const bufferSharp = await sharp(filepath).metadata();

            const width = bufferSharp.width as number;
            const heigth = bufferSharp.height as number;
            const name = `IMG-EC-${Date.now()}.jpeg`

            if(width < 200 || heigth < 200){
                await sharp(filepath).resize(200 ,200)
                                     .toFormat('jpeg')
                                     .jpeg({quality:80})
                                     .toFile(join(__basedir ,`ressources/pictures`,`/${name}`));
            }else if(width > 500 || heigth > 500){
                await sharp(filepath).resize(500 ,500)
                                    .toFormat('jpeg')
                                    .jpeg({quality:80})
                                    .toFile(join(__basedir ,`ressources/pictures`,`/${name}`));
            }else{
                await sharp(filepath).toFormat('jpeg')
                                     .jpeg({quality:80})
                                     .toFile(join(__basedir ,`ressources/pictures`,`/${name}`));
            }

            const path_director = join(__basedir ,'ressources/pictures',`/${req.file.filename}`);
            await unlink(path_director);
            delete req.file;

            const pictures = await imageService.findImage(userToken.userId ,'user');
            if(pictures === null)
                return statusResponse.sendResponseJson(
                    CodeStatut.NOT_FOUND_STATUS,
                    res,
                    `Aucune image associer à cette utilisateur !`
                );
            const picturesUpdate =await imageService.updateImage(pictures,name);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS,
                res,
                `Mis à jour réussi !`,
                picturesUpdate
            );
        } catch (error) {
            if(req.file){
                const path_director = join(__basedir ,'ressources/pictures',req.file.filename);
                unlink(path_director).catch(err=>{
                    return statusResponse.sendResponseJson(
                        CodeStatut.SERVER_STATUS,
                        res,
                        err.message,
                        err
                    )
                })
            }

            if(error instanceof ValidationError){
                return statusResponse.sendResponseJson(
                    CodeStatut.CLIENT_STATUS,
                    res,
                    error.message,
                    error
                )
            }
            
            if(error instanceof ExtensionError){
                return statusResponse.sendResponseJson(
                    CodeStatut.CLIENT_STATUS,
                    res,
                    error.message,
                    error
                )
            }

            return statusResponse.sendResponseJson(
                CodeStatut.SERVER_STATUS,
                res,
                `Erreur du serveur veillez réesayer plus tard !`,
                error
            )
        }
    }

    async deleteImage(req:Request , res:Response){
        try {
            const userToken = req.body.token as Token;
            const pictures = await imageService.findImage(userToken.userId ,'user');
            if(pictures === null)
                return statusResponse.sendResponseJson(
                    CodeStatut.NOT_FOUND_STATUS,
                    res,
                    `Aucune image associer à cette utilisateur !`
                );
            const picturesUpdate =await imageService.updateImage(pictures,'profil_default.png');
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS,
                res,
                `Suppression réussi !`,
                picturesUpdate
            );
        } catch (error) {
            return statusResponse.sendResponseJson(
                CodeStatut.SERVER_STATUS,
                res,
                `Erreur du serveur veillez réesayer plus tard !`,
                error
            )
        }
    } 
}
