import express from 'express';
import GoldItemController from '../controllers/ItemMasterAndVariants/Metal/Gold/GoldItem.controller.js';
import GoldVariantsController from '../controllers/ItemMasterAndVariants/Metal/Gold/GoldVariant.controller.js'
import SilverItemController from '../controllers/ItemMasterAndVariants/Metal/Silver/SilverItem.controller.js'
import SilverVariantController from '../controllers/ItemMasterAndVariants/Metal/Silver/SilverVarient.controller.js'
import PlatinumItemController from '../controllers/ItemMasterAndVariants/Metal/Platinum/PlatinumItem.controller.js'
import BronzeItemController from '../controllers/ItemMasterAndVariants/Metal/Bronze/BronzeItem.controller.js'

const ItemMasterAndVariantsRouter = express.Router();

ItemMasterAndVariantsRouter.get('/Metal/Gold/Item' , GoldItemController.getAllItems);
ItemMasterAndVariantsRouter.post('/Metal/Gold/Item' , GoldItemController.postItem);
ItemMasterAndVariantsRouter.get('/Metal/Gold/Item/download' , GoldItemController.downloadItemsExcel);

ItemMasterAndVariantsRouter.get('/Metal/Gold/Variant' , GoldVariantsController.getAllVariants);
ItemMasterAndVariantsRouter.post('/Metal/Gold/Variant' , GoldVariantsController.postVariant);
ItemMasterAndVariantsRouter.get('/Metal/Gold/Variant/download' , GoldVariantsController.downloadVariantsExcel);

ItemMasterAndVariantsRouter.get('/Metal/Silver/Item' , SilverItemController.getAllItems);
ItemMasterAndVariantsRouter.post('/Metal/Silver/Item' , SilverItemController.postItem);
ItemMasterAndVariantsRouter.get('/Metal/Silver/Item/download' , SilverItemController.downloadItemsExcel);

ItemMasterAndVariantsRouter.get('/Metal/Silver/Variant' , SilverVariantController.getAllVariants);
ItemMasterAndVariantsRouter.post('/Metal/Silver/Variant' , SilverVariantController.postVariant);
ItemMasterAndVariantsRouter.get('/Metal/Silver/Variant/download' , SilverVariantController.downloadVariantsExcel);

ItemMasterAndVariantsRouter.get('/Metal/Platinum/Item' , PlatinumItemController.getAllItems);
ItemMasterAndVariantsRouter.post('/Metal/Platinum/Item' , PlatinumItemController.postItem);
ItemMasterAndVariantsRouter.get('/Metal/Platinum/Item/download' , PlatinumItemController.downloadItemsExcel);

ItemMasterAndVariantsRouter.get('/Metal/Bronze/Item' , BronzeItemController.getAllItems);
ItemMasterAndVariantsRouter.post('/Metal/Bronze/Item' , BronzeItemController.postItem);
ItemMasterAndVariantsRouter.get('/Metal/Bronze/Item/download' , BronzeItemController.downloadItemsExcel);

export default ItemMasterAndVariantsRouter;