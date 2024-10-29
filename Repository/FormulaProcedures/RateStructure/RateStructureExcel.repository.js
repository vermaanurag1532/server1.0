import connection from '../../../db/connection.js';

const RateStructureExcelRepository = {
    // Fetch all details
    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM \`Rate Structure Excel\``;
            connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    // Fetch details by Range Hierarchy Name
    getByRangeHierarchyName: (rangeHierarchyName) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM \`Rate Structure Excel\`
                WHERE \`Range Hierarchy Name\` = ?
            `;
            connection.query(query, [rangeHierarchyName], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    // Insert a new Range Hierarchy Detail entry
    insert: (rangeHierarchyName, detailsJson) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO \`Rate Structure Excel\` (
                    \`Range Hierarchy Name\`,
                    \`Details\`
                ) VALUES (?, ?)
            `;
            const params = [
                rangeHierarchyName,
                JSON.stringify(detailsJson) // Convert detailsJson to JSON string
            ];
            connection.query(query, params, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
};

export default RateStructureExcelRepository;
