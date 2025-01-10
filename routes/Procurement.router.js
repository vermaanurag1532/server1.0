import express from "express";
import ProcurementGoodReceiptController from "../controllers/Procurement/GoodReceiptNote/GoodReceiptNote.controller.js";

const ProcurementRouter = express.Router();

ProcurementRouter.post("/GRN/", ProcurementGoodReceiptController.create);
ProcurementRouter.get("/GRN/", ProcurementGoodReceiptController.getAll);
ProcurementRouter.get("/GRN/:id", ProcurementGoodReceiptController.getById);
ProcurementRouter.put("/GRN/:id", ProcurementGoodReceiptController.update);
ProcurementRouter.delete("/GRN/:id", ProcurementGoodReceiptController.delete);

export default ProcurementRouter;
