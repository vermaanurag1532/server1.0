import FormulaTransactionRepository from "../../../Repository/FormulaProcedures/FormulaMapping/TransactionType.repository.js";

class FormulaTransactionService {
  // Get all transactions
  async getAllTransactions() {
    console.log("FormulaTransactionService");
    return await FormulaTransactionRepository.getAll();
  }

  // Get transaction by ID
  async getTransactionById(configId) {
        console.log("FormulaTransactionService");
    if (!configId) {
      throw new Error("Config ID is required");
    }
    return await FormulaTransactionRepository.getById(configId);
  }

  // Create a new transaction
  async createTransaction(data) {
    if (!data.configId || !data.configCode || !data.configValue) {
      throw new Error("Mandatory fields (Config Id, Config Code, Config Value) are missing!");
    }
    return await FormulaTransactionRepository.create(data);
  }
}

export default new FormulaTransactionService();
