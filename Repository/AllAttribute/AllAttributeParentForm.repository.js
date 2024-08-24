import connection from '../../db/connection.js'

const AllAttributeParentFormRepository = {
    getAll: () =>{
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM AllAttributeParentForm';
            connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    insert: (params) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO AllAttributeParentForm (
                    AttributeType,
                    AttributeCode,
                    AttributeDescription,
                    DefaultIndicator,
                    RowStatus
                ) VALUES (?, ?, ?, ?, ?)
            `;

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

export default AllAttributeParentFormRepository;