// routes/posLedgerRoutes.js
import express from 'express';
import posLedgerController from '../controllers/PointOfSale/ledger.controller.js';

const POSRouter = express.Router();

// Health check endpoint
POSRouter.get('/health', posLedgerController.healthCheck);
POSRouter.get('/', posLedgerController.getAllPosLedgers);
POSRouter.get('/:posId', posLedgerController.getPosLedgerByPOSId);
POSRouter.get('/PartyName/:name', posLedgerController.getPosLedgerByName);
POSRouter.post('/', posLedgerController.createPosLedger);
POSRouter.put('/:posId', posLedgerController.updatePosLedger);
POSRouter.delete('/:posId', posLedgerController.deletePosLedger);
POSRouter.delete('/:posId/permanent', posLedgerController.hardDeletePosLedger);

export default POSRouter;