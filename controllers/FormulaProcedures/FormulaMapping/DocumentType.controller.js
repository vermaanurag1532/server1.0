import FormulaDocumentService from "../../../Service/FormulaProcedures/FormulaMapping/DocumentType.service.js";

class FormulaDocumentController {
  async getAll(req, res) {
    try {
      const Document = await FormulaDocumentService.getAllDocument();
      res.status(200).json(Document);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const transaction = await FormulaDocumentService.getDocumentById(id);
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
      const createdId = await FormulaDocumentService.createDocument(data);
      res.status(201).json({ success: true, id: createdId });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new FormulaDocumentController();
