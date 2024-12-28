import FormulaMappingService from "../../../Service/FormulaProcedures/FormulaMapping/FormulaMapping.service.js";

class FormulaMappingController {
  async getAll(req, res) {
    try {
      const mappings = await FormulaMappingService.getAllMappings();
      res.status(200).json(mappings);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { procedureName } = req.params;
      const mapping = await FormulaMappingService.getMappingById(procedureName);
      if (!mapping) {
        return res.status(404).json({ success: false, message: "Mapping not found" });
      }
      res.status(200).json({ success: true, data: mapping });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async create(req, res) {
    try {
      const data = req.body;
      const id = await FormulaMappingService.createMapping(data);
      res.status(201).json({ success: true, message: "Mapping created", id });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new FormulaMappingController();
