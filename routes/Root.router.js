import express from 'express';
import RootControllers from '../controllers/Root.controller.js';

const RootRouter = express.Router();

RootRouter.get('/' , RootControllers.getRoot)

export default RootRouter;