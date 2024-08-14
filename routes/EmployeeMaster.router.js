import express from 'express';
import EmployeeMasterControllers from '../controllers/EmployeeMaster.controller.js';

const EmployeeMasterRouter = express.Router();

EmployeeMasterRouter.post('/add', EmployeeMasterControllers.postEmployeeMaster);
EmployeeMasterRouter.get('/', EmployeeMasterControllers.getEmployeeMaster);

export default EmployeeMasterRouter;