import express from 'express';
import cors from 'cors';
import RootRouter from './routes/Root.router.js';
import EmployeeMasterRouter from './routes/EmployeeMaster.router.js';
import RoleMasterRouter from './routes/RoleMaster.router.js';

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());

app.use('/', RootRouter);
app.use('/EmployeeMaster', EmployeeMasterRouter);
app.use('/RoleMaster', RoleMasterRouter);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://hp.localhost:${port}/`);
});
