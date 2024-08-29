import express from 'express';
import GoldItemController from '../controllers/ItemMasterAndVariants/Metal/Gold/GoldItem.controller.js';

const ItemMasterAndVariantsRouter = express.Router();

ItemMasterAndVariantsRouter.get('/Metal/Gold/Item' , GoldItemController.getAllItems);
ItemMasterAndVariantsRouter.post('/Metal/Gold/Item' , GoldItemController.postItem);
ItemMasterAndVariantsRouter.get('/Metal/Gold/Item/download' , GoldItemController.downloadItemsExcel);

export default ItemMasterAndVariantsRouter;