import CustomerMasterRepository from "../../../Repository/Global/Customer/customerMaster.repository.js";

const CustomerMasterService = {
    getAll: async () => {
        return await CustomerMasterRepository.getAll();
    },

    getById: async (id) => {
        return await CustomerMasterRepository.getById(id);
    },

    create: async (customerData) => {
        return await CustomerMasterRepository.create(customerData);
    },

    update: async (id, customerData) => {
        return await CustomerMasterRepository.update(id, customerData);
    },

    delete: async (id) => {
        return await CustomerMasterRepository.delete(id);
    }
};

export default CustomerMasterService;
