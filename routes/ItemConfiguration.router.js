import express from 'express';
import ItemConfigurationControllers from '../controllers/ItemConfiguration/ItemConfiguration.controller.js';
import ItemConfigurationItemTypeControllers from '../controllers/ItemConfiguration/ItemConfigurationItemType.controller.js';
import ItemConfigurationItemGroupControllers from '../controllers/ItemConfiguration/ItemConfigurationItemGroup.controller.js';
import ItemConfigurationItemNatureControllers from '../controllers/ItemConfiguration/ItemConfigurationItemNature.controller.js';
import ItemConfigurationStockUOMControllers from '../controllers/ItemConfiguration/ItemConfigurationStockUOM.controller.js';
import ItemConfigurationDependentCriteriaControllers from '../controllers/ItemConfiguration/ItemConfigurationDependentCriteria.controller.js';

const ItemConfigurationRouter = express.Router();

ItemConfigurationRouter.get('/', ItemConfigurationControllers.getItemConfiguration);
ItemConfigurationRouter.post('/', ItemConfigurationControllers.postItemConfiguration);
ItemConfigurationRouter.put('/:id', ItemConfigurationControllers.updateItemConfiguration);
ItemConfigurationRouter.delete('/:id', ItemConfigurationControllers.deleteItemConfiguration);
ItemConfigurationRouter.get('/download', ItemConfigurationControllers.downloadItemConfigurationExcel);

ItemConfigurationRouter.get('/ItemType', ItemConfigurationItemTypeControllers.getItemConfigurationItemType);
ItemConfigurationRouter.post('/ItemType', ItemConfigurationItemTypeControllers.postItemConfigurationItemType);
ItemConfigurationRouter.get('/ItemType/download', ItemConfigurationItemTypeControllers.downloadItemConfigurationItemTypeExcel);

ItemConfigurationRouter.get('/ItemGroup', ItemConfigurationItemGroupControllers.getItemConfigurationItemType);
ItemConfigurationRouter.post('/ItemGroup', ItemConfigurationItemGroupControllers.postItemConfigurationItemType);
ItemConfigurationRouter.get('/ItemGroup/download', ItemConfigurationItemGroupControllers.downloadItemConfigurationItemTypeExcel);

ItemConfigurationRouter.get('/ItemNature', ItemConfigurationItemNatureControllers.getItemConfigurationItemType);
ItemConfigurationRouter.post('/ItemNature', ItemConfigurationItemNatureControllers.postItemConfigurationItemType);
ItemConfigurationRouter.get('/ItemNature/download', ItemConfigurationItemNatureControllers.downloadItemConfigurationItemTypeExcel);

ItemConfigurationRouter.get('/StockUOM', ItemConfigurationStockUOMControllers.getItemConfigurationItemType);
ItemConfigurationRouter.post('/StockUOM', ItemConfigurationStockUOMControllers.postItemConfigurationItemType);
ItemConfigurationRouter.get('/StockUOM/download', ItemConfigurationStockUOMControllers.downloadItemConfigurationItemTypeExcel);

ItemConfigurationRouter.get('/DependentCriteria', ItemConfigurationDependentCriteriaControllers.getItemConfigurationItemType);
ItemConfigurationRouter.post('/DependentCriteria', ItemConfigurationDependentCriteriaControllers.postItemConfigurationItemType);
ItemConfigurationRouter.get('/DependentCriteria/download', ItemConfigurationDependentCriteriaControllers.downloadItemConfigurationItemTypeExcel);

export default ItemConfigurationRouter;
