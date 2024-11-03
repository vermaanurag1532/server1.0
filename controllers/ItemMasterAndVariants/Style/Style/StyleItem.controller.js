import ItemStyleService from '../../../../Service/ItemMasterAndVariants/Style/Style/StyleItem.service.js';

const ItemStyleController = {
    // Create a new style item
    createStyleItem: async (req, res) => {
        try {
            const result = await ItemStyleService.createStyleItem(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get all style items
    getAllStyleItems: async (req, res) => {
        try {
            const data = await ItemStyleService.getAllStyleItems();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get a style item by Style Name
    getStyleItemByName: async (req, res) => {
        try {
            const { name } = req.params;
            const data = await ItemStyleService.getStyleItemByName(name);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default ItemStyleController;
