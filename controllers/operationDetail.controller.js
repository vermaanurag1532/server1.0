import OperationService from '../Service/operationDetail.service.js';

const OperationController = {
  getAll: async (req, res) => {
    try {
      const operations = await OperationService.getAll();
      res.json(operations);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const operation = await OperationService.getById(id);
      if (!operation) return res.status(404).json({ message: 'Operation not found' });
      res.json(operation);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const data = req.body;
      const result = await OperationService.create(data);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await OperationService.update(id, data);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await OperationService.delete(id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

export default OperationController;
