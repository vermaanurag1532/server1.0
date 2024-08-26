import express from 'express';
import ItemCodeGenerationController from '../controllers/ItemCodeGeneration/ItemCodeGeneration.controller.js'

const ItemCodeGenerationRouter = express.Router();

ItemCodeGenerationRouter.get('' , ItemCodeGenerationController.getAllAttributeParentForm);
ItemCodeGenerationRouter.post('' , ItemCodeGenerationController.postAllAttributeParentForm);
ItemCodeGenerationRouter.get('/download' , ItemCodeGenerationController.downloadAllAttributeParentFormExcel);

export default ItemCodeGenerationRouter;