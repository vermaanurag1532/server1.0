// repositories/posLedgerRepository.js
import connection from '../../db/connection.js';

class PosLedgerRepository {
    
    // Get all POS ledger entries
    async getAll() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM \`POS ledger\` 
                WHERE rowStatus = 1 
                ORDER BY transDate DESC, posId DESC
            `;
            
            connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Get POS ledger entries by POSId
    async getByPOSId(posId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM \`POS ledger\` 
                WHERE posId = ? AND rowStatus = 1 
                ORDER BY id
            `;
            
            connection.query(query, [posId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    async getByName(name) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM \`POS ledger\` 
                WHERE partyName = ? AND rowStatus = 1 
                ORDER BY id
            `;
            
            connection.query(query, [name], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Generate next POSId
    async generatePOSId() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT posId FROM \`POS ledger\` 
                WHERE posId REGEXP '^POS-[0-9]+$' 
                ORDER BY CAST(SUBSTRING(posId, 5) AS UNSIGNED) DESC 
                LIMIT 1
            `;
            
            connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    let nextNumber = 1;
                    if (results.length > 0) {
                        const lastPosId = results[0].posId;
                        const lastNumber = parseInt(lastPosId.split('-')[1]);
                        nextNumber = lastNumber + 1;
                    }
                    resolve(`POS-${nextNumber}`);
                }
            });
        });
    }

    // Create multiple POS ledger entries with same POSId
    async create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const posId = await this.generatePOSId();
                
                // Start transaction
                connection.beginTransaction((err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const insertQuery = `
                        INSERT INTO \`POS ledger\` (
                            posId, id, faRecPayHdrId, locationId, location, yearId, 
                            payMode, transAmount, localAmount, particulars, drAmount, 
                            crAmount, runningBal, payerAccountNo, voucherNo, transDate, 
                            issuingParty, partyId, partyName, remarks, rowStatus, 
                            rldTransAmount, refTransId, currencyId, currencyCode, ifscCode, 
                            cardNumber, expiryMonth, expiryYear, panNo
                        ) VALUES ?
                    `;

                    // Prepare values array
                    const values = data.map(item => [
                        posId,
                        item.id || null,
                        item.faRecPayHdrId,
                        item.locationId,
                        item.location,
                        item.yearId,
                        item.payMode,
                        item.transAmount,
                        item.localAmount,
                        item.particulars,
                        item.drAmount || null,
                        item.crAmount || null,
                        item.runningBal || null,
                        item.payerAccountNo || null,
                        item.voucherNo,
                        this.formatDate(item.transDate),
                        item.issuingParty || null,
                        item.partyId || null,
                        item.partyName || null,
                        item.remarks || null,
                        item.rowStatus || 1,
                        item.rldTransAmount || item.oldTransAmount || null,
                        item.refTransId || 0,
                        item.currencyId || 0,
                        item.currencyCode || 'INDIAN RUPEES',
                        item.ifscCode || null,
                        item.cardNumber || null,
                        item.expiryMonth || null,
                        item.expiryYear || null,
                        item.panNo || null
                    ]);

                    connection.query(insertQuery, [values], (err, results) => {
                        if (err) {
                            connection.rollback(() => {
                                reject(err);
                            });
                        } else {
                            connection.commit((err) => {
                                if (err) {
                                    connection.rollback(() => {
                                        reject(err);
                                    });
                                } else {
                                    resolve({
                                        posId: posId,
                                        insertedCount: results.affectedRows,
                                        insertId: results.insertId
                                    });
                                }
                            });
                        }
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    // Update POS ledger entries by POSId
    async updateByPOSId(posId, data) {
        return new Promise((resolve, reject) => {
            connection.beginTransaction((err) => {
                if (err) {
                    reject(err);
                    return;
                }

                // First delete existing entries for this POSId
                const deleteQuery = `DELETE FROM \`POS ledger\` WHERE posId = ?`;
                
                connection.query(deleteQuery, [posId], (err) => {
                    if (err) {
                        connection.rollback(() => {
                            reject(err);
                        });
                        return;
                    }

                    // Then insert new data
                    const insertQuery = `
                        INSERT INTO \`POS ledger\` (
                            posId, id, faRecPayHdrId, locationId, location, yearId, 
                            payMode, transAmount, localAmount, particulars, drAmount, 
                            crAmount, runningBal, payerAccountNo, voucherNo, transDate, 
                            issuingParty, partyId, partyName, remarks, rowStatus, 
                            rldTransAmount, refTransId, currencyId, currencyCode, ifscCode, 
                            cardNumber, expiryMonth, expiryYear, panNo
                        ) VALUES ?
                    `;

                    const values = data.map(item => [
                        posId,
                        item.id || null,
                        item.faRecPayHdrId,
                        item.locationId,
                        item.location,
                        item.yearId,
                        item.payMode,
                        item.transAmount,
                        item.localAmount,
                        item.particulars,
                        item.drAmount || null,
                        item.crAmount || null,
                        item.runningBal || null,
                        item.payerAccountNo || null,
                        item.voucherNo,
                        this.formatDate(item.transDate),
                        item.issuingParty || null,
                        item.partyId || null,
                        item.partyName || null,
                        item.remarks || null,
                        item.rowStatus || 1,
                        item.rldTransAmount || item.oldTransAmount || null,
                        item.refTransId || 0,
                        item.currencyId || 0,
                        item.currencyCode || 'INDIAN RUPEES',
                        item.ifscCode || null,
                        item.cardNumber || null,
                        item.expiryMonth || null,
                        item.expiryYear || null,
                        item.panNo || null
                    ]);

                    connection.query(insertQuery, [values], (err, results) => {
                        if (err) {
                            connection.rollback(() => {
                                reject(err);
                            });
                        } else {
                            connection.commit((err) => {
                                if (err) {
                                    connection.rollback(() => {
                                        reject(err);
                                    });
                                } else {
                                    resolve({
                                        posId: posId,
                                        updatedCount: results.affectedRows
                                    });
                                }
                            });
                        }
                    });
                });
            });
        });
    }

    // Delete POS ledger entries by POSId (soft delete)
    async deleteByPOSId(posId) {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE \`POS ledger\` 
                SET rowStatus = 0 
                WHERE posId = ? AND rowStatus = 1
            `;
            
            connection.query(query, [posId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        posId: posId,
                        deletedCount: results.affectedRows
                    });
                }
            });
        });
    }

    // Hard delete POS ledger entries by POSId
    async hardDeleteByPOSId(posId) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM \`POS ledger\` WHERE posId = ?`;
            
            connection.query(query, [posId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        posId: posId,
                        deletedCount: results.affectedRows
                    });
                }
            });
        });
    }

    // Check if POSId exists (for service layer)
    async checkPOSIdExists(posId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM \`POS ledger\` WHERE posId = ?`;
            
            connection.query(query, [posId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Helper method to format date
    formatDate(dateString) {
        if (!dateString) return null;
        
        // Handle DD/MM/YYYY format
        if (dateString.includes('/')) {
            const [day, month, year] = dateString.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        
        // Return as is if already in YYYY-MM-DD format
        return dateString;
    }
}

export default new PosLedgerRepository();