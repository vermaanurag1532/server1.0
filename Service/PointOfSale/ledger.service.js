// services/posLedgerService.js
import posLedgerRepository from '../../Repository/PointOfSale/ledger.repository.js';

class PosLedgerService {
    
    // Get all POS ledger entries
    async getAllPosLedgers() {
        try {
            const results = await posLedgerRepository.getAll();
            
            return {
                success: true,
                data: results,
                count: results.length,
                message: 'POS ledgers retrieved successfully'
            };
        } catch (error) {
            throw {
                success: false,
                error: error.message,
                message: 'Failed to retrieve POS ledgers'
            };
        }
    }

    // Get POS ledger entries by POSId
    async getPosLedgerByPOSId(posId) {
        try {
            if (!posId) {
                throw new Error('POSId is required');
            }

            const results = await posLedgerRepository.getByPOSId(posId);
            
            if (results.length === 0) {
                return {
                    success: false,
                    data: [],
                    message: `No POS ledger found with POSId: ${posId}`
                };
            }

            return {
                success: true,
                data: results,
                count: results.length,
                message: 'POS ledger retrieved successfully'
            };
        } catch (error) {
            throw {
                success: false,
                error: error.message,
                message: 'Failed to retrieve POS ledger'
            };
        }
    }

    async getPosLedgerByName(name) {
        try {
            if (!name) {
                throw new Error('Name is required');
            }

            const results = await posLedgerRepository.getByName(name);
            
            if (results.length === 0) {
                return {
                    success: false,
                    data: [],
                    message: `No POS ledger found with Name: ${name}`
                };
            }

            return {
                success: true,
                data: results,
                count: results.length,
                message: 'POS ledger retrieved successfully'
            };
        } catch (error) {
            throw {
                success: false,
                error: error.message,
                message: 'Failed to retrieve POS ledger'
            };
        }
    }

    // Create new POS ledger transaction
    async createPosLedger(requestData) {
        try {
            // Validate request structure
            if (!requestData || !requestData.Data || !Array.isArray(requestData.Data)) {
                throw new Error('Invalid request format. Expected { Data: [...] }');
            }

            const data = requestData.Data;
            
            if (data.length === 0) {
                throw new Error('Data array cannot be empty');
            }

            // Validate required fields for each entry
            this.validatePosLedgerData(data);

            const result = await posLedgerRepository.create(data);
            
            return {
                success: true,
                data: {
                    posId: result.posId,
                    insertedCount: result.insertedCount,
                    entries: data.length
                },
                message: `POS ledger created successfully with POSId: ${result.posId}`
            };
        } catch (error) {
            throw {
                success: false,
                error: error.message,
                message: 'Failed to create POS ledger'
            };
        }
    }

    // Update POS ledger by POSId
    async updatePosLedger(posId, requestData) {
        try {
            if (!posId) {
                throw new Error('POSId is required');
            }

            // Check if POSId exists
            const existingData = await posLedgerRepository.getByPOSId(posId);
            if (existingData.length === 0) {
                throw new Error(`No POS ledger found with POSId: ${posId}`);
            }

            // Validate request structure
            if (!requestData || !requestData.Data || !Array.isArray(requestData.Data)) {
                throw new Error('Invalid request format. Expected { Data: [...] }');
            }

            const data = requestData.Data;
            
            if (data.length === 0) {
                throw new Error('Data array cannot be empty');
            }

            // Validate required fields for each entry
            this.validatePosLedgerData(data);

            const result = await posLedgerRepository.updateByPOSId(posId, data);
            
            return {
                success: true,
                data: {
                    posId: result.posId,
                    updatedCount: result.updatedCount,
                    entries: data.length
                },
                message: `POS ledger updated successfully for POSId: ${posId}`
            };
        } catch (error) {
            throw {
                success: false,
                error: error.message,
                message: 'Failed to update POS ledger'
            };
        }
    }

    // Delete POS ledger by POSId (soft delete)
    async deletePosLedger(posId) {
        try {
            if (!posId) {
                throw new Error('POSId is required');
            }

            // Check if POSId exists
            const existingData = await posLedgerRepository.getByPOSId(posId);
            if (existingData.length === 0) {
                throw new Error(`No POS ledger found with POSId: ${posId}`);
            }

            const result = await posLedgerRepository.deleteByPOSId(posId);
            
            return {
                success: true,
                data: {
                    posId: result.posId,
                    deletedCount: result.deletedCount
                },
                message: `POS ledger deleted successfully for POSId: ${posId}`
            };
        } catch (error) {
            throw {
                success: false,
                error: error.message,
                message: 'Failed to delete POS ledger'
            };
        }
    }

    // Hard delete POS ledger by POSId
    async hardDeletePosLedger(posId) {
        try {
            if (!posId) {
                throw new Error('POSId is required');
            }

            // Check if POSId exists (including soft deleted)
            const existingData = await posLedgerRepository.checkPOSIdExists(posId);

            if (existingData.length === 0) {
                throw new Error(`No POS ledger found with POSId: ${posId}`);
            }

            const result = await posLedgerRepository.hardDeleteByPOSId(posId);
            
            return {
                success: true,
                data: {
                    posId: result.posId,
                    deletedCount: result.deletedCount
                },
                message: `POS ledger permanently deleted for POSId: ${posId}`
            };
        } catch (error) {
            throw {
                success: false,
                error: error.message,
                message: 'Failed to permanently delete POS ledger'
            };
        }
    }

    // Helper method to validate POS ledger data
    validatePosLedgerData(data) {
        const requiredFields = [
            'faRecPayHdrId', 'locationId', 'location', 'yearId', 
            'payMode', 'transAmount', 'localAmount', 'particulars', 
            'voucherNo', 'transDate'
        ];

        for (let i = 0; i < data.length; i++) {
            const entry = data[i];
            
            for (const field of requiredFields) {
                if (entry[field] === undefined || entry[field] === null || entry[field] === '') {
                    throw new Error(`Missing required field '${field}' in entry ${i + 1}`);
                }
            }

            // Validate numeric fields
            const numericFields = ['faRecPayHdrId', 'locationId', 'yearId', 'transAmount', 'localAmount'];
            for (const field of numericFields) {
                if (isNaN(entry[field])) {
                    throw new Error(`Field '${field}' must be a valid number in entry ${i + 1}`);
                }
            }

            // Validate date format
            if (entry.transDate && !this.isValidDate(entry.transDate)) {
                throw new Error(`Invalid date format for transDate in entry ${i + 1}. Expected DD/MM/YYYY or YYYY-MM-DD`);
            }
        }
    }

    // Helper method to validate date
    isValidDate(dateString) {
        if (!dateString) return false;
        
        // Check DD/MM/YYYY format
        if (dateString.includes('/')) {
            const [day, month, year] = dateString.split('/');
            const date = new Date(year, month - 1, day);
            return date.getFullYear() == year && date.getMonth() == month - 1 && date.getDate() == day;
        }
        
        // Check YYYY-MM-DD format
        if (dateString.includes('-')) {
            const date = new Date(dateString);
            return !isNaN(date.getTime());
        }
        
        return false;
    }

    // Helper method to group results by POSId
    groupByPOSId(results) {
        const grouped = {};
        
        results.forEach(entry => {
            if (!grouped[entry.posId]) {
                grouped[entry.posId] = {
                    posId: entry.posId,
                    entries: [],
                    totalEntries: 0
                };
            }
            grouped[entry.posId].entries.push(entry);
            grouped[entry.posId].totalEntries++;
        });
        
        return grouped;
    }
}

export default new PosLedgerService();