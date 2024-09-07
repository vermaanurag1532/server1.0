import SilverItemRepository from '../../../../Repository/ItemMasterAndVariants/Metal/Silver/SilverItem.repository.js';

const SilverItemService = {
    getItems: async () => {
        try {
            const data = await SilverItemRepository.getAll();
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
            const result = await SilverItemRepository.insert(params);
            return result;
        } catch (error) {
            throw new Error(`Error creating item: ${error.message}`);
        }
    }
};

export default SilverItemService;
