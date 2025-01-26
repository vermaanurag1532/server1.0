import express from "express";
import BarcodeHistoryController from "../controllers/Barcode/History.controller.js";
import BarcodeDetailController from "../controllers/Barcode/Detail.controller.js";

const BarcodeRouter = express.Router();

BarcodeRouter.post("/History", BarcodeHistoryController.createBarcodeHistory);
BarcodeRouter.get("/History", BarcodeHistoryController.getAllBarcodeHistories);
BarcodeRouter.get("/History/:stockId", BarcodeHistoryController.getBarcodeHistoryByStockId);
BarcodeRouter.delete("/History/:stockId", BarcodeHistoryController.deleteBarcodeHistoryByStockId);

BarcodeRouter.post("/Detail", BarcodeDetailController.createBarcodeDetail);
BarcodeRouter.get("/Detail", BarcodeDetailController.getAllBarcodeDetails);
BarcodeRouter.get("/Detail/:stockId", BarcodeDetailController.getBarcodeDetailByStockId);
BarcodeRouter.delete("/Detail/:stockId", BarcodeDetailController.deleteBarcodeDetailByStockId);

export default BarcodeRouter;
