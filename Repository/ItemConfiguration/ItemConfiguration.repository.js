import connection from "../../db/connection.js";

class ItemConfigurationRepository {
    getAll() {
        const query = 'SELECT * FROM ItemConfiguration';
        return new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    create(data) {
        const query = `
            INSERT INTO ItemConfiguration (
                ItemType, ItemGroup, ItemNature, StockUOM, DependentCriteria,
                BOMIndicator, LotManagementIndicator, OtherLossIndicator,
                CustomStockReqdInd, WastagePercentage, InwardRateToleranceUp,
                InwardRateToleranceDown, OperationReqdInd, RowCreationInd,
                MetalToleranceDown, AlloyToleranceDown, MetalToleranceUp, AlloyToleranceUp
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            data.itemType,
            data.itemGroup,
            data.itemNature,
            data.stockUOM,
            data.dependentCriteria || null,
            data.bomIndicator,
            data.lotManagementIndicator,
            data.otherLossIndicator || null,
            data.customStockReqdInd,
            data.wastagePercentage || null,
            data.inwardRateToleranceUp || null,
            data.inwardRateToleranceDown || null,
            data.operationReqdInd,
            data.rowCreationInd,
            data.metalToleranceDown || null,
            data.alloyToleranceDown || null,
            data.metalToleranceUp || null,
            data.alloyToleranceUp || null
        ];

        return new Promise((resolve, reject) => {
            connection.query(query, params, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

export default ItemConfigurationRepository;
