import express from 'express';
import RootControllers from '../controllers/Root.controller.js';

const RootRouter = express.Router();

RootRouter.get('/' , RootControllers.getRoot)
RootRouter.get('/QuickAccess' , RootControllers.getQuickAccess)

export default RootRouter;