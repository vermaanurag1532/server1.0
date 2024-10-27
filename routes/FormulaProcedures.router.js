import express from 'express';
import RateTypeController from '../controllers/FormulaProcedures/RateStructure/FormulaRangeMaster/RateStructureRateType.controller.js';
import DataTypeController from '../controllers/FormulaProcedures/RateStructure/FormulaRangeHierarchydetails/RateStructureDataType.controller.js';
import NumberDepdFieldController from '../controllers/FormulaProcedures/RateStructure/FormulaRangeHierarchydetails/RateStructureNumberDepdField.controller.js';
import AttributeDepdFieldController from '../controllers/FormulaProcedures/RateStructure/FormulaRangeHierarchydetails/RateStructureAttributeDepdField.controller.js';
import FormulaRangeMasterController from '../controllers/FormulaProcedures/RateStructure/FormulaRangeMaster/FormulaRangeMaster.controller.js'
import RangeHierarchyController from '../controllers/FormulaProcedures/RateStructure/FormulaRangeHierarchydetails/FormulaRangeHierarchy.controller.js'

const FormulaProceduresRouter = express.Router();

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

export default FormulaProceduresRouter;