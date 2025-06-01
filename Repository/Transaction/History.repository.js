import connection from '../../db/connection.js';
import ProcurementGoodReceiptRepository from '../Procurement/GoodReceiptNote/GoodReceiptNote.repository.js'
import BarcodeDetailRepository from '../Barcode/Detail.reposiory.js';
import BarcodeHistoryRepository from '../Barcode/History.repository.js';

const TransactionHistoryRepository = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `Transaction History`', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },
    
    getById: (transId) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `Transaction History` WHERE transId = ?', [transId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    add: (transaction) => {
        return new Promise((resolve, reject) => {
            // Get the latest transId
            connection.query('SELECT MAX(CAST(SUBSTRING_INDEX(transId, "-", -1) AS UNSIGNED)) AS latestTransId FROM `Transaction History`', (err, results) => {
                if (err) reject(err);

                // Generate the next transId
                const nextTransId = `trans-${(results[0].latestTransId || 0) + 1}`;

                // Ensure varients is a valid JSON string
                const transactionToInsert = {
                    ...transaction,
                    transId: nextTransId,
                    varients: JSON.stringify(transaction.varients) // Serialize varients field
                };

                // Insert the transaction into the database
                connection.query('INSERT INTO `Transaction History` SET ?', transactionToInsert, (err, results) => {
                    if (err) reject(err);
                    resolve({ transId: nextTransId }); // Only return the generated transId
                });
            });
        });
    },
    
    create: (transaction) => {
        return new Promise((resolve, reject) => {
            connection.beginTransaction(async (err) => {
                if (err) {
                    console.error("Error starting transaction:", err);
                    return reject({
                        message: "Error starting transaction",
                        error: err.message || err
                    });
                }
    
                try {
                    // Validate input data
                    if (!transaction.transType || !transaction.subType || !transaction.transCategory) {
                        throw new Error("Missing required fields: transType, subType, or transCategory");
                    }
    
                    // Ensure varients is a valid array
                    let varients;
                    if (typeof transaction.varients === 'string') {
                        try {
                            varients = JSON.parse(transaction.varients);
                        } catch (parseError) {
                            throw new Error("varients is not a valid JSON string");
                        }
                    } else if (Array.isArray(transaction.varients)) {
                        varients = transaction.varients;
                    } else {
                        throw new Error("varients must be an array or a valid JSON string");
                    }
    
                    // Get the latest transId
                    const [latestTransIdResult] = await connection.promise().query(
                        'SELECT MAX(CAST(SUBSTRING_INDEX(transId, "-", -1) AS UNSIGNED)) AS latestTransId FROM `Transaction History`'
                    );
    
                    // Generate the next transId
                    const nextTransId = `trans-${(latestTransIdResult[0].latestTransId || 0) + 1}`;
    
                    // Convert ISO 8601 date strings to MySQL-compatible format
                    const formatDateForMySQL = (isoDate) => {
                        const date = new Date(isoDate);
                        if (isNaN(date)) {
                            throw new Error(`Invalid date: ${isoDate}`);
                        }
                        return date.toISOString().split('T')[0]; // Extract YYYY-MM-DD
                    };
    
                    // Process variants and collect stockIds
                    const processedVariants = [];
    
                    for (const variant of varients) {
                        let stockId;
                        let isUpdate = false;
    
                        // Check if stockId is provided and not empty
                        if (variant.stockId && variant.stockId.trim() !== '') {
                            // Update existing GRN
                            stockId = variant.stockId.trim();
                            isUpdate = true;
                            
                            // Verify that the stockId exists in GRN table
                            const existingGRN = await ProcurementGoodReceiptRepository.findById(stockId);
                            if (!existingGRN) {
                                throw new Error(`Stock ID ${stockId} not found in GRN records`);
                            }
    
                            // Prepare GRN update data
                            const grnUpdateData = {
                                style: variant.style,
                                varientName: variant.varientName,
                                oldVarient: variant.oldVarient,
                                customerVarient: variant.customerVarient,
                                baseVarient: variant.baseVarient,
                                vendorCode: variant.vendorCode,
                                vendor: variant.vendor,
                                location: transaction.source,
                                department: transaction.sourceDept,
                                remark1: variant.remark1,
                                vendorVarient: variant.vendorVarient,
                                remark2: variant.remark2,
                                createdBy: transaction.createdBy,
                                stdBuyingRate: variant.stdBuyingRate,
                                stoneMaxWt: variant.stoneMaxWt,
                                remark: variant.remark,
                                stoneMinWt: variant.stoneMinWt,
                                karatColor: variant.karatColor,
                                deliveryDays: variant.deliveryDays,
                                forWeb: variant.forWeb,
                                rowStatus: variant.rowStatus,
                                verifiedStatus: variant.verifiedStatus,
                                length: variant.length,
                                codegenSrNo: variant.codegenSrNo,
                                category: variant.category,
                                subCategory: variant.subCategory,
                                styleKarat: variant.styleKarat,
                                varient: variant.varient,
                                hsnSacCode: variant.hsnSacCode,
                                lineOfBusiness: variant.lineOfBusiness,
                                BOM: variant.BOM,
                                operation: variant.operation,
                                imageDetails: variant.imageDetails,
                                formulaDetails: variant.formulaDetails,
                                pieces: variant.pieces,
                                weight: variant.weight,
                                netWeight: variant.netWeight,
                                diaWeight: variant.diaWeight,
                                diaPieces: variant.diaPieces,
                                locationCode: variant.locationCode,
                                itemGroup: variant.itemGroup,
                                metalColor: variant.metalColor,
                                styleMetalColor: variant.styleMetalColor,
                                inwardDoc: nextTransId,
                                lastTrans: nextTransId,
                                isRawMaterial: variant.isRawMaterial,
                                variantType: variant.variantType || '',
                                variantForumalaID: variant.variantForumalaID,
                            };
    
                            // Update the existing GRN record
                            await ProcurementGoodReceiptRepository.update(stockId, grnUpdateData);
    
                        } else {
                            // Create new GRN entry
                            const grnData = {
                                style: variant.style,
                                varientName: variant.varientName,
                                oldVarient: variant.oldVarient,
                                customerVarient: variant.customerVarient,
                                baseVarient: variant.baseVarient,
                                vendorCode: variant.vendorCode,
                                vendor: variant.vendor,
                                location: transaction.source,
                                department: transaction.sourceDept,
                                remark1: variant.remark1,
                                vendorVarient: variant.vendorVarient,
                                remark2: variant.remark2,
                                createdBy: transaction.createdBy,
                                stdBuyingRate: variant.stdBuyingRate,
                                stoneMaxWt: variant.stoneMaxWt,
                                remark: variant.remark,
                                stoneMinWt: variant.stoneMinWt,
                                karatColor: variant.karatColor,
                                deliveryDays: variant.deliveryDays,
                                forWeb: variant.forWeb,
                                rowStatus: variant.rowStatus,
                                verifiedStatus: variant.verifiedStatus,
                                length: variant.length,
                                codegenSrNo: variant.codegenSrNo,
                                category: variant.category,
                                subCategory: variant.subCategory,
                                styleKarat: variant.styleKarat,
                                varient: variant.varient,
                                hsnSacCode: variant.hsnSacCode,
                                lineOfBusiness: variant.lineOfBusiness,
                                BOM: JSON.stringify(variant.BOM),
                                operation: JSON.stringify(variant.operation),
                                imageDetails: JSON.stringify(variant.imageDetails),
                                formulaDetails: JSON.stringify(variant.formulaDetails),
                                pieces: variant.pieces,
                                weight: variant.weight,
                                netWeight: variant.netWeight,
                                diaWeight: variant.diaWeight,
                                diaPieces: variant.diaPieces,
                                locationCode: variant.locationCode,
                                itemGroup: variant.itemGroup,
                                metalColor: variant.metalColor,
                                styleMetalColor: variant.styleMetalColor,
                                inwardDoc: nextTransId,
                                lastTrans: "",
                                isRawMaterial: variant.isRawMaterial,
                                variantType: variant.variantType || '',
                                variantForumalaID: variant.variantForumalaID
                            };
    
                            // Insert new GRN entry and get the generated stockId
                            const insertResult = await ProcurementGoodReceiptRepository.insert(grnData);
                            stockId = insertResult.stockId;
                        }
    
                        // Store only the stockId and essential variant info for transaction history
                        processedVariants.push({
                            stockId: stockId,
                            varientName: variant.varientName,
                            vendor: variant.vendor,
                            pieces: variant.pieces,
                            weight: variant.weight,
                            isUpdate: isUpdate
                        });
    
                        // Create Barcode Detail (for both new and updated records)
                        const barcodeDetail = {
                            stockId: stockId,
                            date: formatDateForMySQL(new Date().toISOString()),
                            transNo: nextTransId,
                            transType: transaction.transType,
                            source: transaction.source,
                            destination: transaction.destination,
                            customer: transaction.customer,
                            vendor: variant.vendor,
                            sourceDept: transaction.sourceDept,
                            destinationDept: transaction.destinationDept,
                            exchangeRate: parseFloat(transaction.exchangeRate),
                            currency: transaction.currency,
                            salesPerson: transaction.salesPerson,
                            term: transaction.term,
                            remark: transaction.remark,
                            createdBy: transaction.createdBy,
                            varient: variant.varientName,
                            postingDate: formatDateForMySQL(transaction.postingDate),
                        };
                        await BarcodeDetailRepository.create(barcodeDetail);
    
                        // Create Barcode History (for both new and updated records)
                        const barcodeHistory = {
                            stockId: stockId,
                            attribute: isUpdate ? "UPDATED" : "CREATED",
                            varient: variant.varientName,
                            transactionNumber: nextTransId,
                            date: formatDateForMySQL(new Date().toISOString()),
                            bom: JSON.stringify(variant.BOM),
                            operation: JSON.stringify(variant.operation),
                            formula: JSON.stringify(variant.formulaDetails),
                        };
                        await BarcodeHistoryRepository.insert(barcodeHistory);
                    }
    
                    // Now create the transaction history with only stockIds instead of full variant data
                    const transactionToInsert = {
                        ...transaction,
                        transId: nextTransId,
                        transDate: formatDateForMySQL(transaction.transDate),
                        postingDate: formatDateForMySQL(transaction.postingDate),
                        varients: JSON.stringify(processedVariants) // Store only stockIds and minimal data
                    };
    
                    // Insert the transaction into the database
                    await connection.promise().query('INSERT INTO `Transaction History` SET ?', transactionToInsert);
    
                    // Commit the transaction
                    await connection.promise().commit();
                    resolve({ 
                        transId: nextTransId,
                        stockIds: processedVariants.map(v => v.stockId)
                    });
                } catch (error) {
                    // Rollback the transaction in case of error
                    await connection.promise().rollback();
                    console.error("Detailed error:", error);
                    reject({
                        message: "Error creating transaction",
                        error: error.message || error
                    });
                }
            });
        });
    },

    update: (transId, transaction) => {
        return new Promise((resolve, reject) => {
            // Ensure varients is a valid JSON string
            const transactionToUpdate = {
                ...transaction,
                varients: JSON.stringify(transaction.varients) // Serialize varients field
            };

            connection.query('UPDATE `Transaction History` SET ? WHERE transId = ?', [transactionToUpdate, transId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },
    
    delete: (transId) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM `Transaction History` WHERE transId = ?', [transId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    getLatestTransId: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT MAX(CAST(SUBSTRING_INDEX(transId, "-", -1) AS UNSIGNED)) AS latestTransId FROM `Transaction History`', (err, results) => {
                if (err) reject(err);
                resolve(results[0].latestTransId);
            });
        });
    }
};

export default TransactionHistoryRepository;