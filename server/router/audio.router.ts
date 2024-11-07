import { AudioController } from '../controller';
import { auth } from '../middleware';
import { BaseRouter } from './base.router';

export class Audio extends BaseRouter<AudioController>{

    public initRoute(): void {
        this.routerServeur.put('/:id',auth.secureMiddleware,auth.verifPermToken('updated:miniature'),this.controllerService.updateImage);
        this.routerServeur.delete('/:id',auth.secureMiddleware,auth.verifPermToken('deleted:miniature'),this.controllerService.deleteImage);
    }
}

export default new Audio(new AudioController()).routerServeur;