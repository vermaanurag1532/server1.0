import connection from "../../../db/connection.js"; // Import database connection

const CustomerMasterRepository = {

    getAll: async () => {
        try {
            const query = "SELECT * FROM `Customer Master`";
            const [rows] = await connection.promise().query(query);
            return rows;
        } catch (error) {
            console.error("Error fetching customers:", error);
            throw error;
        }
    },

    getByPartyCode: async (partyCode) => {
        try {
            const query = "SELECT * FROM `Customer Master` WHERE `Party Code` = ?";
            const [rows] = await connection.promise().query(query, [partyCode]);
            return rows.length ? rows[0] : null;
        } catch (error) {
            console.error("Error fetching customer by Party Code:", error);
            throw error;
        }
    },


    create: async (data) => {
        try {
            // Fetch the latest Party Code using numeric sorting
            const [rows] = await connection.promise().query(
                "SELECT `Party Code` FROM `Customer Master` WHERE `Party Code` LIKE 'CUS-%' ORDER BY CAST(SUBSTRING(`Party Code`, 5) AS UNSIGNED) DESC LIMIT 1"
            );
    
            let lastPartyCode = rows.length ? rows[0]["Party Code"] : null;
            let nextNumber = 1; // Default to 1 if no records exist
    
            if (lastPartyCode) {
                const match = lastPartyCode.match(/\d+$/); // Extract numeric part
                if (match) {
                    nextNumber = parseInt(match[0], 10) + 1;
                }
            }
    
            // Generate new Party Code (e.g., CUS-001, CUS-002...)
            const newPartyCode = `CUS-${String(nextNumber).padStart(3, "0")}`;
    
            // Add generated Party Code to data
            data.partyCode = newPartyCode;
    
            const query = `
                INSERT INTO \`Customer Master\` 
                (\`Party Code\`, \`Creation Date\`, \`First Name\`, \`Last Name\`, \`Mobile No\`, \`Email ID\`, 
                \`Customer Group\`, \`Title\`, \`Birth Date\`, \`Parent Customer\`, \`Anniversary Date\`, 
                \`Scheme Customer\`, \`Aadhar No\`, \`Pan No\`, \`Pan No Url\`, \`Gst No\`, \`Default Currency\`, 
                \`Remarks\`, \`Status\`, \`Gift Applicable\`, \`Reverse Charges\`, \`Billing Add 1\`, 
                \`Sales Nature\`, \`Sub Category Sales\`, \`Billing Add 2\`, \`Billing Pincode\`, 
                \`Billing Country\`, \`Billing State\`, \`Other No\`, \`Billing City\`, \`Billing Pan No\`, 
                \`Billing Gst No\`, \`Copy Billing Address\`, \`Shipping Add 1\`, \`Shipping Add 2\`, 
                \`Shipping Pincode\`, \`Shipping Country\`, \`Shipping State\`, \`Shipping City\`, 
                \`Ship Mobile No\`, \`Card Type\`, \`Card No\`, \`Terms\`, \`Religion\`, \`Terms 2\`, 
                \`Mother Birthday\`, \`Father Birthday\`, \`Spouse Birthday\`, \`Party Anniversary\`, 
                \`NRI Customer\`) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
    
            const values = [
                data.partyCode, data.creationDate, data.firstName, data.lastName, data.mobileNo, data.emailId,
                data.customerGroup, data.title, data.birthDate, data.parentCustomer, data.anniversaryDate,
                data.schemeCustomer, data.aadharNo, data.panNo, data.panNoUrl, data.gstNo, data.defaultCurrency,
                data.remarks, data.status, data.giftApplicable, data.reverseCharges, data.billingAdd1,
                data.salesNature, data.subCategorySales, data.billingAdd2, data.billingPincode, data.billingCountry,
                data.billingState, data.otherNo, data.billingCity, data.billingPanNo, data.billingGstNo,
                data.copyBillingAddress, data.shippingAdd1, data.shippingAdd2, data.shippingPincode,
                data.shippingCountry, data.shippingState, data.shippingCity, data.shipMobileNo,
                data.cardType, data.cardNo, data.terms, data.religion, data.terms2,
                data.motherBirthday, data.fatherBirthday, data.spouseBirthday, data.partyAnniversary,
                data.nriCustomer
            ];
    
            const [result] = await connection.promise().query(query, values);
            return { success: true, partyCode: newPartyCode, result };
        } catch (error) {
            console.error("Error inserting customer:", error);
            throw error;
        }
    },
    


    update: async (partyCode, data) => {
        try {
            if (Object.keys(data).length === 0) {
                throw new Error("No fields provided for update");
            }

            const fields = Object.keys(data)
                .map(key => `\`${key}\` = ?`)
                .join(", ");
            const values = Object.values(data);
            values.push(partyCode);

            const query = `UPDATE \`Customer Master\` SET ${fields} WHERE \`Party Code\` = ?`;
            const [result] = await connection.promise().query(query, values);

            return result;
        } catch (error) {
            console.error("Error updating customer:", error);
            throw error;
        }
    },


    delete: async (partyCode) => {
        try {
            const query = "DELETE FROM `Customer Master` WHERE `Party Code` = ?";
            const [result] = await connection.promise().query(query, [partyCode]);
            return result;
        } catch (error) {
            console.error("Error deleting customer:", error);
            throw error;
        }
    }
};

export default CustomerMasterRepository;
