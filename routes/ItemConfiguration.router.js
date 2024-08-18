import express from 'express';
import ItemConfigurationControllers from '../controllers/ItemConfiguration/ItemConfiguration.controller.js';
import ItemConfigurationItemTypeControllers from '../controllers/ItemConfiguration/ItemConfigurationItemType.controller.js';

const ItemConfigurationRouter = express.Router();

ItemConfigurationRouter.get('/', ItemConfigurationControllers.getItemConfiguration);
ItemConfigurationRouter.post('/', ItemConfigurationControllers.postItemConfiguration);
ItemConfigurationRouter.get('/download', ItemConfigurationControllers.downloadItemConfigurationExcel);

ItemConfigurationRouter.get('/ItemType', ItemConfigurationItemTypeControllers.getItemConfigurationItemType);
ItemConfigurationRouter.post('/ItemType', ItemConfigurationItemTypeControllers.postItemConfigurationItemType);
ItemConfigurationRouter.get('/ItemType/download', ItemConfigurationItemTypeControllers.downloadItemConfigurationItemTypeExcel);

ItemConfigurationRouter.get('/ItemGroup', ItemConfigurationItemTypeControllers.getItemConfigurationItemType);
ItemConfigurationRouter.post('/ItemGroup', ItemConfigurationItemTypeControllers.postItemConfigurationItemType);
ItemConfigurationRouter.get('/ItemGroup/download', ItemConfigurationItemTypeControllers.downloadItemConfigurationItemTypeExcel);

ItemConfigurationRouter.get('/ItemNature', ItemConfigurationItemTypeControllers.getItemConfigurationItemType);
ItemConfigurationRouter.post('/ItemNature', ItemConfigurationItemTypeControllers.postItemConfigurationItemType);
ItemConfigurationRouter.get('/ItemNature/download', ItemConfigurationItemTypeControllers.downloadItemConfigurationItemTypeExcel);

ItemConfigurationRouter.get('/StockUOM', ItemConfigurationItemTypeControllers.getItemConfigurationItemType);
ItemConfigurationRouter.post('/StockUOM', ItemConfigurationItemTypeControllers.postItemConfigurationItemType);
ItemConfigurationRouter.get('/StockUOM/download', ItemConfigurationItemTypeControllers.downloadItemConfigurationItemTypeExcel);

ItemConfigurationRouter.get('/DependentCriteria', ItemConfigurationItemTypeControllers.getItemConfigurationItemType);
ItemConfigurationRouter.post('/DependentCriteria', ItemConfigurationItemTypeControllers.postItemConfigurationItemType);
ItemConfigurationRouter.get('/DependentCriteria/download', ItemConfigurationItemTypeControllers.downloadItemConfigurationItemTypeExcel);

export default ItemConfigurationRouter;
