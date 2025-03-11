import connection from "../../../db/connection.js";

const CurrencyMasterRepository = {
    getAll: async () => {
        const query = "SELECT * FROM `Currency Master`";
        const [rows] = await connection.promise().query(query);
        return rows;
    },

    getById: async (currencyId) => {
        const query = "SELECT * FROM `Currency Master` WHERE `CURRENCY ID` = ?";
        const [rows] = await connection.promise().query(query, [currencyId]);
        return rows.length ? rows[0] : null;
    },

    create: async (data) => {
        const query = `
            INSERT INTO \`Currency Master\` 
            (\`CURRENCY ID\`, \`CURRENCY CODE\`, \`CURRENCY NAME\`, \`CURRENCY SYMBOL\`, \`ROW STATUS\`) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [data.currencyId, data.currencyCode, data.currencyName, data.currencySymbol, data.rowStatus];
        const [result] = await connection.promise().query(query, values);
        return result;
    },

    update: async (currencyId, data) => {
        const query = `
            UPDATE \`Currency Master\` 
            SET \`CURRENCY CODE\` = ?, \`CURRENCY NAME\` = ?, \`CURRENCY SYMBOL\` = ?, \`ROW STATUS\` = ? 
            WHERE \`CURRENCY ID\` = ?
        `;
        const values = [data.currencyCode, data.currencyName, data.currencySymbol, data.rowStatus, currencyId];
        const [result] = await connection.promise().query(query, values);
        return result;
    },

    delete: async (currencyId) => {
        const query = "DELETE FROM `Currency Master` WHERE `CURRENCY ID` = ?";
        const [result] = await connection.promise().query(query, [currencyId]);
        return result;
    }
};

export default CurrencyMasterRepository;
