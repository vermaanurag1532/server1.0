import db from '../../db/connection.js';

const SubContractingIssueWorkRepository = {
    // Get all records
    getAll: async () => {
        const [rows] = await db.promise().query('SELECT * FROM `Sub Contracting Issue Work`');
        return rows;
    },

    // Get a record by Stock ID
    getById: async (stockId) => {
        const [rows] = await db.promise().query(
            'SELECT * FROM `Sub Contracting Issue Work` WHERE `Stock ID` = ?',
            [stockId]
        );
        return rows[0];
    },

    // Add a new record
    create: async (data) => {
        const query = `
            INSERT INTO \`Sub Contracting Issue Work\`
            (\`Stock ID\`, \`Vendor\`, \`Issue Date\`, \`Operation Name\`, \`Style\`, \`Varient Name\`, 
            \`Old Varient\`, \`Customer Varient\`, \`Base Varient\`, \`Vendor Code\`, \`Location\`, 
            \`Department\`, \`Remark 1\`, \`Vendor Varient\`, \`Remark 2\`, \`Created By\`, 
            \`Std Buying Rate\`, \`Stone Max Wt\`, \`Remark\`, \`Stone Min Wt\`, \`Karat Color\`, 
            \`Delivery Days\`, \`For Web\`, \`Row Status\`, \`Verified Status\`, \`Length\`, 
            \`Codegen Sr No\`, \`CATEGORY\`, \`Sub-Category\`, \`STYLE KARAT\`, \`Varient\`, 
            \`HSN - SAC CODE\`, \`LINE OF BUSINESS\`, \`BOM\`, \`Operation\`, \`Image Details\`, 
            \`Formula Details\`, \`Pieces\`, \`Weight\`, \`Net Weight\`, \`Dia Weight\`, 
            \`Dia Pieces\`, \`Location Code\`, \`Item Group\`, \`Metal Color\`, \`Style Metal Color\`, 
            \`Inward Doc\`, \`Last Trans\`, \`isRawMaterial\`, \`Variant Type\`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.stockId, data.vendor, data.issueDate, data.operationName, data.style, data.varientName,
            data.oldVarient, data.customerVarient, data.baseVarient, data.vendorCode, data.location,
            data.department, data.remark1, data.vendorVarient, data.remark2, data.createdBy,
            data.stdBuyingRate, data.stoneMaxWt, data.remark, data.stoneMinWt, data.karatColor,
            data.deliveryDays, data.forWeb, data.rowStatus, data.verifiedStatus, data.length,
            data.codegenSrNo, data.category, data.subCategory, data.styleKarat, data.varient,
            data.hsnSacCode, data.lineOfBusiness, JSON.stringify(data.bom), JSON.stringify(data.operation),
            JSON.stringify(data.imageDetails), JSON.stringify(data.formulaDetails), data.pieces,
            data.weight, data.netWeight, data.diaWeight, data.diaPieces, data.locationCode,
            data.itemGroup, data.metalColor, data.styleMetalColor, data.inwardDoc, data.lastTrans,
            data.isRawMaterial, data.variantType
        ];
        const [result] = await db.promise().query(query, values);
        return result.insertId;
    },

    // Update a record by Stock ID
    update: async (stockId, data) => {
        const query = `
            UPDATE \`Sub Contracting Issue Work\` SET
            \`Vendor\` = ?, \`Issue Date\` = ?, \`Operation Name\` = ?, \`Style\` = ?, 
            \`Varient Name\` = ?, \`Old Varient\` = ?, \`Customer Varient\` = ?, 
            \`Base Varient\` = ?, \`Vendor Code\` = ?, \`Location\` = ?, \`Department\` = ?, 
            \`Remark 1\` = ?, \`Vendor Varient\` = ?, \`Remark 2\` = ?, \`Created By\` = ?, 
            \`Std Buying Rate\` = ?, \`Stone Max Wt\` = ?, \`Remark\` = ?, \`Stone Min Wt\` = ?, 
            \`Karat Color\` = ?, \`Delivery Days\` = ?, \`For Web\` = ?, \`Row Status\` = ?, 
            \`Verified Status\` = ?, \`Length\` = ?, \`Codegen Sr No\` = ?, \`CATEGORY\` = ?, 
            \`Sub-Category\` = ?, \`STYLE KARAT\` = ?, \`Varient\` = ?, \`HSN - SAC CODE\` = ?, 
            \`LINE OF BUSINESS\` = ?, \`BOM\` = ?, \`Operation\` = ?, \`Image Details\` = ?, 
            \`Formula Details\` = ?, \`Pieces\` = ?, \`Weight\` = ?, \`Net Weight\` = ?, 
            \`Dia Weight\` = ?, \`Dia Pieces\` = ?, \`Location Code\` = ?, \`Item Group\` = ?, 
            \`Metal Color\` = ?, \`Style Metal Color\` = ?, \`Inward Doc\` = ?, \`Last Trans\` = ?, 
            \`isRawMaterial\` = ?
            WHERE \`Stock ID\` = ?
        `;
        const values = [
            data.vendor, data.issueDate, data.operationName, data.style, data.varientName,
            data.oldVarient, data.customerVarient, data.baseVarient, data.vendorCode, data.location,
            data.department, data.remark1, data.vendorVarient, data.remark2, data.createdBy,
            data.stdBuyingRate, data.stoneMaxWt, data.remark, data.stoneMinWt, data.karatColor,
            data.deliveryDays, data.forWeb, data.rowStatus, data.verifiedStatus, data.length,
            data.codegenSrNo, data.category, data.subCategory, data.styleKarat, data.varient,
            data.hsnSacCode, data.lineOfBusiness, JSON.stringify(data.bom), JSON.stringify(data.operation),
            JSON.stringify(data.imageDetails), JSON.stringify(data.formulaDetails), data.pieces,
            data.weight, data.netWeight, data.diaWeight, data.diaPieces, data.locationCode,
            data.itemGroup, data.metalColor, data.styleMetalColor, data.inwardDoc, data.lastTrans,
            data.isRawMaterial, stockId
        ];
        const [result] = await db.promise().query(query, values);
        return result.affectedRows;
    },

    // Delete a record by Stock ID
    delete: async (stockId) => {
        const [result] = await db.promise().query(
            'DELETE FROM `Sub Contracting Issue Work` WHERE `Stock ID` = ?',
            [stockId]
        );
        return result.affectedRows;
    }
};

export default SubContractingIssueWorkRepository;