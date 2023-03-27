const Product = require('../models/product');
const slugify = require('slugify');

exports.create = async (req, res) => {
    try {
        const createProduct = { ...req.body, slug: slugify(req.body.title) };
        console.log(createProduct);

        const created = await new Product(createProduct).save();
        res.json(created);
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            err: error.message
        });
    }
};

exports.readAll = async (req, res) => {
    try {
        const products = await Product
            .find({})
            .sort({ createdAt: -1 })
            .exec();
        res.json(products);
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            err: 'Can not retreive categories.'
        });
    }
};
