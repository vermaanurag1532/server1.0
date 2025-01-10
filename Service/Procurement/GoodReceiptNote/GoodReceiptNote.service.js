import ProcurementGoodReceiptRepository from "../../../Repository/Procurement/GoodReceiptNote/GoodReceiptNote.repository.js";

const ProcurementGoodReceiptService = {
  create: async (data) => {
    const stockId = await ProcurementGoodReceiptRepository.generateStockId();
    data.stockId = stockId;
    await ProcurementGoodReceiptRepository.insert(data);
    return { stockId };
  },

  getAll: async () => {
    return await ProcurementGoodReceiptRepository.findAll();
  },

  getById: async (id) => {
    return await ProcurementGoodReceiptRepository.findById(id);
  },
  update: async (id, data) => {
    const existingRecord = await ProcurementGoodReceiptRepository.findById(id);
    if (!existingRecord) {
      throw new Error("Record not found");
    }
    return await ProcurementGoodReceiptRepository.update(id, data);
  },

  delete: async (id) => {
    const existingRecord = await ProcurementGoodReceiptRepository.findById(id);
    if (!existingRecord) {
      throw new Error("Record not found");
    }
    return await ProcurementGoodReceiptRepository.delete(id);
  },
};

export default ProcurementGoodReceiptService;
