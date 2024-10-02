import ItemRepository from '../../../../Repository/ItemMasterAndVariants/Consumable/ConsumableWT/ConsumableWTItem.repository.js';

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
            'Consumable code': ConsumableCode,
            'Row status': RowStatus,
            'Created Date': CreatedDate,
            'Update Date': UpdateDate,
        } = itemData;
    
        const params = [
            ConsumableCode,
            RowStatus,
            CreatedDate,
            UpdateDate,
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
