import FormulaDocumentRepository from "../../../Repository/FormulaProcedures/FormulaMapping/DocumentType.repository.js";

class FormulaDocumentService {
  async getAllDocument() {
    return await FormulaDocumentRepository.getAll();
  }

  async getDocumentById(configId) {
    return await FormulaDocumentRepository.getById(configId);
  }

  async createDocument(data) {
    if (!data.configId || !data.configCode || !data.configValue) {
      throw new Error("Mandatory fields are missing!");
    }
    return await FormulaDocumentRepository.create(data);
  }
}

export default new FormulaDocumentService();

