import express from 'express';
import GoldItemController from '../controllers/ItemMasterAndVariants/Metal/Gold/GoldItem.controller.js';
import GoldVariantsController from '../controllers/ItemMasterAndVariants/Metal/Gold/GoldVariant.controller.js'
import SilverItemController from '../controllers/ItemMasterAndVariants/Metal/Silver/SilverItem.controller.js'
import SilverVariantController from '../controllers/ItemMasterAndVariants/Metal/Silver/SilverVarient.controller.js'
import PlatinumItemController from '../controllers/ItemMasterAndVariants/Metal/Platinum/PlatinumItem.controller.js'
import BronzeItemController from '../controllers/ItemMasterAndVariants/Metal/Bronze/BronzeItem.controller.js'
import DiamondItemController from '../controllers/ItemMasterAndVariants/Stone/Diamond/DiamondItem.controller.js'
import PearlItemController from '../controllers/ItemMasterAndVariants/Stone/Pearl/PearlItem.controller.js'
import PreciousStonesItemController from '../controllers/ItemMasterAndVariants/Stone/PreciousStones/PreciousStonesItem.controller.js'
import SemiPreciousStonesItemController from '../controllers/ItemMasterAndVariants/Stone/SemiPreciousStones/SemiPreciousStones.controller.js'
import ZirconItemController from '../controllers/ItemMasterAndVariants/Stone/Zircon/ZirconItem.controller.js'
import PolkiItemController from '../controllers/ItemMasterAndVariants/Stone/Polki/PolkiItem.controller.js'
import DiamondSolitaireItemController from '../controllers/ItemMasterAndVariants/Stone/DiamondSolitaire/DiamondSolitaireItem.controller.js'
import ConsumableWTItemController from '../controllers/ItemMasterAndVariants/Consumable/ConsumableWT/ConsumableWTItem.controller.js'
import SetItemController from '../controllers/ItemMasterAndVariants/Set/SetItem.controller.js'
import StyleCertificateItemController from '../controllers/ItemMasterAndVariants/Certificate/StyleCertificate/StyleCertificateItem.controller.js'
import StoneCertificateItemController from '../controllers/ItemMasterAndVariants/Certificate/StoneCertificate/StoneCertificate.controller.js'
import PackingMaterialsItemController from '../controllers/ItemMasterAndVariants/PackingMaterial/PackingMaterials/PackingMaterialsItem.controller.js'

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

ItemMasterAndVariantsRouter.get('/Stone/Diamond/Item' , DiamondItemController.getAllItems);
ItemMasterAndVariantsRouter.post('/Stone/Diamond/Item' , DiamondItemController.postItem);
ItemMasterAndVariantsRouter.get('/Stone/Diamond/Item/download' , DiamondItemController.downloadItemsExcel);

ItemMasterAndVariantsRouter.get('/Stone/Pearl/Item' , PearlItemController.getAllItems);
ItemMasterAndVariantsRouter.post('/Stone/Pearl/Item' , PearlItemController.postItem);
ItemMasterAndVariantsRouter.get('/Stone/Pearl/Item/download' , PearlItemController.downloadItemsExcel);

ItemMasterAndVariantsRouter.get('/Stone/PreciousStone/Item' , PreciousStonesItemController.getAllItems);
ItemMasterAndVariantsRouter.post('/Stone/PreciousStone/Item' , PreciousStonesItemController.postItem);
ItemMasterAndVariantsRouter.get('/Stone/PreciousStone/Item/download' , PreciousStonesItemController.downloadItemsExcel);

ItemMasterAndVariantsRouter.get('/Stone/SemiPreciousStone/Item' , SemiPreciousStonesItemController.getAllItems);
ItemMasterAndVariantsRouter.post('/Stone/SemiPreciousStone/Item' , SemiPreciousStonesItemController.postItem);
ItemMasterAndVariantsRouter.get('/Stone/SemiPreciousStone/Item/download' , SemiPreciousStonesItemController.downloadItemsExcel);

ItemMasterAndVariantsRouter.get('/Stone/Zircon/Item' , ZirconItemController.getAllItems);
ItemMasterAndVariantsRouter.post('/Stone/Zircon/Item' , ZirconItemController.postItem);
ItemMasterAndVariantsRouter.get('/Stone/Zircon/Item/download' , ZirconItemController.downloadItemsExcel);

ItemMasterAndVariantsRouter.get('/Stone/Polki/Item' , PolkiItemController.getAllItems);
ItemMasterAndVariantsRouter.post('/Stone/Polki/Item' , PolkiItemController.postItem);
ItemMasterAndVariantsRouter.get('/Stone/Polki/Item/download' , PolkiItemController.downloadItemsExcel);

ItemMasterAndVariantsRouter.get('/Stone/DiamondSolitaire/Item' , DiamondSolitaireItemController.getAllItems);
ItemMasterAndVariantsRouter.post('/Stone/DiamondSolitaire/Item' , DiamondSolitaireItemController.postItem);
ItemMasterAndVariantsRouter.get('/Stone/DiamondSolitaire/Item/download' , DiamondSolitaireItemController.downloadItemsExcel);

ItemMasterAndVariantsRouter.get('/Consumable/ConsumableWT/Item' , ConsumableWTItemController.getAllItems);
ItemMasterAndVariantsRouter.post('/Consumable/ConsumableWT/Item' , ConsumableWTItemController.postItem);
ItemMasterAndVariantsRouter.get('/Consumable/ConsumableWT/Item/download' , ConsumableWTItemController.downloadItemsExcel);

ItemMasterAndVariantsRouter.get('/Set/Item' , SetItemController.getAllItems);
ItemMasterAndVariantsRouter.post('/Set/Item' , SetItemController.postItem);
ItemMasterAndVariantsRouter.get('/Set/Item/download' , SetItemController.downloadItemsExcel);

ItemMasterAndVariantsRouter.get('/Certificate/StyleCertificate/Item' , StyleCertificateItemController.getAllItems);
ItemMasterAndVariantsRouter.post('/Certificate/StyleCertificate/Item' , StyleCertificateItemController.postItem);
ItemMasterAndVariantsRouter.get('/Certificate/StyleCertificate/Item/download' , StyleCertificateItemController.downloadItemsExcel);

ItemMasterAndVariantsRouter.get('/Certificate/StoneCertificate/Item' , StoneCertificateItemController.getAllItems);
ItemMasterAndVariantsRouter.post('/Certificate/StoneCertificate/Item' , StoneCertificateItemController.postItem);
ItemMasterAndVariantsRouter.get('/Certificate/StoneCertificate/Item/download' , StoneCertificateItemController.downloadItemsExcel);

ItemMasterAndVariantsRouter.get('/PackingMaterial/PackingMaterials/Item' , PackingMaterialsItemController.getAllItems);
ItemMasterAndVariantsRouter.post('/PackingMaterial/PackingMaterials/Item' , PackingMaterialsItemController.postItem);
ItemMasterAndVariantsRouter.get('/PackingMaterial/PackingMaterials/Item/download' , PackingMaterialsItemController.downloadItemsExcel);

export default ItemMasterAndVariantsRouter;