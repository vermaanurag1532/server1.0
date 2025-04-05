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

                    const transactionToInsert = {
                        ...transaction,
                        transId: nextTransId,
                        transDate: formatDateForMySQL(transaction.transDate), // Format transDate
                        postingDate: formatDateForMySQL(transaction.postingDate), // Format postingDate
                        varients: JSON.stringify(varients) // Serialize varients field
                    };

                    // Insert the transaction into the database
                    await connection.promise().query('INSERT INTO `Transaction History` SET ?', transactionToInsert);

                    // Process each variant and create GRN entries
                    for (const variant of varients) {
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
                            bom: JSON.stringify(variant.bom),
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

                                // Insert GRN entry
                                const stockId = await ProcurementGoodReceiptRepository.insert(grnData);

                                // Create Barcode Detail
                                const barcodeDetail = {
                                    stockId: stockId,
                                    date: formatDateForMySQL(new Date().toISOString()),
                                    transNo: nextTransId,
                                    transType: "GRN",
                                    source: transaction.source,
                                    destination: transaction.destination,
                                    customer: transaction.customer,
                                    vendor: grnData.vendor,
                                    sourceDept: transaction.sourceDept,
                                    destinationDept: transaction.destinationDept,
                                    exchangeRate: parseFloat(transaction.exchangeRate),
                                    currency: transaction.currency,
                                    salesPerson: transaction.salesPerson,
                                    term: transaction.term,
                                    remark: transaction.remark,
                                    createdBy: transaction.createdBy,
                                    varient: grnData.varientName,
                                    postingDate: formatDateForMySQL(transaction.postingDate),
                                };
                                await BarcodeDetailRepository.create(barcodeDetail);

                                // Create Barcode History
                                const barcodeHistory = {
                                    stockId: stockId,
                                    attribute: "",
                                    varient: grnData.varientName,
                                    transactionNumber: nextTransId,
                                    date: formatDateForMySQL(new Date().toISOString()),
                                    bom: grnData.bom,
                                    operation: grnData.operation,
                                    formula: grnData.formulaDetails,
                                };
                                await BarcodeHistoryRepository.insert(barcodeHistory);
                            
                    }

                    // Commit the transaction
                    await connection.promise().commit();
                    resolve({ transId: nextTransId }); // Only return the generated transId
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
