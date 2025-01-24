import express from 'express';
import OperationController from '../controllers/Global/operartion/operation.controller.js';
import TypeController from '../controllers/Global/operartion/Type.controller.js';
import CalcMethodController from '../controllers/Global/operartion/CalcMethod.controller.js'
import CalcMethodValueController from '../controllers/Global/operartion/CalcMethodValue.controller.js'
import DepdMethodController from '../controllers/Global/operartion/DepdMethod.controller.js'
import LocationController from '../controllers/Global/Location/Location.controller.js'
import DepartmentController from '../controllers/Global/Department/Department.controller.js';

const GlobalRouter = express.Router();

GlobalRouter.get('/operations', OperationController.getAllOperations);
GlobalRouter.post('/operations', OperationController.addOperation);

GlobalRouter.get('/Type', TypeController.getAllTypes);
GlobalRouter.get('/Type/:configId', TypeController.getTypeById);
GlobalRouter.post('/Type', TypeController.addType);

GlobalRouter.get('/CalcMethod', CalcMethodController.getAllCalcMethods);
GlobalRouter.get('/CalcMethod/:configId', CalcMethodController.getCalcMethodById);
GlobalRouter.post('/CalcMethod', CalcMethodController.addCalcMethod);

GlobalRouter.get('/CalcMethodValue', CalcMethodValueController.getAllCalcMethodValues);
GlobalRouter.post('/CalcMethodValue', CalcMethodValueController.addCalcMethodValue);

GlobalRouter.get('/DepdMethod', DepdMethodController.getAllDepdMethods);
GlobalRouter.post('/DepdMethod', DepdMethodController.addDepdMethod);

GlobalRouter.get('/Location', LocationController.getAllLocations);
GlobalRouter.get('/Location/:locationCode', LocationController.getLocationByCode);
GlobalRouter.post('/Location', LocationController.addLocation);
GlobalRouter.put("/Location/:locationCode", LocationController.updateLocationByCode);
GlobalRouter.delete("/Location/:locationCode", LocationController.deleteLocationByCode);

GlobalRouter.get('/Department', DepartmentController.getAllDepartments);
GlobalRouter.get('/Department/:departmentCode', DepartmentController.getDepartmentByCode);
GlobalRouter.post('/Department', DepartmentController.addDepartment);
GlobalRouter.put("/Department/:departmentCode", DepartmentController.updateDepartmentByCode);
GlobalRouter.delete("/Department/:departmentCode", DepartmentController.deleteDepartmentByCode);

export default GlobalRouter;
