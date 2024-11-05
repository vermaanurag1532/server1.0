import VendorService from '../../../../Service/Master/PartySpecific/Vendor/Vendor.service.js';

const VendorController = {
    getAllVendors: async (req, res) => {
        try {
            const vendors = await VendorService.getAllVendors();
            res.status(200).json(vendors);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getVendorByName: async (req, res) => {
        const { vendorName } = req.params;
        try {
            const vendor = await VendorService.getVendorByName(vendorName);
            if (vendor) {
                res.status(200).json(vendor);
            } else {
                res.status(404).json({ message: "Vendor not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    addVendor: async (req, res) => {
        const vendorData = req.body;
        try {
            const vendorId = await VendorService.addVendor(vendorData);
            res.status(201).json({ message: "Vendor added successfully", vendorId });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default VendorController;
