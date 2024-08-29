import ItemRepository from '../../../../Repository/ItemMasterAndVariants/Metal/Gold/GoldItem.repository.js';

const ItemService = {
    getItems: async () => {
        try {
            const data = await ItemRepository.getAll();
            return data;
        } catch (error) {
            throw new Error(`Error retrieving items: ${error.message}`);
        }
    },

    createItem: async (itemData) => {
        const {
            MetalCode,
            ExclusiveIndicator,
            Description,
            RowStatus,
            CreatedDate,
            UpdateDate
        } = itemData;

        const params = [
            MetalCode,
            ExclusiveIndicator,
            Description,
            RowStatus,
            CreatedDate,
            UpdateDate
        ];

        try {
            const result = await ItemRepository.insert(params);
            return result;
        } catch (error) {
            throw new Error(`Error creating item: ${error.message}`);
        }
    }
};

export default ItemService;
