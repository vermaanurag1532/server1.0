import VendorRepository from '../../../../Repository/Master/PartySpecific/Vendor/Vendor.repository.js';

const VendorService = {
    getAllVendors: async () => {
        return await VendorRepository.getAllVendors();
    },

    getVendorByName: async (vendorName) => {
        return await VendorRepository.getVendorByName(vendorName);
    },

    addVendor: async (vendorData) => {
        return await VendorRepository.addVendor(vendorData);
    }
};

export default VendorService;
