import express from 'express';
const OperationDetailRouter = express.Router();
import OperationController from '../controllers/operationDetail.controller.js';

OperationDetailRouter.get('/', OperationController.getAll);
OperationDetailRouter.get('/:id', OperationController.getById);
OperationDetailRouter.post('/', OperationController.create);
OperationDetailRouter.put('/:id', OperationController.update);
OperationDetailRouter.delete('/:id', OperationController.delete);

export default OperationDetailRouter;
