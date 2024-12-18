import DiamondVariantRepository from "../../../../Repository/ItemMasterAndVariants/Stone/Diamond/DiamondVariant.repository.js";

const DiamondVariantService = {
  create: (data) => {
    return DiamondVariantRepository.insert(data);
  },

  getAll: () => {
    return DiamondVariantRepository.findAll();
  },

  getById: (id) => {
    return DiamondVariantRepository.findById(id);
  },

  update: (id, data) => {
    return DiamondVariantRepository.update(id, data);
  },

  delete: (id) => {
    return DiamondVariantRepository.delete(id);
  }
};

export default DiamondVariantService;
