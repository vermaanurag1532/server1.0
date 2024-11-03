import connection from '../../../../db/connection.js';

const ItemStyleRepository = {
    // Insert a new style item
    insertStyleItem: (params) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO \`Item master and variant Style Style Item\`
                (\`Style Name\`, \`Exclusive Indicator\`, \`Hold Indicator\`, \`Rework Indicator\`, 
                 \`Reject Indicator\`, \`Proto Required Indicator\`, \`Auto Varient Code Gen Indicator\`, 
                 \`Remark\`, \`Row Status\`, \`Image Details\`)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            connection.query(query, params, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Fetch all style items
    getAllStyleItems: () => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT \`Style Name\`, \`Exclusive Indicator\`, \`Hold Indicator\`, 
                       \`Rework Indicator\`, \`Reject Indicator\`, \`Proto Required Indicator\`, 
                       \`Auto Varient Code Gen Indicator\`, \`Remark\`, \`Row Status\`, \`Image Details\`
                FROM \`Item master and variant Style Style Item\`
            `;
            connection.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Fetch a style item by Style Name
    getStyleItemByName: (styleName) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT \`Style Name\`, \`Exclusive Indicator\`, \`Hold Indicator\`, 
                       \`Rework Indicator\`, \`Reject Indicator\`, \`Proto Required Indicator\`, 
                       \`Auto Varient Code Gen Indicator\`, \`Remark\`, \`Row Status\`, \`Image Details\`
                FROM \`Item master and variant Style Style Item\`
                WHERE \`Style Name\` = ?
            `;
            connection.query(query, [styleName], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
};

export default ItemStyleRepository;
