import express from 'express';
import RateTypeController from '../controllers/FormulaProcedures/RateStructure/RateStructureRateType.controller.js';
import DataTypeController from '../controllers/FormulaProcedures/RateStructure/RateStructureDataType.controller.js';
import NumberDepdFieldController from '../controllers/FormulaProcedures/RateStructure/RateStructureNumberDepdField.controller.js';
import AttributeDepdFieldController from '../controllers/FormulaProcedures/RateStructure/RateStructureAttributeDepdField.controller.js';

const FormulaProceduresRouter = express.Router();

FormulaProceduresRouter.post('/RateStructure/RateType', RateTypeController.createRateType);
FormulaProceduresRouter.get('/RateStructure/RateType', RateTypeController.getRateTypes);

FormulaProceduresRouter.post('/RateStructure/DataType', DataTypeController.createDataType);
FormulaProceduresRouter.get('/RateStructure/DataType', DataTypeController.getDataTypes);

FormulaProceduresRouter.post('/RateStructure/NumberDepdField', NumberDepdFieldController.createDepdField);
FormulaProceduresRouter.get('/RateStructure/NumberDepdField', NumberDepdFieldController.getDepdField);

FormulaProceduresRouter.post('/RateStructure/AttributeDepdField', AttributeDepdFieldController.createDepdField);
FormulaProceduresRouter.get('/RateStructure/AttributeDepdField', AttributeDepdFieldController.getDepdField);

export default FormulaProceduresRouter;