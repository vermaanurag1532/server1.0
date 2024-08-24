import connection from "../../db/connection.js";

const ItemConfigurationRepository = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ItemConfiguration';
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
                INSERT INTO ItemConfiguration (
                    ItemType, ItemGroup, ItemNature, StockUOM, DependentCriteria,
                    BOMIndicator, LotManagementIndicator, OtherLossIndicator,
                    CustomStockReqdInd, WastagePercentage, InwardRateToleranceUp,
                    InwardRateToleranceDown, OperationReqdInd, RowCreationInd,
                    MetalToleranceDown, AlloyToleranceDown, MetalToleranceUp, AlloyToleranceUp
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            connection.query(query, params, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    update: (id, params) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE ItemConfiguration SET
                    ItemType = ?,
                    ItemGroup = ?,
                    ItemNature = ?,
                    StockUOM = ?,
                    DependentCriteria = ?,
                    BOMIndicator = ?,
                    LotManagementIndicator = ?,
                    OtherLossIndicator = ?,
                    CustomStockReqdInd = ?,
                    WastagePercentage = ?,
                    InwardRateToleranceUp = ?,
                    InwardRateToleranceDown = ?,
                    OperationReqdInd = ?,
                    RowCreationInd = ?,
                    MetalToleranceDown = ?,
                    AlloyToleranceDown = ?,
                    MetalToleranceUp = ?,
                    AlloyToleranceUp = ?
                WHERE ItemType = ?
            `;
            connection.query(query, [...params, id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM ItemConfiguration WHERE ItemType = ?';
            connection.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
};

export default ItemConfigurationRepository;
