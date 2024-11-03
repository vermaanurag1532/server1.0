import ItemStyleRepository from '../../../../Repository/ItemMasterAndVariants/Style/Style/StyleItem.repository.js';

const ItemStyleService = {
    // Add a new style item
    createStyleItem: async (styleData) => {
        const {
            styleName, exclusiveIndicator, holdIndicator, reworkIndicator, 
            rejectIndicator, protoRequiredIndicator, autoVarientCodeGenIndicator, 
            remark, rowStatus, imageDetails
        } = styleData;
        const params = [
            styleName, exclusiveIndicator, holdIndicator, reworkIndicator, 
            rejectIndicator, protoRequiredIndicator, autoVarientCodeGenIndicator, 
            remark, rowStatus, JSON.stringify(imageDetails)
        ];
        try {
            return await ItemStyleRepository.insertStyleItem(params);
        } catch (error) {
            throw new Error(`Error creating style item: ${error.message}`);
        }
    },

    // Get all style items
    getAllStyleItems: async () => {
        try {
            return await ItemStyleRepository.getAllStyleItems();
        } catch (error) {
            throw new Error(`Error fetching style items: ${error.message}`);
        }
    },

    // Get a style item by Style Name
    getStyleItemByName: async (styleName) => {
        try {
            return await ItemStyleRepository.getStyleItemByName(styleName);
        } catch (error) {
            throw new Error(`Error fetching style item by name: ${error.message}`);
        }
    }
};

export default ItemStyleService;
