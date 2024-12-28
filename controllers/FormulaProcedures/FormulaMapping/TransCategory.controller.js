import FormulaTransCategoryService from "../../../Service/FormulaProcedures/FormulaMapping/TransCategory.service.js";

class FormulaTransCategoryController {
  async getAll(req, res) {
    try {
      const Document = await FormulaTransCategoryService.getAllTransCategory();
      res.status(200).json(Document);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const transaction = await FormulaTransCategoryService.getTransCategoryById(id);
      if (!transaction) {
        return res.status(404).json({ success: false, message: "Transaction not found" });
      }
      res.status(200).json({ success: true, data: transaction });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async create(req, res) {
    try {
      const data = req.body;
      const createdId = await FormulaTransCategoryService.createTransCategory(data);
      res.status(201).json({ success: true, id: createdId });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new FormulaTransCategoryController();
