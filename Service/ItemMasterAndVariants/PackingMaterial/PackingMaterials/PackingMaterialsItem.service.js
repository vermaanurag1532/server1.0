import ItemRepository from '../../../../Repository/ItemMasterAndVariants/PackingMaterial/PackingMaterials/PackingMaterialsItem.repository.js';

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
            'Code': Code,
            'Name': Name,
            'Remark': Remark,
            'Row status': RowStatus,
            'Created Date': CreatedDate,
            'Update Date': UpdateDate,
            'Attribute Type': AttributeType,
            'Attribute Value': AttributeValue
        } = itemData;
    
        const params = [
            Code,
            Name,
            Remark,
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
