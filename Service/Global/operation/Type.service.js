import TypeRepository from '../../../Repository/Global/operation/Type.repository.js';

const TypeService = {
    getAllTypes: async () => {
        return await TypeRepository.getAllTypes();
    },

    getTypeById: async (configId) => {
        return await TypeRepository.getTypeById(configId);
    },

    addType: async (typeData) => {
        return await TypeRepository.addType(typeData);
    }
};

export default TypeService;
