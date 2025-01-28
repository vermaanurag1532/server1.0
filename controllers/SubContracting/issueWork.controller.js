import SubContractingIssueWorkService from '../../Service/SubContracting/issueWork.service.js';

const SubContractingIssueWorkController = {
  // Get all records
  getAll: async (req, res) => {
    try {
      const records = await SubContractingIssueWorkService.getAll();
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a record by stockId
  getById: async (req, res) => {
    try {
      const stockId = req.params.stockId;
      const record = await SubContractingIssueWorkService.getById(stockId);
      if (!record) {
        res.status(404).json({ message: 'Record not found' });
      } else {
        res.status(200).json(record);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create a new record
  create: async (req, res) => {
    try {
      const newRecord = await SubContractingIssueWorkService.create(req.body);
      res.status(201).json(newRecord);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Modify a record by stockId
  modify: async (req, res) => {
    try {
      const stockId = req.params.stockId;
      const updatedRecord = await SubContractingIssueWorkService.modify(stockId, req.body);
      if (updatedRecord.affectedRows === 0) {
        res.status(404).json({ message: 'Record not found or no changes made' });
      } else {
        res.status(200).json({ message: 'Record updated successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a record by stockId
  deleteById: async (req, res) => {
    try {
      const stockId = req.params.stockId;
      const result = await SubContractingIssueWorkService.deleteById(stockId);
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Record not found' });
      } else {
        res.status(200).json({ message: 'Record deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default SubContractingIssueWorkController;
