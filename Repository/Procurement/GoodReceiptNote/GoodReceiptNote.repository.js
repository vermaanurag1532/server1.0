import connection from "../../../db/connection.js";

const ProcurementGoodReceiptRepository = {
    generateStockId: () => {
        const query = `
      SELECT COUNT(*) AS count 
      FROM \`Procurement Good Receipt Note\`
    `;
        return new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const count = results[0].count || 0;
                    const stockId = `STC-${count + 1}`;
                    resolve(stockId);
                }
            });
        });
    },

    insert: async (data) => {
        const stockId = await ProcurementGoodReceiptRepository.generateStockId();

        const query = `
      INSERT INTO \`Procurement Good Receipt Note\` (
        \`Stock ID\`, \`Style\`, \`Varient Name\`, \`Old Varient\`, 
        \`Customer Varient\`, \`Base Varient\`, \`Vendor\`, 
        \`Remark 1\`, \`Vendor Varient\`, \`Remark 2\`, \`Created By\`, 
        \`Std Buying Rate\`, \`Stone Max Wt\`, \`Remark\`, \`Stone Min Wt\`, 
        \`Karat Color\`, \`Delivery Days\`, \`For Web\`, \`Row Status\`, 
        \`Verified Status\`, \`Length\`, \`Codegen Sr No\`, \`CATEGORY\`, 
        \`Sub-Category\`, \`STYLE KARAT\`, \`Varient\`, \`HSN - SAC CODE\`, 
        \`LINE OF BUSINESS\`, \`BOM\`, \`Operation\`, \`Image Details\`, 
        \`Formula Details\`
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
        const values = [
            stockId, data.style, data.varientName, data.oldVarient,
            data.customerVarient, data.baseVarient, data.vendor,
            data.remark1, data.vendorVarient, data.remark2, data.createdBy,
            data.stdBuyingRate, data.stoneMaxWt, data.remark, data.stoneMinWt,
            data.karatColor, data.deliveryDays, data.forWeb, data.rowStatus,
            data.verifiedStatus, data.length, data.codegenSrNo, data.category,
            data.subCategory, data.styleKarat, data.varient, data.hsnSacCode,
            data.lineOfBusiness, JSON.stringify(data.bom), JSON.stringify(data.operation),
            JSON.stringify(data.imageDetails), JSON.stringify(data.formulaDetails)
        ];
        return new Promise((resolve, reject) => {
            connection.query(query, values, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    findAll: () => {
        const query = "SELECT * FROM `Procurement Good Receipt Note`";
        return new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    findById: (id) => {
        const query = "SELECT * FROM `Procurement Good Receipt Note` WHERE `Stock ID` = ?";
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }
};

export default ProcurementGoodReceiptRepository;
