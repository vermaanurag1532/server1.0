import db from '../../../../db/connection.js';

const VendorRepository = {
    // Get all vendors
    getAllVendors: async () => {
        const [rows] = await db.promise().query('SELECT * FROM `Vendor Master`');
        return rows;
    },

    // Get a vendor by name
    getVendorByName: async (vendorName) => {
        const [rows] = await db.promise().query('SELECT * FROM `Vendor Master` WHERE `Vendor Name` = ?', [vendorName]);
        return rows[0];
    },

    // Add a new vendor
    addVendor: async (vendorData) => {
        const query = `
            INSERT INTO \`Vendor Master\`
            (\`Gst Registraton Type\`, \`Initials\`, \`Vendor Code\`, \`Vendor Name\`, \`Default Currency\`, 
             \`Agent Name\`, \`Default Terms\`, \`Row Status\`, \`Logo File Name\`, \`Local Sales TAX No\`, 
             \`Sales TAX No\`, \`PAN No\`, \`Aadhar No\`, \`MSME Certificate No\`, \`Vendor Type\`, \`TAN No\`, 
             \`VAN No\`, \`GST No\`, \`MSME Registered\`, \`Allow Wastage\`, \`Allow Labour\`, 
             \`Corresponding Location\`, \`Nominated Agency\`, \`Exchange %\`, \`Returns Term\`, 
             \`Udyog Adhar No\`, \`Exchange Terms\`, \`TDS194Q\` , \`billingAddress\`)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        `;
        const values = [
            vendorData.GstRegistrationType, vendorData.Initials, vendorData.VendorCode, vendorData.VendorName,
            vendorData.DefaultCurrency, vendorData.AgentName, vendorData.DefaultTerms, vendorData.RowStatus,
            vendorData.LogoFileName, vendorData.LocalSalesTAXNo, vendorData.SalesTAXNo, vendorData.PANNo,
            vendorData.AadharNo, vendorData.MSMECertificateNo, vendorData.VendorType, vendorData.TANNo,
            vendorData.VANNo, vendorData.GSTNo, vendorData.MSMERegistered, vendorData.AllowWastage,
            vendorData.AllowLabour, vendorData.CorrespondingLocation, vendorData.NominatedAgency,
            vendorData.ExchangePercent, vendorData.ReturnsTerm, vendorData.UdyogAdharNo, vendorData.ExchangeTerms,
            vendorData.TDS194Q ,vendorData.billingAddress
        ];
        const [result] = await db.promise().query(query, values);
        return result.insertId;
    }
};

export default VendorRepository;
