import express from 'express';
import OperationController from '../controllers/Global/operartion/operation.controller.js';

const GlobalRouter = express.Router();

// Route to get all operations
GlobalRouter.get('/operations', OperationController.getAllOperations);

// Route to add a new operation
GlobalRouter.post('/operations', OperationController.addOperation);

export default GlobalRouter;
