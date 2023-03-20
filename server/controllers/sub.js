const Sub = require('../models/sub');
const slugify = require('slugify');

exports.create = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const created = await new Sub({
            name: name,
            slug: slugify(name),
            parent: parent
        }).save();
        res.json(created);
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            error: 'Create sub category failed'
        });
    }
};

exports.readAll = async (req, res) => {
    try {
        const categories = await Sub
            .find({}).sort({ createdAt: -1 })
            .exec();
        res.json(categories);
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            error: 'Can not retreive sub categories.'
        });
    }
};

exports.read = async (req, res) => {
    try {
        let category = await Sub
            .findOne({ slug: req.params.slug })
            .exec();
        res.json(category);
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            error: `Can not retrieve sub category :${req.params.slug}`
        });
    }
};

exports.update = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const updated = await Sub
            .findOneAndUpdate(
                { slug: req.params.slug },
                { name: name, slug: slugify(name), parent: parent },
                { new: true }
            )
            .exec();
        res.json(updated);
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            error: `Can not update sub category :${req.params.slug}`
        });
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Sub.findOneAndRemove({ slug: req.params.slug });
        res.json(deleted);
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            error: `Can not delete sub category :${req.params.slug}`
        });
    }
};