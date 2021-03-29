const { Router } = require('express');
const { productGet, productPost, productPut, productDelete } = require('../controllers/productController');

const router = Router();

router.get('/products/', productGet);
router.post('/products/', productPost);
router.put('/products/:id', productPut);
router.delete('/products/:id', productDelete);

module.exports = router;