import connection from '../../../db/connection.js';

const FormulaProcedureMasterDetailsRepository = {
    // Insert new formula procedure master detail
    insertFormulaProcedureMasterDetail: (params) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO \`Formula Procedure Master Details\`
                (\`Procedure Type\`, \`Formula Procedure Name\`, \`Calculate On\`, \`Minimum Value Based On\`, 
                 \`Min RANGE Type\`, \`Maximum Value Based On\`, \`Max RANGE Type\`, 
                 \`Excel Detail\`)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            connection.query(query, params, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Fetch all data from Formula Procedure Master Details
    getAllFormulaProcedureMasterDetails: () => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT \`Procedure Type\`, \`Formula Procedure Name\`, \`Calculate On\`, 
                       \`Minimum Value Based On\`, \`Min RANGE Type\`, \`Maximum Value Based On\`,
                        \`Max RANGE Type\`, \`Excel Detail\`
                FROM \`Formula Procedure Master Details\`
            `;
            connection.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    findByName: (formulaProcedureName) => {
        const query = `
          SELECT * 
          FROM \`Formula Procedure Master Details\` 
          WHERE \`Formula Procedure Name\` = ?
        `;
        return new Promise((resolve, reject) => {
            connection.query(query, [formulaProcedureName], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0] || null); // Return a single result or null
                }
            });
        });
    },

    findAllForTableRoute: () => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT \`Procedure Type\`, \`Formula Procedure Name\`
                FROM \`Formula Procedure Master Details\`
            `;
            connection.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
};

export default FormulaProcedureMasterDetailsRepository;
