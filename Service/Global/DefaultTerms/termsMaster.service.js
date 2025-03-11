import TermsMasterRepository from "../../../Repository/Global/DefaultTerms/termsMaster.repository.js";

const TermsMasterService = {
    getAll: async () => {
        return await TermsMasterRepository.getAll();
    },

    getById: async (termsId) => {
        return await TermsMasterRepository.getById(termsId);
    },

    create: async (data) => {
        return await TermsMasterRepository.create(data);
    },

    update: async (termsId, data) => {
        return await TermsMasterRepository.update(termsId, data);
    },

    delete: async (termsId) => {
        return await TermsMasterRepository.delete(termsId);
    }
};

export default TermsMasterService;
