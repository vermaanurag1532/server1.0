import RawMaterialRepository from "../../../Repository/Procurement/RawMaterial/RawMaterial.repository.js";

const RawMaterialService = {
  create: async (data) => {
    const stockId = await RawMaterialRepository.generateStockId();
    data.stockId = stockId;
    await RawMaterialRepository.insert(data);
    return { stockId };
  },

  getAll: async () => {
    return await RawMaterialRepository.findAll();
  },

  getById: async (id) => {
    return await RawMaterialRepository.findById(id);
  },
  update: async (id, data) => {
    const existingRecord = await RawMaterialRepository.findById(id);
    if (!existingRecord) {
      throw new Error("Record not found");
    }
    return await RawMaterialRepository.update(id, data);
  },

  delete: async (id) => {
    const existingRecord = await RawMaterialRepository.findById(id);
    if (!existingRecord) {
      throw new Error("Record not found");
    }
    return await RawMaterialRepository.delete(id);
  },
};

export default RawMaterialService;
