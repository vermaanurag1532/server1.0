import express from 'express';
import OperationController from '../controllers/Global/operartion/operation.controller.js';
import TypeController from '../controllers/Global/operartion/Type.controller.js';
import CalcMethodController from '../controllers/Global/operartion/CalcMethod.controller.js'
import CalcMethodValueController from '../controllers/Global/operartion/CalcMethodValue.controller.js'
import DepdMethodController from '../controllers/Global/operartion/DepdMethod.controller.js'
import LocationController from '../controllers/Global/Location/Location.controller.js'
import DepartmentController from '../controllers/Global/Department/Department.controller.js';
import GstRegistrationController from '../controllers/Global/GstRegistration/gstRegistration.controller.js'
import CurrencyMasterController from '../controllers/Global/DefaultCurrency/currencyMaster.controller.js'
import TermsMasterController from '../controllers/Global/DefaultTerms/TermsMaster.controller.js'
import CustomerMasterController from '../controllers/Global/Customer/customerMaster.controller.js'

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

GlobalRouter.get("/GstRegistration", GstRegistrationController.getAll);
GlobalRouter.get("/GstRegistration/:id", GstRegistrationController.getById);
GlobalRouter.post("/GstRegistration", GstRegistrationController.create);
GlobalRouter.put("/GstRegistration/:id", GstRegistrationController.update);
GlobalRouter.delete("/GstRegistration/:id", GstRegistrationController.remove);

GlobalRouter.get("/DefaultCurrency", CurrencyMasterController.getAll);
GlobalRouter.get("/DefaultCurrency/:id", CurrencyMasterController.getById);
GlobalRouter.post("/DefaultCurrency", CurrencyMasterController.create);
GlobalRouter.put("/DefaultCurrency/:id", CurrencyMasterController.update);
GlobalRouter.delete("/DefaultCurrency/:id", CurrencyMasterController.delete);

GlobalRouter.get("/TermsMaster", TermsMasterController.getAllTerms);
GlobalRouter.get("/TermsMaster/:id", TermsMasterController.getTermsById);
GlobalRouter.post("/TermsMaster", TermsMasterController.createTerms);
GlobalRouter.put("/TermsMaster/:id", TermsMasterController.updateTerms);
GlobalRouter.delete("/TermsMaster/:id", TermsMasterController.deleteTerms);

GlobalRouter.get("/CustomerMaster", CustomerMasterController.getAllCustomers);
GlobalRouter.get("/CustomerMaster/:id", CustomerMasterController.getCustomerById);
GlobalRouter.post("/CustomerMaster", CustomerMasterController.createCustomer);
GlobalRouter.put("/CustomerMaster/:id", CustomerMasterController.updateCustomer);
GlobalRouter.delete("/CustomerMaster/:id", CustomerMasterController.deleteCustomer);

export default GlobalRouter;
