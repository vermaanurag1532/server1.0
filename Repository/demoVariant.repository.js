import connection from '../db/connection.js';

const getAllVariants = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `Demo Variant`', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const getVariantByName = (variantName) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `Demo Variant` WHERE variantName = ?', [variantName], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

const createVariant = (data) => {
    const { variantName, weight, image } = data;
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO `Demo Variant` (variantName, weight, image) VALUES (?, ?, ?)',
            [variantName, weight, JSON.stringify(image)],
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
};

const updateVariant = (variantName, data) => {
    const { weight, image } = data;
    return new Promise((resolve, reject) => {
        connection.query(
            'UPDATE `Demo Variant` SET weight = ?, image = ? WHERE variantName = ?',
            [weight, JSON.stringify(image), variantName],
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
};

const patchVariant = (variantName, data) => {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data).map(val => typeof val === 'object' ? JSON.stringify(val) : val);

    return new Promise((resolve, reject) => {
        connection.query(
            `UPDATE \`Demo Variant\` SET ${fields} WHERE variantName = ?`,
            [...values, variantName],
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
};

const deleteVariant = (variantName) => {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM `Demo Variant` WHERE variantName = ?', [variantName], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

export default {
    getAllVariants,
    getVariantByName,
    createVariant,
    updateVariant,
    patchVariant,
    deleteVariant
};
