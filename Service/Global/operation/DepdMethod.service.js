// Service/Master/DepdMethod/DepdMethodService.js
import DepdMethodRepository from '../../../Repository/Global/operation/DepdMethod.repository.js';

const DepdMethodService = {
    getAllDepdMethods: async () => {
        try {
            return await DepdMethodRepository.getAllDepdMethods();
        } catch (error) {
            throw new Error(`Error fetching Depd Methods: ${error.message}`);
        }
    },

    addDepdMethod: async (data) => {
        try {
            if (!data.configId || !data.configCode || !data.configValue) {
                throw new Error('Config Id, Config Code, and Config Value are required.');
            }
            return await DepdMethodRepository.addDepdMethod(data);
        } catch (error) {
            throw new Error(`Error adding Depd Method: ${error.message}`);
        }
    },
};

export default DepdMethodService;
