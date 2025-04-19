import express from 'express';
import {
    getAll,
    getByName,
    create,
    update,
    patch,
    remove
} from '../controllers/demoVariant.controller.js';

const demoVariantRouter = express.Router();

demoVariantRouter.get('/', getAll);
demoVariantRouter.get('/:name', getByName);
demoVariantRouter.post('/', create);
demoVariantRouter.put('/:name', update);
demoVariantRouter.patch('/:name', patch);
demoVariantRouter.delete('/:name', remove);

export default demoVariantRouter;
