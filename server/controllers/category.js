const Category = require('../models/category');
const Sub = require('../models/sub');
const slugify = require('slugify');

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const created = await new Category({
            name: name,
            slug: slugify(name)
        }).save();
        res.json(created);
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            error: 'Create category failed'
        });
    }
};

exports.readAll = async (req, res) => {
    try {
        const categories = await Category
            .find({}).sort({ createdAt: -1 })
            .exec();
        res.json(categories);
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            error: 'Can not retreive categories.'
        });
    }
};

exports.read = async (req, res) => {
    try {
        let category = await Category
            .findOne({ slug: req.params.slug })
            .exec();
        res.json(category);
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            error: `Can not retrieve category :${req.params.slug}`
        });
    }
};

exports.getCategorySubs = async (req, res) => {
    try {
        const category = await Category
            .findOne({ slug: req.params.slug })
            .exec();
        if (!category) {
            res.status(404), json({
                err: `Category '${req.params.slug}' not found`
            });
        } else {
            const categorySubs = await Sub
                .find({ parent: category._id })
                .exec();
            res.json(categorySubs);
        }
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            err: error.message
        });
    }
};

exports.update = async (req, res) => {
    try {
        const { name } = req.body;
        const updated = await Category
            .findOneAndUpdate(
                { slug: req.params.slug },
                { name: name, slug: slugify(name) },
                { new: true }
            )
            .exec();
        res.json(updated);
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            error: `Can not update category :${req.params.slug}`
        });
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Category.findOneAndRemove({ slug: req.params.slug });
        res.json(deleted);
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            error: `Can not delete category :${req.params.slug}`
        });
    }
};