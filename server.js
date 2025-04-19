import express from 'express';
import cors from 'cors';
import RootRouter from './routes/Root.router.js';
import EmployeeMasterRouter from './routes/EmployeeMaster.router.js';
import RoleMasterRouter from './routes/RoleMaster.router.js';
import ItemConfigurationRouter from './routes/ItemConfiguration.router.js';
import AllAttributeRouter from './routes/AllAttribute.router.js';
import ItemCodeGenerationRouter from './routes/ItemCodeGeneration.router.js';
import ItemMasterAndVariantsRouter from './routes/ItemMasterAndVariants.router.js';
import FormulaProceduresRouter from './routes/FormulaProcedures.router.js';
import MasterRouter from './routes/Master.router.js'
import GlobalRouter from './routes/global.router.js'
import ProcurementRouter from './routes/Procurement.router.js'
import TransferRouter from './routes/Transfer.router.js';
import BarcodeRouter from './routes/Barcode.router.js';
import SubContractingRouter from './routes/SubContracting.router.js';
import TransactionRouter from './routes/Transaction.router.js'
import OperationDetailRouter from './routes/OperationDetail.router.js'
import demoVariantRouter from './routes/demoVariant.router.js'

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', RootRouter);
app.use('/EmployeeMaster', EmployeeMasterRouter);
app.use('/RoleMaster', RoleMasterRouter);
app.use('/ItemConfiguration', ItemConfigurationRouter);
app.use('/AllAttribute', AllAttributeRouter);
app.use('/ItemCodeGeneration', ItemCodeGenerationRouter);
app.use('/ItemMasterAndVariants', ItemMasterAndVariantsRouter);
app.use('/FormulaProcedures', FormulaProceduresRouter);
app.use('/Master', MasterRouter);
app.use('/Global', GlobalRouter);
app.use('/Procurement', ProcurementRouter);
app.use('/Transfer', TransferRouter);
app.use('/Barcode', BarcodeRouter);
app.use('/SubContracting', SubContractingRouter);
app.use('/Transaction', TransactionRouter);
app.use('/Operations', OperationDetailRouter);
app.use('/Demo', demoVariantRouter);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://hp.localhost:${port}/`);
});
