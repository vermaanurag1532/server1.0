import connection from '../../../db/connection.js';

const RateStructureRepository = {
    insertMaster: (rangeHierarchyName, rangeType) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO \`Formula Procedures Rate Structure Formula Range Master\`
                (\`Range Hierarchy Name\`, \`Range Type\`)
                VALUES (?, ?)
            `;
            connection.query(query, [rangeHierarchyName, rangeType], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    insertDetails: (details) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO \`Formula Range Hierarchy details\`
                (\`Data Type\`, \`Depd Field\`, \`Range Hierarchy Name\`)
                VALUES ?
            `;
            const values = details.map(detail => [
                detail.dataType,
                detail.depdField,
                detail.rangeHierarchyName
            ]);
            connection.query(query, [values], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
};

export default RateStructureRepository;
