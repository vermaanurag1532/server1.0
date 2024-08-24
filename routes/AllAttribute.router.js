import express from 'express';
import AllAttributeParentFormController from '../controllers/AllAttribute/AllAttributeParentForm.controller.js';
import AllAttributeParentFormAttributeTypeController from '../controllers/AllAttribute/AllAttributeParentFormAttributeType.controller.js'

const AllAttributeRouter = express.Router();

AllAttributeRouter.get('/ParentForm' , AllAttributeParentFormController.getAllAttributeParentForm);
AllAttributeRouter.post('/ParentForm' , AllAttributeParentFormController.postAllAttributeParentForm);
AllAttributeRouter.get('/ParentForm/download' , AllAttributeParentFormController.downloadAllAttributeParentFormExcel);

AllAttributeRouter.get('/ParentForm/AttributeType' , AllAttributeParentFormAttributeTypeController.getAllAttributeParentFormAttributeType);
AllAttributeRouter.post('/ParentForm/AttributeType' , AllAttributeParentFormAttributeTypeController.postAllAttributeParentFormAttributeType);
AllAttributeRouter.get('/ParentForm/AttributeTypedownload' , AllAttributeParentFormAttributeTypeController.downloadAllAttributeParentFormAttributeTypeExcel);

export default AllAttributeRouter;