import connection from '../../db/connection.js'

const AllAttributeParentFormAttributeTypeRepository = {
    getAll: () =>{
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM AllAttributeParentFormAttributeType';
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
        console.log('Insert params:', params); // Add this line
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO AllAttributeParentFormAttributeType (
                    ConfigValue,
                    ConfigCode,
                    ConfigId
                ) VALUES (?, ?, ?)
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

export default AllAttributeParentFormAttributeTypeRepository;