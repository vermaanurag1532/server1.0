import ItemMasterVariantRepository from "../../../../Repository/ItemMasterAndVariants/Style/Style/StyleVarient.repository.js";

const ItemMasterVariantService = {
  createItemVariant: async (data) => {
    try {
      return await ItemMasterVariantRepository.insert(data);
    } catch (error) {
      throw new Error(`Error creating item variant: ${error.message}`);
    }
  },

  getAllItemVariants: async () => {
    try {
      return await ItemMasterVariantRepository.findAll();
    } catch (error) {
      throw new Error(`Error fetching item variants: ${error.message}`);
    }
  },
};

export default ItemMasterVariantService;
