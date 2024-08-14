import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RootControllers = {
    getRoot: (req, res) => {
        res.sendFile(path.join(__dirname, '../index.html'));
    }
};

export default RootControllers;
