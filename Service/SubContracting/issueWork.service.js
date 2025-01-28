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

  modify: async (stockId, data) => {
    return await SubContractingIssueWorkRepository.modify(stockId, data);
  },

  deleteById: async (stockId) => {
    return await SubContractingIssueWorkRepository.deleteById(stockId);
  },
};

export default SubContractingIssueWorkService;
