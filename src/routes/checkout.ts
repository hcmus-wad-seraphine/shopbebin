import express from 'express';
import { products } from './../views/internal';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('Checkout', {
        products,
    });
});

export default router;