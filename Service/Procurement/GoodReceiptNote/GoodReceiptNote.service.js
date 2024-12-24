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
  }
};

export default ProcurementGoodReceiptService;
