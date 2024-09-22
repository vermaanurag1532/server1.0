import ItemRepository from '../../../../Repository/ItemMasterAndVariants/Stone/SemiPreciousStones/SemiPreciousStonesItem.repository.js';

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
            'Stone code': StoneCode,
            'Description': Description,
            'Row status': RowStatus,
            'Created Date': CreatedDate,
            'Update Date': UpdateDate,
            'Attribute Type': AttributeType,
            'Attribute Value': AttributeValue
        } = itemData;
    
        const params = [
            StoneCode,
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
