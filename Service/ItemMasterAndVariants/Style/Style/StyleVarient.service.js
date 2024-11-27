import ItemMasterVariantRepository from "../../../../Repository/ItemMasterAndVariants/Style/Style/StyleVarient.repository.js";

const ItemMasterVariantService = {
  createItemVariant: async (data) => {
    try {
      const result = await ItemMasterVariantRepository.insert(data);
      return { result };
    } catch (error) {
      throw new Error(`Error creating item variant: ${error.message}`);
    }
  },

  getAllItemVariants: async () => {
    try {
      const results = await ItemMasterVariantRepository.findAll();
      return { success: true, data: results };
    } catch (error) {
      throw new Error(`Error fetching item variants: ${error.message}`);
    }
  },
};

export default ItemMasterVariantService;
