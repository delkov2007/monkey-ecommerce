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
            .limit(parseInt(req.params.count))
            .populate('category')
            .populate('sub')
            .sort({ createdAt: -1 })
            .exec();
        res.json(products);
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            err: 'Can not retreive products.'
        });
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Product
            .findOneAndRemove({ slug: req.params.slug })
            .exec();
        res.json(deleted);
    } catch (err) {
        // console.log(error);
        res.status(400).json({
            err: 'Can not delete product.'
        });
    }
};

exports.read = async (req, res) => {
    try {
        const product = await Product
            .findOne({ slug: req.params.slug })
            .populate('category')
            .populate('sub')
            .exec();
        if (!product)
            return res.status(404), json({ err: `Product '${req.params.slug}' not found` });
        res.json(product);
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            err: 'Can not retrieve product'
        });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedProduct = { ...req.body, slug: slugify(req.body.title) };
        const result = await Product.findOneAndUpdate(
            { slug: req.params.slug },
            updatedProduct,
            { new: true }
        );
        res.json(result);
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            error: `Can not update product :${req.params.slug}`
        });
    }
};
