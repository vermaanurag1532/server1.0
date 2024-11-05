import express from 'express';
import VendorController from '../controllers/Master/PartySpecific/Vendor/Vendor.controller.js';

const MasterRouter = express.Router();

MasterRouter.get('/PartySpecific/vendors', VendorController.getAllVendors);
MasterRouter.get('/PartySpecific/vendors/:vendorName', VendorController.getVendorByName);
MasterRouter.post('/PartySpecific/vendors', VendorController.addVendor);

export default MasterRouter;
