import express from 'express';
import AllAttributeParentFormController from '../controllers/AllAttribute/AllAttributeParentForm.controller.js';
import AllAttributeParentFormAttributeTypeController from '../controllers/AllAttribute/AllAttributeParentFormAttributeType.controller.js'

const AllAttributeRouter = express.Router();

AllAttributeRouter.get('' , AllAttributeParentFormController.getAllAttributeParentForm);
AllAttributeRouter.post('' , AllAttributeParentFormController.postAllAttributeParentForm);
AllAttributeRouter.get('/download' , AllAttributeParentFormController.downloadAllAttributeParentFormExcel);

AllAttributeRouter.get('/AttributeType' , AllAttributeParentFormAttributeTypeController.getAllAttributeParentFormAttributeType);
AllAttributeRouter.post('/AttributeType' , AllAttributeParentFormAttributeTypeController.postAllAttributeParentFormAttributeType);
AllAttributeRouter.get('/AttributeType/download' , AllAttributeParentFormAttributeTypeController.downloadAllAttributeParentFormAttributeTypeExcel);

export default AllAttributeRouter;