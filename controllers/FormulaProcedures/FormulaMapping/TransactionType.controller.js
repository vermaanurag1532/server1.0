import FormulaTransactionService from "../../../Service/FormulaProcedures/FormulaMapping/TransactionType.service.js";

class FormulaTransactionController {
  // Get all records
  async getAll(req, res) {
    try {
      const transactions = await FormulaTransactionService.getAllTransactions();
      console.log("FormulaTransactionController");
      res.status(200).json(transactions);
    } catch (error) {
      console.error("Error in getAll:", error); // Add this line for debugging
      res.status(500).json({ success: false, message: error.message });
    }
  }
  

  // Get a record by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const transaction = await FormulaTransactionService.getTransactionById(id);
      console.log("FormulaTransactionController");
      if (!transaction) {
        return res.status(404).json({ success: false, message: "Transaction not found" });
      }
      res.status(200).json({ success: true, data: transaction });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Create a new record
  async create(req, res) {
    try {
      const data = req.body;
      const createdId = await FormulaTransactionService.createTransaction(data);
      res.status(201).json({ success: true, id: createdId });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new FormulaTransactionController();
