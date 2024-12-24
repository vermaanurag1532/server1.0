import FormulaRepository from "../../../Repository/FormulaProcedures/FormulaMapping/ProcedureType.repository.js";

class FormulaService {
  async getAllFormulas() {
    return await FormulaRepository.getAll();
  }

  async getFormulaById(configId) {
    if (!configId) throw new Error("Config ID is required");
    return await FormulaRepository.getById(configId);
  }

  async createFormula(data) {
    if (!data.configId || !data.configCode || !data.configValue) {
      throw new Error("Config ID, Code, and Value are required fields");
    }
    return await FormulaRepository.create(data);
  }
}

export default new FormulaService();
