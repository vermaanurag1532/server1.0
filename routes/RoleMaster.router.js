import express from 'express';
import RoleMasterParentformControllers from '../controllers/RoleMaster/RoleMasterParentform.controller.js';

const RoleMasterRouter = express.Router();

RoleMasterRouter.get('/Parentform' , RoleMasterParentformControllers.getParentform);
RoleMasterRouter.post('/Parentform' , RoleMasterParentformControllers.postParentform);

export default RoleMasterRouter;