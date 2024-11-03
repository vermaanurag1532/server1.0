import connection from '../../../../db/connection.js';

const RangeHierarchyRepository = {
    // Insert new range hierarchy detail
    insertRangeHierarchyDetail: (params) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO \`Formula Range Hierarchy details\`
                (\`Data Type\`, \`Depd Field\`, \`Range Hierarchy Name\`)
                VALUES (?, ?, ?)
            `;
            connection.query(query, params, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },


    // Fetch all data from Range Hierarchy Details
    getAllRangeHierarchyDetails: () => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT \`Data Type\`, \`Depd Field\`, \`Range Hierarchy Name\`
                FROM \`Formula Range Hierarchy details\`
            `;
            connection.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getRangeHierarchyByName: (rangeHierarchyName) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT \`Data Type\`, \`Depd Field\`, \`Range Hierarchy Name\`
                FROM \`Formula Range Hierarchy details\`
                WHERE \`Range Hierarchy Name\` = ?
            `;
            connection.query(query, [rangeHierarchyName], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
};

export default RangeHierarchyRepository;
