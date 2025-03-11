import GstRegistrationRepository from "../../../Repository/Global/GstRegistration/gstRegistration.repository.js";

const GstRegistrationService = {
    getAll: async () => {
        return await GstRegistrationRepository.getAll();
    },

    getById: async (configId) => {
        return await GstRegistrationRepository.getById(configId);
    },

    create: async (data) => {
        return await GstRegistrationRepository.create(data);
    },

    update: async (configId, data) => {
        return await GstRegistrationRepository.update(configId, data);
    },

    delete: async (configId) => {
        return await GstRegistrationRepository.delete(configId);
    }
};

export default GstRegistrationService;
