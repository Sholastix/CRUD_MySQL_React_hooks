const { Product } = require('../models/Product');

// 1. Get full list of products.
const productGet = async (req, res) => {
    try {
        const product = await Product.findAll();
        console.log(product);
        res.json(product);
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    };
};

// 2. Add new products in the list.
const productPost = async (req, res) => {
    try {
        const { name, price } = req.body;
        const product = await Product.create({ name, price });
        console.log(product);
        res.json(product);
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    };
};

// 3. Change info about existed product by his ID.
const productPut = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;
        const product = await Product.update({ name, price }, { where: { id } });

        // This code only for displaying already updated product instead of simple [0] or [1].
        const updatedProduct = await Product.findOne({ where: { id } });
        //
        
        console.log(updatedProduct);
        res.json(updatedProduct);
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    };
};

// 4. Delete product by his ID from list.
const productDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.destroy({ where: { id } });
        res.json(product);
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    };
};

module.exports = {
    productGet,
    productPost,
    productPut,
    productDelete,
};