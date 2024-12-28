import FormulaMappingRepository from "../../../Repository/FormulaProcedures/FormulaMapping/FormulaMapping.repository.js";

class FormulaMappingService {
  async getAllMappings() {
    return await FormulaMappingRepository.getAll();
  }

  async getMappingById(procedureName) {
    if (!procedureName) {
      throw new Error("Procedure Name is required");
    }
    return await FormulaMappingRepository.getById(procedureName);
  }

  async createMapping(data) {
    if (!data.procedureName) {
      throw new Error("Procedure Name is required");
    }
    return await FormulaMappingRepository.create(data);
  }
}

export default new FormulaMappingService();
