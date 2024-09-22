import ItemRepository from '../../../../Repository/ItemMasterAndVariants/Metal/Platinum/PlatinumItem.repository.js';

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
            'Update Date': UpdateDate,
            'Attribute Type': AttributeType,
            'Attribute Value': AttributeValue
        } = itemData;
    
        const params = [
            MetalCode,
            ExclusiveIndicator,
            Description,
            RowStatus,
            CreatedDate,
            UpdateDate,
            AttributeType,
            AttributeValue
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
