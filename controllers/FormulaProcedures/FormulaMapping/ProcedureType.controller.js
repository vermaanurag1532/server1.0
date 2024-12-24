import FormulaService from "../../../Service/FormulaProcedures/FormulaMapping/ProcedureType.service.js";

class FormulaController {
  async getAll(req, res) {
    try {
      const formulas = await FormulaService.getAllFormulas();
      res.status(200).json(formulas);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const formula = await FormulaService.getFormulaById(id);
      if (!formula) {
        return res.status(404).json({ success: false, message: "Formula not found" });
      }
      res.status(200).json({ success: true, data: formula });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async create(req, res) {
    try {
      const formulaData = req.body;
      const insertedId = await FormulaService.createFormula(formulaData);
      res.status(201).json({ success: true, message: "Formula created successfully", id: insertedId });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new FormulaController();
