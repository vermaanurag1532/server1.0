// controllers/posLedgerController.js
import posLedgerService from '../../Service/PointOfSale/ledger.service.js';

class PosLedgerController {
    
    // GET /api/pos-ledgers
    async getAllPosLedgers(req, res) {
        try {
            const result = await posLedgerService.getAllPosLedgers();
            
            res.status(200).json({
                data: result.data
            });
        } catch (error) {
            console.error('Error in getAllPosLedgers:', error);
            res.status(500).json({
                success: false,
                error: error.error || 'Internal server error',
                message: error.message || 'Failed to retrieve POS ledgers'
            });
        }
    }

    // GET /api/pos-ledgers/:posId
    async getPosLedgerByPOSId(req, res) {
        try {
            const { posId } = req.params;
            
            if (!posId) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing POSId parameter',
                    message: 'POSId is required'
                });
            }

            const result = await posLedgerService.getPosLedgerByPOSId(posId);
            
            if (!result.success) {
                return res.status(404).json({
                    data: result.data
                });
            }

            res.status(200).json({
                data: result.data
            });
        } catch (error) {
            console.error('Error in getPosLedgerByPOSId:', error);
            res.status(500).json({
                success: false,
                error: error.error || 'Internal server error',
                message: error.message || 'Failed to retrieve POS ledger'
            });
        }
    }

    async getPosLedgerByName(req, res) {
        try {
            const { name } = req.params;
            
            if (!name) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing name parameter',
                    message: 'Name is required'
                });
            }

            const result = await posLedgerService.getPosLedgerByName(name);
            
            if (!result.success) {
                return res.status(404).json({
                    data: result.data
                });
            }

            res.status(200).json({
                data: result.data
            });
        } catch (error) {
            console.error('Error in getPosLedgerByPOSId:', error);
            res.status(500).json({
                success: false,
                error: error.error || 'Internal server error',
                message: error.message || 'Failed to retrieve POS ledger'
            });
        }
    }

    // POST /api/pos-ledgers
    async createPosLedger(req, res) {
        try {
            // Validate request body
            if (!req.body) {
                return res.status(400).json({
                    success: false,
                    error: 'Request body is required',
                    message: 'Please provide POS ledger data'
                });
            }

            const result = await posLedgerService.createPosLedger(req.body);
            
            res.status(201).json({
                success: result.success,
                data: result.data,
                message: result.message
            });
        } catch (error) {
            console.error('Error in createPosLedger:', error);
            
            // Handle validation errors
            if (error.message && (
                error.message.includes('Missing required field') ||
                error.message.includes('Invalid request format') ||
                error.message.includes('Data array cannot be empty') ||
                error.message.includes('must be a valid number') ||
                error.message.includes('Invalid date format')
            )) {
                return res.status(400).json({
                    success: false,
                    error: error.error || 'Validation error',
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                error: error.error || 'Internal server error',
                message: error.message || 'Failed to create POS ledger'
            });
        }
    }

    // PUT /api/pos-ledgers/:posId
    async updatePosLedger(req, res) {
        try {
            const { posId } = req.params;
            
            if (!posId) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing POSId parameter',
                    message: 'POSId is required'
                });
            }

            if (!req.body) {
                return res.status(400).json({
                    success: false,
                    error: 'Request body is required',
                    message: 'Please provide POS ledger data to update'
                });
            }

            const result = await posLedgerService.updatePosLedger(posId, req.body);
            
            res.status(200).json({
                success: result.success,
                data: result.data,
                message: result.message
            });
        } catch (error) {
            console.error('Error in updatePosLedger:', error);
            
            // Handle not found errors
            if (error.message && error.message.includes('No POS ledger found')) {
                return res.status(404).json({
                    success: false,
                    error: error.error || 'POS ledger not found',
                    message: error.message
                });
            }

            // Handle validation errors
            if (error.message && (
                error.message.includes('Missing required field') ||
                error.message.includes('Invalid request format') ||
                error.message.includes('Data array cannot be empty') ||
                error.message.includes('must be a valid number') ||
                error.message.includes('Invalid date format')
            )) {
                return res.status(400).json({
                    success: false,
                    error: error.error || 'Validation error',
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                error: error.error || 'Internal server error',
                message: error.message || 'Failed to update POS ledger'
            });
        }
    }

    // DELETE /api/pos-ledgers/:posId (Soft Delete)
    async deletePosLedger(req, res) {
        try {
            const { posId } = req.params;
            
            if (!posId) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing POSId parameter',
                    message: 'POSId is required'
                });
            }

            const result = await posLedgerService.deletePosLedger(posId);
            
            res.status(200).json({
                success: result.success,
                data: result.data,
                message: result.message
            });
        } catch (error) {
            console.error('Error in deletePosLedger:', error);
            
            // Handle not found errors
            if (error.message && error.message.includes('No POS ledger found')) {
                return res.status(404).json({
                    success: false,
                    error: error.error || 'POS ledger not found',
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                error: error.error || 'Internal server error',
                message: error.message || 'Failed to delete POS ledger'
            });
        }
    }

    // DELETE /api/pos-ledgers/:posId/permanent (Hard Delete)
    async hardDeletePosLedger(req, res) {
        try {
            const { posId } = req.params;
            
            if (!posId) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing POSId parameter',
                    message: 'POSId is required'
                });
            }

            const result = await posLedgerService.hardDeletePosLedger(posId);
            
            res.status(200).json({
                success: result.success,
                data: result.data,
                message: result.message
            });
        } catch (error) {
            console.error('Error in hardDeletePosLedger:', error);
            
            // Handle not found errors
            if (error.message && error.message.includes('No POS ledger found')) {
                return res.status(404).json({
                    success: false,
                    error: error.error || 'POS ledger not found',
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                error: error.error || 'Internal server error',
                message: error.message || 'Failed to permanently delete POS ledger'
            });
        }
    }

    // GET /api/pos-ledgers/health (Health check endpoint)
    async healthCheck(req, res) {
        try {
            res.status(200).json({
                success: true,
                message: 'POS Ledger API is running',
                timestamp: new Date().toISOString(),
                version: '1.0.0'
            });
        } catch (error) {
            console.error('Error in healthCheck:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                message: 'Health check failed'
            });
        }
    }
}

export default new PosLedgerController();