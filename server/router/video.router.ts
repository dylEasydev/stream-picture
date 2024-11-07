import { VideoController } from '../controller';
import { auth } from '../middleware';
import { BaseRouter } from './base.router';

export class VideoRouter extends BaseRouter<VideoController>{

    public initRoute(): void {
        this.routerServeur.put('/:id',auth.secureMiddleware,auth.verifPermToken('updated:miniature'),this.controllerService.updateImage);
        this.routerServeur.delete('/:id',auth.secureMiddleware,auth.verifPermToken('deleted:miniature'),this.controllerService.deleteImage);
    }
}

export default new VideoRouter(new VideoController()).routerServeur;