// TransferDepartment.service.js
import TransferDepartmentRepository from '../../Repository/Transfer/Department.repository.js';

class TransferDepartmentService {
    addTransferRecord = (data, callback) => {
        if (!data.stockId || !data.sourceDepartment || !data.destinationDepartment) {
            callback('All fields (stockId, sourceDepartment, destinationDepartment) are required.');
            return;
        }
        TransferDepartmentRepository.addTransferRecord(data, callback);
    };

    getAllTransferRecords = (callback) => {
        TransferDepartmentRepository.getAllTransferRecords(callback);
    };

    getTransferRecordByStockId = (stockId, callback) => {
        if (!stockId) {
            callback('Stock ID is required.');
            return;
        }
        TransferDepartmentRepository.getTransferRecordByStockId(stockId, callback);
    };

    updateTransferRecordByStockId = (stockId, data, callback) => {
        if (!stockId) {
            callback('Stock ID is required.');
            return;
        }
        TransferDepartmentRepository.updateTransferRecordByStockId(stockId, data, callback);
    };

    deleteTransferRecordByStockId = (stockId, callback) => {
        if (!stockId) {
            callback('Stock ID is required.');
            return;
        }
        TransferDepartmentRepository.deleteTransferRecordByStockId(stockId, callback);
    };
}

export default new TransferDepartmentService();
