import express from 'express';
import RateTypeController from '../controllers/FormulaProcedures/RateStructure/FormulaRangeMaster/RateStructureRateType.controller.js';
import DataTypeController from '../controllers/FormulaProcedures/RateStructure/FormulaRangeHierarchydetails/RateStructureDataType.controller.js';
import NumberDepdFieldController from '../controllers/FormulaProcedures/RateStructure/FormulaRangeHierarchydetails/RateStructureNumberDepdField.controller.js';
import AttributeDepdFieldController from '../controllers/FormulaProcedures/RateStructure/FormulaRangeHierarchydetails/RateStructureAttributeDepdField.controller.js';
import FormulaRangeMasterController from '../controllers/FormulaProcedures/RateStructure/FormulaRangeMaster/FormulaRangeMaster.controller.js'
import RangeHierarchyController from '../controllers/FormulaProcedures/RateStructure/FormulaRangeHierarchydetails/FormulaRangeHierarchy.controller.js'
import RateStructureController from '../controllers/FormulaProcedures/RateStructure/RateStructure.controller.js'
import RateStructureExcelController from '../controllers/FormulaProcedures/RateStructure/RateStructureExcel.controller.js'
import FormulaProcedureMasterDetailsController from '../controllers/FormulaProcedures/FormulaProcedure/FormulaProcedure.controller.js'
import FormulaController from '../controllers/FormulaProcedures/FormulaMapping/ProcedureType.controller.js'
import FormulaTransactionController from '../controllers/FormulaProcedures/FormulaMapping/TransactionType.controller.js'
import FormulaDocumentController from '../controllers/FormulaProcedures/FormulaMapping/DocumentType.controller.js'
import FormulaTransCategoryController from '../controllers/FormulaProcedures/FormulaMapping/TransCategory.controller.js'
import FormulaMappingController from '../controllers/FormulaProcedures/FormulaMapping/FormulaMapping.controller.js'

const FormulaProceduresRouter = express.Router();

FormulaProceduresRouter.post('/RateStructure', RateStructureController.createFormulaRange);

FormulaProceduresRouter.post('/RateStructure/Excel', RateStructureExcelController.createRangeHierarchyDetails);
FormulaProceduresRouter.get('/RateStructure/Excel', RateStructureExcelController.getAllDetails);
FormulaProceduresRouter.get('/RateStructure/Excel/:name', RateStructureExcelController.getDetailsByRangeHierarchyName);

FormulaProceduresRouter.post('/RateStructure/RangeType', RateTypeController.createRateType);
FormulaProceduresRouter.get('/RateStructure/RangeType', RateTypeController.getRateTypes);

FormulaProceduresRouter.post('/RateStructure/DataType', DataTypeController.createDataType);
FormulaProceduresRouter.get('/RateStructure/DataType', DataTypeController.getDataTypes);

FormulaProceduresRouter.post('/RateStructure/NumberDepdField', NumberDepdFieldController.createDepdField);
FormulaProceduresRouter.get('/RateStructure/NumberDepdField', NumberDepdFieldController.getDepdField);

FormulaProceduresRouter.post('/RateStructure/AttributeDepdField', AttributeDepdFieldController.createDepdField);
FormulaProceduresRouter.get('/RateStructure/AttributeDepdField', AttributeDepdFieldController.getDepdField);

FormulaProceduresRouter.post('/RateStructure/FormulaRangeMaster', FormulaRangeMasterController.createRangeMaster);
FormulaProceduresRouter.get('/RateStructure/FormulaRangeMaster', FormulaRangeMasterController.getRangeMasters);

FormulaProceduresRouter.post('/RateStructure/FormulaRangeHierarchy', RangeHierarchyController.createRangeHierarchyDetail);
FormulaProceduresRouter.get('/RateStructure/FormulaRangeHierarchy', RangeHierarchyController.getAllRangeHierarchyDetails);
FormulaProceduresRouter.get('/RateStructure/FormulaRangeHierarchy/:name', RangeHierarchyController.getRangeHierarchyByName);

FormulaProceduresRouter.post('/FormulaProcedureMasterDetails', FormulaProcedureMasterDetailsController.createFormulaProcedureMasterDetail);
FormulaProceduresRouter.get('/FormulaProcedureMasterDetails', FormulaProcedureMasterDetailsController.getAllFormulaProcedureMasterDetails);
FormulaProceduresRouter.get('/FormulaProcedureMasterDetails/:formulaProcedureName', FormulaProcedureMasterDetailsController.getDetailByName);
FormulaProceduresRouter.get('/table', FormulaProcedureMasterDetailsController.getTableDetails);

FormulaProceduresRouter.get("/FormulaMapping", FormulaMappingController.getAll);
FormulaProceduresRouter.get("/FormulaMapping/:id", FormulaMappingController.getById);
FormulaProceduresRouter.post("/FormulaMapping", FormulaMappingController.create);

FormulaProceduresRouter.get("/FormulaMapping/ProcedureType", FormulaController.getAll);
FormulaProceduresRouter.get("/FormulaMapping/ProcedureType/:id", FormulaController.getById);
FormulaProceduresRouter.post("/FormulaMapping/ProcedureType", FormulaController.create);

FormulaProceduresRouter.get("/FormulaMapping/TransactionType", FormulaTransactionController.getAll);
FormulaProceduresRouter.get("/FormulaMapping/TransactionType/:id", FormulaTransactionController.getById);
FormulaProceduresRouter.post("/FormulaMapping/TransactionType", FormulaTransactionController.create);

FormulaProceduresRouter.get("/FormulaMapping/DocumentType", FormulaDocumentController.getAll);
FormulaProceduresRouter.get("/FormulaMapping/DocumentType/:id", FormulaDocumentController.getById);
FormulaProceduresRouter.post("/FormulaMapping/DocumentType", FormulaDocumentController.create);

FormulaProceduresRouter.get("/FormulaMapping/TransCategory", FormulaTransCategoryController.getAll);
FormulaProceduresRouter.get("/FormulaMapping/TransCategory/:id", FormulaTransCategoryController.getById);
FormulaProceduresRouter.post("/FormulaMapping/TransCategory", FormulaTransCategoryController.create);

export default FormulaProceduresRouter;