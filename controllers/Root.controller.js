import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RootControllers = {
    getRoot: (req, res) => {
        res.sendFile(path.join(__dirname, '../index.html'));
    },

    getQuickAccess: (req, res) => {
        const constantsData = [
            'FG Inventory Management',
            'RM Inventory Management',
            'Generic Masters',
            'Migrations',
            'Formula Procedures',
            'Point Of Sale',
            'Production',
            'Order Management',
            'Invoicing',
            'Sub Contracting',
            'CRM',
            'Procurement',
            'Scheme',
            'Loyalty',
            'Item Masters',
            'VRM'
        ];
        
        res.json(constantsData);
    },
};

export default RootControllers;
