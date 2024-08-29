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
            'Metal code': MetalCode,
            'Exclusive Indicator': ExclusiveIndicator,
            'Description': Description,
            'Row status': RowStatus,
            'Created Date': CreatedDate,
            'Update Date': UpdateDate
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
