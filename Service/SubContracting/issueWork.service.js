import SubContractingIssueWorkRepository from '../../Repository/SubContracting/issueWork.repository.js';

const SubContractingIssueWorkService = {
    getAll: async () => {
        return await SubContractingIssueWorkRepository.getAll();
    },

    getById: async (stockId) => {
        return await SubContractingIssueWorkRepository.getById(stockId);
    },

    create: async (data) => {
        return await SubContractingIssueWorkRepository.create(data);
    },

    update: async (stockId, data) => {
        return await SubContractingIssueWorkRepository.update(stockId, data);
    },

    delete: async (stockId) => {
        return await SubContractingIssueWorkRepository.delete(stockId);
    }
};

export default SubContractingIssueWorkService;
