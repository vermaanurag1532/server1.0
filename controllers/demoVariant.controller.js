import service from '../Service/demoVariant.service.js';

export const getAll = async (req, res) => {
    try {
        const data = await service.getAllVariants();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getByName = async (req, res) => {
    try {
        const { name } = req.params;
        const data = await service.getVariantByName(name);
        if (!data) return res.status(404).json({ message: 'Variant not found' });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const create = async (req, res) => {
    try {
        const result = await service.createVariant(req.body);
        res.status(201).json({ message: 'Created successfully', result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const update = async (req, res) => {
    try {
        const { name } = req.params;
        const result = await service.updateVariant(name, req.body);
        res.json({ message: 'Updated successfully', result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const patch = async (req, res) => {
    try {
        const { name } = req.params;
        const result = await service.patchVariant(name, req.body);
        res.json({ message: 'Patched successfully', result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const remove = async (req, res) => {
    try {
        const { name } = req.params;
        const result = await service.deleteVariant(name);
        res.json({ message: 'Deleted successfully', result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
