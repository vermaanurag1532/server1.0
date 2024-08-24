import express from 'express';
import cors from 'cors';
import RootRouter from './routes/Root.router.js';
import EmployeeMasterRouter from './routes/EmployeeMaster.router.js';
import RoleMasterRouter from './routes/RoleMaster.router.js';
import ItemConfigurationRouter from './routes/ItemConfiguration.router.js';
import AllAttributeRouter from './routes/AllAttribute.router.js';

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());

app.use('/', RootRouter);
app.use('/EmployeeMaster', EmployeeMasterRouter);
app.use('/RoleMaster', RoleMasterRouter);
app.use('/ItemConfiguration', ItemConfigurationRouter);
app.use('/AllAttribute', AllAttributeRouter);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://hp.localhost:${port}/`);
});
