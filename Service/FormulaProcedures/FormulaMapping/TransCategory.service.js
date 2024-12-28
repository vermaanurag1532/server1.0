import FormulaTransCategoryRepository from "../../../Repository/FormulaProcedures/FormulaMapping/TransCategory.repository.js";

class FormulaTransCategoryService {
  async getAllTransCategory() {
    return await FormulaTransCategoryRepository.getAll();
  }

  async getTransCategoryById(configId) {
    return await FormulaTransCategoryRepository.getById(configId);
  }

  async createTransCategory(data) {
    if (!data.configId || !data.configCode || !data.configValue) {
      throw new Error("Mandatory fields are missing!");
    }
    return await FormulaTransCategoryRepository.create(data);
  }
}

export default new FormulaTransCategoryService();

