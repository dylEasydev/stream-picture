import express,{Application} from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { indexRouter, userRouter ,audioRouter , videoRouter} from './router';
import { join } from 'path';
import { __basedir } from './global_dir';
import bridge  from 'http2-express-bridge';

class ExpressApp{
    public expressServer: Application;

    constructor(){
        this.expressServer = bridge(express);
        this.configServer();
    }

    private configServer(){
        this.expressServer.use(bodyParser.json())
                          .use(bodyParser.urlencoded({extended:true}))
                          .use(cors())
                          .use('/public',express.static(join(__basedir,'/ressources')))
                          .use('/',indexRouter)
                          .use('/image/user',userRouter)
                          .use('/image/audio',audioRouter)
                          .use('/image/video',videoRouter)
                          .use('*',(req,res)=>{
                                res.redirect('/docs');
                          })
    }
}

export default new ExpressApp().expressServer