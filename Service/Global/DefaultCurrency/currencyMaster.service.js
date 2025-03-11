import CurrencyMasterRepository from "../../../Repository/Global/DefaultCurrency/currencyMaster.repository.js";

const CurrencyMasterService = {
    getAll: async () => {
        return await CurrencyMasterRepository.getAll();
    },

    getById: async (currencyId) => {
        return await CurrencyMasterRepository.getById(currencyId);
    },

    create: async (data) => {
        return await CurrencyMasterRepository.create(data);
    },

    update: async (currencyId, data) => {
        return await CurrencyMasterRepository.update(currencyId, data);
    },

    delete: async (currencyId) => {
        return await CurrencyMasterRepository.delete(currencyId);
    }
};

export default CurrencyMasterService;
