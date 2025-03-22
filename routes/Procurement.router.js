import express from "express";
import ProcurementGoodReceiptController from "../controllers/Procurement/GoodReceiptNote/GoodReceiptNote.controller.js";
import RawMaterialController from "../controllers/Procurement/RawMaterial/RawMaterial.controller.js"

const ProcurementRouter = express.Router();

ProcurementRouter.post("/GRN/", ProcurementGoodReceiptController.create);
ProcurementRouter.get("/GRN/", ProcurementGoodReceiptController.getAll);
ProcurementRouter.get("/GRN/:id", ProcurementGoodReceiptController.getById);
ProcurementRouter.put("/GRN/:id", ProcurementGoodReceiptController.update);
ProcurementRouter.delete("/GRN/:id", ProcurementGoodReceiptController.delete);
ProcurementRouter.get("/download", ProcurementGoodReceiptController.downloadExcel);

ProcurementRouter.post("/RawMaterial/", RawMaterialController.create);
ProcurementRouter.get("/RawMaterial/", RawMaterialController.getAll);
ProcurementRouter.get("/RawMaterial/:id", RawMaterialController.getById);
ProcurementRouter.put("/RawMaterial/:id", RawMaterialController.update);
ProcurementRouter.delete("/RawMaterial/:id", RawMaterialController.delete);

export default ProcurementRouter;
