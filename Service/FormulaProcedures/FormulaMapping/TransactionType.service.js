import FormulaTransactionRepository from "../../../Repository/FormulaProcedures/FormulaMapping/TransactionType.repository.js";

class FormulaTransactionService {
  async getAllTransactions() {
    return await FormulaTransactionRepository.getAll();
  }

  async getTransactionById(configId) {
    return await FormulaTransactionRepository.getById(configId);
  }

  async createTransaction(data) {
    if (!data.configId || !data.configCode || !data.configValue) {
      throw new Error("Mandatory fields are missing!");
    }
    return await FormulaTransactionRepository.create(data);
  }
}

export default new FormulaTransactionService();
