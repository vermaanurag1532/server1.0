import repository from '../Repository/demoVariant.repository.js';

const getAllVariants = () => repository.getAllVariants();
const getVariantByName = (name) => repository.getVariantByName(name);
const createVariant = (data) => repository.createVariant(data);
const updateVariant = (name, data) => repository.updateVariant(name, data);
const patchVariant = (name, data) => repository.patchVariant(name, data);
const deleteVariant = (name) => repository.deleteVariant(name);

export default {
    getAllVariants,
    getVariantByName,
    createVariant,
    updateVariant,
    patchVariant,
    deleteVariant
};
