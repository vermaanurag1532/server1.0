import express from 'express';
import SubContractingIssueWorkController from '../controllers/SubContracting/issueWork.controller.js';

const SubContractingRouter = express.Router();

// Define routes and map them to controller methods
SubContractingRouter.get('/IssueWork', SubContractingIssueWorkController.getAll);
SubContractingRouter.get('/IssueWork/:stockId', SubContractingIssueWorkController.getById);
SubContractingRouter.post('/IssueWork', SubContractingIssueWorkController.create);
SubContractingRouter.put('/IssueWork/:stockId', SubContractingIssueWorkController.update);
SubContractingRouter.delete('/IssueWork/:stockId', SubContractingIssueWorkController.delete);

export default SubContractingRouter;
