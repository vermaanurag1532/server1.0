import express from 'express';
import EmployeeMasterController from '../controllers/EmployeeMaster/EmployeeMaster.controller.js';

const EmployeeMasterRouter = express.Router();

EmployeeMasterRouter.post('/', EmployeeMasterController.createEmployee);
EmployeeMasterRouter.get('/', EmployeeMasterController.getAllEmployees);
EmployeeMasterRouter.get('/:code', EmployeeMasterController.getEmployeeByCode);
EmployeeMasterRouter.put('/:code', EmployeeMasterController.updateEmployee);
EmployeeMasterRouter.delete('/:code', EmployeeMasterController.deleteEmployee);

export default EmployeeMasterRouter;