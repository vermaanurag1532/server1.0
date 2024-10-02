import ItemRepository from '../../../Repository/ItemMasterAndVariants/Set/Set.Itemrepository.js';

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
            'Set code': SetCode,
            'Description': Description,
            'Row status': RowStatus,
            'Created Date': CreatedDate,
            'Update Date': UpdateDate
        } = itemData;
    
        const params = [
            SetCode,
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
